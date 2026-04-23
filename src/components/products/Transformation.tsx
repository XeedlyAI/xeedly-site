"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import {
  PRODUCT_TAB_EVENT,
  type ProductTabDetail,
  type ProductTabKey,
} from "./ProductNavigator";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ */
/*  Content model                                                      */
/* ------------------------------------------------------------------ */

type ChaosTone = "red" | "amber" | "gray";

type ChaosFragment = {
  text: string;
  tone: ChaosTone;
  rotate: number; // degrees, -4..4
  /** Optional horizontal nudge as Tailwind margin class for scattered feel */
  offset?: string;
};

type ClarityCard = {
  kind: "card";
  accent: "teal" | "blue" | "amber" | "red";
  title: string;
  detail: string;
};

type ClarityKpi = {
  kind: "kpi";
  cells: string[]; // e.g. ["rev: $12.4K", "labor: 28%", "signals: 7"]
};

type ClarityItem = ClarityCard | ClarityKpi;

type ProductContent = {
  engineLabel: string;
  chaos: ChaosFragment[];
  clarity: ClarityItem[];
};

const CONTENT: Record<ProductTabKey, ProductContent> = {
  sovvrn: {
    engineLabel: "SOVVRN",
    chaos: [
      { text: "POS data", tone: "red", rotate: -3 },
      { text: "missed calls", tone: "amber", rotate: 2, offset: "ml-6" },
      { text: "review alert", tone: "gray", rotate: -1 },
      { text: "labor report", tone: "amber", rotate: 3, offset: "-ml-3" },
      { text: "scheduling change", tone: "red", rotate: -4 },
      { text: "delivery complaint", tone: "gray", rotate: 2, offset: "ml-4" },
      { text: "inventory count", tone: "amber", rotate: -2 },
      { text: "voicemail", tone: "red", rotate: 1 },
    ],
    clarity: [
      {
        kind: "card",
        accent: "teal",
        title: "Morning Briefing",
        detail: "6 sections · delivered 6:00 AM",
      },
      {
        kind: "card",
        accent: "blue",
        title: "Revenue Signal",
        detail: "Tue lunch ▼ 18%",
      },
      {
        kind: "card",
        accent: "amber",
        title: "Voice Alert",
        detail: "2 call-outs detected",
      },
      {
        kind: "kpi",
        cells: ["rev: $12.4K", "labor: 28%", "signals: 7"],
      },
    ],
  },
  propertyolio: {
    engineLabel: "PROPERTYOLIO",
    chaos: [
      { text: "doc request", tone: "red", rotate: -2 },
      { text: "vendor expiry", tone: "amber", rotate: 3, offset: "ml-5" },
      { text: "board email", tone: "gray", rotate: -1 },
      { text: "maintenance ticket", tone: "amber", rotate: 2, offset: "-ml-2" },
      { text: "insurance lapse", tone: "red", rotate: -3 },
      { text: "payment received", tone: "gray", rotate: 1, offset: "ml-3" },
      { text: "compliance gap", tone: "red", rotate: -4, offset: "-ml-4" },
      { text: "meeting reminder", tone: "amber", rotate: 2 },
    ],
    clarity: [
      {
        kind: "card",
        accent: "red",
        title: "Compliance Alert",
        detail: "2 vendors · insurance expired",
      },
      {
        kind: "card",
        accent: "blue",
        title: "Community Brief",
        detail: "Cedar Park · 3 actions today",
      },
      {
        kind: "card",
        accent: "teal",
        title: "Operations",
        detail: "7 docs fulfilled · $847 revenue",
      },
      {
        kind: "kpi",
        cells: ["communities: 40", "compliance: 92%", "signals: 12"],
      },
    ],
  },
  propertydocz: {
    engineLabel: "PROPERTYDOCZ",
    chaos: [
      { text: "email request", tone: "red", rotate: -3 },
      { text: "phone call", tone: "amber", rotate: 2, offset: "ml-4" },
      { text: "spreadsheet", tone: "gray", rotate: -2 },
      { text: "missing data", tone: "red", rotate: 3, offset: "-ml-3" },
      { text: "3rd party fee", tone: "red", rotate: -1, offset: "-ml-5" },
      { text: "manual assembly", tone: "amber", rotate: 2 },
      { text: "delayed response", tone: "amber", rotate: -4 },
      { text: "revenue to condocerts", tone: "red", rotate: 3, offset: "ml-3" },
    ],
    clarity: [
      {
        kind: "card",
        accent: "blue",
        title: "Order Tracked",
        detail: "resale pkg · agent request",
      },
      {
        kind: "card",
        accent: "teal",
        title: "AI Harvested",
        detail: "38 fields · 94% confidence",
      },
      {
        kind: "card",
        accent: "teal",
        title: "PDF Generated",
        detail: "delivered · 2.1 hrs",
      },
      {
        kind: "kpi",
        cells: ["orders: 47", "revenue: $4,230", "turnaround: 2.1h"],
      },
    ],
  },
  propertyjobz: {
    engineLabel: "PROPERTYJOBZ",
    chaos: [
      { text: "unverified vendor", tone: "red", rotate: -2 },
      { text: "expired insurance", tone: "red", rotate: 3, offset: "ml-5" },
      { text: "email RFP", tone: "amber", rotate: -1 },
      { text: "no bid tracking", tone: "gray", rotate: 2, offset: "-ml-3" },
      { text: "word of mouth", tone: "amber", rotate: -3, offset: "-ml-4" },
      { text: "liability risk", tone: "red", rotate: 2 },
      { text: "spreadsheet tracking", tone: "gray", rotate: -2 },
      { text: "missed renewal", tone: "amber", rotate: 3, offset: "ml-3" },
    ],
    clarity: [
      {
        kind: "card",
        accent: "teal",
        title: "All Verified",
        detail: "insurance · license · bonding",
      },
      {
        kind: "card",
        accent: "blue",
        title: "RFP Matched",
        detail: "3 qualified vendors · bidding",
      },
      {
        kind: "card",
        accent: "teal",
        title: "Revenue Stream",
        detail: "12 vendors · preferred program",
      },
      {
        kind: "kpi",
        cells: ["vendors: 48", "compliance: 100%", "jobs: active 7"],
      },
    ],
  },
  growth: {
    engineLabel: "GROWTH SYSTEMS",
    chaos: [
      { text: "manual ads", tone: "red", rotate: -3 },
      { text: "missed calls", tone: "amber", rotate: 2, offset: "ml-4" },
      { text: "no reviews", tone: "red", rotate: -1 },
      { text: "agency invoice $8K", tone: "red", rotate: 3, offset: "-ml-3" },
      { text: "slow SEO", tone: "gray", rotate: -2 },
      { text: "unpaid invoices", tone: "amber", rotate: 2, offset: "ml-3" },
      { text: "no follow-up", tone: "amber", rotate: -4, offset: "-ml-4" },
      { text: "lost leads", tone: "red", rotate: 2 },
    ],
    clarity: [
      {
        kind: "card",
        accent: "blue",
        title: "AI Ads Running",
        detail: "Meta + Google · optimizing",
      },
      {
        kind: "card",
        accent: "teal",
        title: "All Calls Answered",
        detail: "voice AI · < 3 rings",
      },
      {
        kind: "card",
        accent: "teal",
        title: "Reviews Growing",
        detail: "3.2x volume · AI responses",
      },
      {
        kind: "kpi",
        cells: ["leads: 142", "response: < 60s", "cost: $597/mo"],
      },
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  Style maps                                                         */
/* ------------------------------------------------------------------ */

const CHAOS_TONE: Record<ChaosTone, { bg: string; text: string; border: string }> = {
  red: {
    bg: "rgba(239, 68, 68, 0.08)",
    text: "#b91c1c",
    border: "rgba(239, 68, 68, 0.25)",
  },
  amber: {
    bg: "rgba(245, 158, 11, 0.08)",
    text: "#b45309",
    border: "rgba(245, 158, 11, 0.25)",
  },
  gray: {
    bg: "rgba(148, 163, 184, 0.1)",
    text: "#64748b",
    border: "rgba(148, 163, 184, 0.3)",
  },
};

const CLARITY_ACCENT: Record<ClarityCard["accent"], string> = {
  teal: "#14b8a6",
  blue: "#38b6ff",
  amber: "#f59e0b",
  red: "#ef4444",
};

/* ------------------------------------------------------------------ */
/*  Building blocks                                                    */
/* ------------------------------------------------------------------ */

function ChaosBox({ fragments }: { fragments: ChaosFragment[] }) {
  return (
    <div
      className="relative rounded-xl p-5 md:p-6 h-full min-h-[280px] flex flex-col"
      style={{
        background: "rgba(239, 68, 68, 0.03)",
        border: "1px dashed rgba(239, 68, 68, 0.25)",
      }}
    >
      <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-[#b91c1c]">
        Before
      </div>
      <div className="mt-5 flex-1 flex flex-wrap items-start content-start gap-2">
        {fragments.map((f, i) => {
          const tone = CHAOS_TONE[f.tone];
          return (
            <motion.span
              key={`${f.text}-${i}`}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                delay: i * 0.04,
                ease: EASE,
              }}
              className={`inline-flex items-center rounded-md px-2.5 py-1 text-[11px] font-medium whitespace-nowrap ${f.offset ?? ""}`}
              style={{
                background: tone.bg,
                color: tone.text,
                border: `1px solid ${tone.border}`,
                transform: `rotate(${f.rotate}deg)`,
                fontFamily: "var(--font-mono)",
              }}
            >
              {f.text}
            </motion.span>
          );
        })}
      </div>
    </div>
  );
}

function EngineBox({ label }: { label: string }) {
  return (
    <motion.div
      animate={{
        boxShadow: [
          "0 0 0 0 rgba(56, 182, 255, 0.35)",
          "0 0 0 8px rgba(56, 182, 255, 0)",
        ],
      }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
      className="relative rounded-xl p-5 md:p-6 h-full min-h-[280px] flex flex-col items-center justify-center text-center"
      style={{
        background: "rgba(56, 182, 255, 0.08)",
        border: "2px solid #38b6ff",
      }}
    >
      <div className="absolute top-4 left-1/2 -translate-x-1/2 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-[#0A8FD4]">
        Engine
      </div>
      {/* Processing node */}
      <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-white/70 border border-[#38b6ff]/40 shadow-[0_2px_12px_rgba(56,182,255,0.18)]">
        <Sparkles className="h-7 w-7 text-[#0A8FD4]" />
      </div>
      <div className="mt-5 font-mono text-[12px] font-bold text-[#0f172a] tracking-[0.08em]">
        {label}
      </div>
      <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.15em] text-[#64748b]">
        processing…
      </div>
    </motion.div>
  );
}

function ClarityBox({ items }: { items: ClarityItem[] }) {
  return (
    <div
      className="relative rounded-xl p-5 md:p-6 h-full min-h-[280px] flex flex-col"
      style={{
        background: "rgba(20, 184, 166, 0.03)",
        border: "1px solid rgba(20, 184, 166, 0.25)",
      }}
    >
      <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-[#0d9488]">
        After
      </div>
      <div className="mt-4 space-y-2.5 flex-1">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.45,
              delay: i * 0.08,
              ease: EASE,
            }}
          >
            {item.kind === "card" ? (
              <div
                className="rounded-md bg-white px-3 py-2 border border-[#e2e8f0] shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
                style={{ borderLeft: `3px solid ${CLARITY_ACCENT[item.accent]}` }}
              >
                <div className="text-[12px] font-semibold text-[#0f172a] leading-tight">
                  {item.title}
                </div>
                <div className="mt-0.5 font-mono text-[10px] text-[#64748b]">
                  {item.detail}
                </div>
              </div>
            ) : (
              <div className="rounded-md bg-white/70 px-3 py-2 border border-[#e2e8f0]/70 flex flex-wrap gap-x-3 gap-y-1">
                {item.cells.map((c) => (
                  <span
                    key={c}
                    className="font-mono text-[10px] font-semibold text-[#0f172a] tabular-nums"
                  >
                    {c}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/**
 * Horizontal connector with a traveling dot that shifts color as it moves.
 * On mobile (md:hidden hidden flip), renders as a vertical version.
 */
function Connector({
  orientation,
  fromColor,
  toColor,
  delay = 0,
}: {
  orientation: "horizontal" | "vertical";
  fromColor: string;
  toColor: string;
  delay?: number;
}) {
  if (orientation === "horizontal") {
    return (
      <div className="relative h-px w-full self-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right, ${fromColor}, ${toColor})`,
            opacity: 0.5,
          }}
        />
        <motion.span
          initial={{ left: "-10%" }}
          animate={{ left: "110%" }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            delay,
          }}
          className="absolute top-1/2 -translate-y-1/2 h-2 w-2 rounded-full"
          style={{
            background: fromColor,
            boxShadow: `0 0 8px ${fromColor}`,
          }}
        />
      </div>
    );
  }
  return (
    <div className="relative w-px h-10 mx-auto overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, ${fromColor}, ${toColor})`,
          opacity: 0.5,
        }}
      />
      <motion.span
        initial={{ top: "-10%" }}
        animate={{ top: "110%" }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
          delay,
        }}
        className="absolute left-1/2 -translate-x-1/2 h-2 w-2 rounded-full"
        style={{
          background: fromColor,
          boxShadow: `0 0 8px ${fromColor}`,
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main section                                                       */
/* ------------------------------------------------------------------ */

export function Transformation() {
  const [product, setProduct] = useState<ProductTabKey>("sovvrn");

  useEffect(() => {
    function onTab(e: Event) {
      const detail = (e as CustomEvent<ProductTabDetail>).detail;
      if (!detail) return;
      setProduct(detail.product);
    }
    window.addEventListener(PRODUCT_TAB_EVENT, onTab as EventListener);
    return () =>
      window.removeEventListener(PRODUCT_TAB_EVENT, onTab as EventListener);
  }, []);

  const content = CONTENT[product];

  return (
    <section className="section-blue-wash py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-14"
        >
          <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-[#64748b]">
            The Transformation
          </div>
          <h2
            className="mt-3 font-bold tracking-tight text-[#0f172a]"
            style={{ fontSize: "clamp(1.75rem, 3.2vw, 2rem)" }}
          >
            From chaos to clarity.
          </h2>
        </motion.div>

        {/* Desktop: 3-column flow */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.25, delayChildren: 0.1 },
            },
          }}
          className="hidden md:grid md:grid-cols-[minmax(0,1fr)_40px_minmax(0,0.6fr)_40px_minmax(0,1fr)] gap-0 items-stretch"
        >
          <StageFrame>
            <AnimatePresence mode="wait">
              <motion.div
                key={`chaos-${product}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <ChaosBox fragments={content.chaos} />
              </motion.div>
            </AnimatePresence>
          </StageFrame>

          <StageFrame>
            <Connector
              orientation="horizontal"
              fromColor="#ef4444"
              toColor="#38b6ff"
            />
          </StageFrame>

          <StageFrame>
            <EngineBox label={content.engineLabel} />
          </StageFrame>

          <StageFrame>
            <Connector
              orientation="horizontal"
              fromColor="#38b6ff"
              toColor="#14b8a6"
              delay={1.2}
            />
          </StageFrame>

          <StageFrame>
            <AnimatePresence mode="wait">
              <motion.div
                key={`clarity-${product}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <ClarityBox items={content.clarity} />
              </motion.div>
            </AnimatePresence>
          </StageFrame>
        </motion.div>

        {/* Mobile: stacked vertical flow */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.25, delayChildren: 0.1 },
            },
          }}
          className="md:hidden space-y-0"
        >
          <StageFrame>
            <AnimatePresence mode="wait">
              <motion.div
                key={`m-chaos-${product}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChaosBox fragments={content.chaos} />
              </motion.div>
            </AnimatePresence>
          </StageFrame>

          <Connector
            orientation="vertical"
            fromColor="#ef4444"
            toColor="#38b6ff"
          />

          <StageFrame>
            <EngineBox label={content.engineLabel} />
          </StageFrame>

          <Connector
            orientation="vertical"
            fromColor="#38b6ff"
            toColor="#14b8a6"
            delay={1.2}
          />

          <StageFrame>
            <AnimatePresence mode="wait">
              <motion.div
                key={`m-clarity-${product}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ClarityBox items={content.clarity} />
              </motion.div>
            </AnimatePresence>
          </StageFrame>
        </motion.div>

        {/* Wrap-up */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
          className="mt-12 text-center text-[14px] text-[#64748b] italic max-w-2xl mx-auto leading-[1.7]"
        >
          Every product follows the same pattern. Chaos in. Intelligence out.
          The vertical changes — the architecture doesn&apos;t.
        </motion.p>
      </div>
    </section>
  );
}

/**
 * Adds the outer entrance animation (stagger-controlled from parent). Individual
 * stages fade in from below in sequence: CHAOS → connector → ENGINE → connector → CLARITY.
 */
function StageFrame({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: EASE },
        },
      }}
      className="flex h-full"
    >
      <div className="w-full">{children}</div>
    </motion.div>
  );
}
