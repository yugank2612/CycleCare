# CycleCare security notes

## Current security posture
- Frontend prototype uses Supabase Auth when configured.
- The browser uses only the Supabase anon/publishable key.
- `supabase/schema.sql` enables Row Level Security (RLS) on profile and journal tables and scopes access to `auth.uid()`.
- Without Supabase configuration, the app falls back to local browser storage. This is a demo convenience, not secure multi-user storage.
- There is no server-side payment, doctor booking, messaging, analytics, or notification system in this release.

## Before real users
1. Have a qualified security engineer review schema, RLS, auth settings, logs, backups and deployment.
2. Require email confirmation, strong password policy, rate limits and account recovery safeguards.
3. Enable HTTPS, configure strict allowed redirect URLs, and use a restrictive Content Security Policy.
4. Never expose Supabase `service_role` keys or other secrets in client code or Git.
5. Keep health data out of analytics, crash reports, URLs, advertising pixels and support logs.
6. Define retention, export, deletion, backup deletion and incident response procedures.
7. Add age-appropriate consent and safeguarding flows; obtain legal advice before collecting data from minors.
8. Minimise collection. Do not collect precise location, contacts, school details or identity documents for period tracking.
9. Review any third-party SDK and data processor before enabling it.
10. Perform independent penetration testing and privacy impact assessment before launch.

## Health safety
- Cycle estimates are informational and are not contraception or a diagnosis.
- Do not use an algorithm to diagnose PCOS, endometriosis, pregnancy, infertility or other conditions.
- Medical content and emergency guidance require review by licensed clinicians in the target market.
- A doctor directory must verify provider credentials and display clear booking/availability terms.
