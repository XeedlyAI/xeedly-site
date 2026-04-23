import type { SignalAccent } from "@/components/shared/SignalCard";
import type { Kpi } from "@/components/layout/KpiTicker";

export type DeploymentStatus = "LIVE" | "ONBOARDING" | "META";

export type DeploymentCardData = {
  slug: string;
  clientName: string;
  industry: string;
  status: DeploymentStatus;
  statusAccent: "teal" | "blue" | "purple";
  accentBorder: string;
  description: string;
  dataRow: string[];
};

export type ProblemSignal = {
  accent: SignalAccent;
  title: string;
  body: string;
};

export type SolutionFeature = {
  title: string;
  description: string;
  tags: string[];
};

export type PipelineStage = {
  label: string;
  sublabel?: string;
};

export type OutcomeSignal = {
  accent: SignalAccent;
  title: string;
  body: string;
};

export type HeaderMetric = {
  label: string;
  value: string;
};

export type CaseStudy = {
  slug: string;
  clientName: string;
  industry: string;
  industryAccent: "teal" | "blue" | "purple";
  summary: string;
  seoTitle: string;
  seoDescription: string;
  card: DeploymentCardData;
  headerMetrics: HeaderMetric[];
  problemSignals: ProblemSignal[];
  pipelineStages: PipelineStage[];
  solutionFeatures: SolutionFeature[];
  stackTags: string[];
  outcomeKpis: Kpi[];
  outcomeSignals: OutcomeSignal[];
  intelligenceLayerText: string;
};

// ---------------------------------------------------------------------------
// Status accent palette (shared)
// ---------------------------------------------------------------------------

export const STATUS_ACCENT: Record<
  "teal" | "blue" | "purple",
  { border: string; text: string; bg: string }
> = {
  teal: { border: "#14b8a6", text: "#14b8a6", bg: "rgba(20,184,166,0.10)" },
  blue: { border: "#3b82f6", text: "#3b82f6", bg: "rgba(59,130,246,0.10)" },
  purple: { border: "#8b5cf6", text: "#8b5cf6", bg: "rgba(139,92,246,0.10)" },
};

// ---------------------------------------------------------------------------
// Case study data
// ---------------------------------------------------------------------------

