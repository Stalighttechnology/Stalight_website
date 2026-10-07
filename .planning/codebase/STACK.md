# Technology Stack

## Core Technologies
- **Runtime / Package Manager**: Node.js (v18+) / npm & bun support (`bun.lockb`, `package-lock.json`)
- **Frontend Framework**: React 18.3.1 (TypeScript 5.8.3)
- **Build Tool**: Vite 8.0.14
- **Styling**: Tailwind CSS 3.4.17 with PostCSS & Autoprefixer, `@tailwindcss/typography`, `tailwindcss-animate`
- **Component UI**: Radix UI primitives (`@radix-ui/react-*`), Lucide Icons (`lucide-react`), Shadcn UI conventions
- **Animation & Motion**: Framer Motion 12.38.0, Embla Carousel (`embla-carousel-react`), `canvas-confetti`
- **Routing**: React Router DOM 6.30.1 (`BrowserRouter` with dynamic lazy loading & `Suspense`)
- **Server State & Data Fetching**: TanStack React Query 5.83.0
- **Forms & Validation**: React Hook Form 7.61.1 + Zod 3.25.76 (`@hookform/resolvers`)
- **SEO & Metadata**: `react-helmet-async` 3.0.0, `vite-plugin-sitemap` 0.8.2

## Development & Tooling
- **Linting**: ESLint 9.32.0 (Flat config with `@eslint/js`, `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`)
- **Testing**: Vitest 4.1.8 with `@testing-library/react` 16.0.0, `@testing-library/jest-dom` 6.6.0, `jsdom` 29.1.0
- **Vite Plugins**: `@vitejs/plugin-react-swc`, `@vitejs/plugin-react`, `lovable-tagger`
- **Deployment Targets**: Vercel (`vercel.json`), Netlify (`netlify.toml`), Apache/cPanel (`.htaccess`)
