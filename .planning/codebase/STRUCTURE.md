# Directory Structure & Organization

```
Stalight_website/
├── .code-review-graph/      # Automated code review graph knowledge base
├── .planning/               # GSD project roadmap, requirements, and intelligence
│   └── codebase/            # Codebase analysis and architectural documentation
├── public/                  # Static assets served at root (icons, images, robots.txt)
├── src/
│   ├── assets/              # Component-level static media and images
│   ├── components/
│   │   ├── nda/             # NDA digital signing portal & onboarding widgets
│   │   ├── ui/              # Reusable Shadcn UI / Radix primitive components
│   │   │   ├── accordion.tsx, alert-dialog.tsx, button.tsx, dialog.tsx,
│   │   │   ├── dropdown-menu.tsx, input.tsx, select.tsx, sonner.tsx, etc.
│   │   ├── AboutSection.tsx # About section layout
│   │   ├── Breadcrumbs.tsx  # Dynamic navigation breadcrumbs
│   │   ├── ContactSection.tsx # Inquiry & contact form component
│   │   ├── Footer.tsx       # Global footer
│   │   ├── HeroCarousel.tsx # Hero visual slider
│   │   ├── HeroSection.tsx  # Primary landing hero banner
│   │   ├── Navbar.tsx       # Responsive top navigation & menu drawer
│   │   ├── SEO.tsx          # Dynamic Helmet meta and OpenGraph tags
│   │   └── ...
│   ├── hooks/               # Custom React hooks
│   │   ├── use-mobile.tsx   # Viewport detection hook
│   │   ├── use-toast.ts     # Toast notification state hook
│   │   ├── useLaunchCountdown.ts # Launch timer logic
│   │   └── useScrollReveal.ts    # Scroll intersection observer hook
│   ├── lib/                 # Utility libraries and API client abstractions
│   │   ├── autoReveal.ts    # Animation reveal triggers
│   │   ├── contactService.ts# Contact API handler
│   │   ├── emailService.ts  # EmailJS integration wrapper
│   │   ├── supabaseClient.ts# Supabase client singleton
│   │   ├── supabaseContactService.ts # Supabase contact table operations
│   │   ├── supabaseFormService.ts    # Form schema & persistence
│   │   └── utils.ts         # `cn` className helper
│   ├── pages/               # Route components (Pages)
│   │   ├── AboutUs.tsx      # Company story, team, and mission
│   │   ├── AccountDeletion.tsx # Account management compliance page
│   │   ├── Index.tsx        # Main homepage
│   │   ├── ITServices.tsx   # IT & cloud infrastructure offerings
│   │   ├── NDAOnboarding.tsx# Secure onboarding route
│   │   ├── NeuroCampus.tsx  # Campus platform showcase
│   │   ├── NeuroCampusAccessPlan.tsx # Campus pricing & access tier
│   │   ├── NeuroSync.tsx    # Stalight Sync product details
│   │   ├── PrivacyPolicy.tsx# Legal privacy policy
│   │   ├── SkillDevelopment.tsx # Learning & internship programs
│   │   ├── SoftwareDevelopment.tsx # Custom software development showcase
│   │   ├── TermsOfService.tsx  # Terms of service agreement
│   │   └── VerifyCertificate.tsx # Certificate verification portal
│   ├── services/            # Domain service APIs (Certificate & NDA APIs)
│   ├── utils/               # General helper functions
│   ├── App.tsx              # Root router, providers, Suspense layout
│   ├── index.css            # Tailwind directives, CSS variables, theme design tokens
│   └── main.tsx             # React DOM root entry point
├── eslint.config.js         # ESLint 9 flat configuration
├── tailwind.config.ts       # Tailwind CSS theme extension and color palette
├── vite.config.ts           # Vite build, aliases, and plugin configuration
└── vitest.config.ts         # Vitest test suite runner configuration
```
