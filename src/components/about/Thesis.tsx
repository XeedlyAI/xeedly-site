"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const PARAGRAPHS = [
  "XeedlyAI started where a lot of companies start — solving problems that were right in front of us. We built marketing automation for small businesses: AI-powered ad campaigns, voice agents, review management. The systems worked. They replaced entire agency retainers at a fraction of the cost. But something bigger emerged.",
  "Every business we worked with had the same blind spot. They were generating thousands of events per day across dozens of systems — POS transactions, vendor communications, document requests, compliance deadlines, customer reviews, phone calls, scheduling changes. All of this data existed. Almost none of it became intelligence.",
  "The industry response has been dashboards — more screens, more logins, more data to interpret. But the people running these businesses aren't analysts. They're operators. They're on the floor, in the field, between locations. They need intelligence delivered to them, not waiting behind a browser tab.",
  "XeedlyAI was built on a simple conviction: the pattern for turning operational data into daily intelligence is repeatable. Ingest events. Detect signals. Deliver briefings. The architecture works for restaurants. It works for property management. It works for any business where operational complexity creates information gaps.",
  "So we build both: Automated Growth Systems that replace expensive agency retainers with AI-powered marketing automation, and Intelligence Platforms that turn operational chaos into daily decisions. One company, two product lines, one thesis — AI should do the work that humans shouldn't have to.",
];

export function Thesis() {
  return (
    <section className="section-white py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
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
              className="text-[16px] leading-[1.75] text-[#334155]"
            >
              {p}
            </motion.p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
