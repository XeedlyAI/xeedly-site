# DESIGN.md — Visual Design Standards

## Philosophy
- Every site must have a distinctive aesthetic — no generic AI look
- Choose a clear design direction BEFORE writing any CSS
- Typography is the #1 differentiator
- Color palette: 1 dominant + 1 accent + neutrals. No rainbow.
- Whitespace is a design element, not empty space

## Typography Rules
- Load 2 fonts maximum via next/font (display + body)
- NEVER use as primary: Inter, Roboto, Arial, system-ui, Helvetica
- Body: 16-18px base, 1.6-1.8 line height
- Headings: clear size hierarchy with consistent scale ratio
- Use CSS variables for font families so they're easy to swap per project:
  --font-sans, --font-serif, --font-mono

## Color System
- Define ALL colors as CSS variables in :root and .dark
- Provide both light and dark mode variables when brief requests it
- Accent color: use sparingly for CTAs and emphasis only
- Text hierarchy: primary, secondary, muted (3 levels minimum)
- Never use pure black (#000) or pure white (#fff) — always slightly tinted
- Define colors in globals.css using HSL format for Tailwind compatibility

## Layout
- Max content width: 1100-1200px (container)
- Section padding: generous (80-120px vertical on desktop, 48-64px mobile)
- Grid: CSS Grid for page layout, Flexbox for component layout
- Mobile breakpoint: 768px (md in Tailwind)
- Responsive approach: mobile-first always

## Animation
- Prefer CSS transitions for simple hover/focus states
- Use Framer Motion for scroll-triggered reveals and complex sequences
- Page load: subtle fade-up on scroll for sections (stagger delay)
- Hover states: every interactive element has a transition
- Duration: 200-300ms for micro-interactions, 400-600ms for reveals
- Easing: ease-out for entrances

## Component Styling Approach
- Use Tailwind utilities for layout, spacing, and responsive behavior
- Use CSS variables for brand-specific colors and fonts
- Customize shadcn/ui components to match the project's aesthetic — never ship default shadcn styling
- Buttons: minimum 44px touch target height, clear hover/active states
- Cards: consistent border-radius, subtle shadow or border (match the aesthetic)
- Glass effect (when appropriate): backdrop-blur + semi-transparent bg + subtle border

## Images & Media
- All images via next/image with explicit width/height
- Use placeholder="blur" for above-fold images when possible
- Decorative images: aria-hidden="true", empty alt=""
- Content images: descriptive alt text (include keyword naturally if relevant)
