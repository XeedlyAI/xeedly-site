"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

type TierId = "glance" | "briefing" | "deep";

type Tier = {
  id: TierId;
  name: string;
  accent: string;
  accentTint: string;
  accentBg: string;
  time: string;
  tagline: string;
  description: string;
};

const TIERS: Tier[] = [
  {
    id: "glance",
    name: "GLANCE",
    accent: "#14b8a6",
    accentTint: "rgba(20,184,166,0.08)",
    accentBg: "rgba(20,184,166,0.04)",
    time: "0–5s",
    tagline: "Live across every surface",
    description:
      "KPI Tickers across every surface. Live operational metrics at a glance — no clicks, no logins, no dashboards.",
  },
  {
    id: "briefing",
    name: "BRIEFING",
    accent: "#38b6ff",
    accentTint: "rgba(56,182,255,0.08)",
    accentBg: "rgba(56,182,255,0.04)",
    time: "5–60s",
    tagline: "Delivered before your first meeting",
    description:
      "AI-generated morning briefings with coaching voice. Categorized insights, priority actions, cross-system correlations delivered proactively.",
  },
  {
    id: "deep",
    name: "DEEP",
    accent: "#8b5cf6",
    accentTint: "rgba(139,92,246,0.08)",
    accentBg: "rgba(139,92,246,0.04)",
    time: "1–5min",
    tagline: "Investigate any signal end-to-end",
    description:
      "Signal feed, entity drilldowns, and AI concierge for freeform queries. Full investigative capability when you need to dig.",
  },
];

// =================================================================
// GLANCE PREVIEW — live KPI ticker
// =================================================================

type Kpi = {
  label: string;
  value: string;
  delta: string;
  positive: boolean;
};

const KPI_INITIAL: Kpi[] = [
  { label: "REVENUE TODAY", value: "$47,284", delta: "+12.4%", positive: true },
  { label: "OPEN TICKETS", value: "23", delta: "−4", positive: true },
  { label: "AVG RESPONSE", value: "4m 12s", delta: "−38s", positive: true },
  { label: "ACTIVE UNITS", value: "5/5", delta: "all online", positive: true },
  { label: "MARGIN", value: "31.4%", delta: "+1.2pt", positive: true },
  { label: "RATING", value: "4.82", delta: "+0.03", positive: true },
];

