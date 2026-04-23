"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

function AIAssistantMock() {
  const messages = [
    {
      role: "user",
      text: "Which vendors in the Maple Ridge service area have insurance expiring this month?",
    },
    {
      role: "ai",
      text: "3 vendors flagged: GreenScape Landscaping (expires Apr 22), Apex Electric (Apr 28), and SwiftClean Services (May 1). GreenScape has an active job assignment through Apr 30 — recommend renewal outreach today.",
    },
  ];

  return (
    <div className="rounded-xl bg-white border border-[#e2e8f0] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="px-4 py-3 border-b border-[#e2e8f0] flex items-center justify-between bg-[#FAFAFA]">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center h-5 w-5 rounded bg-[#8b5cf6]/10 text-[#8b5cf6]">
            <Sparkles className="h-3 w-3" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#475569] font-semibold">
            AI Assistant · Admin Dashboard
          </span>
        </div>
        <span className="font-mono text-[10px] text-[#94a3b8]">claude-sonnet</span>
      </div>

      <div className="p-5 space-y-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`rounded-lg p-4 ${
              m.role === "user"
                ? "bg-[#f1f5f9]"
                : "bg-[#8b5cf6]/[0.06] border-l-2 border-[#8b5cf6]"
            }`}
          >
            <div
              className={`font-mono text-[9px] font-semibold uppercase tracking-[0.12em] ${
                m.role === "user" ? "text-[#64748b]" : "text-[#8b5cf6]"
              }`}
            >
              {m.role === "user" ? "You" : "⚡ AI Response"}
            </div>
            <p className="mt-1.5 text-[12.5px] text-[#334155] leading-[1.6]">
              {m.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PropertyJobzAI() {
  return (
    <section className="section-white py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-12"
        >
          <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-[#64748b]">
            AI On Every Surface
          </div>
          <h2
            className="mt-3 font-bold tracking-tight text-[#0f172a]"
            style={{ fontSize: "clamp(1.5rem, 2.8vw, 1.875rem)" }}
          >
            Every dashboard has an AI.{" "}
            <span className="text-[#38b6ff]">Full context, structured answers.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <p className="text-[14px] leading-[1.75] text-[#334155]">
              Every dashboard in PropertyJobz — admin and vendor — includes an
              AI assistant. Ask about vendor compliance status, job history,
              community coverage gaps, or upcoming expirations. The AI has full
              context across the platform and responds with structured
              intelligence, not search results.
            </p>
            <p className="mt-4 text-[14px] leading-[1.75] text-[#334155]">
              Board members get answers without needing dashboard training.
              Vendors get instant compliance status. Management companies get
              operational intelligence on demand.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <AIAssistantMock />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
