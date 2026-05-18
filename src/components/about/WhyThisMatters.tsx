"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const PARAGRAPHS = [
  "I've watched leaders build incredible businesses and lose themselves inside them. Every system they run, every question they answer, every fire they put out — it works. But it costs them the things no dashboard can measure.",
  "Productivity is a real, God-given responsibility. To provide. To serve. To be self-sufficient. To use what we've been given. That obligation is honored by being productive — and the leaders I respect take it seriously.",
  "But productivity isn't who you are. The moment it becomes the answer to \"who am I,\" you're one bad quarter, one health scare, or one season of rest away from an identity crisis you didn't see coming. The leader who can rest, fail, and be present is a different person than the leader for whom rest is fear and presence is impossible without something to produce.",
  "Xeedly exists because the architectural fix is real. A business doesn't have to require you in the middle of everything. Intelligence layers route information to the people closest to it. Signal engines distinguish what needs you from what doesn't. Standards live in the system instead of in your head. With those in place, the business becomes a catalyst for the person who built it — not the cage that consumes them.",
  "We build software for people who refuse to be built by what they built. So productivity stays a thing you do — and never becomes the thing you are.",
];

export function WhyThisMatters() {
  return (
    <section className="relative section-dark py-24 md:py-32 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: "url(/topo-bg.svg)",
          backgroundSize: "cover",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(56,182,255,0.10) 0%, rgba(15,23,42,0) 60%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-12"
        >
          <div className="text-[10px] font-mono font-semibold uppercase tracking-[0.15em] text-[#38b6ff]">
            Why This Matters
          </div>
          <h2
            className="mt-3 font-bold tracking-tight text-white"
            style={{ fontSize: "clamp(1.75rem, 3.2vw, 2rem)" }}
          >
            The business is the means.{" "}
            <span className="text-[#38b6ff]">Not the meaning.</span>
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="space-y-6"
        >
          {PARAGRAPHS.map((p, i) => (
            <motion.p
              key={i}
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: EASE },
                },
              }}
              className="text-[16px] leading-[1.75] text-[#cbd5e1]"
            >
              {p}
            </motion.p>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
          className="mt-10 text-center"
        >
          <div className="inline-block text-[13px] font-mono uppercase tracking-[0.12em] text-[#64748b]">
            — Shad, Founder
          </div>
        </motion.div>
      </div>
    </section>
  );
}
