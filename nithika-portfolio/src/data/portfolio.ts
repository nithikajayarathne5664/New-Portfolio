import { aboutIntroduction, qualifications } from './about'
export interface ExperienceRole { role: string; period?: string; periodConfirmed?: boolean; description?: string; points: string[] }
export interface Experience { organization: string; location?: string; roles: ExperienceRole[] }
export interface Project { id: string; title: string; type: string; organization?: string; status: string; description: string; technologies: string[]; contributions: string[]; planned: string[]; github?: string; demo?: string; placeholder?: boolean; featured?: boolean; preview?: 'workflow'; details?: { purpose: string; areas: string[]; note?: string; planning?: string } }
export interface SkillCategory { name: string; skills: string[] }
export const profile = {
  name: 'Nithika Minlaka Jayarathne', displayName: 'Nithika Jayarathne',
  headline: 'Software Engineer | Full-Stack Developer | Technical Solutions', location: 'Panadura, Sri Lanka',
  introduction: 'Aspiring Software Engineer with a completed Higher National Diploma from Lithan Singapore, currently pursuing a Bachelor of Science in Computing Studies at the University of Roehampton through Lithan Singapore. Practical experience contributing to digital workflow applications and supporting Singapore-based teams.',
  about: aboutIntroduction,
  links: { email: 'nithikajayarathne@gmail.com', linkedin: '', github: '', resume: '' },
  phone: '+94 76 193 6395',
  contactSubject: 'Software Engineering Opportunity',
  education: { degree: qualifications[1].degree, institution: qualifications[1].institution, pathway: qualifications[1].pathway, status: qualifications[1].status, graduationYear: '' },
}
// Configure only verified links. Set resume to '/resume.pdf' after placing the PDF in public/.
export const experiences: Experience[] = [
  {
    organization: 'Real Inbound Consulting Pte Ltd', location: 'Singapore',
    roles: [
      {
        role: 'Software Intern', period: 'June 2024 – January 2025 (8 months)', periodConfirmed: true,
        description: 'During this internship, I contributed to improving internal efficiency and supporting digital infrastructure for client and company operations.',
        points: [
          'Process Automation: Designed and implemented automation solutions to streamline recurring business tasks and data management workflows.',
          'Website Development & Management: Developed and maintained company and client websites using WordPress, including hosting management through Hostinger.',
          'Event Planning & Coordination: Assisted with company and client events, including logistics and digital promotions.',
          'Technical Support: Supported technical setup, troubleshooting, and digital tool integration.',
        ],
      },
      {
        role: 'Operations Executive', period: 'January 2025 – March 2025 (3 months)', periodConfirmed: true,
        description: 'Supported digital marketing, customer relationship management, and business operations.',
        points: [
          'LinkedIn Monitoring & Outreach: Managed engagement activities, prospect monitoring, outreach messages, and professional communications.',
          'Content Creation: Supported the preparation and publication of LinkedIn content.',
          'CRM & Lead Management: Organized customer and prospect information using EngageBay.',
          'Presentation Development: Prepared client presentations, proposals, and business documents.',
          'Google Drive Organization: Managed shared documents, folder structures, and collaboration resources.',
          'Executive Support: Assisted the Director with operational and administrative tasks.',
        ],
      },
    ],
  },
  { organization: 'Thirteen Technologies', location: 'Singapore', roles: [{ role: 'Software Developer Intern', period: '1 Year and 4 Months', periodConfirmed: true, points: ['Contributed to Digital Workflow V1/V2 application development, including form-builder and workflow features.', 'Supported improvements to interface usability and modular application design.', 'Participated in workflow testing and identification of functional issues.', 'Collaborated with a software development team and gained practical development experience.'] }] },
  { organization: 'bevoiceai', roles: [{ role: 'Technical Support Engineer — Tier 2 (Part-Time)', period: 'Started January 2026', periodConfirmed: true, points: [] }] },
]
export const projects: Project[] = [
  {
    id: 'digital-workflow-desktop', title: 'Digital Workflow V2 Desktop Application',
    type: 'Professional project', status: 'Internship contribution',
    description: 'A desktop-based workflow and reporting application designed to help users digitally capture, manage, and generate reports instead of relying on paper forms, manual records, and disconnected files.',
    technologies: ['C#', 'WPF', 'SQLite', 'Desktop UI', 'Reporting'],
    contributions: ['Contributed to desktop reporting functionality, local data handling, report creation and editing, image/file uploads, navigation improvements, and user interface refinement.'],
    planned: [],
    details: {
      purpose: 'To help users digitally capture, manage, and generate reports instead of relying on manual forms, paper records, and disconnected files.',
      areas: [
        'Contributed to desktop reporting functionality using C# and WPF.',
        'Worked with SQLite to store report information locally.',
        'Worked on creating, saving, viewing, and editing reports.',
        'Supported management of camera and equipment information.',
        'Worked on capturing images using front and rear cameras.',
        'Worked on uploading multiple images or files for Site Maps and Detailed Maps.',
        'Supported improvements to report-generation functionality.',
        'Investigated and helped fix database initialization and file-path problems.',
        'Contributed to improved navigation and user-interface layouts for V2.',
      ],
      note: 'The confirmed C#/WPF/SQLite implementation details relate mainly to the earlier Digital Workflow V1 desktop application and its development toward V2. These contributions do not imply that every feature was completed in the final V2 Desktop release.',
    },
  },
  {
    id: 'digital-workflow-unified', title: 'Digital Workflow Unified',
    type: 'Professional project', status: 'Internship contribution',
    description: 'A centralized workflow platform designed to help organizations create forms, manage projects, collect data, collaborate across teams, and monitor activities in one system.',
    technologies: ['Workflow Systems', 'Form Builder', 'RBAC', 'Audit Logs', 'UI/UX Testing'],
    contributions: ['Contributed to form builder testing, spreadsheet-style data management features, save/persistence checks, audit log improvements, role-based access validation, and UI/UX enhancements.'],
    planned: [],
    details: {
      purpose: 'To bring different digital workflow functions into one centralized platform where organizations and teams can create forms, manage projects, collect data, collaborate, and monitor activities.',
      areas: [
        'Form Builder: Tested drag-and-drop elements, text formatting, multiple pages, table functions, and form customization.',
        'Data Management Sheets: Worked on spreadsheet-style functionality, including cell selection, merging/unmerging cells, and editing.',
        'Save and Persistence: Checked whether changes were saved correctly and remained after reopening forms.',
        'Undo/Redo: Tested the reliability of undo and redo operations.',
        'Print Preview: Identified formatting and layout issues.',
        'Project Management: Tested project creation, management, and access.',
        'Role-Based Access Control: Checked what Admins, Managers, Editors, and other users could access.',
        'Audit Logs: Contributed to improvements in search, filters, timestamps, pagination, and visibility of recorded system activities.',
        'Collaboration: Tested invitations, assigned tasks, and shared workflows.',
        'UI/UX Improvements: Supported improvements to spacing, navigation, tables, and user interactions.',
      ],
      note: 'Audit Logs discussions included a more compact interface, 20 records per page, filters, and improved search behavior. These describe areas discussed and investigated, rather than a claim that every change was completed.',
    },
  },
  {
    id: 'digital-compliance', title: 'Digital Compliance',
    type: 'Professional project', status: 'Internship contribution',
    description: 'A compliance management platform designed to help organizations assess compliance readiness, manage evidence, organize projects, and support gap analysis against standards such as ISO 27001.',
    technologies: ['Compliance Workflows', 'Audit Logs', 'Gap Analysis', 'RBAC', 'Document Management'],
    contributions: ['Contributed to organization and project workflows, document and questionnaire management, audit logging, permission-aware features, and planning for compliance gap-analysis functionality.'],
    planned: [],
    details: {
      purpose: 'To help organizations assess their compliance with standards such as ISO 27001, identify gaps, organize supporting evidence, and improve compliance readiness.',
      areas: [
        'Organization Management: Worked on creating organizations and managing their profiles.',
        'Project Management: Supported setup of compliance-related projects.',
        'Questionnaires: Worked on collecting organizational information to evaluate policies, procedures, and existing practices.',
        'User Management: Contributed to user permissions and access controls.',
        'Document Management: Worked on document and supporting-evidence uploads.',
        'Audit Logs: Contributed to recording organization, user, project, questionnaire, and document-related activities.',
        'Role-Based Permissions: Worked on restricting sensitive operations to authorized users.',
        'Gap Analysis: Reviewed requirements for comparing organizational practices against a selected compliance framework.',
        'API Planning: Participated in designing proposed backend endpoints for starting, reviewing, and retrieving gap-analysis results.',
        'UI/UX: Supported improvements to managing organizational and compliance information.',
      ],
      planning: 'AI-generated organizational profiles, readiness scoring, evidence mapping, findings, and recommendations were discussed as potential capabilities. Gap-analysis requirements and API endpoints were planning work, rather than independently delivered production features.',
    },
  },
  { id: 'digital-workflow', preview: 'workflow', title: 'Digital Workflow Management System', type: 'Professional project', organization: 'Thirteen Technologies', status: 'Internship contribution', description: 'Contributed to an enterprise-oriented digital workflow application, supporting interface usability, workflow functionality, form-builder behavior, and testing.', technologies: [], contributions: ['Contributed to Digital Workflow V1/V2 as part of the development team.', 'Supported interface usability, form-builder behavior, and workflow improvements.', 'Participated in testing and identifying functional issues.', 'This case study uses an abstract illustration. Employer source code, internal screenshots, and confidential information are not shared.'], planned: [] },
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
export const featuredProjects = projects.filter(project => !project.placeholder && project.featured !== false)
export const visibleSkillCategories = skillCategories.filter(category => category.skills.some(skill => skill.trim()))
