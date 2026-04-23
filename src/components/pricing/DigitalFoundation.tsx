"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const FEATURES = [
  "AI-powered website build using Claude Code",
  "Structured data layer architecture",
  "Multi-tenant ready infrastructure",
  "SEO optimization & structured data",
  "Mobile-first responsive design",
  "Integration-ready for operational systems",
  "2-week delivery timeline",
];

export function DigitalFoundation() {
  return (
    <section className="section-blue-wash py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-10"
        >
          <div className="text-[10px] font-mono font-semibold uppercase tracking-[0.15em] text-[#64748b]">
            Digital Foundation
          </div>
          <h2
            className="mt-3 font-bold tracking-tight text-[#0f172a]"
            style={{ fontSize: "clamp(1.5rem, 2.8vw, 1.875rem)" }}
          >
            Your digital infrastructure.{" "}
            <span className="text-[#38b6ff]">Built in two weeks.</span>
          </h2>
          <p className="mt-4 text-[14px] text-[#334155] max-w-2xl mx-auto leading-[1.7]">
            Not a template. A structured, AI-powered website with data layer
            architecture — integration-ready for operational systems and
            intelligence.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="dash-card p-7 md:p-9 relative overflow-hidden max-w-3xl mx-auto"
          style={{ borderLeft: "3px solid #38b6ff" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left — Price block */}
            <div className="md:col-span-5">
              <div className="text-[12px] font-semibold text-[#334155]">
                Digital Foundation
              </div>
              <div className="mt-2 flex items-baseline gap-2 flex-wrap">
                <span className="font-mono text-[36px] font-bold text-[#0f172a] tabular-nums leading-none">
                  $2,500
                </span>
                <span className="text-[14px] text-[#64748b]">one-time</span>
              </div>
              <div className="mt-4 pt-4 border-t border-[#e2e8f0]/70">
                <div className="font-mono text-[16px] font-semibold text-[#334155] tabular-nums">
                  + $199<span className="text-[12px] text-[#64748b] font-normal">/mo</span>
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[#64748b]">
                  ongoing maintenance &amp; updates
                </div>
              </div>
              <div className="mt-6 inline-flex font-mono text-[10px] font-semibold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full bg-[#38b6ff]/10 text-[#0A8FD4]">
                Foundation
              </div>
            </div>

            {/* Right — Description + features */}
            <div className="md:col-span-7">
              <p className="text-[13.5px] text-[#334155] leading-[1.6]">
                Modern website with structured data architecture, multi-tenant
                ready, integration points for future systems. SEO-optimized,
                mobile-first, deployed on Vercel.
              </p>
              <ul className="mt-5 space-y-1.5">
                {FEATURES.map((f) => (
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
              <Link
                href="/booking"
                className="mt-6 inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#38b6ff] hover:bg-[#0A8FD4] text-[#0f172a] text-[13px] font-semibold transition-all"
              >
                Book a Discovery Call
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          className="mt-8 text-center text-[13px] text-[#64748b] italic max-w-2xl mx-auto leading-[1.7]"
        >
          This is where most businesses start. Your website becomes the
          foundation for everything that follows — operational systems,
          intelligence layers, and growth automation.
        </motion.p>
      </div>
    </section>
  );
}
