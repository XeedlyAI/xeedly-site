# SIGNATURE-COMPONENTS.md — XeedlyAI Signature Components

These are required components on every XeedlyAI client build (and on the
xeedly.com flagship). They are part of how we differentiate. Skipping them
or shipping a generic version is a quality regression.

Read this file on **every** Website build. It's not optional.

---

## 1. Blog Intelligence Console (REQUIRED on every blog we build)

**The pattern:** every blog we ship — for any client, in any vertical — must
include an AI-powered query console that visitors can use to ask questions
across the published article corpus. The blog is not just a content
archive; it is a **demonstration of the intelligence platform itself.**
Visitors should leave thinking *"this site doesn't just publish content,
it answers me."*

### Why it's required

- Blog visitors are mid-funnel — they're learning, comparing, validating
- An AI concierge converts passive readers into engaged prospects
- It demonstrates the platform's value (signal engine + AI synthesis) in
  the place where prospects already evaluate competence (the blog)
- It's the highest-leverage on-page conversion mechanism we ship —
  outperforms generic CTAs because it answers the visitor's actual question

### Required behavior

1. **Visible on every blog surface**
   - `/blog` index page (full-width console)
   - `/blog/[silo]` silo pages (full-width console)
   - `/blog/[silo]/[slug]` article pages (right-rail or sticky position)
2. **Article-scoped mode** — when on a specific article, the console
   receives that article's full content and treats questions as in-context
   follow-ups, not generic queries.
3. **Whole-corpus mode** — on index and silo pages, it synthesizes across
   every published article.
4. **Returns `article_link` actions** alongside its response, so visitors
   can deep-link into the relevant briefings. 1–3 links per answer.
5. **Coaching posture, not search.** The console is a coach who has read
   everything and points the visitor to what matters — not a keyword
   search box.

### Reference implementation

The xeedly.com implementation lives at:

- `src/app/api/query/route.ts` — POST endpoint with `context: "blog"` and
  optional `articleSlug` parameter. Includes `BLOG_SYSTEM_PROMPT_ADDITION`
  and `ARTICLE_SCOPED_PROMPT_ADDITION`. Builds the article corpus context
  from the registry at `src/data/blog/index.ts`.
- `src/components/blog/IntelligenceConsole.tsx` — frontend that posts to
  the API and renders the response + action cards.
- `src/types/blog.ts` — `article_link` action type + `Article` shape

When implementing on a new client site:
1. Copy the API route and adapt the `SYSTEM_PROMPT` to the client's
   business (industry, products, voice).
2. Copy the article registry pattern: `src/data/blog/index.ts` plus
   per-article TypeScript exports.
3. Copy the `IntelligenceConsole` component and place it on all three
   blog surfaces.
4. Train the system prompt on the client's coaching posture and brand
   voice — same way we train the xeedly.com console.

### Anti-patterns (do not ship)

- ❌ A generic chatbot bubble in the corner — the console is part of the
  page composition, not a widget
- ❌ A search box that returns "10 results" — we don't surface a results
  list, we surface an *answer* with 1–3 link cards
- ❌ Hard-coded FAQ accordion masquerading as AI — the console must be
  live and synthesize across content
- ❌ A console that only works on the index — every article page needs
  one too, in article-scoped mode

---

## 2. Live Preview Theater (the "Glance / Briefing / Deep" treatment)

**The pattern:** any time a client site presents the three-tier intelligence
model (GLANCE / BRIEFING / DEEP), use the **live preview theater** treatment.
Three tier tabs above a large preview pane that morphs based on the active
tier — with realistic in-product motion in each preview.

Reference implementation: `src/components/home/IntelligenceStack.tsx` on
xeedly.com.

### Why it's required

The three-tier model is the core architectural claim of every intelligence
platform we build. Describing it in three feature cards (the old treatment)
*understates* the power. The visitor's unspoken question is *"what does
this actually look like in my day?"* — and the only way to answer it is
to show the product in motion. Three flat cards can't.

### Required structure

```
┌─ Eyebrow: "The Intelligence Stack" ─────────────────────┐
│                                                          │
│  H2: "Three tiers. Zero noise."                          │
│       └─ "Zero noise." carries the tier-accent gradient  │
│                                                          │
│  Subhead: leads with the time-spectrum claim             │
│  ("From a 5-second glance to a 5-minute investigation")  │
│                                                          │
├─ Tier Tabs (3 columns) ─────────────────────────────────┤
│  [GLANCE 0-5s] [BRIEFING 5-60s] [DEEP 1-5min]           │
│   Active tab: tinted bg, accent border, glow shadow,    │
│   downward chevron pointing into the preview pane       │
│                                                          │
├─ Live Preview Pane (large, tinted, bordered) ────────────┤
│                                                          │
│   [Active tier's animated preview]                      │
│                                                          │
└─ Bottom caption: tier dots + flow arrows ────────────────┘
   "● Glance → ● Briefing → ● Deep · One stack. Three depths."
```

### Required tier behavior

