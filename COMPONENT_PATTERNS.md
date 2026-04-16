# COMPONENT_PATTERNS.md

Architecture patterns, data structures, and component conventions extracted from the Xeedly design system. This covers the Intelligence Console ecosystem, contact/action routing, layout shell, data layer patterns, and the KPI Ticker. Reference alongside DESIGN_SYSTEM.md.

---

## 1. Project Architecture

### Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15+ App Router with Turbopack |
| Styling | Tailwind CSS v4 (`@import "tailwindcss"`) |
| Animation | Framer Motion |
| Icons | lucide-react |
| Class Utils | `cn()` from `clsx` + `tailwind-merge` |
| Fonts | `next/font/google` (Inter + JetBrains Mono) |
| AI Backend | Anthropic Claude API (claude-sonnet-4) |

### File Structure Convention

```
src/
  app/
    layout.tsx              # Root layout (fonts, metadata, JSON-LD)
    globals.css             # All CSS variables, card classes, section backgrounds
    page.tsx                # Home page (composes home/* components)
    (pages)/                # Route groups for other pages
    api/                    # API routes (query/, intake/, direct-message/)
  components/
    layout/                 # Shell components (Layout, Navbar, Footer, KpiTicker, ContactWidget)
    home/                   # Home page sections (Hero, IntelligenceStack, Products, etc.)
    shared/                 # Reusable across pages (ConsoleResponseRenderer, ConsoleActions, SectionReveal)
    contact/                # Contact page components
    pricing/                # Pricing page components
    ui/                     # shadcn/ui primitives (button, card, input, etc.)
  data/                     # Static data + type definitions (console-responses.ts)
  lib/                      # Utilities (utils.ts, contact.ts)
  types/                    # TypeScript type definitions (console-actions.ts)
```

### Component Principles

1. **Server Components by default.** Only add `"use client"` when the component needs state, effects, or event handlers.
2. **Section components are self-contained.** Each exports one function that renders a full `<section>` with its own background class, padding, and container.
3. **Data lives in `src/data/`.** Hardcoded display data (console queries, product lists, tier definitions) lives in typed data files, not inline in components.
4. **Contact details live in `src/lib/contact.ts`.** A single source of truth object (`CONTACT`) with email, phone, calendar URL, location, hours. Convenience exports `MAILTO` and `TEL` for href construction.

---

## 2. Layout Shell

### Layout.tsx

Wraps every page in a consistent shell:

```
<Navbar />
<KpiTicker variant="dark" />
<main>{children}</main>
<Footer />
<ContactWidget />
```

### Navbar

- **Fixed position** — starts transparent, transforms on scroll (`window.scrollY > 50`).
- **Scroll state:** rounded-full pill, max-width 1050px, centered, backdrop-blur(16px), dark semi-transparent bg `rgba(15,23,42,0.75)`.
- **Unscrolled state:** full-width, transparent.
- **Nav links:** Inside a dark glass pill `(rgba(255,255,255,0.03) bg, rgba(255,255,255,0.06) border)`. Font-mono 11px semibold uppercase tracking 0.08em.
- **CTAs:** "Book Demo" (outline pill) + "Talk to Us" (primary pill).
- **Mobile:** Slide-in panel from right, 80% width max-w-xs, white bg, dark overlay.
- **Logo:** PNG image with responsive height (h-9 scrolled, h-10 md:h-11 unscrolled).

### KPI Ticker

A horizontal data strip below the navbar showing live business metrics with count-up animations.

**Data structure:**
```typescript
type Kpi = {
  label: string;      // "Signals Processed"
  value: string;      // "14,207" (static fallback)
  target?: number;    // 14207 (numeric for animation)
  format?: (n: number) => string;  // Math.round(n).toLocaleString()
  subtitle?: string;  // "last 30 days"
};
```

**Layout:** `grid-cols-2 md:grid-cols-5 md:divide-x` inside max-w-7xl container.

**Count-up animation:** Custom `useCountUp` hook with `easeOutCubic` easing over 1400ms. Uses `requestAnimationFrame` for smooth rendering.

