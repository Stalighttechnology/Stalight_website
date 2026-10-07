# Codebase Concerns & Observations

## 1. Test Suite Setup
- `vitest.config.ts` specifies `src/test/setup.ts`, but the file has not yet been initialized.
- Existing coverage: No test files (`*.test.ts` or `*.spec.ts`) exist yet in `src/`. Creating unit tests for key utility functions and services (`contactService`, `supabaseContactService`, `utils`) is recommended.

## 2. Duplicate Dependencies
- Both `@emailjs/browser` (v4.4.1) and legacy `emailjs-com` (v3.2.0) are declared in `package.json`. Migrating all calls to `@emailjs/browser` will reduce bundle overhead.

## 3. Environment Variable Safety
- Supabase and EmailJS client variables rely on `import.meta.env.*`. Ensuring robust fallbacks and descriptive error messages when environment keys are missing prevents unhandled client exceptions.

## 4. Large Page Components
- Certain pages (e.g. `NeuroCampus.tsx` ~75KB, `NDAConsentPortal.tsx` ~35KB) have extensive inline JSX that could be broken down into sub-components for improved maintainability.
