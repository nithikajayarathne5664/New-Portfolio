import { useEffect, useState } from 'react'
import { ArrowUpRight, BriefcaseBusiness, GraduationCap, Mail, MapPin } from 'lucide-react'
import { experiences, profile, featuredProjects, visibleSkillCategories } from './data/portfolio'
import { Footer, Navigation } from './components/Navigation'
import { ProjectDetails } from './components/ProjectDetails'
import { ProjectCard } from './components/ProjectCard'
import { SocialIcon } from './components/SocialIcon'
import { Hero } from './components/Hero'
import { emailLink, resumeLink, webLink } from './lib/links'
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
    <section id="about" className="section"><div className="container about-layout"><SectionHeading number="01" label="About me" title="A practical mindset. A commitment to growth."/><div className="about-copy">{profile.about.map(paragraph => <p key={paragraph}>{paragraph}</p>)}<div className="about-notes"><span><GraduationCap size={19}/>Software Engineering graduate</span><span><BriefcaseBusiness size={19}/>Singapore-based team experience</span></div></div></div></section>
    <section id="experience" className="section tinted"><div className="container"><SectionHeading number="02" label="Professional experience" title="Experience across development and operations." description="Hands-on learning, team collaboration, and contributions to real business workflows."/><div className="experience-list">{experiences.map((experience,index) => <article className="experience" key={experience.organization}><div className="experience-meta"><span className="experience-index">0{index+1}</span><h3>{experience.organization}</h3>{experience.location && <p>{experience.location}</p>}{experience.periodConfirmed && experience.period?.trim() && <span className="period">{experience.period}</span>}</div><div className="experience-body"><h4>{experience.role}</h4>{experience.points.length > 0 && <ul>{experience.points.map(point => <li key={point}>{point}</li>)}</ul>}</div></article>)}</div></div></section>
    <section id="projects" className="section"><div className="container"><SectionHeading number="03" label="Featured projects" title="Selected work & ongoing development." description="Professional contributions and academic work, with clear scope and honest progress."/><div className="project-grid">{featuredProjects.map((project,index) => <ProjectCard project={project} index={index} key={project.id}/>)}</div></div></section>
    <section id="skills" className="section tinted"><div className="container"><SectionHeading number="04" label="Technical skills" title="Tools I’ve worked with." description="Confirmed exposure from practical development, website work, and testing."/><div className="skills-grid">{visibleSkillCategories.map((category,index) => <article className="skill-category" key={category.name}><span className="skill-number">0{index+1}</span><h3>{category.name}</h3><div className="tags">{category.skills.filter(skill => skill.trim()).map(skill => <span key={skill}>{skill}</span>)}</div></article>)}</div></div></section>
    <section id="education" className="section"><div className="container education-layout"><SectionHeading number="05" label="Education" title="A foundation in software engineering."/><div className="education-card"><span className="education-icon"><GraduationCap size={30}/></span><div><p className="eyebrow">Bachelor’s degree</p><h3>{profile.education.degree}</h3>{profile.education.institution.trim() && <p>{profile.education.institution}</p>}{profile.education.graduationYear.trim() && <p>{profile.education.graduationYear}</p>}<p className="muted">Focused on applying academic learning to practical software development.</p></div></div></div></section>
    <section id="contact" className="section contact-section"><div className="container contact-layout"><div><p className="eyebrow"><span>06</span> Contact</p><h2>Let’s build something<br/>meaningful.</h2><p>Open to international and remote software engineering opportunities, including roles in Singapore, Europe, and the UAE.</p><span className="contact-location"><MapPin size={18}/>{profile.location}</span></div><div className="contact-card"><h3>{links.email || links.github || links.linkedin ? 'Start a conversation' : 'Open to opportunities'}</h3><p>I’m interested in teams that value thoughtful engineering, collaboration, and continuous learning.</p>{links.email ? <a className="button primary" href={`mailto:${links.email}`}><Mail size={18}/>{links.email}</a> : null}<div className="contact-profiles">{links.linkedin && <a href={links.linkedin} target="_blank" rel="noopener noreferrer"><SocialIcon brand="linkedin"/>LinkedIn<ArrowUpRight size={16}/></a>}{links.github && <a href={links.github} target="_blank" rel="noopener noreferrer"><SocialIcon brand="github"/>GitHub<ArrowUpRight size={16}/></a>}</div></div></div></section>
  </main><Footer/>{activeProject && <ProjectDetails project={activeProject} onClose={closeProject}/>}</>
}
export default App

