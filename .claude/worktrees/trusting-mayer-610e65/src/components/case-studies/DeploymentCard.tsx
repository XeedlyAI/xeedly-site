"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  STATUS_ACCENT,
  type DeploymentCardData,
} from "@/data/case-studies";

const EASE = [0.16, 1, 0.3, 1] as const;

type DeploymentCardProps = {
  data: DeploymentCardData;
  variant?: "full" | "compact";
};

export function DeploymentCard({
  data,
  variant = "full",
}: DeploymentCardProps) {
  const status = STATUS_ACCENT[data.statusAccent];
  const href = `/case-studies/${data.slug}`;
  const compact = variant === "compact";

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: EASE },
        },
      }}
      className="h-full"
    >
      <Link
        href={href}
        className="group block h-full dash-card overflow-hidden transition-all duration-200 hover:-translate-y-0.5"
        style={{ borderLeft: `3px solid ${data.accentBorder}` }}
      >
        <div className={compact ? "p-5" : "p-6 md:p-7"}>
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3
                className={
                  compact
                    ? "text-[15px] font-bold text-[#0f172a]"
                    : "text-[16px] font-bold text-[#0f172a]"
                }
              >
                {data.clientName}
              </h3>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[#64748b]">
                {data.industry}
              </div>
            </div>
            <span
              className="shrink-0 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] px-2.5 py-1 rounded-full"
              style={{ color: status.text, background: status.bg }}
            >
              {data.status}
            </span>
          </div>

          <p
            className={
              compact
                ? "mt-3 text-[12.5px] leading-[1.6] text-[#334155]"
                : "mt-4 text-[13px] leading-[1.6] text-[#334155]"
            }
          >
            {data.description}
          </p>

          <div
            className={
              compact
                ? "mt-4 pt-4 border-t border-[#e2e8f0]"
                : "mt-5 pt-5 border-t border-[#e2e8f0]"
            }
          >
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[11px] text-[#64748b]">
              {data.dataRow.map((row, idx) => (
                <span key={row} className="inline-flex items-center gap-3">
                  <span>{row}</span>
                  {idx < data.dataRow.length - 1 && (
                    <span aria-hidden className="text-[#cbd5e1]">
                      ·
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-5 font-mono text-[11px] font-semibold tracking-[0.08em] uppercase text-[#38b6ff] group-hover:text-[#0A8FD4] transition-colors">
            Read brief →
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
