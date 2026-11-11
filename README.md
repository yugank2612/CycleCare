# 🌸 CycleCare

### Your Wellness. Your Privacy. Your Journey.

CycleCare is a modern, responsive menstrual wellness web application prototype designed to make menstrual health information, personal cycle tracking, and wellness resources more accessible.

Built with **React, Vite, JavaScript, and Supabase**, CycleCare combines a user-friendly interface with optional authentication and a privacy-focused database foundation.

**Track. Understand. Learn.**

---

## 📌 Project Overview

CycleCare brings menstrual wellness tools and educational resources together in one application.

The project focuses on:
- Personal cycle tracking.
- Menstrual health journaling.
- Wellness education.
- Period-care product discovery.
- Privacy-conscious application design.
- Accessible and responsive user experiences.

**Project Status:** Development / Demonstration Project

---

## ✨ Features

### 📅 Cycle Tracking
- Period settings.
- Cycle calendar.
- Approximate cycle predictions.
- Personalized cycle information.

### 📝 Health Journal
- Flow tracking.
- Symptom recording.
- Mood tracking.
- Private personal notes.

### 🛍️ Period-Care Resources
- Menstrual care product catalogue.
- Saved product list.
- Product discovery experience.

The current catalogue is informational. It does not process purchases or payments.

### 📚 Menstrual Health Education
- Educational resources.
- Menstrual health information.
- Wellness-focused content.

### 🏥 Healthcare Resources
- Doctor-finding information.
- External healthcare directory links.

External links are informational and do not represent a verified provider directory or appointment booking service.

### 🔐 Privacy & Account Features
- Optional Supabase authentication.
- PostgreSQL database integration.
- Row Level Security (RLS) policies.
- Data export and deletion controls.
- Local preview mode when Supabase is not configured.

---

## 🛠️ Technology Stack

| Category | Technologies |
|---|---|
| Frontend | React 18 |
| Build Tool | Vite 6 |
| Programming Language | JavaScript |
| UI Icons | Lucide React |
| Charts | Recharts |
| Authentication | Supabase Auth |
| Database | PostgreSQL |
| Database Security | Row Level Security |
| Backend Services | Supabase |
| Deployment | GitHub Pages |
| CI/CD | GitHub Actions |
| Version Control | Git & GitHub |

---

## 🖥️ Application Preview

Screenshots and visual demonstrations will be added here as the project documentation develops.

<!-- Add actual application screenshots in docs/images/ when available. -->

---

## 🚀 Getting Started

Follow these instructions to run CycleCare on your local computer.

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

### Step 1: Clone the repository

```bash
git clone https://github.com/yugank2612/CycleCare.git
```

### Step 2: Open the project directory

```bash
cd CycleCare
```

### Step 3: Install dependencies

```bash
npm install
```

### Step 4: Configure environment variables

The repository includes an `env.example` file.

Create your local environment file.

**Windows PowerShell:**

```powershell
Copy-Item env.example .env.local
```

**Git Bash / macOS / Linux:**

```bash
cp env.example .env.local
```

For local preview mode, Supabase configuration is optional.

If you want to enable Supabase, configure the following variables in `.env.local`:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_BASE_PATH=/
```

Replace the example values with your own public Supabase project configuration.

Never put a Supabase `service_role` key or other private credentials into frontend environment variables.

### Step 5: Start the development server

```bash
npm run dev
```

Vite will display a local development URL in your terminal.

Open that URL in your browser.

### Step 6: Build for production

```bash
npm run build
```

The production build will be generated in the `dist/` directory.

### Step 7: Preview the production build

```bash
npm run preview
```

---

## 🗄️ Supabase Configuration

CycleCare supports optional Supabase authentication and database integration.

### Step 1: Create a Supabase project

Visit:

https://supabase.com/

Create a project and configure its database.

### Step 2: Configure the database

Open the Supabase SQL Editor.

Execute the SQL file:

`supabase/schema.sql`

The schema includes:
- User profiles.
- Cycle entries.
- Database indexes.
- Row Level Security.
- User-specific database policies.
- Automatic profile creation after signup.

Review the database policies before connecting any real personal health information.

### Step 3: Configure authentication

In Supabase Authentication settings:

1. Enable email/password authentication.
2. Configure email confirmation.
3. Set appropriate redirect URLs.
4. Configure account recovery settings.

### Step 4: Configure environment variables

Add the following to `.env.local`:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_BASE_PATH=/
```

Restart the development server after making changes.

