import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { profile } from '../data/portfolio'
import { emailLink } from '../lib/links'
const navigation = [['about', 'About'], ['experience', 'Experience'], ['projects', 'Projects'], ['skills', 'Skills'], ['education', 'Education']] as const
export function Navigation() {
  const [open, setOpen] = useState(false)
  const email = emailLink(profile.links.email)
  const contactHref = email ? `mailto:${email}?subject=${encodeURIComponent(profile.contactSubject)}` : undefined
  useEffect(() => {
    const close = () => setOpen(false)
    const keyboard = (event: KeyboardEvent) => { if (event.key === 'Escape' && open) { setOpen(false); document.getElementById('menu-toggle')?.focus() } }
    window.addEventListener('hashchange', close); window.addEventListener('keydown', keyboard)
    return () => { window.removeEventListener('hashchange', close); window.removeEventListener('keydown', keyboard) }
  }, [open])
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 981px)')
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false) }
    desktop.addEventListener('change', closeOnDesktop)
    return () => desktop.removeEventListener('change', closeOnDesktop)
  }, [])
  return <header className="site-header"><div className="container nav-bar">
    <a className="brand" href="#home" onClick={() => setOpen(false)} aria-label={`${profile.displayName} home`}><span className="monogram" aria-hidden="true">NJ.</span><span>{profile.displayName}</span></a>
    <button id="menu-toggle" className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
    <nav id="main-nav" className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Main navigation">{navigation.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}{contactHref && <a className="nav-contact" href={contactHref} onClick={() => setOpen(false)}>Contact <ArrowUpRight size={16} aria-hidden="true"/></a>}</nav>
  </div></header>
}
export function Footer() {
  return <footer className="site-footer"><div className="container footer-top"><a className="brand" href="#home"><span className="monogram">NJ<span>.</span></span><span>{profile.displayName}</span></a><nav aria-label="Footer navigation">{navigation.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}<a href="#contact">Contact</a></nav></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} {profile.displayName}. All rights reserved.</span><span>Software Engineer · {profile.location}</span></div></footer>
}
