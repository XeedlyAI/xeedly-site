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
  recommended?: boolean;
};

const TIERS: Tier[] = [
  {
    name: "Starter",
    price: "$297",
    tagline: "Single-location operators getting started with AI marketing.",
    features: [
      "AI Ad Engine — 1 platform (Meta or Google)",
      "AI Chat Agent (website + SMS)",
      "Review Intelligence & auto-response",
      "Monthly AI briefing",
      "Email support",
    ],
    tag: "Most Popular for Single Locations",
  },
  {
    name: "Growth",
    price: "$597",
    tagline: "Growing businesses ready to automate the full agency stack.",
    features: [
      "AI Ads on Meta + Google",
      "Voice AI + Chat AI agents",
      "SEO Autopilot (content + local)",
      "Review + Reputation automation",
      "Payment Automation + smart follow-ups",
      "Weekly AI briefing",
      "Priority support",
    ],
    tag: "Best for Growing Businesses",
    recommended: true,
  },
  {
    name: "Scale",
    price: "$997",
    tagline: "Multi-unit operators running serious volume.",
    features: [
      "Everything in Growth",
      "Multi-location support (up to 10)",
      "Custom AI voice persona",
      "Cross-location campaign coordination",
      "Dedicated success manager",
      "Custom integrations",
    ],
    tag: "Built for Multi-Unit Operators",
  },
];

export function GrowthTiers() {
  return (
    <div>
      <div className="text-center mb-10">
        <div className="text-[10px] font-mono font-semibold uppercase tracking-[0.15em] text-[#64748b]">
          Automated Growth Systems
        </div>
        <h2
          className="mt-3 font-bold tracking-tight text-[#0f172a]"
          style={{ fontSize: "clamp(1.5rem, 2.8vw, 1.875rem)" }}
        >
          Replace your agency. <span className="text-[#38b6ff]">Keep the results.</span>
        </h2>
        <p className="mt-4 text-[14px] text-[#334155] max-w-2xl mx-auto leading-[1.7]">
          Month-to-month. No 6-month contracts. Cancel anytime. Traditional
          agencies charge{" "}
          <span className="font-mono font-semibold">$3,000–$10,000/mo</span> for
          the same work.
        </p>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
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
              "dash-card p-7 relative overflow-hidden flex flex-col",
              t.recommended &&
                "md:-translate-y-2 shadow-md ring-1 ring-[#38b6ff]/25",
            )}
          >
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
              <span className="font-mono text-[32px] font-bold text-[#0f172a] tabular-nums">
                {t.price}
              </span>
              <span className="text-[14px] text-[#64748b]">/mo</span>
            </div>
            <p className="mt-2 text-[12.5px] text-[#64748b] leading-[1.55]">
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
            <div className="mt-6 inline-flex font-mono text-[10px] px-2.5 py-1 rounded-full bg-[#f1f5f9] text-[#64748b] self-start">
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
        ))}
      </motion.div>

      <p className="mt-10 text-center text-[13px] text-[#64748b] italic max-w-2xl mx-auto">
        Founding member pricing available for the first 5 customers in each
        vertical — approximately 50% off.
      </p>
    </div>
  );
}
