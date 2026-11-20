"use client";

import { motion } from "framer-motion";
import { DESK_SPRINT } from "@/data/desks";
import { FadeUpChild, StaggerContainer } from "@/components/shared/SectionReveal";

const STEPS = [
  {
    when: "Day 1",
    title: "Half a day together",
    body: "We pick the role, name the week that hurts, find where the data lives and who holds its login, and list the people who get links. You leave with the desk drawn on one page.",
  },
  {
    when: "Days 2 to 14",
    title: "We build on your real data",
    body: "Your data comes in by API, export or spreadsheet. The desk takes shape from the eight parts, under your mark and your domain. You see it at the end of week one and tell us what is wrong.",
  },
  {
    when: "Go-live",
    title: "Links go out",
    body: "Each person gets their own link by email or text. No app store, no passwords. They add it to the home screen and it behaves like an app. You can revoke any link in one click.",
  },
  {
    when: "Every Monday after",
    title: "The report arrives",
    body: "The person who pays for the role gets the document that answers their four questions. The desk keeps improving two hours a month, and the agent answers questions from the data all week.",
  },
];

export function DesksHowItWorks() {
  return (
    <section className="bg-[#F5F5F0]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="max-w-3xl">
          <div className="text-[10px] font-mono font-semibold uppercase tracking-[0.15em] text-[#64748b]">
            How it works
          </div>
          <h2
            className="mt-3 font-bold tracking-tight text-[#0f172a]"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.1rem)" }}
          >
            From a conversation to a desk in your people&apos;s hands in{" "}
            <span className="text-[#38b6ff]">{DESK_SPRINT.goLiveDays} days or less.</span>
          </h2>
        </div>

        <motion.ol
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={StaggerContainer}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {STEPS.map((s, i) => (
            <motion.li
              key={s.title}
              variants={FadeUpChild}
              className="rounded-xl bg-white border border-[#e2e8f0] p-6 flex flex-col"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-semibold text-[#38b6ff] tracking-[0.12em]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#64748b]">
                  {s.when}
                </span>
              </div>
              <h3 className="mt-4 font-bold text-[#0f172a] text-[17px] leading-[1.3]">{s.title}</h3>
              <p className="mt-3 text-[13.5px] text-[#334155] leading-[1.65]">{s.body}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
