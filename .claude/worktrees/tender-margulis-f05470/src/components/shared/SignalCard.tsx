"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export type SignalAccent = "red" | "amber" | "blue" | "teal" | "purple" | "primary";

const ACCENT: Record<SignalAccent, { border: string; dot: string }> = {
  red: { border: "#ef4444", dot: "#ef4444" },
  amber: { border: "#f59e0b", dot: "#f59e0b" },
  blue: { border: "#3b82f6", dot: "#3b82f6" },
  teal: { border: "#14b8a6", dot: "#14b8a6" },
  purple: { border: "#8b5cf6", dot: "#8b5cf6" },
  primary: { border: "#38b6ff", dot: "#38b6ff" },
};

type SignalCardProps = {
  accent: SignalAccent;
  title: string;
  body: string;
  source?: string;
  time?: string;
  compact?: boolean;
  className?: string;
  /** When used as a direct child of a motion stagger container. */
  animate?: boolean;
};

export function SignalCard({
  accent,
  title,
  body,
  source,
  time,
  compact = false,
  className,
  animate = true,
}: SignalCardProps) {
  const c = ACCENT[accent];

  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <span
            aria-hidden
            className="inline-block w-2 h-2 rounded-full shrink-0"
            style={{ background: c.dot, boxShadow: `0 0 8px ${c.dot}` }}
          />
          <span
            className={cn(
              "font-semibold text-[#0f172a]",
              compact ? "text-[12px]" : "text-[14px]",
            )}
          >
            {title}
          </span>
        </div>
        {source && (
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.08em] px-2 py-0.5 rounded-full bg-[#f1f5f9] text-[#64748b]">
            {source}
          </span>
        )}
      </div>
      <p
        className={cn(
          "mt-2 leading-[1.6] text-[#334155]",
          compact ? "text-[12px]" : "text-[13px]",
        )}
      >
        {body}
      </p>
      {time && (
        <div className="mt-3 font-mono text-[10px] text-[#94a3b8]">{time}</div>
      )}
    </>
  );

  const classes = cn(
    "dash-card",
    compact ? "p-4" : "p-5 md:p-6",
    className,
  );
  const style = { borderLeft: `3px solid ${c.border}` };

  if (!animate) {
    return (
      <div className={classes} style={style}>
        {content}
      </div>
    );
  }

  return (
    <motion.div
      className={classes}
      style={style}
      variants={{
        hidden: { opacity: 0, x: -18 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.5, ease: EASE },
        },
      }}
    >
      {content}
    </motion.div>
  );
}