**Variants:** `"dark"` (navy bg, blue values) and `"light"` (blue-wash bg, dark values).

**Cell styling:**
- Label: 10px semibold uppercase tracking-[0.14em]
- Value: font-mono bold 20–22px tabular-nums leading-none
- Subtitle: 10px muted

### Footer

Dark section with topographic pattern overlay. 4-column grid (md:grid-cols-12):
- Col 1 (span-4): Logo + tagline
- Col 2 (span-2): Products list in dark glass card
- Col 3 (span-2): Company links in dark glass card
- Col 4 (span-4): Contact info in dark glass card (email, phone, location, Book a Demo link)

Footer links: font-mono 11px semibold uppercase tracking-[0.08em].

Bottom bar: copyright + legal links, separated by `border-t border-white/10`.

### ContactWidget

Fixed bottom-right floating widget. Hidden on `/` and `/contact` (where contact surfaces already exist).

- **Collapsed:** Blue pill button "Talk" with `MessageSquare` icon. Shadow: `0_10px_30px_-8px_rgba(56,182,255,0.6)`. Hover: `y: -2`.
- **Expanded:** 240px white card with 3 rows (Email, Call, Book a call). Each row has an icon in a tinted 32x32 rounded container + label + detail.
- **Header:** Green pulse dot + "Live" label + close button.

---

## 3. Intelligence Console Ecosystem

The Intelligence Console is the centerpiece interactive component. It exists in two forms that share a single rendering module.

### Architecture

```
ConsoleResponseRenderer.tsx (shared)
  ├── ProcessingIndicator
  ├── BriefingView (compact prop)
  ├── SignalsView (compact prop)
  ├── FreeformView (compact prop)
  └── ResponseView (orchestrator, compact prop)

IntelligenceConsoleMini.tsx (hero)
  ├── Uses shared ResponseView with compact=true
  ├── Local state: processing, response, lastQuery
  ├── Suggestion pills → lookup CONSOLE_QUERIES → render inline
  ├── Freeform → POST /api/query → render inline
  ├── "See full response in console ↓" link → dispatches CONSOLE_EVENT + scrolls
  └── "↻ clear" reset control

IntelligenceConsole.tsx (full section)
  ├── Uses shared ResponseView with compact=false (default)
  ├── Listens for CONSOLE_EVENT from mini console
  ├── Query pills (all CONSOLE_QUERIES displayed)
  ├── Freeform input → POST /api/query
  └── Full response area (no truncation)
```

### Cross-Component Communication

**Pattern:** Custom DOM events (no React context, no URL state).

```typescript
export const CONSOLE_EVENT = "xeedly:console-query";

export type ConsoleEventDetail =
  | { kind: "pill"; id: string }
  | { kind: "freeform"; text: string };

export function dispatchConsoleQuery(detail: ConsoleEventDetail) {
  window.dispatchEvent(new CustomEvent(CONSOLE_EVENT, { detail }));
}

export function scrollToConsole() {
  document.getElementById("console")?.scrollIntoView({ behavior: "smooth", block: "start" });
}
```

The mini console fires `dispatchConsoleQuery()` when the user clicks "See full response." The full console listens via `useEffect` → `window.addEventListener`.

### Console Data Structure

```typescript
// Response types (discriminated union)
type ConsoleResponse =
  | { type: "briefing"; title: string; sections: BriefingSection[]; actions?: ConsoleAction[] }
  | { type: "signals"; title: string; signals: SignalCard[]; actions?: ConsoleAction[] }
  | { type: "freeform"; body: string; actions?: ConsoleAction[] };

type BriefingSection = { title: string; icon?: string; body: string };
type SignalCard = { severity: "high"|"medium"|"low"; title: string; body: string; source: string; time: string };

// Query definition (hardcoded data)
type ConsoleQuery = { id: string; label: string; response: ConsoleResponse };
```

### Compact Mode Truncation

When `compact={true}` (hero mini console):
- **Briefing:** `response.sections.slice(0, 2)` — show first 2 sections only
- **Signals:** `response.signals.slice(0, 2)` — show first 2 cards only
- **Freeform:** Truncate body to first paragraph (split on `\n\n`) OR 200 chars, whichever shorter, append `...`
- **Actions:** Always render in full (never truncated)

