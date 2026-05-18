"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BlogCard } from "@/components/blog/BlogCard";
import { getRecentArticles } from "@/data/blog";

const EASE = [0.16, 1, 0.3, 1] as const;

export function RecentBriefings() {
  const recent = getRecentArticles(3);
  if (recent.length === 0) return null;

  return (
    <section className="section-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="text-[10px] font-mono font-semibold uppercase tracking-[0.15em] text-[#64748b]">
            Recent Briefings
          </div>
          <h2
            className="mt-3 font-bold tracking-tight text-[#0f172a]"
            style={{ fontSize: "clamp(1.75rem, 3.2vw, 2rem)" }}
          >
            Intelligence delivered, not buried.
          </h2>
          <p className="mt-4 text-[14px] leading-[1.6] text-[#334155] max-w-xl mx-auto">
            Tactical and philosophical briefings on operational intelligence,
            multi-unit operations, and building businesses that run without
            you.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {recent.map((a) => (
            <BlogCard key={a.slug} article={a} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="mt-12 text-center"
        >
          <Link
            href="/blog"
            className="inline-flex items-center font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[#38b6ff] hover:text-[#0A8FD4] transition-colors"
          >
            See all briefings →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