function GlancePreview({ accent }: { accent: string }) {
  const [kpis, setKpis] = useState<Kpi[]>(KPI_INITIAL);
  const [pulseIdx, setPulseIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setPulseIdx((i) => (i + 1) % KPI_INITIAL.length);
      setKpis((prev) =>
        prev.map((k, idx) => {
          if (idx !== pulseIdx) return k;
          // Tiny mutation on the active KPI to feel live
          if (k.label === "REVENUE TODAY") {
            const base = 47284;
            const next = base + Math.floor(Math.random() * 400);
            return { ...k, value: `$${next.toLocaleString()}` };
          }
          if (k.label === "OPEN TICKETS") {
            const next = 21 + Math.floor(Math.random() * 5);
            return { ...k, value: String(next) };
          }
          return k;
        }),
      );
    }, 1800);
    return () => clearInterval(id);
  }, [pulseIdx]);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#64748b]">
          KPI Ticker · Embedded on every surface
        </div>
        <div className="flex items-center gap-2">
          <span
            className="inline-block h-1.5 w-1.5 rounded-full animate-pulse"
            style={{ background: accent }}
          />
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#64748b]">
            LIVE
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {kpis.map((kpi, i) => {
          const active = i === pulseIdx;
          return (
            <motion.div
              key={kpi.label}
              animate={
                active
                  ? { borderColor: accent, scale: 1.015 }
                  : { borderColor: "#e2e8f0", scale: 1 }
              }
              transition={{ duration: 0.4, ease: EASE }}
              className="relative rounded-lg border bg-white p-4 overflow-hidden"
              style={{ borderColor: "#e2e8f0" }}
            >
              {active && (
                <motion.div
                  layoutId="kpi-pulse"
                  className="absolute left-0 top-0 bottom-0 w-[3px]"
                  style={{ background: accent }}
                />
              )}
              <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#64748b]">
                {kpi.label}
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <motion.div
                  key={kpi.value}
                  initial={{ opacity: 0.4, y: -2 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="text-[20px] font-bold tracking-tight text-[#0f172a] tabular-nums"
                >
                  {kpi.value}
                </motion.div>
                <span
                  className="font-mono text-[10px] font-semibold"
                  style={{ color: kpi.positive ? "#10b981" : "#ef4444" }}
                >
                  {kpi.delta}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="flex items-center gap-4 pt-2 text-[11px] text-[#64748b] font-mono">
        <span>Refresh: real-time</span>
        <span>·</span>
        <span>Surfaces: web · mobile · admin · partner</span>
      </div>
    </div>
  );
}

// =================================================================
// BRIEFING PREVIEW — morning brief with staggered reveal
// =================================================================

const BRIEFING_SECTIONS = [
  {
    label: "WINS",
    color: "#10b981",
    items: [
      "Revenue +12.4% week-over-week — strongest Tuesday in 8 weeks",
      "Response time dropped to 4m 12s (target: under 5m)",
    ],
  },
  {
    label: "WATCH",
    color: "#f59e0b",
    items: [
      "Unit 3 ticket volume +47% — pattern matches last month's labor gap",
      "Two vendor COIs expiring within 14 days",
    ],
  },
  {
    label: "TODAY'S PRIORITY",
    color: "#38b6ff",
    items: [
      "Re-route morning prep at Unit 3 — coverage gap 9–11am",
      "Approve renewed insurance for Vendor #142 and Vendor #207",
    ],
  },
];

function BriefingPreview({ accent }: { accent: string }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#64748b]">
          Morning Brief · Delivered 6:42 AM · 47s read
        </div>
        <div className="flex items-center gap-2">
          <span
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ background: accent }}
          />
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#64748b]">
            Email · SMS · Slack
          </span>
        </div>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.18 } } }}
        className="rounded-lg border border-[#e2e8f0] bg-white overflow-hidden"
      >
        <div
          className="px-5 py-3 border-b border-[#e2e8f0] flex items-center gap-3"
          style={{ background: "rgba(56,182,255,0.04)" }}
        >
          <div
            className="h-7 w-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
            style={{ background: accent }}
          >
            X
          </div>
          <div>
            <div className="text-[12px] font-semibold text-[#0f172a]">
              Your Tuesday Brief — May 18
            </div>
            <div className="text-[10px] text-[#64748b] font-mono">
              Generated from 1,847 events across 4 systems
            </div>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {BRIEFING_SECTIONS.map((section) => (
            <motion.div
              key={section.label}
              variants={{
                hidden: { opacity: 0, x: -8 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.5, ease: EASE },
                },
              }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="h-1 w-6 rounded-full"
                  style={{ background: section.color }}
                />
                <div
                  className="font-mono text-[10px] font-bold uppercase tracking-[0.12em]"
                  style={{ color: section.color }}
                >
                  {section.label}
                </div>
              </div>
              <ul className="mt-2 space-y-1.5">
                {section.items.map((item, i) => (
                  <motion.li
                    key={i}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: { duration: 0.4, ease: EASE },
                      },
                    }}
                    className="text-[12.5px] leading-[1.55] text-[#334155] pl-8"
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// =================================================================
// DEEP PREVIEW — signal feed + AI concierge exchange
// =================================================================

type Signal = {
  ts: string;
  source: string;
  text: string;
  severity: "info" | "warn" | "ok";
};

const SIGNAL_FEED: Signal[] = [
  { ts: "06:42:17", source: "POS · UNIT-3", text: "Sales pace −18% vs 4-wk avg", severity: "warn" },
  { ts: "06:41:02", source: "SCHEDULE", text: "9–11am coverage gap detected", severity: "warn" },
  { ts: "06:38:55", source: "PROPERTYJOBZ", text: "Vendor #142 COI expires in 11 days", severity: "warn" },
  { ts: "06:37:21", source: "REVENUE", text: "Daily target 94% reached by close", severity: "ok" },
  { ts: "06:35:08", source: "RESPONSE", text: "Avg response 4m 12s — target met", severity: "ok" },
  { ts: "06:33:44", source: "INVENTORY", text: "Re-order trigger on SKU-401", severity: "info" },
];

function DeepPreview({ accent }: { accent: string }) {
  const [feed, setFeed] = useState<Signal[]>(SIGNAL_FEED);

  useEffect(() => {
    const id = setInterval(() => {
      const now = new Date();
      const ts =
        String(now.getHours()).padStart(2, "0") +
        ":" +
        String(now.getMinutes()).padStart(2, "0") +
        ":" +
        String(now.getSeconds()).padStart(2, "0");
      const NEW_SIGNALS: Signal[] = [
        { ts, source: "POS · UNIT-1", text: "Avg ticket +$2.40 vs trailing 7d", severity: "ok" },
        { ts, source: "GBP", text: "New review · 5★ · Unit-4", severity: "ok" },
        { ts, source: "PROPERTYDOCZ", text: "Doc order paid · 4-Pack · $189", severity: "info" },
        { ts, source: "VOICE-AI", text: "After-hours call captured · estimate req", severity: "info" },
      ];
      const pick = NEW_SIGNALS[Math.floor(Math.random() * NEW_SIGNALS.length)];
      setFeed((prev) => [pick, ...prev.slice(0, 5)]);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  const sevColor = (s: Signal["severity"]) =>
    s === "warn" ? "#f59e0b" : s === "ok" ? "#10b981" : "#64748b";

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {/* Signal feed */}
      <div className="md:col-span-3 rounded-lg border border-[#e2e8f0] bg-[#0f172a] overflow-hidden">
        <div className="px-4 py-2.5 border-b border-[#1e293b] flex items-center justify-between">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#94a3b8]">
            Signal Feed
          </div>
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full animate-pulse"
              style={{ background: accent }}
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#94a3b8]">
              STREAMING
            </span>
          </div>
        </div>
        <div className="divide-y divide-[#1e293b]">
          <AnimatePresence initial={false}>
            {feed.map((s, i) => (
              <motion.div
                key={`${s.ts}-${s.text}-${i}`}
                initial={{ opacity: 0, y: -6, backgroundColor: "rgba(139,92,246,0.18)" }}
                animate={{ opacity: 1, y: 0, backgroundColor: "rgba(15,23,42,0)" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="px-4 py-2.5 flex items-start gap-3"
              >
                <span className="font-mono text-[10px] text-[#475569] tabular-nums mt-0.5">
                  {s.ts}
                </span>
                <span
                  className="font-mono text-[10px] font-semibold mt-0.5 min-w-[100px]"
                  style={{ color: sevColor(s.severity) }}
                >
                  {s.source}
                </span>
                <span className="text-[12px] text-[#cbd5e1] leading-[1.5]">
                  {s.text}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* AI Concierge */}
      <div className="md:col-span-2 rounded-lg border border-[#e2e8f0] bg-white overflow-hidden flex flex-col">
        <div className="px-4 py-2.5 border-b border-[#e2e8f0] flex items-center gap-2">
          <div
            className="h-5 w-5 rounded-full flex items-center justify-center text-white text-[9px] font-bold"
            style={{ background: accent }}
          >
            AI
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#64748b]">
            Concierge
          </div>
        </div>
        <div className="flex-1 p-4 space-y-3 text-[12px] leading-[1.55]">
          <div className="flex justify-end">
            <div className="bg-[#f1f5f9] text-[#0f172a] rounded-lg px-3 py-2 max-w-[85%]">
              Why is Unit 3 ticket volume up?
            </div>
          </div>
          <div className="flex justify-start">
            <div
              className="rounded-lg px-3 py-2 max-w-[92%] text-[#0f172a]"
              style={{ background: "rgba(139,92,246,0.08)" }}
            >
              Spike correlates with a 9–11am coverage gap on the new schedule. Same
              pattern preceded the April labor-cost surge.
              <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.1em] text-[#64748b]">
                3 sources · POS · Schedule · Historical
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-[#f1f5f9] text-[#0f172a] rounded-lg px-3 py-2 max-w-[85%]">
              Draft the fix.
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="flex justify-start"
          >
            <div className="flex items-center gap-1 text-[#64748b]">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full animate-pulse"
                style={{ background: accent, animationDelay: "0ms" }}
              />
              <span
                className="inline-block h-1.5 w-1.5 rounded-full animate-pulse"
                style={{ background: accent, animationDelay: "180ms" }}
              />
              <span
                className="inline-block h-1.5 w-1.5 rounded-full animate-pulse"
                style={{ background: accent, animationDelay: "360ms" }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// =================================================================
// MAIN COMPONENT
// =================================================================

export function IntelligenceStack() {
  const [activeId, setActiveId] = useState<TierId>("briefing");
  const activeTier = TIERS.find((t) => t.id === activeId)!;

  return (
    <section className="section-white py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-14"
        >
          <div className="text-[10px] font-mono font-semibold uppercase tracking-[0.15em] text-[#64748b]">
            The Intelligence Stack
          </div>
          <h2
            className="mt-3 font-bold tracking-tight text-[#0f172a]"
            style={{ fontSize: "clamp(1.85rem, 3.4vw, 2.25rem)" }}
          >
            Three tiers.{" "}
            <span className="bg-gradient-to-r from-[#14b8a6] via-[#38b6ff] to-[#8b5cf6] bg-clip-text text-transparent">
              Zero noise.
            </span>
          </h2>
          <p className="mt-4 text-[15px] text-[#475569] max-w-xl mx-auto">
            From a 5-second glance to a 5-minute investigation — we cover the
            entire spectrum of time-to-insight. Intelligence shouldn&apos;t
            require your attention. It should protect it.
          </p>
        </motion.div>

        {/* TIER TABS */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2"
        >
          {TIERS.map((tier) => {
            const active = tier.id === activeId;
            return (
              <motion.button
                key={tier.id}
                type="button"
                onClick={() => setActiveId(tier.id)}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: EASE },
                  },
                }}
                whileHover={{ y: -2 }}
                animate={{
                  borderColor: active ? tier.accent : "#e2e8f0",
                  backgroundColor: active ? tier.accentTint : "#ffffff",
                }}
                transition={{ duration: 0.3, ease: EASE }}
                className={cn(
                  "text-left p-5 md:p-6 rounded-xl border-2 relative overflow-hidden",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                )}
                style={{
                  boxShadow: active
                    ? `0 8px 24px -8px ${tier.accent}40`
                    : "0 1px 2px rgba(15,23,42,0.04)",
                }}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span
                    className="font-mono text-[14px] font-bold tracking-[0.1em]"
                    style={{ color: tier.accent }}
                  >
                    {tier.name}
                  </span>
                  <span
                    className="font-mono text-[11px] font-semibold tabular-nums"
                    style={{ color: active ? tier.accent : "#64748b" }}
                  >
                    {tier.time}
                  </span>
                </div>
                <p className="mt-2 text-[13px] font-semibold text-[#0f172a]">
                  {tier.tagline}
                </p>
                <p className="mt-1.5 text-[12.5px] leading-[1.55] text-[#475569]">
                  {tier.description}
                </p>

                {/* Active indicator — pointing-down chevron */}
                {active && (
                  <motion.div
                    layoutId="tier-pointer"
                    initial={false}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="absolute -bottom-[10px] left-1/2 -translate-x-1/2 w-5 h-5 rotate-45"
                    style={{
                      background: tier.accentTint,
                      borderRight: `2px solid ${tier.accent}`,
                      borderBottom: `2px solid ${tier.accent}`,
                    }}
                  />
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* LIVE PREVIEW PANE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
          className="mt-8 rounded-2xl border-2 p-6 md:p-8 relative overflow-hidden"
          style={{
            borderColor: activeTier.accent + "30",
            background: `linear-gradient(180deg, ${activeTier.accentBg} 0%, #ffffff 60%)`,
          }}
        >
          {/* Pane header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div
                className="font-mono text-[11px] font-bold uppercase tracking-[0.15em]"
                style={{ color: activeTier.accent }}
              >
                {activeTier.name}
              </div>
              <span className="text-[#cbd5e1]">·</span>
              <div className="text-[13px] font-semibold text-[#0f172a]">
                {activeTier.tagline}
              </div>
            </div>
            <div
              className="font-mono text-[11px] font-semibold tabular-nums px-2.5 py-1 rounded-md"
              style={{
                background: activeTier.accentTint,
                color: activeTier.accent,
              }}
            >
              {activeTier.time}
            </div>
          </div>

          {/* Animated content swap */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              {activeId === "glance" && <GlancePreview accent={activeTier.accent} />}
              {activeId === "briefing" && <BriefingPreview accent={activeTier.accent} />}
              {activeId === "deep" && <DeepPreview accent={activeTier.accent} />}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Bottom caption */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 flex items-center justify-center gap-3 text-[11px] font-mono uppercase tracking-[0.12em] text-[#64748b]"
        >
          <span style={{ color: "#14b8a6" }}>● Glance</span>
          <span>→</span>
          <span style={{ color: "#38b6ff" }}>● Briefing</span>
          <span>→</span>
          <span style={{ color: "#8b5cf6" }}>● Deep</span>
          <span className="ml-2">One stack. Three depths. Zero noise.</span>
        </motion.div>
      </div>
    </section>
  );
}
