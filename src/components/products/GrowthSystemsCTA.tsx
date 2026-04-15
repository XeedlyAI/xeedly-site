"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export function GrowthSystemsCTA() {
  return (
    <section className="section-warm-wash py-24 md:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="font-bold tracking-tight text-[#0f172a]"
          style={{ fontSize: "clamp(1.75rem, 3.4vw, 2rem)" }}
        >
          Ready to replace your agency?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="mt-3 text-[15px] text-[#334155]"
        >
          Month-to-month. No contracts. AI that works while you sleep.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link
            href="/pricing"
            className="inline-flex items-center px-7 py-3 rounded-lg bg-[#38b6ff] hover:bg-[#0A8FD4] text-[#0f172a] font-semibold text-[14px] transition-all hover:brightness-105"
          >
            See Pricing →
          </Link>
          <Link
            href="/platform"
            className="text-[13px] font-semibold text-[#0A8FD4] hover:text-[#38b6ff] transition-colors"
          >
            Or explore the Intelligence Platform →
          </Link>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
          className="mt-8 text-[13px] text-[#64748b] italic"
        >
          Start with Growth Systems today. Upgrade to an Intelligence Platform
          when you&apos;re ready.
        </motion.p>
      </div>
    </section>
  );
}
