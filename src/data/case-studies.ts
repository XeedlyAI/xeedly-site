import type { SignalAccent } from "@/components/shared/SignalCard";
import type { Kpi } from "@/components/layout/KpiTicker";

export type DeploymentStatus = "LIVE" | "SHIPPING" | "ONBOARDING" | "META";

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
  industryAccent: "teal",
  summary:
    "Modern website rebuild with multi-tenant data layer architecture for a Utah HOA management company running dozens of communities. Integrated natively with PropertyDocz and PropertyJobz.",
  seoTitle: "Core HOA — Case Study",
  seoDescription:
    "How XeedlyAI rebuilt Core HOA's website with a multi-tenant data layer serving 40+ communities, natively integrated with PropertyDocz document ordering and PropertyJobz vendor management.",
  card: {
    slug: "core-hoa",
    clientName: "Core HOA",
    industry: "PROPERTY MANAGEMENT",
    status: "LIVE",
    statusAccent: "teal",
    accentBorder: "#14b8a6",
    description:
      "Modern HOA management website with multi-tenant data layer. 40+ communities on one platform, integrated with PropertyDocz and PropertyJobz.",
    dataRow: [
      "communities: 40+",
      "architecture: multi-tenant",
      "integrations: PropertyDocz + PropertyJobz",
      "client: first",
    ],
  },
  headerMetrics: [
    { label: "STATUS", value: "LIVE" },
    { label: "BUILD TIME", value: "2 weeks" },
    { label: "STACK", value: "Next.js · Tailwind · Vercel" },
    { label: "COMMUNITIES", value: "40+" },
    { label: "ARCHITECTURE", value: "Multi-tenant data layer" },
    { label: "CLIENT TYPE", value: "First HOA management client" },
  ],
  problemSignals: [
    {
      accent: "red",
      title: "Outdated web presence",
      body: "Legacy Webflow site that didn't reflect the scale or professionalism of their operation. No community-specific portals, no self-serve for homeowners or board members.",
    },
    {
      accent: "amber",
      title: "Manual community management",
      body: "Dozens of communities managed without a unified system. Information scattered across emails, spreadsheets, and disconnected tools.",
    },
    {
      accent: "amber",
      title: "No integration with operational tools",
      body: "Document ordering, vendor management, and community data lived in separate silos with no connection between them.",
    },
  ],
  pipelineStages: [
    { label: "WEBSITE REBUILD", sublabel: "foundation" },
    { label: "MULTI-TENANT DATA LAYER", sublabel: "40+ communities" },
    { label: "NATIVE PRODUCT INTEGRATIONS", sublabel: "PropertyDocz + PropertyJobz" },
  ],
  solutionFeatures: [
    {
      title: "Modern Website Rebuild",
      description:
        "Complete replacement of the legacy Webflow site. Built on Next.js with the XeedlyAI design system — consistent typography, signal-card patterns, and operational aesthetic that matches the scale of the business.",
      tags: ["Next.js", "Tailwind", "XeedlyAI design system"],
    },
    {
      title: "Multi-Tenant Data Layer",
      description:
        "Each community gets structured data management — board members, homeowners, documents, vendors. One platform serving 40+ communities without sacrificing community-specific context or branding.",
      tags: ["Multi-tenant", "Structured data", "Per-community context"],
    },
    {
      title: "Native PropertyDocz Integration",
      description:
        "Homeowners and agents order resale and refinance documents through Core HOA's own site experience — PropertyDocz runs underneath but visitors never leave the Core HOA brand.",
      tags: ["PropertyDocz", "Embedded flow", "Document operations"],
    },
    {
      title: "Native PropertyJobz Integration",
      description:
        "Board members access vendor portals and compliance status without jumping to a separate tool. PropertyJobz is embedded as a native feature of the Core HOA experience.",
      tags: ["PropertyJobz", "Vendor portal", "Compliance"],
    },
  ],
  stackTags: [
    "Next.js 16",
    "Tailwind v4",
    "shadcn/ui",
    "Vercel",
    "Multi-Tenant Architecture",
    "PropertyDocz",
    "PropertyJobz",
  ],
  outcomeKpis: [
    { label: "Communities", value: "40+", target: 40, format: (n) => `${Math.round(n)}+` },
    { label: "Build Time", value: "2 wks" },
    { label: "Architecture", value: "Multi-tenant" },
    { label: "Integrations", value: "Docz + Jobz" },
    { label: "Status", value: "LIVE" },
  ],
  outcomeSignals: [
    {
      accent: "teal",
      title: "40+ communities on one platform",
      body: "Multi-tenant architecture serving dozens of HOA communities from a single deployment.",
    },
    {
      accent: "teal",
      title: "Seamless product integration",
      body: "PropertyDocz document ordering and PropertyJobz vendor portals embedded as native features. Homeowners order documents without knowing they're using a separate platform.",
    },
    {
      accent: "teal",
      title: "First client in the property vertical",
      body: "Core HOA validated the multi-tenant architecture pattern that now serves as the template for nationwide expansion.",
    },
  ],
  intelligenceLayerText:
    "Core HOA proved that a single multi-tenant architecture can serve dozens of communities without sacrificing community-specific customization. Their website integrates with PropertyDocz and PropertyJobz as native features — homeowners order documents and vendors access compliance portals without ever leaving Core HOA's brand experience. This integration pattern is the template for every HOA management company we onboard.",
};

