"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  return (
    <section className="relative section-dark overflow-hidden">
      {/* Topo pattern */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          backgroundImage: "url(/topo-bg.svg)",
          backgroundSize: "cover",
        }}
      />
      {/* Radial gradient from center */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 35%, rgba(56,182,255,0.08) 0%, rgba(15,23,42,0) 55%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 md:pt-32 pb-32 md:pb-44">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-[11px] font-mono font-semibold uppercase tracking-[0.18em] text-[#38b6ff]"
          >
            AI Intelligence Platforms
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="mt-6 font-bold text-white leading-[1.08] tracking-[-0.01em]"
            style={{ fontSize: "clamp(2.25rem, 5.2vw, 3.5rem)" }}
          >
            Your business generates thousands of signals.
            <br />
            <span className="text-[#38b6ff]">
              You&apos;re missing most of them.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            className="mt-6 mx-auto max-w-[580px] text-[17px] leading-[1.6] text-[#94a3b8]"
          >
            We build AI intelligence platforms and automated growth systems.
            From operational intelligence to AI-powered marketing — we replace
            complexity with clarity and agencies with automation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link
              href="#console"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-[#38b6ff] hover:bg-[#0A8FD4] text-[#0f172a] font-semibold text-[14px] transition-all hover:brightness-105"
            >
              Try the Intelligence Console <span aria-hidden>↓</span>
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center px-7 py-3 rounded-lg border border-white/15 hover:border-white/30 text-[#f1f5f9] font-medium text-[14px] transition-colors"
            >
              See Pricing
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Soft fade into next section's white */}
      <div
        aria-hidden
        className="absolute left-0 right-0 bottom-0 h-24 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(15,23,42,0) 0%, #FFFFFF 100%)",
        }}
      />
    </section>
  );
}
