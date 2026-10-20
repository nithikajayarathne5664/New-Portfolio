import { useEffect, useState } from 'react'
import { ArrowUpRight, Mail, Phone } from 'lucide-react'
import { profile } from './data/portfolio'
import { featuredProjects, skillGroups } from './data/projectDetails'
import './project-details.css'
import { Footer, Navigation } from './components/Navigation'
import { ProjectDetails } from './components/ProjectDetails'
import { ProjectCard } from './components/ProjectCard'
import { SocialIcon } from './components/SocialIcon'
import { Hero } from './components/Hero'
import { ExperienceTimeline } from './components/ExperienceTimeline'
import { emailLink, resumeLink, webLink } from './lib/links'
import { AboutMe } from './components/AboutMe'
import { Qualifications } from './components/Qualifications'
import './App.css'
const links = { email: emailLink(profile.links.email), github: webLink(profile.links.github), linkedin: webLink(profile.links.linkedin), resume: resumeLink(profile.links.resume) }
function SectionHeading({ number, label, title, description }: { number: string; label: string; title: string; description?: string }) {
  return <div className="section-heading"><p className="eyebrow"><span>{number}</span> {label}</p><h2>{title}</h2>{description && <p>{description}</p>}</div>
}
function SocialLinks() {
  return <div className="social-links">{links.github && <a href={links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile"><SocialIcon brand="github"/></a>}{links.linkedin && <a href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile"><SocialIcon brand="linkedin"/></a>}</div>
}
function App() {
  const [hash, setHash] = useState(window.location.hash)
  const [resumeAvailable, setResumeAvailable] = useState(false)
  useEffect(() => { const update = () => setHash(window.location.hash); window.addEventListener('hashchange', update); return () => window.removeEventListener('hashchange', update) }, [])
  useEffect(() => {
    if (!links.resume) return
    const controller = new AbortController()
    fetch(links.resume, { signal: controller.signal }).then(async response => { const blob = await response.blob(); const signature = await blob.slice(0,5).text(); if(response.ok && signature === '%PDF-') setResumeAvailable(true) }).catch(() => setResumeAvailable(false))
    return () => controller.abort()
  }, [])
  const activeProject = featuredProjects.find(project => hash === `#project/${project.id}`)
  const closeProject = () => { window.location.hash = 'projects' }
  return <><a className="skip-link" href="#main">Skip to content</a><Navigation/><main id="main">
    <Hero resumeAvailable={resumeAvailable} resumeHref={links.resume}><SocialLinks/></Hero>
    <AboutMe/>
    <section id="experience" className="section tinted"><div className="container"><SectionHeading number="02" label="Professional experience" title="Experience across development and operations." description="Hands-on learning, team collaboration, and contributions to real business workflows."/><ExperienceTimeline/></div></section>
    <section id="projects" className="section"><div className="container"><SectionHeading number="03" label="Featured projects" title="Selected work & ongoing development." description="Professional contributions and academic work, with clear scope and honest progress."/><div className="project-grid">{featuredProjects.map(project => <ProjectCard project={project} key={project.id}/>)}</div></div></section>
    <section id="skills" className="section tinted"><div className="container"><SectionHeading number="04" label="Technical skills" title="Technical Skills &amp; Technologies" description="Experienced in software development, web technologies, database management, UI/UX design, and technical troubleshooting. Skilled in working with modern development tools and frameworks to build, maintain, and improve software applications."/><div className="skills-grid">{skillGroups.map((group,index) => <article className="skill-category" key={group.name}><span className="skill-number">0{index+1}</span><h3>{group.name}</h3><div className="tags">{group.skills.map(skill => <span key={skill}>{skill}</span>)}</div><p className="skill-description">{group.description}</p></article>)}</div></div></section>
    <section id="education" className="section"><div className="container education-layout"><SectionHeading number="05" label="Education" title="A foundation in software engineering."/><div><Qualifications/></div></div></section>
    <section id="contact" className="section contact-section"><div className="container contact-layout"><div><p className="eyebrow"><span>06</span> Contact</p><h2>Let’s build something<br/>meaningful.</h2><p>I welcome opportunities to collaborate with teams that value reliable software, thoughtful problem-solving, and continuous improvement.</p></div><div className="contact-card"><h3>Start a conversation</h3><p>For software engineering opportunities and professional enquiries, get in touch directly.</p><address className="contact-methods">{links.email && <a className="contact-method" href={`mailto:${links.email}`}><span className="contact-method-icon"><Mail size={20} aria-hidden="true"/></span><span className="contact-method-copy"><span className="contact-method-label">Email</span><span className="contact-method-value">{links.email}</span></span><ArrowUpRight size={18} aria-hidden="true"/></a>}<a className="contact-method" href={`tel:${profile.phone.replace(/\s/g, '')}`}><span className="contact-method-icon"><Phone size={20} aria-hidden="true"/></span><span className="contact-method-copy"><span className="contact-method-label">Phone</span><span className="contact-method-value">{profile.phone}</span></span><ArrowUpRight size={18} aria-hidden="true"/></a></address><div className="contact-profiles">{links.linkedin && <a href={links.linkedin} target="_blank" rel="noopener noreferrer"><SocialIcon brand="linkedin"/>LinkedIn<ArrowUpRight size={16}/></a>}{links.github && <a href={links.github} target="_blank" rel="noopener noreferrer"><SocialIcon brand="github"/>GitHub<ArrowUpRight size={16}/></a>}</div></div></div></section>
  </main><Footer/>{activeProject && <ProjectDetails project={activeProject} onClose={closeProject}/>}</>
}
export default App

