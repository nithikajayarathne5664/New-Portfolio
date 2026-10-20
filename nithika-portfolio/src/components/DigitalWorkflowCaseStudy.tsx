const contributionGroups = [
  {
    title: 'Form Builder & Customization',
    points: [
      'Contributed to development and improvements of a customizable drag-and-drop form builder.',
      'Worked with form components including text inputs, dropdowns, checkboxes, multiple-choice fields, tables, electronic signatures, and image elements.',
      'Supported customization of form layouts, styling, and appearance.',
      'Worked on saving and persistence behavior for form content and styling.',
    ],
  },
  {
    title: 'Digital Templates & Data Handling',
    points: [
      'Supported spreadsheet-style data templates.',
      'Investigated and addressed an Excel/Data Template autosave issue involving PostgreSQL column naming.',
      'Investigated image uploads, storage handling, and backend persistence.',
    ],
  },
  {
    title: 'Workflows & Functional Testing',
    points: [
      'Tested registration, login, Google SSO, organization creation, project management, and user invitations.',
      'Participated in testing form publishing, sharing, responses, and approval workflows.',
      'Identified functional issues and supported troubleshooting and improvements.',
    ],
  },
  {
    title: 'User Experience',
    points: [
      'Contributed to responsive layout improvements.',
      'Supported enhancements to the signup interface.',
      'Worked on improving the usability and presentation of form-builder components.',
    ],
  },
]

const technologies = ['React Native / Expo', 'C# backend services', 'PostgreSQL', 'Supabase-related persistence', 'API integration']

export function DigitalWorkflowCaseStudy() {
  return <div className="digital-workflow-case-study">
    <section aria-labelledby="workflow-overview">
      <h3 id="workflow-overview">Project Overview</h3>
      <p id="project-description">Digital Workflow V2 is a digital form and workflow management solution designed to help users create customizable forms and templates, collect and manage information, and generate reports through a structured digital platform.</p>
      <figure className="workflow-screenshot">
        <img src={`${import.meta.env.BASE_URL}images/digital-workflow-preview.png`} width={1532} height={690} alt="Digital Workflow website with its navigation, full hero heading, description, action buttons, and information cards." decoding="async"/>
        <figcaption>Digital Workflow website preview</figcaption>
      </figure>
    </section>
    <section aria-labelledby="workflow-purpose">
      <h3 id="workflow-purpose">Project Purpose</h3>
      <p>Digital Workflow is a digital form and workflow management platform designed to simplify how organizations create forms, collect information, manage submissions, and support reporting and approval processes. The platform enables users to build customized digital forms and templates while reducing reliance on manual, paper-based processes.</p>
    </section>
    <section aria-labelledby="workflow-contributions">
      <h3 id="workflow-contributions">My Role &amp; Contributions</h3>
      {contributionGroups.map(group => <div className="workflow-contribution-group" key={group.title}>
        <h4>{group.title}</h4>
        <ul>{group.points.map(point => <li key={point}>{point}</li>)}</ul>
      </div>)}
    </section>
    <section aria-labelledby="workflow-technologies">
      <h3 id="workflow-technologies">Technologies &amp; Technical Exposure</h3>
      <p>Technologies encountered across the wider Digital Workflow V2 ecosystem. Different components used different technologies; these represent practical exposure and collaboration, rather than a single application stack or independent implementation and deep expertise in every technology.</p>
      <ul className="workflow-technologies">{technologies.map(technology => <li key={technology}>{technology}</li>)}</ul>
    </section>
    <section aria-labelledby="workflow-learning">
      <h3 id="workflow-learning">Professional Learning</h3>
      <p>Through this internship, I gained practical exposure to collaborative software development, digital workflow systems, data persistence challenges, functional testing, API interactions, and improving software reliability from a user-focused perspective.</p>
    </section>
  </div>
}
