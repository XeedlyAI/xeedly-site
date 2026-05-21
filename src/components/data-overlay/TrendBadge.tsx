"use client";

import { cn } from "@/lib/utils";

export type TrendDirection = "up" | "down" | "flat";

export type TrendBadgeProps = {
  value: number;
  direction?: TrendDirection;
  suffix?: string;
  className?: string;
};

function resolveDirection(value: number): TrendDirection {
  if (value > 0) return "up";
  if (value < 0) return "down";
  return "flat";
}

const ARROW: Record<TrendDirection, string> = {
  up: "▲",
  down: "▼",
  flat: "—",
};

export function TrendBadge({
  value,
  direction,
  suffix = "%",
  className,
}: TrendBadgeProps) {
  const dir = direction ?? resolveDirection(value);
  const absVal = Math.abs(value);

  const colorMap: Record<TrendDirection, string> = {
    up: "text-emerald-400",
    down: "text-red-400",
    flat: "text-slate-500",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-xs font-semibold tabular-nums",
        colorMap[dir],
        className,
      )}
    >
      <span className="text-[9px] leading-none">{ARROW[dir]}</span>
      {absVal.toLocaleString("en-US", { maximumFractionDigits: 1 })}
      {suffix}
    </span>
  );
}
