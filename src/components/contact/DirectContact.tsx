"use client";

import { motion } from "framer-motion";
import { Mail, CalendarClock, MapPin } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const ITEMS = [
  {
    icon: Mail,
    title: "Email",
    body: "hello@xeedly.com",
    sub: "Response within one business day.",
    accent: "blue" as const,
  },
  {
    icon: CalendarClock,
    title: "Schedule a Call",
    body: "30-minute intro",
    sub: "For serious deployments — we'll walk the thesis and your vertical.",
    accent: "teal" as const,
  },
  {
    icon: MapPin,
    title: "Based In",
    body: "Salt Lake City, UT",
    sub: "Remote-first. Customers across North America.",
    accent: "purple" as const,
  },
];

const ACCENT = {
  blue: { bar: "bg-[#38b6ff]", ico: "text-[#0A8FD4] bg-[#38b6ff]/10" },
  teal: { bar: "bg-[#14b8a6]", ico: "text-[#0d9488] bg-[#14b8a6]/10" },
  purple: { bar: "bg-[#8b5cf6]", ico: "text-[#7c3aed] bg-[#8b5cf6]/10" },
};

export function DirectContact() {
  return (
    <section className="section-warm-wash py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-12"
        >
          <div className="text-[10px] font-mono font-semibold uppercase tracking-[0.15em] text-[#64748b]">
            Direct Contact
          </div>
          <h2
            className="mt-3 font-bold tracking-tight text-[#0f172a]"
            style={{ fontSize: "clamp(1.5rem, 2.8vw, 1.875rem)" }}
          >
            Prefer a different channel?
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {ITEMS.map((it) => {
            const Icon = it.icon;
            const a = ACCENT[it.accent];
            return (
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
                className="dash-card p-6 relative overflow-hidden"
              >
                <div
                  aria-hidden
                  className={`absolute left-0 top-0 bottom-0 w-[2px] ${a.bar}`}
                />
                <div
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${a.ico}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mt-4 text-[11px] font-mono font-semibold uppercase tracking-[0.12em] text-[#64748b]">
                  {it.title}
                </div>
                <div className="mt-1.5 text-[16px] font-semibold text-[#0f172a]">
                  {it.body}
                </div>
                <p className="mt-2 text-[12.5px] text-[#334155] leading-[1.6]">
                  {it.sub}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
