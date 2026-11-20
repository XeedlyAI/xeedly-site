"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { DESK_SPRINT } from "@/data/desks";

const EASE = [0.16, 1, 0.3, 1] as const;

const ROLES = ["the field", "the board", "the treasurer", "the contractor", "the rep"];

export function DesksHero() {
  return (
    <section className="relative section-dark overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{ backgroundImage: "url(/topo-bg.svg)", backgroundSize: "cover" }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 35%, rgba(56,182,255,0.10) 0%, rgba(15,23,42,0) 55%)",
        }}
      />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-28 md:pt-36 pb-16 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-[11px] font-mono font-semibold uppercase tracking-[0.18em] text-[#38b6ff]"
        >
          Desks · Black Friday through {DESK_SPRINT.saleEndsLabel}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="mt-5 font-bold text-white leading-[1.06] tracking-[-0.015em] max-w-4xl"
          style={{ fontSize: "clamp(2.1rem, 5.4vw, 3.6rem)" }}
        >
          One business. One brain.
          <br />
          <span className="text-[#38b6ff]">A desk for everyone who touches it.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          className="mt-6 text-[16px] md:text-[17px] text-[#94a3b8] max-w-2xl leading-[1.7]"
        >
          A desk is a phone-first view of your business built for one role:{" "}
          {ROLES.slice(0, -1).join(", ")}, or {ROLES[ROLES.length - 1]}. It shows
          that person what matters to them, lets them take the actions that are
          theirs, and sends the person who pays them a report every Monday. Built
          on the data you already have, under your name, opened from a link. No
          app store. No passwords.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
          className="mt-9 flex flex-col sm:flex-row gap-3"
        >
          <Link
            href="#offer"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-lg bg-[#38b6ff] hover:bg-[#0A8FD4] text-[#0f172a] font-bold text-[15px] transition-all"
          >
            Claim a Desk Sprint slot
          </Link>
          <Link
            href="#stories"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-lg border border-[#38b6ff]/40 hover:border-[#38b6ff] hover:bg-[#38b6ff]/10 text-[#38b6ff] font-semibold text-[14px] transition-all"
          >
            The four desks we built by accident
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
          className="mt-10 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[#64748b]"
        >
          <span>
            list{" "}
            <span className="line-through text-[#475569]">
              ${DESK_SPRINT.listPrice.toLocaleString()}
            </span>
          </span>
          <span className="text-[#f1f5f9]">
            now ${DESK_SPRINT.salePrice.toLocaleString()}
          </span>
          <span>+ ${DESK_SPRINT.monthly}/mo from go-live</span>
          <span>{DESK_SPRINT.slots} slots</span>
          <span>live in {DESK_SPRINT.goLiveDays} days or less</span>
        </motion.div>
      </div>
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#38b6ff]/40 to-transparent"
      />
    </section>
  );
}
