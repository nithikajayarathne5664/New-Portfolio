import { projects } from './portfolio'

export interface EvidenceImage { src: string; title: string; description: string }
export interface CaseStudy { problem: string; role: string; images: EvidenceImage[] }
export const caseStudies: Record<string, CaseStudy> = {
  'digital-workflow-desktop': {
    problem: 'Paper reports and disconnected files make collecting information and managing reports difficult.',
    role: 'Existing portfolio notes describe desktop reporting, image handling, local storage and interface contributions across V1 and development toward V2. Individual V2 deliverables need confirmation.',
    images: [
      { src: 'images/Carousal Images/Carousal Image 1.png', title: 'Desktop application overview', description: 'Digital Workflow Desktop welcome screen showing the template, report and export workspace overview.' },
      { src: 'images/Carousal Images/Carousal Image 2.png', title: 'Desktop application — image 2', description: 'Second supplied Digital Workflow Desktop carousel screenshot.' },
      { src: 'images/Carousal Images/Carousal Image 3.png', title: 'Desktop application — image 3', description: 'Third supplied Digital Workflow Desktop carousel screenshot.' },
    ],
  },
  'digital-workflow': {
    problem: 'Manual forms and fragmented reporting create repetitive information collection and management work.',
    role: 'Existing portfolio notes describe form-builder customization, layout improvements, persistence investigation and functional testing within the development team.',
    images: [{ src: 'images/digital-workflow-preview.png', title: 'Public website preview', description: 'Existing website landing-page image. This does not demonstrate the internal form builder or prove personal authorship.' }],
  },
  'digital-workflow-unified': {
    problem: 'Form creation, project activities and collected data need a centralized workflow.',
    role: 'Recorded contributions focus on functional testing, Data Management Sheets, multi-page forms, undo/redo, print preview, audit logs, permissions and usability.',
    images: [],
  },
  'digital-compliance': {
    problem: 'Organizations need to organize compliance questionnaires, supporting evidence and controlled access to assessment information.',
    role: 'Recorded contribution areas include organizations, projects, questionnaires, permissions, document uploads, audit activities and gap-analysis API planning.',
    images: [],
  },
}
export const featuredProjects = projects.filter(p => !p.placeholder).map(p => p.id === 'digital-workflow' ? { ...p, title: 'Digital Workflow V2 Website' } : p)
export const skillGroups = [
  { name: 'Software Development', description: 'Experience in developing and maintaining desktop and web applications, working with frontend and backend technologies, implementing application functionality, and integrating databases.', skills: ['C#', 'WPF', 'SQLite', 'Python', 'Java', 'JavaScript', 'HTML', 'CSS', 'React.js', 'Spring Boot', 'Spring MVC'] },
  { name: 'Design & Prototyping', description: 'Experience in designing application interfaces, preparing wireframes and prototypes, planning user interactions, and improving the usability and visual consistency of software applications.', skills: ['Figma', 'Draw.io', 'Axure', 'Wireframing', 'UI/UX Layouts'] },
  { name: 'Development Tools & Platforms', description: 'Experience using development environments, version control, collaborative development tools, and backend platforms to support application development, debugging, and project management. Familiar with AI-assisted development tools for code generation, debugging, code explanation, refactoring and technical problem-solving.', skills: ['Visual Studio 2022', 'Visual Studio Code', 'GitHub', 'Supabase', 'ChatGPT', 'OpenAI Codex (VS Code Integration)', 'Google Gemini', 'Claude'] },
  { name: 'Web Development & Operations', description: 'Experience managing websites, troubleshooting technical issues, supporting web-based systems, maintaining digital platforms, and improving operational workflows.', skills: ['WordPress', 'Hostinger', 'Website Administration', 'Workflow Automation', 'Technical Support'] },
  { name: 'Software Quality & Documentation', description: 'Experience identifying and troubleshooting software issues, testing application functionality, validating requirements, and preparing documentation to support software development and maintenance.', skills: ['Software Testing', 'Debugging', 'Technical Documentation'] },
]
