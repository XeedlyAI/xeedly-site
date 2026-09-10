"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CONTACT } from "@/lib/contact";

const EASE = [0.16, 1, 0.3, 1] as const;

type Tier = {
  name: string;
  price: string;
  tagline: string;
  features: string[];
  tag: string;
  accent: "blue-light" | "teal" | "primary";
  recommended?: boolean;
};

const TIERS: Tier[] = [
  {
    name: "Maintain",
    price: "$199",
    tagline:
      "Keep the lights on. Hosting, maintenance, and basic support for your Digital Foundation. For businesses handling their own marketing.",
    features: [
      "Website hosting & SSL",
      "Platform maintenance & security updates",
      "1 website edit per month",
      "Email support",
      "Uptime monitoring",
    ],
    tag: "Maintain",
    accent: "blue-light",
  },
  {
    name: "Get Found",
    price: "$299",
    tagline:
      "Everything in Maintain plus the systems that make local businesses discoverable. SEO, reviews, and AI chat — the foundation of being found when it matters.",
    features: [
      "Everything in Maintain",
      "SEO + AI SEO (Core 30 keyword strategy, buyer persona targeting)",
      "Google Business Profile setup + optimization",
      "10+ local directory listings",
      "Review generation automation (SMS-based)",
      "AI Chat Agent on website",
      "SMS & email follow-up automations",
      "1 blog post per month (AI-generated, SEO-optimized)",
    ],
    tag: "Get Found",
    accent: "teal",
    recommended: true,
  },
  {
    name: "Get Chosen",
    price: "$499",
    tagline:
      "Everything in Get Found plus the systems that convert and retain. Voice AI, review management, agentic website features, and strategic guidance. You don't just get found — you become the obvious choice.",
    features: [
      "Everything in Get Found",
      "AI Voice Agent (missed call text-back, 24/7 answering, appointment booking)",
      "Review response management (AI-generated responses in your brand voice)",
      "Monthly blogging (3x/mo, AI-generated, SEO-optimized)",
      "Agentic website features (Intelligence Console, interactive data layer)",
      "Dedicated monthly strategy review",
      "Priority support",
    ],
    tag: "Get Chosen",
    accent: "primary",
  },
];

const ACCENT: Record<Tier["accent"], { border: string; tagBg: string; tagText: string }> = {
  "blue-light": {
    border: "#3b82f6",
    tagBg: "rgba(59,130,246,0.10)",
    tagText: "#1d4ed8",
  },
  teal: {
    border: "#14b8a6",
    tagBg: "rgba(20,184,166,0.10)",
    tagText: "#0d9488",
  },
  primary: {
    border: "#38b6ff",
    tagBg: "rgba(56,182,255,0.12)",
    tagText: "#0A8FD4",
  },
};

export function GrowthTiers() {
  return (
    <div>
      <div className="text-center mb-10">
        <div className="text-[10px] font-mono font-semibold uppercase tracking-[0.15em] text-[#64748b]">
          Ongoing Plans
        </div>
        <h2
          className="mt-3 font-bold tracking-tight text-[#0f172a]"
          style={{ fontSize: "clamp(1.5rem, 2.8vw, 1.875rem)" }}
        >
          Your website is built.{" "}
          <span className="text-[#38b6ff]">Now choose how it grows.</span>
        </h2>
        <p className="mt-4 text-[14px] text-[#334155] max-w-2xl mx-auto leading-[1.7]">
          Every Digital Foundation client picks an ongoing plan. Maintain keeps
          the lights on. Get Found makes you discoverable. Get Chosen makes you
          the obvious choice.
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
          const accent = ACCENT[t.accent];
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
              className={cn(
                "dash-card p-7 relative overflow-hidden flex flex-col",
                t.recommended &&
                  "md:-translate-y-2 shadow-md ring-1 ring-[#14b8a6]/30",
              )}
              style={{ borderLeft: `3px solid ${accent.border}` }}
            >
              {t.recommended && (
                <span
                  className="absolute top-3 right-3 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] px-2 py-1 rounded-full"
                  style={{ background: accent.tagBg, color: accent.tagText }}
                >
                  Most Popular
                </span>
              )}
              <div className="text-[12px] font-semibold text-[#334155]">
                {t.name}
              </div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="font-mono text-[32px] font-bold text-[#0f172a] tabular-nums">
                  {t.price}
                </span>
                <span className="text-[14px] text-[#64748b]">/mo</span>
              </div>
              <p className="mt-3 text-[12.5px] text-[#64748b] leading-[1.6]">
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
                className="mt-6 inline-flex font-mono text-[10px] font-semibold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full self-start"
                style={{ background: accent.tagBg, color: accent.tagText }}
              >
                {t.tag}
              </div>
              <a
                href={CONTACT.calendar}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "mt-6 inline-flex items-center justify-center px-5 py-3 rounded-lg text-[13px] font-semibold transition-all",
                  t.recommended
                    ? "bg-[#38b6ff] hover:bg-[#0A8FD4] text-[#0f172a]"
                    : "bg-[#0f172a] hover:bg-[#1e293b] text-white",
                )}
              >
                Get Started
              </a>
              <Link
                href="/contact"
                className="mt-2 text-[11px] text-[#0A8FD4] hover:text-[#38b6ff] text-center transition-colors"
              >
                Or send a message →
              </Link>
              <p className="mt-2 text-[10px] text-[#94a3b8] text-center leading-[1.5]">
                By signing up, you agree to our{" "}
                <Link
                  href="/terms"
                  className="text-[#0A8FD4] hover:text-[#38b6ff] underline"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-[#0A8FD4] hover:text-[#38b6ff] underline"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </motion.div>
          );
        })}
      </motion.div>

      <p className="mt-10 text-center text-[13px] text-[#64748b] italic max-w-2xl mx-auto leading-[1.6]">
        All plans include hosting and maintenance. Get Found and Get Chosen
        replace the Maintain plan — they don&apos;t stack on top.
      </p>
    </div>
  );
}
