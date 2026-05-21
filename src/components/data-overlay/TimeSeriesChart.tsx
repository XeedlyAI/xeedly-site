"use client";

import { cn } from "@/lib/utils";

export type DataPoint = { label: string; value: number };

export type TimeSeriesChartProps = {
  title: string;
  subtitle?: string;
  data: DataPoint[];
  total?: string;
  peak?: string;
  latest?: string;
  period?: string;
  color?: string;
  variant?: "dark" | "light";
  height?: number;
  className?: string;
};

export function TimeSeriesChart({
  title,
  subtitle,
  data,
  total,
  peak,
  latest,
  period,
  color = "#f59e0b",
  variant = "dark",
  height = 260,
  className,
}: TimeSeriesChartProps) {
  const isDark = variant === "dark";

  if (data.length < 2) return null;

  const values = data.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const padX = 48;
  const padTop = 12;
  const padBottom = 32;
  const chartW = 800;
  const chartH = height;
  const usableW = chartW - padX * 2;
  const usableH = chartH - padTop - padBottom;

  const toX = (i: number) => padX + (i / (data.length - 1)) * usableW;
  const toY = (v: number) =>
    padTop + usableH - ((v - min) / range) * usableH;

  const linePoints = data.map((d, i) => `${toX(i)},${toY(d.value)}`).join(" ");

  const areaPoints = [
    `${padX},${padTop + usableH}`,
    ...data.map((d, i) => `${toX(i)},${toY(d.value)}`),
    `${padX + usableW},${padTop + usableH}`,
  ].join(" ");

  const gridLines = 4;
  const gridYs = Array.from({ length: gridLines + 1 }, (_, i) => {
    const frac = i / gridLines;
    return {
      y: padTop + frac * usableH,
      val: max - frac * range,
    };
  });

  const labelInterval = Math.max(1, Math.floor(data.length / 5));

  const textColor = isDark ? "#94a3b8" : "#64748b";
  const gridColor = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)";
  const bgColor = isDark ? "#0f172a" : "#ffffff";

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
      {/* Header */}
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-5 pt-4 pb-2">
        <div className="flex items-baseline gap-3">
          <h3
            className={cn(
              "text-sm font-semibold",
              isDark ? "text-amber-400" : "text-amber-600",
            )}
          >
            {title}
          </h3>
          {total && (
            <span
              className={cn(
                "text-xs",
                isDark ? "text-slate-400" : "text-slate-500",
              )}
            >
              total{" "}
              <span className={cn("font-semibold", isDark ? "text-slate-200" : "text-slate-800")}>
                {total}
              </span>
            </span>
          )}
          {peak && (
            <span
              className={cn(
                "text-xs",
                isDark ? "text-slate-500" : "text-slate-400",
              )}
            >
              peak{" "}
              <span className={cn("font-medium", isDark ? "text-slate-300" : "text-slate-700")}>
                {peak}
              </span>
            </span>
          )}
          {latest && (
            <span
              className={cn(
                "text-xs",
                isDark ? "text-slate-500" : "text-slate-400",
              )}
            >
              latest{" "}
              <span className={cn("font-medium", isDark ? "text-slate-300" : "text-slate-700")}>
                {latest}
              </span>
            </span>
          )}
        </div>
        {period && (
          <span
            className={cn(
              "text-[10px] font-mono",
              isDark ? "text-slate-600" : "text-slate-400",
            )}
          >
            {period}
          </span>
        )}
      </div>

      {/* Chart */}
      <svg
        viewBox={`0 0 ${chartW} ${chartH}`}
        className="w-full"
        style={{ height: "auto" }}
        aria-hidden="true"
      >
        <rect width={chartW} height={chartH} fill={bgColor} />

        {/* Grid lines + Y labels */}
        {gridYs.map((g, i) => (
          <g key={i}>
            <line
              x1={padX}
              y1={g.y}
              x2={chartW - padX}
              y2={g.y}
              stroke={gridColor}
              strokeWidth={1}
            />
            <text
              x={padX - 8}
              y={g.y + 3}
              textAnchor="end"
              fill={textColor}
              fontSize={10}
              fontFamily="var(--font-mono)"
            >
              {g.val >= 1000
                ? `$${(g.val / 1).toLocaleString("en-US", { maximumFractionDigits: 2 })}`
                : `$${g.val.toFixed(2)}`}
            </text>
          </g>
        ))}

        {/* Area fill */}
        <polygon points={areaPoints} fill={`url(#ts-grad-${title.replace(/\s/g, "")})`} />

        {/* Line */}
        <polyline
          points={linePoints}
          fill="none"
          stroke={color}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* X-axis labels */}
        {data.map((d, i) =>
          i % labelInterval === 0 ? (
            <text
              key={i}
              x={toX(i)}
              y={chartH - 6}
              textAnchor="middle"
              fill={textColor}
              fontSize={10}
              fontFamily="var(--font-mono)"
            >
              {d.label}
            </text>
          ) : null,
        )}

        <defs>
          <linearGradient
            id={`ts-grad-${title.replace(/\s/g, "")}`}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor={color} stopOpacity={0.25} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
