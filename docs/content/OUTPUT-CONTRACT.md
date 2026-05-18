# Output Contract — Xeedly Briefings

**Project:** XeedlyAI Blog
**Status:** Locked — Phase 2 confirmation
**Last reviewed:** 2026-05-17

This document calibrates the per-project output contract for article production. Read before drafting any article.

---

## Voice

Match `BRAND_VOICE.md` exactly. Specifically:

- **Convicted, not preachy.** State beliefs as conclusions, not opinions ("The business is the means. Not the meaning.") — never "We believe that…"
- **Direct, never sterile.** Short sentences. Strong verbs. Warm undertone.
- **Honest about tension.** Name trade-offs. Don't smooth over hard truths.
- **Trust the reader.** Don't over-explain. Don't pad. Don't recap obvious context.
- **Founder-led, never committee-written.** The voice is Shad's — direct, convicted, occasionally personal.

### Forbidden vocabulary (auto-reject)
- empower, unleash, transform, take it to the next level
- game-changer, revolutionize, disrupt, navigate the landscape
- robust, leverage (verb), synergy, solutions (as noun for products)
- "At Xeedly, we believe…"
- "In today's world…" / "It's important to note…" / "Let's dive in" / "In this article we'll…"
- world-class, best-in-class, cutting-edge, state-of-the-art

### Industry-appropriate persona vocabulary
- **Restaurants** → operator (industry-native)
- **HOA Management / Property Management / Real Estate** → principal / owner / sponsor
- **Cross-vertical** → leader / builder / "you"
- **Default to "you"** (second person) when uncertain

---

## Schema.org Type

