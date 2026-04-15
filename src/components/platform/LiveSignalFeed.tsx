"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

type Severity = "critical" | "high" | "medium" | "low" | "info";

type Signal = {
  id: string;
  severity: Severity;
  title: string;
  body: string;
  source: string;
};

const SEVERITY: Record<
  Severity,
  { border: string; dot: string; label: string }
> = {
  critical: { border: "#ef4444", dot: "#ef4444", label: "CRIT" },
  high: { border: "#f59e0b", dot: "#f59e0b", label: "HIGH" },
  medium: { border: "#3b82f6", dot: "#3b82f6", label: "MED" },
  low: { border: "#14b8a6", dot: "#14b8a6", label: "LOW" },
  info: { border: "#94a3b8", dot: "#94a3b8", label: "INFO" },
};

const POOL: Signal[] = [
  {
    id: "s1",
    severity: "critical",
    title: "Compliance Breach — Immediate Action Required",
    body:
      "Maple Ridge HOA vendor GreenScape Landscaping: insurance expired 3 days ago, 2 active jobs in progress.",
    source: "propertyjobz",
  },
  {
    id: "s2",
    severity: "high",
    title: "Cross-System Pattern Detected",
    body:
      "Cedar Park: annual meeting in 5 days, document packages not ordered, 3 board members haven't confirmed.",
    source: "propertydocz + propertyolio",
  },
  {
    id: "s3",
    severity: "medium",
    title: "Revenue Trend Alert",
    body:
      "Location #4 Tuesday lunch revenue down 18% vs 4-week avg. Labor ratio inverted. 2 call-outs logged via Voice AI.",
    source: "sovvrn",
  },
  {
    id: "s4",
    severity: "low",
    title: "Automation Milestone",
    body:
      "Core HOA document pipeline: 40 associations fully configured, avg fulfillment time 2.1 hours. System self-reported.",
    source: "propertydocz",
  },
  {
    id: "s5",
    severity: "info",
    title: "Daily Digest Delivered",
    body:
      "Morning briefing sent to 12 operators across 3 organizations. 94% open rate, 3 drill-down queries initiated.",
    source: "propertyolio",
  },
  {
    id: "s6",
    severity: "high",
    title: "Vendor Pipeline Gap",
    body:
      "No approved HVAC vendors in Cedar Park service area. 2 pending repair requests aging >48 hours.",
    source: "propertyjobz",
  },
  {
    id: "s7",
    severity: "medium",
    title: "Document SLA Warning",
    body:
      "3 resale packages approaching 24-hour SLA. Current queue depth: 7. Avg processing: 2.4 hours.",
    source: "propertydocz",
  },
];

const MAX_VISIBLE = 4;

type Entry = Signal & { uid: string; ageSec: number };

function formatAge(sec: number) {
  if (sec < 60) return `${sec}s ago`;
  const m = Math.floor(sec / 60);
  return `${m}m ago`;
}

export function LiveSignalFeed() {
  const [entries, setEntries] = useState<Entry[]>(() => [
    { ...POOL[1], uid: "init-0", ageSec: 8 },
    { ...POOL[2], uid: "init-1", ageSec: 45 },
  ]);
  const [cursor, setCursor] = useState(2);

  // Rotation: add a new signal every 4-5s, cap at MAX_VISIBLE
  useEffect(() => {
    let idx = cursor;
    const interval = setInterval(
      () => {
        const next = POOL[idx % POOL.length];
        idx = idx + 1;
        setCursor(idx);
        setEntries((prev) => {
          const withNew: Entry[] = [
            { ...next, uid: `e-${Date.now()}`, ageSec: 0 },
            ...prev,
          ];
          return withNew.slice(0, MAX_VISIBLE);
        });
      },
      4500,
    );
    return () => clearInterval(interval);
  }, [cursor]);

  // Age tick every second
  useEffect(() => {
    const t = setInterval(() => {
      setEntries((prev) =>
        prev.map((e) => ({ ...e, ageSec: e.ageSec + 1 })),
      );
    }, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="space-y-3">
      <AnimatePresence initial={false}>
        {entries.map((e) => {
          const c = SEVERITY[e.severity];
          return (
            <motion.div
              key={e.uid}
              layout
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.3 } }}
              transition={{ duration: 0.5, ease: EASE }}
              className="dash-card p-4 md:p-5"
              style={{ borderLeft: `3px solid ${c.border}` }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="inline-block w-2 h-2 rounded-full shrink-0"
                    style={{ background: c.dot, boxShadow: `0 0 8px ${c.dot}` }}
                  />
                  <span className="font-mono text-[10px] font-bold tracking-[0.08em]"
                    style={{ color: c.border }}
                  >
                    {c.label}
                  </span>
                  <span className="text-[13px] font-semibold text-[#0f172a] truncate">
                    {e.title}
                  </span>
                </div>
                <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.08em] px-2 py-0.5 rounded-full bg-[#f1f5f9] text-[#64748b]">
                  {e.source}
                </span>
              </div>
              <p className="mt-2 text-[12px] leading-[1.55] text-[#334155]">
                {e.body}
              </p>
              <div className="mt-3 font-mono text-[10px] text-[#94a3b8]">
                Detected {formatAge(e.ageSec)}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
