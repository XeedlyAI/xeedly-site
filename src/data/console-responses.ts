import type { ConsoleAction } from "@/types/console-actions";
import { CONTACT } from "@/lib/contact";

export type BriefingSection = {
  title: string;
  icon?: string;
  body: string;
};

export type SignalSeverity = "high" | "medium" | "low";

export type SignalCard = {
  severity: SignalSeverity;
  title: string;
  body: string;
  source: string;
  time: string;
};

export type BriefingResponse = {
  type: "briefing";
  title: string;
  sections: BriefingSection[];
  actions?: ConsoleAction[];
};

export type SignalsResponse = {
  type: "signals";
  title: string;
  signals: SignalCard[];
  actions?: ConsoleAction[];
};

export type FreeformResponse = {
  type: "freeform";
  body: string;
  actions?: ConsoleAction[];
};

export type ConsoleResponse =
  | BriefingResponse
  | SignalsResponse
  | FreeformResponse;

export type ConsoleQuery = {
  id: string;
  label: string;
  response: ConsoleResponse;
};

export const CONSOLE_QUERIES: ConsoleQuery[] = [
  {
    id: "what-we-build",
    label: "What does XeedlyAI build?",
    response: {
      type: "briefing",
      title: "What XeedlyAI Builds",
      sections: [
        {
          title: "Core Capability",
          icon: "⚙️",
          body:
            "We build AI intelligence platforms and automated growth systems for operational businesses — not dashboards, not agencies. Software that replaces the work humans are doing slowly and expensively.",
        },
        {
          title: "Intelligence Platforms",
          icon: "🧠",
          body:
            "Sovvrn for restaurants (live — morning briefings, voice AI, command center). Propertyolio + PropertyDocz + PropertyJobz for property management (Core HOA onboarding — 40 associations). Pando for property investment (live — full agent-to-investor deal pipeline).",
        },
        {
          title: "Automated Growth Systems",
          icon: "🚀",
          body:
            "AI-powered marketing and operations automation — ad engines, SEO, voice AI, review management, payments. Replacing $5K–$10K/mo agency retainers at $297–$997/mo.",
        },
        {
          title: "The Through-Line",
          icon: "↘",
          body:
            "Both product lines are built on the same thesis: AI systems that replace human bottlenecks, deliver faster, cost less, and never sleep.",
        },
      ],
    },
  },
  {
    id: "signal-engine",
    label: "How does the signal engine work?",
    response: {
      type: "signals",
      title: "Live Signal Feed — Example Output",
      signals: [
        {
          severity: "high",
          title: "Cross-System Correlation Detected",
          body:
            "Vendor insurance lapsed (PropertyJobz) + 3 pending document requests for same community (PropertyDocz). Compliance exposure across systems.",
          source: "signal_engine",
          time: "Detected 2m ago via rule #CR-017",
        },
        {
          severity: "medium",
          title: "Revenue Anomaly Flagged",
          body:
            "Tuesday lunch revenue down 18% vs 4-week trend. Labor cost ratio inverted. Voice AI transcript shows 2 call-outs.",
          source: "sovvrn",
          time: "Morning briefing • 6:04 AM",
        },
        {
          severity: "low",
          title: "Onboarding Milestone",
          body:
            "Core HOA completed 40 association profiles. Document fulfillment pipeline fully automated.",
          source: "propertydocz",
          time: "Event processed 14m ago",
        },
      ],
    },
  },
  {
    id: "morning-briefing",
    label: "Show me a morning briefing",
    response: {
      type: "briefing",
      title: "Morning Briefing — Tuesday, April 15",
      sections: [
        {
          title: "Community Health",
          icon: "🏘",
          body:
            "3 communities flagged. Maple Ridge has 2 unresolved vendor compliance issues. Cedar Park annual meeting in 6 days — doc packages not yet ordered.",
        },
        {
          title: "Vendor & Compliance",
          icon: "🔧",
          body:
            "92% compliance across active vendors. 2 approaching insurance expiry. 1 new application pending review.",
        },
        {
          title: "Document Operations",
          icon: "📄",
          body:
            "7 packages fulfilled yesterday. Avg 2.1hr turnaround. $847 revenue. Agent Pro tier at 67% utilization.",
        },
        {
          title: "Today's Priorities",
          icon: "⚡",
          body:
            "Review Cedar Park vendor app. Send insurance reminders. Follow up Maple Ridge compliance gap. Prep annual meeting docs.",
        },
      ],
    },
  },
  {
    id: "growth-systems",
    label: "What are Growth Systems?",
    response: {
      type: "briefing",
      title: "Automated Growth Systems",
      sections: [
        {
          title: "What They Replace",
          icon: "🧹",
          body:
            "Traditional marketing agencies charge $3K–$10K/mo with long contracts, manual execution, and human bottlenecks. Growth Systems are AI-powered automation that runs 24/7 at a fraction of the cost.",
        },
        {
          title: "The Systems",
          icon: "🧩",
          body:
            "AI Ad Engine (Meta + Google). SEO Autopilot for automated content and ranking. AI Communication for voice + chat. Review Intelligence for solicitation and response. Payment Automation for text-to-pay and invoicing.",
        },
        {
          title: "Pricing",
          icon: "💳",
          body:
            "Three tiers — Starter $297/mo, Growth $597/mo, Scale $997/mo. Month-to-month. No long contracts.",
        },
        {
          title: "The Upgrade Path",
          icon: "↗",
          body:
            "Businesses that start with Growth Systems often discover they need the intelligence layer to connect all their data. Growth Systems are the entry point. Intelligence Platforms are the destination.",
        },
      ],
      actions: [
        {
          type: "calendar",
          label: "Book a Discovery Call",
          url: CONTACT.calendar,
          description: "30-minute call with Shad to map Growth Systems to your business",
        },
        {
          type: "contact_info",
          label: "Or reach us directly",
          email: CONTACT.email,
          phone: CONTACT.phone,
        },
      ],
    },
  },
  {
    id: "verticals",
    label: "What verticals can this work for?",
    response: {
      type: "briefing",
      title: "Verticals & Fit",
      sections: [
        {
          title: "Proven",
          icon: "✅",
          body:
            "Restaurants (Sovvrn — live at sovvrn.vercel.app), Property Management (Core HOA — onboarding PropertyDocz + PropertyJobz + Propertyolio), and Property Investment (Pando Midwest Investments — live at ownpando.com). Three verticals, same architecture, all in production.",
        },
        {
          title: "High-Fit Candidates",
          icon: "🎯",
          body:
            "Fleet management. Franchised retail. Multi-site healthcare. Construction and trades. Commercial real estate.",
        },
        {
          title: "Deployment Timeline",
          icon: "⏱",
          body:
            "Intelligence Platforms: 2–4 weeks core + 1–2 weeks per integration. Growth Systems: live within 72 hours — ad campaigns launching day one.",
        },
      ],
      actions: [
        {
          type: "calendar",
          label: "Explore your vertical",
          url: CONTACT.calendar,
          description: "Let's map the signal engine to your operation",
        },
      ],
    },
  },
  {
    id: "pricing",
    label: "What's the pricing?",
    response: {
      type: "briefing",
      title: "Pricing",
      sections: [
        {
          title: "Intelligence Deployment",
          icon: "🏗",
          body:
            "Most deployments land between $5K and $25K — a 2–4 week standup with signal rules, AI persona, and delivery channels configured for your vertical. Complex builds with 6+ integrations or multi-brand architectures can reach $35K–$50K.",
        },
        {
          title: "Managed Intelligence",
          icon: "🛠",
          body:
            "Most clients pay $500–$3K/mo for ongoing signal tuning, platform updates, and support. High-volume environments with 10+ integrations and daily adjustments: $5K–$7.5K/mo.",
        },
        {
          title: "Growth Systems",
          icon: "📈",
          body:
            "Starter $297/mo. Growth $597/mo. Scale $997/mo. AI-powered marketing automation, month-to-month.",
        },
        {
          title: "Product Licenses",
          icon: "🔑",
          body:
            "Sovvrn and Propertyolio as vertical SaaS. Per-location or per-org pricing, starting at $499/mo.",
        },
      ],
      actions: [
        {
          type: "calendar",
          label: "Book a pricing conversation",
          url: CONTACT.calendar,
          description: "We'll scope the right tier for your operation",
        },
        {
          type: "contact_info",
          label: "Or reach us directly",
          email: CONTACT.email,
          phone: CONTACT.phone,
        },
      ],
    },
  },
];