export const PROPERTYDOCZ: CaseStudy = {
  slug: "propertydocz",
  clientName: "PropertyDocz",
  industry: "DOCUMENT OPERATIONS",
  industryAccent: "blue",
  summary:
    "Multi-tenant HOA document ordering and fulfillment platform. AI-powered data pipeline, automated PDF generation, subscription tiers with revenue split tracking.",
  seoTitle: "PropertyDocz — Case Study",
  seoDescription:
    "Multi-tenant HOA document ordering platform. AI-powered data pipeline, Typst PDF generation, subscription tiers with automated revenue settlement. Built by XeedlyAI.",
  card: {
    slug: "propertydocz",
    clientName: "PropertyDocz",
    industry: "DOCUMENT OPERATIONS",
    status: "SHIPPING",
    statusAccent: "blue",
    accentBorder: "#3b82f6",
    description:
      "Multi-tenant HOA document ordering and fulfillment. AI-powered data pipeline, automated PDF generation, subscription tiers with revenue split tracking.",
    dataRow: [
      "tenants: multi",
      "tiers: 4",
      "revenue: split-tracked",
      "pdf: Typst automated",
    ],
  },
  headerMetrics: [
    { label: "STATUS", value: "SHIPPING" },
    { label: "BUILD TIME", value: "6 weeks" },
    { label: "STACK", value: "Next.js 16 · Supabase · Stripe Connect · Typst · Claude API · Resend" },
    { label: "ARCHITECTURE", value: "Multi-tenant (subdomain per client)" },
    { label: "TENANTS", value: "Core HOA (first)" },
    { label: "SUBSCRIPTION TIERS", value: "4" },
  ],
  problemSignals: [
    {
      accent: "red",
      title: "Industry-wide fulfillment bottleneck",
      body: "HOA resale and refinance document packages assembled manually across the industry. Title companies, agents, and homeowners wait days for documents that should take hours.",
    },
    {
      accent: "amber",
      title: "No revenue optimization",
      body: "Document fulfillment generates significant revenue but pricing, tracking, and settlement are handled through spreadsheets and manual invoicing. No subscription model, no automated revenue split.",
    },
    {
      accent: "amber",
      title: "Data confidence gap",
      body: "HOA data comes from multiple sources with varying reliability. No system to track which fields are trustworthy and which need verification.",
    },
  ],
  pipelineStages: [
    { label: "AGENT / HOMEOWNER ORDERS", sublabel: "intake" },
    { label: "AI DATA HARVEST", sublabel: "Claude-powered" },
    { label: "TYPST PDF GENERATION", sublabel: "automated" },
    { label: "FULFILLMENT TRACKING", sublabel: "ledger" },
    { label: "REVENUE SETTLEMENT", sublabel: "Stripe Connect" },
  ],
  solutionFeatures: [
    {
      title: "Multi-Tenant Platform",
      description:
        "Each HOA management company gets a branded subdomain (e.g., corehoa.propertydocz.com). Tenant admins manage their own associations, agents, and pricing. Platform admin oversees all tenants.",
      tags: ["Subdomains", "Tenant admin", "Platform admin"],
    },
    {
      title: "Subscription Tiers",
      description:
        "Four tiers: Free/pay-per-order, Agent Pro $149/mo (3 packages), Broker Office $399/mo (10 packages), Title Partner $799/mo (25 packages). No rollover. Revenue split: 50/50 on pay-per-order, $10 fulfillment fee on subscriptions.",
      tags: ["Stripe Connect", "Revenue split", "4 tiers"],
    },
    {
      title: "Intelligent Data Pipeline",
      description:
        "AI-powered field registry with three-tier confidence model (static, periodic, transaction-specific). Claude API harvests data during onboarding, auto-fills known fields, flags low-confidence data for manual review.",
      tags: ["Claude Sonnet", "Confidence model", "Field registry"],
    },
    {
      title: "Automated PDF Generation",
      description:
        "Typst-based document generation produces professional HOA document packages in minutes. Templates configurable per association.",
      tags: ["Typst", "Per-association templates", "Sub-minute generation"],
    },
    {
      title: "Revenue Settlement",
      description:
        "Stripe Connect handles payment processing. Fulfillment ledger tracks every transaction. Monthly settlement calculates revenue splits automatically.",
      tags: ["Stripe Connect", "Fulfillment ledger", "Automated splits"],
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
    "Tailwind v4",
    "shadcn/ui",
  ],
  outcomeKpis: [
    { label: "Tiers", value: "4", target: 4, format: (n) => Math.round(n).toString() },
    { label: "Revenue Model", value: "Split-tracked" },
    { label: "Pipeline", value: "Order→Harvest→Generate→Fulfill" },
    { label: "Tenants", value: "Multi" },
    { label: "PDF", value: "Typst automated" },
  ],
  outcomeSignals: [
    {
      accent: "teal",
      title: "End-to-end automation",
      body: "From order placement to PDF generation to delivery to revenue settlement. Manual touchpoints reduced to edge cases.",
    },
    {
      accent: "teal",
      title: "Multi-tenant architecture",
      body: "One codebase serving unlimited HOA management companies. Each tenant gets their own subdomain, branding context, and admin controls.",
    },
    {
      accent: "teal",
      title: "AI-powered data confidence",
      body: "Three-tier confidence model means agents know exactly which HOA data to trust and which needs verification before closing.",
    },
  ],
  intelligenceLayerText:
    "PropertyDocz is a vertical SaaS product built on the XeedlyAI architecture pattern. Document orders are ingested events. Fulfillment status changes generate signals. Revenue settlement is automated intelligence. The multi-tenant architecture means every management company we onboard multiplies the data flowing through the system — more tenants, more events, more signal patterns. PropertyDocz doesn't just fulfill documents; it generates the operational data that Propertyolio will eventually correlate across the entire property management vertical.",
};

export const PROPERTYJOBZ: CaseStudy = {
  slug: "propertyjobz",
  clientName: "PropertyJobz",
  industry: "VENDOR MANAGEMENT",
  industryAccent: "blue",
  summary:
    "HOA vendor compliance and management platform. Claude-powered AI assistant on every dashboard, multi-tenant platform admin layer, full XeedlyAI design system.",
  seoTitle: "PropertyJobz — Case Study",
  seoDescription:
    "HOA vendor compliance and management platform. Claude-powered AI assistant, multi-tenant platform admin, 30+ pages with XeedlyAI design system. Built by XeedlyAI.",
  card: {
    slug: "propertyjobz",
    clientName: "PropertyJobz",
    industry: "VENDOR MANAGEMENT",
    status: "SHIPPING",
    statusAccent: "blue",
    accentBorder: "#3b82f6",
    description:
      "HOA vendor compliance and management platform. AI assistant on every dashboard, platform admin layer, 30+ pages with full design system.",
    dataRow: [
      "ai: every dashboard",
      "pages: 30+",
      "admin: platform + tenant",
      "compliance: automated",
    ],
  },
  headerMetrics: [
    { label: "STATUS", value: "SHIPPING" },
    { label: "BUILD TIME", value: "5 weeks" },
    { label: "STACK", value: "Next.js 16 · Supabase · Stripe Connect · Claude · Framer" },
    { label: "ARCHITECTURE", value: "Multi-tenant with Platform Admin" },
    { label: "TENANTS", value: "Core HOA (first)" },
    { label: "AI", value: "Claude-powered Assistant on every dashboard" },
  ],
  problemSignals: [
    {
      accent: "red",
      title: "Vendor compliance is invisible",
      body: "HOA management companies track vendor insurance, licenses, and certifications in spreadsheets or not at all. Expired insurance discovered only after an incident.",
    },
    {
      accent: "amber",
      title: "No vendor-community matching",
      body: "Finding the right vendor for a specific community and job type requires manual searching through contacts and word of mouth. No structured vendor registry.",
    },
    {
      accent: "amber",
      title: "Disconnected workflows",
      body: "Job requests, vendor assignments, compliance checks, and invoicing happen across email, phone, and paper. No single system connects the workflow.",
    },
  ],
  pipelineStages: [
    { label: "VENDOR ONBOARDING", sublabel: "registry" },
    { label: "COMPLIANCE TRACKING", sublabel: "insurance · licenses" },
    { label: "JOB MATCHING", sublabel: "community × trade" },
    { label: "AI ASSISTANT", sublabel: "Claude-powered" },
    { label: "PLATFORM ADMIN", sublabel: "multi-org oversight" },
  ],
  solutionFeatures: [
    {
      title: "Vendor Compliance Engine",
      description:
        "Insurance tracking, license verification, automated expiry alerts. The system knows which vendors are cleared to work before the first call goes out. Left-border status accents show compliance state at a glance.",
      tags: ["Insurance tracking", "Expiry alerts", "Status accents"],
    },
    {
      title: "AI Assistant",
      description:
        "Claude Sonnet-powered briefing and interactive chat on both admin and vendor dashboards. Ask about vendor status, compliance gaps, job history — the AI has full context across the platform.",
      tags: ["Claude Sonnet", "Interactive chat", "Full-context briefings"],
    },
    {
      title: "Multi-Tenant Platform Admin",
      description:
        "Purple-accented platform admin layer with organization onboarding wizard (7 steps including property upload), org selector filtering all pages, revenue tracking by org, and Stripe Connect OAuth.",
      tags: ["7-step onboarding", "Org selector", "Stripe Connect OAuth"],
    },
    {
      title: "KPI-Driven Dashboard",
      description:
        "KPI ticker strip on every page. Staggered Framer Motion animations. Left-border status accents on every card. The XeedlyAI design system applied across 30+ pages.",
      tags: ["KPI tickers", "Framer Motion", "30+ pages"],
    },
  ],
  stackTags: [
    "Next.js 16",
    "Supabase",
    "Stripe Connect",
    "Claude Sonnet",
    "Framer Motion",
    "Multi-Tenant",
    "Platform Admin",
    "Tailwind v4",
    "shadcn/ui",
  ],
  outcomeKpis: [
    { label: "AI", value: "Every Dashboard" },
    { label: "Pages", value: "30+", target: 30, format: (n) => `${Math.round(n)}+` },
    { label: "Admin", value: "Platform + Tenant" },
    { label: "Compliance", value: "Automated" },
    { label: "Design System", value: "Full XeedlyAI" },
  ],
  outcomeSignals: [
    {
      accent: "teal",
      title: "AI on every surface",
      body: "Claude-powered assistant available on both admin and vendor dashboards. Not a chatbot in the corner — a briefing engine integrated into the operational flow.",
    },
    {
      accent: "teal",
      title: "Platform admin layer",
      body: "Purple-accented admin controls for managing multiple organizations. Onboarding wizard, org selector, revenue tracking. Built for scale from day one.",
    },
    {
      accent: "teal",
      title: "Design system proof",
      body: "30+ pages with consistent KPI tickers, status accents, animations, and component patterns. PropertyJobz proved the XeedlyAI design system works at scale.",
    },
  ],
  intelligenceLayerText:
    "PropertyJobz generates the vendor compliance signals that Propertyolio will correlate with document operations data from PropertyDocz. A vendor's insurance expiring in PropertyJobz while three document requests are pending for the same community in PropertyDocz — that's a cross-system signal that no single product can detect alone. PropertyJobz is both a standalone vendor management platform and a critical event source for the intelligence layer.",
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
  PROPERTYDOCZ,
  PROPERTYJOBZ,
  SOVVRN,
  XEEDLY_PLATFORM,
];

export const CASE_STUDIES_BY_SLUG: Record<string, CaseStudy> = {
  pando: PANDO,
  "core-hoa": CORE_HOA,
  propertydocz: PROPERTYDOCZ,
  propertyjobz: PROPERTYJOBZ,
  sovvrn: SOVVRN,
  "xeedly-platform": XEEDLY_PLATFORM,
};

/** Slugs to show as the compact homepage preview. Rotate to spotlight the most
 * interesting active deployments without cluttering the home page. */
export const HOMEPAGE_PREVIEW_SLUGS = [
  "pando",
  "propertydocz",
  "sovvrn",
  "xeedly-platform",
] as const;

// ---------------------------------------------------------------------------
// Aggregate KPIs for the /case-studies overview hero ticker
// ---------------------------------------------------------------------------

export const OVERVIEW_KPIS: Kpi[] = [
  {
    label: "Deployments Shipped",
    value: "6",
    target: 6,
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
