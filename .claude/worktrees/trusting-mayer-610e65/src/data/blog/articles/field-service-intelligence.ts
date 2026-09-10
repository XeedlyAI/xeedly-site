import type { Article } from "@/types/blog";

export const article: Article = {
  slug: "field-service-intelligence",
  silo: "multi-unit-ops",
  articleClass: "magnetizer",
  title: "Field Service Intelligence: Beyond the Spreadsheet",
  metaTitle: "Field Service Intelligence — Beyond the Spreadsheet",
  metaDescription:
    "Home services operators outgrow spreadsheets between 3 and 6 crews. Field service intelligence is the architecture for what comes next — and why CRMs don't solve it.",
  excerpt:
    "Most home services businesses outgrow spreadsheets between 3 and 6 crews. Field service intelligence is the architecture for what comes next.",
  targetKeyword: "field service intelligence",
  secondaryKeywords: [
    "field service software",
    "contractor operations software",
    "home services intelligence",
    "field service management",
  ],
  publishDate: "2026-07-26",
  lastReviewedDate: "2026-07-26",
  author: "Shad",
  readingTimeMinutes: 7,
  heroImage: "/images/blog/field-service-intelligence-hero.png",
  thumbnailImage: "/images/blog/field-service-intelligence-thumb.svg",

  directAnswer:
    "Field service intelligence is the architecture that turns a multi-crew home services business into a system the owner can actually run from the office. It's not a dashboard or a CRM — it's an event-driven pipeline that captures every job activity, detects anomalies, and pushes the right signal to the right person before the problem becomes a customer complaint. Spreadsheets and CRMs operate after the fact. Intelligence operates ahead of it.",

  sections: [
    {
      heading: "Why Spreadsheets and CRMs Fall Short",
      blocks: [
        {
          type: "paragraph",
          text: "Most home services operators start with a spreadsheet for jobs, a separate spreadsheet for invoicing, a shared calendar for scheduling, and group texts for crew updates. The setup works at 1–2 crews and falls apart somewhere between 3 and 6.",
        },
        {
          type: "paragraph",
          text: "The natural next move is a field service CRM — Jobber, Housecall Pro, ServiceTitan, FieldEdge. These tools centralize the data and add structure. Some operators get years of leverage out of them. But CRMs share a structural limit: they're passive. They store information for you to come find. They don't surface problems before they happen.",
        },
        {
          type: "callout",
          severity: "warn",
          title: "The CRM trap",
          body: "A CRM is a database with workflows on top. It tells you what is. It doesn't tell you what's about to be a problem unless you remember to ask the right question. For a multi-crew operator, the questions you should be asking are too numerous to remember.",
        },
      ],
    },
    {
      heading: "What Field Service Intelligence Looks Like",
      blocks: [
        {
          type: "paragraph",
          text: "Intelligence has three structural properties a CRM doesn't:",
        },
        {
          type: "image",
          src: "/images/blog/field-service-intelligence-body-architecture.svg",
          alt: "Field service intelligence architecture — event bus, signal engine, multi-channel delivery",
          caption: "Figure 1 — The intelligence layer above CRM and field tools",
          aspect: "16:9",
        },
        {
          type: "heading3",
          text: "1. Event-driven, not poll-driven",
        },
        {
          type: "paragraph",
          text: "Every action — quote sent, job scheduled, crew dispatched, job completed, invoice generated, payment received — fires an event into a canonical stream. The system sees everything as it happens, not on the next time you log in.",
        },
        {
          type: "heading3",
          text: "2. Signal detection, not raw reporting",
        },
        {
          type: "paragraph",
          text: "Rules and AI correlation watch the event stream for patterns: quotes aging past 24 hours, jobs running long, invoices unpaid past 30 days, vendor compliance approaching expiration, recurring customers with quality complaints. The system surfaces signals; you don't have to look for them.",
        },
        {
          type: "heading3",
          text: "3. Multi-channel delivery",
        },
        {
          type: "paragraph",
          text: "Signals reach the right person through the channel they already use. Owner gets the morning briefing on email at 6am. Crew lead gets the SMS when a customer reschedules. Office manager gets the Slack ping when an invoice ages past 45 days. Intelligence meets people where they work — not behind another dashboard login.",
        },
      ],
    },
    {
      heading: "What This Actually Changes Day-to-Day",
      blocks: [
        {
          type: "list",
          ordered: false,
          items: [
            "**Quote follow-up stops being a memory game.** Every aged quote gets surfaced automatically — and gets either auto-followed-up or handed to the right person to call.",
            "**Compliance lapses don't become surprises.** Insurance, license, W-9 — all tracked with 30/60/90-day expiry alerts. Lose an HOA contract because of an expired certificate? Never again.",
            "**Crew quality drift gets noticed early.** Customer complaints clustered around one crew lead surface as a pattern, not three isolated incidents that nobody connected.",
            "**Cash flow becomes predictable.** Outstanding AR with aging buckets is always visible. Collection actions happen automatically. Payroll doesn't depend on chasing checks.",
            "**The owner's morning takes 5 minutes**, not 90. The briefing tells you what to pay attention to. The rest runs itself.",
          ],
        },
      ],
    },
    {
      heading: "The Honest Cost",
      blocks: [
        {
          type: "paragraph",
          text: "A custom intelligence layer for a home services operator typically runs $5K–$15K to build (one-time) plus $495–$995/mo for managed intelligence. That's more than a CRM subscription. It's also more than a CRM delivers. Most operators see the payback in 3–6 months from a combination of: faster quotes (more wins), cleaner AR (better cash flow), fewer compliance losses (kept HOA contracts), and the owner's reclaimed time.",
        },
        {
          type: "paragraph",
          text: "Smaller operators (1–3 crews) can usually stay on a good CRM for now. The intelligence layer becomes the right investment when the CRM stops keeping up — usually somewhere between 4 and 8 crews.",
        },
      ],
    },
  ],

  trustSignals: {
    heading: "How XeedlyAI Builds Field Service Intelligence",
    body: "XeedlyAI builds intelligence platforms for multi-crew home services operators using the same architecture deployed for multi-unit restaurants (Sovvrn) and HOA management (Propertyolio). Event bus + signal engine + multi-channel delivery. Integration with existing CRMs (Jobber, Housecall Pro, ServiceTitan), accounting tools (QuickBooks), and payment platforms (Stripe). Standup is 2–4 weeks for the core platform plus 1–2 weeks per integration. Managed intelligence keeps signals current as the business evolves.",
    caseStudies: [
      { slug: "sovvrn", label: "Sovvrn — Multi-Unit Intelligence Architecture" },
      { slug: "xeedly-platform", label: "Xeedly Platform — Architecture Reference" },
    ],
  },

  faq: [
    {
      q: "What is field service intelligence?",
      a: "Field service intelligence is an event-driven architecture that captures operational activity across a home services business and surfaces signals — aged quotes, unpaid invoices, compliance lapses, crew quality patterns — to the right people through the channels they already use. It sits above the CRM and accounting tools, watching the event stream for patterns that need attention.",
    },
    {
      q: "How is field service intelligence different from a CRM?",
      a: "A CRM is a passive database — you log in to find information. Intelligence is active — it watches every event and surfaces what needs attention before you ask. CRMs tell you what is. Intelligence tells you what's about to become a problem. They're complementary: most intelligence deployments sit on top of an existing CRM rather than replacing it.",
    },
    {
      q: "Do I need to replace my existing CRM (Jobber, Housecall Pro, ServiceTitan, etc.)?",
      a: "No. Intelligence layers integrate with your existing CRM rather than replacing it. The CRM handles transactional workflows; the intelligence layer correlates events across the CRM, accounting, payments, and other systems. You keep your team's existing workflow and add visibility above it.",
    },
    {
      q: "What does field service intelligence cost?",
      a: "Build cost: $5K–$15K one-time for a multi-crew home services deployment with 3–5 integrated systems. Managed intelligence: $495–$995/mo to keep signal rules current as your business evolves. Most operators see payback in 3–6 months through faster quotes, cleaner AR, and fewer compliance-related contract losses.",
    },
    {
      q: "When does it make sense to invest in field service intelligence?",
      a: "Usually between 4 and 8 crews. Smaller operators get most of what they need from a good CRM. Past 8 crews, the volume of operational events overwhelms CRM-based workflows and the lack of signal detection costs real money — missed compliance, aged quotes, unpredictable cash flow. The intelligence layer becomes the architectural fit when the CRM stops keeping up.",
    },
  ],

  cta: {
    heading: "See what intelligence looks like for your operation",
    body: "Tell us how many crews you're running, which systems are in play, and where the spreadsheet model is breaking. We'll map a field service intelligence deployment to your specific business.",
    primaryAction: {
      label: "Book a Discovery Call",
      href: "/contact",
    },
  },

  internalLinks: {
    pillar: "/products",
    laterals: [
      "multi-truck-operations-trap",
      "multi-crew-quote-to-cash",
      "ai-voice-agents-home-services",
    ],
  },
};
