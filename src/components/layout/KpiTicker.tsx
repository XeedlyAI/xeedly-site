"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Kpi = {
  label: string;
  value: string;
  /** Numeric target for count-up. If omitted, the raw `value` is rendered as-is. */
  target?: number;
  /** Formatter for count-up display; receives the current numeric tick. */
  format?: (n: number) => string;
  subtitle?: string;
};

const KPIS: Kpi[] = [
  {
    label: "Platforms Deployed",
    value: "3",
    target: 3,
    format: (n) => Math.round(n).toString(),
  },
  {
    label: "Signals Processed",
    value: "14,207",
    target: 14207,
    format: (n) => Math.round(n).toLocaleString("en-US"),
    subtitle: "last 30 days",
  },
  {
    label: "Active Verticals",
    value: "2",
    target: 2,
    format: (n) => Math.round(n).toString(),
    subtitle: "restaurants • property",
  },
  {
    label: "Avg Response",
    value: "< 3s",
    subtitle: "signal to delivery",
  },
  {
    label: "Events Ingested",
    value: "89.4K",
    target: 89.4,
    format: (n) => `${n.toFixed(1)}K`,
    subtitle: "cross-platform",
  },
];

type KpiTickerProps = {
  variant?: "dark" | "light";
  className?: string;
};

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function useCountUp(target: number | undefined, duration = 1400) {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (target == null || started.current) return;
    started.current = true;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setValue(target * easeOutCubic(t));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return value;
}

function KpiCell({ kpi, variant }: { kpi: Kpi; variant: "dark" | "light" }) {
  const live = useCountUp(kpi.target);
  const display =
    kpi.target != null && kpi.format ? kpi.format(live) : kpi.value;

  const valueColor =
    variant === "dark" ? "text-[#38b6ff]" : "text-[#0f172a]";
  const labelColor =
    variant === "dark" ? "text-[#64748b]" : "text-[#64748b]";
  const subColor =
    variant === "dark" ? "text-[#64748b]" : "text-[#94a3b8]";

  return (
    <div className="flex flex-col justify-center px-4 py-3 min-w-0">
      <div
        className={cn(
          "text-[10px] font-semibold tracking-[0.14em] uppercase",
          labelColor,
        )}
      >
        {kpi.label}
      </div>
      <div
        className={cn(
          "mt-1 font-mono font-bold text-[20px] md:text-[22px] leading-none tabular-nums truncate",
          valueColor,
        )}
      >
        {display}
      </div>
      {kpi.subtitle && (
        <div className={cn("mt-1 text-[10px] truncate", subColor)}>
          {kpi.subtitle}
        </div>
      )}
    </div>
  );
}

export function KpiTicker({ variant = "dark", className }: KpiTickerProps) {
  const bg =
    variant === "dark"
      ? "bg-[#0f172a] text-[#f1f5f9]"
      : "bg-[#F0F6FF]";
  const border =
    variant === "dark"
      ? "border-[rgba(56,182,255,0.12)]"
      : "border-[rgba(56,182,255,0.18)]";
  const divider =
    variant === "dark"
      ? "divide-[rgba(255,255,255,0.06)]"
      : "divide-[rgba(15,23,42,0.06)]";

  return (
    <div className={cn("w-full border-b", bg, border, className)}>
      <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-6">
        <div
          className={cn(
            "grid grid-cols-2 md:grid-cols-5 md:divide-x",
            divider,
          )}
        >
          {KPIS.map((kpi) => (
            <KpiCell key={kpi.label} kpi={kpi} variant={variant} />
          ))}
        </div>
      </div>
    </div>
  );
}
