"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export function BlogIndexHero() {
  return (
    <section className="relative section-dark overflow-hidden">
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
            "radial-gradient(ellipse at 50% 40%, rgba(56,182,255,0.10) 0%, rgba(15,23,42,0) 55%)",
        }}
      />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-24 md:pt-28 pb-20 md:pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-[11px] font-mono font-semibold uppercase tracking-[0.18em] text-[#38b6ff]"
        >
          The Xeedly Briefings
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="mt-5 font-bold text-white leading-[1.1] tracking-[-0.01em]"
          style={{ fontSize: "clamp(2rem, 4.8vw, 3rem)" }}
        >
          Intelligence for leaders who refuse to be{" "}
          <span className="text-[#38b6ff]">built by what they built.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
          className="mt-6 text-[15px] md:text-[16px] text-[#94a3b8] max-w-2xl mx-auto leading-[1.7]"
        >
          Tactical and philosophical briefings on operational intelligence,
          multi-unit operations, and building businesses that run without you
          in the middle of everything.
        </motion.p>
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
