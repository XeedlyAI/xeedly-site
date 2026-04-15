"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export interface ConsoleSuggestion {
  label: string;
  // Either a known pill ID from CONSOLE_QUERIES, or null for plain freeform.
  queryId?: string;
}

export interface IntelligenceConsoleMiniProps {
  introText: string;
  suggestions: ConsoleSuggestion[];
  placeholder?: string;
  label?: string; // e.g. "xeedly://live"
  // If provided, called with either a known queryId or the freeform text.
  // The parent is responsible for triggering the main console + scroll.
  onQuerySelect?: (payload: { queryId?: string; freeform?: string }) => void;
}

// Fire-and-forget event so other sections (the full Intelligence Console)
// can listen for hero-initiated queries without a direct parent coupling.
export const CONSOLE_EVENT = "xeedly:console-query";

export type ConsoleEventDetail =
  | { kind: "pill"; id: string }
  | { kind: "freeform"; text: string };

export function dispatchConsoleQuery(detail: ConsoleEventDetail) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<ConsoleEventDetail>(CONSOLE_EVENT, { detail }));
}

export function scrollToConsole() {
  if (typeof window === "undefined") return;
  const el = document.getElementById("console");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function IntelligenceConsoleMini({
  introText,
  suggestions,
  placeholder = "Ask anything...",
  label = "xeedly://live",
  onQuerySelect,
}: IntelligenceConsoleMiniProps) {
  const [freeform, setFreeform] = useState("");
  const [status, setStatus] = useState<"idle" | "redirecting">("idle");

  function triggerPill(id?: string, freeformText?: string) {
    if (onQuerySelect) {
      onQuerySelect({ queryId: id, freeform: freeformText });
      return;
    }
    // Default behavior: dispatch event + smooth scroll to #console.
    setStatus("redirecting");
    if (id) {
      dispatchConsoleQuery({ kind: "pill", id });
    } else if (freeformText) {
      dispatchConsoleQuery({ kind: "freeform", text: freeformText });
    }
    scrollToConsole();
    window.setTimeout(() => setStatus("idle"), 1500);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const t = freeform.trim();
    if (!t) return;
    triggerPill(undefined, t);
    setFreeform("");
  }

  return (
    <div
      className="relative rounded-xl p-6 overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 20px 40px -20px rgba(0,0,0,0.4)",
      }}
    >
      <div
        aria-hidden
        className="absolute left-0 right-0 top-0 h-[3px] bg-[#38b6ff]"
      />

      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative inline-flex w-2 h-2">
            <span className="absolute inset-0 rounded-full bg-[#14b8a6] animate-ping opacity-70" />
            <span className="relative rounded-full w-2 h-2 bg-[#14b8a6]" />
          </span>
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-[#cbd5e1]">
            Intelligence Console
          </span>
        </div>
        <span className="font-mono text-[11px] text-[#64748b]">{label}</span>
      </div>

      {/* Intro */}
      <p className="mt-4 text-[13px] leading-[1.5] text-[#94a3b8]">
        {introText}
      </p>

      {/* Suggestions — stacked rows */}
      <div className="mt-5 space-y-1">
        {suggestions.map((s) => (
          <button
            key={s.label}
            type="button"
            onClick={() => triggerPill(s.queryId, s.queryId ? undefined : s.label)}
            className="group block w-full text-left py-1.5 text-[13px] text-[#38b6ff] hover:text-[#7dd3fc] transition-colors"
          >
            <span className="font-mono text-[#64748b] group-hover:text-[#94a3b8] mr-2">
              &gt;
            </span>
            {s.label}
          </button>
        ))}
      </div>

      {/* Freeform input */}
      <form
        onSubmit={onSubmit}
        className="mt-5 flex items-stretch rounded-lg overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <input
          type="text"
          value={freeform}
          onChange={(e) => setFreeform(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-3 py-2.5 text-[13px] text-[#f1f5f9] placeholder:text-[#64748b] bg-transparent focus:outline-none"
        />
        <button
          type="submit"
          disabled={!freeform.trim()}
          className="px-4 font-mono text-[12px] font-semibold text-[#38b6ff] hover:bg-[#38b6ff]/10 disabled:opacity-40 transition-colors"
        >
          Query →
        </button>
      </form>

      {/* Idle / redirecting status */}
      <div className="mt-4 min-h-[18px]">
        <motion.div
          key={status}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="font-mono text-[12px] italic text-[#64748b]"
        >
          {status === "idle"
            ? "> awaiting query..."
            : "> redirecting to console..."}
        </motion.div>
      </div>

      {/* Footer */}
      <div className="mt-5 pt-4 border-t border-white/10 font-mono text-[10px] text-[#64748b] flex items-center justify-between">
        <span>latency: &lt;3s</span>
        <span>claude-sonnet-4</span>
      </div>
    </div>
  );
}
