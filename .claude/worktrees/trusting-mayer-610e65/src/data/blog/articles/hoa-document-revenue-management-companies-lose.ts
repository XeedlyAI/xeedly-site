import type { Article } from "@/types/blog";

export const article: Article = {
  slug: "hoa-document-revenue-management-companies-lose",
  silo: "multi-unit-ops",
  articleClass: "high-intent-commercial",
  title:
    "HOA Document Revenue: What Most Management Companies Lose to Third Parties",
  metaTitle: "HOA Document Revenue: What Management Companies Lose",
  metaDescription:
    "Resale certificates, status letters, refinance packages — every document request your communities generate is revenue. Right now, most of it is going to someone else.",
  excerpt:
    "Resale certificates, status letters, refinance packages — every document request your communities generate is revenue. Most management companies are giving it away.",
  targetKeyword: "hoa document revenue",
  secondaryKeywords: [
    "hoa resale certificate revenue",
    "condocerts homewisedocs alternative",
    "hoa document fulfillment",
    "property management revenue streams",
  ],
  publishDate: "2026-05-24",
  lastReviewedDate: "2026-05-24",
  author: "Shad",
  readingTimeMinutes: 8,
  heroImage: "/images/blog/hoa-document-revenue-hero.png",
  thumbnailImage: "/images/blog/hoa-document-revenue-thumb.svg",

  directAnswer:
    "Every resale certificate, status letter, and refinance package your communities generate is revenue. For most HOA management companies, that revenue is currently flowing to third-party fulfillment services like CondoCerts and HomeWiseDocs — who set the prices, control the turnaround, and keep the lion's share of the income. PropertyDocz brings the entire pipeline in-house so the management company sets the pricing and keeps the revenue.",

  sections: [
    {
      heading: "The Revenue You're Already Generating",
      blocks: [
        {
          type: "paragraph",
          text: "If you manage 25, 50, or 100+ HOA communities, your organization produces hundreds of document requests per year. Resale certificates for property sales. Status letters for refinances. Closing packages for title companies. Lender questionnaires. Estoppel certificates.",
        },
        {
          type: "paragraph",
          text: "These aren't optional. Every property sale, refinance, and lender transaction requires them. Your team is already doing the underlying work — pulling the financials, verifying assessments, confirming compliance status, generating the PDFs. The data already exists in your system.",
        },
        {
          type: "paragraph",
          text: "But for most management companies, the fulfillment and the billing are not happening in-house. A title officer or closing agent goes to a third-party portal — typically CondoCerts (Inhabit) or HomeWiseDocs (FirstService Residential's spinoff) — pays a market-rate fee, and that fee flows to the third party. Your management company gets a small back-end split, if anything at all.",
        },
        {
          type: "callout",
          severity: "warn",
          title: "The structural problem",
          body: "Your team does the data work. A third party cashes the check. Their pricing — not yours. Their turnaround — not yours. Their relationship with the title officer — not yours.",
        },
      ],
    },
    {
      heading: "What the Math Looks Like",
      blocks: [
        {
          type: "paragraph",
          text: "A mid-sized management company with 40 communities averages roughly 8–12 document transactions per community per year — a mix of resales, refinances, and lender requests. That's 320–480 transactions annually.",
        },
        {
          type: "paragraph",
          text: "Market-rate fees for these packages run $150–$350 each depending on document type and turnaround. The high end (rush resale certificates with full lender package) easily clears $400.",
        },
        {
          type: "paragraph",
          text: "Run the math: 400 transactions × $225 average = **$90,000 of annual revenue from work you're already doing.** Currently most of that is going to a third-party processor.",
        },
        {
          type: "image",
          src: "/images/blog/hoa-document-revenue-body-math.svg",
          alt: "Revenue model comparison — third-party fulfillment captures most of the fee; in-house fulfillment keeps the revenue with the management company",
          caption:
            "Figure 1 — Where the document revenue flows in each model",
          aspect: "16:9",
        },
        {
          type: "paragraph",
          text: "Scale it: a 100-community management company at the same per-community average sees roughly $225,000+ in annual document revenue currently flowing out the door.",
        },
      ],
    },
    {
      heading: "Why This Has Persisted",
      blocks: [
        {
          type: "paragraph",
          text: "The third-party model worked when management companies couldn't build their own document operations. The reasons it stuck:",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "**Software was expensive.** Building a multi-tenant document ordering platform with payments, AI-assisted document generation, and per-association templates required serious engineering investment.",
            "**Title companies were already integrated.** The closer at the title firm has CondoCerts bookmarked. Changing their workflow felt risky for the management company.",
            "**Revenue felt like a side concern.** Management firms focused on the core PM revenue (monthly assessments, special projects) and treated documents as overhead.",
            "**Nobody asked.** Boards weren't pressing principals on revenue capture from documents. It wasn't visible enough to be a priority.",
          ],
        },
        {
          type: "paragraph",
          text: "All four of those reasons have changed. Multi-tenant document platforms exist now and they cost a fraction of what they used to. Title companies will use whatever portal you give them as long as the experience is smooth. Revenue capture is a strategic priority because operating margins have compressed. And boards are starting to ask the right questions.",
        },
      ],
    },
    {
      heading: "What Bringing It In-House Looks Like",
      blocks: [
        {
          type: "paragraph",
          text: "The mechanics of an in-house document fulfillment platform aren't complicated when the architecture is right:",
        },
        {
          type: "heading3",
          text: "1. A subdomain you own",
        },
        {
          type: "paragraph",
          text: "Title officers go to `docs.yourcompany.com` instead of CondoCerts. Your branding. Your pricing displayed. Your turnaround commitments. The relationship belongs to you.",
        },
        {
          type: "heading3",
          text: "2. AI-assisted document generation",
        },
        {
          type: "paragraph",
          text: "The fields your team would manually pull (financial position, assessment status, compliance flags, special assessment history) get pulled from your data sources and validated by an AI assistant before any human touches them. Document generation drops from a 2-hour manual process to a 5-minute review-and-approve.",
        },
        {
          type: "heading3",
          text: "3. Stripe Connect for settlement",
        },
        {
          type: "paragraph",
          text: "Payments flow directly to your bank account on a per-transaction basis. No monthly settlements. No back-end splits with a third party. Whatever your published price is, you keep.",
        },
        {
          type: "heading3",
          text: "4. Per-association templates",
        },
        {
          type: "paragraph",
          text: "Each community has its own document templates pulled from its governing docs. The platform handles this — your operations team doesn't have to maintain 40+ document variants manually.",
        },
      ],
    },
    {
      heading: "The Switching Question",
      blocks: [
        {
          type: "paragraph",
          text: "The objection most principals raise: \"What about the title companies? They're already using CondoCerts.\"",
        },
        {
          type: "paragraph",
          text: "Two things to know. First: title officers and closing agents don't have brand loyalty to CondoCerts or HomeWiseDocs. They have workflow loyalty — they want it fast, predictable, and easy to find. A faster, simpler portal at your subdomain solves their problem better than the third-party tool does.",
        },
        {
          type: "paragraph",
          text: "Second: you control the choice. When a title company calls your office to request a resale package, your team tells them where to go. You direct the workflow, not the third party.",
        },
        {
          type: "callout",
          severity: "good",
          title: "What the transition actually looks like",
          body: "Most management companies see 60–80% of their title company traffic migrate to the in-house portal within 90 days of switching, just by changing where they direct requests. The remaining tail stays on the legacy portal until those title firms hit their own friction and migrate themselves.",
        },
      ],
    },
  ],

  trustSignals: {
    heading: "How XeedlyAI Built PropertyDocz",
    body: "PropertyDocz is the document operations platform XeedlyAI built for HOA management companies who want to capture this revenue. Multi-tenant from day one — each management company gets a subdomain (e.g., docs.yourcompany.com) with their branding, pricing, and direct Stripe Connect settlement. AI-powered field registry handles document data extraction with a three-tier confidence model (human review only when needed). Per-association templates handle the document variation. Setup is currently $500 (limited-time, normally $1,500) with no monthly platform fees — XeedlyAI runs on a revenue-share model aligned with success. Core HOA is the first management company live on the platform, running 40+ communities.",
    caseStudies: [
      { slug: "propertydocz", label: "PropertyDocz — Document Operations Platform" },
      { slug: "core-hoa", label: "Core HOA — First Live Tenant" },
    ],
  },

  faq: [
    {
      q: "How much revenue can our management company capture from documents?",
      a: "A typical mid-sized HOA management company with 40 communities sees 320–480 document transactions per year at market rates of $150–$350 per package. Total annual revenue runs $90,000–$150,000 currently flowing to third-party processors. Scale linearly with community count.",
    },
    {
      q: "What about title companies that already use CondoCerts or HomeWiseDocs?",
      a: "Title officers and closing agents don't have brand loyalty to those tools — they want speed, predictability, and easy access. When your management company directs requests to your in-house portal, most title traffic migrates within 90 days. You control where requests get routed.",
    },
    {
      q: "How long does it take to switch?",
      a: "PropertyDocz deployment is 2–4 weeks. That includes tenant setup, association template configuration, Stripe Connect onboarding, AI field registry training on your document templates, and the cutover from third-party portals.",
    },
    {
      q: "What does it cost to bring document fulfillment in-house?",
      a: "PropertyDocz setup is $500 (limited-time, normally $1,500). No monthly platform fees. Revenue-share model means XeedlyAI only earns when you earn. The revenue you capture starts flowing on the first transaction processed through the platform.",
    },
    {
      q: "Can our management company keep our current document pricing?",
      a: "You set the pricing entirely. Most management companies adopt the same or slightly lower price points than the third-party processors charge — and capture significantly more revenue per transaction because the back-end split is no longer happening.",
    },
  ],

  cta: {
    heading: "See your revenue opportunity in 15 minutes",
    body: "Tell us how many communities you manage. We'll show you a specific revenue projection for bringing document fulfillment in-house — and walk through what a PropertyDocz deployment would look like for your operation.",
    primaryAction: {
      label: "Book a Discovery Call",
      href: "/contact",
    },
  },

  internalLinks: {
    pillar: "/products",
    laterals: [
      "vendor-compliance-at-scale-property-management",
      "multi-unit-bottleneck-constraint-at-five-units",
      "what-is-operational-intelligence",
    ],
  },
};
