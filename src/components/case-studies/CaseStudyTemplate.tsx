"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CONTACT } from "@/lib/contact";
import { KpiTicker } from "@/components/layout/KpiTicker";
import { SignalCard } from "@/components/shared/SignalCard";
import { SectionReveal } from "@/components/shared/SectionReveal";
import {
  STATUS_ACCENT,
  CASE_STUDIES_BY_SLUG,
  type CaseStudy,
} from "@/data/case-studies";

const EASE = [0.16, 1, 0.3, 1] as const;

type CaseStudyTemplateProps = {
  slug: string;
};

export function CaseStudyTemplate({ slug }: CaseStudyTemplateProps) {
  const data = CASE_STUDIES_BY_SLUG[slug];
  if (!data) {
    throw new Error(`Unknown case study slug: ${slug}`);
  }
  const industry = STATUS_ACCENT[data.industryAccent];

  return (
    <>
      <DeploymentHeader data={data} industryStyle={industry} />
      <ProblemSection data={data} />
      <SolutionSection data={data} />
      <StackSection data={data} />
      <OutcomeSection data={data} />
      <IntelligenceLayerSection data={data} />
      <CaseStudyCTA />
    </>
  );
}

// ---------------------------------------------------------------------------
// Section 1 — Deployment Header (Dark)
// ---------------------------------------------------------------------------