### Mini Console Layout

Dark glass container (`rgba(255,255,255,0.03)` bg, `rgba(255,255,255,0.08)` border, `0 20px 40px -20px rgba(0,0,0,0.4)` shadow).

Visual anatomy:
```
[3px blue top border]
[Green pulsing dot] Intelligence Console          xeedly://live
[Intro text paragraph]
> Suggestion 1
> Suggestion 2
> Suggestion 3
[Freeform input with Query → button]
[Response area with scrollbar-hero, max-h desktop only]
[Footer: latency: <3s                     claude-sonnet-4]
```

### Full Console Layout

Lavender-wash section with topo-bg-light overlay.

Visual anatomy:
```
[SECTION: section-lavender-wash py-24 md:py-32]
[Eyebrow → H2 → Description]
[Query pills — flex-wrap justify-center gap-2]
[Freeform input bar — white bg, border, focus ring]
[Response area — min-h-[180px], AnimatePresence mode="wait"]
```

---

## 4. Console Action System

Actions are rendered by `ConsoleActions.tsx` as interactive cards below any console response. They enable **contact routing** — turning AI answers into conversion pathways.

### Action Types

```typescript
type CalendarAction = { type: "calendar"; label: string; url: string; description?: string };
type ContactInfoAction = { type: "contact_info"; label: string; email: string; phone: string };
type IntakeAction = { type: "intake"; label: string; description?: string; fields?: string[] };
type DirectChatAction = { type: "direct_chat"; label: string; description?: string };

type ConsoleAction = CalendarAction | ContactInfoAction | IntakeAction | DirectChatAction;
```

### Action Card Styling

Each type has an accent color and icon:

| Type | Accent | Icon | Behavior |
|---|---|---|---|
| `calendar` | Blue `#38b6ff` | Calendar | Opens external URL (Calendly) |
| `contact_info` | Teal `#14b8a6` | Mail | Displays email (mailto) + phone (tel) links |
| `intake` | Purple `#8b5cf6` | ClipboardList | Inline form: name, email, phone, message → POST /api/intake |
| `direct_chat` | Amber `#f59e0b` | Zap | Real-time message input → POST /api/direct-message |

### Action Card Structure

```
[3px left border in accent color]
[32x32 icon container: accent color at 10% alpha bg]
[Title (14px semibold)]
[Description (12px muted)]
[Interactive element: button, links, form, or chat input]
```

### AI → Action Routing

The `/api/query` route instructs Claude to emit a `\`\`\`actions` JSON block at the end of responses. The API parses this out and returns it as a structured `actions` array alongside the `content` string.

**Routing logic (built into the AI system prompt):**
- Simple factual question → No actions
- Industry exploration → `calendar`
- Pricing/deployment questions → `calendar` + `contact_info`
- Buying intent → `calendar` + `intake`
- "Can I talk to someone?" → `intake` + `direct_chat`
- Low price point ($297) → `contact_info` only
- High value ($25K+) → `calendar` (needs discovery call)

---

## 5. Section Component Pattern

Every page section follows this architecture:

```tsx
export function SectionName() {
  return (
    <section className="section-{wash} py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Optional: topo-bg overlay */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-14"
        >
          <div className="text-[10px] font-mono font-semibold uppercase tracking-[0.15em] text-[#64748b]">
            Section Label
          </div>
          <h2 className="mt-3 font-bold tracking-tight text-[#0f172a]"
              style={{ fontSize: "clamp(1.75rem, 3.2vw, 2rem)" }}>
            Section Headline
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {ITEMS.map((item) => (
            <motion.div
              key={item.id}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
              }}
              className="dash-card p-6 md:p-7"
            >
              {/* Card content */}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

### Section Background Rotation

Sections alternate backgrounds to create visual rhythm:

```
Hero:           section-dark
KPI Ticker:     dark variant
Stack:          section-white
Products:       section-white
Console:        section-lavender-wash
BuiltDifferent: section-blue-wash
GrowthSystems:  section-warm-wash
FooterCTA:      section-dark
Footer:         section-dark
```

---

## 6. Intelligence Stack (Three-Tier Concept)

A core conceptual framework that appears in multiple projects:

| Tier | Name | Accent | Time | Description |
|---|---|---|---|---|
| 1 | GLANCE | `#14b8a6` (teal) | 0–5 seconds | KPI tickers. No clicks, no logins. |
| 2 | BRIEFING | `#38b6ff` (blue) | 5–60 seconds | AI morning briefings with coaching voice. |
| 3 | DEEP | `#8b5cf6` (purple) | 1–5 minutes | Signal feed, drilldowns, AI concierge. |

