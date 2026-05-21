"use client";

import { cn } from "@/lib/utils";
import { Sparkline } from "./Sparkline";
import { TrendBadge, type TrendDirection } from "./TrendBadge";

export type KpiStatus = "positive" | "negative" | "neutral" | "warning";

export type KpiCardData = {
  label: string;
  value: string;
  trend?: { value: number; direction?: TrendDirection; suffix?: string };
  sparkline?: number[];
  status?: KpiStatus;
  subtitle?: string;
};

type KpiCardProps = KpiCardData & {
  variant?: "dark" | "light";
  className?: string;
};

const STATUS_COLORS: Record<KpiStatus, string> = {
  positive: "bg-emerald-400",
  negative: "bg-red-400",
  neutral: "bg-slate-500",
  warning: "bg-amber-400",
};

const SPARK_COLORS: Record<KpiStatus, string> = {
  positive: "#34d399",
  negative: "#f87171",
  neutral: "#64748b",
  warning: "#fbbf24",
};

export function KpiCard({
  label,
  value,
  trend,
  sparkline,
  status = "neutral",
  subtitle,
  variant = "dark",
  className,
}: KpiCardProps) {
  const isDark = variant === "dark";

  return (
    <div
      className={cn(
        "relative flex flex-col gap-1.5 px-5 py-4 min-w-0 overflow-hidden",
        isDark
          ? "bg-[#0f172a]"
          : "bg-white",
        className,
      )}
    >
      {/* Status bar — thin color strip at top */}
      <div
        className={cn(
          "absolute top-0 left-0 right-0 h-[2px]",
          STATUS_COLORS[status],
        )}
      />

      {/* Label */}
      <div
        className={cn(
          "text-[10px] font-semibold tracking-[0.14em] uppercase truncate",
          isDark ? "text-slate-500" : "text-slate-400",
        )}
      >
        {label}
      </div>

      {/* Value row: big number + sparkline */}
      <div className="flex items-end justify-between gap-3">
        <div
          className={cn(
            "font-mono font-bold text-[22px] md:text-[26px] leading-none tabular-nums truncate",
            isDark ? "text-slate-50" : "text-slate-900",
          )}
        >
          {value}
        </div>
        {sparkline && sparkline.length > 1 && (
          <Sparkline
            data={sparkline}
            color={SPARK_COLORS[status]}
            width={72}
            height={24}
            className="opacity-80"
          />
        )}
      </div>

      {/* Trend + subtitle row */}
      <div className="flex items-center gap-2 min-h-[16px]">
        {trend && (
          <TrendBadge
            value={trend.value}
            direction={trend.direction}
            suffix={trend.suffix}
          />
        )}
        {subtitle && (
          <span
            className={cn(
              "text-[10px] truncate",
              isDark ? "text-slate-600" : "text-slate-400",
            )}
          >
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
}
