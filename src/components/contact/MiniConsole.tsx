"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const PROMPTS = [
  {
    q: "What fits a 12-location pizza chain?",
    a: "Sovvrn + Growth Scale. Sovvrn gives you a morning briefing across all 12 locations — labor, sales, voids, voice-agent pickups. Growth Scale ($997/mo) handles Meta/Google ads and reviews for each location. Typical deployment: 3 weeks.",
  },
  {
    q: "I run a property management firm, 400 doors.",
    a: "Propertyolio — our intelligence hub for property management. It correlates PropertyDocz (document AI) and PropertyJobz (work orders) into a single briefing. Deployment is 2–4 weeks. Scales to multi-thousand-door portfolios.",
  },
  {
    q: "I just need better ads, not a platform.",
    a: "Growth Systems Starter ($297/mo) is built for exactly this. One ad platform, AI chat agent, review intelligence. No deployment. You're live in 48 hours.",
  },
];

export function MiniConsole() {
  const [active, setActive] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const ask = (i: number) => {
    setLoading(true);
    setActive(i);
    setTimeout(() => setLoading(false), 650 + Math.random() * 350);
  };

  return (
    <div className="dash-card-dark p-5 md:p-6 sticky top-24 overflow-hidden relative">
      <div
        aria-hidden
        className="absolute left-0 right-0 top-0 h-[2px] bg-[#38b6ff]"
      />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#14b8a6] animate-pulse" />
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-[#94a3b8]">
            Intelligence Console
          </span>
        </div>
        <span className="font-mono text-[9px] text-[#64748b]">xeedly://mini</span>
      </div>

      <p className="mt-4 text-[12px] text-[#94a3b8] leading-[1.6]">
        Not sure which product fits? Ask a quick question — answers are
        generated from the same engine that powers our platforms.
      </p>

      <div className="mt-4 space-y-2">
        {PROMPTS.map((p, i) => (
          <button
            key={p.q}
            onClick={() => ask(i)}
            className={`w-full text-left px-3 py-2 rounded-lg border text-[12px] leading-[1.5] transition ${
              active === i
                ? "border-[#38b6ff]/50 bg-[#38b6ff]/10 text-white"
                : "border-white/10 bg-white/5 text-[#cbd5e1] hover:border-white/20 hover:text-white"
            }`}
          >
            {p.q}
          </button>
        ))}
      </div>

      <div className="mt-5 min-h-[140px]">
        <AnimatePresence mode="wait">
          {active === null ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-mono text-[11px] text-[#64748b] italic"
            >
              &gt; awaiting query…
            </motion.div>
          ) : loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 font-mono text-[11px] text-[#38b6ff]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#38b6ff] animate-pulse" />
              processing signal…
            </motion.div>
          ) : (
            <motion.div
              key={`a-${active}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="rounded-lg border-l-2 border-[#38b6ff] bg-[#38b6ff]/5 px-3 py-2.5"
            >
              <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-[#38b6ff]">
                Recommendation
              </div>
              <p className="mt-1.5 text-[12.5px] text-[#e2e8f0] leading-[1.65]">
                {PROMPTS[active].a}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-5 pt-4 border-t border-white/10 font-mono text-[10px] text-[#64748b] flex items-center justify-between">
        <span>latency: &lt;3s</span>
        <span>claude-sonnet-4</span>
      </div>
    </div>
  );
}
