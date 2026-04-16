"use client";

import { motion } from "framer-motion";
import type {
  ConsoleResponse,
  SignalSeverity,
} from "@/data/console-responses";
import { ConsoleActions } from "@/components/shared/ConsoleActions";

const EASE = [0.16, 1, 0.3, 1] as const;

export const SEVERITY_COLOR: Record<
  SignalSeverity,
  { border: string; dot: string; label: string }
> = {
  high: { border: "#f59e0b", dot: "#f59e0b", label: "HIGH" },
  medium: { border: "#3b82f6", dot: "#3b82f6", label: "MED" },
  low: { border: "#14b8a6", dot: "#14b8a6", label: "LOW" },
};

/**
 * When `compact` is true, truncate a freeform body to the first paragraph
 * (split on blank lines) OR 200 characters — whichever is shorter. Append "…".
 */
export function truncateForCompact(body: string): string {
  const firstPara = body.split(/\n\s*\n/)[0].trim();
  const LIMIT = 200;
  if (firstPara.length <= LIMIT && firstPara.length === body.trim().length) {
    return firstPara;
  }
  const base = firstPara.length <= LIMIT ? firstPara : firstPara.slice(0, LIMIT).trimEnd();
  return `${base}…`;
}

export function ProcessingIndicator() {
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

export function BriefingView({
  response,
  compact = false,
}: {
  response: Extract<ConsoleResponse, { type: "briefing" }>;
  compact?: boolean;
}) {
  const sections = compact ? response.sections.slice(0, 2) : response.sections;
  return (
    <div className="space-y-3">
      <div
        className={`font-mono font-semibold ${
          compact ? "text-[12px]" : "text-[13px]"
        } text-[#0f172a]`}
      >
        <span className="text-[#38b6ff]">▸</span> {response.title}
      </div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        className="space-y-3"
      >
        {sections.map((s, i) => (
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
            className={`dash-card status-info ${compact ? "p-3" : "p-4 md:p-5"}`}
          >
            <div className="flex items-center gap-2">
              {s.icon && (
                <span className={compact ? "text-[13px]" : "text-[14px]"}>
                  {s.icon}
                </span>
              )}
              <span
                className={`font-semibold text-[#38b6ff] ${
                  compact ? "text-[11px]" : "text-[12px]"
                }`}
              >
                {s.title}
              </span>
            </div>
            <p
              className={`mt-2 leading-[1.55] text-[#334155] ${
                compact ? "text-[12px]" : "text-[13px]"
              }`}
            >
              {s.body}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export function SignalsView({
  response,
  compact = false,
}: {
  response: Extract<ConsoleResponse, { type: "signals" }>;
  compact?: boolean;
}) {
  const signals = compact ? response.signals.slice(0, 2) : response.signals;
  return (
    <div className="space-y-3">
      <div
        className={`flex items-center gap-2 font-mono font-semibold text-[#0f172a] ${
          compact ? "text-[11px]" : "text-[12px]"
        }`}
      >
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
        {signals.map((sig, i) => {
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
              className={`dash-card transition-shadow ${
                compact ? "p-3" : "p-4 md:p-5"
              }`}
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
                  <span
                    className={`font-semibold text-[#0f172a] ${
                      compact ? "text-[12px]" : "text-[13px]"
                    }`}
                  >
                    {sig.title}
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.08em] px-2 py-0.5 rounded-full bg-[#f1f5f9] text-[#64748b]">
                  {sig.source}
                </span>
              </div>
              <p
                className={`mt-2 leading-[1.55] text-[#334155] ${
                  compact ? "text-[11.5px]" : "text-[12px]"
                }`}
              >
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

export function FreeformView({
  response,
  compact = false,
}: {
  response: Extract<ConsoleResponse, { type: "freeform" }>;
  compact?: boolean;
}) {
  const body = compact ? truncateForCompact(response.body) : response.body;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className={`rounded-xl bg-[#f5f3ff] ${compact ? "p-4" : "p-5 md:p-6"}`}
      style={{ borderLeft: "3px solid #8b5cf6" }}
    >
      <div
        className={`font-mono font-semibold uppercase tracking-[0.15em] text-[#8b5cf6] ${
          compact ? "text-[9px]" : "text-[10px]"
        }`}
      >
        ⚡ AI-Generated Response
      </div>
      <p
        className={`mt-3 leading-[1.6] text-[#334155] whitespace-pre-line ${
          compact ? "text-[12px]" : "text-[13px]"
        }`}
      >
        {body}
      </p>
    </motion.div>
  );
}

/**
 * Unified response renderer. Compact mode truncates list/body content
 * but always renders action cards in full.
 */
export function ResponseView({
  response,
  context,
  compact = false,
}: {
  response: ConsoleResponse;
  context?: string;
  compact?: boolean;
}) {
  const inner =
    response.type === "briefing" ? (
      <BriefingView response={response} compact={compact} />
    ) : response.type === "signals" ? (
      <SignalsView response={response} compact={compact} />
    ) : (
      <FreeformView response={response} compact={compact} />
    );
  return (
    <>
      {inner}
      {response.actions && response.actions.length > 0 && (
        <ConsoleActions actions={response.actions} context={context} />
      )}
    </>
  );
}
