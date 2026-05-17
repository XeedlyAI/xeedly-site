"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CONTACT } from "@/lib/contact";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ManifestoCTA() {
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
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(56,182,255,0.10) 0%, rgba(15,23,42,0) 60%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="font-bold text-white leading-[1.15] tracking-[-0.01em]"
          style={{ fontSize: "clamp(1.85rem, 4vw, 2.35rem)" }}
        >
          If this is the kind of company you want to{" "}
          <span className="text-[#38b6ff]">talk to —</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="mt-6 text-[16px] text-[#94a3b8] max-w-xl mx-auto leading-[1.7]"
        >
          — tell us about your business. We&apos;ll respond within a day. No
          sales script. No pressure. Just a conversation about what you&apos;re
          building and whether we can help.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a
            href={CONTACT.calendar}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-3.5 rounded-lg bg-[#38b6ff] hover:bg-[#0A8FD4] text-[#0f172a] font-bold text-[15px] transition-all hover:brightness-105"
          >
            Start a Conversation
          </a>
          <Link
            href="/about"
            className="inline-flex items-center px-8 py-3.5 rounded-lg border border-[#38b6ff]/40 hover:border-[#38b6ff] hover:bg-[#38b6ff]/10 text-[#38b6ff] font-semibold text-[14px] transition-all"
          >
            Learn how we build →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
