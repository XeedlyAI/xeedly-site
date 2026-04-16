# DESIGN_SYSTEM.md

Reference standard for all Xeedly-family projects. Drop this into any new project's root so every color, font, spacing, and component decision is made up front. Claude Code should read this at session start.

---

## 1. Color System

All colors are hex or rgba. No OKLCH. No Tailwind named colors (e.g. `blue-500`). Every value is explicit.

### Brand

| Token | Value | Usage |
|---|---|---|
| `--primary` | `#38b6ff` | Primary CTA, links, highlights, accent borders |
| `--primary-dark` | `#0A8FD4` | Primary hover state |
| `--purple` | `#8b5cf6` | Secondary accent, "deep" tier, AI-generated labels |

### Dark Surfaces

| Token | Value | Usage |
|---|---|---|
| `--nav-dark` | `#0f172a` | Primary dark background, nav, hero, footer |
| `--nav-dark-lighter` | `#1e293b` | Slightly lighter dark surface |

### Light Section Washes

These create visual rhythm between content sections. Alternate them; never use the same wash twice consecutively.

| Token | Value | CSS Class |
|---|---|---|
| white | `#FFFFFF` | `.section-white` |
| off-white | `#FAFAFA` | `.section-off-white` |
| blue-wash | `#F0F6FF` | `.section-blue-wash` |
| warm-wash | `#F5F5F0` | `.section-warm-wash` |
| mint-wash | `#F0FFF4` | `.section-mint-wash` |
| lavender-wash | `#F5F3FF` | `.section-lavender-wash` |

All light sections use `color: #0f172a`. All dark sections use `color: #f1f5f9`.

### Text Palette

| Context | Value | Usage |
|---|---|---|
| Dark heading | `#0f172a` | H1–H3 on light backgrounds |
| Body text | `#334155` | Paragraphs on light backgrounds |
| Muted text | `#64748b` | Labels, timestamps, secondary info |
| Light heading | `#f1f5f9` | H1–H3 on dark backgrounds |
| Light secondary | `#94a3b8` | Body text on dark backgrounds |
| Light muted | `#64748b` | Labels on dark backgrounds |

### Borders

| Context | Value |
|---|---|
| Light border | `#e2e8f0` |
| Dark border | `rgba(255,255,255,0.08)` |
| Blue accent border (hover) | `rgba(56,182,255,0.12)` → `rgba(56,182,255,0.2)` on hover |

### Status / Severity Colors

| Severity | Color | Left Border | Usage |
|---|---|---|---|
| Urgent/High | `#ef4444` / `#f59e0b` | 3px left | Red for critical, amber for warning |
| Medium | `#3b82f6` | 3px left | Informational signals |
| Good/Low | `#14b8a6` | 3px left | Success, positive, teal |
| Info | `#38b6ff` | 3px left | Primary blue, neutral info |

**CSS classes for left-border accents:**
```css
.status-urgent  { border-left: 3px solid #ef4444; }
.status-attention { border-left: 3px solid #f59e0b; }
.status-good    { border-left: 3px solid #14b8a6; }
.status-info    { border-left: 3px solid #38b6ff; }
```

### Status Badge Colors

Badges use tinted backgrounds at 10% alpha with matching text:

| Status | Text | Background |
|---|---|---|
| Live | `#14b8a6` | `rgba(20,184,166,0.10)` |
| Shipping | `#3b82f6` | `rgba(59,130,246,0.10)` |
| In Build | `#f59e0b` | `rgba(245,158,11,0.10)` |
| Recommended | `#0A8FD4` | `rgba(56,182,255,0.10)` |

---

## 2. Typography

### Font Stack

| Role | Family | Variable | Loaded Via |
|---|---|---|---|
| Sans (body, headings) | Inter | `--font-sans` | `next/font/google` with `display: swap`, subset `latin` |
| Mono (labels, data, UI chrome) | JetBrains Mono | `--font-mono` | `next/font/google` with `display: swap`, subset `latin` |

### Font Sizing Rules

