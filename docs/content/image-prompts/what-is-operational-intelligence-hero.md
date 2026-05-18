# Image Prompt — `what-is-operational-intelligence` (Hero)

**Surface:** Top of article page
**Aspect ratio:** 21:9 (1600×686)
**Type:** B (data-artifact, full pipeline diagram + headline)
**Current asset:** Hand-authored SVG at `/public/images/blog/what-is-operational-intelligence-hero.svg`

---

## Prompt for regeneration via `image-generation` skill

```
Style: Stripe-marketing-meets-engineering-blueprint. Flat vector linework, data-artifact aesthetic. Reads as a screenshot from an internal intelligence platform, not a blog illustration.

Aspect ratio: 21:9 (1600×686)

Background: Navy #0F172A with 48px grid pattern in #1E293B. Soft radial glow centered at 50% width in primary blue #38B6FF at 18% opacity.

Composition (two horizontal columns):

LEFT COLUMN (40% width):
1. Top section — "SIGNAL PIPELINE" mono label in #64748B
2. Three pipeline cards in a horizontal row connected by arrows in #38B6FF:
   - INGEST card (teal #14B8A6 left-border, "Event bus", mono "12,847 EVENTS / HOUR")
   - Arrow →
   - DETECT card (primary blue #38B6FF left-border, "Signal engine", mono "37 ACTIVE RULES")
   - Arrow →
   - DELIVER card (purple #8B5CF6 left-border, "Multi-channel", mono "EMAIL · SMS · SLACK")
3. Below: "SAMPLE SIGNALS" mono label, then two signal cards side by side:
   - HIGH severity (red #EF4444 left-border): "Cross-system correlation detected · Vendor insurance lapsed + 3 doc requests queued"
   - MEDIUM severity (amber #F59E0B left-border): "Revenue anomaly flagged · Tuesday lunch down 18% vs 4-wk trend"

RIGHT COLUMN (60% width):
- Top: "PRINCIPAL-INTELLIGENCE · #001" in mono uppercase #38B6FF
- Large title in Inter Bold tight tracking:
  - "What Is" in white
  - "Operational" in white  
  - "Intelligence?" in primary blue #38B6FF
- Subtitle in Inter: "And why dashboards don't deliver it."
- Byline in mono uppercase #64748B: "— SHAD · FOUNDER · 7 MIN READ"

Required elements:
- Pipeline cards with severity-style left-border accents
- Real-looking signal cards with severity badges
- Title hierarchy with color shift on key word
- Footer mark "XEEDLY · THE BRIEFINGS" bottom-left
- Footer signal ID "SIGNAL-001 · LIVE" bottom-right

Negative constraints: No 3D, no gradients beyond background glow, no drop shadows beyond 1px, no human figures, no stock photography, no decorative illustrations, no rounded fonts. Sharp corners or 4–6px radius only. Inter and JetBrains Mono typography only. All status colors must match design system exactly.
```
