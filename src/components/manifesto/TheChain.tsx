"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const LINKS = [
  {
    label: "DESIRE",
    body: "What you truly want — beneath the noise.",
  },
  {
    label: "PRIORITIES",
    body: "What desire ranks above everything else.",
  },
  {
    label: "DECISIONS",
    body: "What priorities require you to choose.",
  },
  {
    label: "ACTIONS",
    body: "What decisions demand you do.",
  },
  {
    label: "HAPPINESS",
    body: "Or its absence — depending on the chain.",
  },
];

export function TheChain() {
  return (
    <section className="section-white py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-14"
        >
          <div className="text-[10px] font-mono font-semibold uppercase tracking-[0.18em] text-[#64748b]">
            How To Find Your Mission
          </div>
          <h2
            className="mt-4 font-bold tracking-tight text-[#0f172a]"
            style={{ fontSize: "clamp(1.75rem, 3.6vw, 2.25rem)" }}
          >
            Start with desire. End with happiness.{" "}
            <span className="text-[#38b6ff]">Or its absence.</span>
          </h2>
          <p className="mt-6 text-[16px] md:text-[17px] text-[#475569] max-w-2xl mx-auto leading-[1.7]">
            One&apos;s desire determines priorities. Priorities determine
            decisions. Decisions determine actions. Actions determine
            happiness — or the lack of it.
          </p>
        </motion.div>

        {/* The chain visual */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-3 mt-10"
        >
          {LINKS.map((link, i) => (
            <motion.div
              key={link.label}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: EASE },
                },
              }}
              className="relative dash-card status-info p-5 md:p-6 text-center"
            >
              <div className="text-[11px] font-mono font-bold tracking-[0.12em] text-[#38b6ff]">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div
                className="mt-2 font-bold tracking-tight text-[#0f172a]"
                style={{ fontSize: "clamp(0.95rem, 1.4vw, 1.1rem)" }}
              >
                {link.label}
              </div>
              <p className="mt-2 text-[12px] leading-[1.5] text-[#475569]">
                {link.body}
              </p>

              {/* Arrow connector — visible on md+ */}
              {i < LINKS.length - 1 && (
                <div
                  aria-hidden
                  className="hidden md:flex absolute top-1/2 -right-3 -translate-y-1/2 items-center justify-center w-6 h-6 z-10"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 7H12M12 7L8 3M12 7L8 11"
                      stroke="#38b6ff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Backward chain reading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
          className="mt-16 max-w-3xl mx-auto"
        >
          <div className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-7 md:p-9">
            <div className="text-[10px] font-mono font-semibold uppercase tracking-[0.15em] text-[#64748b]">
              Walk It Backward
            </div>
            <p className="mt-3 text-[15px] md:text-[16px] leading-[1.75] text-[#334155]">
              Unhappy? Look at your actions. Wrong actions? Look at your
              decisions. Wrong decisions? Look at your priorities. Wrong
              priorities? Look at what you actually desire — not what you say
              you desire.
            </p>
            <p className="mt-4 text-[15px] md:text-[16px] leading-[1.75] text-[#334155]">
              Most people get stuck trying to fix happiness directly, or
              actions directly. The real lever is upstream.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
