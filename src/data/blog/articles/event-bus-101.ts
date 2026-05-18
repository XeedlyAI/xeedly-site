import type { Article } from "@/types/blog";

export const article: Article = {
  slug: "event-bus-101",
  silo: "principal-intelligence",
  articleClass: "completer",
  title: "Event Bus 101: Why Every Operational Business Needs One",
  metaTitle: "Event Bus 101 — Why Operational Businesses Need One",
  metaDescription:
    "An event bus turns scattered operational data into a real-time stream. It's the foundational architecture that separates intelligence platforms from dashboards.",
  excerpt:
    "An event bus turns scattered operational data into a real-time stream. It's the foundation that separates intelligence platforms from dashboards.",
  targetKeyword: "event bus business",
  secondaryKeywords: [
    "what is an event bus",
    "event-driven architecture business",
    "real-time business data",
    "operational data pipeline",
  ],
  publishDate: "2026-09-13",
  lastReviewedDate: "2026-09-13",
  author: "Shad",
  readingTimeMinutes: 6,
  heroImage: "/images/blog/event-bus-101-hero.png",
  thumbnailImage: "/images/blog/event-bus-101-thumb.svg",

  directAnswer:
    "An event bus is a real-time data pipeline that captures every operational event from every system in a unified stream. Document requested. Vendor expired. Revenue posted. Call answered. Each becomes a canonical event with consistent schema, flowing into one place. Every intelligence capability above it — signals, briefings, dashboards, alerts — runs on top of that single stream rather than querying half a dozen systems separately.",

  sections: [
    {
      heading: "The Pre-Event-Bus World",
      blocks: [
        {
          type: "paragraph",
          text: "Most operational businesses run on disconnected systems. The CRM has customer data. The accounting tool has invoices. The vendor portal has compliance. The phone system has call logs. The scheduling app has appointments. Each one stores its own data. Each one has its own dashboard. Each one tells one slice of the story.",
        },
        {
          type: "paragraph",
          text: "Without an event bus, the only way to see across systems is to either (a) build custom integrations between every pair of tools — quickly impossible as the count grows — or (b) run nightly ETL jobs into a data warehouse and query the warehouse the next morning. Both options are slow, brittle, and miss real-time patterns.",
        },
      ],
    },
    {
      heading: "What an Event Bus Does",
      blocks: [
        {
          type: "image",
          src: "/images/blog/event-bus-101-body-diagram.svg",
          alt: "Event bus architecture — multiple source systems publishing events into a unified stream, with multiple consumers (signal engine, briefings, dashboards) subscribing to the stream",
          caption: "Figure 1 — Event bus as the unified substrate",
          aspect: "16:9",
        },
        {
          type: "paragraph",
          text: "An event bus inverts the model. Every system publishes an event the moment something happens — a vendor uploads a certificate, a customer pays an invoice, a job is completed, a call ends. The event hits the bus immediately in canonical schema.",
        },
        {
          type: "paragraph",
          text: "Once events are on the bus, any consumer can subscribe: a signal engine watching for anomalies, a briefing generator summarizing the day, a dashboard showing live KPIs, a notification service routing alerts. Each consumer reads the same stream and applies its own logic. No system queries the source systems directly anymore.",
        },
      ],
    },
    {
      heading: "Why This Architecture Wins",
      blocks: [
        {
          type: "list",
          ordered: false,
          items: [
            "**Real-time, not nightly.** Events flow as they happen. No 24-hour delay between something occurring and intelligence noticing.",
            "**Cross-system visibility for free.** Once events from all systems hit the bus, correlating across them becomes a query against one stream — not custom integration between every pair.",
            "**Decoupled consumers.** Add a new consumer (briefing, dashboard, AI agent, custom workflow) without touching any source system. They just subscribe to the bus.",
            "**Auditable history.** Every event is recorded with timestamp and metadata. You can replay any window of operational time to debug, audit, or train new correlations.",
            "**Source systems stay independent.** No system has to know about any other system. They publish to the bus and continue their work. The bus is the seam.",
          ],
        },
      ],
    },
    {
      heading: "What You're Capturing",
      blocks: [
        {
          type: "paragraph",
          text: "A well-designed event bus for an operational business typically captures 50–200 distinct event types across 5–15 source systems. Categories that almost always need to be on the bus:",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "**Customer events** — created, updated, status changed, churned",
            "**Financial events** — invoice created, payment received, AR aged",
            "**Operational events** — job scheduled, in progress, completed, escalated",
            "**Compliance events** — document uploaded, certificate expired, status changed",
            "**Communication events** — call received, message sent, response received",
            "**Vendor/partner events** — vendor onboarded, compliance changed, bid submitted",
            "**System events** — integration health, API errors, background job status",
          ],
        },
      ],
    },
    {
      heading: "What Building One Actually Looks Like",
      blocks: [
        {
          type: "paragraph",
          text: "An event bus for most operational businesses is 2–4 weeks of engineering work for the core infrastructure plus 1–2 weeks per source system integration. Modern stacks make this lighter than it used to be — managed message queues (Postgres LISTEN/NOTIFY, AWS SQS, Pub/Sub, or hosted alternatives like Inngest/Trigger.dev) handle the heavy infrastructure lifting.",
        },
        {
          type: "paragraph",
          text: "The hard part isn't the message queue. The hard part is defining a canonical event schema for your business and integrating each source system to publish events in that schema. That's where the architectural thinking lives — and where the difference between a clean event bus and a messy one shows up six months later.",
        },
      ],
    },
  ],

  trustSignals: {
    heading: "How XeedlyAI Builds Event Buses",
    body: "Every Xeedly intelligence platform deployment starts with the event bus. Sovvrn ingests POS, labor, voice, review, and scheduling events from restaurant systems. Propertyolio ingests events from PropertyDocz, PropertyJobz, and the management company's existing tools. Pando ingests deal pipeline events from agents and investor activity. Same architecture, different vertical event schemas. Standup is 2–4 weeks for the core bus plus 1–2 weeks per integration.",
    caseStudies: [
      { slug: "xeedly-platform", label: "Xeedly Platform — Event Bus Reference" },
      { slug: "sovvrn", label: "Sovvrn — Multi-Source Event Pipeline" },
    ],
  },

  faq: [
    {
      q: "What is an event bus in a business context?",
      a: "An event bus is a real-time data pipeline that captures every operational event from every source system in a unified stream — vendor compliance changes, customer payments, job completions, phone calls — each becoming a canonical event with consistent schema. Every intelligence capability above it runs on the same stream.",
    },
    {
      q: "Why do operational businesses need an event bus?",
      a: "Without one, the only ways to see across systems are nightly ETL jobs (slow) or pairwise integrations between every tool (unscalable). An event bus inverts the model — every system publishes events as they happen, and any consumer (signal engine, briefings, dashboards) subscribes to the unified stream. Real-time, decoupled, and architecturally sustainable.",
    },
    {
      q: "How is an event bus different from a data warehouse?",
      a: "Data warehouses store historical data for batch querying — usually populated by nightly ETL jobs. An event bus carries data in real time as events happen, with consumers subscribing to the live stream. Many businesses use both: the event bus for real-time intelligence, the warehouse for retrospective analysis.",
    },
    {
      q: "What's the typical scope of an event bus for an operational business?",
      a: "Most operational businesses end up capturing 50–200 distinct event types across 5–15 source systems. Core categories: customer events, financial events, operational events (jobs/work orders), compliance events, communication events (calls/messages), vendor events, and system health events.",
    },
    {
      q: "How long does it take to build an event bus?",
      a: "Core infrastructure (message queue, canonical schema, event router): 2–4 weeks. Each source system integration: 1–2 weeks. Modern managed services (Inngest, Trigger.dev, AWS SQS, Postgres LISTEN/NOTIFY) handle the heavy infrastructure lifting — most of the work is defining the canonical schema and integrating each source system to publish events in that schema.",
    },
  ],

  cta: {
    heading: "Build the substrate, not just the dashboard",
    body: "Tell us which systems you run today. We'll map what an event bus deployment would look like for your business — including which events to capture first and how cross-system signals would surface in the first month.",
    primaryAction: {
      label: "Book a Discovery Call",
      href: "/contact",
    },
  },

  internalLinks: {
    pillar: "/platform",
    laterals: [
      "what-is-operational-intelligence",
      "cross-system-correlation",
      "three-tier-intelligence-model-glance-briefing-deep",
    ],
  },
};
