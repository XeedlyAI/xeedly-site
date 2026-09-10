import type { Article } from "@/types/blog";

export const article: Article = {
  slug: "three-tier-intelligence-model-glance-briefing-deep",
  silo: "principal-intelligence",
  articleClass: "magnetizer",
  title: "The Three-Tier Intelligence Model: Glance, Briefing, Deep",
  metaTitle: "The Three-Tier Intelligence Model — Glance, Briefing, Deep",
  metaDescription:
    "Three depths. Three time budgets. One architecture. Why intelligence platforms that work cover all three — and why dashboards that only cover one always fail.",
  excerpt:
    "Three depths. Three time budgets. One architecture. Why most BI tools fail and what a system that doesn't looks like.",
  targetKeyword: "three tier intelligence model",
  secondaryKeywords: [
    "intelligence delivery model",
    "business intelligence depth",
    "morning briefing system",
    "kpi ticker dashboard",
  ],
  publishDate: "2026-06-07",
  lastReviewedDate: "2026-06-07",
  author: "Shad",
  readingTimeMinutes: 8,
  heroImage:
    "/images/blog/three-tier-intelligence-model-glance-briefing-deep-hero.png",
  thumbnailImage:
    "/images/blog/three-tier-intelligence-model-glance-briefing-deep-thumb.svg",

  directAnswer:
    "Operational intelligence works at three depths: GLANCE (0–5 seconds, ambient KPI awareness), BRIEFING (5–60 seconds, proactive AI summary), and DEEP (1–5 minutes, investigative signal feed with AI concierge). A real intelligence layer covers all three. Dashboards that only operate at DEEP — which is most of them — fail because nobody has 5 minutes every hour to investigate.",

  sections: [
    {
      heading: "Why Depth Matters",
      blocks: [
        {
          type: "paragraph",
          text: "Every decision a leader makes operates on a time budget. Some decisions get 5 seconds. Some get a full minute. Some warrant 5 minutes of investigation. A well-designed intelligence layer matches the delivery format to the time budget — and gives the leader a clean way to move between depths when the situation shifts.",
        },
        {
          type: "paragraph",
          text: "Most business intelligence tools were designed at a single depth: DEEP. They assume you'll come to the dashboard, spend a few minutes orienting, and dig in. That model worked for analysts. It doesn't work for principals running multi-unit businesses where decisions happen in seconds between conversations.",
        },
        {
          type: "image",
          src: "/images/blog/three-tier-intelligence-model-glance-briefing-deep-body-depth.svg",
          alt: "The three depths of intelligence — GLANCE (0–5 seconds, KPI ticker), BRIEFING (5–60 seconds, AI morning briefing), DEEP (1–5 minutes, signal feed and AI concierge)",
          caption: "Figure 1 — Time-budget alignment for each depth",
          aspect: "16:9",
        },
      ],
    },
    {
      heading: "GLANCE — The Ambient Layer",
      blocks: [
        {
          type: "paragraph",
          text: "GLANCE is the always-visible layer. KPI tickers across every surface you already look at. No clicks, no logins, no dashboards.",
        },
        {
          type: "paragraph",
          text: "The format: a thin strip of operational metrics — revenue today, open work orders, vendor compliance %, SLA performance — that lives at the top or bottom of every screen your team uses. It updates in real time. Operators absorb it the way they absorb a clock.",
        },
        {
          type: "heading3",
          text: "What GLANCE is for",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "**Ambient awareness** — knowing the state of the business without thinking about it",
            "**Anomaly noticing** — when a familiar number looks wrong, instinct fires",
            "**Confidence intervals** — knowing whether to keep going on the current task or pivot to something operational",
          ],
        },
        {
          type: "heading3",
          text: "What GLANCE is NOT for",
        },
        {
          type: "paragraph",
          text: "Investigation. Decisions that require context. Anything that requires comparing two periods or seeing a chart. If a metric needs explanation, it doesn't belong in the GLANCE layer — push it to BRIEFING or DEEP.",
        },
      ],
    },
    {
      heading: "BRIEFING — The Proactive Layer",
      blocks: [
        {
          type: "paragraph",
          text: "BRIEFING is the proactive AI summary delivered to you, in your existing channel, before you ask. The morning briefing is the canonical form: a categorized summary of what happened overnight, what needs attention today, and which signals warrant a closer look.",
        },
        {
          type: "paragraph",
          text: "Delivery channels matter as much as content. Email at 6 AM. SMS for urgent signals. Slack or Teams in-channel posts for the leadership team. The intelligence finds you where you already work.",
        },
        {
          type: "heading3",
          text: "What a good BRIEFING looks like",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "**Categorized** — financial health, operations, vendor & compliance, today's priorities — not a wall of bullets",
            "**Prioritized** — exceptions surfaced first, routine confirmations last",
            "**Actionable** — each signal links to the deeper view if you want to investigate",
            "**Tone-appropriate** — coaching voice, not corporate report-speak. A briefing reads like a smart chief of staff brought you up to speed",
          ],
        },
      ],
    },
    {
      heading: "DEEP — The Investigative Layer",
      blocks: [
        {
          type: "paragraph",
          text: "DEEP is where dashboards traditionally live, and where they should live. The signal feed, the entity drilldowns, the AI concierge for freeform queries. When something surfaces in GLANCE or BRIEFING that warrants attention, DEEP is where you go to investigate.",
        },
        {
          type: "paragraph",
          text: "But DEEP shouldn't be the default path. It's reserved for the times when investigation is genuinely needed. If you're spending more than 30 minutes a day at DEEP, the upper layers aren't doing their job.",
        },
        {
          type: "heading3",
          text: "What DEEP delivers",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "**Signal feed** — chronological list of detected signals across all systems, filterable by severity, system, entity",
            "**Entity drilldowns** — click any property, vendor, unit, deal, etc. and see the full operational history",
            "**AI concierge** — ask freeform questions of your data in natural language, get structured answers with source citations",
            "**Cross-system correlations** — patterns that span multiple tools that no single-tool dashboard could surface",
          ],
        },
      ],
    },
    {
      heading: "Why Single-Depth Tools Fail",
      blocks: [
        {
          type: "paragraph",
          text: "The most common failure mode in business intelligence is building (or buying) a single-depth tool and expecting it to cover all three needs.",
        },
        {
          type: "callout",
          severity: "warn",
          title: "The dashboard trap",
          body: "Dashboards live at DEEP. To use them, you have to remember to look, know what to look for, and have the time to look. Real principals don't have those three things lined up reliably. Result: the dashboard collects dust within 90 days.",
        },
        {
          type: "paragraph",
          text: "The same problem inverts at GLANCE-only solutions (simple alerts and SMS notifications): they're too shallow to actually investigate. You get notified that something is wrong, and now you need a dashboard to figure out what to do. If you don't have one ready, the alert goes unactioned.",
        },
        {
          type: "paragraph",
          text: "A real intelligence layer covers all three depths and lets the leader move fluidly between them — GLANCE to notice, BRIEFING to orient, DEEP to investigate, back to GLANCE to confirm resolution.",
        },
      ],
    },
  ],

  trustSignals: {
    heading: "How XeedlyAI Deploys the Three-Tier Model",
    body: "Every Xeedly intelligence deployment ships all three depths from day one. Sovvrn delivers morning briefings to restaurant operators at 6 AM with categorized insights and a command-center signal feed for investigation. Propertyolio correlates events across PropertyDocz and PropertyJobz into cross-system signals with the same three-depth pattern adapted for HOA management. Same architecture, different verticals — proven across five live deployments. Standup is 2–4 weeks for the core platform plus 1–2 weeks per integrated system.",
    caseStudies: [
      { slug: "sovvrn", label: "Sovvrn — Three-Depth Restaurant Intelligence" },
      { slug: "xeedly-platform", label: "XeedlyAI Platform — Architecture Reference" },
    ],
  },

  faq: [
    {
      q: "What is the three-tier intelligence model?",
      a: "Three depths of intelligence delivery matched to three time budgets. GLANCE (0–5 seconds) is the always-visible KPI ticker for ambient awareness. BRIEFING (5–60 seconds) is the proactive AI-generated morning summary delivered to your existing channels. DEEP (1–5 minutes) is the signal feed and AI concierge for investigation when something needs digging.",
    },
    {
      q: "Why do dashboards alone fail to drive decisions?",
      a: "Dashboards live at DEEP. They require you to remember to look, know what to look for, and have the time. Most principals don't have those three things lined up reliably. Without GLANCE and BRIEFING layers above the dashboard, even a well-designed dashboard collects dust within 90 days of deployment.",
    },
    {
      q: "What does a good morning briefing include?",
      a: "Categorized sections (financial health, operations, vendor and compliance, today's priorities), prioritized so exceptions surface first, with each signal linking to the DEEP view for investigation. Tone should read like a smart chief of staff bringing you up to speed — not a corporate report. Delivered to the channel you already use: email, SMS, Slack, or Teams.",
    },
    {
      q: "Where should KPI tickers appear?",
      a: "Everywhere your team already looks. Top or bottom strip of every screen they use — operations dashboards, admin panels, internal communication tools, mobile apps. The goal is ambient awareness without requiring a separate visit to a dashboard. Updates happen in real time.",
    },
    {
      q: "How do you know when to move between depths?",
      a: "GLANCE for ambient noticing — something looks off. BRIEFING for orientation — categorized context on what's happening today. DEEP for investigation — when a signal warrants 1–5 minutes of digging or an AI-concierge query. A good system makes the transitions seamless: any GLANCE metric links to its BRIEFING context; any BRIEFING signal links to its DEEP drilldown.",
    },
  ],

  cta: {
    heading: "See the three-tier model in your operation",
    body: "Tell us about your business. We'll map what the GLANCE, BRIEFING, and DEEP layers would look like for your team — and what data sources would feed each one.",
    primaryAction: {
      label: "Book a Discovery Call",
      href: "/contact",
    },
  },

  internalLinks: {
    pillar: "/platform",
    laterals: [
      "what-is-operational-intelligence",
      "building-intelligence-platforms-vs-buying-bi-tools",
      "multi-unit-bottleneck-constraint-at-five-units",
    ],
  },
};
