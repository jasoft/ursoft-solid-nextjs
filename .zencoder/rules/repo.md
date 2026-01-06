---
description: Repository Information Overview
alwaysApply: true
---

# Solid Next.js SaaS Template Information

## Summary
Solid is a free, feature-rich Next.js template designed for SaaS, startups, and software websites. It provides pre-built sections and components including hero areas, features, testimonials, pricing tables, FAQ, blog, and contact pages. The template uses Next.js 16, React 19, and TypeScript with a static export configuration.

## Structure
The project uses Next.js App Router with the following main directories:

- **`app/`** - Next.js application root with route handlers, API routes, and global styles
- **`components/`** - Reusable UI components organized by feature (Hero, Features, FAQ, Testimonials, Blog, Pricing, etc.)
- **`lib/`** - Utility functions and shared logic
- **`types/`** - TypeScript type definitions for blog, features, FAQs, testimonials, and other content types
- **`markdown/`** - Markdown content files for documentation and old site migration
- **`public/`** - Static assets, images, favicons, and redirects
- **`scripts/`** - Node.js build and utility scripts (image optimization, markdown conversion)
- **`out/`** - Static export output directory

## Language & Runtime
**Language**: TypeScript  
**Node.js Version**: Not explicitly specified (use latest LTS recommended)  
**React Version**: 19.2.0  
**Next.js Version**: 16.0.5  
**TypeScript Version**: 5.2.2  
**Output Mode**: Static export (output: 'export' in next.config.js)  
**Build System**: Next.js built-in build system

## Dependencies

**Main Dependencies**:
- `next` (16.0.5) - React framework
- `react` (19.2.0) - UI library
- `react-dom` (19.2.0) - React DOM binding
- `framer-motion` (^12.0.6) - Animation library
- `lucide-react` (^0.555.0) - Icon library
- `next-mdx-remote` (^5.0.0) - MDX rendering for blog
- `next-themes` (^0.2.1) - Theme management (dark mode)
- `react-hot-toast` (^2.4.1) - Toast notifications
- `swiper` (^9.3.2) - Carousel/slider functionality

**Development Dependencies**:
- `@next/mdx` (^16.0.5) - MDX support for Next.js
- `tailwindcss` (^4.1.3) - Utility-first CSS framework
- `@tailwindcss/postcss` (^4.1.3) - Tailwind PostCSS plugin
- `postcss` (^8.4.31) - CSS transformations
- `typescript` (^5.2.2) - Type checking
- `eslint` (^9.24.0) - Code linting
- `eslint-config-next` (16.0.5) - ESLint config for Next.js
- `prettier` (^3.0.3) - Code formatting
- `prettier-plugin-tailwindcss` (^0.6.11) - Tailwind class sorting
- `sharp` (^0.34.5) - Image processing
- `imagemin` and related packages - Image optimization tools

**Note**: React 19 causes peer dependency issues; use `npm install --legacy-peer-deps` during installation.

## Build & Installation

```bash
npm install --legacy-peer-deps
npm run dev
npm run build
npm start
npm run lint
npm run optimize:images
```

**Commands**:
- `npm run dev` - Start development server on localhost:3000
- `npm run build` - Build static site for export (creates `out/` directory)
- `npm start` - Serve the static export using `serve` package on port 3000
- `npm run lint` - Run ESLint to check code quality
- `npm run optimize:images` - Run image optimization script on public images

## Configuration

**TypeScript**: ES2017 target, strict null checks enabled, JSX support via React plugin, path alias `@/*` mapped to root

**Next.js**: 
- App Router with MDX support
- Static export mode enabled
- Page extensions: ts, tsx, md, mdx
- Unoptimized images (no Next.js image optimization for static export)
- Strict React mode enabled

**Styling**: Tailwind CSS v4 via PostCSS with Prettier plugin for class sorting

## Main Files & Entry Points

**Application Entry**: `app/(site)/page.tsx` - Main homepage  
**API Routes**: `app/api/` - API endpoints  
**Global Styles**: `app/globals.css` - Tailwind configuration and global styles  
**Content Data**: `app/content.ts` - Central content definitions (32 KB, contains structured data for components)  
**Type Definitions**: `types/` - TypeScript types for blog, features, FAQ, testimonials, brands, menus, etc.  
**Dynamic Metadata**: `app/robots.ts`, `app/sitemap.ts` - SEO configuration  

## Code Quality & Linting

**Linter**: ESLint 9.24.0 with Next.js configuration  
**Formatter**: Prettier 3.0.3 with Tailwind plugin  
**Configuration**: `.prettierrc.json` for formatting rules

