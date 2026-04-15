"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

function ProductNode({
  name,
  accent,
  className = "",
  size = "md",
}: {
  name: string;
  accent: string;
  className?: string;
  size?: "md" | "lg";
}) {
  const dim =
    size === "lg"
      ? "px-6 py-4 min-w-[180px]"
      : "px-5 py-3 min-w-[150px]";
  return (
    <div
      className={`relative bg-white rounded-xl text-center shadow-[0_2px_10px_rgba(0,0,0,0.04)] ${dim} ${className}`}
      style={{ border: `2px solid ${accent}` }}
    >
      <div
        className="absolute -top-[2px] left-0 right-0 h-[3px] rounded-t-xl"
        style={{ background: accent }}
      />
      <div
        className="font-bold text-[#0f172a]"
        style={{ fontSize: size === "lg" ? 18 : 15 }}
      >
        {name}
      </div>
    </div>
  );
}

export function ConnectionDiagram() {
  return (
    <section className="section-blue-wash py-24 md:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
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
            How the family connects
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative"
        >
          {/* Sovvrn row */}
          <div className="flex flex-col items-center mb-10">
            <ProductNode name="Sovvrn" accent="#14b8a6" />
            <div className="mt-3 font-mono text-[11px] text-[#64748b] italic">
              Same architecture, different vertical →
            </div>
            <div className="mt-6 h-px w-40 bg-[#e2e8f0]" />
          </div>

          {/* Property triangle */}
          <div className="relative flex flex-col items-center">
            <ProductNode name="Propertyolio" accent="#8b5cf6" size="lg" />

            {/* Connectors */}
            <svg
              aria-hidden
              className="my-2 w-full max-w-md h-12"
              viewBox="0 0 400 60"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="dl" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
                </linearGradient>
                <linearGradient id="dr" x1="1" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <path
                d="M70 55 Q 200 0 200 0"
                stroke="url(#dl)"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M330 55 Q 200 0 200 0"
                stroke="url(#dr)"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>

            <div className="grid grid-cols-2 gap-10 md:gap-16 w-full max-w-md">
              <div className="flex justify-center">
                <ProductNode name="PropertyDocz" accent="#3b82f6" />
              </div>
              <div className="flex justify-center">
                <ProductNode name="PropertyJobz" accent="#3b82f6" />
              </div>
            </div>
            <div className="mt-3 text-center font-mono text-[11px] text-[#64748b]">
              events · webhooks · canonical stream
            </div>
          </div>

          <p className="mt-12 max-w-2xl mx-auto text-center text-[14px] leading-[1.65] text-[#334155]">
            PropertyDocz and PropertyJobz generate operational events.
            Propertyolio ingests, correlates, and delivers intelligence.
            Sovvrn proves the pattern works in restaurants. The architecture
            is the same — the vertical is the variable.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
