
# Stalight Web

Modern, responsive website built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- 🎨 **Responsive Design** - Mobile-first, works on all devices
- ⚡ **Fast Performance** - Built with Vite for lightning-fast builds
- 🎯 **Contact Form** - Integrated with EmailJS for notifications
- 📱 **Modern UI** - Shadcn/ui components with smooth animations
- 🚀 **Production Ready** - Optimized build and deployment

## Getting Started

### Prerequisites
- Node.js 16+ (or Bun)
- npm or bun package manager

### Installation

```bash
# Clone and install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Setup EmailJS (Contact Form)

1. Go to [EmailJS](https://www.emailjs.com/) and create a free account
2. Set up an email service (Gmail recommended)
3. Create an email template named `contact_form`
4. Get your **Service ID**, **Template ID**, and **Public Key**
5. Update `.env` file:

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=contact_form
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_ADMIN_EMAIL=admin@example.com
```

6. Restart dev server - emails will now be sent automatically

## Project Structure

```
src/
├── components/        # React components
│   ├── ui/           # Shadcn UI components
│   └── *.tsx         # Page sections
├── lib/              # Utilities & services
│   ├── contactService.ts
│   ├── emailService.ts
│   └── utils.ts
├── pages/            # Page routes
├── hooks/            # Custom React hooks
└── assets/           # Images & media
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## Deployment

Configured for Vercel. Push to main branch for automatic deployment.

## Technologies

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Tailwind CSS** - Styling
- **Shadcn/ui** - Component library
- **Framer Motion** - Animations
- **React Router** - Navigation
- **EmailJS** - Email service

## License

Private project
