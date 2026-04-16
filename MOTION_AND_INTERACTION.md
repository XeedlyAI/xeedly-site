# MOTION_AND_INTERACTION.md

Animation curves, scroll-reveal choreography, interaction patterns, hover effects, and the complete contact-flow architecture. Reference alongside DESIGN_SYSTEM.md and COMPONENT_PATTERNS.md.

---

## 1. The EASE Curve

Every animation in the system uses a single cubic-bezier easing curve:

```javascript
const EASE = [0.16, 1, 0.3, 1] as const;
```

This is a fast-in / soft-out curve — elements snap into view and decelerate gently. **Never use Tailwind's `ease-in-out` or linear.** All motion uses this curve via Framer Motion's `ease` property.

---

## 2. Entrance Animations

### Fade Up (Primary)

Used for section headers, hero text blocks, standalone elements:

```javascript
initial={{ opacity: 0, y: 24 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, ease: EASE }}
```

Smaller version for child elements:
```javascript
initial={{ opacity: 0, y: 16 }}
// ... duration: 0.5
```

### Fade Right (Hero Console)

Used for the mini console entering from the right:

```javascript
initial={{ opacity: 0, x: 20 }}
animate={{ opacity: 1, x: 0 }}
transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
```

### Stagger Sequences

For groups of cards/items (grids, lists):

```javascript
// Parent
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-50px" }}
  variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
>

// Each child
<motion.div variants={{
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}}>
```

**Standard stagger interval:** `0.12`–`0.15` seconds between children.

### Delayed Sequences

Hero elements cascade with increasing delays:

```
Eyebrow:    delay: 0
Headline:   delay: 0.1
Paragraph:  delay: 0.2
Buttons:    delay: 0.3
Console:    delay: 0.4
```

---

## 3. Scroll-Reveal (whileInView)

### Standard Configuration

```javascript
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-50px" }}
transition={{ duration: 0.6, ease: EASE }}
```

**Key decisions:**
- `once: true` — trigger once, never re-animate when scrolling back
- `margin: "-50px"` — trigger 50px before the element enters the viewport (early reveal)
- `duration: 0.6` for containers/headers, `0.5` for children

### AnimatePresence

Used for content that swaps in/out (console responses):

```javascript
<AnimatePresence mode="wait">
  {processing ? (
    <motion.div
      key="processing"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
  ) : (
    <motion.div
      key={activeId}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
  )}
</AnimatePresence>
```

**`mode="wait"`** ensures the exiting element fully leaves before the entering element appears. Used for console response swaps, widget open/close, status text changes.

### SectionReveal Utility

Pre-built wrapper with direction support:

```typescript
<SectionReveal direction="up" delay={0.2}>
  <CardContent />
</SectionReveal>
```

Directions: `"up"` (y: 24→0), `"left"` (x: -24→0), `"right"` (x: 24→0).

Pre-exported variants for manual use:
- `FadeUp` — opacity + y: 24, duration 0.6
- `FadeUpChild` — opacity + y: 16, duration 0.5
- `StaggerContainer` — stagger 0.12, delay 0.08

---

## 4. Hover & Interactive Effects

### Card Hover

Applied via CSS (not Framer Motion):
```css
.dash-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.06), 0 2px 4px rgba(0,0,0,0.03);
  transform: translateY(-1px);
}
```

### Button Hover (Framer Motion)

Contact widget bubble:
```javascript
whileHover={{ y: -2 }}
```

### Link Hover Pattern

Console "See full response" link:
```
text-[#38b6ff] hover:text-[#7dd3fc] hover:italic hover:underline transition-all
```

Nav links:
```
text-[#f1f5f9] hover:text-[#38b6ff] transition-colors
```

Standard blue link:
```
text-[#0A8FD4] hover:text-[#38b6ff] transition-colors
```

### Widget Animation

```javascript
// Bubble → Panel transition
initial={{ opacity: 0, y: 12, scale: 0.96 }}
animate={{ opacity: 1, y: 0, scale: 1 }}
exit={{ opacity: 0, y: 8, scale: 0.97 }}
transition={{ duration: 0.22, ease: EASE }}
```

Quick (0.22s) for toggle interactions — feels responsive, not sluggish.

---

## 5. Pulsing Indicators

### Green "Live" Dot

```html
<span class="h-2 w-2 rounded-full bg-[#14b8a6] animate-pulse" />
```

Used in: mini console header, KPI ticker (implied), contact widget header.

### Processing Dot (Blue Ping)

```html
<span class="relative inline-flex w-2 h-2">
  <span class="absolute inset-0 rounded-full bg-[#38b6ff] animate-ping opacity-75" />
  <span class="relative rounded-full w-2 h-2 bg-[#38b6ff]" />
</span>
```

