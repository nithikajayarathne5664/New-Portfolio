import { useEffect, useRef } from 'react'
import { ArrowUpRight, BriefcaseBusiness, Code2, FileText, Lightbulb, PanelsTopLeft, Users } from 'lucide-react'
import { aboutIntroduction, internshipHighlights } from '../data/about'
import { experiences } from '../data/portfolio'
import { Qualifications } from './Qualifications'
import { SocialIcon } from './SocialIcon'
import './AboutMe.css'

const strengths = [
  { icon: Code2, title: 'Practical Development Experience', text: 'Contributing to real software applications in a professional development environment.' },
  { icon: Lightbulb, title: 'Problem-Solving Mindset', text: 'Understanding technical challenges, investigating issues and improving application functionality.' },
  { icon: PanelsTopLeft, title: 'UI/UX & Application Quality', text: 'Exposure to interface improvements, software testing and application usability.' },
  { icon: Users, title: 'Continuous Learning & Collaboration', text: 'Working with Singapore-based teams and continuing to develop new technical skills.' },
]
export function AboutMe() {
  const portrait = useRef<HTMLElement>(null)
  useEffect(() => {
    const element = portrait.current
    if (!element || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { element.classList.add('is-visible'); observer.disconnect() }
    }, { threshold: 0.15 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])
  const inbound = experiences.find(experience => experience.organization === 'Real Inbound Consulting Pte Ltd')
  return <section id="about" className="section about-section" aria-labelledby="about-title"><div className="container">
    <div className="about-overview"><div className="about-overview-copy">
    <header className="about-heading"><p className="eyebrow">01 / About Me</p><h2 id="about-title">Building Practical Software Solutions Through Learning, Innovation &amp; Experience.</h2><p className="about-specialisms">Software Engineering | Application Development | UI/UX | Problem Solving</p></header>
    <div className="about-introduction">{aboutIntroduction.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
    </div><figure ref={portrait} className="about-portrait">
      <div className="about-portrait-frame"><img src={`${import.meta.env.BASE_URL}Clean-Shaven Professional Headshot.png`} width={1186} height={1326} alt="Professional portrait of Nithika Jayarathne wearing glasses, a navy jacket and a white shirt." loading="lazy" decoding="async"/></div>
      <figcaption><strong>Nithika Jayarathne</strong><span>Software Engineering | Application Development</span></figcaption>
      <div className="button-row about-portrait-actions">
        <a className="button primary" href={`${import.meta.env.BASE_URL}resume/Nithika_Jayarathne_Resume.pdf`} target="_blank" rel="noopener noreferrer"><FileText size={18} aria-hidden="true"/>View Resume</a>
        <a className="button secondary" href="https://www.linkedin.com/in/nithika-jayarathne-3b64881ab/" target="_blank" rel="noopener noreferrer"><SocialIcon brand="linkedin"/>Let’s Connect</a>
      </div>
    </figure></div>
    <section className="about-block" aria-labelledby="about-qualifications"><div className="about-block-heading"><h3 id="about-qualifications">Education &amp; Qualifications</h3><a href="#education">Education overview <ArrowUpRight size={15} aria-hidden="true"/></a></div><Qualifications/></section>
    <section className="about-block about-internship" aria-labelledby="about-internship"><div className="about-company-heading"><BriefcaseBusiness size={22} aria-hidden="true"/><div><h3 id="about-internship">Software Development Experience — Thirteen Technologies</h3><p className="about-role">Software Developer Intern <span>·</span> 7 July 2025 – 8 October 2026 <span>·</span> Remote <span>·</span> Singapore</p></div></div><p className="about-context">During my internship at Thirteen Technologies, I gained practical exposure to software development by contributing to multiple applications designed to improve digital workflows, information management, organizational efficiency and business operations.</p>
      <div className="about-projects">{internshipHighlights.map((project, index) => <article className="about-project" key={project.id}><span className="about-project-number">0{index + 1}</span><div><h4>{project.name}</h4>{project.purpose ? <><p>{project.purpose}</p><p className="about-contribution"><strong>Involvement:</strong> {project.areas}</p></> : <p className="muted">Purpose and personal contributions to confirm.</p>}<a href={`#project/${project.id}`}>View project details <ArrowUpRight size={15} aria-hidden="true"/></a></div></article>)}</div>
    </section>
    <section className="about-block about-inbound" aria-labelledby="about-inbound"><div className="about-company-heading"><BriefcaseBusiness size={22} aria-hidden="true"/><div><h3 id="about-inbound">Professional Experience — Real Inbound Consulting</h3><p className="about-role">Real Inbound Consulting Pte Ltd <span>·</span> Singapore-based company</p></div></div><p className="about-context">At Real Inbound Consulting, I gained valuable experience in business operations, digital platforms, technical support and collaborating with teams in a professional Singapore-based working environment.</p><div className="about-role-records">{inbound?.roles.map(role => <div key={role.role}><h4>{role.role}</h4>{role.periodConfirmed && role.period && <p>{role.period}</p>}</div>)}</div><p className="about-context">My work included website management with WordPress and Hostinger, technical troubleshooting, process improvements and operational support. Each role’s responsibilities are detailed in my work history.</p><a className="about-detail-link" href="#experience">Explore professional experience <ArrowUpRight size={15} aria-hidden="true"/></a></section>
    <section className="about-block" aria-labelledby="about-strengths"><h3 id="about-strengths">What I Bring as a Software Engineer</h3><div className="about-strengths">{strengths.map(({ icon: Icon, title, text }) => <article key={title}><Icon size={22} strokeWidth={1.7} aria-hidden="true"/><h4>{title}</h4><p>{text}</p></article>)}</div></section>
  </div></section>
}
