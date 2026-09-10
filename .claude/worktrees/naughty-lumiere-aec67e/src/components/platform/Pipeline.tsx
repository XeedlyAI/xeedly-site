"use client";

import { motion } from "framer-motion";
import { Database, GitBranch, Send } from "lucide-react";
import type { ComponentType } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

type Stage = {
  id: string;
  label: string;
  accent: string;
  title: string;
  body: string;
  technical: string;
  Icon: ComponentType<{ size?: number; className?: string }>;
  code?: string[];
  channels?: string[];
};

const STAGES: Stage[] = [
  {
    id: "ingest",
    label: "INGEST",
    accent: "#14b8a6",
    title: "Event Ingestion",
    body:
      "Every action across your connected systems — document requested, job completed, vendor insurance expired, revenue recorded — is captured as a canonical event and written to the platform event bus.",
    technical: 'source: "propertydocz"  |  event_type: "document.requested"',
    Icon: Database,
    code: [
      "{",
      '  source: "propertydocz",',
      '  event_type: "document.requested",',
      "  entity_id: \"assoc_429\",",
      "  ts: \"2026-04-15T14:03:22Z\"",
      "}",
    ],
  },
  {
    id: "detect",
    label: "DETECT",
    accent: "#f59e0b",
    title: "Signal Engine",
    body:
      "Configurable rules scan for patterns. AI correlation runs daily to surface what humans wouldn't think to query. Cross-system patterns — a vendor compliance gap coinciding with pending document requests — become actionable signals.",
    technical:
      'rule: "vendor_insurance_expired + pending_docs > 2 within 7d" → severity: high',
    Icon: GitBranch,
    code: [
      "rule #CR-017",
      "when vendor.insurance.expired",
      "  and count(docs.pending) > 2",
      "  within 7d",
      "→ emit signal(severity: high)",
    ],
  },
  {
    id: "deliver",
    label: "DELIVER",
    accent: "#38b6ff",
    title: "Intelligence Delivery",
    body:
      "Signals become morning briefings, real-time alerts, and deep-dive analysis — delivered via email, SMS, Slack, Teams, or in-app. Intelligence meets operators where they are, not behind a dashboard login.",
    technical: "channels: [email, sms, slack, teams, in-app]",
    Icon: Send,
    channels: ["Email", "SMS", "Slack", "Teams", "In-App"],
  },
];

function FlowConnector({ vertical }: { vertical?: boolean }) {
  return (
    <div
      aria-hidden
      className={
        vertical
          ? "relative w-px h-10 mx-auto my-1 bg-gradient-to-b from-transparent via-[#38b6ff]/30 to-transparent overflow-hidden"
          : "relative flex-shrink-0 h-px w-8 lg:w-16 self-center bg-gradient-to-r from-transparent via-[#38b6ff]/30 to-transparent overflow-hidden"
      }
    >
      <span
        className={
          vertical
            ? "absolute left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#38b6ff] animate-flow-v"
            : "absolute top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-[#38b6ff] animate-flow-h"
        }
      />
    </div>
  );
}

export function Pipeline() {
  return (
    <section className="section-white py-24 md:py-32">
      <style>{`
        @keyframes flow-h {
          0% { left: 0; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        @keyframes flow-v {
          0% { top: 0; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-flow-h { animation: flow-h 3.2s linear infinite; }
        .animate-flow-v { animation: flow-v 3.2s linear infinite; }
      `}</style>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-14"
        >
          <h2
            className="font-bold tracking-tight text-[#0f172a]"
            style={{ fontSize: "clamp(1.75rem, 3.2vw, 2rem)" }}
          >
            From raw events to delivered intelligence
          </h2>
        </motion.div>

        {/* Desktop: horizontal */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          className="hidden lg:flex items-stretch gap-0"
        >
          {STAGES.map((s, i) => (
            <div key={s.id} className="contents">
              <StageCard stage={s} />
              {i < STAGES.length - 1 && <FlowConnector />}
            </div>
          ))}
        </motion.div>

        {/* Mobile / tablet: vertical */}
        <div className="lg:hidden flex flex-col items-stretch">
          {STAGES.map((s, i) => (
            <div key={s.id}>
              <StageCard stage={s} />
              {i < STAGES.length - 1 && <FlowConnector vertical />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StageCard({ stage }: { stage: Stage }) {
  const { Icon } = stage;
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: EASE },
        },
      }}
      className="dash-card flex-1 p-6 md:p-7 relative overflow-hidden min-w-0"
    >
      <div
        aria-hidden
        className="absolute left-0 right-0 top-0 h-[2px]"
        style={{ background: stage.accent }}
      />
      <div className="flex items-center gap-3">
        <span
          className="inline-flex items-center justify-center w-9 h-9 rounded-lg"
          style={{
            background: `${stage.accent}15`,
            color: stage.accent,
          }}
        >
          <Icon size={18} />
        </span>
        <span
          className="font-mono text-[11px] font-bold tracking-[0.14em]"
          style={{ color: stage.accent }}
        >
          {stage.label}
        </span>
      </div>
      <h3 className="mt-4 text-[17px] font-semibold text-[#0f172a]">
        {stage.title}
      </h3>
      <p className="mt-2 text-[13px] leading-[1.6] text-[#334155]">
        {stage.body}
      </p>

      {stage.code && (
        <pre className="mt-4 rounded-lg bg-[#0f172a] text-[#cbd5e1] p-3 text-[11px] leading-[1.55] font-mono overflow-x-auto">
          {stage.code.join("\n")}
        </pre>
      )}

      {stage.channels && (
        <div className="mt-4 flex flex-wrap gap-2">
          {stage.channels.map((c) => (
            <span
              key={c}
              className="font-mono text-[10px] px-2.5 py-1 rounded-full border border-[#e2e8f0] bg-[#FAFAFA] text-[#334155]"
            >
              {c}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 font-mono text-[10px] text-[#94a3b8] break-words">
        {stage.technical}
      </div>
    </motion.div>
  );
}
