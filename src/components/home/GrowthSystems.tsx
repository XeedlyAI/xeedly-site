"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

type Tier = {
  name: string;
  price: string;
  features: string[];
  tag: string;
  recommended?: boolean;
};

const TIERS: Tier[] = [
  {
    name: "Starter",
    price: "$297",
    features: [
      "AI Ad Engine (1 platform)",
      "AI Chat Agent",
      "Review Intelligence",
    ],
    tag: "Most Popular for Single Locations",
  },
  {
    name: "Growth",
    price: "$597",
    features: [
      "AI Ads (Meta + Google)",
      "Voice + Chat AI",
      "SEO Autopilot",
      "Payment Automation",
    ],
    tag: "Best for Growing Businesses",
    recommended: true,
  },
  {
    name: "Scale",
    price: "$997",
    features: [
      "Everything in Growth",
      "Multi-location support",
      "Custom AI voice persona",
      "Weekly AI briefing",
    ],
    tag: "Built for Multi-Unit Operators",
  },
];

export function GrowthSystems() {
  return (
    <section className="section-warm-wash py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-14"
        >
          <div className="text-[10px] font-mono font-semibold uppercase tracking-[0.15em] text-[#64748b]">
            Automated Growth Systems
          </div>
          <h2
            className="mt-3 font-bold tracking-tight text-[#0f172a]"
            style={{ fontSize: "clamp(1.75rem, 3.2vw, 2rem)" }}
          >
            Agency-grade marketing.{" "}
            <span className="text-[#38b6ff]">AI-powered pricing.</span>
          </h2>
          <p className="mt-4 text-[14px] text-[#334155] max-w-2xl mx-auto">
            Everything a traditional agency charges $5,000–$10,000/mo for —
            automated, always-on, and starting at{" "}
            <span className="font-mono font-semibold">$297/mo</span>.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {TIERS.map((t) => (
            <motion.div
              key={t.name}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: EASE },
                },
              }}
              className={cn(
                "dash-card p-7 relative overflow-hidden",
                t.recommended && "md:-translate-y-2 shadow-md ring-1 ring-[#38b6ff]/25",
              )}
            >
              {/* Top accent bar */}
              <div
                aria-hidden
                className="absolute left-0 right-0 top-0 h-[2px] bg-[#38b6ff]"
              />
              {t.recommended && (
                <span className="absolute top-3 right-3 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] px-2 py-1 rounded-full bg-[#38b6ff]/10 text-[#0A8FD4]">
                  Recommended
                </span>
              )}
              <div className="text-[12px] font-semibold text-[#334155]">
                {t.name}
              </div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="font-mono text-[28px] font-bold text-[#0f172a] tabular-nums">
                  {t.price}
                </span>
                <span className="text-[14px] text-[#64748b]">/mo</span>
              </div>
              <ul className="mt-5 space-y-1.5">
                {t.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-[13px] text-[#334155] leading-[1.55]"
                  >
                    <span className="text-[#14b8a6] font-mono text-[12px] mt-[2px]">
                      —
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 inline-flex font-mono text-[10px] px-2.5 py-1 rounded-full bg-[#f1f5f9] text-[#64748b]">
                {t.tag}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="mt-12 text-center"
        >
          <p className="text-[13px] text-[#64748b] italic max-w-2xl mx-auto">
            Traditional marketing agency: $3,000–$10,000/mo with 6-month
            contracts. XeedlyAI Growth Systems: $297–$997/mo, month-to-month,
            AI that never sleeps.
          </p>
          <Link
            href="/pricing"
            className="mt-5 inline-flex items-center gap-1 text-[13px] font-semibold text-[#0A8FD4] hover:text-[#38b6ff] transition-colors"
          >
            See full pricing and features →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