**Never use Tailwind text-{size} tokens.** Always use explicit pixel sizes via `text-[Npx]` or `clamp()`.

| Element | Size | Weight | Other |
|---|---|---|---|
| H1 (hero) | `clamp(2rem, 4.6vw, 3.25rem)` | Bold | `leading-[1.08] tracking-[-0.01em]` |
| H2 (section) | `clamp(1.75rem, 3.2vw, 2rem)` | Bold | `tracking-tight` |
| H3 (card title) | `15px`–`18px` | Semibold/Bold | — |
| Body (paragraphs) | `13px`–`16px` | Normal | `leading-[1.55]` to `leading-[1.6]` |
| Intro/description | `14px`–`17px` | Normal | `leading-[1.6]` |
| Eyebrow / section label | `10px`–`11px` | Semibold | `font-mono uppercase tracking-[0.15em]` |
| Mono label (nav, footer) | `11px` | Semibold | `font-mono uppercase tracking-[0.08em]` |
| Tag/badge | `9px`–`10px` | Semibold | `font-mono uppercase tracking-[0.08em]–[0.12em]` |
| KPI value | `20px`–`22px` | Bold | `font-mono tabular-nums leading-none` |
| Timestamp | `10px` | Normal | `font-mono` |

### Key Typography Pattern

**Eyebrow → Heading → Body.** Nearly every section uses this pattern:

```
[10px font-mono semibold uppercase tracking-[0.15em] — muted color]
[H2 clamp() font-bold tracking-tight — dark color]
[14px body text — body color, max-w-xl mx-auto]
```

---

## 3. Spacing & Layout

### Section Padding

```
py-24 md:py-32          // 96px mobile, 128px desktop
px-4 sm:px-6 lg:px-8    // 16/24/32px horizontal gutter
```

### Container

```
mx-auto max-w-7xl       // Standard content container (1280px)
mx-auto max-w-5xl       // Narrow (console section, 1024px)
mx-auto max-w-3xl       // Tight (CTA sections, 768px)
```

### Grid Patterns

| Pattern | Usage |
|---|---|
| `grid-cols-1 md:grid-cols-2 gap-5` | Product cards, 2-up layouts |
| `grid-cols-1 md:grid-cols-3 gap-5` | Feature cards, pricing tiers, intelligence stack |
| `grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14` | Hero layout (7/5 split) |
| `grid-cols-1 md:grid-cols-12 gap-10` | Footer (4/2/2/4 column split) |

### Standard Gaps

| Token | Pixels | Usage |
|---|---|---|
| `gap-1` / `space-y-1` | 4px | Tight stacking (suggestion rows) |
| `gap-2` | 8px | Button groups, tag rows |
| `gap-3` | 12px | Card internal spacing |
| `gap-5` | 20px | Grid gaps, card groups |
| `gap-10` | 40px | Major grid gaps |
| `mb-10`–`mb-14` | 40–56px | Section header → content gap |

---

## 4. Card Treatments

### .dash-card (Light Surface)

```css
.dash-card {
  background: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02);
  border-radius: 12px;
  transition: all 0.2s ease;
}
.dash-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.06), 0 2px 4px rgba(0,0,0,0.03);
  transform: translateY(-1px);
}
```

### .dash-card-dark (Dark Surface)

```css
.dash-card-dark {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(56,182,255,0.12);
  border-radius: 12px;
  transition: all 0.2s ease;
}
.dash-card-dark:hover {
  background: rgba(255,255,255,0.06);
  border-color: rgba(56,182,255,0.2);
  transform: translateY(-1px);
}
```

### Inline Card (Dark Glass)

Used for footer columns, nav pill, contact widget. Applied via inline styles:

```
background: rgba(255,255,255,0.03)
border: 1px solid rgba(255,255,255,0.06)
```

### Card Padding

| Context | Padding |
|---|---|
| Standard card | `p-6 md:p-7` (24/28px) |
| Compact card | `p-4 md:p-5` (16/20px) |
| Tight (inline) | `p-3` (12px) |

