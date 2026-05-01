"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Operations IS Marketing — narrative callout. Bridges between the platform's
 * intelligence story and the deployment/CTA. The thesis: a well-run business
 * grows without trying.
 */
export function OperationsIsMarketing() {
  return (
    <section className="section-blue-wash">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-20 md:py-24 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="font-sans italic text-[18px] md:text-[20px] leading-[1.6] text-[#334155]"
        >
          <span className="not-italic font-semibold text-[#38b6ff]">
            Operations IS marketing.
          </span>{" "}
          The intelligence platform doesn&apos;t just measure your business —
          it makes your business run better. And businesses that run better
          grow without trying.
        </motion.p>
      </div>
    </section>
  );
}
