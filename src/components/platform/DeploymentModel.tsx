"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

type Plan = {
  name: string;
  price: string;
  priceSuffix?: string;
  anchor?: string;
  items: string[];
  tags: string[];
  footnote?: string;
};

const PLANS: Plan[] = [
  {
    name: "Intelligence Deployment",
    price: "$5K–$25K",
    priceSuffix: "one-time",
    anchor: "most deployments",
    items: [
      "Full platform on your infrastructure",
      "Configured for your vertical",
      "2–4 week standup",
      "Custom signal rules + AI persona",
    ],
    tags: ["One-time", "2–4 weeks"],
    footnote: "Complex deployments (6+ integrations, multi-brand) may require additional investment",
  },
  {
    name: "Managed Intelligence",
    price: "$495–$995",
    priceSuffix: "/mo",
    anchor: "most clients",
    items: [
      "Ongoing signal rule tuning",
      "New system integrations",
      "AI persona refinement",
      "Platform updates + monitoring",
    ],
    tags: ["Monthly", "Ongoing"],
    footnote: "High-volume environments (10+ integrations, daily adjustments) quoted custom",
  },
  {
    name: "Product Licenses",
    price: "SaaS",
    priceSuffix: "pricing",
    items: [
      "Sovvrn (restaurants) — purpose-built",
      "Propertyolio (property mgmt) — purpose-built",
      "Includes all platform capabilities",
      "Vertical-specific intelligence",
    ],
    tags: ["Per-seat", "Per-unit"],
  },
];

export function DeploymentModel() {
  return (
    <section className="section-warm-wash py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-14"
        >
          <h2
            className="font-bold tracking-tight text-[#0f172a]"
            style={{ fontSize: "clamp(1.75rem, 3.2vw, 2rem)" }}
          >
            Your vertical. Our architecture.
          </h2>
          <p className="mt-3 text-[14px] text-[#334155] max-w-xl mx-auto">
            The platform is proven. The variable is your data landscape.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {PLANS.map((p) => (
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
              className="dash-card p-7 relative overflow-hidden"
            >
              <div
                aria-hidden
                className="absolute left-0 right-0 top-0 h-[2px] bg-[#38b6ff]"
              />
              <div className="text-[12px] font-semibold text-[#334155]">
                {p.name}
              </div>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="font-mono text-[24px] font-bold text-[#0f172a] tabular-nums">
                  {p.price}
                </span>
                {p.priceSuffix && (
                  <span className="text-[13px] text-[#64748b]">
                    {p.priceSuffix}
                  </span>
                )}
              </div>
              {p.anchor && (
                <div className="mt-1 font-mono text-[12px] text-[#64748b]">
                  {p.anchor}
                </div>
              )}
              <ul className="mt-5 space-y-2">
                {p.items.map((it) => (
                  <li
                    key={it}
                    className="flex items-start gap-2 text-[13px] leading-[1.55] text-[#334155]"
                  >
                    <span className="mt-[7px] w-3 h-[2px] bg-[#14b8a6] shrink-0" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
              {p.footnote && (
                <div className="mt-4 pt-3 border-t border-[#e2e8f0]/70 text-[12px] italic text-[#64748b] leading-[1.45]">
                  {p.footnote}
                </div>
              )}
              <div className="mt-6 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-[#f1f5f9] text-[#64748b]"
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
