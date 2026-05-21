"use client";

import { cn } from "@/lib/utils";

export type StatusBarProps = {
  value: number;
  max?: number;
  color?: "green" | "red" | "amber" | "blue" | "slate";
  height?: number;
  className?: string;
};

const BAR_COLORS = {
  green: "bg-emerald-400",
  red: "bg-red-400",
  amber: "bg-amber-400",
  blue: "bg-sky-400",
  slate: "bg-slate-500",
};

const TRACK_COLORS = {
  green: "bg-emerald-400/10",
  red: "bg-red-400/10",
  amber: "bg-amber-400/10",
  blue: "bg-sky-400/10",
  slate: "bg-slate-500/10",
};

export function StatusBar({
  value,
  max = 100,
  color = "green",
  height = 3,
  className,
}: StatusBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div
      className={cn("w-full rounded-full overflow-hidden", TRACK_COLORS[color], className)}
      style={{ height }}
      role="meter"
      aria-valuenow={value}
      aria-valuemax={max}
    >
      <div
        className={cn("h-full rounded-full transition-all duration-500", BAR_COLORS[color])}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
