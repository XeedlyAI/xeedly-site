"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const FEATURES = [
  {
    title: "Your pricing. Your revenue.",
    body:
      "Set document prices that reflect your market and your service level. Revenue flows directly to your accounts — not to a middleman. Real-time, per-transaction.",
  },
  {
    title: "AI does the data work.",
    body:
      "PropertyDocz uses AI to harvest, validate, and organize community data. Three-tier confidence scoring tells agents exactly what to trust. Document packages generate automatically — no manual assembly.",
  },
  {
    title: "Your brand. Your subdomain.",
    body:
      "Agents and homeowners order documents at corehoa.propertydocz.com (or your company's subdomain). The experience is yours. The platform runs invisibly behind it.",
  },
];

/* Mini KPI ticker mock for the right column */
function DashboardMock() {
  const kpis = [
    { label: "Documents Fulfilled", value: "47", subtitle: "this month" },
    { label: "Revenue", value: "$4,230", subtitle: "this month" },
    { label: "Avg Turnaround", value: "2.1 hrs", subtitle: "order → delivery" },
  ];
  const orders = [
    {
      title: "Resale Certificate · Maple Ridge HOA",
      status: "Delivered",
      color: "#14b8a6",
      time: "2h ago",
    },
    {
      title: "Refinance Package · Cedar Park",
      status: "Processing",
      color: "#38b6ff",
      time: "14m ago",
    },
    {
      title: "Status Letter · Willow Creek",
      status: "Awaiting Agent Review",
      color: "#f59e0b",
      time: "32m ago",
    },
  ];

  return (
    <div className="rounded-xl bg-white border border-[#e2e8f0] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      {/* Header with live dot */}
      <div className="px-4 py-3 border-b border-[#e2e8f0] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative inline-flex w-2 h-2">
            <span className="absolute inset-0 rounded-full bg-[#14b8a6] animate-ping opacity-60" />
            <span className="relative rounded-full w-2 h-2 bg-[#14b8a6]" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#14b8a6] font-semibold">
            Live · corehoa.propertydocz.com
          </span>
        </div>
        <span className="font-mono text-[10px] text-[#94a3b8]">admin</span>
      </div>

      {/* Mini KPI ticker */}
      <div className="grid grid-cols-3 divide-x divide-[#e2e8f0] bg-[#FAFAFA]">
        {kpis.map((k) => (
          <div key={k.label} className="px-3 py-3 min-w-0">
            <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-[#64748b] truncate">
              {k.label}
            </div>
            <div className="mt-1 font-mono text-[18px] font-bold text-[#0f172a] tabular-nums leading-none truncate">
              {k.value}
            </div>
            <div className="mt-1 text-[10px] text-[#94a3b8] truncate">
              {k.subtitle}
            </div>
          </div>
        ))}
      </div>

      {/* Recent orders list */}
      <div className="p-4 space-y-2.5">
        <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#64748b]">
          Recent Orders
        </div>
        {orders.map((o) => (
          <div
            key={o.title}
            className="rounded-lg bg-white border border-[#e2e8f0] p-3"
            style={{ borderLeft: `3px solid ${o.color}` }}
          >
            <div className="flex items-start justify-between gap-3">
              <span className="text-[12.5px] font-semibold text-[#0f172a] leading-[1.45]">
                {o.title}
              </span>
              <span
                className="shrink-0 font-mono text-[9px] uppercase tracking-[0.08em] px-1.5 py-0.5 rounded-full"
                style={{
                  color: o.color,
                  background: `${o.color}14`,
                }}
              >
                {o.status}
              </span>
            </div>
            <div className="mt-1 font-mono text-[10px] text-[#94a3b8]">
              {o.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PropertyDoczSolution() {
  return (
    <section className="section-blue-wash py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-12"
        >
          <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-[#64748b]">
            What Changes With PropertyDocz
          </div>
          <h2
            className="mt-3 font-bold tracking-tight text-[#0f172a]"
            style={{ fontSize: "clamp(1.5rem, 2.8vw, 1.875rem)" }}
          >
            The platform runs. You keep the revenue.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-start">
          {/* Left column — stacked feature blocks */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.12 } },
            }}
            className="space-y-4"
          >
            {FEATURES.map((f) => (
              <motion.div
                key={f.title}
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: EASE },
                  },
                }}
                className="dash-card p-5 md:p-6"
                style={{ borderLeft: "3px solid #38b6ff" }}
              >
                <h3 className="text-[15px] font-semibold text-[#0f172a]">
                  {f.title}
                </h3>
                <p className="mt-2 text-[13px] leading-[1.65] text-[#334155]">
                  {f.body}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Right column — product UI mock */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <DashboardMock />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
