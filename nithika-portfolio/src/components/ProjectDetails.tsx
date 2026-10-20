import { useEffect, useRef } from 'react'
import { ArrowUpRight, ExternalLink, X } from 'lucide-react'
import type { Project } from '../data/portfolio'
import { webLink } from '../lib/links'
import { DigitalWorkflowCaseStudy } from './DigitalWorkflowCaseStudy'
import { caseStudies } from '../data/projectDetails'
import { EvidenceGallery } from './EvidenceGallery'
export function ProjectDetails({ project, onClose }: { project: Project; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const github = webLink(project.github)
  const demo = webLink(project.demo)
  const isDigitalWorkflow = project.id === 'digital-workflow'
  const study = caseStudies[project.id]
  useEffect(() => {
    const element = dialog.current
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null
    element?.showModal()
    return () => { element?.close(); previous?.focus() }
  }, [project.id])
  return <dialog ref={dialog} className="project-dialog" aria-labelledby="project-title" aria-describedby="project-description" onCancel={onClose} onKeyDown={event => {
    if (event.key !== 'Tab' || (event.target instanceof HTMLElement && event.target.closest('.image-dialog'))) return
    const controls = dialog.current?.querySelectorAll<HTMLElement>('button, a[href], summary, [tabindex="0"]')
    if (!controls?.length) return
    const first = controls[0], last = controls[controls.length - 1]
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
  }}>
    <button className="close-dialog" onClick={onClose} aria-label="Close project details"><X/></button><p className="eyebrow">{project.type}</p><h2 id="project-title">{project.title}</h2>
    {isDigitalWorkflow ? <div className="workflow-header-links">
      <span className="status">{project.status}</span>
      <a className="workflow-live-link" href="https://dworkflow.sg/" target="_blank" rel="noopener noreferrer" aria-label="Visit Live Website (opens in a new tab)">Visit Live Website<ExternalLink size={14} aria-hidden="true"/></a>
    </div> : <span className="status">{project.status}</span>}
    {isDigitalWorkflow ? <DigitalWorkflowCaseStudy/> : <><p id="project-description">{project.description}</p>
    {project.details && <><h3>Project Purpose</h3><p className="project-detail-copy">{project.details.purpose}</p></>}
    {project.organization && <p className="muted">Organization: {project.organization}</p>}<h3>My contribution</h3><ul>{project.contributions.map(point => <li key={point}>{point}</li>)}</ul>
    {project.details && <>
      <h3>Areas of contribution</h3>
      <ul>{project.details.areas.map(area => <li key={area}>{area}</li>)}</ul>
      {project.details.note && <aside className="project-scope-note" aria-label="Contribution scope"><h3>Contribution scope</h3><p>{project.details.note}</p></aside>}
      {project.details.planning && <aside className="project-scope-note" aria-label="Planning and discussions"><h3>Planning &amp; Discussions</h3><p>{project.details.planning}</p></aside>}
    </>}

    {project.technologies.length > 0 && <><h3>Technology used</h3><div className="tags">{project.technologies.map(tag => <span key={tag}>{tag}</span>)}</div></>}
    {project.planned.length > 0 && <><h3>Planned work</h3><p className="muted">These capabilities have not yet been completed.</p><ul>{project.planned.map(item => <li key={item}>{item}</li>)}</ul></>}
    </>}
    {study && <div className="case-study">{[['Business problem', study.problem], ['My role & responsibilities', study.role]].map(([title, copy]) => <section key={title}><h3>{title}</h3><p>{copy}</p></section>)}{study.images.length > 0 && <EvidenceGallery images={study.images} carousel={project.id === 'digital-workflow-desktop'}/>}</div>}
    <div className="button-row">{github && <a className="button secondary" href={github} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={16}/></a>}{demo && <a className="button primary" href={demo} target="_blank" rel="noopener noreferrer">Live demo <ArrowUpRight size={16}/></a>}<button className="button secondary" onClick={onClose}>Back to projects</button></div>
  </dialog>
}
