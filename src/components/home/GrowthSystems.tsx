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
  accent: { border: string; tagBg: string; tagText: string };
  recommended?: boolean;
};

const TIERS: Tier[] = [
  {
    name: "Maintain",
    price: "$199",
    features: [
      "Hosting, SSL, security updates",
      "1 website edit per month",
      "Uptime monitoring + email support",
    ],
    tag: "For DIY marketers",
    accent: {
      border: "#3b82f6",
      tagBg: "rgba(59,130,246,0.10)",
      tagText: "#1d4ed8",
    },
  },
  {
    name: "Get Found",
    price: "$299",
    features: [
      "Everything in Maintain",
      "AI SEO + Google Business Profile",
      "Review generation + AI chat agent",
      "1 SEO blog post / month",
    ],
    tag: "Most Popular",
    accent: {
      border: "#14b8a6",
      tagBg: "rgba(20,184,166,0.10)",
      tagText: "#0d9488",
    },
    recommended: true,
  },
  {
    name: "Get Chosen",
    price: "$499",
    features: [
      "Everything in Get Found",
      "AI Voice Agent + review responses",
      "3 blog posts / month + agentic site",
      "Monthly strategy review",
    ],
    tag: "Be the obvious choice",
    accent: {
      border: "#38b6ff",
      tagBg: "rgba(56,182,255,0.12)",
      tagText: "#0A8FD4",
    },
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
            Growth Systems
          </div>
          <h2
            className="mt-3 font-bold tracking-tight text-[#0f172a]"
            style={{ fontSize: "clamp(1.75rem, 3.2vw, 2rem)" }}
          >
            Your website is step one.{" "}
            <span className="text-[#38b6ff]">Growth is step two.</span>
          </h2>
          <p className="mt-4 text-[14px] text-[#334155] max-w-2xl mx-auto leading-[1.7]">
            Every path starts with a Digital Foundation. Then choose how it
            grows — from basic maintenance to full AI-powered growth systems.
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
                t.recommended &&
                  "md:-translate-y-2 shadow-md ring-1 ring-[#14b8a6]/30",
              )}
              style={{ borderLeft: `3px solid ${t.accent.border}` }}
            >
              {t.recommended && (
                <span
                  className="absolute top-3 right-3 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] px-2 py-1 rounded-full"
                  style={{
                    background: t.accent.tagBg,
                    color: t.accent.tagText,
                  }}
                >
                  Most Popular
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
              <div
                className="mt-6 inline-flex font-mono text-[10px] font-semibold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full"
                style={{
                  background: t.accent.tagBg,
                  color: t.accent.tagText,
                }}
              >
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
          <p className="text-[13px] text-[#64748b] italic max-w-2xl mx-auto leading-[1.65]">
            Traditional SEO agency: $1,500–$3,000/mo with 6-month contracts.
            XeedlyAI Growth Systems: $299–$499/mo, month-to-month, AI-powered.
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
