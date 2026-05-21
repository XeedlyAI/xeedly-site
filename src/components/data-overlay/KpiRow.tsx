"use client";

import { cn } from "@/lib/utils";
import { KpiCard, type KpiCardData } from "./KpiCard";

export type KpiRowProps = {
  kpis: KpiCardData[];
  variant?: "dark" | "light";
  className?: string;
};

export function KpiRow({ kpis, variant = "dark", className }: KpiRowProps) {
  const isDark = variant === "dark";
  const count = kpis.length;

  const gridCols =
    count <= 3
      ? "grid-cols-1 sm:grid-cols-3"
      : count <= 4
        ? "grid-cols-2 md:grid-cols-4"
        : count <= 6
          ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
          : "grid-cols-2 md:grid-cols-4 lg:grid-cols-8";

  return (
    <div
      className={cn(
        "w-full rounded-lg border overflow-hidden",
        isDark
          ? "bg-[#0f172a] border-white/[0.06]"
          : "bg-white border-slate-200",
        className,
      )}
    >
      <div className={cn("grid", gridCols)}>
        {kpis.map((kpi, i) => (
          <KpiCard
            key={kpi.label}
            {...kpi}
            variant={variant}
            className={cn(
              i > 0 && isDark && "border-l border-white/[0.06]",
              i > 0 && !isDark && "border-l border-slate-100",
            )}
          />
        ))}
      </div>
    </div>
  );
}
