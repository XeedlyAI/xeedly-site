"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { DeploymentCard } from "@/components/case-studies/DeploymentCard";
import { SectionReveal } from "@/components/shared/SectionReveal";
import {
  CASE_STUDIES_BY_SLUG,
  HOMEPAGE_PREVIEW_SLUGS,
} from "@/data/case-studies";

export function CaseStudiesPreview() {
  const previewStudies = HOMEPAGE_PREVIEW_SLUGS.map(
    (slug) => CASE_STUDIES_BY_SLUG[slug],
  ).filter(Boolean);

  return (
    <section className="section-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-[10px] font-mono font-semibold uppercase tracking-[0.15em] text-[#64748b]">
            Deployment Briefs
          </div>
          <h2
            className="mt-3 font-bold tracking-tight text-[#0f172a]"
            style={{ fontSize: "clamp(1.75rem, 3.2vw, 2rem)" }}
          >
            Proven in production.
          </h2>
          <p className="mt-4 text-[14px] leading-[1.6] text-[#334155] max-w-xl mx-auto">
            Six deployments across property investment, property management,
            and restaurant intelligence. Same architecture, different verticals.
          </p>
        </SectionReveal>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {previewStudies.map((cs) => (
            <DeploymentCard key={cs.slug} data={cs.card} variant="compact" />
          ))}
        </motion.div>

        <SectionReveal className="mt-12 text-center" delay={0.1}>
          <Link
            href="/case-studies"
            className="inline-flex items-center font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[#38b6ff] hover:text-[#0A8FD4] transition-colors"
          >
            See all deployment briefs →
          </Link>
        </SectionReveal>
      </div>
    </section>
  );
}
