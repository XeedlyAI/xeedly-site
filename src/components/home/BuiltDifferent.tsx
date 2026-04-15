"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const ITEMS = [
  {
    title: "Proactive, not reactive",
    body:
      "Intelligence delivered before you ask. Morning briefings, real-time signals, pattern alerts.",
  },
  {
    title: "Cross-system correlation",
    body:
      "Events from every connected system analyzed together. Patterns spanning tools are the ones humans miss.",
  },
  {
    title: "Operator-first delivery",
    body:
      "Email, SMS, Slack, Teams, in-app. Intelligence meets you where you work — not behind a login.",
  },
];

export function BuiltDifferent() {
  return (
    <section className="section-blue-wash py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-12"
        >
          <h2
            className="font-bold tracking-tight text-[#0f172a]"
            style={{ fontSize: "clamp(1.75rem, 3.2vw, 2rem)" }}
          >
            Not a chatbot. Not a dashboard.
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {ITEMS.map((it) => (
            <motion.div
              key={it.title}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: EASE },
                },
              }}
              className="dash-card status-info p-6 md:p-7"
            >
              <h3 className="text-[15px] font-semibold text-[#0f172a]">
                {it.title}
              </h3>
              <p className="mt-2.5 text-[13px] leading-[1.55] text-[#334155]">
                {it.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
