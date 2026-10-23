import type { ReactNode } from 'react'
import { ArrowRight, ArrowUpRight, BriefcaseBusiness, Code2, Download, Globe2, Headset, ListChecks, MapPin, Workflow } from 'lucide-react'
import { profile } from '../data/portfolio'
import { emailLink } from '../lib/links'
import './Hero.css'

interface HeroProps {
  resumeAvailable: boolean
  resumeHref?: string
  children?: ReactNode
}

const focusAreas = [
  { icon: BriefcaseBusiness, title: 'Business-Focused Engineering', description: 'Turning practical requirements into functional software improvements.' },
  { icon: Workflow, title: 'Digital Workflow Development', description: 'Contributing to enterprise workflow applications and UI enhancements.' },
  { icon: ListChecks, title: 'Quality & Reliability', description: 'Functional testing, troubleshooting and application improvements.' },
  { icon: Globe2, title: 'International Collaboration', description: 'Experience working with Singapore-based development teams.' },
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
          <h1 id="hero-title">
            <span>Hi, I’m Nithika.{' '}</span>
            <span>I build <em>practical software</em>{' '}</span>
            <span>that solves real business problems.</span>
          </h1>
          <p className="international-hero-role">Software Engineer <span aria-hidden="true">|</span> Full-Stack Development <span aria-hidden="true">|</span> Digital Innovation</p>
          <div className="international-hero-description">
            <p>I build practical software that connects business needs with reliable technology. With hands-on experience in Python, C#, Java, JavaScript and React.js, I contribute to desktop applications, web platforms and digital workflows, combining development with testing, troubleshooting and a focus on usability.</p>
            <p>I also bring practical experience using AI applications—including ChatGPT, OpenAI Codex integrated with Visual Studio Code, Google Gemini and Claude—to develop and improve features, investigate bugs, refactor code and prepare technical documentation. Through remote collaboration with Singapore-based teams, I apply these skills to real business challenges, reviewing and testing AI-assisted work before using it.</p>
          </div>
          <div className="button-row international-hero-actions">
            <a className="button primary" href="#projects">View My Work <ArrowRight size={18} aria-hidden="true" /></a>
            {contactHref && <a className="button secondary" href={contactHref}>Get in Touch <ArrowUpRight size={18} aria-hidden="true" /></a>}
            {resumeAvailable && resumeHref && <a className="hero-resume" href={resumeHref} download><Download size={16} aria-hidden="true" /> Download Resume</a>}
          </div>
          <div className="international-hero-socials">{children}</div>
        </div>

        <aside className="developer-profile" aria-labelledby="developer-profile-name">
          <div className="developer-profile-header">
            <div className="developer-profile-top"><span className="developer-monogram" aria-hidden="true">NJ</span><Code2 size={25} aria-hidden="true" /></div>
            <h2 id="developer-profile-name">{profile.displayName}</h2>
            <p className="developer-profile-role">Software Engineer</p>
            <p className="developer-profile-location"><MapPin size={14} aria-hidden="true" /> Sri Lanka · International Opportunities</p>
          </div>
          <ul className="developer-profile-areas">
            {focusAreas.map(({ icon: Icon, title, description }) => (
              <li key={title}>
                <span className="developer-area-icon"><Icon size={22} strokeWidth={1.7} aria-hidden="true" /></span>
                <div><h3>{title}</h3><p>{description}</p></div>
              </li>
            ))}
          </ul>
          <div className="developer-profile-footer"><span aria-hidden="true" /><p>Focused on practical engineering and continuous improvement.</p></div>
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
