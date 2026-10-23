# Nithika Jayarathne — Software Engineer Portfolio

Corporate-style, responsive portfolio built in the existing React 19 / TypeScript 6 / Vite 8 project. Only `lucide-react` was added as a runtime dependency. The plain CSS design system uses shared colors, surfaces, typography, spacing, and component styles.

## Local development

Use Node.js 22.21 or newer. In Windows PowerShell:

```powershell
cd "C:\Users\HP\Downloads\New Portfolio\nithika-portfolio"
npm.cmd run dev
```

Open the local URL printed by Vite. For a production preview:

```powershell
npm.cmd run build
npm.cmd run preview
```

Validation:

```powershell
npm.cmd run lint
npm.cmd run build
```

Optional browser verification: start the production preview on port 4173, then run `node scripts/verify-browser.mjs`. This uses installed Chrome on Windows without installing browser dependencies. Override `CHROME_PATH` and `PORTFOLIO_PREVIEW_URL` for another environment. Screenshots and browser profiles are saved in ignored `.qa/`. It checks responsive overflow, section links, absent resume/social links, mobile navigation, project dialogs, keyboard focus, deep-link refresh, reduced motion, and uncaught exceptions.

## Content configuration

Edit `src/data/portfolio.ts`. This is the source of profile information, experiences, projects, skills, education, and links. Do not publish unverified claims or employer material.

Before publication, verify or supply:

- Professional email, LinkedIn URL, and GitHub profile URL. Empty, whitespace-only, and malformed links are hidden; external URLs must use HTTP(S).
- Resume: place a real PDF at `public/resume.pdf`, then set `profile.links.resume` to `/resume.pdf`. The download appears only after the file response begins with the PDF signature; a missing PDF or HTML fallback will not create a download button.
- Education institution and graduation year. Empty fields are hidden.
- bevoiceai end date and precise troubleshooting responsibilities. No unsupported platforms, metrics, or customers are listed.
- An additional software project, its description, technologies, contribution, and status. Its draft stays in the data with `placeholder: true` and is excluded from public cards and project detail routes. Remove that flag only after verification.
- Verified repository/demo URLs for projects. Buttons are hidden until configured.
- Digital Workflow technology stack and any audit-log, multi-page form, persistence, preview, or permission-testing contributions. These details are omitted pending confirmation.
- Backend/database skills; empty skill categories are hidden. Java, Spring Boot, C#, WPF, and SQLite are stored in `verificationNeeded.skills` and never rendered. Move skills into the correct displayed category only after confirmation.

Experience dates are shown only with `periodConfirmed: true`. Current displayed dates come from the information supplied by the portfolio owner. The unconfirmed bevoiceai end date and detailed responsibilities remain unpublished. Blank education institution/year fields do not create empty rows.

The academic risk-assessment MVP is marked in development. Backend integration, database persistence, and AI-assisted recommendations are explicitly planned.

## Accessibility and assets

Semantic landmarks, a skip link, visible focus, mobile-menu Escape handling, and a native modal dialog with browser-managed focus containment and restored focus are implemented. Reduced-motion preferences disable smooth scrolling and transitions. Project detail URLs use hashes such as `/#project/risk-assessment`, so GitHub Pages refreshes do not require server rewrites.

Project visuals are lightweight CSS/SVG illustrations, not internal application screenshots. Inter is loaded through Google Fonts with system-font fallbacks. The static `public/social-card.png` and `public/favicon.svg` match the portfolio identity. Metadata in `index.html` targets the requested public domain; update it if the domain changes.

## GitHub Pages

Use repository **nithikajayarathne5664/New-Portfolio**, keeping this app in the `nithika-portfolio` folder. Vite uses `base: '/New-Portfolio/'`. The published URL is https://nithikajayarathne5664.github.io/New-Portfolio/.

When you are ready to publish, choose **Settings → Pages → Build and deployment → Source → GitHub Actions** in that repository. The included `.github/workflows/deploy.yml` runs on pushes to `main` or manual dispatch, installs with `npm ci`, lints, builds, uploads `dist`, and deploys with official Pages actions. It declares `pages: write`, `id-token: write`, and the `github-pages` environment.

Reference: [GitHub’s custom Pages workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

No repository initialization, push, or deployment was performed during implementation.
