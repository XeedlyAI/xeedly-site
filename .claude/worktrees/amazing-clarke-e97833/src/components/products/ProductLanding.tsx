"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ */
/*  Hero — dark section with eyebrow / headline / subhead / CTA       */
/* ------------------------------------------------------------------ */

export function LandingHero({
  eyebrow,
  headlineBefore,
  headlineAfter,
  subhead,
  ctaHref = "/booking",
  ctaLabel = "Book a Discovery Call",
}: {
  eyebrow: string;
  headlineBefore: string;
  headlineAfter: string;
  subhead: string;
  ctaHref?: string;
  ctaLabel?: string;
}) {
  return (
    <section className="relative section-dark overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{ backgroundImage: "url(/topo-bg.svg)", backgroundSize: "cover" }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 35%, rgba(56,182,255,0.08) 0%, rgba(15,23,42,0) 55%)",
        }}
      />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-20 md:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-[11px] font-mono font-semibold uppercase tracking-[0.18em] text-[#38b6ff]"
        >
          {eyebrow}
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="mt-5 font-bold text-white leading-[1.08] tracking-[-0.01em]"
          style={{ fontSize: "clamp(2rem, 4.6vw, 3.25rem)" }}
        >
          {headlineBefore}
          <br />
          <span className="text-[#38b6ff]">{headlineAfter}</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          className="mt-6 text-[15px] leading-[1.7] text-[#94a3b8] max-w-[620px]"
        >
          {subhead}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
          className="mt-9"
        >
          <Link
            href={ctaHref}
            className="inline-flex items-center px-7 py-3.5 rounded-lg bg-[#38b6ff] hover:bg-[#0A8FD4] text-[#0f172a] font-semibold text-[14px] transition-all"
          >
            {ctaLabel} <span aria-hidden className="ml-2">→</span>
          </Link>
        </motion.div>
      </div>
      <div
        aria-hidden
        className="absolute left-0 right-0 bottom-0 h-20 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(15,23,42,0) 0%, #FFFFFF 100%)",
        }}
      />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Problem section — three signal cards with red/amber accents       */
/* ------------------------------------------------------------------ */

export type ProblemSignal = {
  severity: "red" | "amber";
  title: string;
  body: string;
};

const SEV_COLOR: Record<ProblemSignal["severity"], string> = {
  red: "#ef4444",
  amber: "#f59e0b",
};

