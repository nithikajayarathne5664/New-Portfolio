import { useEffect, useRef } from 'react'
import { ArrowUpRight, X } from 'lucide-react'
import type { Project } from '../data/portfolio'
import { webLink } from '../lib/links'
export function ProjectDetails({ project, onClose }: { project: Project; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const github = webLink(project.github)
  const demo = webLink(project.demo)
  useEffect(() => {
    const element = dialog.current
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null
    element?.showModal()
    return () => { element?.close(); previous?.focus() }
  }, [project.id])
  return <dialog ref={dialog} className="project-dialog" aria-labelledby="project-title" aria-describedby="project-description" onCancel={onClose} onKeyDown={event => {
    if (event.key !== 'Tab') return
    const controls = dialog.current?.querySelectorAll<HTMLElement>('button, a[href], [tabindex="0"]')
    if (!controls?.length) return
    const first = controls[0], last = controls[controls.length - 1]
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
  }}>
    <button className="close-dialog" onClick={onClose} aria-label="Close project details"><X/></button><p className="eyebrow">{project.type}</p><h2 id="project-title">{project.title}</h2><span className="status">{project.status}</span><p id="project-description">{project.description}</p>
    {project.organization && <p className="muted">Organization: {project.organization}</p>}<h3>My contribution</h3><ul>{project.contributions.map(point => <li key={point}>{point}</li>)}</ul>
    {project.technologies.length > 0 && <><h3>Technology used</h3><div className="tags">{project.technologies.map(tag => <span key={tag}>{tag}</span>)}</div></>}
    {project.planned.length > 0 && <><h3>Planned work</h3><p className="muted">These capabilities have not yet been completed.</p><ul>{project.planned.map(item => <li key={item}>{item}</li>)}</ul></>}
    <div className="button-row">{github && <a className="button secondary" href={github} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={16}/></a>}{demo && <a className="button primary" href={demo} target="_blank" rel="noopener noreferrer">Live demo <ArrowUpRight size={16}/></a>}<button className="button secondary" onClick={onClose}>Back to projects</button></div>
  </dialog>
}
