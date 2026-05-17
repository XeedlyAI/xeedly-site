"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

type Block = {
  heading?: string;
  paragraphs: string[];
};

const BLOCKS: Block[] = [
  {
    heading: "Most operators don't lose themselves all at once.",
    paragraphs: [
      "It happens slowly. You build a system. The system works. So you build another one. Then another. Then the systems start producing problems faster than you can solve them, and you become the bottleneck in your own success.",
      "You wake up one day and realize the business you built to give you a better life is the thing standing between you and the life you wanted.",
      "I've watched it happen. To people I respect. To people I've worked with. To people who did everything right.",
    ],
  },
  {
    heading: "Productivity is a responsibility. But it's not an identity.",
    paragraphs: [
      "We have a real, God-given responsibility to be productive — to provide for our families, to serve others, to be self-sufficient. That's not in question.",
      "But productivity that consumes the producer is a corruption of that calling, not a fulfillment of it. A business that requires you to be present in every moment, in every decision, in every fire — that business is no longer a tool. It's a cage you built for yourself.",
    ],
  },
  {
    heading: "The business is the catalyst. Not the cage.",
    paragraphs: [
      "When success finally arrives — and for many operators, it does — most discover that success is insufficient to define who they are. The wins are real, but they're temporary. The trophies fade. The dopamine doesn't last.",
      "What lasts is family. Relationships. Service to others. Faith. The work only you can do — the work no business can do for you.",
      "We don't build software to make your business bigger. We build software to make your business run without you in the middle of everything. So that what you do with the margin — the time, the attention, the presence — can be the actual point.",
      "Lifestyle income. Freedom of attention. Space to become.",
    ],
  },
  {
    heading: "This is who we build for.",
    paragraphs: [
      "Operators who refuse to be built by their businesses.",
      "Founders who want their work to count for something more than its own continuation.",
      "Leaders who know that the chain — desire, priorities, decisions, actions — only delivers happiness when it's walked in the right direction. And who are willing to build the business that makes walking it possible.",
      "That's who we build for. That's why we build.",
    ],
  },
];

export function FounderLetter() {
  return (
    <section className="section-blue-wash py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          className="space-y-14"
        >
          {BLOCKS.map((block, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: EASE },
                },
              }}
            >
              {block.heading && (
                <h3
                  className="font-bold tracking-tight text-[#0f172a] mb-5 leading-[1.25]"
                  style={{ fontSize: "clamp(1.35rem, 2.6vw, 1.75rem)" }}
                >
                  {block.heading}
                </h3>
              )}
              <div className="space-y-5">
                {block.paragraphs.map((p, j) => (
                  <p
                    key={j}
                    className="text-[16px] md:text-[17px] leading-[1.8] text-[#334155]"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Signature */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 18 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: EASE },
              },
            }}
            className="pt-6 border-t border-[#cbd5e1]/60"
          >
            <div className="text-[14px] font-semibold text-[#0f172a]">
              — Shad
            </div>
            <div className="text-[12px] font-mono uppercase tracking-[0.12em] text-[#64748b] mt-1">
              Founder, XeedlyAI
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