export const PANDO: CaseStudy = {
  slug: "pando",
  clientName: "Pando Midwest Investments",
  industry: "PROPERTY INVESTMENT",
  industryAccent: "teal",
  summary:
    "Full agent-to-investor deal pipeline. AI-powered property evaluation, structured investment thesis generation, and investor deals room with lens scoring.",
  seoTitle: "Pando Midwest Investments — Case Study",
  seoDescription:
    "How XeedlyAI built a full agent-to-investor deal pipeline for Pando Midwest Investments. AI-powered property evaluation, investment thesis generation, and investor deals room.",
  card: {
    slug: "pando",
    clientName: "Pando Midwest Investments",
    industry: "PROPERTY INVESTMENT",
    status: "LIVE",
    statusAccent: "teal",
    accentBorder: "#14b8a6",
    description:
      "Full agent-to-investor deal pipeline. AI-powered property evaluation, structured investment thesis generation, and investor deals room with lens scoring.",
    dataRow: [
      "pipeline: agent→admin→investor",
      "migrations: 13",
      "build: 5 sessions",
      "status: production",
    ],
  },
  headerMetrics: [
    { label: "STATUS", value: "LIVE" },
    { label: "BUILD TIME", value: "5 sessions" },
    { label: "STACK", value: "Next.js · Supabase · Claude API" },
    { label: "DEPLOYED", value: "ownpando.com" },
    { label: "MIGRATIONS", value: "13" },
    { label: "AUTH", value: "Magic link · persistent sessions" },
  ],
  problemSignals: [
    {
      accent: "red",
      title: "Manual deal flow",
      body: "Agents submitted properties via email and text. No structured intake, no standardized evaluation criteria, no audit trail. Deals fell through cracks.",
    },
    {
      accent: "amber",
      title: "No investor intelligence",
      body: "Investors had no self-serve access to the deal pipeline. Every update required a phone call or email from Marc. No scoring, no structured thesis, no comparison tools.",
    },
    {
      accent: "amber",
      title: "Platform ceiling",
      body: "Original build on Lovable.dev hit technical limits. Authentication, database relationships, and complex UI interactions couldn't scale.",
    },
  ],
  pipelineStages: [
    { label: "AGENT PORTAL", sublabel: "submission" },
    { label: "ADMIN REVIEW", sublabel: "4-zone" },
    { label: "DEAL CREATION", sublabel: "thesis gen" },
    { label: "INVESTOR DEALS ROOM", sublabel: "lens scoring" },
  ],
  solutionFeatures: [
    {
      title: "Agent Submission Portal",
      description:
        "Draft-then-submit workflow. Structured property details, photo uploads, status tracking. Agents see their submission history and current status.",
      tags: ["Next.js", "Supabase", "Photo uploads"],
    },
    {
      title: "Four-Zone Admin Review",
      description:
        "Property intelligence, financial analysis, market context, and decision controls in one surface. Accept creates a draft deal automatically.",
      tags: ["RSC", "Admin tooling", "Decision surface"],
    },
    {
      title: "AI Investment Thesis",
      description:
        "Claude generates a structured investment thesis with financial projections. Stored as JSONB, rendered as formatted sections on deal cards.",
      tags: ["Claude API", "JSONB", "Structured output"],
    },
    {
      title: "Investor Deals Room",
      description:
        "Lens scoring across cash flow, equity upside, risk profile, and growth potential. Curated property intel, photo gallery, and reservation CTA. Approved investors only.",
      tags: ["Magic link auth", "Lens scoring", "RLS"],
    },
  ],
  stackTags: [
    "Next.js 16",
    "Supabase",
    "Claude Sonnet",
    "Tailwind v4",
    "shadcn/ui",
    "Magic Link Auth",
    "RSC Architecture",
    "Vercel",
  ],
  outcomeKpis: [
    { label: "Pipeline", value: "LIVE" },
    { label: "Migrations", value: "13", target: 13, format: (n) => Math.round(n).toString() },
    { label: "Auth", value: "Magic Link" },
    { label: "Sessions", value: "5", target: 5, format: (n) => Math.round(n).toString() },
    { label: "Flow", value: "Agent→Admin→Investor" },
  ],
  outcomeSignals: [
    {
      accent: "teal",
      title: "Full pipeline automated",
      body: "Agent submits → Admin reviews → Deal created with AI thesis → Published to investor deals room. Zero manual handoffs.",
    },
    {
      accent: "teal",
      title: "Production deployment",
      body: "Live at ownpando.com. Persistent sessions, magic link auth, RSC-compliant architecture, 13 migrations applied cleanly.",
    },
    {
      accent: "teal",
      title: "15:1 Impact Initiative",
      body: "Platform enables the mission: every 15 homes acquired funds a home build in Belize through Hi-5 Live partnership.",
    },
  ],
  intelligenceLayerText:
    "Pando's deal pipeline is a vertical instance of the XeedlyAI intelligence architecture. Agent submissions are ingested events. The four-zone admin surface is the signal detection layer — property data, financial analysis, and market context correlated into a decision. The investor deals room is three-tier delivery: lens scores at a glance, deal cards as briefings, full property intel for deep dives. Same pattern as Sovvrn and Propertyolio — different data, different rules, same architecture.",
};

