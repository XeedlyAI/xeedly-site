# Xeedly Briefings — Image Style Guide

**Status:** Locked — Phase 2
**Last reviewed:** 2026-05-17

This is the durable spec for every visual asset in the blog. Every thumbnail, hero, and body image must pass this guide before publishing.

---

## 1. The Two Rules That Override Everything

### Rule 1 — Thumbnails and heroes are NEVER the same composition.
Different surface, different purpose, different composition. The hero is the article's stage; the thumbnail is the card. They must read as siblings, not duplicates.

### Rule 2 — Background variety across the index grid.
Not every thumbnail is dark navy. The blog index page is a grid; uniform dark backgrounds make it feel monotonous. We alternate backgrounds deliberately to create visual rhythm.

---

## 2. Background Variety Palette (Thumbnails)

Pick the background per article from this palette. Rotate so adjacent articles don't share backgrounds.

| Background | Hex | Use For |
|---|---|---|
| **Dark navy** | `#0F172A` | Tactical / signal-heavy / "screenshot of the platform" thumbnails. ~40% of articles. |
| **Off-white** | `#FAFAFA` | "Output" or "artifact" thumbnails — briefing cards, scorecards, decision trees. ~30% of articles. |
| **Pale blue wash** | `#F0F9FF` | Conceptual / framework thumbnails. ~15% of articles. |
| **Soft cream** | `#FAF7F2` | PRINCIPAL-LIFE silo philosophical thumbnails. ~10% of articles. |
| **Elevated dark** | `#1E293B` | When dark navy needs a slightly elevated feel. ~5% of articles. |

**Discipline:** When scheduling the next 3 articles, glance at the previous 3 thumbnails. If they're all dark, the next one must be light. If they're all light, the next must be dark.

---

## 2a. Hero Background Rule (CRITICAL)

**Every article hero image sits directly beneath the article's dark navy title block.** If the hero is also dark navy, the two regions blend into one undifferentiated dark mass and the hero loses all impact.

**Rule: hero image backgrounds are ALWAYS light.** Pick from the light variants of the palette:

| Hero Background | Hex | Best For |
|---|---|---|
| **Pale blue wash** | `#F0F9FF` | PRINCIPAL-INTELLIGENCE — feels clean, technical, intelligence-platform-y |
| **Off-white** | `#FAFAFA` | Default — neutral, document-like, works for anything |
| **Soft cream** | `#FAF7F2` | PRINCIPAL-LIFE — warmer, more reflective, manifesto-adjacent |
| **Mint wash** | `#F0FDFA` | Optional — use sparingly for upbeat / good-news articles |

**Heroes alternate through these lights across the corpus** the same way thumbnails alternate dark/light. If the last 3 heroes were off-white, the next is pale blue or cream.

**No dark navy heroes.** The article title block is dark navy; the hero must contrast.

(Body images can be any background — they sit inside the white body, so dark backgrounds create good contrast there.)

---

## 3. Composition — Thumbnail vs Hero

### Thumbnails (16:9, 1200×675)
- **Single dominant visual element.** No competing elements.
- **Larger labels** for readability at small sizes (cards on blog index, social previews).
- **Higher contrast** between background and primary element.
- **Tighter composition** — minimal whitespace around the central element.
- **Title can be present** but compact, not the main visual focus.
- **Examples of dominant elements:**
  - A single signal card (mock platform extract)
  - A single scorecard or decision tree
  - A single chart with one data series
  - A single architectural symbol (icon at scale)

### Heroes (21:9, 1600×686)
- **Wider canvas — more breathing room.** The hero is a stage.
- **Multiple coordinated elements OK** — pipeline diagram + signal cards + headline block.
- **Smaller labels** acceptable because the surface is larger.
- **Lower contrast / more ambient** elements at the edges.
- **Title is primary** — usually right-aligned with the visual elements left-aligned (or vice versa).
- **Examples of compositions:**
  - Pipeline / process diagram with title block beside it
  - Wide scorecard with row labels visible
  - Schematic / architectural drawing with annotation labels

---

## 4. The Asset Triple Per Article

Every published article ships with **three visual assets**, not two:

| Asset | Purpose | Reuse |
|---|---|---|
| **Thumbnail** | Blog index card, social previews, homepage Recent Briefings, footer Latest Briefings | Often also reused as a body image somewhere in the article |
| **Hero** | Top-of-article banner | Hero only |
| **Body image(s)** | 1–3 contextual visuals inside the article body, breaking up text every ~400 words | Body only (though the thumbnail composition can be repurposed as one of them) |

The thumbnail can serve a second life as a body image — typically in the section that most closely relates to what the thumbnail depicts. This is asset reuse with intention, not duplication.

---

## 5. Thumbnail Types Per Silo (Defaults)

| Silo | Default Type | Default Background | Default Composition |
|---|---|---|---|
| `PRINCIPAL-INTELLIGENCE` | **Type B** (data-artifact infographic) — code-built SVG | Alternate dark navy and off-white | Single signal card OR architectural icon |
| `MULTI-UNIT-OPS` | **Type A** (real-world photo + data overlay) — image-generation skill | Photo background, varies | Industry-specific scene with data callouts |
| `PRINCIPAL-LIFE` | **Type D** (philosophical / conviction) — image-generation or hand-crafted SVG | Soft cream OR dark navy (alternating) | Symbolic / abstract / conceptual |

**Overrides:** Any individual article can deviate from its silo default if the topic calls for it. Document the deviation in the article's image prompt file with a 1-sentence rationale.

---

## 6. Required Elements (All Image Types)

Every thumbnail, hero, and body image must include at least 3 of:

- Mono labels with category/identifier text (e.g., `BRIEFING-001`, `RESERVES-VISIBILITY`, `SIGNAL-CR-017`)
- Status indicators (severity badges, pass/fail chips, completion percentages)
- Numeric data points (`74% FUNDED`, `GAP $182K`, `23H AGO`)
- Structural elements (cells, rows, axes, branches, timelines)
- Geometric icons drawn from the design system (circles, squares, arrows — flat vector)

And every image must:

- Use the project's primary brand color `#38B6FF` at least once as accent
- Use Inter and JetBrains Mono typography only
- Avoid stock photography (real-world photos for Type A are AI-generated composites, not stock)
- Avoid 3D, gradients beyond 1px, drop shadows beyond 1px
- Avoid human figures unless the article topic explicitly requires them

---

## 7. File Naming Convention

```
/public/images/blog/[slug]-thumb.[ext]
/public/images/blog/[slug]-hero.[ext]
/public/images/blog/[slug]-body-[descriptor].[ext]
```

Examples:
- `what-is-operational-intelligence-thumb.svg`
- `what-is-operational-intelligence-hero.svg`
- `what-is-operational-intelligence-body-tiers.svg`
- `hoa-document-revenue-thumb.png` (image-gen, raster)
- `hoa-document-revenue-hero.png`
- `hoa-document-revenue-body-revenue-flow.svg` (code-built diagram)

---

## 8. Quality Bar

A thumbnail passes if a viewer would mistake it for a screenshot from the Xeedly platform OR for an editorial illustration in a top-tier design publication. If it looks generic SaaS-marketing, it fails.

A hero passes if it functions as a "stage" — sets the article's tone, gives the title breathing room, and makes the reader want to keep scrolling.

A body image passes if it earns its placement by helping the reader understand something the text couldn't communicate as efficiently.
