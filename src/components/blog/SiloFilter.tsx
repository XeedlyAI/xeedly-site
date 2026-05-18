"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { SILOS, SILO_ORDER, type SiloId } from "@/types/blog";

export function SiloFilter({ active }: { active: SiloId | "all" }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
      <FilterPill href="/blog" active={active === "all"} label="ALL" />
      {SILO_ORDER.map((id) => (
        <FilterPill
          key={id}
          href={`/blog/${id}`}
          active={active === id}
          label={SILOS[id].name}
        />
      ))}
    </div>
  );
}

function FilterPill({
  href,
  active,
  label,
}: {
  href: string;
  active: boolean;
  label: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center px-3 py-1.5 rounded-full border font-mono text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors",
        active
          ? "bg-[#0f172a] border-[#0f172a] text-white"
          : "bg-white border-[#e2e8f0] text-[#475569] hover:border-[#38b6ff] hover:text-[#0A8FD4]",
      )}
    >
      {label}
    </Link>
  );
}
