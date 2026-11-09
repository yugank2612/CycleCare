# CycleCare 🌸 — v2

A premium, responsive menstrual wellness app starter for girls and women. Built with React + Vite, with optional Supabase authentication and a privacy-focused database schema.

## Included
- Premium responsive dashboard and mobile navigation
- Period settings, calendar and approximate cycle estimate
- Health journal: flow, symptoms, mood and private notes
- Menstrual care product catalogue and saved list (no checkout)
- Doctor-finding information and external directory links
- Menstrual-health education pages
- Data export and delete controls
- Supabase email/password auth integration
- PostgreSQL schema with Row Level Security policies

## Run locally
Requires Node.js 18+.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open the local URL printed by Vite. If Supabase environment variables are not configured, the app runs in local preview mode.

## Enable Supabase
1. Create a Supabase project.
2. Open SQL Editor and run `supabase/schema.sql`.
3. In Authentication settings, enable email/password and email confirmation.
4. Configure allowed redirect URLs for localhost and your production domain.
5. Copy the project URL and anon/publishable key into `.env.local`.
6. Restart the dev server.

Never put a Supabase `service_role` key in `.env.local` or frontend code. The anon key is designed for browser use only when RLS is correctly configured.

## Deploy to GitHub Pages
This project uses Vite. The included GitHub Actions workflow is configured for a repository named `cyclecare` and sets the Vite base path to `/cyclecare/`. If you choose a different repository name, update `VITE_BASE_PATH` in `.github/workflows/deploy.yml` to `/<your-repository-name>/`. For a user/organization root site, use `/`. The workflow builds and publishes `dist` automatically. Configure environment variables as GitHub Actions secrets/vars; note that Vite embeds `VITE_` values into public browser assets, so only the Supabase anon key may be used there.

A simpler deployment is Vercel or Netlify: import the GitHub repository, set build command `npm run build`, output directory `dist`, and add the two `VITE_SUPABASE_*` variables.

## Security and privacy
Read [SECURITY.md](./SECURITY.md) before connecting real users. Menstrual and symptom data is sensitive. This starter is not certified, audited or legally reviewed. RLS is a baseline, not a substitute for a full security review.

## Scope limitations
- Cycle calculations are estimates only; they are not contraception or diagnosis.
- Product catalogue is informational; no inventory, payment or order processing.
- Doctor links are not a verified provider directory and do not book appointments.
- No push notifications, AI health assistant, community forum or messaging in this release.
- Local preview mode stores data in browser local storage and is not suitable for shared devices.
- For younger users, age-appropriate safeguarding, consent and local legal review are required before collecting personal health information.

## Recommended next milestones
1. Clinician-reviewed content and medical safety review.
2. Verified doctor directory and consent-based appointment requests.
3. Secure merchant integrations and checkout (PCI-compliant provider; no card storage).
4. Opt-in reminders with private notification previews.
5. Hindi/English localisation and accessibility testing.
6. Independent privacy and security review before public release.
