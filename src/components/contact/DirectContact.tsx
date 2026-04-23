"use client";

import { motion } from "framer-motion";
import { Mail, CalendarClock, Phone } from "lucide-react";
import { CONTACT, MAILTO, TEL } from "@/lib/contact";

const EASE = [0.16, 1, 0.3, 1] as const;

type Accent = "blue" | "teal" | "amber";

type Item = {
  icon: typeof Mail;
  accent: Accent;
  status: { label: string; tone: "green" | "teal" | "amber" };
  title: string;
  primary: string;
  subtitle: string;
  dataRow: string;
  href: string;
  external?: boolean;
};

const ITEMS: Item[] = [
  {
    icon: Mail,
    accent: "blue",
    status: { label: "Monitored", tone: "green" },
    title: "Email",
    primary: CONTACT.email,
    subtitle: "Response within one business day.",
    dataRow: "last response: 2h ago",
    href: MAILTO,
  },
  {
    icon: CalendarClock,
    accent: "teal",
    status: { label: "Available", tone: "teal" },
    title: "Schedule a Call",
    primary: "30-minute intro",
    subtitle:
      "For serious deployments — we'll walk the thesis and your vertical.",
    dataRow: "next available: today 2:00 PM MST",
    href: CONTACT.calendar,
  },
  {
    icon: Phone,
    accent: "amber",
    status: { label: "Direct Line", tone: "amber" },
    title: "Call Directly",
    primary: CONTACT.phone,
    subtitle: `Founder's direct line. ${CONTACT.hours}.`,
    dataRow: "avg answer time: < 30s",
    href: TEL,
  },
];

const ACCENT: Record<Accent, { bar: string; ico: string }> = {
  blue: { bar: "bg-[#38b6ff]", ico: "text-[#0A8FD4] bg-[#38b6ff]/10" },
  teal: { bar: "bg-[#14b8a6]", ico: "text-[#0d9488] bg-[#14b8a6]/10" },
  amber: { bar: "bg-[#f59e0b]", ico: "text-[#d97706] bg-[#f59e0b]/10" },
};

const DOT: Record<Item["status"]["tone"], string> = {
  green: "bg-[#22c55e]",
  teal: "bg-[#14b8a6]",
  amber: "bg-[#f59e0b]",
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
            const CardInner = (
              <>
                <div
                  aria-hidden
                  className={`absolute left-0 top-0 bottom-0 w-[3px] ${a.bar}`}
                />
                {/* Top row: icon + status indicator */}
                <div className="flex items-start justify-between gap-4">
                  <div
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${a.ico}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span
                      aria-hidden
                      className={`relative inline-flex h-2 w-2 rounded-full ${DOT[it.status.tone]}`}
                    >
                      <span
                        className={`absolute inset-0 rounded-full ${DOT[it.status.tone]} opacity-75 animate-ping group-hover:animation-duration-[1s]`}
                      />
                    </span>
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#64748b]">
                      {it.status.label}
                    </span>
                  </div>
                </div>

                {/* Title (mono eyebrow) */}
                <div className="mt-4 text-[11px] font-mono font-semibold uppercase tracking-[0.12em] text-[#64748b]">
                  {it.title}
                </div>
                {/* Primary clickable value */}
                <div className="mt-1.5 text-[16px] font-semibold text-[#0f172a] group-hover:text-[#0A8FD4] transition-colors">
                  {it.primary}
                </div>
                <p className="mt-2 text-[12.5px] text-[#334155] leading-[1.6]">
                  {it.subtitle}
                </p>

                {/* Bottom operational data row */}
                <div className="mt-5 pt-3 border-t border-[#e2e8f0] font-mono text-[10px] uppercase tracking-[0.08em] text-[#94a3b8]">
                  {it.dataRow}
                </div>
              </>
            );

            const baseClass =
              "group dash-card p-6 relative overflow-hidden block cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_rgba(15,23,42,0.15)]";

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
              >
                <a
                  href={it.href}
                  {...(it.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className={baseClass}
                  aria-label={`${it.title} — ${it.primary}`}
                >
                  {CardInner}
                </a>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
