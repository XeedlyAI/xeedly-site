# Image Prompt — `what-is-operational-intelligence` (Hero)

**Surface:** Top of article page (sits directly beneath dark navy title block)
**Aspect ratio:** 21:9 (1600×686)
**Type:** B (data-artifact, pipeline + headline composition)
**Background:** Pale blue wash `#F0F9FF` (light — required per Hero Background Rule in IMAGE-STYLE.md §2a)
**Current asset:** Hand-authored SVG at `/public/images/blog/what-is-operational-intelligence-hero.svg`

---

## Composition Strategy

This hero uses the **"PIPELINE" angle** — the architectural flow of how operational intelligence works. It complements the thumbnail (output briefing card) and body image (three-tier comparative diagram). Three distinct compositions, three surfaces.

**Background:** Pale blue wash — picked specifically to contrast the dark navy title block above. Heroes must always have light backgrounds (see IMAGE-STYLE.md §2a Hero Background Rule).

## Prompt for regeneration via `image-generation` skill

```
Style: Stripe-marketing-meets-engineering-blueprint. Flat vector linework, data-artifact aesthetic. Reads as a technical figure from a product whitepaper.

Aspect ratio: 21:9 (1600×686)

Background: Pale blue wash #F0F9FF with subtle 56px grid pattern in pale sky #BAE6FD at 50% opacity. Soft radial glow in primary blue #38B6FF at 8% opacity centered top.

LEFT COLUMN (50% width):
1. Top section — "SIGNAL PIPELINE" mono label in #64748B
2. Three pipeline cards arranged horizontally, connected by primary blue arrows:
   - INGEST card: white background, 2px stroke in teal #14B8A6, 5px left-border accent in #14B8A6, label "INGEST" in mono teal #0F766E, body "Event bus", mono footer "12,847 EVENTS / HOUR"
   - Arrow →
   - DETECT card: white background, 2px stroke in primary blue #38B6FF, 5px left-border in #38B6FF, label "DETECT" in mono dark blue #0A8FD4, body "Signal engine", mono footer "37 ACTIVE RULES"
   - Arrow →
   - DELIVER card: white background, 2px stroke in purple #8B5CF6, 5px left-border in #8B5CF6, label "DELIVER" in mono dark purple #7C3AED, body "Multi-channel", mono footer "EMAIL · SMS · SLACK"
   Each card has subtle 2-3px shadow for depth on the light background.
3. Below: "SAMPLE SIGNALS" mono label, then two signal cards side by side:
   - HIGH severity: white card, 1px pale red border #FECACA, 5px red #EF4444 left-border, "HIGH · CR-017" mono in deep red #DC2626, "Cross-system correlation detected" headline, "Vendor insurance lapsed + 3 doc requests queued" body
   - MEDIUM severity: white card, 1px pale amber border #FED7AA, 5px amber #F59E0B left-border, "MEDIUM · REV-008" mono in deep amber #D97706, "Revenue anomaly flagged" headline, "Tuesday lunch down 18% vs 4-wk trend" body

RIGHT COLUMN (50% width):
- Top: "PRINCIPAL-INTELLIGENCE · #001" in mono uppercase dark blue #0A8FD4
- Large title in Inter Bold, tight tracking:
  - "What Is" in dark navy #0F172A
  - "Operational" in dark navy
  - "Intelligence?" in primary blue #38B6FF
- Subtitle in Inter: "And why dashboards don't deliver it." in slate #475569
- Byline in mono uppercase #64748B: "— SHAD · FOUNDER · 7 MIN READ"

Required elements:
- White pipeline cards with severity-style left-border accents (variety of accent colors)
- Realistic signal cards with severity badges
- Title hierarchy with color shift on key word
- Footer mark "XEEDLY · THE BRIEFINGS" bottom-left in muted slate
- Footer signal ID "SIGNAL-001 · LIVE" bottom-right in muted slate
- Overall feel: "engineering whitepaper figure" not "blog illustration"

Negative constraints: No 3D, no gradients beyond the subtle background grid/glow, no drop shadows beyond 2-3px subtle card depth, no human figures, no stock photography, no decorative illustrations, no rounded fonts. Sharp corners or 4–8px radius only. Inter and JetBrains Mono typography only. All status colors must match design system exactly. Background must be LIGHT (pale blue wash) — never dark navy, since the article title block above is already dark navy.
```