export function ProblemSection({
  eyebrow,
  signals,
  bg = "section-white",
}: {
  eyebrow: string;
  signals: ProblemSignal[];
  bg?: string;
}) {
  return (
    <section className={`${bg} py-24 md:py-28`}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-10"
        >
          <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-[#64748b]">
            {eyebrow}
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {signals.map((s) => {
            const color = SEV_COLOR[s.severity];
            return (
              <motion.div
                key={s.title}
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: EASE },
                  },
                }}
                className="dash-card p-5 md:p-6"
                style={{ borderLeft: `3px solid ${color}` }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block w-2 h-2 rounded-full"
                    style={{
                      background: color,
                      boxShadow: `0 0 8px ${color}`,
                    }}
                  />
                  <span className="text-[14px] font-semibold text-[#0f172a]">
                    {s.title}
                  </span>
                </div>
                <p className="mt-2.5 text-[13px] leading-[1.6] text-[#334155]">
                  {s.body}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Setup Fee card + section                                          */
/* ------------------------------------------------------------------ */

export function SetupFeeSection({
  eyebrow = "Get Started",
  includes,
  note,
}: {
  eyebrow?: string;
  includes: string;
  note: string;
}) {
  return (
    <section className="section-white py-24 md:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-10"
        >
          <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-[#64748b]">
            {eyebrow}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="dash-card p-8 md:p-10 relative overflow-hidden"
          style={{ borderLeft: "3px solid #38b6ff" }}
        >
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="font-mono text-[18px] font-semibold text-[#94a3b8] line-through tabular-nums">
                  $1,500
                </span>
                <span className="font-mono text-[36px] font-bold text-[#0f172a] tabular-nums leading-none">
                  $500
                </span>
                <span className="text-[15px] text-[#64748b]">setup</span>
              </div>
            </div>
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] px-2.5 py-1 rounded-full bg-[#f59e0b]/10 text-[#b45309]">
              Limited Time
            </span>
          </div>
          <p className="mt-5 text-[13px] text-[#334155] leading-[1.65]">
            <span className="font-semibold text-[#0f172a]">Includes:</span>{" "}
            {includes}
          </p>
          <Link
            href="/booking"
            className="mt-6 inline-flex items-center px-6 py-3 rounded-lg bg-[#38b6ff] hover:bg-[#0A8FD4] text-[#0f172a] text-[14px] font-semibold transition-all"
          >
            Book a Discovery Call <span aria-hidden className="ml-2">→</span>
          </Link>
          <p className="mt-4 text-[12px] text-[#64748b] italic leading-[1.6]">
            {note}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Final dark CTA                                                    */
/* ------------------------------------------------------------------ */

export function LandingCTA({
  headlineBefore,
  headlineAfter,
  subhead,
  secondaryLabel,
  secondaryHref,
}: {
  headlineBefore: string;
  headlineAfter: string;
  subhead?: string;
  secondaryLabel: string;
  secondaryHref: string;
}) {
  return (
    <section className="relative section-dark py-24 md:py-32 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{ backgroundImage: "url(/topo-bg.svg)", backgroundSize: "cover" }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(56,182,255,0.08) 0%, rgba(15,23,42,0) 60%)",
        }}
      />
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="font-bold text-white leading-[1.1] tracking-[-0.01em]"
          style={{ fontSize: "clamp(1.75rem, 4vw, 2.25rem)" }}
        >
          {headlineBefore}{" "}
          <span className="text-[#38b6ff]">{headlineAfter}</span>
        </motion.h2>
        {subhead && (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="mt-5 text-[15px] text-[#94a3b8] max-w-xl mx-auto leading-[1.7]"
          >
            {subhead}
          </motion.p>
        )}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link
            href="/booking"
            className="inline-flex items-center px-8 py-3.5 rounded-lg bg-[#38b6ff] hover:bg-[#0A8FD4] text-[#0f172a] font-bold text-[15px] transition-all"
          >
            Book a Discovery Call
          </Link>
          <Link
            href={secondaryHref}
            className="inline-flex items-center px-8 py-3.5 rounded-lg border border-[#38b6ff]/40 hover:border-[#38b6ff] hover:bg-[#38b6ff]/10 text-[#38b6ff] font-semibold text-[14px] transition-all"
          >
            {secondaryLabel}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Pipeline — horizontal stage flow                                  */
/* ------------------------------------------------------------------ */

export function Pipeline({
  stages,
}: {
  stages: { label: string; sublabel?: string }[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: EASE }}
      className="flex flex-col md:flex-row items-stretch gap-3 md:gap-2"
    >
      {stages.map((stage, idx) => (
        <div
          key={stage.label}
          className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-2 flex-1 min-w-0"
        >
          <div
            className="flex-1 rounded-lg border px-4 py-3 md:py-3.5 min-w-0 bg-white"
            style={{
              borderColor: "#e2e8f0",
              borderLeft: "3px solid #38b6ff",
            }}
          >
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0f172a] break-words">
              {stage.label}
            </div>
            {stage.sublabel && (
              <div className="mt-1 font-mono text-[10px] text-[#64748b] break-words">
                {stage.sublabel}
              </div>
            )}
          </div>
          {idx < stages.length - 1 && (
            <span
              aria-hidden
              className="font-mono text-[14px] text-[#94a3b8] self-center"
            >
              →
            </span>
          )}
        </div>
      ))}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section wrapper with eyebrow + optional heading                    */
/* ------------------------------------------------------------------ */

export function LandingSection({
  bg,
  eyebrow,
  heading,
  children,
  maxW = "max-w-6xl",
}: {
  bg: string;
  eyebrow?: string;
  heading?: string;
  children: ReactNode;
  maxW?: string;
}) {
  return (
    <section className={`${bg} py-24 md:py-28`}>
      <div className={`mx-auto ${maxW} px-4 sm:px-6 lg:px-8`}>
        {(eyebrow || heading) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-center mb-10"
          >
            {eyebrow && (
              <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-[#64748b]">
                {eyebrow}
              </div>
            )}
            {heading && (
              <h2
                className="mt-3 font-bold tracking-tight text-[#0f172a]"
                style={{ fontSize: "clamp(1.5rem, 2.8vw, 1.875rem)" }}
              >
                {heading}
              </h2>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}

export { EASE };
