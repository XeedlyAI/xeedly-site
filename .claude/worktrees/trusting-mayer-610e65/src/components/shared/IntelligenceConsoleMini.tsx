"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CONSOLE_QUERIES, type ConsoleResponse } from "@/data/console-responses";
import {
  ProcessingIndicator,
  ResponseView,
} from "@/components/shared/ConsoleResponseRenderer";
import type { ConsoleAction } from "@/types/console-actions";

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
  // When omitted, the mini console renders inline AND emits CONSOLE_EVENT
  // so the full console below can mirror the same answer.
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
  const [processing, setProcessing] = useState(false);
  const [response, setResponse] = useState<ConsoleResponse | null>(null);
  const [lastQuery, setLastQuery] = useState<string>("");

  const hasResponse = Boolean(response) || processing;

  function reset() {
    setResponse(null);
    setProcessing(false);
    setLastQuery("");
    setFreeform("");
  }

  function runPill(id: string, label: string) {
    // If the parent handed us a handler, defer entirely to it.
    if (onQuerySelect) {
      onQuerySelect({ queryId: id });
      return;
    }
    const q = CONSOLE_QUERIES.find((c) => c.id === id);
    if (!q) return;
    setLastQuery(label);
    setProcessing(true);
    setResponse(null);
    const delay = 600 + Math.round(Math.random() * 400);
    window.setTimeout(() => {
      setResponse(q.response);
      setProcessing(false);
    }, delay);
  }

  async function runFreeform(text: string) {
    if (onQuerySelect) {
      onQuerySelect({ freeform: text });
      return;
    }
    setLastQuery(text);
    setProcessing(true);
    setResponse(null);
    try {
      const res = await fetch("/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: text }),
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      const data = (await res.json()) as {
        content?: string;
        actions?: ConsoleAction[];
      };
      setResponse({
        type: "freeform",
        body:
          data.content ||
          "Unable to process your query right now. Try one of the suggested queries above, or reach out to us directly.",
        actions: Array.isArray(data.actions) ? data.actions : undefined,
      });
    } catch {
      setResponse({
        type: "freeform",
        body:
          "Unable to process your query right now. Try one of the suggested queries above, or reach out to us directly.",
      });
    } finally {
      setProcessing(false);
    }
  }

  function onSuggestionClick(s: ConsoleSuggestion) {
    if (s.queryId) {
      runPill(s.queryId, s.label);
    } else {
      runFreeform(s.label);
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const t = freeform.trim();
    if (!t) return;
    runFreeform(t);
    setFreeform("");
  }

  function seeFullResponse() {
    // Mirror the query into the full console below and scroll.
    if (lastQuery) {
      const q = CONSOLE_QUERIES.find(
        (c) => c.label === lastQuery || c.id === lastQuery,
      );
      if (q) {
        dispatchConsoleQuery({ kind: "pill", id: q.id });
      } else {
        dispatchConsoleQuery({ kind: "freeform", text: lastQuery });
      }
    }
    scrollToConsole();
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
            onClick={() => onSuggestionClick(s)}
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
          disabled={!freeform.trim() || processing}
          className="px-4 font-mono text-[12px] font-semibold text-[#38b6ff] hover:bg-[#38b6ff]/10 disabled:opacity-40 transition-colors"
        >
          Query →
        </button>
      </form>

      {/* Inline response area — compact */}
      <div className="mt-5">
        <AnimatePresence mode="wait">
          {!hasResponse ? (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="min-h-[18px] font-mono text-[12px] italic text-[#64748b]"
            >
              &gt; awaiting query...
            </motion.div>
          ) : (
            <motion.div
              key="response"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              {/* Reset control */}
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#64748b]">
                  {processing ? "Running" : "Response"}
                </span>
                <button
                  type="button"
                  onClick={reset}
                  className="font-mono text-[10px] text-[#64748b] hover:text-[#94a3b8] transition-colors"
                  aria-label="Clear response"
                >
                  ↻ clear
                </button>
              </div>

              <div className="scrollbar-hero overflow-y-auto max-h-none md:max-h-[min(600px,70vh)] pr-1">
                {processing ? (
                  <div className="rounded-lg bg-white/5 border border-white/5 p-4">
                    <ProcessingIndicator />
                  </div>
                ) : response ? (
                  <ResponseView
                    response={response}
                    context={lastQuery}
                    compact
                  />
                ) : null}
              </div>

              {!processing && response && (
                <button
                  type="button"
                  onClick={seeFullResponse}
                  className="mt-3 font-mono text-[11px] text-[#38b6ff] hover:text-[#7dd3fc] hover:italic hover:underline transition-all"
                >
                  See full response in the console ↓
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="mt-5 pt-4 border-t border-white/10 font-mono text-[10px] text-[#64748b] flex items-center justify-between">
        <span>latency: &lt;3s</span>
        <span>claude-sonnet-4</span>
      </div>
    </div>
  );
}
