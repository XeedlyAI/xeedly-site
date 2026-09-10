import type { Article } from "@/types/blog";

export const article: Article = {
  slug: "contractor-operating-stack",
  silo: "multi-unit-ops",
  articleClass: "completer",
  title:
    "The Contractor's Operating Stack: What 12 Jobs a Week Actually Requires",
  metaTitle: "The Contractor's Operating Stack — 12 Jobs/Week",
  metaDescription:
    "What does a modern multi-crew contractor's tech stack actually look like? Five tools, integrated into one workflow, capable of running 12+ jobs a week without the owner in the middle.",
  excerpt:
    "Five tools, integrated into one workflow, capable of running a multi-crew home services business without the owner in the middle of every job.",
  targetKeyword: "contractor tech stack",
  secondaryKeywords: [
    "home services software stack",
    "field service software combination",
    "contractor business systems",
    "best tools for home services",
  ],
  publishDate: "2026-08-30",
  lastReviewedDate: "2026-08-30",
  author: "Shad",
  readingTimeMinutes: 7,
  heroImage: "/images/blog/contractor-operating-stack-hero.png",
  thumbnailImage: "/images/blog/contractor-operating-stack-thumb.svg",

  directAnswer:
    "A modern multi-crew contractor's operating stack is five integrated tools, not one all-in-one platform: a field service CRM for jobs and scheduling, accounting (QuickBooks Online), payments (Stripe), an AI voice agent for inbound calls, and a marketplace presence (PropertyJobz or equivalent) for HOA preferred vendor work. The integration layer above them is what turns a stack into a system.",

  sections: [
    {
      heading: "Why the All-in-One Trap Fails",
      blocks: [
        {
          type: "paragraph",
          text: "Field service SaaS marketing pushes 'all-in-one' as a feature — one login, one platform, one bill. The reality for contractors past 3 crews is that all-in-one platforms either do many things poorly or do a few things well and fall short on the rest.",
        },
        {
          type: "paragraph",
          text: "The stack approach — best tool for each layer, integrated above — wins on three measures: better tool for each job, cheaper total cost, lower switching risk if any one tool gets replaced.",
        },
      ],
    },
    {
      heading: "The Five-Layer Stack",
      blocks: [
        {
          type: "image",
          src: "/images/blog/contractor-operating-stack-body-stack.svg",
          alt: "Five-layer contractor operating stack — CRM, accounting, payments, voice AI, marketplace, with intelligence layer above",
          caption: "Figure 1 — The contractor's five-layer operating stack",
          aspect: "16:9",
        },
        {
          type: "heading3",
          text: "Layer 1: Field Service CRM",
        },
        {
          type: "paragraph",
          text: "Jobber, Housecall Pro, ServiceTitan, FieldEdge — pick based on your trade and team size. For most multi-crew operators under 10 trucks, Jobber or Housecall Pro is the right fit at $200–$500/mo. The CRM owns: customer database, quotes, scheduling, dispatch, job status, job history.",
        },
        {
          type: "heading3",
          text: "Layer 2: Accounting (QuickBooks Online)",
        },
        {
          type: "paragraph",
          text: "QuickBooks Online for almost everyone. $90–$200/mo depending on tier. Owns: chart of accounts, AR/AP, payroll integration, tax filing prep, financial reporting. Don't try to make the CRM your accounting tool — they're different systems for good reasons.",
        },
        {
          type: "heading3",
          text: "Layer 3: Payments (Stripe + ACH)",
        },
        {
          type: "paragraph",
          text: "Stripe for credit cards, Stripe ACH or Plaid for direct bank payments. 2.9% + 30¢ for cards; ~$0.80 flat for ACH. Owns: payment capture, recurring subscriptions for maintenance plans, payout to your operating account. Most CRMs integrate Stripe natively — don't pay separately for two payment processors.",
        },
        {
          type: "heading3",
          text: "Layer 4: AI Voice Agent (Vapi-based)",
        },
        {
          type: "paragraph",
          text: "Production-grade AI voice agent on Vapi + ElevenLabs + Twilio. $200–$500/mo depending on call volume. Owns: 24/7 inbound call pickup, qualification, appointment booking, urgent-call routing, transcripts. Pays for itself in the first month from recovered missed-call leads.",
        },
        {
          type: "heading3",
          text: "Layer 5: Vendor Marketplace (PropertyJobz)",
        },
        {
          type: "paragraph",
          text: "Verified vendor marketplace for HOA management companies. No monthly platform fee on the contractor side; revenue-share model. Owns: vendor compliance tracking, HOA-side visibility, job routing from management companies, document expiry management. This is the channel partnership layer that distinguishes the contractor's stack from a residential-only operator.",
        },
      ],
    },
    {
      heading: "The Integration Layer (What Turns Stack Into System)",
      blocks: [
        {
          type: "paragraph",
          text: "Five tools sitting next to each other isn't a system — it's just expense. The integration layer is what catches the gaps between them. Three integration patterns matter most:",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "**CRM ↔ QuickBooks** — completed jobs in the CRM auto-create invoices in QuickBooks. Customer payments in QuickBooks update job status in the CRM. No double entry, no reconciliation lag.",
            "**Voice Agent ↔ CRM** — calls captured by the AI agent create new leads in the CRM with full transcripts. Existing customer calls update the customer history.",
            "**Marketplace ↔ CRM** — jobs awarded from PropertyJobz auto-create as new jobs in the CRM with property and compliance metadata pre-populated.",
          ],
        },
        {
          type: "paragraph",
          text: "Most of these integrations exist natively between the major tools. The ones that don't, a small custom integration layer ($2K–$5K one-time) handles cleanly.",
        },
      ],
    },
    {
      heading: "What This Stack Costs",
      blocks: [
        {
          type: "table",
          headers: ["Layer", "Tool", "Cost"],
          rows: [
            ["Field Service CRM", "Jobber / Housecall Pro", "$200–$500/mo"],
            ["Accounting", "QuickBooks Online", "$90–$200/mo"],
            ["Payments", "Stripe (% per transaction)", "Per-transaction"],
            ["AI Voice Agent", "Vapi/ElevenLabs/Twilio bundle", "$200–$500/mo"],
            ["Vendor Marketplace", "PropertyJobz", "$0/mo (revenue-share)"],
            ["**Total monthly software**", "—", "**$490–$1,200/mo**"],
            ["Integration layer (one-time)", "Custom build", "$2K–$5K"],
          ],
        },
        {
          type: "callout",
          severity: "info",
          title: "The real cost comparison",
          body: "$490–$1,200/mo for a stack capable of running 12+ jobs a week without the owner in the middle. Compare to $4K–$8K/mo for a full-time office manager doing the same coordination work — and a manager doesn't work 24/7 or pick up after-hours calls.",
        },
      ],
    },
    {
      heading: "When the Stack Becomes a Platform Investment",
      blocks: [
        {
          type: "paragraph",
          text: "Past 6–8 crews, the stack-with-integrations approach starts showing limits. The owner needs cross-tool intelligence — patterns that span CRM, accounting, payments, and marketplace — that no single tool surfaces. That's when a custom intelligence platform deployment ($5K–$25K, $495–$995/mo managed) becomes the right next move.",
        },
        {
          type: "paragraph",
          text: "Under 6 crews, the stack handles it. Past that, the intelligence layer becomes the difference between a contractor with software and a contractor with leverage.",
        },
      ],
    },
  ],

  trustSignals: {
    heading: "How XeedlyAI Builds the Stack for Contractors",
    body: "XeedlyAI deploys the full contractor operating stack — CRM selection, QuickBooks/Stripe integration, AI voice agent, PropertyJobz marketplace onboarding, and the integration layer above them. Stack deployments typically run $4K–$8K one-time for the integration build, plus the per-tool subscriptions. For contractors past 6–8 crews ready for the intelligence platform layer, intelligence deployments run $5K–$25K one-time plus $495–$995/mo managed intelligence.",
    caseStudies: [
      { slug: "propertyjobz", label: "PropertyJobz — Vendor Marketplace Layer" },
      { slug: "sovvrn", label: "Sovvrn — Voice AI Architecture" },
    ],
  },

  faq: [
    {
      q: "What tools should be in a multi-crew home services contractor's tech stack?",
      a: "Five layers: a field service CRM for jobs and scheduling (Jobber, Housecall Pro, ServiceTitan), QuickBooks Online for accounting, Stripe for payments, an AI voice agent for inbound calls, and a vendor marketplace presence (PropertyJobz) for HOA preferred vendor work. The integration layer above them is what turns the stack into a system.",
    },
    {
      q: "Should I use an all-in-one platform instead of multiple integrated tools?",
      a: "Past 3 crews, the stack approach wins on three measures: better tool for each layer (none of the all-in-ones excel at every layer), lower total cost, and lower switching risk. All-in-one platforms typically cost more and lock you in if any one component fails to keep up with your needs.",
    },
    {
      q: "What does the contractor operating stack cost monthly?",
      a: "Typically $490–$1,200/mo in software subscriptions (varies by CRM tier, voice agent call volume, accounting plan) plus a one-time integration build of $2K–$5K to connect the layers cleanly. Compare to $4K–$8K/mo for a full-time office manager doing the same coordination work.",
    },
    {
      q: "Why is PropertyJobz in the stack?",
      a: "PropertyJobz is the marketplace layer that gives contractors access to HOA preferred vendor work — the highest-margin, most predictable channel for home services. Most contractors miss this layer because their CRM doesn't expose them to HOA management companies. PropertyJobz fills the gap: no monthly platform fee on the contractor side, revenue-share model aligned with the contractor winning work.",
    },
    {
      q: "When do I outgrow the stack approach and need a custom intelligence platform?",
      a: "Usually somewhere between 6 and 10 crews. At that point the owner needs cross-tool intelligence — patterns spanning CRM, accounting, payments, marketplace — that no single tool surfaces. Custom intelligence platform deployments ($5K–$25K, $495–$995/mo managed) provide the signal-engine layer above the stack. Under 6 crews, the stack-with-integrations approach handles it.",
    },
  ],

  cta: {
    heading: "Build the stack that fits your operation",
    body: "Tell us how many crews you're running and what tools you're already on. We'll map a stack and integration plan specific to your operation — and tell you honestly when the stack approach is enough vs when you're ready for the intelligence platform layer.",
    primaryAction: {
      label: "Book a Discovery Call",
      href: "/contact",
    },
  },

  internalLinks: {
    pillar: "/products",
    laterals: [
      "field-service-intelligence",
      "ai-voice-agents-home-services",
      "multi-truck-operations-trap",
    ],
  },
};