### Left-Border Accent Cards

Cards signal their type via a 3px left border:

```html
<div class="dash-card p-6" style="border-left: 3px solid #14b8a6">
```

Colors follow the severity/status palette. This is the **primary visual taxonomy** across the system.

---

## 5. Button Treatments

### Primary CTA

```
bg-[#38b6ff] hover:bg-[#0A8FD4] text-[#0f172a]
font-semibold text-[13px]–[15px]
rounded-lg px-7 py-3
```

### Secondary CTA (Light on Dark)

```
border border-white/15 hover:border-white/30
text-[#f1f5f9] font-medium text-[14px]
rounded-lg px-7 py-3
```

### Ghost CTA (Blue on Dark)

```
border border-[#38b6ff]/40 hover:border-[#38b6ff] hover:bg-[#38b6ff]/10
text-[#38b6ff] font-semibold text-[14px]
rounded-lg px-8 py-3.5
```

### Nav CTA (Pill Shape)

```
rounded-full px-4 py-2
bg-[#38b6ff] hover:bg-[#0A8FD4]
text-[#0f172a] text-[13px] font-semibold
```

### Book Demo (Outline Pill)

```
rounded-full px-3.5 py-2
border border-white/20 hover:bg-white/[0.08]
text-white text-[12px] font-semibold
```

### Dual CTA Pattern

Always pair: **Primary action + Secondary action**. Primary is Calendly/booking, secondary is contact/send message.

```html
<a class="...bg-[#38b6ff]...">Book a Discovery Call</a>
<a class="...border border-[#38b6ff]/40...">Send a Message</a>
```

---

## 6. Form Inputs

### Standard Input (Light)

```
px-4 py-3 text-[13px] text-[#0f172a]
placeholder:text-[#94a3b8]
border border-[#e2e8f0] rounded-lg bg-white
focus:outline-none focus:border-[#38b6ff] focus:ring-2 focus:ring-[#38b6ff]/20
```

### Dark Console Input

```
px-3 py-2.5 text-[13px] text-[#f1f5f9]
placeholder:text-[#64748b]
bg-transparent
```

Parent container handles the border:

```
background: rgba(255,255,255,0.04)
border: 1px solid rgba(255,255,255,0.08)
```

---

## 7. Scrollbar

### .scrollbar-hero (Dark Background)

```css
.scrollbar-hero {
  scrollbar-width: thin;
  scrollbar-color: rgba(56, 182, 255, 0.35) transparent;
}
.scrollbar-hero::-webkit-scrollbar { width: 6px; height: 6px; }
.scrollbar-hero::-webkit-scrollbar-track { background: transparent; }
.scrollbar-hero::-webkit-scrollbar-thumb {
  background: rgba(56, 182, 255, 0.3);
  border-radius: 9999px;
}
.scrollbar-hero::-webkit-scrollbar-thumb:hover {
  background: rgba(56, 182, 255, 0.55);
}
```

---

## 8. Background Textures

### Topographic Pattern

Two SVG variants used as subtle background textures:

| File | Usage |
|---|---|
| `/topo-bg.svg` | Dark sections (hero, footer, dark CTA) at `opacity-50`–`opacity-60` |
| `/topo-bg-light.svg` | Light sections (console) at `opacity-50` |

Applied as:
```html
<div aria-hidden class="absolute inset-0 opacity-50 pointer-events-none"
     style="background-image: url(/topo-bg.svg); background-size: cover" />
```

### Radial Gradient Overlay

Used in hero and CTA sections for a soft blue glow:

```css
background: radial-gradient(
  ellipse at 50% 35%,
  rgba(56,182,255,0.08) 0%,
  rgba(15,23,42,0) 55%
);
```

### Section Transition Gradient

Soft fade from dark section to white:

```css
background: linear-gradient(
  to bottom,
  rgba(15,23,42,0) 0%,
  #FFFFFF 100%
);
```

Applied as a 96px (`h-24`) absolute-positioned div at the bottom.

---

