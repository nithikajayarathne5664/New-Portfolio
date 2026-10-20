import { experiences } from '../data/portfolio'

export function ExperienceTimeline() {
  return <ol className="career-timeline">
    {experiences.map(experience => <li className="career-company" key={experience.organization}>
      <article>
        <header className="career-company-header">
          <h3>{experience.organization}</h3>
          {experience.location && <p>{experience.location}</p>}
        </header>
        <ol className={`career-roles${experience.roles.length > 1 ? ' career-roles-nested' : ''}`}>
          {experience.roles.map(role => <li className="career-role" key={role.role}>
            <h4>{role.role}</h4>
            {role.periodConfirmed && role.period?.trim() && <p className="career-period">{role.period}</p>}
            {role.description && <p className="career-description">{role.description}</p>}
            {role.points.length > 0 && <ul className="career-responsibilities">{role.points.map(point => <li key={point}>{point}</li>)}</ul>}
          </li>)}
        </ol>
      </article>
    </li>)}
  </ol>
}
