"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import {
  ProcessingIndicator,
  ResponseView,
} from "@/components/shared/ConsoleResponseRenderer";
import type { ConsoleAction } from "@/types/console-actions";
import type { ConsoleResponse } from "@/data/console-responses";

const EASE = [0.16, 1, 0.3, 1] as const;

interface BlogConsoleProps {
  /** Scope the console to a specific article (passes articleSlug to API). */
  articleSlug?: string;
  /** Display variant — full embedded console or compact strip. */
  variant?: "full" | "compact";
  /** Override the placeholder. */
  placeholder?: string;
  /** Override the heading. */
  heading?: string;
  /** Override the subheading. */
  subheading?: string;
}

const DEFAULT_FULL_SUGGESTIONS = [
  "How do I build a business that runs without me?",
  "What's the revenue opportunity in HOA documents?",
  "Why don't dashboards drive decisions?",
  "How do I escape the multi-unit bottleneck?",
];

const DEFAULT_ARTICLE_SUGGESTIONS = [
  "How does this apply to my industry?",
  "What's the key takeaway?",
  "Show me a related briefing.",
];

export function BlogConsole({
  articleSlug,
  variant = "full",
  placeholder,
  heading,
  subheading,
}: BlogConsoleProps) {
  const [value, setValue] = useState("");
  const [processing, setProcessing] = useState(false);
  const [response, setResponse] = useState<ConsoleResponse | null>(null);
  const [lastQuery, setLastQuery] = useState("");

  const isArticleScoped = Boolean(articleSlug);
  const suggestions = isArticleScoped
    ? DEFAULT_ARTICLE_SUGGESTIONS
    : DEFAULT_FULL_SUGGESTIONS;
  const resolvedHeading =
    heading ??
    (isArticleScoped
      ? "Ask anything about this briefing."
      : "Ask the briefings.");
  const resolvedSubheading =
    subheading ??
    (isArticleScoped
      ? "I can synthesize, expand, and surface related reading."
      : "Synthesized answers across every published briefing. Try a question.");
  const resolvedPlaceholder =
    placeholder ??
    (isArticleScoped
      ? "Ask about this briefing..."
      : "What are you trying to figure out?");

  async function runQuery(raw: string) {
    const q = raw.trim();
    if (!q) return;
    setLastQuery(q);
    setProcessing(true);
    setValue("");

    try {
      const res = await fetch("/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: q,
          context: "blog",
          ...(articleSlug ? { articleSlug } : {}),
        }),
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
          "I can't reach the briefings right now. Try one of the suggested questions, or visit /blog directly.",
        actions: Array.isArray(data.actions) ? data.actions : undefined,
      });
    } catch {
      setResponse({
        type: "freeform",
        body:
          "I can't reach the briefings right now. Try one of the suggested questions, or visit /blog directly.",
      });
    } finally {
      setProcessing(false);
    }
  }

  const wrapperClass =
    variant === "compact"
      ? "max-w-3xl mx-auto"
      : "max-w-3xl mx-auto";

  return (
    <div className={wrapperClass}>
      {variant === "full" && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center mb-6"
        >
          <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-[#38b6ff]">
            Briefings Console
          </div>
          <h3
            className="mt-2 font-bold text-[#0f172a] tracking-tight"
            style={{ fontSize: "clamp(1.25rem, 2.4vw, 1.5rem)" }}
          >
            {resolvedHeading}
          </h3>
          <p className="mt-2 text-[13px] text-[#475569] max-w-xl mx-auto">
            {resolvedSubheading}
          </p>
        </motion.div>
      )}

      {/* Suggestion pills */}
      {!response && !processing && (
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => runQuery(s)}
              className="px-3.5 py-1.5 rounded-full border border-[#e2e8f0] bg-white text-[12px] text-[#334155] hover:border-[#38b6ff]/40 hover:text-[#0A8FD4] hover:shadow-sm transition-all"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Freeform input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          runQuery(value);
        }}
        className="flex items-stretch gap-0 bg-white rounded-lg border border-[#e2e8f0] overflow-hidden focus-within:border-[#38b6ff]/40 focus-within:shadow-sm transition-all"
      >
        <div className="flex items-center pl-4 text-[#94a3b8]">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={resolvedPlaceholder}
          className="flex-1 px-3 py-3 text-[13px] text-[#0f172a] placeholder:text-[#94a3b8] bg-transparent focus:outline-none"
        />
        <button
          type="submit"
          disabled={!value.trim() || processing}
          className="px-5 font-mono text-[12px] font-semibold text-[#0A8FD4] hover:bg-[#38b6ff]/5 disabled:opacity-40 transition-colors"
        >
          Ask →
        </button>
      </form>

      {/* Response area */}
      {(processing || response) && (
        <div className="mt-6 min-h-[120px]">
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
            ) : response ? (
              <motion.div
                key={lastQuery}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ResponseView response={response} context={lastQuery} />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
