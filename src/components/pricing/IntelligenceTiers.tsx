"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

type Tier = {
  name: string;
  price: string;
  unit: string;
  tagline: string;
  features: string[];
  accent: "teal" | "blue" | "purple";
};

const TIERS: Tier[] = [
  {
    name: "Intelligence Deployment",
    price: "$25K–$75K",
    unit: "one-time",
    tagline:
      "We deploy an intelligence platform for your vertical. Event bus, signal engine, delivery layer — configured to your data sources.",
    features: [
      "Vertical discovery & signal mapping",
      "Data source integrations (POS, CRM, docs, field systems)",
      "Custom signal rules & AI persona",
      "Morning briefing + alert channels",
      "2–4 week standup",
    ],
    accent: "blue",
  },
  {
    name: "Managed Intelligence",
    price: "$2K–$8K",
    unit: "/mo",
    tagline:
      "Ongoing operation of your intelligence platform. Claude API, event ingestion, signal tuning, and platform upkeep.",
    features: [
      "Claude API usage (included up to tier)",
      "Event ingestion & retention",
      "Signal rule tuning as the business evolves",
      "Quarterly business review",
      "Priority escalation",
    ],
    accent: "teal",
  },
  {
    name: "Product Licenses",
    price: "Custom",
    unit: "",
    tagline:
      "Use our deployed products directly: Sovvrn (restaurants), Propertyolio + PropertyDocz + PropertyJobz (property management).",
    features: [
      "Per-location or per-door pricing",
      "Fully hosted, nothing to deploy",
      "Ongoing product updates included",
      "Claude-powered briefings & chat",
      "Starts at $499/mo per location",
    ],
    accent: "purple",
  },
];

const ACCENT: Record<Tier["accent"], { bar: string; chip: string; chipText: string }> = {
  teal: { bar: "bg-[#14b8a6]", chip: "bg-[#14b8a6]/10", chipText: "text-[#0d9488]" },
  blue: { bar: "bg-[#38b6ff]", chip: "bg-[#38b6ff]/10", chipText: "text-[#0A8FD4]" },
  purple: { bar: "bg-[#8b5cf6]", chip: "bg-[#8b5cf6]/10", chipText: "text-[#7c3aed]" },
};

export function IntelligenceTiers() {
  return (
    <div>
      <div className="text-center mb-10">
        <div className="text-[10px] font-mono font-semibold uppercase tracking-[0.15em] text-[#64748b]">
          Intelligence Platforms
        </div>
        <h2
          className="mt-3 font-bold tracking-tight text-[#0f172a]"
          style={{ fontSize: "clamp(1.5rem, 2.8vw, 1.875rem)" }}
        >
          Deploy once. <span className="text-[#38b6ff]">Operate forever.</span>
        </h2>
        <p className="mt-4 text-[14px] text-[#334155] max-w-2xl mx-auto leading-[1.7]">
          Intelligence platforms are a capability, not a SaaS tier. We deploy
          the platform, tune the signals, and run it with you.
        </p>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        className="grid grid-cols-1 md:grid-cols-3 gap-5"
      >
        {TIERS.map((t) => {
          const a = ACCENT[t.accent];
          return (
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
              className="dash-card p-7 relative overflow-hidden flex flex-col"
            >
              <div aria-hidden className={`absolute left-0 right-0 top-0 h-[2px] ${a.bar}`} />
              <div className="text-[12px] font-semibold text-[#334155]">
                {t.name}
              </div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="font-mono text-[28px] font-bold text-[#0f172a] tabular-nums">
                  {t.price}
                </span>
                {t.unit && (
                  <span className="text-[14px] text-[#64748b]">{t.unit}</span>
                )}
              </div>
              <p className="mt-3 text-[13px] text-[#334155] leading-[1.6]">
                {t.tagline}
              </p>
              <ul className="mt-5 space-y-1.5 flex-1">
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
                className={`mt-6 inline-flex font-mono text-[10px] font-semibold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full ${a.chip} ${a.chipText} self-start`}
              >
                {t.accent === "blue" ? "Deployment" : t.accent === "teal" ? "Managed" : "Licensed"}
              </div>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center justify-center px-5 py-3 rounded-lg text-[13px] font-semibold transition-all bg-[#0f172a] hover:bg-[#1e293b] text-white"
              >
                Talk to Us
              </Link>
              <p className="mt-2 text-[10px] text-[#94a3b8] text-center leading-[1.5]">
                By signing up, you agree to our{" "}
                <Link href="/terms" className="text-[#0A8FD4] hover:text-[#38b6ff] underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-[#0A8FD4] hover:text-[#38b6ff] underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
