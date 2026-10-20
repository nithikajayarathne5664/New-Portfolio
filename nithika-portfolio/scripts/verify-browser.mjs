// Optional local QA using installed Chrome and Node 22; no browser package dependency.
import { spawn } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import assert from 'node:assert/strict'

const origin = process.env.PORTFOLIO_PREVIEW_URL || 'http://127.0.0.1:4173'
const chrome = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe'
await mkdir('.qa', { recursive: true })
const browser = spawn(chrome, ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check', '--remote-debugging-pipe', `--user-data-dir=${resolve('.qa/browser-profile-pipe')}`, 'about:blank'], { windowsHide: true, stdio: ['ignore', 'ignore', 'ignore', 'pipe', 'pipe'] })
try {
  let sequence = 0
  let sessionId
  let buffer = ''
  const pending = new Map()
  const errors = []
  const handle = message => {
    if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails)
    if (message.id && pending.has(message.id)) {
      const { done, reject } = pending.get(message.id); pending.delete(message.id)
      if (message.error) reject(new Error(JSON.stringify(message.error))); else done(message.result)
    }
  }
  browser.stdio[4].on('data', chunk => {
    buffer += chunk.toString()
    let boundary
    while ((boundary = buffer.indexOf('\0')) !== -1) {
      const message = buffer.slice(0, boundary); buffer = buffer.slice(boundary + 1)
      if(message) handle(JSON.parse(message))
    }
  })
  const command = (method, params = {}) => new Promise((done, reject) => {
    const id = ++sequence
    const timer = setTimeout(() => { pending.delete(id); reject(new Error(`Timeout: ${method}`)) }, 10000)
    pending.set(id, { done: value => { clearTimeout(timer); done(value) }, reject: error => { clearTimeout(timer); reject(error) } })
    browser.stdio[3].write(JSON.stringify({ id, method, params, ...(sessionId ? {sessionId} : {}) }) + '\0')
  })
  const { targetId } = await command('Target.createTarget', {url:'about:blank'})
  sessionId = (await command('Target.attachToTarget', {targetId, flatten:true})).sessionId
  const evaluate = async expression => {
    const result = await command('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })
    if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails))
    return result.result.value
  }
  const waitFor = async expression => {
    for (let count = 0; count < 60; count++) { if (await evaluate(expression)) return; await new Promise(done => setTimeout(done, 100)) }
    throw new Error(`Condition not met: ${expression}`)
  }
  const key = async (key, code, modifiers = 0) => { const windowsVirtualKeyCode = key === 'Escape' ? 27 : 9; await command('Input.dispatchKeyEvent', { type: 'rawKeyDown', key, code, modifiers, windowsVirtualKeyCode }); await command('Input.dispatchKeyEvent', { type: 'keyUp', key, code, modifiers, windowsVirtualKeyCode }) }
  await command('Runtime.enable')
  await command('Page.enable')
  await command('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false })
  await command('Page.navigate', { url: origin })
  await waitFor('document.querySelector("#contact") !== null')
  assert.equal(await evaluate('document.querySelectorAll(".project-card").length'),4)
  assert.deepEqual(await evaluate(`Array.from(document.querySelectorAll('a[href^="#"]')).filter(a=>!a.hash.startsWith('#project/') && !document.getElementById(a.hash.slice(1))).map(a=>a.hash)`),[])
  for(const width of [1920,1366,1024,768,390,320]) {
    await command('Emulation.setDeviceMetricsOverride',{width,height:768,deviceScaleFactor:1,mobile:width<760})
    assert.equal(await evaluate('document.documentElement.scrollWidth <= innerWidth'),true,`Width ${width}`)
  }
  assert.equal(await evaluate(`document.body.textContent.includes('Interview Mode')`),false)
  for(const id of ['digital-workflow-desktop','digital-workflow-unified','digital-workflow','digital-compliance']) {
    await evaluate(`document.querySelector('a.project-link[href="#project/${id}"]').focus();document.querySelector('a.project-link[href="#project/${id}"]').click()`)
    await waitFor('document.querySelector(".project-dialog")?.open')
    assert.equal(await evaluate('!!document.querySelector(".case-study")'),true)
    if(id==='digital-workflow') {
      await evaluate('document.querySelector(".preview-button").click()')
      await waitFor('document.querySelector(".image-dialog")?.open')
      await key('Escape','Escape')
      await waitFor('!document.querySelector(".image-dialog")?.open')
      assert.equal(await evaluate('document.querySelector(".project-dialog").open'),true)
    }
    await key('Tab','Tab')
    assert.equal(await evaluate('document.querySelector(".project-dialog").contains(document.activeElement)'),true)
    await key('Escape','Escape')
    await waitFor('!document.querySelector(".project-dialog")')
    assert.equal(await evaluate('document.activeElement.className'),'project-link')
  }
  await command('Page.navigate',{url:`${origin}/#project/digital-workflow-unified`})
  await waitFor('document.querySelector(".project-dialog")?.open')
  await key('Escape','Escape')
  await command('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]})
  assert.equal(await evaluate('getComputedStyle(document.documentElement).scrollBehavior'),'auto')
  assert.deepEqual(errors,[])
  console.log('PASS: case studies, links, responsive layouts, gallery, keyboard/focus, deep links, reduced motion and runtime errors.')
} finally {
  browser.kill()
}
