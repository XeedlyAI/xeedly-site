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
  const [freeform, setFreeform] = useState("");
  const [freeformAnswer, setFreeformAnswer] = useState<string | null>(null);
  const [freeformActive, setFreeformActive] = useState(false);

  const ask = (i: number) => {
    setFreeformActive(false);
    setFreeformAnswer(null);
    setLoading(true);
    setActive(i);
    setTimeout(() => setLoading(false), 650 + Math.random() * 350);
  };

  const askFreeform = async (e: React.FormEvent) => {
    e.preventDefault();
    const q = freeform.trim();
    if (!q) return;
    setActive(null);
    setFreeformActive(true);
    setFreeformAnswer(null);
    setLoading(true);
    try {
      const res = await fetch("/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q }),
      });
      const data = (await res.json()) as { content?: string };
      setFreeformAnswer(
        data.content ||
          "Unable to process that right now — try one of the suggestions, or reach us at hello@xeedly.com.",
      );
    } catch {
      setFreeformAnswer(
        "Unable to process that right now — try one of the suggestions, or reach us at hello@xeedly.com.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="p-5 md:p-6 sticky top-24 overflow-hidden relative rounded-xl border"
      style={{
        background: "#0f172a",
        borderColor: "rgba(56,182,255,0.2)",
      }}
    >
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

      <form
        onSubmit={askFreeform}
        className="mt-3 flex items-stretch gap-0 bg-white/5 rounded-lg border border-white/15 overflow-hidden focus-within:border-[#38b6ff]/60 focus-within:bg-white/10 transition-all"
      >
        <input
          type="text"
          value={freeform}
          onChange={(e) => setFreeform(e.target.value)}
          placeholder="Ask your own question…"
          className="flex-1 px-3 py-2.5 text-[12.5px] text-white placeholder:text-[#cbd5e1] bg-transparent focus:outline-none"
        />
        <button
          type="submit"
          disabled={!freeform.trim() || loading}
          className="px-4 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[#38b6ff] hover:bg-[#38b6ff]/10 disabled:opacity-40 transition-colors"
        >
          Ask →
        </button>
      </form>

      <div className="mt-5 min-h-[140px]">
        <AnimatePresence mode="wait">
          {freeformActive ? (
            loading ? (
              <motion.div
                key="ff-loading"
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
                key="ff-answer"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="rounded-lg border-l-2 border-[#8b5cf6] bg-[#8b5cf6]/10 px-3 py-2.5"
              >
                <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-[#a78bfa]">
                  ⚡ AI Response
                </div>
                <p className="mt-1.5 text-[12.5px] text-[#f1f5f9] leading-[1.65] whitespace-pre-line">
                  {freeformAnswer}
                </p>
              </motion.div>
            )
          ) : active === null ? (
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
              <p className="mt-1.5 text-[12.5px] text-[#f1f5f9] leading-[1.65]">
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
