# Integrations & External Services

## Backend & Database
- **Supabase**:
  - SDK: `@supabase/supabase-js` (v2.106.1)
  - Client configuration in `src/lib/supabaseClient.ts`
  - Tables: `contact_inquiries` (stores public contact queries with Row-Level Security enabled)
  - Services: `src/lib/supabaseContactService.ts`, `src/lib/supabaseFormService.ts`

## Email Delivery
- **EmailJS**:
  - Packages: `@emailjs/browser` (v4.4.1), `emailjs-com` (v3.2.0)
  - Service logic in `src/lib/emailService.ts` and fallback hooks in `src/lib/contactService.ts`
  - Variables required: `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`, `VITE_ADMIN_EMAIL`

## Verification & NDA Services
- **Certificate Verification**:
  - Service in `src/services/certificateApi.ts` for verifying issued certificates and offer letters.
- **NDA / Onboarding Consent**:
  - Service in `src/services/ndaConsentApi.ts`
  - Digital signature capture using `react-signature-canvas`

## Hosting & CDN Configurations
- **Vercel**: SPA routing rewrite rules configured in `vercel.json`
- **Netlify**: Header rules, caching headers, and SPA redirects in `netlify.toml`
- **Apache Web Server**: Custom URL rewrite rules in `.htaccess`
