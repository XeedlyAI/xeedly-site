import type { Article } from "@/types/blog";

export const article: Article = {
  slug: "restaurant-operator-morning-briefing",
  silo: "multi-unit-ops",
  articleClass: "completer",
  title:
    "The Restaurant Operator's Morning Briefing: Six Sections That Matter",
  metaTitle: "The Restaurant Operator's Morning Briefing — Six Sections",
  metaDescription:
    "What multi-unit restaurant operators actually need to see at 6 AM before service starts. Six categorized sections, prioritized by signal, delivered to the channel they already use.",
  excerpt:
    "What multi-unit restaurant operators need at 6 AM before service starts. Six sections, prioritized by signal, delivered where they already work.",
  targetKeyword: "restaurant morning briefing",
  secondaryKeywords: [
    "what should a restaurant operator check every morning",
    "multi-unit restaurant operations briefing",
    "ai morning briefing restaurants",
    "restaurant operator daily report",
  ],
  publishDate: "2026-11-15",
  lastReviewedDate: "2026-11-15",
  author: "Shad",
  readingTimeMinutes: 6,
  heroImage: "/images/blog/restaurant-operator-morning-briefing-hero.png",
  thumbnailImage: "/images/blog/restaurant-operator-morning-briefing-thumb.svg",

  directAnswer:
    "A restaurant operator's morning briefing has six categorized sections delivered at 6 AM before service starts: Revenue Health, Cost Position, Operations, Voice Intelligence, Reviews & Marketing, and Today's Priorities. Each section surfaces only the signals worth knowing — anomalies, risks, opportunities — not a wall of every metric. The whole briefing reads in 60 seconds and shapes how the operator walks into the day.",

  sections: [
    {
      heading: "Why Restaurant Operators Need a Different Briefing",
      blocks: [
        {
          type: "paragraph",
          text: "Multi-unit restaurant operations generate more daily signal volume than almost any other vertical. POS transactions every minute. Labor punches every shift. Voice calls every hour. Reviews flowing across multiple platforms. Vendor deliveries, scheduling changes, food cost shifts. Trying to absorb all of this manually before opening is impossible.",
        },
        {
          type: "paragraph",
          text: "Generic business briefings don't fit. A restaurant operator doesn't care about quarterly P&L at 6 AM — they care about whether yesterday's revenue hit target, whether labor cost ratio inverted last night, whether any locations had voicemail patterns suggesting missed reservation opportunities, and what needs their attention before the first guest walks in.",
        },
      ],
    },
    {
      heading: "The Six Sections That Matter",
      blocks: [
        {
          type: "image",
          src: "/images/blog/restaurant-operator-morning-briefing-body-sections.svg",
          alt: "Six-section morning briefing layout for a multi-unit restaurant operator",
          caption: "Figure 1 — The six-section restaurant operator briefing",
          aspect: "16:9",
        },
        {
          type: "heading3",
          text: "1. Revenue Health",
        },
        {
          type: "paragraph",
          text: "Yesterday's sales vs. target by location. Day-over-day and same-day-last-week comparisons. Anomalies highlighted (location off by 15%+, daypart shift, comp ticket spike). Critical for the operator's first instinct: is the business hitting?",
        },
        {
          type: "heading3",
          text: "2. Cost Position",
        },
        {
          type: "paragraph",
          text: "Day-of-month confidence on food cost, labor cost, and overall margin trajectory. Not the static budget — the dynamic projection given what's happened so far this month. Surfaces locations drifting before drift becomes a problem.",
        },
        {
          type: "heading3",
          text: "3. Operations",
        },
        {
          type: "paragraph",
          text: "Active staffing signals (call-outs, no-shows, manager schedule changes), inventory exceptions (low stock approaching, vendor delivery delays), facility issues (equipment alerts, maintenance overdue).",
        },
        {
          type: "heading3",
          text: "4. Voice Intelligence",
        },
        {
          type: "paragraph",
          text: "Calls received, missed call rate, sentiment shifts, reservation patterns. For restaurants using voice AI, this includes flagged calls (complaints, escalations, opportunities). A high missed-call rate on a Friday morning means reservations are walking out the door.",
        },
        {
          type: "heading3",
          text: "5. Reviews & Marketing",
        },
        {
          type: "paragraph",
          text: "New reviews across Google, Yelp, OpenTable, social. Sentiment changes. Cluster alerts (multiple negative reviews mentioning the same dish, server, or experience). Marketing campaign performance signals.",
        },
        {
          type: "heading3",
          text: "6. Today's Priorities",
        },
        {
          type: "paragraph",
          text: "The three to five things the system thinks need decisions today, ranked by severity. Could be a vendor renewal due, a staff scheduling conflict, a location anomaly worth visiting, a review needing a personal response. The operator scans this section and knows where to point the day.",
        },
      ],
    },
    {
      heading: "What Operators Actually Do With It",
      blocks: [
        {
          type: "list",
          ordered: false,
          items: [
            "**Read on phone before driving in** — operators commute and read the briefing en route, not at a desk",
            "**Forward sections to GMs** — the location-specific signals get pushed to the right GM via SMS or in-app message",
            "**Skip the 7 AM huddle** — when everyone gets the same briefing, the daily standup becomes a 5-minute confirmation instead of a 30-minute information transfer",
            "**Act on the priorities** — the three to five things in section 6 become the operator's actual day, replacing the reactive triage of inbound problems",
          ],
        },
      ],
    },
    {
      heading: "Why This Beats a Dashboard",
      blocks: [
        {
          type: "paragraph",
          text: "Restaurant operators don't sit at desks. They're between locations, on the floor, in the kitchen, with vendors. A dashboard that requires login + interpretation doesn't fit their work. A briefing delivered to their inbox at 6 AM in the format they can scan on a phone fits perfectly.",
        },
        {
          type: "callout",
          severity: "good",
          title: "The shift",
          body: "Stop asking the operator to remember to check intelligence. Push the intelligence to where they already are, in the format they can absorb in 60 seconds. The dashboard model loses to push-based briefings every time for this audience.",
        },
      ],
    },
  ],

  trustSignals: {
    heading: "How Sovvrn Delivers This",
    body: "Sovvrn is XeedlyAI's restaurant intelligence platform built specifically for multi-unit restaurant operators. Six-section morning briefing delivered at 6 AM by email/SMS. Voice AI integration (Vapi + ElevenLabs + Twilio) for call intelligence. Cost intelligence with day-of-month confidence modeling. Command Center with three-panel signal feed for deeper investigation. Live at sovvrn.vercel.app. Same architecture deployable for any multi-unit restaurant operator in 2–4 weeks.",
    caseStudies: [
      { slug: "sovvrn", label: "Sovvrn — Restaurant Intelligence in Production" },
    ],
  },

  faq: [
    {
      q: "What should a multi-unit restaurant operator check every morning?",
      a: "Six categories: revenue health (vs target, anomalies), cost position (day-of-month margin trajectory), operations (staffing, inventory, facility signals), voice intelligence (call patterns, missed calls, sentiment), reviews and marketing (new reviews, cluster alerts, campaign signals), and today's priorities (the 3–5 things ranked by severity that need attention).",
    },
    {
      q: "Why is a morning briefing better than a dashboard for restaurant operators?",
      a: "Restaurant operators don't sit at desks. They're between locations, on the floor, in the kitchen. Dashboards require login + interpretation that doesn't fit their work. A briefing pushed to their phone at 6 AM in scannable format meets them where they are and fits their day.",
    },
    {
      q: "When should the morning briefing be delivered?",
      a: "6 AM before service starts is the standard. Most operators read it during their commute or first coffee. Some operators prefer 5 AM or 6:30 AM depending on their personal rhythm. The point is before the first decisions of the day need to be made, not in the middle of service when they're focused on the floor.",
    },
    {
      q: "How does cost intelligence with day-of-month confidence work?",
      a: "Instead of comparing actual costs to a static monthly budget (which is useless on day 8), day-of-month confidence projects month-end position based on what's happened so far. A location 8% over food cost on day 22 with the right purchasing pattern can still hit budget; one 3% over on day 8 with rising trend probably can't. The intelligence layer makes that distinction.",
    },
    {
      q: "Can the morning briefing be forwarded to GMs and location managers?",
      a: "Yes — and should be. The full briefing goes to the operator. Location-specific sections (or location-filtered briefings) get auto-forwarded to the relevant GM via SMS or in-app message. This is part of what replaces the 7 AM standup — everyone gets the right slice of intelligence asynchronously instead of joining a meeting to hear it.",
    },
  ],

  cta: {
    heading: "Deploy the briefing your operators actually need",
    body: "Tell us how many locations you run and which systems feed your operations (POS, scheduling, reviews, voice). We'll map a Sovvrn deployment for your restaurant group — usually 2–4 weeks to live briefings.",
    primaryAction: {
      label: "Book a Discovery Call",
      href: "/contact",
    },
  },

  internalLinks: {
    pillar: "/products",
    laterals: [
      "morning-briefing-replaces-7am-meeting",
      "three-tier-intelligence-model-glance-briefing-deep",
      "multi-unit-bottleneck-constraint-at-five-units",
    ],
  },
};
