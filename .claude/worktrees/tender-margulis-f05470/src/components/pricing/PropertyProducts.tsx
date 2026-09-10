"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

type Product = {
  name: string;
  subtitle: string;
  description: string;
  features: string[];
  tag: string;
  accent: string;
  learnMore: string;
};

const PRODUCTS: Product[] = [
  {
    name: "PropertyDocz",
    subtitle: "Document Operations",
    description:
      "Your communities generate document requests every day. Right now, a third-party company fulfills them — and keeps the revenue. PropertyDocz brings the entire process in-house. AI-powered document generation, your pricing, your revenue. Stop splitting with middlemen.",
    features: [
      "AI-powered document generation",
      "Multi-tenant — your brand, your subdomain",
      "Set your own document pricing",
      "Real-time revenue — no monthly settlement delays",
      "Automated data harvesting & confidence scoring",
      "Agent and homeowner ordering portals",
    ],
    tag: "Document Ops",
    accent: "#38b6ff",
    learnMore: "/products/propertydocz",
  },
  {
    name: "PropertyJobz",
    subtitle: "Vendor Management",
    description:
      "You already manage vendor relationships — verification, compliance, job assignments. PropertyJobz turns that work into a managed marketplace where vendors pay for access. New revenue from existing operations. No toll booth — real value, real income.",
    features: [
      "Vendor verification & compliance tracking",
      "Preferred vendor program management",
      "RFP creation & vendor matching",
      "Job assignment & completion tracking",
      "AI assistant on every dashboard",
      "Automated insurance & license expiry alerts",
    ],
    tag: "Vendor Mgmt",
    accent: "#14b8a6",
    learnMore: "/products/propertyjobz",
  },
];

export function PropertyProducts() {
  return (
    <section className="section-warm-wash py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-12"
        >
          <div className="text-[10px] font-mono font-semibold uppercase tracking-[0.15em] text-[#64748b]">
            Property Products
          </div>
          <h2
            className="mt-3 font-bold tracking-tight text-[#0f172a]"
            style={{ fontSize: "clamp(1.5rem, 2.8vw, 1.875rem)" }}
          >
            New revenue streams.{" "}
            <span className="text-[#38b6ff]">Fully automated.</span>
          </h2>
          <p className="mt-4 text-[14.5px] text-[#334155] max-w-3xl mx-auto leading-[1.7]">
            We don&apos;t sell you software. We build you revenue streams.
            PropertyDocz and PropertyJobz turn work your company already does
            into income you&apos;re not capturing — with zero monthly platform
            fees and a revenue-share model that aligns our success with yours.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto"
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
              className="dash-card p-7 relative overflow-hidden flex flex-col"
              style={{ borderLeft: `3px solid ${p.accent}` }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-[18px] font-bold text-[#0f172a]">
                    {p.name}
                  </div>
                  <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-[#64748b]">
                    {p.subtitle}
                  </div>
                </div>
                <span className="shrink-0 font-mono text-[9px] font-semibold uppercase tracking-[0.1em] px-2 py-1 rounded-full bg-[#f59e0b]/10 text-[#b45309]">
                  Limited Time
                </span>
              </div>

              {/* Setup fee block */}
              <div className="mt-5 pt-4 border-t border-[#e2e8f0]/70">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="font-mono text-[16px] font-semibold text-[#94a3b8] line-through tabular-nums">
                    $1,500
                  </span>
                  <span className="font-mono text-[30px] font-bold text-[#0f172a] tabular-nums leading-none">
                    $500
                  </span>
                  <span className="text-[14px] text-[#64748b]">setup</span>
                </div>
                <p className="mt-2 text-[12px] text-[#64748b] leading-[1.55]">
                  No monthly platform fees. Revenue-share model aligned with
                  your success.
                </p>
              </div>

              <p className="mt-5 text-[13px] text-[#334155] leading-[1.6]">
                {p.description}
              </p>

              <ul className="mt-5 space-y-1.5 flex-1">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-[13px] text-[#334155] leading-[1.55]"
                  >
                    <span className="text-[#14b8a6] font-mono text-[12px] mt-[2px]">
                      —
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div
                className="mt-6 inline-flex font-mono text-[10px] font-semibold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full self-start"
                style={{
                  background: `${p.accent}1A`,
                  color: p.accent,
                }}
              >
                {p.tag}
              </div>

              <Link
                href="/booking"
                className="mt-5 inline-flex items-center justify-center px-5 py-3 rounded-lg bg-[#38b6ff] hover:bg-[#0A8FD4] text-[#0f172a] text-[13px] font-semibold transition-all"
              >
                Book a Discovery Call
              </Link>
              <Link
                href={p.learnMore}
                className="mt-2 text-[12px] text-[#0A8FD4] hover:text-[#38b6ff] text-center transition-colors"
              >
                Learn more →
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
          className="mt-10 text-center text-[13.5px] text-[#334155] italic max-w-2xl mx-auto leading-[1.7]"
        >
          Both products can be deployed together for a combined setup of{" "}
          <span className="line-through text-[#94a3b8] not-italic font-mono">
            $3,000
          </span>{" "}
          <span className="font-mono font-semibold text-[#0f172a] not-italic">
            $1,000
          </span>
          . Each creates an independent revenue stream for your management
          company.
        </motion.p>
      </div>
    </section>
  );
}
