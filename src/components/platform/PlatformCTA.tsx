"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export function PlatformCTA() {
  return (
    <section className="relative section-dark py-24 md:py-32 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          backgroundImage: "url(/topo-bg.svg)",
          backgroundSize: "cover",
        }}
      />
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="font-bold text-white leading-[1.15]"
          style={{ fontSize: "clamp(1.75rem, 4vw, 2.25rem)" }}
        >
          Every operational business deserves an intelligence layer.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="mt-4 text-[17px] text-[#38b6ff] font-light"
        >
          Tell us about yours.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          className="mt-9 flex flex-col items-center gap-4"
        >
          <Link
            href="/contact"
            className="inline-flex items-center px-9 py-4 rounded-lg bg-[#38b6ff] hover:bg-[#0A8FD4] text-[#0f172a] font-bold text-[15px] transition-all hover:brightness-105"
          >
            Start a Conversation
          </Link>
          <Link
            href="/#console"
            className="text-[13px] text-[#94a3b8] hover:text-[#f1f5f9] transition-colors"
          >
            Or try the Intelligence Console on our homepage →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