**Security reminder:** The frontend Supabase anon/publishable key is intended for browser use only when appropriate database access policies are correctly configured. Never expose a `service_role` key.

---

## 🌐 Deployment

CycleCare includes a GitHub Actions workflow for GitHub Pages deployment.

### GitHub Pages

The workflow is located at:

`.github/workflows/deploy.yml`

It:
- Runs when changes are pushed to the `main` branch.
- Installs project dependencies.
- Builds the React application using Vite.
- Uploads the production build.
- Deploys the application to GitHub Pages.

### Deployment Configuration

The repository workflow uses:

```env
VITE_BASE_PATH=/CycleCare/
```

This matches the current repository name and Vite configuration.

### GitHub Pages Setup

1. Open your repository settings.
2. Select Pages.
3. Set the deployment source to GitHub Actions.
4. Check the Actions tab for workflow results.
5. Confirm that the deployment completes successfully.

### Supabase Variables for Deployment

If you want Supabase enabled in the deployed application:

Open:

`Settings → Secrets and variables → Actions → Variables`

Add:

| Variable | Value |
|---|---|
| VITE_SUPABASE_URL | Your Supabase project URL |
| VITE_SUPABASE_ANON_KEY | Your public anon/publishable key |

These values are included in browser assets during the Vite build. Never place service-role keys in this configuration.

### Alternative Hosting

CycleCare can also be deployed using Vercel or Netlify.

Recommended build settings:

| Setting | Value |
|---|---|
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Base Path | `/` |

Configure the same public Supabase environment variables when enabling Supabase.

---

## 🔐 Security & Privacy

Privacy is an important part of CycleCare's design.

The project includes:
- Supabase authentication integration.
- PostgreSQL Row Level Security policies.
- User-specific access policies.
- Environment-based configuration.
- Data export and deletion controls.

### Important Security Practices

- Never commit API secrets or private credentials.
- Never expose Supabase service-role keys in frontend code.
- Keep environment files out of version control.
- Review Row Level Security policies before using real data.
- Avoid sending sensitive health information to analytics or advertising services.
- Use HTTPS for deployed applications.
- Review third-party integrations before enabling them.

Read the full security documentation:

[SECURITY.md](./SECURITY.md)

---

## ⚠️ Project Limitations

CycleCare is currently a demonstration and development project.

Please understand the following limitations:

- Cycle predictions are estimates and may not be accurate.
- Cycle tracking is not a medical diagnosis or contraceptive method.
- The product catalogue does not include checkout or payment processing.
- Healthcare directory links are not a verified provider directory.
- Doctor appointment booking is not implemented.
- AI health assistance and community messaging are not included.
- Local preview mode uses browser storage and is not appropriate for sensitive information on shared devices.
- Authentication and database configuration require additional security review before real-world use.

CycleCare is not a substitute for professional medical advice.

The application should not be used to diagnose medical conditions.

---

## 🗺️ Development Roadmap

The following are planned development goals, not claims of completed functionality.

- [ ] Improve application accessibility.
- [ ] Add polished application screenshots.
- [ ] Improve mobile user experience.
- [ ] Expand menstrual health educational resources.
- [ ] Complete additional privacy and security testing.
- [ ] Review database access policies.
- [ ] Improve error handling and validation.
- [ ] Add Hindi and English localization.
- [ ] Review healthcare content with qualified professionals.
- [ ] Evaluate consent and age-appropriate safeguards.
- [ ] Conduct independent privacy and security assessments before any real-world health-data launch.

---

## 🤝 Contributing

Suggestions, bug reports, and development feedback are welcome.

To suggest an improvement:

1. Open an issue describing the problem or proposed feature.
2. Include steps to reproduce bugs where possible.
3. Discuss larger changes before implementing them.
4. Submit a pull request with a clear explanation of your changes.

Please do not submit real personal health information in public issues or pull requests.

---

## 📄 License

No license has currently been specified for this repository.

Unless a license is added by the repository owner, the code should not be assumed to be available for unrestricted reuse.

---

## 👨‍💻 Project Maintainer

**Yugank**

Student Developer | Full-Stack Development | AI Engineering

- GitHub: https://github.com/yugank2612
- Project: https://github.com/yugank2612/CycleCare
- Portfolio: https://yugank2612.github.io/yugank-portfolio/

---

## 🌸 About CycleCare

CycleCare is a learning-driven software project exploring how modern web development, thoughtful product design, and privacy-conscious engineering can support menstrual wellness education.

**Built with curiosity. Designed with care. Developed with purpose.**

---

**YUGANK — Build. Explain. Create.**