Layered: outer span pings/fades, inner span stays solid. Used in: ProcessingIndicator, signal dots.

### Teal Ping (Live Status)

Same pattern but teal `#14b8a6` with `opacity-60`–`opacity-70`:

```html
<span class="relative inline-flex w-2 h-2">
  <span class="absolute inset-0 rounded-full bg-[#14b8a6] animate-ping opacity-70" />
  <span class="relative rounded-full w-2 h-2 bg-[#14b8a6]" />
</span>
```

Used in: console headers, signal feed header.

### Green Widget Pulse

```html
<span class="h-2 w-2 rounded-full bg-[#22c55e] animate-pulse" />
```

Used exclusively in the contact widget "Live" header.

---

## 6. Count-Up Animation

The KPI Ticker uses a custom `useCountUp` hook:

```typescript
function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function useCountUp(target: number | undefined, duration = 1400) {
  // Uses requestAnimationFrame
  // Eases from 0 to target over 1400ms with easeOutCubic
  // Returns the current animated value
}
```

**Key details:**
- Duration: 1400ms (fast enough to feel live, slow enough to notice)
- Easing: `easeOutCubic` (starts fast, decelerates)
- Triggers once on mount (ref guard prevents re-animation)
- Values rendered with `tabular-nums` for stable digit width

---

## 7. Signal Card Animations

Signal cards enter with a horizontal slide:

```javascript
variants={{
  hidden: { opacity: 0, x: -18 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
}}
```

Note: `x: -18` (left slide) instead of `y: 16` (vertical). This distinguishes signals from briefing sections visually — signals feel like they're "streaming in" from the left.

Briefing sections use the standard vertical entry (`y: 10`).

Freeform responses use a subtle `y: 10` entry.

---

## 8. Navbar Scroll Morphing

The navbar morphs between two states based on scroll position:

**Unscrolled (top of page):**
```
top: 0, left: 0, right: 0, width: full
background: transparent
border: transparent
backdrop-filter: none
height: h-16
```

**Scrolled (>50px):**
```
top: 12px, centered, width: min(1050px, calc(100% - 16px))
border-radius: 9999px (fully rounded pill)
background: rgba(15, 23, 42, 0.75)
backdrop-filter: blur(16px)
border: 1px solid rgba(255,255,255,0.08)
box-shadow: 0 4px 24px rgba(0,0,0,0.15), 0 1px 4px rgba(0,0,0,0.08)
height: h-14
```

Transition: `duration-300 ease-out` on all geometric + visual properties.

Logo scales from `h-10 md:h-11` → `h-9` on scroll.

---

## 9. Processing State Pattern

When a query is being processed:

1. **Set processing=true**, clear previous response
2. **Show ProcessingIndicator**: pulsing blue dot + "Processing query..." mono text
3. **Delay**: `600 + Math.round(Math.random() * 400)` ms for hardcoded queries (simulates latency)
4. **API queries**: actual network time (Claude response)
5. **Set processing=false**, set response

The AnimatePresence `mode="wait"` ensures the processing indicator fully exits before the response enters.

---

## 10. Contact Flow Architecture

Contact pathways are designed as a funnel with increasing commitment:

### Tier 1: Passive (Zero Friction)
- **ContactWidget** — floating on every page (except / and /contact)
- **Footer Contact column** — always visible
- **Nav "Talk to Us" CTA** — always visible

### Tier 2: Active (One Click)
- **"Book Demo" button** — opens Calendly directly
- **Calendar action cards** — from AI console responses
- **Contact info action cards** — email + phone displayed

### Tier 3: Engaged (Form Submission)
- **Intake form** — name/email/phone/message → POST /api/intake
- **Contact page form** — full contact form with company size, interests
- **MiniConsole on /contact** — AI answers + action cards

### Tier 4: Direct (Real-Time)
- **Direct chat action** — message input → POST /api/direct-message
- **Phone call** — tel: link from contact info

### Dual CTA Pattern

Every CTA position uses paired buttons:
- **Primary** (solid blue): Calendly booking link
- **Secondary** (outline/ghost): Contact page or "Send a Message"

```html
<a class="bg-[#38b6ff] hover:bg-[#0A8FD4] text-[#0f172a] rounded-lg px-8 py-3.5">
  Book a Discovery Call
</a>
<a class="border border-[#38b6ff]/40 hover:border-[#38b6ff] text-[#38b6ff] rounded-lg px-8 py-3.5">
  Send a Message
</a>
```

### AI-Driven Contact Routing

The Intelligence Console's AI (Claude) includes an `actions` JSON block in its responses based on user intent signals. The frontend parses these into interactive cards. The routing logic is built into the system prompt — no frontend logic decides which actions to show. This means the AI adapts its contact suggestions based on conversation context.