export const CORE_HOA: CaseStudy = {
  slug: "core-hoa",
  clientName: "Core HOA",
  industry: "PROPERTY MANAGEMENT",
  industryAccent: "blue",
  summary:
    "HOA document fulfillment and vendor compliance automation. First client onboarding PropertyDocz and PropertyJobz with Propertyolio intelligence layer wrapping the business.",
  seoTitle: "Core HOA — Case Study",
  seoDescription:
    "PropertyDocz, PropertyJobz, and Propertyolio deployed for Core HOA. 40 associations, automated document fulfillment, AI-powered vendor compliance, intelligence nerve center.",
  card: {
    slug: "core-hoa",
    clientName: "Core HOA",
    industry: "PROPERTY MANAGEMENT",
    status: "ONBOARDING",
    statusAccent: "blue",
    accentBorder: "#3b82f6",
    description:
      "HOA document fulfillment and vendor compliance automation. First client onboarding PropertyDocz and PropertyJobz with Propertyolio intelligence layer wrapping the business.",
    dataRow: [
      "associations: 40",
      "products: 3",
      "pipeline: docs + vendors + intel",
      "client: first",
    ],
  },
  headerMetrics: [
    { label: "STATUS", value: "ONBOARDING" },
    { label: "BUILD TIME", value: "ongoing" },
    { label: "STACK", value: "Next.js · Supabase · Stripe Connect · Claude API" },
    { label: "PRODUCTS", value: "PropertyDocz · PropertyJobz · Propertyolio" },
    { label: "ASSOCIATIONS", value: "40" },
    { label: "CLIENT TYPE", value: "first client" },
  ],
  problemSignals: [
    {
      accent: "red",
      title: "Manual document fulfillment",
      body: "HOA resale and refinance document packages assembled by hand. Turnaround unpredictable. No tracking, no automation, no revenue optimization.",
    },
    {
      accent: "amber",
      title: "Spreadsheet vendor management",
      body: "Vendor insurance, licenses, and compliance tracked in spreadsheets. Expiration dates missed. No automated alerts.",
    },
    {
      accent: "amber",
      title: "No cross-system visibility",
      body: "Document operations, vendor compliance, and community health existed in separate silos. No way to detect patterns across systems.",
    },
  ],
  pipelineStages: [
    { label: "PROPERTYDOCZ", sublabel: "docs" },
    { label: "PROPERTYJOBZ", sublabel: "vendors" },
    { label: "PROPERTYOLIO", sublabel: "intelligence nerve center" },
  ],
  solutionFeatures: [
    {
      title: "PropertyDocz",
      description:
        "Multi-tenant document ordering platform. Subscription tiers (Free to $799/mo), automated PDF generation via Typst, revenue split tracking, fulfillment ledger. Subdomain per tenant: corehoa.propertydocz.com.",
      tags: ["Multi-tenant", "Stripe Connect", "Typst PDF"],
    },
    {
      title: "PropertyJobz",
      description:
        "Vendor management with AI assistant. Compliance tracking, insurance expiry alerts, vendor matching, cascading clipboard brand identity. Claude-powered briefing + interactive chat.",
      tags: ["Compliance", "Claude Sonnet", "AI Briefings"],
    },
    {
      title: "Propertyolio",
      description:
        "The intelligence nerve center wrapping both products. Event bus ingests actions from Docz and Jobz, signal engine detects cross-product patterns, AI morning briefings delivered to managers.",
      tags: ["Event bus", "Signal engine", "Morning briefings"],
    },
  ],
  stackTags: [
    "Next.js 16",
    "Supabase",
    "Stripe Connect",
    "Typst PDF",
    "Claude Sonnet",
    "Resend",
    "Multi-Tenant",
    "Vercel",
  ],
  outcomeKpis: [
    { label: "Products", value: "3", target: 3, format: (n) => Math.round(n).toString() },
    { label: "Associations", value: "40", target: 40, format: (n) => Math.round(n).toString() },
    { label: "Pipeline", value: "Docs+Vendors+Intel" },
    { label: "Tenants", value: "Multi" },
    { label: "Revenue", value: "Split-tracked" },
  ],
  outcomeSignals: [
    {
      accent: "teal",
      title: "Three-product deployment",
      body: "PropertyDocz, PropertyJobz, and Propertyolio deployed as an integrated suite. First client fully onboarded across all three.",
    },
    {
      accent: "teal",
      title: "40 associations configured",
      body: "Core HOA's full portfolio loaded into PropertyDocz. Document fulfillment pipeline automated.",
    },
    {
      accent: "blue",
      title: "Intelligence layer in build",
      body: "Propertyolio wrapping around Core HOA's operations. Event bus and signal engine connecting document and vendor data streams.",
    },
  ],
  intelligenceLayerText:
    "Core HOA is the proof case for the XeedlyAI property management vertical. PropertyDocz and PropertyJobz are operational tools that generate events — document requested, vendor insurance expired, job completed. Propertyolio ingests these events and correlates them: a vendor compliance gap coinciding with pending document requests becomes a high-severity signal. The manager gets a morning briefing, not a spreadsheet. Three products, one intelligence layer, one client.",
};

