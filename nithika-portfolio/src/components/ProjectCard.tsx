import { ArrowUpRight } from 'lucide-react'
import type { Project } from '../data/portfolio'
import { caseStudies } from '../data/projectDetails'
function UnifiedWorkflowPreview() {
  return <a className="desktop-project-preview" href="#project/digital-workflow-unified" aria-label="Explore Digital Workflow Unified project details">
    <img src={`${import.meta.env.BASE_URL}images/Digital Workfllow Unified.png`} alt="Digital Workflow Unified landing page showing the Digital Workflow logo, sign-in button, and connected forms, templates and submissions overview." width={1920} height={868} style={{ aspectRatio: '1920 / 868', objectFit: 'contain' }} loading="lazy" decoding="async"/>
  </a>
}
function DigitalCompliancePreview() {
  return <a className="desktop-project-preview" href="#project/digital-compliance" aria-label="Explore Digital Compliance project details">
    <img src={`${import.meta.env.BASE_URL}Digital Compliance.png`} alt="Digital Compliance project preview." width={1920} height={868} style={{ aspectRatio: '1920 / 868', objectFit: 'contain' }} loading="lazy" decoding="async"/>
  </a>
}
function DigitalWorkflowPreview() {
  return <img
    className="digital-workflow-preview"
    src={`${import.meta.env.BASE_URL}images/digital-workflow-preview.png`}
    alt="Digital Workflow website showing its navigation, full hero heading, description, Get started and Sign in buttons, and information cards."
    width={1532}
    height={690}
    loading="lazy"
    decoding="async"
  />
}
export function ProjectCard({project}:{project:Project}) {
  const desktopPreview = project.id === 'digital-workflow-desktop' ? caseStudies[project.id]?.images[0] : undefined
  return <article className={`project-card ${project.placeholder ? 'placeholder-card' : ''}`}>{desktopPreview && <a className="desktop-project-preview" href={`#project/${project.id}`} aria-label="Explore Digital Workflow V2 Desktop Application project details"><img src={`${import.meta.env.BASE_URL}${desktopPreview.src}`} alt={desktopPreview.description} width={1534} height={816} loading="lazy" decoding="async"/></a>}{project.id === 'digital-workflow-unified' && <UnifiedWorkflowPreview/>}{project.id === 'digital-compliance' && <DigitalCompliancePreview/>}{project.preview === 'workflow' ? <DigitalWorkflowPreview/> : null}<div className="project-content"><p className="project-type">{project.type}</p><h3>{project.title}</h3><span className="status">{project.status}</span><p>{project.description}</p>{project.technologies.length > 0 && <div className="tags">{project.technologies.map(tag => <span key={tag}>{tag}</span>)}</div>}<p className="contribution"><strong>My contribution</strong>{project.placeholder ? 'Awaiting verified project details.' : project.contributions[0]}</p><a className="project-link" href={`#project/${project.id}`}>{project.placeholder ? 'View placeholder details' : 'Explore project details'}<ArrowUpRight size={18}/></a></div></article>
}