---

## 11. Form Interaction Patterns

### Intake Form (ConsoleActions)

States: `idle` → `sending` → `sent` | `error`

- **idle**: Form visible with name/email (required) + phone + message fields
- **sending**: Submit button shows "Sending...", disabled
- **sent**: Entire form replaced with success card (Check icon + "Sent" + "Shad will see this shortly")
- **error**: Error message below form in red 12px

### Direct Chat (ConsoleActions)

1. If no identity captured yet → show name/email fields in 2-col grid
2. Message input always visible
3. On send → message appears in sent-messages timeline
4. Each sent message: user text + timestamp
5. After first send: "Shad has been notified..." status line

### Freeform Input Pattern

All consoles (mini, full, contact) follow:

```
[flex container: bg transparent/white, border, rounded-lg, overflow-hidden]
  [input: flex-1, transparent bg, no outline]
  [submit button: mono text, blue, disabled when empty, "Query →"]
```

Focus state: `focus-within:border-[#38b6ff]/40 focus-within:shadow-sm`

---

## 12. Transition Timing Summary

| Context | Duration | Notes |
|---|---|---|
| Section entrance | 0.6s | Primary content blocks |
| Card entrance (stagger child) | 0.5s | Inside stagger containers |
| Content swap (AnimatePresence) | 0.2s | Console response changes |
| Widget toggle | 0.22s | Quick, responsive feel |
| Status text change | 0.3s | "awaiting query" → "redirecting" |
| Hover state (CSS) | 0.2s | `transition: all 0.2s ease` |
| Hover state (color) | default | `transition-colors` |
| Navbar morph | 0.3s | `duration-300 ease-out` |
| KPI count-up | 1.4s | `easeOutCubic` |
| Processing delay (sim) | 600–1000ms | Random for realism |

---

## 13. Page Composition Pattern

Each page is a vertical stack of section components, composed in the page.tsx:

```tsx
// src/app/page.tsx
export default function HomePage() {
  return (
    <>
      <Hero />
      <IntelligenceStack />
      <Products />
      <IntelligenceConsole />
      <BuiltDifferent />
      <GrowthSystems />
      <FooterCTA />
    </>
  );
}
```

**Section ordering principles:**
1. Start with a dark hero (section-dark)
2. Alternate between light washes — never the same background twice in a row
3. End with a dark CTA section (section-dark) before the footer
4. The footer is always section-dark

---

## 14. SEO & Metadata Pattern

### Root Layout Metadata

```typescript
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Brand — tagline", template: "%s — Brand" },
  description: "...",
  keywords: [...],
  openGraph: { type: "website", ... },
  twitter: { card: "summary_large_image", ... },
  robots: { index: true, follow: true, googleBot: { ... } },
  icons: { icon: [{ url: "/favicon.svg" }, { url: "/favicon.png" }] },
};
```

### JSON-LD Organization Schema

Injected in root layout via `<script type="application/ld+json">`:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "...",
  "url": "...",
  "logo": "...",
  "address": { "@type": "PostalAddress", ... },
  "email": "..."
}
```

### Per-Page Metadata

Each page exports `metadata` with canonical URL. FAQ pages include `FAQPage` schema.

---

## 15. How to Use These Standards

### Starting a New Project

1. Copy `globals.css` template from DESIGN_SYSTEM.md Section 11
2. Install dependencies: `tailwindcss`, `tw-animate-css`, `framer-motion`, `lucide-react`, `clsx`, `tailwind-merge`, `class-variance-authority`
3. Configure fonts in layout.tsx (Inter + JetBrains Mono via next/font/google)
4. Create `src/lib/utils.ts` with `cn()` helper
5. Create `src/lib/contact.ts` with project-specific contact constants
6. Drop these three standards files into the project root

### Design Decisions Already Made

With these files in place, the following questions are **pre-answered**:

- **What color is the primary?** → `#38b6ff`
- **What font for labels?** → JetBrains Mono, 10–11px, uppercase, tracking 0.15em
- **How do cards look?** → `.dash-card` with 12px radius, subtle shadow, -1px lift on hover
- **How do status indicators work?** → 3px left border, color from severity palette
- **What animation curve?** → `[0.16, 1, 0.3, 1]`, always
- **How do sections alternate?** → Dark → light wash → different light wash → dark
- **How does contact work?** → Centralized in `contact.ts`, dual CTA pattern, AI action routing
- **What size are headings?** → `clamp(1.75rem, 3.2vw, 2rem)` for H2
- **How do grids work?** → `grid-cols-1 md:grid-cols-{2|3} gap-5`
- **What's the section padding?** → `py-24 md:py-32`
