import type { ReactNode } from 'react'
import { ArrowRight, ArrowUpRight, BriefcaseBusiness, Code2, Download, Headset, MapPin, Workflow } from 'lucide-react'
import { profile } from '../data/portfolio'
import { emailLink } from '../lib/links'
import './Hero.css'

interface HeroProps {
  resumeAvailable: boolean
  resumeHref?: string
  children?: ReactNode
}

const focusAreas = [
  { icon: Code2, title: 'Application Development', description: 'React, TypeScript and UI improvements' },
  { icon: Workflow, title: 'Workflow Engineering', description: 'Digital workflow features and testing' },
  { icon: Headset, title: 'Technical Support', description: 'Troubleshooting and problem-solving' },
]

const highlights = [
  { icon: BriefcaseBusiness, label: 'Singapore-based team experience' },
  { icon: Workflow, label: 'Digital workflow development' },
  { icon: Headset, label: 'Technical troubleshooting & support' },
]

export function Hero({ resumeAvailable, resumeHref, children }: HeroProps) {
  const email = emailLink(profile.links.email)
  const contactHref = email ? `mailto:${email}?subject=${encodeURIComponent(profile.contactSubject)}` : undefined

  return (
    <section id="home" className="international-hero" aria-labelledby="hero-title">
      <div className="container international-hero-layout">
        <div className="international-hero-copy">
          <p className="hero-availability">
            <span aria-hidden="true" /> Open to international & remote opportunities
          </p>
          <h1 id="hero-title">
            <span>Hi, I’m Nithika.{' '}</span>
            <span>I build <em>software</em>{' '}</span>
            <span>that solves real problems.</span>
          </h1>
          <p className="international-hero-role">Software Engineer <span aria-hidden="true">|</span> Full-Stack Development</p>
          <p className="international-hero-description">
            Software Engineering graduate with hands-on experience contributing to digital workflow applications, UI improvements, and technical support for Singapore-based organizations. Focused on building practical, reliable, and user-friendly software.
          </p>
          <div className="button-row international-hero-actions">
            <a className="button primary" href="#projects">View My Work <ArrowRight size={18} aria-hidden="true" /></a>
            {contactHref && <a className="button secondary" href={contactHref}>Get in Touch <ArrowUpRight size={18} aria-hidden="true" /></a>}
            {resumeAvailable && resumeHref && <a className="hero-resume" href={resumeHref} download><Download size={16} aria-hidden="true" /> Download Resume</a>}
          </div>
          <div className="international-hero-location"><MapPin size={15} aria-hidden="true" />{profile.location}{children}</div>
        </div>

        <aside className="developer-profile" aria-labelledby="developer-profile-name">
          <div className="developer-profile-header">
            <div className="developer-profile-top"><span className="developer-monogram" aria-hidden="true">NJ</span><Code2 size={25} aria-hidden="true" /></div>
            <h2 id="developer-profile-name">{profile.displayName}</h2>
            <p className="developer-profile-role">Software Engineer</p>
            <p className="developer-profile-location"><MapPin size={14} aria-hidden="true" /> Sri Lanka · International opportunities</p>
          </div>
          <ul className="developer-profile-areas">
            {focusAreas.map(({ icon: Icon, title, description }) => (
              <li key={title}>
                <span className="developer-area-icon"><Icon size={22} strokeWidth={1.7} aria-hidden="true" /></span>
                <div><h3>{title}</h3><p>{description}</p></div>
              </li>
            ))}
          </ul>
          <div className="developer-profile-footer"><span aria-hidden="true" /> Focused on practical solutions</div>
        </aside>
      </div>
      <div className="container">
        <ul className="international-hero-highlights" aria-label="Experience highlights">
          {highlights.map(({ icon: Icon, label }) => <li key={label}><Icon size={19} strokeWidth={1.7} aria-hidden="true" /><span>{label}</span></li>)}
        </ul>
      </div>
    </section>
  )
}
