"use client";

import { cn } from "@/lib/utils";

export type SparklineProps = {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  fillOpacity?: number;
  strokeWidth?: number;
  className?: string;
};

export function Sparkline({
  data,
  width = 80,
  height = 28,
  color = "var(--spark-color, #f59e0b)",
  fillOpacity = 0.15,
  strokeWidth = 1.5,
  className,
}: SparklineProps) {
  if (data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const padding = 2;
  const usableW = width - padding * 2;
  const usableH = height - padding * 2;

  const points = data.map((v, i) => {
    const x = padding + (i / (data.length - 1)) * usableW;
    const y = padding + usableH - ((v - min) / range) * usableH;
    return `${x},${y}`;
  });

  const polyline = points.join(" ");

  const areaPoints = [
    `${padding},${padding + usableH}`,
    ...points,
    `${padding + usableW},${padding + usableH}`,
  ].join(" ");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className={cn("shrink-0", className)}
      aria-hidden="true"
    >
      <polygon points={areaPoints} fill={color} opacity={fillOpacity} />
      <polyline
        points={polyline}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
