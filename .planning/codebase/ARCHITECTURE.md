# Architecture Overview

## Application Architecture
Stalight Web is a modern Single Page Application (SPA) built with React 18, TypeScript, and Vite.

```
┌─────────────────────────────────────────────────────────────┐
│                       React Router                          │
│        (Lazy loaded Pages via Suspense & LoadingScreen)     │
└──────────────┬───────────────────────────────┬──────────────┘
               │                               │
┌──────────────▼──────────────┐ ┌──────────────▼──────────────┐
│       Landing / Showcase    │ │    Interactive Portals      │
│  - Index (Hero, Products,   │ │  - Certificate Verification │
│    Services, About, Reviews)│ │  - NDA Consent & Onboarding │
│  - Product & Service pages  │ │  - Contact & Inquiry Forms  │
└──────────────┬──────────────┘ └──────────────┬──────────────┘
               │                               │
┌──────────────▼───────────────────────────────▼──────────────┐
│                      Core Services & State                  │
│   - TanStack React Query (Global Server State caching)      │
│   - Supabase Client (`src/lib/supabaseClient.ts`)          │
│   - EmailJS Client (`src/lib/emailService.ts`)              │
│   - Certificate & NDA API (`src/services/*`)                │
└─────────────────────────────────────────────────────────────┘
```

## Key Architectural Patterns
1. **Route-Level Code Splitting**:
   - `src/App.tsx` lazy-loads each route using React's `Suspense` and `lazy` wrapper to ensure optimal initial bundle size and rapid Time to Interactive (TTI).
2. **Design System & Component Architecture**:
   - Built on Radix UI primitives inside `src/components/ui/` with Tailwind CSS classes composed via `clsx` and `tailwind-merge` (`cn` helper in `src/lib/utils.ts`).
   - Modular section components (`HeroSection`, `AboutSection`, `ServicesSection`, `ProductsSection`, `ContactSection`, etc.) cleanly decouple layout and view logic.
3. **Dual Submission / Failover Logic**:
   - Contact form submissions prioritize Supabase PostgreSQL storage with fallbacks / parallel notifications sent through EmailJS.
4. **Interactive Security Portals**:
   - Secure digital signing interface (`NDAConsentPortal`) leveraging Canvas-based signatures with backend storage and verification workflows.
