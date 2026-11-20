"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  DESK_SPRINT,
  DESK_SPRINT_INCLUDED,
  DESK_MONTHLY_INCLUDED,
} from "@/data/desks";
import { CONTACT } from "@/lib/contact";

const EASE = [0.16, 1, 0.3, 1] as const;

function Check() {
  return (
    <svg
      aria-hidden
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="mt-[3px] shrink-0"
    >
      <circle cx="8" cy="8" r="8" fill="rgba(56,182,255,0.14)" />
      <path d="M4.5 8.2l2.3 2.3 4.7-4.9" stroke="#0A8FD4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function DeskSprintOffer() {
  const bookingHref = `${CONTACT.calendar}?offer=desk-sprint`;
  return (
    <section id="offer" className="relative section-dark overflow-hidden scroll-mt-24">
      <div
        aria-hidden
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{ backgroundImage: "url(/topo-bg.svg)", backgroundSize: "cover" }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="max-w-3xl">
          <div className="text-[11px] font-mono font-semibold uppercase tracking-[0.18em] text-[#38b6ff]">
            Black Friday through {DESK_SPRINT.saleEndsLabel}
          </div>
          <h2
            className="mt-4 font-bold text-white tracking-[-0.01em] leading-[1.1]"
            style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.6rem)" }}
          >
            {DESK_SPRINT.name}.{" "}
            <span className="text-[#38b6ff]">
              Consult, build and deploy one desk, then keep it growing.
            </span>
          </h2>
          <p className="mt-4 text-[15px] text-[#94a3b8] leading-[1.7]">
            {DESK_SPRINT.slots} slots, delivered by {DESK_SPRINT.deliveredBy}. Paid
            at purchase, refundable in full until the discovery call happens. The
            list price applies after {DESK_SPRINT.saleEndsLabel}.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-5"
        >
          {/* The sprint */}
          <div className="lg:col-span-7 rounded-2xl bg-white p-7 md:p-9 border border-[#38b6ff]/30">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-[#64748b]">
                  Consult · build · deploy
                </div>
                <div className="mt-2 flex items-baseline gap-3">
                  <span
                    className="font-mono font-bold text-[#0f172a] tabular-nums"
                    style={{ fontSize: "clamp(2.2rem, 5vw, 3.2rem)" }}
                  >
                    ${DESK_SPRINT.salePrice.toLocaleString()}
                  </span>
                  <span className="font-mono text-[15px] text-[#64748b] line-through tabular-nums">
                    ${DESK_SPRINT.listPrice.toLocaleString()}
                  </span>
                </div>
                <div className="mt-1 text-[13px] text-[#334155]">
                  one time · through {DESK_SPRINT.saleEndsLabel}
                </div>
              </div>
              <div className="rounded-md bg-[rgba(56,182,255,0.12)] px-3 py-1.5 font-mono text-[11px] font-semibold text-[#0A8FD4] tracking-[0.1em] uppercase">
                {DESK_SPRINT.slots} slots
              </div>
            </div>

            <ul className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              {DESK_SPRINT_INCLUDED.map((f) => (
                <li key={f} className="flex gap-2.5 text-[13.5px] text-[#334155] leading-[1.55]">
                  <Check />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              {DESK_SPRINT.paymentLink ? (
                <a
                  href={DESK_SPRINT.paymentLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-lg bg-[#38b6ff] hover:bg-[#0A8FD4] text-[#0f172a] font-bold text-[15px] transition-all"
                >
                  Pay ${DESK_SPRINT.salePrice.toLocaleString()} and claim a slot
                </a>
              ) : (
                <Link
                  href={bookingHref}
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-lg bg-[#38b6ff] hover:bg-[#0A8FD4] text-[#0f172a] font-bold text-[15px] transition-all"
                >
                  Claim a slot: book the discovery call
                </Link>
              )}
              <Link
                href={bookingHref}
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-lg border border-[#0f172a]/15 hover:border-[#0f172a]/40 text-[#0f172a] font-semibold text-[14px] transition-all"
              >
                Talk first, 20 minutes
              </Link>
            </div>
            <p className="mt-4 text-[12px] text-[#64748b] leading-[1.6]">
              One role, up to six screens, one data source, one report, links for
              up to {DESK_SPRINT.linksIncluded} people. A second desk is $
              {DESK_SPRINT.secondDesk.toLocaleString()}. Agents that act, not only
              answer, are a separate engagement.
            </p>
          </div>

          {/* Maintain and grow */}
          <div className="lg:col-span-5 rounded-2xl bg-[#111c33] border border-white/10 p-7 md:p-9 flex flex-col">
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-[#94a3b8]">
              Maintain and grow · from go-live
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-mono font-bold text-white tabular-nums" style={{ fontSize: "clamp(1.9rem, 4vw, 2.6rem)" }}>
                ${DESK_SPRINT.monthly}
              </span>
              <span className="text-[14px] text-[#94a3b8]">a month</span>
            </div>
            <div className="mt-1 text-[13px] text-[#94a3b8]">
              three-month minimum, then month to month
            </div>
            <ul className="mt-7 space-y-3">
              {DESK_MONTHLY_INCLUDED.map((f) => (
                <li key={f} className="flex gap-2.5 text-[13.5px] text-[#cbd5e1] leading-[1.55]">
                  <Check />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <p className="mt-auto pt-7 text-[12px] text-[#64748b] leading-[1.6]">
              Larger changes, new data sources and additional desks are quoted.
              Your data stays yours and exports at any time.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
