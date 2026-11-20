"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CONTACT, TEL } from "@/lib/contact";

const EASE = [0.16, 1, 0.3, 1] as const;

export function DesksCTA() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="font-bold text-[#0f172a] leading-[1.15] tracking-tight"
          style={{ fontSize: "clamp(1.75rem, 4vw, 2.4rem)" }}
        >
          Made to run.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="mt-5 text-[15px] text-[#334155] max-w-xl mx-auto leading-[1.7]"
        >
          A business that runs from a phone is a business that runs without you
          in the middle of everything. Pick the role. We will build the desk.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link
            href="#offer"
            className="inline-flex items-center px-8 py-3.5 rounded-lg bg-[#38b6ff] hover:bg-[#0A8FD4] text-[#0f172a] font-bold text-[15px] transition-all"
          >
            Claim a Desk Sprint slot
          </Link>
          <a
            href={TEL}
            className="inline-flex items-center px-8 py-3.5 rounded-lg border border-[#0f172a]/15 hover:border-[#0f172a]/40 text-[#0f172a] font-semibold text-[14px] transition-all font-mono"
          >
            {CONTACT.phone}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
