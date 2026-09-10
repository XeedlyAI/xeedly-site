"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

type Block = {
  heading?: string;
  paragraphs: string[];
};

const BLOCKS: Block[] = [
  {
    heading: "Most leaders don't lose themselves all at once.",
    paragraphs: [
      "It happens slowly. You build a system. The system works. So you build another one. Then another. Then the systems start producing problems faster than you can solve them, and you become the bottleneck in your own success.",
      "You wake up one day and realize the business you built to give you a better life is the thing standing between you and the life you wanted.",
      "I've watched it happen. To people I respect. To people I've worked with. To people who did everything right.",
    ],
  },
  {
    heading: "Productivity is a responsibility. But it's not an identity.",
    paragraphs: [
      "We have a real, God-given responsibility to be productive — to provide for our families, to serve others, to be self-sufficient, to use what we've been given. That obligation is honored by being productive. It's not in question.",
      "But it isn't who you are.",
      "When productivity becomes the answer to \"who am I,\" you're one bad quarter, one health scare, or one season of rest away from an identity crisis you didn't see coming. The distinction matters because it's the difference between a producer who can rest, fail, and be present — and a producer for whom rest is fear, failure is annihilation, and presence is impossible without something to produce.",
      "I've watched too many leaders collapse this distinction by accumulation. Twenty years of being the person who delivers. Twenty years of \"how's the business\" being the first question at every dinner. Twenty years of internal narrative organized around output. The identity calcifies around the productivity without anyone noticing — until productivity hits a wall, and there's nothing underneath to hold them up.",
    ],
  },
  {
    heading: "The cage you build by accident.",
    paragraphs: [
      "This is how the cage forms. Not from laziness or burnout. From competence.",
      "You're good at producing. The work needs you. So you produce more. The work needs you more. The productivity that was supposed to serve you starts serving itself, and somewhere along the way, the leader becomes the person who serves the productivity.",
      "A business that requires you to be in every moment, in every decision, in every fire — that business is no longer a tool. It's a cage you built for yourself, brick by brick, each brick a reasonable response to a real demand.",
      "And when success finally arrives — and for many of those who build, it does — most discover that success is insufficient to define who they are. The wins are real, but they're temporary. The trophies fade. The dopamine doesn't last. What lasts is family. Relationships. Service to others. Faith. The work only you can do — the work no business can do for you.",
    ],
  },
  {
    heading: "We build the catalyst.",
    paragraphs: [
      "We don't build software to make your business bigger. We build software to make your business run without you in the middle of everything — so that productivity can be a thing you do, not a thing you are. So that the success you're building doesn't have to exclude the things success was supposed to create.",
      "The architecture matters because the architecture is the difference. Intelligence layers route information to the people closest to it. Signal engines distinguish what needs you from what doesn't. Codified standards live in the system rather than in your head. With those three in place, the business becomes a catalyst for the person who built it — not the cage that consumes them.",
      "This is what we mean by \"the business is the means. Not the meaning.\"",
      "Lifestyle income. Freedom of attention. Space to become.",
    ],
  },
  {
    heading: "This is who we build for.",
    paragraphs: [
      "Builders who refuse to be built by what they built.",
      "Founders who want their work to count for something more than its own continuation.",
      "Leaders who know that productivity is a responsibility they take seriously — and that being productive isn't the same as being a person. Who want both the financial margin and the calendar margin, the attention margin and the presence margin. Who want to scale businesses that give back more than they take.",
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