export const SOVVRN: CaseStudy = {
  slug: "sovvrn",
  clientName: "Sovvrn",
  industry: "RESTAURANT INTELLIGENCE",
  industryAccent: "teal",
  summary:
    "AI-native business intelligence for multi-unit restaurant operators. Morning briefings, voice AI transcription, command center with cross-system signal detection.",
  seoTitle: "Sovvrn Restaurant Intelligence — Case Study",
  seoDescription:
    "AI-native business intelligence for multi-unit restaurant operators. Morning briefings, voice AI, command center, cost intelligence. Built and deployed by XeedlyAI.",
  card: {
    slug: "sovvrn",
    clientName: "Sovvrn",
    industry: "RESTAURANT INTELLIGENCE",
    status: "LIVE",
    statusAccent: "teal",
    accentBorder: "#14b8a6",
    description:
      "AI-native business intelligence for multi-unit restaurant operators. Morning briefings, voice AI transcription, command center with cross-system signal detection.",
    dataRow: [
      "delivery: morning briefing",
      "channels: email + sms + app",
      "ai: voice + coaching",
      "status: production",
    ],
  },
  headerMetrics: [
    { label: "STATUS", value: "LIVE" },
    { label: "BUILD TIME", value: "8 weeks" },
    { label: "STACK", value: "Next.js · Supabase · Claude · Vapi · ElevenLabs · Twilio" },
    { label: "DEPLOYED", value: "sovvrn.vercel.app" },
    { label: "DELIVERY", value: "Email · SMS · In-App" },
    { label: "AI SYSTEMS", value: "Voice · Coaching · Briefings" },
  ],
  problemSignals: [
    {
      accent: "red",
      title: "Dashboard overload",
      body: "Multi-unit operators managing 5+ systems (POS, labor, reviews, scheduling, voice). Each system has its own dashboard. Managers on the floor can't check dashboards during service.",
    },
    {
      accent: "amber",
      title: "Reactive operations",
      body: "Problems discovered after the fact. Tuesday's labor issue found on Wednesday. Revenue anomaly spotted at end of week. No proactive alerting.",
    },
    {
      accent: "amber",
      title: "Phone calls as dead data",
      body: "Hundreds of inbound calls per week transcribed by no one. Customer sentiment, missed call patterns, staff issues — all invisible.",
    },
  ],
  pipelineStages: [
    { label: "POS + LABOR + REVIEWS + VOICE", sublabel: "ingest" },
    { label: "SIGNAL ENGINE", sublabel: "correlate" },
    { label: "BRIEFING · COMMAND CENTER · VOICE AI", sublabel: "deliver" },
  ],
  solutionFeatures: [
    {
      title: "Morning Briefing",
      description:
        "AI-generated daily intelligence delivered before first shift. Six sections: Revenue Health, Cost Position, Operations & Guest Experience, Voice Intelligence, Review & Marketing Intelligence, Today's Priorities. Day-anchored header, health trend indicators.",
      tags: ["6 sections", "Pre-shift delivery", "Health trends"],
    },
    {
      title: "Command Center",
      description:
        "Three-panel signal feed. Active signals, flagged items, resolved/dismissed history. Full traceability from signal to source event.",
      tags: ["Signal feed", "Traceability", "3-panel"],
    },
    {
      title: "Voice AI",
      description:
        "Vapi + ElevenLabs + Twilio. Every call transcribed, analyzed, converted to intelligence. Missed call recovery. Sentiment detection. Staff coaching signals.",
      tags: ["Vapi", "ElevenLabs", "Twilio"],
    },
    {
      title: "Cost Intelligence",
      description:
        "Four-system confidence model: day-of-month calculation, adaptive gauge visuals, calendar-aware AI coaching rules, historical comparison overlay.",
      tags: ["Confidence model", "Day-of-month", "Coaching rules"],
    },
  ],
  stackTags: [
    "Next.js",
    "Supabase",
    "Claude Sonnet",
    "Vapi",
    "ElevenLabs",
    "Twilio",
    "shadcn/ui",
    "Framer Motion",
  ],
  outcomeKpis: [
    { label: "Delivery", value: "Morning Briefing" },
    { label: "Channels", value: "4", target: 4, format: (n) => Math.round(n).toString() },
    { label: "AI", value: "Voice+Coaching" },
    { label: "Signals", value: "Cross-system" },
    { label: "Status", value: "LIVE" },
  ],
  outcomeSignals: [
    {
      accent: "teal",
      title: "Morning briefing operational",
      body: "Six-section AI briefing delivered daily. Revenue health, cost position, operations, voice intel, review intel, priorities.",
    },
    {
      accent: "teal",
      title: "Voice AI live",
      body: "Every call captured, transcribed, analyzed. Phone becomes a data source, not just communication.",
    },
    {
      accent: "teal",
      title: "Three-tier delivery",
      body: "Glance (KPI tickers), Briefing (daily intelligence), Deep (command center + AI chat). Full implementation of the XeedlyAI intelligence stack.",
    },
  ],
  intelligenceLayerText:
    "Sovvrn was the first deployment of the XeedlyAI intelligence architecture. It proved the thesis: ingest events from every operational system, detect cross-system patterns, deliver proactive intelligence to operators who are too busy for dashboards. The morning briefing — delivered before the first shift starts — is the signature delivery mechanism. Voice AI turned the telephone into a data source. The command center gives operators investigative depth when they need it. Same architecture, proven first in restaurants, now deployed across property management and investment.",
};

