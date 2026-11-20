"use client";

import { motion } from "framer-motion";
import { DESK_PRIMITIVES } from "@/data/desks";
import { FadeUpChild, StaggerContainer } from "@/components/shared/SectionReveal";

export function DeskPrimitives() {
  return (
    <section className="bg-[#F0F6FF]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-5">
            <div className="text-[10px] font-mono font-semibold uppercase tracking-[0.15em] text-[#64748b]">
              Why it takes days
            </div>
            <h2
              className="mt-3 font-bold tracking-tight text-[#0f172a]"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.1rem)" }}
            >
              Every desk is built from{" "}
              <span className="text-[#38b6ff]">the same eight parts.</span>
            </h2>
            <p className="mt-4 text-[15px] text-[#334155] leading-[1.7]">
              The treasurer&apos;s desk is Balance, List and Report. The on-site
              desk is List, Line, Mark and Report. A board desk adds Approve and
              Ask. Because the parts already exist and the data already sits in
              one place, a new desk is a question of which parts, for whom, with
              which actions. That is a day&apos;s decision and a few days&apos;
              build, not a software project.
            </p>
            <p className="mt-4 text-[15px] text-[#334155] leading-[1.7]">
              Under every desk is one brain: your mail, your documents, your
              system of record, every action logged with who took it. The desks
              are how that brain reaches the people who need it.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={StaggerContainer}
            className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3"
          >
            {DESK_PRIMITIVES.map((p, i) => (
              <motion.div
                key={p.name}
                variants={FadeUpChild}
                className="rounded-lg bg-white border border-[#e2e8f0] p-4 min-h-[150px] flex flex-col"
              >
                <div className="font-mono text-[10px] text-[#38b6ff] tracking-[0.12em]">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="mt-2 font-bold text-[#0f172a] text-[16px]">{p.name}</div>
                <p className="mt-2 text-[12.5px] text-[#334155] leading-[1.55]">{p.what}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
