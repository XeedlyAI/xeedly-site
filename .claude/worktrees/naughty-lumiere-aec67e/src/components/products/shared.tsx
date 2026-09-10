"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const EASE = [0.16, 1, 0.3, 1] as const;

type ProductHeaderProps = {
  name: string;
  vertical: string;
  verticalAccent: string;
  status?: string;
  statusAccent?: string;
  oneLiner: string;
  link?: { href: string; label: string; external?: boolean };
};

export function ProductHeader({
  name,
  vertical,
  verticalAccent,
  status,
  statusAccent,
  oneLiner,
  link,
}: ProductHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: EASE }}
      className="max-w-3xl"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span
          className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full"
          style={{
            color: verticalAccent,
            background: `${verticalAccent}14`,
          }}
        >
          {vertical}
        </span>
        {status && statusAccent && (
          <span
            className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] px-2 py-0.5 rounded-full"
            style={{
              color: statusAccent,
              background: `${statusAccent}14`,
            }}
          >
            {status}
          </span>
        )}
      </div>
      <h2
        className="mt-4 font-bold tracking-tight text-[#0f172a]"
        style={{ fontSize: "clamp(2rem, 4vw, 2.25rem)" }}
      >
        {name}
      </h2>
      <p className="mt-4 text-[15px] leading-[1.6] text-[#334155]">
        {oneLiner}
      </p>
      {link && (
        <Link
          href={link.href}
          target={link.external ? "_blank" : undefined}
          rel={link.external ? "noreferrer" : undefined}
          className="mt-4 inline-flex items-center text-[13px] font-semibold text-[#0A8FD4] hover:text-[#38b6ff] transition-colors"
        >
          {link.label}
        </Link>
      )}
    </motion.div>
  );
}

type FeatureBlockProps = {
  feature: string;
  description: string;
  visual: ReactNode;
  reverse?: boolean;
};

export function FeatureBlock({
  feature,
  description,
  visual,
  reverse,
}: FeatureBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: EASE }}
      className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
    >
      <div className={cn(reverse && "md:order-2")}>
        <h3 className="text-[20px] font-bold text-[#0f172a]">{feature}</h3>
        <p className="mt-3 text-[14px] leading-[1.65] text-[#334155]">
          {description}
        </p>
      </div>
      <div className={cn(reverse && "md:order-1")}>{visual}</div>
    </motion.div>
  );
}

type FeatureGridItem = {
  title: string;
  body: string;
};

export function FeatureGrid({
  items,
  accent = "#38b6ff",
}: {
  items: FeatureGridItem[];
  accent?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
      className="grid grid-cols-1 md:grid-cols-3 gap-5"
    >
      {items.map((it) => (
        <motion.div
          key={it.title}
          variants={{
            hidden: { opacity: 0, y: 14 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, ease: EASE },
            },
          }}
          className="dash-card p-6"
          style={{ borderLeft: `3px solid ${accent}` }}
        >
          <h4 className="text-[15px] font-semibold text-[#0f172a]">
            {it.title}
          </h4>
          <p className="mt-2 text-[13px] leading-[1.6] text-[#334155]">
            {it.body}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}

/** Small rendered briefing card (reused across product visuals). */
export function MiniBriefing({
  title,
  sections,
}: {
  title: string;
  sections: { icon: string; title: string; body: string }[];
}) {
  return (
    <div className="p-5 bg-white rounded-xl border border-[#e2e8f0] shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="font-mono text-[12px] text-[#0f172a] font-semibold">
        <span className="text-[#38b6ff]">▸</span> {title}
      </div>
      <div className="mt-3 space-y-2.5">
        {sections.map((s, i) => (
          <div
            key={i}
            className="status-info p-3 rounded-lg bg-[#FAFAFA]"
          >
            <div className="flex items-center gap-2">
              <span className="text-[13px]">{s.icon}</span>
              <span className="text-[11px] font-semibold text-[#38b6ff]">
                {s.title}
              </span>
            </div>
            <p className="mt-1.5 text-[12px] leading-[1.55] text-[#334155]">
              {s.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CodeBlock({ lines }: { lines: string[] }) {
  return (
    <pre className="rounded-xl bg-[#0f172a] text-[#cbd5e1] p-4 text-[12px] leading-[1.6] font-mono overflow-x-auto border border-[#1e293b]">
      {lines.join("\n")}
    </pre>
  );
}