export const XEEDLY_PLATFORM: CaseStudy = {
  slug: "xeedly-platform",
  clientName: "XeedlyAI Platform",
  industry: "PLATFORM DEMONSTRATION",
  industryAccent: "purple",
  summary:
    "The xeedly.com website itself — built as a live instance of the intelligence platform. Interactive Intelligence Console, AI-powered contact routing, hardcoded signal demonstrations.",
  seoTitle: "XeedlyAI Platform — Case Study",
  seoDescription:
    "How XeedlyAI built its own website as a live deployment of the intelligence platform. Interactive Intelligence Console, AI contact routing, built in 1 day with 6 Claude Code prompts.",
  card: {
    slug: "xeedly-platform",
    clientName: "XeedlyAI Platform",
    industry: "PLATFORM DEMONSTRATION",
    status: "META",
    statusAccent: "purple",
    accentBorder: "#8b5cf6",
    description:
      "The xeedly.com website itself — built as a live instance of the intelligence platform. Interactive Intelligence Console, AI-powered contact routing, hardcoded signal demonstrations.",
    dataRow: [
      "pages: 8",
      "build: 1 day",
      "prompts: 6 sequential",
      "ai: live query endpoint",
    ],
  },
  headerMetrics: [
    { label: "STATUS", value: "LIVE" },
    { label: "BUILD TIME", value: "1 day" },
    { label: "STACK", value: "Next.js · Claude API · Tailwind v4 · Framer" },
    { label: "DEPLOYED", value: "xeedly.com" },
    { label: "PAGES", value: "8" },
    { label: "BUILD METHOD", value: "6 sequential Claude Code prompts" },
  ],
  problemSignals: [
    {
      accent: "red",
      title: "Outdated positioning",
      body: "Webflow site positioned XeedlyAI as a marketing agency with AI chatbots. Company had evolved into an intelligence platform builder. Every page was wrong.",
    },
    {
      accent: "amber",
      title: "Static marketing",
      body: "Standard website with no interactivity. Visitors read about the platform but couldn't experience it. No demonstration of the intelligence layer.",
    },
    {
      accent: "amber",
      title: "No contact intelligence",
      body: "Generic contact form. No understanding of visitor intent. No routing based on what they were exploring.",
    },
  ],
  pipelineStages: [
    { label: "DESIGN SYSTEM", sublabel: "foundation" },
    { label: "HOMEPAGE + CONSOLE", sublabel: "core surface" },
    { label: "PLATFORM + PRODUCTS", sublabel: "depth" },
    { label: "PRICING + CONTACT + SEO + LEGAL", sublabel: "completion" },
  ],
  solutionFeatures: [
    {
      title: "Intelligence Console",
      description:
        "Interactive query interface embedded in the website. Hardcoded responses render as signal cards and briefing panels. Freeform queries hit Claude API for live AI responses. Visitors experience the product before they understand it.",
      tags: ["Live API", "Signal cards", "Briefing panels"],
    },
    {
      title: "AI Contact Routing",
      description:
        "The Intelligence Console doesn't just answer questions — it qualifies and routes. Calendar booking, email/phone, intake forms, and direct chat surfaced contextually based on query intent.",
      tags: ["Intent routing", "Action cards", "4 types"],
    },
    {
      title: "Platform-as-Website",
      description:
        "KPI tickers, signal cards, left-border accents, JetBrains Mono data typography. The site IS an instance of the product. The design language is the same one operators see in Sovvrn and PropertyJobz.",
      tags: ["Design system", "KPI tickers", "Signal UI"],
    },
    {
      title: "6-Prompt Build Method",
      description:
        "Entire site built with 6 sequential Claude Code prompts. Each prompt self-contained, each builds clean, each pushes to main. Replicable deployment pattern.",
      tags: ["Claude Code", "Replicable", "Self-contained"],
    },
  ],
  stackTags: [
    "Next.js 16",
    "Claude Sonnet (API)",
    "Tailwind v4",
    "shadcn/ui",
    "Framer Motion",
    "Vercel",
    "Claude Code",
  ],
  outcomeKpis: [
    { label: "Pages", value: "8", target: 8, format: (n) => Math.round(n).toString() },
    { label: "Build", value: "1 day" },
    { label: "Prompts", value: "6", target: 6, format: (n) => Math.round(n).toString() },
    { label: "AI", value: "Live endpoint" },
    { label: "Console", value: "Interactive" },
  ],
  outcomeSignals: [
    {
      accent: "teal",
      title: "Site as product demo",
      body: "Visitors interact with the intelligence platform on the marketing website. The conversion moment happens before the first sales call.",
    },
    {
      accent: "teal",
      title: "AI-powered routing",
      body: "Contact options appear contextually based on query intent. Calendar booking, intake forms, and direct chat wired into the Intelligence Console response layer.",
    },
    {
      accent: "purple",
      title: "Meta deployment",
      body: "XeedlyAI's own website is a case study for its own platform. The architecture that powers Sovvrn and Propertyolio powers the marketing site.",
    },
  ],
  intelligenceLayerText:
    "This is the meta case study. XeedlyAI's marketing website is itself a deployment of the intelligence platform architecture. The Intelligence Console on the homepage is a real query endpoint — same Claude API, same structured response format, same signal card rendering. The KPI ticker shows platform metrics. The contact routing system uses AI to qualify and route visitors. The site was built in a single day using 6 sequential Claude Code prompts — the same replicable deployment pattern used for client projects. If the architecture can power a marketing website, it can power anything.",
};

