"use client";

import { motion } from "framer-motion";
import { KpiTicker } from "@/components/layout/KpiTicker";
import { DeploymentCard } from "@/components/case-studies/DeploymentCard";
import { SectionReveal } from "@/components/shared/SectionReveal";
import { CASE_STUDIES, OVERVIEW_KPIS } from "@/data/case-studies";

const EASE = [0.16, 1, 0.3, 1] as const;

export function CaseStudiesOverview() {
  return (
    <>
      {/* Hero */}
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
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="text-[10px] font-mono font-semibold uppercase tracking-[0.15em] text-[#38b6ff]"
          >
            Deployment Briefs
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="mt-5 font-bold tracking-tight"
            style={{ fontSize: "clamp(2rem, 4.6vw, 3.25rem)", lineHeight: 1.08 }}
          >
            <span className="text-[#f1f5f9]">Built. Deployed.</span>{" "}
            <span className="text-[#38b6ff]">Proven.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            className="mt-6 text-[15px] leading-[1.6] text-[#94a3b8] max-w-2xl mx-auto"
          >
            Every deployment follows the same architecture. Event ingestion.
            Signal detection. Proactive delivery. Here&apos;s what it looks
            like in production.
          </motion.p>
        </div>
      </section>

      {/* Aggregate KPI ticker */}
      <KpiTicker variant="dark" kpis={OVERVIEW_KPIS} />

      {/* Deployment cards grid */}
      <section className="section-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-[10px] font-mono font-semibold uppercase tracking-[0.15em] text-[#64748b]">
              Active Deployments
            </div>
            <h2
              className="mt-3 font-bold tracking-tight text-[#0f172a]"
              style={{ fontSize: "clamp(1.75rem, 3.2vw, 2rem)" }}
            >
              Four deployments. Three verticals. One architecture.
            </h2>
          </SectionReveal>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.15 } },
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {CASE_STUDIES.map((cs) => (
              <DeploymentCard key={cs.slug} data={cs.card} />
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
