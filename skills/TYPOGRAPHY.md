# TYPOGRAPHY.md — Advanced Typography, Text Effects & Phrase Highlighting
# The details that separate a $500 site from a $50,000 site.

## Philosophy

Typography is 90% of design. If the type is right, the site feels right even without images. If the type is wrong, no amount of imagery saves it. This skill covers: font pairing strategy, text color hierarchy, animated text effects, phrase highlighting, responsive type scaling, and the micro-decisions that create visual sophistication.

## Font Pairing Strategy

### The Three Roles
Every site needs exactly three font roles:
1. **Display** — headings, hero text, large statements. This font carries personality.
2. **Body** — paragraphs, descriptions, UI text. This font must disappear (be so readable you don't notice it).
3. **Accent** — stats, labels, code snippets, badges. Monospace or distinctive weight.

### Proven Pairings (Google Fonts, license-free)

**Modern Editorial** (authority + readability):
- Display: Newsreader (400-600)
- Body: Inter (400-500) or Source Sans 3
- Accent: JetBrains Mono or IBM Plex Mono

**Clean Geometric** (modern SaaS):
- Display: Plus Jakarta Sans (700-800)
- Body: Plus Jakarta Sans (400-500) or Inter
- Accent: Space Mono or Fira Code

**Warm Professional** (consulting, services):
- Display: Outfit (600-700)
- Body: Work Sans (400-500)
- Accent: IBM Plex Mono

**Sharp Contemporary** (fintech, data):
- Display: Sora (600-700) or Manrope (700-800)
- Body: Geist Sans or Inter
- Accent: Geist Mono

**Editorial Serif Clean** (the Tely.ai feel — serif that reads like sans):
- Display: Literata (400-600) or Source Serif 4 (400-600)
- Body: Inter (400-500)
- Accent: IBM Plex Mono

### Font Loading Pattern
```tsx
// In layout.tsx
import { Newsreader, Inter, JetBrains_Mono } from 'next/font/google'

const display = Newsreader({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600'],
})

const body = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500'],
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500'],
})

// Apply to body:
// className={`${display.variable} ${body.variable} ${mono.variable} font-body antialiased`}
```

```css
/* In globals.css or tailwind config */
:root {
  --font-display: 'Newsreader', Georgia, serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}

/* Tailwind extend */
fontFamily: {
  display: ['var(--font-display)'],
  body: ['var(--font-body)'],
  mono: ['var(--font-mono)'],
}
```

## Text Color Hierarchy

This is the single most impactful typography decision. NOT everything should be the same color.

### On Light Backgrounds (#FFFFFF, #FAFAFA, #F0F6FF):
```css
--text-heading: #1A1A2E;     /* Near-black — H1, H2 only */
--text-subheading: #2D3748;  /* Dark charcoal — H3, card titles */
--text-body: #4A5568;        /* Medium gray — paragraphs, descriptions */
--text-secondary: #6B7280;   /* Gray-500 — supporting text, captions */
--text-muted: #9CA3AF;       /* Gray-400 — timestamps, fine print */
--text-accent: #4E8AE6;      /* Blue — section labels, links */
```

### On Dark Backgrounds (#0B1120, #0F172A, #0C0F14):
```css
--text-heading-dark: #FFFFFF;
--text-body-dark: #CBD5E1;    /* Not pure white — slightly muted */
--text-secondary-dark: #94A3B8;
--text-muted-dark: #64748B;
--text-accent-dark: #4E8AE6;
```

### Application Rules:
- H1: `--text-heading`, font-display, weight 600, tracking tight
- H2: `--text-heading`, font-display, weight 500
- H3: `--text-subheading`, font-body or font-display, weight 600
- Body: `--text-body`, font-body, weight 400, line-height 1.7
- Descriptions: `--text-secondary`, font-body, weight 400
- Labels: `--text-accent`, font-mono, weight 500, uppercase, letter-spacing wide, text-sm
- Stats: `--text-gold` (#D4A853), font-mono, weight 700

## Responsive Type Scale

Use `clamp()` for fluid type sizing that scales smoothly between breakpoints. No jarring jumps.

```css
/* Headings */
.h1 { font-size: clamp(2.25rem, 4vw + 1rem, 4rem); }     /* 36px → 64px */
.h2 { font-size: clamp(1.75rem, 3vw + 0.5rem, 2.75rem); } /* 28px → 44px */
.h3 { font-size: clamp(1.25rem, 1.5vw + 0.5rem, 1.75rem); } /* 20px → 28px */

/* Body */
.body { font-size: clamp(1rem, 0.5vw + 0.875rem, 1.125rem); } /* 16px → 18px */
.body-lg { font-size: clamp(1.125rem, 0.5vw + 1rem, 1.25rem); } /* 18px → 20px */

/* Small */
.caption { font-size: clamp(0.75rem, 0.25vw + 0.7rem, 0.875rem); } /* 12px → 14px */
```

### Line Height by Role:
- Headings: 1.1 — tight, creates visual weight
- Subheadings: 1.3 — slightly more air
- Body text: 1.7 — comfortable reading rhythm
- Captions/labels: 1.4 — compact but readable

### Letter Spacing by Role:
- Large headings (H1): -0.02em (slightly tight — creates density)
- Section labels: 0.1em (wide tracking — creates elegance)
- Body text: 0 (default)
- Mono text: -0.01em (mono fonts need slight tightening)

## Phrase Highlighting (The Tely.ai Effect)

Subtle colored background on key phrases within body copy. Like a highlighter pen — draws attention without bold text.

```tsx
interface HighlightProps {
  children: React.ReactNode
  color?: 'blue' | 'gold' | 'green' | 'pink'
}

export function Highlight({ children, color = 'blue' }: HighlightProps) {
  const colors = {
    blue: 'bg-blue-500/10',     // rgba(78,138,230,0.10)
    gold: 'bg-amber-500/12',    // rgba(212,168,83,0.12)
    green: 'bg-emerald-500/10', // rgba(62,190,122,0.10)
    pink: 'bg-pink-500/10',     // rgba(236,72,153,0.10)
  }

  return (
    <span className={`${colors[color]} px-1.5 py-0.5 rounded`}>
      {children}
    </span>
  )
}
```

### Usage:
```tsx
<p>
  Sovvrn delivers <Highlight color="blue">proactive intelligence</Highlight> to
  your phone before your first location visit. Last month it flagged a produce
  invoice <Highlight color="gold">22% above contract price</Highlight> that would
  have cost $4K.
</p>
```

### Highlighting Rules:
- Maximum 1-2 highlights per paragraph
- Never highlight entire sentences — only 2-5 word phrases
- Use for: outcomes, metrics, key differentiators, surprising numbers
- Do NOT use for: generic terms, brand names, or decorative emphasis
- Color coding: blue = product/tech terms, gold = money/results, green = positive metrics

## Section Labels

The small uppercase text above section headings (like "PLATFORM", "HOW IT WORKS"). These set context and create consistent vertical rhythm.

```tsx
export function SectionLabel({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={`
      inline-block text-xs font-mono font-medium uppercase tracking-[0.15em]
      text-[#4E8AE6] mb-3
      ${className}
    `}>
      {children}
    </span>
  )
}
```

Rules:
- Always appears directly above the H2
- Font: mono, weight 500, uppercase
- Color: accent blue on both light and dark backgrounds
- Letter spacing: 0.15em (wide)
- Size: text-xs (12px)
- Margin bottom: mb-3 (12px) before the heading

## Pull Quote Styling

Large quotation marks, italic serif text, used between feature sections as breathing points.

```tsx
export function PullQuote({ quote, author, role }: { quote: string; author: string; role: string }) {
  return (
    <blockquote className="relative max-w-3xl mx-auto text-center py-16">
      {/* Decorative quote mark */}
      <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-8xl font-serif text-gray-200 select-none leading-none">
        "
      </span>
      <p className="relative z-10 text-xl md:text-2xl lg:text-3xl font-display italic text-gray-600 leading-relaxed">
        {quote}
      </p>
      <footer className="mt-6 text-sm">
        <span className="font-semibold text-gray-800">{author}</span>
        <span className="mx-2 text-gray-300">·</span>
        <span className="text-gray-400">{role}</span>
      </footer>
    </blockquote>
  )
}
```

## Mixed Weight Headings

Using different weights within a single heading to create emphasis. Very effective for hero headlines.

```tsx
// "Stop pulling reports. Start getting answers."
<h1 className="text-5xl tracking-tight">
  <span className="font-normal text-gray-400">Stop pulling reports.</span>
  <br />
  <span className="font-semibold text-gray-900">Start getting answers.</span>
</h1>

// "The intelligence layer for multi-unit operators"
<h1 className="text-5xl tracking-tight text-gray-900">
  The <span className="font-normal italic">intelligence layer</span> for
  <br />
  multi-unit operators
</h1>
```

Rules:
- Use weight contrast (normal vs semibold) OR style contrast (regular vs italic)
- Never use both weight AND italic AND color change — pick one axis of variation
- The emphasized part should be the key concept or differentiator
- The de-emphasized part provides context

## Tabular Numbers for Stats

When displaying numbers (prices, stats, percentages), use tabular figures so digits align vertically.

```css
.stat-number {
  font-variant-numeric: tabular-nums;
  font-feature-settings: 'tnum';
}
```

```tsx
<span className="font-mono tabular-nums text-5xl font-bold text-[#D4A853]">
  $3,000+
</span>
```

## Text Decoration Patterns

### Underline Offset
```css
.link-styled {
  text-decoration: underline;
  text-underline-offset: 4px;
  text-decoration-thickness: 1px;
  text-decoration-color: rgba(78, 138, 230, 0.3);
  transition: text-decoration-color 0.2s;
}
.link-styled:hover {
  text-decoration-color: rgba(78, 138, 230, 1);
}
```

### Animated Underline (CSS only)
```css
.link-animated {
  position: relative;
}
.link-animated::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1.5px;
  background: #4E8AE6;
  transition: width 0.3s ease;
}
.link-animated:hover::after {
  width: 100%;
}
```

## Truncation & Overflow

For cards with potentially long content:

```css
/* Single line truncation */
.truncate-1 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Multi-line truncation (3 lines) */
.truncate-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

## Anti-Patterns: NEVER Do These

1. **All caps body text** — uppercase is for labels only (12px, tracked wide). Never for headings or paragraphs.

2. **Centered body paragraphs** — center alignment works for 1-2 line subtitles. Body paragraphs over 2 lines must be left-aligned.

3. **Too many font sizes** — a page should use 5-7 distinct sizes maximum: H1, H2, H3, body, small, caption.

4. **Gradient text** — overused on AI sites. Skip it entirely unless the brand specifically calls for it. If you must, limit to ONE word in the hero, never on body text.

5. **Font weight extremes** — avoid weight 100 (too thin to read) and weight 900 (too heavy, feels aggressive). Stick to 400-700 range.

6. **Decorative fonts for body text** — display fonts are for headings only. Body text must be a highly readable sans-serif or a clean serif with open counters.

7. **Inconsistent heading hierarchy** — if your H2 is 2.5rem, your H3 must be smaller. If an H3 appears visually larger than an H2 somewhere on the page, the type system is broken.

8. **Text over busy backgrounds** — if text sits over an image or gradient, it needs either a solid overlay behind it or strong text-shadow. Partially readable text is worse than hidden text.