"use client";

import { motion } from "framer-motion";
import { KpiTicker } from "@/components/layout/KpiTicker";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

type Tier = {
  label: string;
  accent: string;
  title: string;
  time: string;
  body: string;
  visual: ReactNode;
};

function BrowserFrame({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl overflow-hidden border border-[#e2e8f0] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
      <div className="h-8 bg-[#FAFAFA] border-b border-[#e2e8f0] flex items-center gap-1.5 px-3">
        <span className="w-2.5 h-2.5 rounded-full bg-[#fca5a5]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#fcd34d]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#86efac]" />
        <span className="ml-3 font-mono text-[10px] text-[#94a3b8]">
          xeedly.com / platform
        </span>
      </div>
      <div>{children}</div>
    </div>
  );
}

function BriefingMock() {
  const sections = [
    {
      icon: "🏘",
      title: "Community Health",
      body:
        "3 communities flagged. Maple Ridge has 2 unresolved vendor compliance issues.",
    },
    {
      icon: "🔧",
      title: "Vendor & Compliance",
      body: "92% compliance. 2 vendors approaching insurance expiry.",
    },
    {
      icon: "⚡",
      title: "Today's Priorities",
      body:
        "Review Cedar Park vendor app. Send insurance reminders. Prep annual meeting docs.",
    },
  ];
  return (
    <div className="p-5 bg-white rounded-xl border border-[#e2e8f0]">
      <div className="font-mono text-[12px] text-[#0f172a] font-semibold">
        <span className="text-[#38b6ff]">▸</span> Morning Briefing — Tuesday,
        April 15
      </div>
      <div className="mt-3 space-y-2.5">
        {sections.map((s, i) => (
          <div key={i} className="status-info p-3 rounded-lg bg-[#FAFAFA]">
            <div className="flex items-center gap-2">
              <span className="text-[13px]">{s.icon}</span>
              <span className="text-[11px] font-semibold text-[#38b6ff]">
                {s.title}
              </span>
            </div>
            <p className="mt-1.5 text-[12px] leading-[1.55] text-[#334155]">
              {s.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function DeepMock() {
  return (
    <div className="p-5 bg-white rounded-xl border border-[#e2e8f0]">
      <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#8b5cf6] mb-3">
        Intelligence Console
      </div>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {[
          "How does the signal engine work?",
          "Show me a morning briefing",
          "What's the pricing?",
        ].map((q, i) => (
          <span
            key={i}
            className={cn(
              "px-2.5 py-1 rounded-full text-[10px] border",
              i === 0
                ? "bg-[#38b6ff]/10 border-[#38b6ff]/30 text-[#0A8FD4]"
                : "bg-white border-[#e2e8f0] text-[#64748b]",
            )}
          >
            {q}
          </span>
        ))}
      </div>
      <div className="space-y-2">
        <div
          className="p-3 rounded-lg bg-[#FAFAFA]"
          style={{ borderLeft: "3px solid #f59e0b" }}
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
            <span className="text-[11px] font-semibold text-[#0f172a]">
              Cross-System Correlation Detected
            </span>
          </div>
          <p className="mt-1 text-[11px] text-[#334155]">
            Vendor insurance lapsed + 3 pending doc requests, same community.
          </p>
        </div>
        <div
          className="p-3 rounded-lg bg-[#FAFAFA]"
          style={{ borderLeft: "3px solid #3b82f6" }}
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]" />
            <span className="text-[11px] font-semibold text-[#0f172a]">
              Revenue Anomaly Flagged
            </span>
          </div>
          <p className="mt-1 text-[11px] text-[#334155]">
            Tuesday lunch revenue down 18% vs 4-week trend.
          </p>
        </div>
      </div>
    </div>
  );
}

const TIERS: Tier[] = [
  {
    label: "GLANCE",
    accent: "#14b8a6",
    title: "KPI Tickers",
    time: "0–5 seconds",
    body:
      "Operational metrics always visible, no clicks required. The ticker appears on every surface, every device, every context. It's the ambient awareness layer.",
    visual: (
      <BrowserFrame>
        <KpiTicker variant="light" />
      </BrowserFrame>
    ),
  },
  {
    label: "BRIEFING",
    accent: "#38b6ff",
    title: "AI Morning Briefing",
    time: "5–60 seconds",
    body:
      "A proactive summary of what happened overnight and what needs attention today. Categorized insights, priority actions, cross-system correlations — delivered to email, SMS, Slack, or Teams.",
    visual: <BriefingMock />,
  },
  {
    label: "DEEP",
    accent: "#8b5cf6",
    title: "Signal Feed + AI Concierge",
    time: "1–5 minutes",
    body:
      "The investigative layer. Live signal feed, entity drilldowns, and the Intelligence Console for freeform queries. When the briefing surfaces a pattern, this is where you dig.",
    visual: <DeepMock />,
  },
];

export function ThreeTiersDeep() {
  return (
    <section className="section-blue-wash py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-14"
        >
          <h2
            className="font-bold tracking-tight text-[#0f172a]"
            style={{ fontSize: "clamp(1.75rem, 3.2vw, 2rem)" }}
          >
            Three depths of intelligence
          </h2>
        </motion.div>

        <div className="space-y-16 md:space-y-24">
          {TIERS.map((tier, i) => {
            const reverse = i % 2 === 1;
            return (
              <motion.div
                key={tier.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: EASE }}
                className={cn(
                  "grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center",
                )}
              >
                <div className={cn(reverse && "md:order-2")}>
                  <div className="dash-card p-7 relative overflow-hidden">
                    <div
                      aria-hidden
                      className="absolute left-0 right-0 top-0 h-[2px]"
                      style={{ background: tier.accent }}
                    />
                    <div className="flex items-baseline justify-between gap-3">
                      <span
                        className="font-mono text-[12px] font-bold tracking-[0.14em]"
                        style={{ color: tier.accent }}
                      >
                        {tier.label}
                      </span>
                      <span className="font-mono text-[11px] text-[#64748b]">
                        {tier.time}
                      </span>
                    </div>
                    <h3 className="mt-3 text-[20px] font-bold text-[#0f172a]">
                      {tier.title}
                    </h3>
                    <p className="mt-3 text-[13px] leading-[1.65] text-[#334155]">
                      {tier.body}
                    </p>
                  </div>
                </div>
                <div className={cn(reverse && "md:order-1")}>{tier.visual}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