export const CASE_STUDIES: CaseStudy[] = [
  PANDO,
  CORE_HOA,
  SOVVRN,
  XEEDLY_PLATFORM,
];

export const CASE_STUDIES_BY_SLUG: Record<string, CaseStudy> = {
  pando: PANDO,
  "core-hoa": CORE_HOA,
  sovvrn: SOVVRN,
  "xeedly-platform": XEEDLY_PLATFORM,
};

// ---------------------------------------------------------------------------
// Aggregate KPIs for the /case-studies overview hero ticker
// ---------------------------------------------------------------------------

export const OVERVIEW_KPIS: Kpi[] = [
  {
    label: "Deployments Shipped",
    value: "4",
    target: 4,
    format: (n) => Math.round(n).toString(),
  },
  {
    label: "Industries Covered",
    value: "3",
    target: 3,
    format: (n) => Math.round(n).toString(),
    subtitle: "property • restaurants • investment",
  },
  {
    label: "Avg Build Time",
    value: "3 wks",
    subtitle: "idea to production",
  },
  {
    label: "Pipelines Automated",
    value: "7",
    target: 7,
    format: (n) => Math.round(n).toString(),
    subtitle: "cross-platform",
  },
  {
    label: "Signals Configured",
    value: "40+",
    target: 40,
    format: (n) => `${Math.round(n)}+`,
    subtitle: "rules + AI correlation",
  },
];
