# Image Prompt — `what-is-operational-intelligence` (Body — Three Tiers Figure)

**Surface:** Inline body image, "Three Depths of Intelligence" section
**Aspect ratio:** 16:9 (1200×675)
**Type:** B (architectural / data-artifact)
**Background:** Dark navy `#0F172A` (variety pick — alternates with thumbnail's light bg)
**Current asset:** Hand-authored SVG at `/public/images/blog/what-is-operational-intelligence-body-tiers.svg`

---

## Composition Strategy

This is the **architecture angle** — depicting the three depths as a comparative diagram. It complements the thumbnail (output card) and hero (pipeline + headline). Each surface gets its own visual story.

## Prompt for regeneration via `image-generation` skill

```
Style: Stripe-marketing-meets-engineering-blueprint. Flat vector linework, architectural data-artifact aesthetic. Looks like a figure from a product whitepaper.

Aspect ratio: 16:9 (1200×675)

Background: Navy #0F172A with 40px grid pattern in #1E293B. Soft radial glow centered at 50% in primary blue #38B6FF at 12% opacity.

Header (top-left):
- "THE THREE DEPTHS OF INTELLIGENCE" in JetBrains Mono, primary blue #38B6FF, 700 weight, letter-spacing 0.15em
- Sub-label: "GLANCE · BRIEFING · DEEP — A LEADER'S TIME BUDGET" in mono #64748B

Three horizontal depth cards (each ~320–340 wide, 320 tall), spaced evenly:

CARD 1 — GLANCE (teal):
- Dark elevated card #1E293B, 1.5px stroke in teal #14B8A6, 8px corner radius
- 5px left-border accent in #14B8A6
- "GLANCE" label in mono teal, 14px, 700 weight, letter-spacing 0.12em
- "0–5 SECONDS" in mono muted #94A3B8
- Description: "KPI ticker / Ambient awareness layer / Always visible / No clicks. No logins."
- Embedded mini-KPI ticker example: dark #0F172A inner card with 4 KPI cells (REVENUE $847, OPEN 12, VENDORS 92%, SLA 98%) in mono

CARD 2 — BRIEFING (primary blue):
- Same structure, stroke in primary blue #38B6FF
- Description: "AI morning briefing / Categorized insights / Prioritized actions / Cross-system correlations"
- Embedded mini-briefing example: dark inner card with "TODAY · 3 SIGNALS" label and two preview rows with severity dots (red + amber)

CARD 3 — DEEP (purple):
- Same structure, stroke in purple #8B5CF6
- Description: "Signal feed + concierge / Full investigative depth / Freeform AI queries / Entity drilldowns"
- Embedded query box example: dark rounded pill "Ask the platform..." with a purple arrow send icon

Footer:
- "FIGURE 1 · XEEDLY INTELLIGENCE ARCHITECTURE" mono muted bottom-left
- "REF · DEPTH-MODEL-V1" mono muted bottom-right

Required elements:
- Three coordinated depth cards in a row
- Each card has a unique accent color (teal / blue / purple)
- Each card includes a mini visual example of that depth's output
- Mono labels throughout
- All status colors match design system exactly

Negative constraints: No 3D, no gradients beyond background glow, no drop shadows beyond 1px, no human figures, no stock photography, no decorative illustrations. Sharp corners or 4–8px radius only. Inter and JetBrains Mono typography only.
```
