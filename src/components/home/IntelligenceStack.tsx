"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

type Tier = {
  id: string;
  name: string;
  accent: string;
  accentTint: string;
  time: string;
  description: string;
};

const TIERS: Tier[] = [
  {
    id: "glance",
    name: "GLANCE",
    accent: "#14b8a6",
    accentTint: "rgba(20,184,166,0.06)",
    time: "0–5 seconds",
    description:
      "KPI Tickers across every surface. Live operational metrics at a glance — no clicks, no logins, no dashboards.",
  },
  {
    id: "briefing",
    name: "BRIEFING",
    accent: "#38b6ff",
    accentTint: "rgba(56,182,255,0.06)",
    time: "5–60 seconds",
    description:
      "AI-generated morning briefings with coaching voice. Categorized insights, priority actions, cross-system correlations delivered proactively.",
  },
  {
    id: "deep",
    name: "DEEP",
    accent: "#8b5cf6",
    accentTint: "rgba(139,92,246,0.06)",
    time: "1–5 minutes",
    description:
      "Signal feed, entity drilldowns, and AI concierge for freeform queries. Full investigative capability when you need to dig.",
  },
];

export function IntelligenceStack() {
  const [activeId, setActiveId] = useState("briefing");

  return (
    <section className="section-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-14"
        >
          <div className="text-[10px] font-mono font-semibold uppercase tracking-[0.15em] text-[#64748b]">
            The Intelligence Stack
          </div>
          <h2
            className="mt-3 font-bold tracking-tight text-[#0f172a]"
            style={{ fontSize: "clamp(1.75rem, 3.2vw, 2rem)" }}
          >
            Three tiers. Zero noise.
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {TIERS.map((tier) => {
            const active = tier.id === activeId;
            return (
              <motion.button
                key={tier.id}
                type="button"
                onClick={() => setActiveId(tier.id)}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: EASE },
                  },
                }}
                className={cn(
                  "dash-card text-left p-6 md:p-7 min-w-[220px] relative overflow-hidden",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38b6ff]/40",
                )}
                style={{
                  background: active ? tier.accentTint : "#ffffff",
                }}
              >
                {/* Top 2px accent bar */}
                <div
                  aria-hidden
                  className="absolute left-0 right-0 top-0 h-[2px]"
                  style={{ background: tier.accent }}
                />
                <div className="flex items-baseline justify-between gap-3">
                  <span
                    className="font-mono text-[13px] font-bold tracking-[0.08em]"
                    style={{ color: tier.accent }}
                  >
                    {tier.name}
                  </span>
                  <span className="font-mono text-[11px] text-[#64748b]">
                    {tier.time}
                  </span>
                </div>
                <p className="mt-3 text-[13px] leading-[1.55] text-[#334155]">
                  {tier.description}
                </p>
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
