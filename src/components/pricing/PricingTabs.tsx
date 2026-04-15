"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { GrowthTiers } from "./GrowthTiers";
import { IntelligenceTiers } from "./IntelligenceTiers";

const EASE = [0.16, 1, 0.3, 1] as const;

type Tab = "growth" | "intelligence";

export function PricingTabs() {
  const [tab, setTab] = useState<Tab>("growth");

  return (
    <section className="section-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-12">
          <div
            role="tablist"
            aria-label="Pricing category"
            className="inline-flex p-1 rounded-full bg-[#f1f5f9] border border-[#e2e8f0]"
          >
            {(
              [
                { id: "growth", label: "Automated Growth Systems" },
                { id: "intelligence", label: "Intelligence Platforms" },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  "relative px-5 md:px-6 py-2.5 text-[13px] font-semibold rounded-full transition-colors",
                  tab === t.id ? "text-white" : "text-[#334155] hover:text-[#0f172a]",
                )}
              >
                {tab === t.id && (
                  <motion.span
                    layoutId="tab-bg"
                    transition={{ duration: 0.4, ease: EASE }}
                    className="absolute inset-0 rounded-full bg-[#0f172a]"
                  />
                )}
                <span className="relative">{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            {tab === "growth" ? <GrowthTiers /> : <IntelligenceTiers />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
