"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

type Status = "Live" | "Shipping" | "In Build";

type Product = {
  name: string;
  vertical: string;
  status: Status;
  statusColor: string;
  statusBg: string;
  borderColor: string;
  description: string;
  tags: string[];
};

const PRODUCTS: Product[] = [
  {
    name: "Sovvrn",
    vertical: "Restaurant Intelligence",
    status: "Live",
    statusColor: "#14b8a6",
    statusBg: "rgba(20,184,166,0.10)",
    borderColor: "#14b8a6",
    description:
      "AI-native BI for multi-unit restaurant operators. Morning briefings, voice AI, command center.",
    tags: ["Voice AI", "Morning Briefing", "Signal Feed"],
  },
  {
    name: "Propertyolio",
    vertical: "Property Management Intelligence",
    status: "In Build",
    statusColor: "#f59e0b",
    statusBg: "rgba(245,158,11,0.10)",
    borderColor: "#f59e0b",
    description:
      "The intelligence nerve center. Ingests events from PropertyDocz and PropertyJobz, detects cross-system patterns.",
    tags: ["Event Bus", "Signal Engine", "AI Correlation"],
  },
  {
    name: "PropertyDocz",
    vertical: "Document Operations",
    status: "Shipping",
    statusColor: "#3b82f6",
    statusBg: "rgba(59,130,246,0.10)",
    borderColor: "#3b82f6",
    description:
      "HOA document ordering and fulfillment. Multi-tenant, subscription tiers, automated PDF generation.",
    tags: ["Multi-Tenant", "PDF Pipeline", "Revenue Split"],
  },
  {
    name: "PropertyJobz",
    vertical: "Vendor Management",
    status: "Shipping",
    statusColor: "#3b82f6",
    statusBg: "rgba(59,130,246,0.10)",
    borderColor: "#3b82f6",
    description:
      "Preferred vendor management for HOA management companies. Compliance tracking, AI assistant.",
    tags: ["Vendor Matching", "Compliance AI", "Multi-Tenant"],
  },
];

export function Products() {
  return (
    <section id="products" className="section-white py-24 md:py-32 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-14"
        >
          <div className="text-[10px] font-mono font-semibold uppercase tracking-[0.15em] text-[#64748b]">
            Product Family
          </div>
          <h2
            className="mt-3 font-bold tracking-tight text-[#0f172a]"
            style={{ fontSize: "clamp(1.75rem, 3.2vw, 2rem)" }}
          >
            Proven across verticals
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {PRODUCTS.map((p) => (
            <motion.div
              key={p.name}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: EASE },
                },
              }}
              className="dash-card p-6 md:p-7"
              style={{ borderLeft: `3px solid ${p.borderColor}` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-[18px] font-bold text-[#0f172a]">
                    {p.name}
                  </h3>
                  <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-[#64748b]">
                    {p.vertical}
                  </div>
                </div>
                <span
                  className="shrink-0 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] px-2.5 py-1 rounded-full"
                  style={{ color: p.statusColor, background: p.statusBg }}
                >
                  {p.status}
                </span>
              </div>
              <p className="mt-4 text-[13px] leading-[1.6] text-[#334155]">
                {p.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] px-2 py-1 rounded-full border border-[#e2e8f0] bg-[#FAFAFA] text-[#64748b]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
