"use client";

import { motion } from "framer-motion";
import { DESK_STORIES } from "@/data/desks";
import { FadeUpChild, StaggerContainer } from "@/components/shared/SectionReveal";

export function DeskStories() {
  return (
    <section id="stories" className="bg-white scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="max-w-3xl">
          <div className="text-[10px] font-mono font-semibold uppercase tracking-[0.15em] text-[#64748b]">
            How this started
          </div>
          <h2
            className="mt-3 font-bold tracking-tight text-[#0f172a]"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.1rem)" }}
          >
            Nobody planned a product.{" "}
            <span className="text-[#38b6ff]">
              Four people needed a desk, and we had the brain to build one on.
            </span>
          </h2>
          <p className="mt-4 text-[15px] text-[#334155] leading-[1.7]">
            We spent months inside a Utah property-management firm building the
            system it now runs on. Once the data was in one place, every new ask
            turned out to be the same shape: a role, the few lines that matter
            to it, the actions that are theirs, and a report for whoever pays
            them. Each one took days, not quarters.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={StaggerContainer}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {DESK_STORIES.map((s) => (
            <motion.article
              key={s.role}
              variants={FadeUpChild}
              className="rounded-xl border border-[#e2e8f0] bg-white p-6 md:p-7 flex flex-col"
              style={{ borderLeft: `3px solid ${s.accent}` }}
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-bold text-[#0f172a] text-[18px] leading-[1.3]">
                  {s.role}
                </h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#64748b] text-right">
                  {s.business}
                </span>
              </div>
              <p className="mt-4 text-[14px] text-[#334155] leading-[1.7]">
                <span className="font-semibold text-[#0f172a]">The ask. </span>
                {s.asked}
              </p>
              <p className="mt-3 text-[14px] text-[#334155] leading-[1.7]">
                <span className="font-semibold text-[#0f172a]">The desk. </span>
                {s.shipped}
              </p>
              <div className="mt-5 pt-4 border-t border-[#f1f5f9] font-mono text-[11px] text-[#64748b]">
                {s.time}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
