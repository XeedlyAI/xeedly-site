"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Article } from "@/types/blog";
import { SILOS } from "@/types/blog";
import { ArticleBody } from "./ArticleRenderer";
import { BlogCard } from "./BlogCard";
import { CONTACT } from "@/lib/contact";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ArticleLayout({
  article,
  laterals,
}: {
  article: Article;
  laterals: Article[];
}) {
  const silo = SILOS[article.silo];

  return (
    <article>
      {/* Hero / Breadcrumb / Title block */}
      <section className="relative section-dark overflow-hidden pt-24 md:pt-28 pb-16 md:pb-20">
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
              "radial-gradient(ellipse at 50% 30%, rgba(56,182,255,0.10) 0%, rgba(15,23,42,0) 60%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            aria-label="Breadcrumb"
            className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#94a3b8] flex items-center flex-wrap gap-x-2"
          >
            <Link href="/blog" className="hover:text-[#38b6ff] transition-colors">
              BLOG
            </Link>
            <span className="text-[#475569]">/</span>
            <Link
              href={`/blog/${article.silo}`}
              className="hover:text-[#38b6ff] transition-colors"
            >
              {silo.name}
            </Link>
          </motion.nav>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="mt-6 font-bold text-white leading-[1.15] tracking-[-0.01em]"
            style={{ fontSize: "clamp(1.85rem, 4.4vw, 2.75rem)" }}
          >
            {article.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.08em] text-[#94a3b8]"
          >
            <span className="text-[#38b6ff]">— {article.author}</span>
            <span>{article.readingTimeMinutes} min read</span>
            <span>{formatDate(article.publishDate)}</span>
          </motion.div>
        </div>
      </section>

      {/* Hero image */}
      {article.heroImage && (
        <section className="bg-white -mt-px">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 md:pt-12">
            <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl bg-[#f1f5f9]">
              <Image
                src={article.heroImage}
                alt={article.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1400px) 100vw, 1400px"
              />
            </div>
          </div>
        </section>
      )}

      {/* Body */}
      <section className="section-white pt-12 md:pt-16 pb-20 md:pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Direct Answer — styled as a signal card */}
          <div className="rounded-r-lg border-l-4 border-l-[#38b6ff] bg-[#38b6ff]/[0.06] p-5 md:p-6 mb-10">
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#38b6ff] mb-2">
              DIRECT ANSWER
            </div>
            <p className="text-[16px] md:text-[17px] leading-[1.7] text-[#0f172a] m-0 font-medium">
              {article.directAnswer}
            </p>
          </div>

          {/* Sections */}
          <ArticleBody sections={article.sections} />

          {/* Trust Signals */}
          <section className="mt-12 pt-10 border-t border-[#e2e8f0]">
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#64748b]">
              TRUST SIGNALS
            </div>
            <h2 className="mt-3 text-[24px] md:text-[28px] font-bold text-[#0f172a] tracking-tight">
              {article.trustSignals.heading}
            </h2>
            <p className="mt-4 text-[16px] md:text-[17px] leading-[1.75] text-[#334155]">
              {article.trustSignals.body}
            </p>
            {article.trustSignals.caseStudies &&
              article.trustSignals.caseStudies.length > 0 && (
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {article.trustSignals.caseStudies.map((cs) => (
                    <Link
                      key={cs.slug}
                      href={`/case-studies/${cs.slug}`}
                      className="group flex items-center justify-between gap-3 rounded-lg border border-[#e2e8f0] hover:border-[#38b6ff] bg-white p-4 transition-colors"
                    >
                      <span className="text-[14px] font-medium text-[#0f172a] group-hover:text-[#0A8FD4]">
                        {cs.label}
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#64748b] group-hover:text-[#38b6ff] transition-colors" />
                    </Link>
                  ))}
                </div>
              )}
          </section>

          {/* FAQ */}
          {article.faq.length > 0 && (
            <section className="mt-12 pt-10 border-t border-[#e2e8f0]">
              <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#64748b]">
                FREQUENTLY ASKED
              </div>
              <h2 className="mt-3 text-[24px] md:text-[28px] font-bold text-[#0f172a] tracking-tight">
                Questions, answered.
              </h2>
              <dl className="mt-6 space-y-6">
                {article.faq.map((f, i) => (
                  <div key={i}>
                    <dt className="text-[16px] md:text-[17px] font-bold text-[#0f172a] leading-[1.4]">
                      {f.q}
                    </dt>
                    <dd className="mt-2 text-[15px] md:text-[16px] leading-[1.7] text-[#334155]">
                      {f.a}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {/* CTA */}
          <section className="mt-12">
            <div className="rounded-xl bg-[#0f172a] text-white p-8 md:p-10 relative overflow-hidden">
              <div
                aria-hidden
                className="absolute inset-0 opacity-40 pointer-events-none"
                style={{
                  backgroundImage: "url(/topo-bg.svg)",
                  backgroundSize: "cover",
                }}
              />
              <div className="relative">
                <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#38b6ff]">
                  NEXT STEP
                </div>
                <h3
                  className="mt-3 font-bold text-white leading-[1.2]"
                  style={{ fontSize: "clamp(1.35rem, 2.6vw, 1.7rem)" }}
                >
                  {article.cta.heading}
                </h3>
                <p className="mt-3 text-[15px] text-[#94a3b8] leading-[1.7] max-w-xl">
                  {article.cta.body}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={article.cta.primaryAction.href}
                    className="inline-flex items-center px-6 py-3 rounded-lg bg-[#38b6ff] hover:bg-[#0A8FD4] text-[#0f172a] font-bold text-[14px] transition-colors"
                  >
                    {article.cta.primaryAction.label}
                  </Link>
                  <Link
                    href={article.internalLinks.pillar}
                    className="inline-flex items-center px-6 py-3 rounded-lg border border-[#38b6ff]/40 hover:border-[#38b6ff] text-[#38b6ff] font-semibold text-[13px] transition-colors"
                  >
                    Explore the {silo.name === "PRINCIPAL-INTELLIGENCE" ? "Platform" : silo.name === "MULTI-UNIT-OPS" ? "Products" : "Manifesto"} →
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* Related Briefings */}
      {laterals.length > 0 && (
        <section className="section-blue-wash py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-[#64748b]">
                RELATED BRIEFINGS
              </div>
              <h2 className="mt-3 text-[24px] md:text-[28px] font-bold text-[#0f172a] tracking-tight">
                More from{" "}
                <span className="font-mono text-[#0A8FD4]">{silo.name}</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {laterals.map((a) => (
                <BlogCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
