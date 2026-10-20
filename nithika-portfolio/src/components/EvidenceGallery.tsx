import { useEffect, useRef, useState } from 'react'
import type { EvidenceImage } from '../data/projectDetails'
import './DesktopScreenshotSlider.css'

function EvidencePreview({ item }: { item: EvidenceImage }) {
  const [failed, setFailed] = useState(false)
  return failed ? <p className="evidence-placeholder">Project screenshots to be added.</p> : <img src={`${import.meta.env.BASE_URL}${item.src.replace(/^\//, '')}`} alt={item.description} onError={() => setFailed(true)} loading="lazy" />
}
export function EvidenceGallery({ images, label = 'Project screenshots', carousel = false }: { images: EvidenceImage[]; label?: string; carousel?: boolean }) {
  const [selected, setSelected] = useState(0)
  const dialog = useRef<HTMLDialogElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const [enlarged, setEnlarged] = useState(false)
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const swiped = useRef(false)
  const move = (direction: number) => setSelected(current => (current + direction + images.length) % images.length)
  useEffect(() => { if (enlarged) dialog.current?.showModal(); else dialog.current?.close() }, [enlarged])
  const close = () => { setEnlarged(false); trigger.current?.focus() }
  const item = images[selected]
  return <section className="evidence-gallery" aria-label={label}><h3>{label}</h3>{!item ? <p className="evidence-placeholder">Project screenshots to be added.</p> : <>
    <figure>{carousel ? <>
      <div className="desktop-screenshot-slider" role="region" aria-roledescription="carousel" aria-label="Desktop project screenshots" tabIndex={0} onKeyDown={event => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); event.stopPropagation(); move(event.key === 'ArrowRight' ? 1 : -1) }
      }}>
        <div className="screenshot-viewport" onTouchStart={event => { const touch = event.touches[0]; touchStart.current = { x: touch.clientX, y: touch.clientY }; swiped.current = false }} onTouchEnd={event => {
          const start = touchStart.current; touchStart.current = null
          if (!start) return
          const touch = event.changedTouches[0], dx = touch.clientX - start.x, dy = touch.clientY - start.y
          if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.25) { swiped.current = true; move(dx < 0 ? 1 : -1) }
        }} onTouchCancel={() => { touchStart.current = null }} onClickCapture={event => { if (swiped.current) { event.preventDefault(); event.stopPropagation(); swiped.current = false } }}>
          <div className="screenshot-track" style={{ transform: `translateX(-${selected * 100}%)` }}>{images.map((image, index) => <div key={image.src} className="screenshot-slide" role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${images.length}`} aria-hidden={index !== selected} inert={index !== selected}>
            <button ref={index === selected ? trigger : undefined} className="preview-button" onClick={() => setEnlarged(true)} aria-label={`Enlarge ${image.title}`}><EvidencePreview item={image}/><span>Click to enlarge</span></button>
          </div>)}</div>
        </div>
        {images.length > 1 && <><button className="screenshot-arrow previous" aria-label="Previous screenshot" onClick={() => move(-1)}>←</button><button className="screenshot-arrow next" aria-label="Next screenshot" onClick={() => move(1)}>→</button></>}
      </div>
      <div className="screenshot-pagination"><div className="screenshot-dots" aria-label="Choose screenshot">{images.map((image, index) => <button key={image.src} aria-label={`Show screenshot ${index + 1}: ${image.title}`} aria-current={selected === index ? 'true' : undefined} onClick={() => setSelected(index)}><span/></button>)}</div><span className="screenshot-counter" aria-live="polite" aria-atomic="true">{selected + 1} / {images.length}</span></div>
    </> : <button ref={trigger} className="preview-button" onClick={() => setEnlarged(true)} aria-label={`Enlarge ${item.title}`}><EvidencePreview key={item.src} item={item}/><span>Click to enlarge</span></button>}<figcaption><strong>{item.title}</strong> — {item.description}</figcaption></figure>
    {!carousel && images.length > 1 && <div className="gallery-choices" aria-label="Select screenshot">{images.map((image, index) => <button className="button secondary" key={image.src} aria-pressed={selected === index} onClick={() => setSelected(index)}>{image.title}</button>)}</div>}
    <dialog onKeyDown={event => { if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); close() } }} className="image-dialog" ref={dialog} onCancel={event => { event.preventDefault(); event.stopPropagation(); close() }} aria-label={item.title}><button autoFocus className="button secondary" onClick={close}>Close enlarged image</button><EvidencePreview key={item.src} item={item}/><p>{item.description}</p></dialog>
  </>}</section>
}
