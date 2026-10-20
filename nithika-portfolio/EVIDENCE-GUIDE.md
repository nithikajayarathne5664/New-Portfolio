# Maintaining the interview portfolio

This update preserves the existing React/Vite site and its hash-based project views. No backend or new dependency was added.

## Editable content

- `src/data/portfolio.ts`: original biography, employment history and contribution notes. These notes are supplied portfolio content, not independently verified project documentation.
- `src/data/interview.ts`: case-study reasoning, outcome limitations, gallery entries, skill scope and design/workflow assets. `interviewProjects` preserves the existing project IDs, renames the web project for clarity and adds Digital Desk.
- `src/components/InterviewMode.tsx`: nine presentation slides. Keep claims consistent with the case-study evidence when updating them.

## Adding screenshots

Place permitted images in `public/images/`, then add entries to a project's `caseStudies[id].images` array:

```ts
{ src: 'images/unified-form-builder.png', title: 'Multi-page form editor', description: 'Explain what is visible, your contribution, and any limits to the evidence.' }
```

Paths are relative to the application base URL. Multiple entries enable selection buttons and a main preview. Click the preview to enlarge; Escape closes it. Empty arrays and failed image loads display “Project screenshots to be added.” The existing web landing-page image is a preview only, not proof of internal functionality or personal authorship.

Add permitted evidence to the relevant project's gallery. Do not include private repository URLs, credentials, customer data or screenshots without permission. The standalone design, GitHub workflow, testing, challenges and architecture sections have been removed.

## Facts to confirm before interviewing

- Desktop: separate exact V1 contributions from completed V2 features. Supply database/image troubleshooting reproduction steps, root cause, tests and outcome.
- Website: confirm ecosystem technology exposure per component, autosave intervention details, backend ownership and actual validation results.
- Unified: supply the failing save/reopen sequence, investigation findings, issue status and any passing regression results. Do not call it resolved without evidence.
- Compliance: identify delivered modules versus contributions/testing. AI gap analysis and proposed API endpoints remain planning work.
- Digital Desk: provide purpose, role, features, technologies, challenges, tests and collaboration before replacing its draft status.
- Supply specific team-feedback examples, permission-safe design and GitHub evidence, and confirm personal Figma, draw.io, HTML/CSS, VS Code and browser developer-tool experience.

Proposed investigation outlines in project case studies remain labeled as discussion prompts. Replace them with actual findings only when supported.

## Local validation

Run `npm.cmd run lint` and `npm.cmd run build` on Windows. The build includes TypeScript checks. Run `node scripts/verify-browser.mjs` with Chrome installed; set `PORTFOLIO_PREVIEW_URL` to your running local URL (default is port 4173). Optional `CHROME_PATH` selects another Chrome binary.

Interview Mode opens from the action above the hero. Use Previous/Next, arrow keys, Home/End and Escape. The presentation uses a native modal dialog to contain focus and returns focus on exit. Teams screen sharing itself still needs a real-device rehearsal.
