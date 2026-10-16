export interface Experience { organization: string; location?: string; role: string; period?: string; periodConfirmed?: boolean; points: string[] }
export interface Project { id: string; title: string; type: string; organization?: string; status: string; description: string; technologies: string[]; contributions: string[]; planned: string[]; github?: string; demo?: string; placeholder?: boolean }
export interface SkillCategory { name: string; skills: string[] }
export const profile = {
  name: 'Nithika Minlaka Jayarathne', displayName: 'Nithika Jayarathne',
  headline: 'Software Engineer | Full-Stack Developer | Technical Solutions', location: 'Panadura, Sri Lanka',
  introduction: 'Software Engineering graduate with hands-on experience in application development, digital workflow solutions, and technical support for Singapore-based organizations. I enjoy building practical software, improving user experiences, and solving real-world technical problems.',
  about: ["I hold a bachelor’s degree in Software Engineering and am building my career through practical experience with Singapore-based teams. My work spans application development, interface improvements, technical support, and cross-functional operations.", 'I value clear communication, teamwork, and a thoughtful approach to problem-solving. I’m interested in building reliable, maintainable software and continuing to grow alongside experienced engineering teams.'],
  links: { email: 'nithikajayarathne@gmail.com', linkedin: '', github: '', resume: '' },
  contactSubject: 'Software Engineering Opportunity',
  education: { degree: 'Bachelor’s Degree in Software Engineering', institution: '', graduationYear: '' },
}
// Configure only verified links. Set resume to '/resume.pdf' after placing the PDF in public/.
export const experiences: Experience[] = [
  { organization: 'Thirteen Technologies', location: 'Singapore', role: 'Software Developer Intern', period: '2025 · Six-month internship', periodConfirmed: true, points: ['Contributed to Digital Workflow V1/V2 application development, including form-builder and workflow features.', 'Supported improvements to interface usability and modular application design.', 'Participated in workflow testing and identification of functional issues.', 'Collaborated with a software development team and gained practical development experience.'] },
  { organization: 'bevoiceai', role: 'Technical Support Engineer — Tier 2 (Part-Time)', period: 'Started January 2026', periodConfirmed: true, points: [] },
  { organization: 'eduCLaaS Pte Ltd', location: 'Singapore', role: 'Marketing Associate', period: 'August–October 2026', periodConfirmed: true, points: ['Managed and organized digital marketing lead information.', 'Worked on lead data consolidation, verification, and reporting.', 'Supported campaign data operations across multiple markets.', 'Maintained accuracy and consistency of operational information.'] },
]
export const projects: Project[] = [
  { id: 'digital-workflow', title: 'Digital Workflow Management System', type: 'Professional project', organization: 'Thirteen Technologies', status: 'Internship contribution', description: 'Contributed to an enterprise-oriented digital workflow application, supporting interface usability, workflow functionality, form-builder behavior, and testing.', technologies: [], contributions: ['Contributed to Digital Workflow V1/V2 as part of the development team.', 'Supported interface usability, form-builder behavior, and workflow improvements.', 'Participated in testing and identifying functional issues.', 'This case study uses an abstract illustration. Employer source code, internal screenshots, and confidential information are not shared.'], planned: [] },
  { id: 'risk-assessment', title: 'Context-Aware Risk Assessment Web Application', type: 'University final-year project', status: 'In development', description: 'A web application designed to support structured risk assessment using organizational context and contextual factors.', technologies: ['React', 'TypeScript', 'Local persistence'], contributions: ['Implemented MVP pages, assessment workflow, dashboard, and assessment history.', 'Built asset and organizational context sections.', 'Implemented a provisional risk engine and local persistence. The MVP remains in development.'], planned: ['Backend integration', 'Database persistence', 'AI-assisted recommendations'] },
  { id: 'additional-project', title: 'Additional Software Project', type: 'Project placeholder', status: 'Details pending verification', description: 'A space for an additional verified software project. Scope, technology, and contributions will be added when confirmed.', technologies: [], contributions: ['No project claims are published until the project and contribution are verified.'], planned: [], placeholder: true },
]
export const skillCategories: SkillCategory[] = [
  { name: 'Frontend Development', skills: ['React', 'TypeScript', 'JavaScript', 'WordPress'] }, { name: 'Backend Development', skills: [] },
  { name: 'Programming Languages', skills: ['TypeScript', 'JavaScript'] }, { name: 'Databases', skills: [] },
  { name: 'Development Tools', skills: ['Git / GitHub', 'Hostinger'] }, { name: 'Testing and Troubleshooting', skills: ['Workflow testing', 'Debugging', 'Functional issue identification'] },
]
export const verificationNeeded = {
  skills: ['Java', 'Spring Boot', 'C#', 'WPF', 'SQLite'],
  content: ['LinkedIn URL', 'GitHub profile URL', 'Resume PDF', 'Education institution and graduation year', 'bevoiceai end date and specific responsibilities', 'Additional software project', 'Digital Workflow technology stack and detailed audit-log, multi-page form, persistence, preview, and permission-testing contributions', 'Project repository and demo URLs'],
}
// Retain drafts and empty categories in configuration, but never publish them.
export const featuredProjects = projects.filter(project => !project.placeholder)
export const visibleSkillCategories = skillCategories.filter(category => category.skills.some(skill => skill.trim()))
