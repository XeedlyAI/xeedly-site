"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DESK_SPRINT } from "@/data/desks";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Campaign strip for the Desk Sprint. Renders only until the sale ends (checked in the browser,
 *  so the static homepage does not freeze the date at build time). */
export function DeskSprintStrip() {
  const [live, setLive] = useState(false);
  useEffect(() => {
    const end = new Date(`${DESK_SPRINT.saleEnds}T23:59:59-07:00`); // Mountain Time
    setLive(Date.now() <= end.getTime());
  }, []);
  if (!live) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="mb-7"
    >
      <Link
        href="/desks"
        className="group inline-flex max-w-full items-center gap-3 rounded-full border border-[#38b6ff]/35 bg-[#38b6ff]/[0.08] hover:bg-[#38b6ff]/[0.14] pl-2 pr-4 py-1.5 transition-colors"
      >
        <span className="shrink-0 rounded-full bg-[#38b6ff] px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#0f172a]">
          Through {DESK_SPRINT.saleEndsLabel.split(",")[0]}
        </span>
        <span className="truncate text-[13px] text-[#cbd5e1]">
          The Desk Sprint: one role&apos;s app on your data, live in {DESK_SPRINT.goLiveDays} days.{" "}
          <span className="font-mono font-semibold text-[#f1f5f9]">
            ${DESK_SPRINT.salePrice.toLocaleString()}
          </span>{" "}
          <span className="font-mono text-[#64748b] line-through">
            ${DESK_SPRINT.listPrice.toLocaleString()}
          </span>
        </span>
        <span aria-hidden className="shrink-0 text-[#38b6ff] transition-transform group-hover:translate-x-0.5">→</span>
      </Link>
    </motion.div>
  );
}
