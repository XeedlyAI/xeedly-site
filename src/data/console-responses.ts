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
            "Sovvrn for restaurants (live — morning briefings, voice AI, command center). PropertyDocz (document operations) and PropertyJobz (vendor management) for property management — both shipping as XeedlyAI products, Core HOA is the first client on both. Propertyolio intelligence layer in build to correlate across the two. Pando for property investment (live — full agent-to-investor deal pipeline).",
        },
        {
          title: "Automated Growth Systems",
          icon: "🚀",
          body:
            "AI SEO, Google Business Profile, voice AI, chat agents, review intelligence, and AI-generated blogging. Three ongoing plans — Maintain ($199/mo), Get Found ($299/mo), Get Chosen ($499/mo). All start with a Digital Foundation build.",
        },
        {
          title: "The Through-Line",
          icon: "↘",
          body:
            "Both product lines exist for one reason: to build businesses that run without you in the middle of everything. Not so you can step away — so you can lead, be present, and focus on what matters most. The business is the catalyst. Not the cage.",
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
    id: "revenue-streams",
    label: "Revenue I'm leaving on the table?",
    response: {
      type: "briefing",
      title: "Revenue Streams You're Not Capturing",
      sections: [
        {
          title: "Document Revenue — Currently Walking Out the Door",
          icon: "📄",
          body:
            "Every resale certificate, refinance package, and status letter your communities generate is revenue. Right now, companies like CondoCerts and HomewiseDocs fulfill those documents — they control the pricing, the timeline, and they keep the lion's share of the money. You do the data work. They cash the check. PropertyDocz brings the entire process in-house. You set the prices. You keep the revenue. The AI handles the document generation. Setup: $500.",
        },
        {
          title: "Vendor Marketplace — Revenue From Work You Already Manage",
          icon: "🔧",
          body:
            "You already manage vendor relationships for your communities. You already verify insurance and track compliance. PropertyJobz turns that existing work into a structured marketplace where vendors pay for verified access to your communities. It's not a toll booth — it's a managed program with real value: compliance tracking, preferred status, job matching. Vendors pay because your system is worth paying for. Setup: $500.",
        },
        {
          title: "The Math",
          icon: "💰",
          body:
            "A management company with 30+ communities processing document requests at market rates of $150–$350 per package is looking at significant annual revenue — revenue that's currently flowing to a third party. Add vendor marketplace subscriptions on top of that, and you've created two independent income streams from work you're already doing. Combined setup: $1,000. No monthly platform fees. We only earn when you earn.",
        },
        {
          title: "Zero Risk",
          icon: "⚡",
          body:
            "No monthly software fees. No long-term contracts. Revenue-share model means our incentives are aligned — we built the platform, we maintain it, we only succeed when you succeed. $500 per app to set up, or $1,000 for both. The revenue starts flowing with your first document order and your first vendor enrollment.",
        },
        {
          title: "Why This Matters",
          icon: "↗",
          body:
            "More revenue from the work you're already doing means more margin in your business — and more margin means more freedom in your life. The point isn't bigger. The point is a business that runs without you in the middle of everything, so you can lead the company instead of just operating it.",
        },
      ],
      actions: [
        {
          type: "calendar",
          label: "See how it works for your company",
          url: CONTACT.calendar,
          description: "30-minute call — we'll map your revenue opportunity",
        },
        {
          type: "contact_info",
          label: "Quick questions",
          email: CONTACT.email,
          phone: CONTACT.phone,
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
          title: "It Starts With the Website",
          icon: "🧱",
          body:
            "Every growth path begins with a Digital Foundation — your website built as a structured data layer, not a brochure. $2,500 one-time, includes 9 SEO-optimized blog articles and a content strategy. From there, you choose how it grows.",
        },
        {
          title: "Get Found — $299/mo",
          icon: "🔍",
          body:
            "The systems that make local businesses discoverable. AI-powered SEO, Google Business Profile optimization, local directory listings, review generation automation, AI chat agent, and monthly blogging. You show up when people search. You respond when they reach out.",
        },
        {
          title: "Get Chosen — $499/mo",
          icon: "⭐",
          body:
            "Everything in Get Found plus the systems that convert visitors into customers who stay. AI voice agent that answers every call, review response management, 3x monthly blogging, agentic website features with Intelligence Console, and a dedicated monthly strategy review. You don't just get found — you become the obvious choice.",
        },
        {
          title: "Operations IS Marketing",
          icon: "🔄",
          body:
            "The businesses that grow aren't the ones with the biggest ad budget. They're the ones where operations are so dialed in that customers come back and bring others. Our growth systems don't just generate leads — they make your business easy to find, fast to respond, and impossible to forget. That's not marketing. That's operational excellence. And it compounds — into margin, into freedom, into the kind of business that runs without you in the middle of everything.",
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
            "Restaurants (Sovvrn — live at sovvrn.vercel.app). Property Management (PropertyDocz + PropertyJobz shipping as XeedlyAI products). HOA Operations (Core HOA — first client on PropertyDocz + PropertyJobz, running 40+ communities). Property Investment (Pando Midwest Investments — live at ownpando.com). SaaS Infrastructure (XeedlyAI platform itself — event bus, signal engine, AI delivery layer). Five verticals, same architecture, all in production.",
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
          title: "Growth Systems",
          icon: "📈",
          body:
            "Three ongoing plans after your Digital Foundation is built. Maintain at $199/mo keeps the lights on. Get Found at $299/mo adds SEO, reviews, GBP, and AI chat. Get Chosen at $499/mo adds voice AI, agentic website features, 3x blogging, and strategy reviews. All month-to-month, no contracts.",
        },
        {
          title: "Digital Foundation",
          icon: "🏗",
          body:
            "AI-powered website with data layer architecture. $2,500 one-time + $199/mo maintenance. Modern infrastructure, multi-tenant ready, built in 2 weeks. This is where most businesses start.",
        },
        {
          title: "Operational Systems",
          icon: "⚙️",
          body:
            "Custom software automating one business process. $4K–$7K for most builds + $199/mo maintenance. AI assistant built in, multi-tenant, delivered in 3–6 weeks.",
        },
        {
          title: "Intelligence Platforms",
          icon: "🧠",
          body:
            "Full intelligence deployment: $5K–$25K for most builds. Managed intelligence: $495–$995/mo. Event bus, signal engine, AI briefings, multi-channel delivery.",
        },
        {
          title: "Property Products",
          icon: "🏘",
          body:
            "For HOA management companies: PropertyDocz (document fulfillment) and PropertyJobz (vendor management) are available with a $500 setup fee each (limited-time launch pricing, normally $1,500). No monthly platform fees — both run on a revenue-share model aligned with your success. Deploy both together for $1,000 combined setup.",
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
