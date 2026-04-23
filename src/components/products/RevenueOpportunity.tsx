"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export function RevenueOpportunity() {
  return (
    <section className="section-lavender-wash py-24 md:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-10"
        >
          <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-[#64748b]">
            The Numbers
          </div>
          <h2
            className="mt-3 font-bold tracking-tight text-[#0f172a]"
            style={{ fontSize: "clamp(1.5rem, 2.8vw, 1.875rem)" }}
          >
            The revenue opportunity.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="dash-card p-7 md:p-9"
          style={{ borderLeft: "3px solid #38b6ff" }}
        >
          <p className="text-[14.5px] text-[#334155] leading-[1.75]">
            Most HOA management companies process hundreds of document requests
            per year. At typical market rates of{" "}
            <span className="font-mono font-semibold text-[#0f172a]">
              $150–$350
            </span>{" "}
            per document package, that&apos;s a significant revenue stream —
            one that&apos;s currently flowing to third-party fulfillment
            companies. PropertyDocz brings that revenue in-house. You set the
            pricing. You keep the revenue. The only cost is a one-time setup
            and a performance-aligned revenue share with XeedlyAI that ensures
            our incentives match yours.
          </p>

          <div className="mt-6 pt-5 border-t border-[#e2e8f0]/70">
            <p className="text-[13.5px] font-semibold text-[#0f172a] leading-[1.6]">
              Our revenue share model means we only succeed when you succeed.
              Details are structured during onboarding to fit your operation.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
