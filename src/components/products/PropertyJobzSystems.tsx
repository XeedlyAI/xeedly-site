"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Award, ClipboardList } from "lucide-react";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

type System = {
  icon: ReactNode;
  title: string;
  body: string;
  dataRow: string;
  accent: string;
};

const SYSTEMS: System[] = [
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Vendor Verification",
    accent: "#ef4444",
    body:
      "The foundation. Every vendor verified for insurance, licensing, bonding, and certifications. Automated expiry tracking. Renewal reminders. Real-time compliance status visible to your team and your board members.",
    dataRow: "status: always current",
  },
  {
    icon: <Award className="h-5 w-5" />,
    title: "Preferred Vendor Program",
    accent: "#14b8a6",
    body:
      "The marketplace. Verified vendors join your Preferred Vendor Program for specific communities and service categories. Homeowners and board members see only pre-approved vendors. Vendors pay for access because your communities represent guaranteed work opportunities.",
    dataRow: "revenue: vendor subscriptions",
  },
  {
    icon: <ClipboardList className="h-5 w-5" />,
    title: "RFP + Job Management",
    accent: "#38b6ff",
    body:
      "The workflow. When a community needs work, the system creates an RFP, matches qualified vendors, manages bids, assigns the job, and tracks completion. Structured, fair, transparent — and every job generates data that makes your operation smarter.",
    dataRow: "pipeline: RFP → bid → assign → complete",
  },
];

export function PropertyJobzSystems() {
  return (
    <section className="section-blue-wash py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-12"
        >
          <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-[#64748b]">
            Three Systems. One Platform.
          </div>
          <h2
            className="mt-3 font-bold tracking-tight text-[#0f172a]"
            style={{ fontSize: "clamp(1.5rem, 2.8vw, 1.875rem)" }}
          >
            Verification, marketplace, workflow.
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {SYSTEMS.map((s) => (
            <motion.div
              key={s.title}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: EASE },
                },
              }}
              className="dash-card p-6 md:p-7 flex flex-col"
              style={{ borderLeft: `3px solid ${s.accent}` }}
            >
              <div
                className="inline-flex items-center justify-center h-10 w-10 rounded-lg"
                style={{
                  background: `${s.accent}1A`,
                  color: s.accent,
                }}
              >
                {s.icon}
              </div>
              <h3 className="mt-4 text-[16px] font-bold text-[#0f172a]">
                {s.title}
              </h3>
              <p className="mt-2.5 text-[13px] text-[#334155] leading-[1.65] flex-1">
                {s.body}
              </p>
              <div
                className="mt-5 font-mono text-[10px] text-[#64748b] pt-3 border-t border-[#e2e8f0]/70"
              >
                {s.dataRow}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
