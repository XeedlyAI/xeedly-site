"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export function PropertyJobzRevenue() {
  return (
    <section className="section-lavender-wash py-24 md:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-8"
        >
          <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-[#64748b]">
            Why Vendors Pay
          </div>
          <h2
            className="mt-3 font-bold tracking-tight text-[#0f172a]"
            style={{ fontSize: "clamp(1.5rem, 2.8vw, 1.875rem)" }}
          >
            A managed marketplace, not a toll booth.
          </h2>
          <p className="mt-4 text-[15px] font-semibold text-[#0f172a] max-w-xl mx-auto">
            Every vendor relationship you manage is a revenue opportunity
            you&apos;re not capturing.
          </p>
        </motion.div>

        {/* Mini KPI strip — the visual revenue gap */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-3"
        >
          <div className="rounded-xl bg-white border border-[#e2e8f0] p-5">
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#64748b]">
              Vendors in Your Network
            </div>
            <div className="mt-2 font-mono text-[22px] font-bold text-[#0f172a] tabular-nums leading-none">
              DOZENS
            </div>
            <div className="mt-2 font-mono text-[10px] text-[#94a3b8]">
              already being managed
            </div>
          </div>
          <div
            className="rounded-xl bg-white p-5"
            style={{ border: "1px solid #e2e8f0", borderLeftWidth: 3, borderLeftColor: "#ef4444" }}
          >
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#64748b]">
              Currently Paying You
            </div>
            <div className="mt-2 font-mono text-[22px] font-bold tabular-nums leading-none text-[#ef4444]">
              $0
            </div>
            <div className="mt-2 font-mono text-[10px] text-[#94a3b8]">
              no marketplace structure
            </div>
          </div>
          <div
            className="rounded-xl bg-white p-5"
            style={{ border: "1px solid #e2e8f0", borderLeftWidth: 3, borderLeftColor: "#14b8a6" }}
          >
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0d9488]">
              With PropertyJobz
            </div>
            <div className="mt-2 font-mono text-[22px] font-bold tabular-nums leading-none text-[#0f172a]">
              MONTHLY + PER JOB
            </div>
            <div className="mt-2 font-mono text-[10px] text-[#94a3b8]">
              recurring + usage revenue
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Left — the value vendors receive */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: EASE }}
            className="dash-card p-6 md:p-7"
            style={{ borderLeft: "3px solid #14b8a6" }}
          >
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#0d9488]">
              What Vendors Receive
            </div>
            <p className="mt-3 text-[13.5px] text-[#334155] leading-[1.7]">
              Vendors pay to participate in your Preferred Vendor Program
              because the value is real. They get{" "}
              <span className="font-semibold text-[#0f172a]">
                verified status
              </span>{" "}
              that boards and homeowners trust. They get direct access to work
              opportunities across your communities. They get a structured
              bidding process instead of competing on relationships alone. They
              get compliance management handled for them — insurance tracking,
              license renewals, certification updates.
            </p>
          </motion.div>

          {/* Right — why it's beyond reproach */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
            className="dash-card p-6 md:p-7"
            style={{ borderLeft: "3px solid #38b6ff" }}
          >
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#0A8FD4]">
              Why It Works
            </div>
            <p className="mt-3 text-[13.5px] text-[#334155] leading-[1.7]">
              This isn&apos;t a toll booth. It&apos;s a managed marketplace.
              The verification and compliance infrastructure you maintain
              protects your communities, protects the vendors, and creates a
              system worth paying for. The vendors who participate get more
              work. The communities they serve get vetted professionals. Your
              management company earns revenue from a service you&apos;re
              already providing — now automated and structured.
            </p>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
          className="mt-10 text-center text-[12.5px] text-[#64748b] italic max-w-2xl mx-auto leading-[1.7]"
        >
          Revenue structure is tailored during onboarding to fit your vendor
          ecosystem. Our model aligns our success with yours.
        </motion.p>
      </div>
    </section>
  );
}