function DeploymentHeader({
  data,
  industryStyle,
}: {
  data: CaseStudy;
  industryStyle: { text: string; bg: string; border: string };
}) {
  return (
    <section className="section-dark relative overflow-hidden pt-28 md:pt-32 pb-20 md:pb-24">
      <div
        aria-hidden
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          backgroundImage: "url(/topo-bg.svg)",
          backgroundSize: "cover",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 35%, rgba(56,182,255,0.08) 0%, rgba(15,23,42,0) 55%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <div className="text-[10px] font-mono font-semibold uppercase tracking-[0.15em] text-[#38b6ff]">
                Deployment Brief
              </div>
              <h1
                className="mt-4 font-bold tracking-tight text-[#f1f5f9]"
                style={{ fontSize: "clamp(2rem, 4.6vw, 3.25rem)", lineHeight: 1.08 }}
              >
                {data.clientName}
              </h1>
              <span
                className="mt-5 inline-flex items-center font-mono text-[10px] font-semibold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full"
                style={{ color: industryStyle.text, background: industryStyle.bg }}
              >
                {data.industry}
              </span>
              <p
                className="mt-6 text-[#94a3b8] leading-[1.6]"
                style={{ fontSize: "15px", maxWidth: "32rem" }}
              >
                {data.summary}
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="lg:col-span-5"
          >
            <div
              className="rounded-xl border p-5 md:p-6"
              style={{
                background: "rgba(255,255,255,0.04)",
                borderColor: "rgba(56,182,255,0.12)",
                boxShadow: "0 20px 40px -20px rgba(0,0,0,0.4)",
              }}
            >
              <div className="flex items-center gap-2 mb-5">
                <span className="relative inline-flex w-2 h-2">
                  <span className="absolute inset-0 rounded-full bg-[#14b8a6] animate-ping opacity-70" />
                  <span className="relative rounded-full w-2 h-2 bg-[#14b8a6]" />
                </span>
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#94a3b8]">
                  Deployment Metadata
                </span>
              </div>
              <dl className="space-y-3.5">
                {data.headerMetrics.map((m) => (
                  <div
                    key={m.label}
                    className="flex items-start justify-between gap-4 pb-3 border-b border-white/[0.06] last:border-b-0 last:pb-0"
                  >
                    <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#64748b] shrink-0">
                      {m.label}
                    </dt>
                    <dd className="font-mono text-[12px] md:text-[13px] font-semibold text-[#f1f5f9] text-right leading-tight">
                      {m.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Section 2 — The Problem (White)
// ---------------------------------------------------------------------------

function ProblemSection({ data }: { data: CaseStudy }) {
  return (
    <section className="section-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal className="max-w-2xl mb-12">
          <div className="text-[10px] font-mono font-semibold uppercase tracking-[0.15em] text-[#64748b]">
            The Problem
          </div>
          <h2
            className="mt-3 font-bold tracking-tight text-[#0f172a]"
            style={{ fontSize: "clamp(1.75rem, 3.2vw, 2rem)" }}
          >
            Signals detected before the deployment.
          </h2>
        </SectionReveal>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {data.problemSignals.map((s) => (
            <SignalCard
              key={s.title}
              accent={s.accent}
              title={s.title}
              body={s.body}
              source="pre-deployment"
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Section 3 — The Solution (Lavender wash)
// ---------------------------------------------------------------------------

function SolutionSection({ data }: { data: CaseStudy }) {
  return (
    <section className="section-lavender-wash relative overflow-hidden py-24 md:py-32">
      <div
        aria-hidden
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          backgroundImage: "url(/topo-bg-light.svg)",
          backgroundSize: "cover",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal className="max-w-2xl mb-10">
          <div className="text-[10px] font-mono font-semibold uppercase tracking-[0.15em] text-[#64748b]">
            The Deployment
          </div>
          <h2
            className="mt-3 font-bold tracking-tight text-[#0f172a]"
            style={{ fontSize: "clamp(1.75rem, 3.2vw, 2rem)" }}
          >
            The systems built and wired together.
          </h2>
        </SectionReveal>

        <Pipeline stages={data.pipelineStages} />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {data.solutionFeatures.map((f) => (
            <motion.div
              key={f.title}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: EASE },
                },
              }}
              className="dash-card p-6"
              style={{ borderLeft: "3px solid #38b6ff" }}
            >
              <h3 className="text-[14px] font-semibold text-[#0f172a]">
                {f.title}
              </h3>
              <p className="mt-2 text-[13px] leading-[1.6] text-[#334155]">
                {f.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {f.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] px-2 py-1 rounded-full border border-[#e2e8f0] bg-[#FAFAFA] text-[#64748b]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Pipeline visualization (used in Solution section)
// ---------------------------------------------------------------------------

function Pipeline({
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
            className="flex-1 rounded-lg border px-4 py-3 md:py-3.5 min-w-0"
            style={{
              background: "rgba(255,255,255,0.6)",
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
            <div className="flex justify-center md:py-0 py-1">
              <ArrowRight
                size={18}
                className="text-[#38b6ff] rotate-90 md:rotate-0"
                aria-hidden
              />
            </div>
          )}
        </div>
      ))}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Section 4 — The Stack (Blue wash)
// ---------------------------------------------------------------------------

function StackSection({ data }: { data: CaseStudy }) {
  return (
    <section className="section-blue-wash py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal className="max-w-2xl mb-8">
          <div className="text-[10px] font-mono font-semibold uppercase tracking-[0.15em] text-[#64748b]">
            The Stack
          </div>
          <h2
            className="mt-3 font-bold tracking-tight text-[#0f172a]"
            style={{ fontSize: "clamp(1.5rem, 2.8vw, 1.75rem)" }}
          >
            What powered the deployment.
          </h2>
        </SectionReveal>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.04 } },
          }}
          className="flex flex-wrap gap-2"
        >
          {data.stackTags.map((t) => (
            <motion.span
              key={t}
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.3, ease: EASE },
                },
              }}
              className="font-mono text-[11px] px-3 py-1.5 rounded-full border border-[#38b6ff]/20 bg-white text-[#334155]"
            >
              {t}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Section 5 — The Outcome (White)
// ---------------------------------------------------------------------------

function OutcomeSection({ data }: { data: CaseStudy }) {
  return (
    <section className="section-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal className="max-w-2xl mb-10">
          <div className="text-[10px] font-mono font-semibold uppercase tracking-[0.15em] text-[#64748b]">
            The Outcome
          </div>
          <h2
            className="mt-3 font-bold tracking-tight text-[#0f172a]"
            style={{ fontSize: "clamp(1.75rem, 3.2vw, 2rem)" }}
          >
            What landed in production.
          </h2>
        </SectionReveal>

        <SectionReveal className="mb-10 rounded-xl overflow-hidden border border-[rgba(56,182,255,0.18)]">
          <KpiTicker variant="light" kpis={data.outcomeKpis} />
        </SectionReveal>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {data.outcomeSignals.map((s) => (
            <SignalCard
              key={s.title}
              accent={s.accent}
              title={s.title}
              body={s.body}
              source="outcome"
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Section 6 — The Intelligence Layer (Warm wash)
// ---------------------------------------------------------------------------

function IntelligenceLayerSection({ data }: { data: CaseStudy }) {
  return (
    <section className="section-warm-wash py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionReveal className="mb-8">
          <div className="text-[10px] font-mono font-semibold uppercase tracking-[0.15em] text-[#64748b]">
            The Intelligence Layer
          </div>
          <h2
            className="mt-3 font-bold tracking-tight text-[#0f172a]"
            style={{ fontSize: "clamp(1.5rem, 2.8vw, 1.75rem)" }}
          >
            How the XeedlyAI IP applies here.
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div
            className="dash-card p-7 md:p-9"
            style={{ borderLeft: "3px solid #38b6ff" }}
          >
            <p className="text-[15px] leading-[1.7] text-[#334155]">
              {data.intelligenceLayerText}
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Section 7 — CTA (Dark)
// ---------------------------------------------------------------------------

function CaseStudyCTA() {
  return (
    <section className="section-dark relative overflow-hidden py-24 md:py-32">
      <div
        aria-hidden
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          backgroundImage: "url(/topo-bg.svg)",
          backgroundSize: "cover",
        }}
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
        <SectionReveal>
          <h2
            className="font-bold tracking-tight"
            style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.25rem)" }}
          >
            <span className="text-[#f1f5f9]">Same architecture.</span>{" "}
            <span className="text-[#38b6ff]">Your vertical.</span>
          </h2>
          <p className="mt-5 text-[15px] leading-[1.6] text-[#94a3b8] max-w-xl mx-auto">
            We&apos;ve deployed intelligence platforms in property investment,
            property management, and restaurants. Yours could be next.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={CONTACT.calendar}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-[#38b6ff] hover:bg-[#0A8FD4] text-[#0f172a] rounded-lg px-7 py-3 text-[14px] font-semibold transition-colors"
            >
              Book a Discovery Call
            </a>
            <Link
              href="/case-studies"
              className="inline-flex items-center justify-center border border-[#38b6ff]/40 hover:border-[#38b6ff] hover:bg-[#38b6ff]/10 text-[#38b6ff] rounded-lg px-7 py-3 text-[14px] font-semibold transition-colors"
            >
              See All Deployments
            </Link>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