## 9. Accessibility

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}
```

### Font Smoothing

```css
-webkit-font-smoothing: antialiased;
```

Applied via `antialiased` class on `<body>`.

---

## 10. Dependencies (Design-Critical)

| Package | Purpose |
|---|---|
| `tailwindcss` v4 | Utility framework (via `@import "tailwindcss"`) |
| `tw-animate-css` | Animation utilities (imported in globals.css) |
| `framer-motion` | All entrance, scroll-reveal, and interaction animations |
| `lucide-react` | Icon library (Menu, X, Mail, Phone, Calendar, etc.) |
| `clsx` + `tailwind-merge` | Class composition via `cn()` helper |
| `class-variance-authority` | Component variant system (buttons, badges) |
| `next/font/google` | Font loading (Inter, JetBrains Mono) |

---

## 11. globals.css Template

Every new project should start with this CSS:

```css
@import "tailwindcss";
@import "tw-animate-css";

@theme inline {
  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
  --color-primary: #38b6ff;
  --color-primary-dark: #0A8FD4;
  --color-nav-dark: #0f172a;
}

:root {
  --primary: #38b6ff;
  --primary-dark: #0A8FD4;
  --purple: #8b5cf6;
  --nav-dark: #0f172a;
  --nav-dark-lighter: #1e293b;
  --blue-wash: #F0F6FF;
  --warm-wash: #F5F5F0;
  --mint-wash: #F0FFF4;
  --lavender-wash: #F5F3FF;
  --text-dark: #0f172a;
  --text-body: #334155;
  --text-muted: #64748b;
  --text-light: #f1f5f9;
  --text-light-secondary: #94a3b8;
  --text-light-muted: #64748b;
  --border-light: #e2e8f0;
  --border-dark: rgba(255,255,255,0.08);
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;
  --background: #ffffff;
  --foreground: #0f172a;
}

@layer base {
  html { font-family: var(--font-sans); }
  body {
    background: var(--background);
    color: var(--foreground);
    -webkit-font-smoothing: antialiased;
  }
  .font-mono, code, pre, kbd, samp { font-family: var(--font-mono); }
}

/* Card treatments */
.dash-card { background: white; box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02); border-radius: 12px; transition: all 0.2s ease; }
.dash-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.06), 0 2px 4px rgba(0,0,0,0.03); transform: translateY(-1px); }
.dash-card-dark { background: rgba(255,255,255,0.04); border: 1px solid rgba(56,182,255,0.12); border-radius: 12px; transition: all 0.2s ease; }
.dash-card-dark:hover { background: rgba(255,255,255,0.06); border-color: rgba(56,182,255,0.2); transform: translateY(-1px); }

/* Status accents */
.status-urgent { border-left: 3px solid #ef4444; }
.status-attention { border-left: 3px solid #f59e0b; }
.status-good { border-left: 3px solid #14b8a6; }
.status-info { border-left: 3px solid #38b6ff; }

/* Section backgrounds */
.section-dark { background: #0f172a; color: #f1f5f9; }
.section-white { background: #FFFFFF; color: #0f172a; }
.section-off-white { background: #FAFAFA; color: #0f172a; }
.section-blue-wash { background: #F0F6FF; color: #0f172a; }
.section-warm-wash { background: #F5F5F0; color: #0f172a; }
.section-mint-wash { background: #F0FFF4; color: #0f172a; }
.section-lavender-wash { background: #F5F3FF; color: #0f172a; }

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}

/* Dark scrollbar */
.scrollbar-hero { scrollbar-width: thin; scrollbar-color: rgba(56,182,255,0.35) transparent; }
.scrollbar-hero::-webkit-scrollbar { width: 6px; height: 6px; }
.scrollbar-hero::-webkit-scrollbar-track { background: transparent; }
.scrollbar-hero::-webkit-scrollbar-thumb { background: rgba(56,182,255,0.3); border-radius: 9999px; }
.scrollbar-hero::-webkit-scrollbar-thumb:hover { background: rgba(56,182,255,0.55); }
```
