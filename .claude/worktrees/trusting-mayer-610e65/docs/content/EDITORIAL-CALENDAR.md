# Editorial Calendar — The Xeedly Briefings

**Project:** XeedlyAI Blog
**Persona:** The Multi-Unit Principal
**Silos:** `PRINCIPAL-INTELLIGENCE` / `MULTI-UNIT-OPS` / `PRINCIPAL-LIFE`
**Status:** Locked — Phase 1
**Last reviewed:** 2026-05-17

---

## Phase 1 — Initial 8-Article Launch Sequence

Interleaved across silos per `PUBLISHING-SEQUENCE.md`. One article per week.

| Week | Article | Slug | Silo | Class | Status |
|---|---|---|---|---|---|
| 1 | What Is Operational Intelligence (And Why Dashboards Don't Deliver It) | `what-is-operational-intelligence` | PRINCIPAL-INTELLIGENCE | Front-door | **Published** |
| 2 | HOA Document Revenue: What Most Management Companies Lose to Third Parties | `hoa-document-revenue-management-companies-lose` | MULTI-UNIT-OPS | High-intent commercial | Planned |
| 3 | Build a Business That Runs Without You: A Practical Definition | `build-a-business-that-runs-without-you` | PRINCIPAL-LIFE | Front-door | Planned |
| 4 | The Three-Tier Intelligence Model: Glance, Briefing, Deep | `three-tier-intelligence-model-glance-briefing-deep` | PRINCIPAL-INTELLIGENCE | Magnetizer | Planned |
| 5 | The Multi-Unit Bottleneck: Why You Become the Constraint at 5+ Units | `multi-unit-bottleneck-constraint-at-five-units` | MULTI-UNIT-OPS | Front-door | Planned |
| 6 | Catalyst, Not Cage: Reframing What a Business Is For | `catalyst-not-cage-business-purpose` | PRINCIPAL-LIFE | Magnetizer | Planned |
| 7 | Building Intelligence Platforms vs. Buying BI Tools | `building-intelligence-platforms-vs-buying-bi-tools` | PRINCIPAL-INTELLIGENCE | High-intent commercial | Planned |
| 8 | Vendor Compliance at Scale: The Quiet Liability in Property Management | `vendor-compliance-at-scale-property-management` | MULTI-UNIT-OPS | Magnetizer | Planned |

---

## Phase 2 — Ongoing Cadence (Week 9 onward)

**Cadence:** One article every 2–3 weeks. Topics added based on:

- Search Console queries showing new question patterns
- Customer support questions that recur in sales conversations
- Sales objections surfaced during discovery calls
- Seasonal/cyclical triggers (fiscal year planning, association annual meetings, restaurant industry conferences)
- Reactive content based on industry news

**Remaining 22 articles** from the full Core 30 matrix get added at this cadence in interleaved order, prioritizing magnetizers and high-intent pieces.

---

## Refresh Schedule

| Article | Published | 30-day review | 90-day review | Quarterly review |
|---|---|---|---|---|
| what-is-operational-intelligence | 2026-05-17 | 2026-06-16 | 2026-08-15 | Q3 2026 |

---

## Distribution Channels (Beyond /blog)

For every article published:

1. **Internal site placement:**
   - Homepage "Recent Briefings" section (3 most recent, any silo)
   - Silo-relevant pillar page "Deeper Reading" callout
   - Footer "Latest Briefings" column

2. **External distribution:**
   - LinkedIn post by Shad (founder voice, 1-2 sentence hook + link)
   - Email to existing client base when relevant to their vertical
   - X/Twitter post for the front-door pieces

3. **AISEO distribution:**
   - Submit URL to Google Search Console
   - Update sitemap.xml
   - Test in Perplexity / ChatGPT / Claude for citation behavior (verify FAQPage schema fires)

---

## Quality Bar — Every Article Must Pass

- [ ] All 7 sections present (Direct Answer → Situation → Why It Matters → Process → Trust Signals → FAQ → CTA)
- [ ] Meta title ≤ 60 chars, meta description ≤ 155 chars
- [ ] Voice passes BRAND_VOICE.md Voice Test (5 questions)
- [ ] 3–7 internal links (upward + lateral + cross-reference)
- [ ] FAQ has 3–6 conversational Q&As
- [ ] JSON-LD: Article + FAQPage + BreadcrumbList
- [ ] Thumbnail + hero generated per `THUMBNAIL-AESTHETIC.md` (data-artifact aesthetic)
- [ ] `npm run build` passes 0 errors / 0 warnings
- [ ] Industry-appropriate vocabulary (operator for restaurants, principal for HOA/PM/RE, "you" for cross-vertical)
