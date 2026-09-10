"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const ITEMS = [
  {
    title: "AI-Native Development",
    body:
      "Every product is built using Claude Code — AI-assisted development that turns architecture decisions into production code in hours, not weeks. The same AI that powers our products powers how we build them.",
  },
  {
    title: "Design System DNA",
    body:
      "One design system across every product. Inter + JetBrains Mono. Primary blue + status colors. KPI tickers, signal cards, briefing panels — a visual language that operators learn once and recognize everywhere.",
  },
  {
    title: "Rapid Vertical Deployment",
    body:
      "New vertical standup in 2–4 weeks. The event bus, signal engine, and delivery layer are proven. The only variables are your data sources, your signal rules, and your AI persona. We've done this before.",
  },
];

export function HowWeBuild() {
  return (
    <section className="section-blue-wash py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-14"
        >
          <h2
            className="font-bold tracking-tight text-[#0f172a]"
            style={{ fontSize: "clamp(1.75rem, 3.2vw, 2rem)" }}
          >
            Built with AI, not just about AI
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
              <h3 className="text-[16px] font-semibold text-[#0f172a]">
                {it.title}
              </h3>
              <p className="mt-3 text-[13px] leading-[1.65] text-[#334155]">
                {it.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
