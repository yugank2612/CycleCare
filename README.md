# 🌸 CycleCare

### Your Wellness. Your Privacy. Your Journey.

**CycleCare** is a modern, responsive menstrual wellness web application prototype designed to make menstrual health education, personal cycle tracking, and wellness resources more accessible.

Built using **React, JavaScript, Vite, and Supabase**, CycleCare combines an intuitive user interface with optional authentication and a privacy-conscious database foundation.

**Track. Understand. Learn.**

[![GitHub](https://img.shields.io/badge/GitHub-yugank2612-181717?style=for-the-badge&logo=github)](https://github.com/yugank2612/CycleCare)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

## 🌐 Live Application

**Live Demo:**  
https://yugank2612.github.io/CycleCare/

**GitHub Repository:**  
https://github.com/yugank2612/CycleCare

The application is a demonstration project. Some features require additional configuration, and the current implementation is not intended for production health-data collection.

---

## 📌 Project Overview

CycleCare brings menstrual wellness tools and educational resources together in one application.

The project focuses on:

- Personal cycle tracking.
- Menstrual health journaling.
- Wellness education.
- Period-care product discovery.
- Healthcare resource navigation.
- Privacy-conscious application design.
- Responsive user experiences.

**Project Status:** Development / Demonstration Project

---

## ✨ Features

### 📅 1. Menstrual Cycle Tracking

- Record the first day of the most recent period.
- Configure typical cycle length.
- Configure typical period duration.
- View a monthly calendar.
- Display approximate cycle information.
- View estimated next-period dates.

Cycle estimates are informational and are not medical predictions.

### 📝 2. Personal Health Journal

- Record daily check-ins.
- Track flow information.
- Record symptoms.
- Track mood.
- Add personal notes.
- Review recent journal entries.
- Delete individual entries.

### 🛍️ 3. Period-Care Resources

Explore common menstrual-care product categories:

- Sanitary pads.
- Reusable cloth pads.
- Menstrual cups.
- Period underwear.
- Heating pads.
- Period pouches.

The catalogue is informational. Product purchases and payment processing are not implemented.

### 📚 4. Menstrual Health Education

Educational sections covering:

- Understanding the menstrual cycle.
- Period hygiene.
- Choosing menstrual products.
- PMS and common symptoms.
- PCOS and endometriosis awareness.
- When to seek healthcare support.

### 🏥 5. Healthcare Resources

- Healthcare information.
- External clinician-directory links.
- Government health-resource links.
- Appointment preparation guidance.

External directories are starting points only. Providers and appointment availability are not independently verified by CycleCare.

### 🔐 6. Privacy & Account Management

- Optional Supabase authentication.
- PostgreSQL database integration.
- Row Level Security policies.
- Local demonstration mode.
- Personal data export functionality.
- Journal and cycle-data deletion controls.

Cloud authentication and synchronization require Supabase configuration.

---

## 🖥️ Application Preview

Application screenshots and demonstrations will be added here.

### Main Dashboard

<!-- Add screenshot: docs/images/dashboard.png -->

### Cycle Tracker

<!-- Add screenshot: docs/images/cycle-tracker.png -->

### Health Journal

<!-- Add screenshot: docs/images/health-journal.png -->

### Privacy & Settings

<!-- Add screenshot: docs/images/privacy.png -->

---

## 🛠️ Technology Stack

| Category | Technologies |
|---|---|
| Frontend | React 18 |
| Programming Language | JavaScript |
| Build Tool | Vite 6 |
| UI Icons | Lucide React |
| Charts | Recharts |
| Authentication | Supabase Auth |
| Database | PostgreSQL |
| Database Security | Row Level Security |
| Backend Services | Supabase |
| Testing | Node.js Test Runner |
| CI/CD | GitHub Actions |
| Deployment | GitHub Pages |
| Version Control | Git & GitHub |

---

## 📁 Project Structure

```text
CycleCare/
│
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   └── bug_report.md
│   │
│   └── workflows/
│       └── deploy.yml
│
├── src/
│   ├── lib/
│   │   ├── cycle.js
│   │   └── supabase.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
│
├── supabase/
│   └── schema.sql
│
├── tests/
│   └── cycle.test.js
│
├── .gitignore
├── env.example
├── index.html
├── package.json
├── README.md
├── SECURITY.md
└── vite.config.js
```

---

## 🚀 Getting Started

Follow these instructions to run CycleCare locally.

### Prerequisites

Install the following:

- Node.js 18 or newer.
- npm.
- Git.

Check your installed versions:

```bash
node --version
npm --version
git --version
```

### Step 1: Clone the Repository

```bash
git clone https://github.com/yugank2612/CycleCare.git
```

### Step 2: Navigate to the Project

```bash
cd CycleCare
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Configure Environment Variables

The repository contains an `env.example` template.

Create your local environment file.

**Windows PowerShell:**

```powershell
Copy-Item env.example .env.local
```

**Git Bash / macOS / Linux:**

```bash
cp env.example .env.local
```

For local demonstration mode, Supabase configuration is optional.

To enable Supabase, update `.env.local`:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_BASE_PATH=/
```

Replace the example values with the appropriate public Supabase project configuration.

Never put private credentials or Supabase service-role keys in frontend environment variables.

### Step 5: Start the Development Server

```bash
npm run dev
```

Open the local development URL displayed in your terminal.

### Step 6: Build for Production

```bash
npm run build
```

The production files will be generated inside:

```text
dist/
```

### Step 7: Preview the Production Build

```bash
npm run preview
```

---

## 🧪 Automated Testing

CycleCare uses the built-in Node.js test runner to verify its date and cycle-calculation utilities.

### Run Tests Locally

```bash
npm test
```

### Current Test Coverage

The automated test suite contains nine test cases covering:

1. Valid leap-year dates.
2. Invalid calendar dates.
3. Date formatting.
4. Adding days across leap-year boundaries.
5. Initial cycle calculations.
6. Exact cycle-boundary calculations.
7. Cycle progression after a boundary.
8. Invalid cycle inputs.
9. Calendar generation.

### Continuous Integration

GitHub Actions automatically runs the test suite before generating the production build.

The workflow follows this sequence:

1. Checkout repository.
2. Set up Node.js.
3. Install dependencies.
4. Execute automated tests.
5. Build the CycleCare application.
6. Upload the production build.
7. Deploy to GitHub Pages.

Deployment continues only when the required test and build steps succeed.

**View GitHub Actions:**

https://github.com/yugank2612/CycleCare/actions

---

## 🗄️ Supabase Configuration

CycleCare supports optional Supabase authentication and database integration.

### Step 1: Create a Supabase Project

Visit:

https://supabase.com/

Create a project and configure its database.

### Step 2: Configure the Database

Open the Supabase SQL Editor.

Execute:

```text
supabase/schema.sql
```

The database schema includes:

- User profiles.
- Cycle entries.
- Database indexes.
- Row Level Security.
- User-specific access policies.
- Automatic profile creation after signup.

Review the schema and access policies before connecting real personal health information.

### Step 3: Configure Authentication

In Supabase Authentication settings:

1. Enable email/password authentication.
2. Configure email confirmation.
3. Set appropriate redirect URLs.
4. Configure account recovery settings.
5. Review password and authentication security.

### Step 4: Configure Environment Variables

Update `.env.local`:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_BASE_PATH=/
```

Restart the development server after making configuration changes.

**Security reminder:** Never expose a Supabase `service_role` key in frontend code or public repositories. Browser-accessible keys require correctly configured Row Level Security.

---

## 🌐 Deployment

CycleCare uses GitHub Actions for automated GitHub Pages deployment.

### GitHub Pages

The deployment workflow is located at:

```text
.github/workflows/deploy.yml
```

It is configured to run when code is pushed to the `main` branch or when manually triggered.

### Deployment Configuration

The GitHub Actions workflow uses:

```yaml
VITE_BASE_PATH: /CycleCare/
```

This matches the current GitHub repository name and the Vite base-path configuration.

### GitHub Pages Setup

1. Open the repository Settings.
2. Navigate to Pages.
3. Select GitHub Actions as the deployment source.
4. Open the Actions tab.
5. Check the latest workflow execution.
6. Confirm that both build and deployment jobs succeed.

### Supabase Configuration for GitHub Actions

When enabling Supabase for the deployed application:

Open:

```text
Settings → Secrets and variables → Actions → Variables
```

Configure:

| Variable | Value |
|---|---|
| VITE_SUPABASE_URL | Your Supabase project URL |
| VITE_SUPABASE_ANON_KEY | Your public anon/publishable key |

These values are included in browser assets during the build. Never place service-role keys in these variables.

### Alternative Hosting

CycleCare can also be deployed using Vercel or Netlify.

Recommended build settings:

| Setting | Value |
|---|---|
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Base Path | `/` |

Configure the required public Supabase environment variables if cloud functionality is enabled.

---

## 🔐 Security & Privacy

Privacy is an important design consideration in CycleCare.

The current project includes:

- Supabase authentication integration.
- PostgreSQL Row Level Security policies.
- User-specific database access.
- Environment-based configuration.
- Data export and deletion controls.
- A local demonstration mode.

### Security Practices

- Never commit API secrets or private credentials.
- Never expose Supabase service-role keys in frontend code.
- Keep local environment files out of version control.
- Review RLS policies before enabling real-data usage.
- Avoid sending sensitive health information to analytics or advertising services.
- Use HTTPS for deployed applications.
- Review third-party integrations before enabling them.
- Establish clear data retention and deletion procedures.

Read the dedicated security documentation:

[SECURITY.md](./SECURITY.md)

### Before Real-World Use

CycleCare requires additional independent privacy, security, legal, and safeguarding review before collecting real personal health information.

This includes reviewing authentication, access controls, data retention, account deletion, backups, third-party services, consent, and age-appropriate safeguards.

---

## ⚠️ Project Limitations

CycleCare is currently a development and demonstration project.

Please note:

- Cycle predictions are approximate estimates and may be inaccurate.
- Cycle tracking is not a medical diagnosis or contraceptive method.
- Product listings are informational and do not support checkout or payment processing.
- Healthcare links are not a verified provider directory.
- Doctor appointment booking is not implemented.
- Community messaging and notifications are not implemented.
- Local preview mode uses browser storage and is not secure multi-user storage.
- Cloud authentication requires Supabase configuration.
- The current test suite primarily covers date and cycle utility functions.
- Application-wide security and privacy audits are not yet complete.

CycleCare does not replace professional medical advice.

The application should not be used to diagnose medical conditions or make medical decisions.

---

## 🗺️ Development Roadmap

The following are planned improvement areas, not claims that the features are already implemented.

- [ ] Add polished application screenshots.
- [ ] Improve responsive application layouts.
- [ ] Expand automated test coverage.
- [ ] Improve application error handling.
- [ ] Improve date and input validation.
- [ ] Improve complete personal-data export.
- [ ] Improve dependency management with a package lockfile.
- [ ] Improve accessibility.
- [ ] Expand Hindi and English localization.
- [ ] Review Supabase access policies.
- [ ] Improve privacy and consent documentation.
- [ ] Obtain qualified clinical review of educational content.
- [ ] Complete independent privacy and security assessments before real-world launch.

---

## 🤝 Contributing

Suggestions, bug reports, and development feedback are welcome.

### Reporting a Bug

Use the GitHub Issues section and the available bug report template.

https://github.com/yugank2612/CycleCare/issues

Please include:

- A clear description of the issue.
- Steps to reproduce.
- Expected behaviour.
- Actual behaviour.
- Browser and operating system information.

**Privacy reminder:** Never include real period dates, symptoms, health records, account credentials, or personal health screenshots in public issues.

### Contribution Guidelines

1. Fork the repository.
2. Create a feature branch.
3. Implement your changes.
4. Run the automated tests.
5. Run the production build.
6. Submit a pull request with a clear description.

---

## 📄 License

No open-source license has currently been specified for this repository.

Unless a license is added by the repository owner, the code should not be assumed to be available for unrestricted reuse, modification, or redistribution.

---

## 👨‍💻 Project Maintainer

**Yugank**

Student Developer | Full-Stack Development | AI Engineering

- **GitHub:** https://github.com/yugank2612
- **Portfolio:** https://yugank2612.github.io/yugank-portfolio/
- **Project Repository:** https://github.com/yugank2612/CycleCare
- **LinkedIn:** https://www.linkedin.com/in/yugank-141512326/

---

## 🌸 About CycleCare

CycleCare is a learning-driven software project exploring how modern web development, thoughtful product design, and privacy-conscious engineering can support menstrual wellness education.

Built with curiosity. Designed with care. Developed with purpose.

**YUGANK — Build. Explain. Create.**

*Learning continuously. Building practically. Improving consistently.*
