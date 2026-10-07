# Code Conventions & Style Guide

## TypeScript & Code Quality
- **Strict Typing**: TypeScript `strict: true` enabled across all modules (`tsconfig.app.json`).
- **Path Aliasing**: Use `@/*` pointing to `./src/*` across imports (configured in both `tsconfig.json` and `vite.config.ts`).
- **Component Style**:
  - Functional components with React 18 hooks.
  - PascalCase for React component files (`Navbar.tsx`, `HeroSection.tsx`).
  - camelCase for utility functions, hooks, and services (`useScrollReveal.ts`, `contactService.ts`).

## Styling & Theme System
- **Tailwind CSS Utility Classes**:
  - Combine conditional classes using `cn(...)` from `@/lib/utils`.
  - Design tokens defined in `src/index.css` via CSS variables (`--primary`, `--secondary`, `--background`, `--foreground`, etc.) mapped in `tailwind.config.ts`.
  - Dark mode and light mode class transitions handled via standard HSL color palettes.

## Linting Rules
- ESLint 9 Flat Config (`eslint.config.js`) enforces:
  - React Hooks rules (`eslint-plugin-react-hooks`)
  - React Refresh rules (`eslint-plugin-react-refresh`)
  - TypeScript linting (`typescript-eslint`)