Each tier has a tint at 6% alpha (`rgba(color, 0.06)`) for active/selected state background.

Cards display a 2px accent bar at the top (not left border — this is unique to the stack).

---

## 7. Product Card Pattern

Product cards use left-border accent + status badge:

```
[3px left border in status color]
[Product name (18px bold)]  [Status badge (pill: Live/Shipping/In Build)]
[Vertical label (11px mono uppercase)]
[Description (13px body)]
[Tags row: mono 10px pills with light border + bg]
```

Tag pills: `font-mono text-[10px] px-2 py-1 rounded-full border border-[#e2e8f0] bg-[#FAFAFA] text-[#64748b]`

---

## 8. Pricing Card Pattern

Pricing cards in a 3-up grid:

```
[2px blue top accent bar]
[Recommended badge (top-right, conditionally)]
[Tier name (12px semibold)]
[Price: font-mono 28px bold tabular-nums + /mo]
[Feature list: "—" prefix in teal + feature text]
[Tag pill (mono 10px, light bg)]
```

Recommended tier: `md:-translate-y-2 shadow-md ring-1 ring-[#38b6ff]/25`

Feature list prefix: `<span class="text-[#14b8a6] font-mono text-[12px]">—</span>`

---

## 9. Contact Constants Pattern

Central source of truth for all contact information:

```typescript
// src/lib/contact.ts
export const CONTACT = {
  email: "hello@xeedly.com",
  phone: "(801) 555-0199",
  phoneHref: "+18015550199",
  calendar: "https://calendly.com/xeedly/discovery",
  locationShort: "Salt Lake City, UT",
  locationLong: "Salt Lake City, Utah — Mountain Time (MST)",
  hours: "Mon–Fri, 9–5 MST",
} as const;

export const MAILTO = `mailto:${CONTACT.email}`;
export const TEL = `tel:${CONTACT.phoneHref}`;
```

**Usage principle:** Every email link, phone link, calendar URL, and location string across the entire site imports from this file. Never hardcode contact info in components.

---

## 10. API Route Pattern

### POST /api/query

```
Input:  { query: string }
Output: { type: "ai_response", content: string, query: string, actions: ConsoleAction[] }
```

- Validates query (non-empty, max 2000 chars)
- Calls Anthropic API with `claude-sonnet-4` model, 1024 max tokens
- System prompt instructs Claude on company voice, product knowledge, and action routing
- Parses `\`\`\`actions\n[...]\n\`\`\`` block from response
- Logs `visitor_query` event to stdout as JSON

### POST /api/intake

```
Input:  { name, email, phone?, message?, context? }
Output: { success: true, message: "Received" }
```

### POST /api/direct-message

```
Input:  { message, senderName, senderEmail, senderPhone?, context? }
Output: { success: true, message: "Delivered" }
```

All API routes log structured JSON events for observability.

---

## 11. SectionReveal Utility

Reusable scroll-reveal wrapper:

```typescript
export function SectionReveal({
  children, delay = 0, direction = "up", once = true, className, as = "div"
}: SectionRevealProps) {
  // Uses framer-motion whileInView with directional offset
  // Easing: [0.16, 1, 0.3, 1], duration: 0.6
  // Viewport margin: -50px
}
```

Pre-built variants exported: `FadeUp`, `FadeUpChild`, `StaggerContainer`.
