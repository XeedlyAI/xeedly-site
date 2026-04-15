"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CONSOLE_QUERIES,
  type ConsoleQuery,
  type ConsoleResponse,
  type SignalSeverity,
} from "@/data/console-responses";
import { cn } from "@/lib/utils";
import {
  CONSOLE_EVENT,
  type ConsoleEventDetail,
} from "@/components/shared/IntelligenceConsoleMini";

const EASE = [0.16, 1, 0.3, 1] as const;

const SEVERITY_COLOR: Record<SignalSeverity, { border: string; dot: string; label: string }> = {
  high: { border: "#f59e0b", dot: "#f59e0b", label: "HIGH" },
  medium: { border: "#3b82f6", dot: "#3b82f6", label: "MED" },
  low: { border: "#14b8a6", dot: "#14b8a6", label: "LOW" },
};

function ProcessingIndicator() {
  return (
    <div className="flex items-center gap-2.5 font-mono text-[12px] text-[#64748b]">
      <span className="relative inline-flex w-2 h-2">
        <span className="absolute inset-0 rounded-full bg-[#38b6ff] animate-ping opacity-75" />
        <span className="relative rounded-full w-2 h-2 bg-[#38b6ff]" />
      </span>
      Processing query...
    </div>
  );
}

function BriefingView({ response }: { response: Extract<ConsoleResponse, { type: "briefing" }> }) {
  return (
    <div className="space-y-3">
      <div className="font-mono text-[13px] text-[#0f172a] font-semibold">
        <span className="text-[#38b6ff]">▸</span> {response.title}
      </div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        className="space-y-3"
      >
        {response.sections.map((s, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: EASE },
              },
            }}
            className="dash-card status-info p-4 md:p-5"
          >
            <div className="flex items-center gap-2">
              {s.icon && <span className="text-[14px]">{s.icon}</span>}
              <span className="text-[12px] font-semibold text-[#38b6ff]">
                {s.title}
              </span>
            </div>
            <p className="mt-2 text-[13px] leading-[1.55] text-[#334155]">
              {s.body}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

function SignalsView({ response }: { response: Extract<ConsoleResponse, { type: "signals" }> }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 font-mono text-[12px] text-[#0f172a] font-semibold">
        <span className="relative inline-flex w-2 h-2">
          <span className="absolute inset-0 rounded-full bg-[#14b8a6] animate-ping opacity-60" />
          <span className="relative rounded-full w-2 h-2 bg-[#14b8a6]" />
        </span>
        {response.title}
      </div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        className="space-y-3"
      >
        {response.signals.map((sig, i) => {
          const c = SEVERITY_COLOR[sig.severity];
          return (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, x: -18 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.5, ease: EASE },
                },
              }}
              className="dash-card p-4 md:p-5 transition-shadow"
              style={{ borderLeft: `3px solid ${c.border}` }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block w-2 h-2 rounded-full"
                    style={{
                      background: c.dot,
                      boxShadow: `0 0 8px ${c.dot}`,
                    }}
                  />
                  <span className="text-[13px] font-semibold text-[#0f172a]">
                    {sig.title}
                  </span>
                </div>
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.08em] px-2 py-0.5 rounded-full bg-[#f1f5f9] text-[#64748b]"
                >
                  {sig.source}
                </span>
              </div>
              <p className="mt-2 text-[12px] leading-[1.55] text-[#334155]">
                {sig.body}
              </p>
              <div className="mt-3 font-mono text-[10px] text-[#94a3b8]">
                {sig.time}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

function FreeformView({ response }: { response: Extract<ConsoleResponse, { type: "freeform" }> }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="rounded-xl p-5 md:p-6 bg-[#f5f3ff]"
      style={{ borderLeft: "3px solid #8b5cf6" }}
    >
      <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-[#8b5cf6]">
        ⚡ AI-Generated Response
      </div>
      <p className="mt-3 text-[13px] leading-[1.6] text-[#334155] whitespace-pre-line">
        {response.body}
      </p>
    </motion.div>
  );
}

function ResponseView({ response }: { response: ConsoleResponse }) {
  if (response.type === "briefing") return <BriefingView response={response} />;
  if (response.type === "signals") return <SignalsView response={response} />;
  return <FreeformView response={response} />;
}

export function IntelligenceConsole() {
  const [activeId, setActiveId] = useState<string>(CONSOLE_QUERIES[0].id);
  const [processing, setProcessing] = useState(false);
  const [response, setResponse] = useState<ConsoleResponse>(
    CONSOLE_QUERIES[0].response,
  );
  const [freeformValue, setFreeformValue] = useState("");
  const [freeformActive, setFreeformActive] = useState(false);

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
      const data = (await res.json()) as { content?: string };
      setResponse({
        type: "freeform",
        body:
          data.content ||
          "Unable to process your query right now. Try one of the suggested queries above, or reach out to us directly.",
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
                <ResponseView response={response} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
