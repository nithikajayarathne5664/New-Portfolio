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
  assert.equal(await evaluate('document.querySelectorAll("main section").length'), 7)
  assert.equal(await evaluate('document.querySelectorAll(".project-card").length'), 2, 'Only real projects are public')
  assert.equal(await evaluate('document.querySelectorAll(".skill-category").length'), 4, 'Empty skill categories are hidden')
  assert.equal(await evaluate('Array.from(document.querySelectorAll(".skill-category")).every(card => card.querySelectorAll(".tags span").length > 0)'), true)
  const contactAddress = await evaluate(`document.querySelector('#contact a[href^="mailto:"]').textContent.trim()`)
  assert.equal(contactAddress, 'nithikajayarathne@gmail.com', 'Confirmed email is visible in Contact')
  assert.equal(await evaluate('document.querySelector(".nav-contact").getAttribute("href")'), `mailto:${contactAddress}?subject=Software%20Engineering%20Opportunity`, 'Navbar contact includes the opportunity subject')
  assert.equal(await evaluate(`document.querySelector('#contact a[href^="mailto:"]').getAttribute('href')`), `mailto:${contactAddress}`, 'Contact section email is clickable')
  assert.equal(await evaluate('document.querySelector(".nav-contact").textContent.trim()'), 'Contact')
  assert.equal(await evaluate('Array.from(document.querySelectorAll(".education-card p")).every(p => p.textContent.trim())'), true, 'Missing education fields produce no blank rows')
  assert.equal(await evaluate('document.querySelector("#experience").textContent.includes("to be confirmed")'), false, 'Unconfirmed date copy is not public')
  const brokenLinks = await evaluate(`Array.from(document.querySelectorAll('a')).filter(a => { const h = a.getAttribute('href'); return !h || h === '#' || (h.startsWith('#') && !h.startsWith('#project/') && !document.getElementById(h.slice(1))) }).map(a => a.outerHTML)`)
  assert.deepEqual(brokenLinks, [], 'Every section link resolves')
  assert.equal(await evaluate('document.querySelector("a[download]") === null'), true, 'Missing resume is hidden')
  assert.equal(await evaluate('document.querySelectorAll(".social-links a, .contact-profiles a").length'), 0, 'Unconfigured social links are hidden')
  for (const width of [1440, 1024, 981, 980, 768, 390, 320]) {
    await command('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width < 760 })
    assert.equal(await evaluate('document.documentElement.scrollWidth <= window.innerWidth'), true, `No horizontal overflow at ${width}px`)
    assert.equal(await evaluate(`(() => {
      const brand = document.querySelector('.site-header .brand').getBoundingClientRect();
      const target = document.querySelector(innerWidth <= 980 ? '.menu-toggle' : '.main-nav').getBoundingClientRect();
      return brand.right <= target.left && target.right <= innerWidth;
    })()`), true, `Navbar items do not overlap at ${width}px`)
    assert.equal(await evaluate('getComputedStyle(document.querySelector(".site-header .brand>span:last-child")).display !== "none"'), true, 'Display name remains visible')
  }
  await evaluate('document.getElementById("menu-toggle").click()')
  await command('Emulation.setDeviceMetricsOverride', { width: 1024, height: 900, deviceScaleFactor: 1, mobile: false })
  await waitFor('document.getElementById("menu-toggle").getAttribute("aria-expanded") === "false"')
  await command('Emulation.setDeviceMetricsOverride', { width: 320, height: 900, deviceScaleFactor: 1, mobile: true })
  await evaluate(`document.getElementById('menu-toggle').click(); document.querySelector('.nav-contact').addEventListener('click', event => event.preventDefault(), {once:true}); document.querySelector('.nav-contact').click()`)
  await waitFor('document.getElementById("menu-toggle").getAttribute("aria-expanded") === "false"')
  await evaluate('document.getElementById("menu-toggle").click()')
  assert.equal(await evaluate('document.getElementById("menu-toggle").getAttribute("aria-expanded")'), 'true')
  await key('Escape', 'Escape')
  assert.equal(await evaluate('document.activeElement.id'), 'menu-toggle')
  assert.equal(await evaluate('document.getElementById("menu-toggle").getAttribute("aria-expanded")'), 'false')
  await evaluate(`document.getElementById('menu-toggle').click(); document.querySelector('#main-nav a[href="#projects"]').click()`)
  await waitFor('location.hash === "#projects" && document.getElementById("menu-toggle").getAttribute("aria-expanded") === "false"')
  const projectIds = await evaluate('Array.from(document.querySelectorAll(".project-link")).map(a=>a.hash)')
  for (const hash of projectIds) {
    await evaluate(`document.querySelector('a[href="${hash}"]').focus(); document.querySelector('a[href="${hash}"]').click()`)
    await waitFor('document.querySelector("dialog")?.open === true')
    assert.equal(await evaluate('document.querySelectorAll("dialog a").length'), 0, 'Unconfigured project links are hidden')
    assert.equal(await evaluate('document.querySelector("dialog").contains(document.activeElement)'), true)
    for(let i=0;i<5;i++) await key('Tab','Tab')
    assert.equal(await evaluate('document.querySelector("dialog").contains(document.activeElement)'), true, 'Dialog traps tab focus')
    await key('Escape','Escape')
    await waitFor('document.querySelector("dialog") === null')
    assert.equal(await evaluate('document.activeElement.className'), 'project-link', 'Dialog restores focus')
  }
  await command('Page.navigate', { url: `${origin}/#project/risk-assessment` })
  await waitFor('document.querySelector("dialog")?.open === true')
  assert.equal(await evaluate('document.querySelector("dialog h2").textContent'), 'Context-Aware Risk Assessment Web Application')
  await evaluate('document.querySelector(".close-dialog").click()')
  await waitFor('document.querySelector("dialog") === null')
  await command('Page.navigate', { url: `${origin}/#project/additional-project` })
  await waitFor('document.querySelector("#projects") !== null')
  assert.equal(await evaluate('document.querySelector("dialog") === null'), true, 'Draft projects cannot be opened through a deep link')
  await command('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] })
  assert.equal(await evaluate('getComputedStyle(document.documentElement).scrollBehavior'), 'auto')
  for (const [label,width] of [['desktop',1440],['mobile',390]]) {
    await command('Emulation.setDeviceMetricsOverride', { width, height: 1000, deviceScaleFactor: 1, mobile: width < 760 })
    await evaluate('window.scrollTo(0,0)')
    const shot = await command('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false })
    await writeFile(`.qa/${label}.png`, Buffer.from(shot.data,'base64'))
  }
  assert.deepEqual(errors, [], 'No uncaught browser exceptions')
  console.log('PASS: sections, links, missing assets, responsive widths, mobile menu, all project dialogs, keyboard focus, deep-link refresh, reduced motion, and runtime exceptions.')
} finally {
  browser.kill()
}
