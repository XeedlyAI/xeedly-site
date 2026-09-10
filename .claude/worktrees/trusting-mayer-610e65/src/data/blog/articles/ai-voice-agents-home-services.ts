import type { Article } from "@/types/blog";

export const article: Article = {
  slug: "ai-voice-agents-home-services",
  silo: "multi-unit-ops",
  articleClass: "magnetizer",
  title: "AI Voice Agents for Home Services: Capturing the Calls You're Losing",
  metaTitle: "AI Voice Agents for Home Services — Capture Missed Calls",
  metaDescription:
    "Home services businesses lose 20–40% of leads to unanswered phones. AI voice agents capture after-hours calls, book appointments, and route urgent issues — for less than a part-time receptionist.",
  excerpt:
    "Home services businesses lose 20–40% of leads to unanswered phones. AI voice agents capture them — for less than a part-time receptionist.",
  targetKeyword: "ai voice agent home services",
  secondaryKeywords: [
    "ai phone answering service contractors",
    "missed call text back home services",
    "voice ai contractor",
    "answering service plumber roofer",
  ],
  publishDate: "2026-08-16",
  lastReviewedDate: "2026-08-16",
  author: "Shad",
  readingTimeMinutes: 6,
  heroImage: "/images/blog/ai-voice-agents-home-services-hero.png",
  thumbnailImage: "/images/blog/ai-voice-agents-home-services-thumb.svg",

  directAnswer:
    "Home services businesses lose 20–40% of inbound leads to unanswered phones — after-hours, during jobs, when crews are on the road. AI voice agents pick up every call in seconds, qualify the lead, book an appointment if appropriate, send urgent issues to the on-call crew, and text-follow-up if the caller hangs up. They cost less than a part-time receptionist and never call out sick.",

  sections: [
    {
      heading: "The Math on Missed Calls",
      blocks: [
        {
          type: "paragraph",
          text: "A typical home services operator gets 80–200 inbound calls per week depending on size. Industry studies consistently show that 20–40% of those calls go unanswered — into voicemail, dropped, or hung up before pickup.",
        },
        {
          type: "paragraph",
          text: "The cost of a missed call isn't just the lost job. It's the relationship that never started. A homeowner with a leaky faucet calls three plumbers. The first one to pick up gets the job. The other two never hear from that homeowner again.",
        },
        {
          type: "callout",
          severity: "warn",
          title: "The actual revenue impact",
          body: "A home services business with $1.5M annual revenue and a 30% missed-call rate is losing roughly $200K–$400K in annual revenue opportunity. Most operators don't realize this number because the missed calls don't show up as a line item.",
        },
      ],
    },
    {
      heading: "What an AI Voice Agent Actually Does",
      blocks: [
        {
          type: "paragraph",
          text: "A modern AI voice agent — built on platforms like Vapi, ElevenLabs, and Twilio — handles inbound calls in 4 stages:",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "**Pickup within 2 rings.** The caller hears a natural-sounding voice answer in your business name. No 'press 1 for sales' phone tree.",
            "**Qualification.** The agent asks 3–5 questions: service type, location, urgency, contact info. Conversational, not interrogation.",
            "**Routing.** Standard estimate request → book a slot in your calendar. Emergency → ping the on-call crew immediately by SMS. Existing customer with a complaint → escalate to owner immediately.",
            "**Follow-up.** Caller's contact info captured. If anything is unclear, text-followup sent automatically. Job request appears in your dashboard with full transcript.",
          ],
        },
        {
          type: "paragraph",
          text: "Modern voice agents sound natural enough that most callers either don't realize they're talking to an AI, or don't care — the experience is faster and more reliable than voicemail.",
        },
      ],
    },
    {
      heading: "Where AI Voice Agents Beat Human Receptionists",
      blocks: [
        {
          type: "table",
          headers: ["Capability", "Part-time Receptionist", "AI Voice Agent"],
          rows: [
            ["Hours available", "Business hours only", "24/7"],
            ["Pickup speed", "1–5 rings if free", "Within 2 rings, always"],
            ["Calls in parallel", "1 at a time", "Unlimited concurrent"],
            ["Transcript of every call", "Not unless they take notes", "Yes, automatic, searchable"],
            ["Cost", "$2K–$4K/mo", "$200–$500/mo"],
            ["Sick days / turnover", "Real concern", "None"],
            ["Sentiment analysis", "Subjective", "Automated tone/urgency detection"],
          ],
        },
        {
          type: "paragraph",
          text: "The right comparison isn't human-vs-AI in absolute quality. It's human-during-business-hours vs AI-24/7-with-better-data. The AI wins on coverage, cost, and intelligence — even if a great human receptionist beats it on warmth in a 9-to-5 window.",
        },
      ],
    },
    {
      heading: "Where AI Voice Agents Still Need a Human",
      blocks: [
        {
          type: "paragraph",
          text: "Honest about limitations:",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "**Complex pricing negotiations** — the AI takes the request and books a callback; an actual person closes",
            "**Upset customer escalations** — AI detects the sentiment and routes to a human within minutes",
            "**Edge cases that don't fit standard workflows** — AI books a callback rather than guessing",
            "**Local relationship-building** — repeat customers who want to hear a familiar voice still get human routing during business hours if you want",
          ],
        },
        {
          type: "paragraph",
          text: "The right deployment isn't AI-only. It's AI-as-the-default-pickup, with intelligent routing to humans when the situation warrants. The AI handles the volume; humans handle the moments that need them.",
        },
      ],
    },
    {
      heading: "What It Costs and What It Pays Back",
      blocks: [
        {
          type: "paragraph",
          text: "A production AI voice agent deployment runs $200–$500/mo (depending on call volume) plus a one-time setup of $1,500–$3,500 to configure the agent for your specific business workflows, integrations, and brand voice.",
        },
        {
          type: "paragraph",
          text: "Compared to the $200K–$400K annual revenue opportunity that's currently slipping through missed calls, the math is straightforward. Most home services operators see the system pay for itself in the first month from recovered leads alone.",
        },
      ],
    },
  ],

  trustSignals: {
    heading: "How XeedlyAI Deploys Voice AI for Home Services",
    body: "XeedlyAI deploys AI voice agents as part of the Get Chosen tier of Growth Systems ($499/mo) and as standalone deployments. Built on Vapi + ElevenLabs + Twilio with custom routing logic per business. Integrates with your existing CRM (Jobber, Housecall Pro, ServiceTitan), calendar, and SMS systems. Sovvrn (our restaurant intelligence platform) uses the same architecture — every restaurant call transcribed, analyzed, and converted to actionable signal. Same tech, adapted for home services workflows.",
    caseStudies: [
      { slug: "sovvrn", label: "Sovvrn — Voice AI in Production" },
    ],
  },

  faq: [
    {
      q: "How does an AI voice agent work for a home services business?",
      a: "The AI agent answers inbound calls within 2 rings in your business name, asks 3–5 qualifying questions (service type, location, urgency, contact info), books appointments in your calendar for standard requests, routes emergencies to your on-call crew via SMS, and sends text follow-ups if anything is unclear. Every call generates a transcript and an entry in your dashboard.",
    },
    {
      q: "What percentage of home services calls go unanswered?",
      a: "Industry data consistently shows 20–40% of inbound calls go unanswered for home services businesses — voicemails, drops, or hangups before pickup. For a $1.5M revenue contractor, this represents $200K–$400K of lost annual revenue opportunity that most operators don't see because the missed calls don't appear as a line item.",
    },
    {
      q: "Can callers tell they're talking to an AI?",
      a: "Modern voice agents (Vapi + ElevenLabs era) sound natural enough that most callers either don't realize they're talking to an AI or don't care. The experience is faster and more reliable than voicemail, which is what they're comparing it to. Some callers ask 'is this a real person?' — the AI answers honestly that it's an AI assistant helping schedule and then continues the conversation.",
    },
    {
      q: "What does an AI voice agent cost?",
      a: "Production deployments typically run $200–$500/mo depending on call volume, plus a one-time setup of $1,500–$3,500 to configure for your specific business workflows. Compare to $2K–$4K/mo for a part-time receptionist who works business hours only. Most home services operators see payback in the first 30 days from recovered missed-call leads alone.",
    },
    {
      q: "What happens when the AI can't handle a call?",
      a: "The agent detects situations that need a human (complex pricing, upset customer, edge cases that don't fit workflow) and routes them intelligently — either an immediate transfer to your on-call person, or a scheduled callback within an SLA you define. The agent never guesses on situations that should escalate; it books a callback rather than risk wrong information.",
    },
  ],

  cta: {
    heading: "Stop losing leads to voicemail",
    body: "Tell us your business name, the trades you cover, and the current setup. We'll show you what an AI voice agent deployment would look like for your operation — and how fast it pays back.",
    primaryAction: {
      label: "Book a Discovery Call",
      href: "/contact",
    },
  },

  internalLinks: {
    pillar: "/products",
    laterals: [
      "multi-crew-quote-to-cash",
      "reviews-routing-response-time",
      "field-service-intelligence",
    ],
  },
};
