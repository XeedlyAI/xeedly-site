import type { Article } from "@/types/blog";

export const article: Article = {
  slug: "multi-crew-quote-to-cash",
  silo: "multi-unit-ops",
  articleClass: "magnetizer",
  title: "Multi-Crew Quote-to-Cash: Where Home Services Leak Money",
  metaTitle: "Multi-Crew Quote-to-Cash — Where Home Services Leak",
  metaDescription:
    "Home services revenue leaks at five points between quote and paid invoice. Most owners only see the last one. Here's the full leak map and how to fix it.",
  excerpt:
    "Home services revenue leaks at five points between quote and paid invoice. Most owners only see the last one. Here's the full map and the fix.",
  targetKeyword: "home services quote to cash",
  secondaryKeywords: [
    "contractor quote management",
    "home services invoice automation",
    "field service billing",
    "contractor cash flow",
  ],
  publishDate: "2026-08-02",
  lastReviewedDate: "2026-08-02",
  author: "Shad",
  readingTimeMinutes: 7,
  heroImage: "/images/blog/multi-crew-quote-to-cash-hero.png",
  thumbnailImage: "/images/blog/multi-crew-quote-to-cash-thumb.svg",

  directAnswer:
    "Home services revenue leaks at five points between the first customer call and the final paid invoice: late quotes, lost quotes, slow scheduling, delayed invoicing, and aged AR. Owners typically only see the last one — when they can't make payroll. The fix is treating the full quote-to-cash workflow as a single connected pipeline, with automated handoffs between stages and signal alerts when work stalls at any point.",

  sections: [
    {
      heading: "The Five Leak Points",
      blocks: [
        {
          type: "paragraph",
          text: "Most home services operators think of cash flow as an invoicing problem. It's actually a pipeline problem. Money leaks at five distinct stages between a customer's first call and the funds hitting your bank account. The further upstream the leak, the harder it is to see — and the more expensive it is over time.",
        },
        {
          type: "image",
          src: "/images/blog/multi-crew-quote-to-cash-body-funnel.svg",
          alt: "Quote-to-cash funnel with leak points at each stage — late quote, lost quote, slow schedule, delayed invoice, aged AR",
          caption: "Figure 1 — Five leak points in the home services quote-to-cash funnel",
          aspect: "16:9",
        },
        {
          type: "heading3",
          text: "Leak 1: Late quote",
        },
        {
          type: "paragraph",
          text: "Customer calls Monday for an estimate. You don't send the quote until Friday. By then they've called two competitors and one of them sent same-day. You lose the job not because of price — because of speed. Industry data suggests same-day quotes close at 2–3× the rate of week-late quotes.",
        },
        {
          type: "heading3",
          text: "Leak 2: Lost quote",
        },
        {
          type: "paragraph",
          text: "You sent the quote. Two weeks pass. You forgot to follow up. The customer assumes you weren't interested or got busy. They hire someone else. The quote sits in your sent folder, never won, never lost on the books — just gone.",
        },
        {
          type: "heading3",
          text: "Leak 3: Slow schedule",
        },
        {
          type: "paragraph",
          text: "Customer signs the quote. You can't get to the work for 4 weeks. The customer's enthusiasm cools. By week 3 they're frustrated. By week 4 they've called you to cancel and gone with someone faster. Or worse — they let you do the job but you've already lost the goodwill that drives repeat business.",
        },
        {
          type: "heading3",
          text: "Leak 4: Delayed invoice",
        },
        {
          type: "paragraph",
          text: "Job completed Friday. Invoice doesn't go out until the following Wednesday — and only because someone reminded you. The customer's payment clock didn't start until Wednesday. You just gave them five days of free float on your money.",
        },
        {
          type: "heading3",
          text: "Leak 5: Aged AR",
        },
        {
          type: "paragraph",
          text: "Invoice sent. No follow-up. Customer files it under 'eventually.' By the time you notice it's 60 days past due, it's hard to collect without damaging the relationship. Some of these become bad debt write-offs.",
        },
      ],
    },
    {
      heading: "Why the Leaks Are Structural",
      blocks: [
        {
          type: "paragraph",
          text: "All five leaks share a common cause: the workflow lives in multiple disconnected systems. Quotes in email or a PDF tool. Schedule in a shared calendar. Job updates in group texts. Invoicing in QuickBooks. Collections in someone's head.",
        },
        {
          type: "paragraph",
          text: "Without a connected pipeline, nothing fires a signal when work stalls at a stage. Late quotes don't get flagged. Lost quotes don't get followed up. Delayed invoices don't get caught. Aged AR doesn't get worked. The owner has to remember to check every stage — and that's how the leaks compound.",
        },
      ],
    },
    {
      heading: "The Fix: Treat It as One Pipeline",
      blocks: [
        {
          type: "paragraph",
          text: "Plugging the leaks means treating the full quote-to-cash flow as a single connected pipeline with automated handoffs and signal alerts at each stage:",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "**Quote auto-generation.** Site visit notes feed into a quote template. Customer gets the quote same-day, every time. Stage 1 closed.",
            "**Quote follow-up automation.** Quote sent at hour 0. SMS check-in at hour 48. Owner notification at hour 72 if no response. Lost quotes get worked, not forgotten.",
            "**Scheduling commit times.** When a quote is signed, the system books the work and confirms the time with the customer. No 4-week wait without an explanation.",
            "**Invoice on completion.** Job marked complete in the field → invoice auto-generates and sends. No 5-day float to the customer.",
            "**Aged AR escalation.** Day 30: friendly reminder. Day 45: stronger follow-up. Day 60: collection action. Owner gets pulled in only at exceptions.",
          ],
        },
        {
          type: "callout",
          severity: "good",
          title: "What good plumbing actually does",
          body: "Most home services operators who plug all five leaks see cash flow improve within 30–60 days and total annual revenue grow 8–15% from the same operational footprint — purely from stopping the bleed.",
        },
      ],
    },
    {
      heading: "Where to Start",
      blocks: [
        {
          type: "paragraph",
          text: "If you're going to fix one leak first, fix Leak 1: late quotes. Speed-to-quote has the largest single revenue impact of any change you can make. Going from week-late to same-day quotes typically lifts close rates by 50%+ in the first 90 days.",
        },
        {
          type: "paragraph",
          text: "After that, work upstream-to-downstream: quote follow-up automation (Leak 2), then scheduling (Leak 3), then invoicing (Leak 4), then AR (Leak 5). Each one compounds with the previous.",
        },
      ],
    },
  ],

  trustSignals: {
    heading: "How XeedlyAI Builds Quote-to-Cash for Home Services",
    body: "XeedlyAI builds operational systems that connect quote, schedule, invoice, and collection into one pipeline with signal alerts at every stage. Builds typically run $4K–$10K one-time plus $199/mo maintenance and integrate with the tools you already use (Jobber, Housecall Pro, QuickBooks, Stripe). Most home services operators see measurable cash flow improvement in the first 30 days from quote speed alone.",
    caseStudies: [
      { slug: "propertyjobz", label: "PropertyJobz — Job Management Architecture" },
    ],
  },

  faq: [
    {
      q: "What is the quote-to-cash process in home services?",
      a: "Quote-to-cash is the full workflow from a customer's initial inquiry to the moment funds hit your bank account. Five stages: quote generation, quote follow-up, scheduling, job completion + invoicing, and AR collection. Revenue leaks at every stage when the workflow lives in disconnected tools.",
    },
    {
      q: "What's the biggest cash flow leak in a home services business?",
      a: "Quote speed. Same-day quotes close at 2–3× the rate of week-late quotes — meaning every late quote is a lost job. Quote speed is also the easiest leak to fix structurally with quote auto-generation from site visit notes.",
    },
    {
      q: "Why don't CRMs solve quote-to-cash leaks?",
      a: "Most CRMs cover one or two stages of the funnel — usually quotes and scheduling. The handoffs between stages (quote → schedule, completion → invoice, invoice → collection) typically require manual triggers. Without signal alerts at each stage transition, work stalls and leaks open.",
    },
    {
      q: "How quickly can quote-to-cash improvements affect cash flow?",
      a: "Quote-speed improvements typically lift close rates within 30 days. Invoice automation tightens AR within the first billing cycle (30–45 days). Aged AR escalation takes 60–90 days to fully work through legacy receivables. Total revenue lift from plugging all five leaks: typically 8–15% within a quarter.",
    },
    {
      q: "Do I need to switch to all-new software to fix quote-to-cash?",
      a: "No. The fix is connecting the tools you already use into one pipeline with automated handoffs and signal alerts. Most home services operators keep their existing CRM, accounting, and payment platforms — and add an orchestration layer above them that catches the gaps. This is what Xeedly's operational systems builds typically deliver.",
    },
  ],

  cta: {
    heading: "Plug the leaks. Recover the revenue.",
    body: "Tell us how many crews you're running and which stages of quote-to-cash are leaking. We'll map a specific operational systems build for your operation — usually $4K–$10K to deploy.",
    primaryAction: {
      label: "Book a Discovery Call",
      href: "/contact",
    },
  },

  internalLinks: {
    pillar: "/products",
    laterals: [
      "multi-truck-operations-trap",
      "field-service-intelligence",
      "ai-voice-agents-home-services",
    ],
  },
};