**Article** for all blog posts (not BlogPosting — Article reads as more authoritative in Google's eyes for this type of content).

---

## Breadcrumb Format

```
BLOG / [SILO] / [TITLE-FRAGMENT]
```

Rendered in mono uppercase, JetBrains Mono, tracking-[0.12em], color `#64748b` on light surfaces or `#94a3b8` on dark. Slashes are `/` characters with margin-x.

Example: `BLOG / PRINCIPAL-INTELLIGENCE / WHAT IS OPERATIONAL INTELLIGENCE`

---

## Author Byline

- **Name:** Shad
- **Title:** Founder, XeedlyAI
- **Mono identifier:** `SHAD`
- **Avatar:** None (text-only byline matches data-artifact aesthetic)
- **URL:** `/about`

---

## Color Tokens (Article Visuals)

Pull from `DESIGN_SYSTEM.md`. For article-internal visuals (charts, callouts, signal cards):

| Token | Hex | Use |
|---|---|---|
| Primary | `#38B6FF` | Accents, links, signal-card left border |
| Primary Dark | `#0A8FD4` | Hover states, secondary accents |
| Purple | `#8B5CF6` | DEEP-tier signals, less common accent |
| Nav Dark | `#0F172A` | Dark surface backgrounds |
| Dark Lighter | `#1E293B` | Elevated dark surfaces |
| Slate 400 | `#94A3B8` | Muted text on dark |
| Slate 600 | `#475569` | Body text on light |
| Slate 800 | `#1E293B` | Headings on light |
| Status Info | `#38B6FF` | Default callout |
| Status Good | `#10B981` | Positive signals/outcomes |
| Status Warn | `#F59E0B` | Cautionary callouts |
| Status Crit | `#EF4444` | Critical/severe signals |

---

## Pillar Page URLs

| Silo | Pillar URL |
|---|---|
| `PRINCIPAL-INTELLIGENCE` | `/platform` |
| `MULTI-UNIT-OPS` | `/products` |
| `PRINCIPAL-LIFE` | `/manifesto` |

---

## CTA Destinations

| Silo | Primary CTA destination |
|---|---|
| `PRINCIPAL-INTELLIGENCE` | `/contact` or `/#console` (try the Intelligence Console) |
| `MULTI-UNIT-OPS` | `/contact` or `/booking` (book a discovery call) |
| `PRINCIPAL-LIFE` | `/manifesto` (read the manifesto) or `/contact` |

One conversion destination per article. No stacking.

---

## Article Length Targets

| Silo | Target |
|---|---|
| `PRINCIPAL-INTELLIGENCE` | 1000–1500 words (educational depth) |
| `MULTI-UNIT-OPS` | 900–1300 words (tactical specificity) |
| `PRINCIPAL-LIFE` | 800–1200 words (reflective, doesn't pad) |
| Comparison or "vs." articles | 1500+ words (these need depth to rank) |

Do not pad. Ship at completion, not at target length.

---

## Internal Links Per Article

- 1–2 upward links to silo pillar
- 2–4 lateral links to silo siblings (or "planned" articles — placeholder until published)
- 0–1 cross-references to non-blog site pages (homepage, about, etc.)

Total: 3–7 links per article. Vary anchor text — never use the same anchor twice in one article.

---

## Frontmatter Spec (per article data file)

Every article is a TypeScript file at `src/data/blog/articles/[slug].ts` exporting an `Article` object. Required fields:

```ts
{
  slug: string;
  silo: SiloId;                    // "principal-intelligence" | "multi-unit-ops" | "principal-life"
  title: string;                   // H1, may exceed 60 chars
  metaTitle: string;               // ≤ 60 chars
  metaDescription: string;         // ≤ 155 chars
  excerpt: string;                 // 1 sentence for cards
  targetKeyword: string;
  secondaryKeywords: string[];
  publishDate: string;             // "YYYY-MM-DD"
  lastReviewedDate: string;        // "YYYY-MM-DD"
  author: string;                  // "Shad"
  readingTimeMinutes: number;
  heroImage: string;               // /images/blog/[slug]-hero.[ext]
  thumbnailImage: string;          // /images/blog/[slug]-thumb.[ext]
  directAnswer: string;            // 1-2 sentences, snippet-extractable
  sections: ArticleSection[];      // ordered body sections
  trustSignals: { heading; body; caseStudies? };
  faq: { q; a }[];                 // 3-6 conversational Q&As
  cta: { heading; body; primaryAction };
  internalLinks: { pillar; laterals };
}
```

---

## JSON-LD Schema Required Per Article

Three schema types injected via `Head` or `<script type="application/ld+json">`:

1. **Article** — title, description, author, publisher, dates, image, mainEntityOfPage
2. **FAQPage** — generated from the article's `faq` array
3. **BreadcrumbList** — `Blog → Silo → Article`

These are auto-generated by the `ArticleStructuredData` component (built in the scaffold).

---

## Image Prompt Convention

Two prompts per article, both written to `docs/content/image-prompts/`:

- `[slug]-thumbnail.md` (16:9, 1200×675)
- `[slug]-hero.md` (21:9, 1600×686)

Each follows the THUMBNAIL-AESTHETIC.md template: style anchor, aspect ratio, color tokens, composition spec, required elements, negative constraints.

Image production handled by `image-generation` skill (Nano Banana) for Type A photo composites, or hand-authored SVG for Type B/C/D infographics.

---

## Placeholders Allowed (for human review)

- `[VOICE-REVIEW]` — passage where Shad should check tone
- `[FACT-CHECK: claim X]` — claim needing verification
- `[STAT-NEEDED]` — claim that should be supported with specific stat
- `[QUOTE-FROM: person]` — placeholder for quote Shad will provide

Markers stay in draft until Shad reviews; greppable.

---

## Self-Check Before Publishing

- [ ] Direct answer in first 1–2 sentences
- [ ] All 7 sections present
- [ ] Meta title ≤ 60 chars; meta description ≤ 155 chars
- [ ] Slug lowercase-hyphenated, ≤ 60 chars
- [ ] 3–7 internal links (upward + lateral + cross-ref)
- [ ] FAQ has 3–6 Q&As in conversational phrasing
- [ ] JSON-LD includes Article + FAQPage + BreadcrumbList
- [ ] Voice passes Voice Test (5 questions in BRAND_VOICE.md §7)
- [ ] No forbidden vocabulary
- [ ] Industry-appropriate persona vocabulary
- [ ] Length within silo target
- [ ] CTA present, single destination
- [ ] Image prompts written
- [ ] `npm run build` passes
