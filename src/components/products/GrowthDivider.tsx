"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export function GrowthDivider() {
  return (
    <section className="relative section-dark overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{ backgroundImage: "url(/topo-bg.svg)", backgroundSize: "cover" }}
      />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-24 md:py-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-[11px] font-mono font-semibold uppercase tracking-[0.18em] text-[#38b6ff]"
        >
          Automated Growth Systems
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="mt-4 font-bold text-white leading-[1.15] tracking-[-0.01em]"
          style={{ fontSize: "clamp(1.75rem, 4vw, 2.25rem)" }}
        >
          Agency-grade marketing.{" "}
          <span className="text-[#38b6ff]">Without the agency.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          className="mt-5 mx-auto max-w-[580px] text-[15px] leading-[1.6] text-[#94a3b8]"
        >
          AI-powered systems that replace traditional marketing retainers.
          Always-on automation starting at{" "}
          <span className="font-mono font-semibold text-[#f1f5f9]">
            $297/mo
          </span>
          {" "}— no contracts, no human bottlenecks, no $5K monthly invoices.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto"
        >
          <div
            className="rounded-xl bg-[#1e293b]/60 p-5 text-left"
            style={{ borderLeft: "3px solid #ef4444" }}
          >
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#ef4444]">
              Traditional Agency
            </div>
            <ul className="mt-3 space-y-1.5 text-[13px] text-[#94a3b8] leading-[1.55]">
              <li><span className="font-mono text-[#f1f5f9]">$3K–$10K</span>/mo</li>
              <li>6-month contracts</li>
              <li>Manual execution</li>
            </ul>
          </div>
          <div
            className="rounded-xl bg-[#1e293b]/60 p-5 text-left"
            style={{ borderLeft: "3px solid #14b8a6" }}
          >
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#14b8a6]">
              XeedlyAI Growth Systems
            </div>
            <ul className="mt-3 space-y-1.5 text-[13px] text-[#94a3b8] leading-[1.55]">
              <li><span className="font-mono text-[#f1f5f9]">$297–$997</span>/mo</li>
              <li>Month-to-month</li>
              <li>AI-powered 24/7</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
