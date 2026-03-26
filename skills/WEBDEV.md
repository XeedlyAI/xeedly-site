# WEBDEV.md — Core Web Development Standards

## Stack
- Next.js 15 (App Router, Server Components by default)
- TypeScript (strict mode)
- Tailwind CSS with custom design tokens
- shadcn/ui components (customized per project, not default styling)
- Framer Motion for animations
- next/font for typography
- next/image for all images

## Architecture Patterns
- App Router: src/app/ directory structure
- Layout hierarchy: root layout → section layouts → pages
- Server Components by default; "use client" only when interactivity requires it
- API routes in src/app/api/ for form submissions, webhooks
- Shared components in src/components/
- Section components in src/components/sections/
- Layout components in src/components/layout/
- Utilities in src/lib/
- Design tokens in tailwind.config.ts or src/app/globals.css

## Page Template
Every page must include:
- Metadata export (title, description, openGraph, twitter)
- JSON-LD structured data (Organization, LocalBusiness, FAQPage as relevant)
- Semantic HTML (main, article, section, nav, header, footer)
- Proper heading hierarchy (single H1, logical H2/H3 structure)
- Responsive design (mobile-first)

## Performance Requirements
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- First Input Delay: < 100ms
- No layout shifts from font loading (use font-display: swap)
- Lazy load all below-fold images
- Minimize client-side JavaScript — prefer Server Components

## Component Patterns
- Props interfaces defined with TypeScript
- Default exports for pages, named exports for components
- Use composition over prop drilling
- Keep components focused — one responsibility per component
- Extract repeated UI patterns into shared components

## Structured Data Helper
Create a utility at src/lib/structured-data.ts for generating JSON-LD:

- organizationSchema(name, url, logo, contactPoint, sameAs)
- localBusinessSchema(name, address, geo, phone, hours, url)
- faqPageSchema(questions: {question: string, answer: string}[])
- articleSchema(title, author, datePublished, dateModified, description)
- serviceSchema(name, description, provider, areaServed)

Each function returns a valid JSON-LD object. Render in pages using:
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