| Tier | Time | Accent | Preview content |
|---|---|---|---|
| **GLANCE** | 0–5s | `#14b8a6` teal | 6 KPI tiles. A rolling pulse highlights one tile every ~1.8s. Two metrics quietly mutate to feel live. "LIVE" badge with pulsing dot. |
| **BRIEFING** | 5–60s | `#38b6ff` blue | Realistic morning brief card with WINS / WATCH / TODAY'S PRIORITY sections. Items stagger-fade in. Header shows delivery time + source count + channel routing (Email · SMS · Slack). |
| **DEEP** | 1–5min | `#8b5cf6` purple | Dual pane. Left: dark terminal-style signal feed streaming new events every ~3.2s with insertion flash. Right: AI concierge chat showing a real investigative chain (question → correlated answer with source attribution → "Draft the fix" → typing indicator). |

### 🚨 CRITICAL: Mock data must match the client's industry

The mock data inside each preview pane **must be specific to the client's
industry.** Generic mock data ("Sales: $X, Tickets: Y") is the single
biggest quality regression we can ship. The visitor must look at the
preview and recognize their own day in it.

**Industry mock-data guide:**

| Vertical | GLANCE metrics | BRIEFING themes | DEEP signals & chat |
|---|---|---|---|
| **Multi-unit restaurant** | revenue today, food cost %, labor %, table turn time, ticket avg, no-shows | shift coverage, food cost spikes, hot menu items, customer review trends | "Why did Q2 margin compress?" · POS · Schedule · Inventory feeds |
| **HOA management** | doc orders today, vendor compliance %, work orders open, HOA pipeline value, lender ETA, association count | expiring COIs, hot doc orders, association escalations, new vendor apps | "Which vendors are at risk of lapse?" · PropertyDocz · PropertyJobz · GBP |
| **Home services / contractor** | jobs today, response time, crew utilization, AR aging, review rating, lead conversion | open estimates, missed calls, crew coverage gaps, vendor preferred status | "Why is Crew 2 slower this week?" · Dispatch · Reviews · Voice AI |
| **Real estate / brokerage** | deals in pipeline, days on market avg, lead response, conversion %, listings active, GCI YTD | hot leads, stale listings, agent productivity, market trend signals | "Which leads need follow-up today?" · CRM · MLS · Voice AI |
| **Multi-site healthcare** | patient throughput, no-show rate, schedule utilization, claim denial %, NPS, wait time | provider productivity, claim issues, no-show pattern, capacity bottlenecks | "Why are denials spiking at Clinic 3?" · EMR · Billing · Schedule |
| **Property investment** | deals in pipeline, IRR avg, occupancy, NOI YTD, capex pending, investor inquiries | new deal flow, underperforming assets, investor pipeline | "Which deals match my buy-box?" · Pipeline · Market · Investor CRM |
| **Franchised retail** | sales today, store comp %, units sold, conversion %, staff hrs, inventory turn | underperforming units, hot SKUs, staffing gaps, regional trends | "Which stores need attention?" · POS · Inventory · Schedule |

For verticals not on this list, **build the mock data from the client's
operational reality first** — interview the founder, read their KPI
dashboard, then choose metrics that would belong on their real morning
briefing. If you can't name 6 KPIs and 3 cross-system signals that match
the client's day, you don't understand their business well enough to ship
this section yet.

### Required motion / interaction

- Tab transitions: 300ms ease `[0.16, 1, 0.3, 1]`, `AnimatePresence mode="wait"`
- Tab hover: subtle `y: -2px` lift
- Active tab indicator: downward chevron (square rotated 45°) with accent border
- Preview pane swap: fade + 8px vertical slide, 350ms
- GLANCE pulse interval: 1.8s
- BRIEFING reveal: stagger 180ms between sections, 0.5s per item
- DEEP feed interval: 3.2s. New signals insert at top with brief background flash in tier accent color.

### Visual treatment requirements

- Headline second-half uses gradient: `from-[#14b8a6] via-[#38b6ff] to-[#8b5cf6]` (teal → blue → purple — the tier accents themselves)
- Preview pane border: tier accent at 30% opacity
- Preview pane background: vertical gradient from 4% tier tint at top to white at 60%
- Pane header: tier name (mono, uppercase, accent color) · tagline (semibold) · time pill (accent-tinted bg)
- Bottom flow caption: tier dots in tier colors, separated by `→` arrows, followed by single-sentence stack reinforcement

### Anti-patterns (do not ship)

- ❌ Three flat cards with description text and no live preview (the old treatment we replaced)
- ❌ Generic mock data ("Metric 1: $X, Metric 2: Y") — must be industry-specific
- ❌ Static screenshots in the preview pane — must be live JSX with motion
- ❌ Stock chart libraries (Recharts default, Chart.js default) — use the data-artifact aesthetic instead
- ❌ Skipping the DEEP concierge chat exchange — it's the closer. Most prospects linger there. Always include the question → correlated answer → "draft the fix" pattern.
- ❌ Equal-weighted tier tabs with no active state distinction — active must visually own the pane

---

## When updating these patterns

When we discover an improvement to either of these signature components on
any project, **update this file** so the improvement propagates to every
future build. These are the patterns clients are paying us for. They should
get better with every iteration, not be re-invented per project.
