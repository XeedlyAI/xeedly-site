"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

type Card = {
  id: string;
  name: string;
  category: string;
  accent: string;
  description: string;
  metrics: string;
  included: string;
};

const CARDS: Card[] = [
  {
    id: "review-intelligence",
    name: "Review Intelligence",
    category: "Reputation",
    accent: "#f59e0b",
    description:
      "Automated review solicitation after every transaction. AI-generated responses to reviews — positive and negative — in your brand voice. Sentiment analysis feeds into the intelligence layer.",
    metrics: "Avg 3.2× increase in review volume. AI responds within 15 minutes.",
    included: "All tiers",
  },
  {
    id: "payment-automation",
    name: "Payment Automation",
    category: "Payments",
    accent: "#14b8a6",
    description:
      "Text-to-pay invoicing, automated payment reminders, and recurring billing. Customers pay from their phone in 30 seconds. No app download, no login.",
    metrics: "68% faster payment collection. 40% reduction in outstanding receivables.",
    included: "Growth ($597/mo), Scale ($997/mo)",
  },
];

export function ReviewPayment() {
  return (
    <section className="section-blue-wash py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {CARDS.map((c) => (
            <motion.div
              key={c.id}
              id={c.id}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: EASE },
                },
              }}
              className="dash-card p-7 scroll-mt-40"
              style={{ borderLeft: `3px solid ${c.accent}` }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full"
                  style={{ color: c.accent, background: `${c.accent}14` }}
                >
                  {c.category}
                </span>
              </div>
              <h3 className="mt-3 text-[20px] font-bold text-[#0f172a]">
                {c.name}
              </h3>
              <p className="mt-3 text-[13px] leading-[1.65] text-[#334155]">
                {c.description}
              </p>
              <p className="mt-4 font-mono text-[12px] leading-[1.6] text-[#0A8FD4]">
                {c.metrics}
              </p>
              <div className="mt-5 font-mono text-[11px] text-[#64748b]">
                <span className="uppercase tracking-[0.14em] font-semibold text-[#0f172a]">
                  Included in:
                </span>{" "}
                {c.included}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
