"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CONSOLE_QUERIES,
  type ConsoleQuery,
  type ConsoleResponse,
} from "@/data/console-responses";
import { cn } from "@/lib/utils";
import {
  CONSOLE_EVENT,
  type ConsoleEventDetail,
} from "@/components/shared/IntelligenceConsoleMini";
import {
  ProcessingIndicator,
  ResponseView,
} from "@/components/shared/ConsoleResponseRenderer";
import type { ConsoleAction } from "@/types/console-actions";

const EASE = [0.16, 1, 0.3, 1] as const;

export function IntelligenceConsole() {
  const [activeId, setActiveId] = useState<string>(CONSOLE_QUERIES[0].id);
  const [processing, setProcessing] = useState(false);
  const [response, setResponse] = useState<ConsoleResponse>(
    CONSOLE_QUERIES[0].response,
  );
  const [freeformValue, setFreeformValue] = useState("");
  const [freeformActive, setFreeformActive] = useState(false);
  const [lastQuery, setLastQuery] = useState<string>("");

  // Listen for externally-dispatched queries (e.g. from the hero mini console).
  useEffect(() => {
    function onExternal(e: Event) {
      const ce = e as CustomEvent<ConsoleEventDetail>;
      const detail = ce.detail;
      if (!detail) return;
      if (detail.kind === "pill") {
        const q = CONSOLE_QUERIES.find((c) => c.id === detail.id);
        if (q) runQuery(q);
      } else if (detail.kind === "freeform") {
        setFreeformValue(detail.text);
        // Fire the API call on the next tick so state updates settle.
        window.setTimeout(() => {
          runFreeformWith(detail.text);
        }, 0);
      }
    }
    window.addEventListener(CONSOLE_EVENT, onExternal as EventListener);
    return () =>
      window.removeEventListener(CONSOLE_EVENT, onExternal as EventListener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function runQuery(q: ConsoleQuery) {
    setActiveId(q.id);
    setFreeformActive(false);
    setLastQuery(q.label);
    setProcessing(true);
    const delay = 600 + Math.round(Math.random() * 400);
    window.setTimeout(() => {
      setResponse(q.response);
      setProcessing(false);
    }, delay);
  }

  async function runFreeform() {
    return runFreeformWith(freeformValue);
  }

  async function runFreeformWith(raw: string) {
    const q = raw.trim();
    if (!q) return;
    setActiveId("");
    setFreeformActive(true);
    setLastQuery(q);
    setProcessing(true);

    try {
      const res = await fetch("/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q }),
      });

      if (!res.ok) {
        throw new Error(`status ${res.status}`);
      }
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

  return (
    <section
      id="console"
      className="relative section-lavender-wash py-24 md:py-32 scroll-mt-24 overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          backgroundImage: "url(/topo-bg-light.svg)",
          backgroundSize: "cover",
        }}
      />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-10"
        >
          <div className="text-[10px] font-mono font-semibold uppercase tracking-[0.15em] text-[#38b6ff]">
            Intelligence Console
          </div>
          <h2
            className="mt-3 font-bold tracking-tight text-[#0f172a]"
            style={{ fontSize: "clamp(1.75rem, 3.2vw, 2rem)" }}
          >
            Query the platform. See the output.
          </h2>
          <p className="mt-3 text-[14px] text-[#334155] max-w-xl mx-auto">
            This is how intelligence gets delivered. Pick a query — or ask your
            own.
          </p>
        </motion.div>

        {/* Query pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {CONSOLE_QUERIES.map((q) => {
            const active = activeId === q.id && !freeformActive;
            return (
              <button
                key={q.id}
                type="button"
                onClick={() => runQuery(q)}
                className={cn(
                  "px-4 py-2 rounded-full text-[12px] font-medium transition-all",
                  "border",
                  active
                    ? "bg-[#38b6ff]/10 border-[#38b6ff]/40 text-[#0A8FD4]"
                    : "bg-white border-[#e2e8f0] text-[#334155] hover:border-[#38b6ff]/30 hover:shadow-sm hover:scale-[1.02]",
                )}
              >
                {q.label}
              </button>
            );
          })}
        </div>

        {/* Freeform input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            runFreeform();
          }}
          className="mt-4 flex items-stretch gap-0 bg-white rounded-lg border border-[#e2e8f0] overflow-hidden focus-within:border-[#38b6ff]/40 focus-within:shadow-sm transition-all"
        >
          <input
            type="text"
            value={freeformValue}
            onChange={(e) => setFreeformValue(e.target.value)}
            placeholder="What would this look like for your industry?"
            className="flex-1 px-4 py-3 text-[13px] text-[#0f172a] placeholder:text-[#94a3b8] bg-transparent focus:outline-none"
          />
          <button
            type="submit"
            disabled={!freeformValue.trim()}
            className="px-5 font-mono text-[12px] font-semibold text-[#0A8FD4] hover:bg-[#38b6ff]/5 disabled:opacity-40 transition-colors"
          >
            Query →
          </button>
        </form>

        {/* Response area */}
        <div className="mt-8 min-h-[180px]">
          <AnimatePresence mode="wait">
            {processing ? (
              <motion.div
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="dash-card p-5"
              >
                <ProcessingIndicator />
              </motion.div>
            ) : (
              <motion.div
                key={activeId || "freeform"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ResponseView response={response} context={lastQuery} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
