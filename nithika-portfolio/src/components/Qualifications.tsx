import { GraduationCap } from 'lucide-react'
import { qualifications } from '../data/about'

export function Qualifications() {
  return <div className="qualification-grid">{qualifications.map(qualification => <article className="qualification-card" key={qualification.degree}>
    <GraduationCap size={22} strokeWidth={1.7} aria-hidden="true"/>
    <div><span className={`qualification-status ${qualification.status === 'Completed' ? 'completed' : ''}`}>{qualification.status}</span><h4>{qualification.degree}</h4><p>{qualification.institution}</p>{qualification.pathway && <p className="muted">{qualification.pathway}</p>}</div>
  </article>)}</div>
}
