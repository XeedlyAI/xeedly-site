"use client";

import { motion } from "framer-motion";
import { BookingWidget } from "@/components/shared/BookingWidget";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ContactBooking() {
  return (
    <section className="section-white py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-10"
        >
          <div className="text-[10px] font-mono font-semibold uppercase tracking-[0.15em] text-[#64748b]">
            Direct Booking
          </div>
          <h2
            className="mt-3 font-bold tracking-tight text-[#0f172a]"
            style={{ fontSize: "clamp(1.5rem, 2.8vw, 1.875rem)" }}
          >
            Or book directly.
          </h2>
          <p className="mt-3 text-[14px] text-[#334155]">
            Pick a time, skip the form.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
        >
          <BookingWidget />
        </motion.div>
      </div>
    </section>
  );
}
