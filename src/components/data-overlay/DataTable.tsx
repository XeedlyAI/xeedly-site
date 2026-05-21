"use client";

import { useState, useMemo, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Sparkline } from "./Sparkline";
import { TrendBadge } from "./TrendBadge";

export type ColumnDef<T> = {
  key: string;
  label: string;
  align?: "left" | "right" | "center";
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
  sortValue?: (row: T) => number | string;
};

export type DataTableProps<T extends Record<string, unknown>> = {
  columns: ColumnDef<T>[];
  rows: T[];
  variant?: "dark" | "light";
  className?: string;
};

type SortState = { key: string; dir: "asc" | "desc" } | null;

export function DataTable<T extends Record<string, unknown>>({
  columns,
  rows,
  variant = "dark",
  className,
}: DataTableProps<T>) {
  const isDark = variant === "dark";
  const [sort, setSort] = useState<SortState>(null);

  const handleSort = useCallback(
    (key: string) => {
      setSort((prev) => {
        if (prev?.key === key) {
          return prev.dir === "asc" ? { key, dir: "desc" } : null;
        }
        return { key, dir: "desc" };
      });
    },
    [],
  );

  const sorted = useMemo(() => {
    if (!sort) return rows;
    const col = columns.find((c) => c.key === sort.key);
    if (!col) return rows;

    return [...rows].sort((a, b) => {
      const av = col.sortValue
        ? col.sortValue(a)
        : (a[sort.key] as string | number);
      const bv = col.sortValue
        ? col.sortValue(b)
        : (b[sort.key] as string | number);

      if (typeof av === "number" && typeof bv === "number") {
        return sort.dir === "asc" ? av - bv : bv - av;
      }
      const sa = String(av);
      const sb = String(bv);
      return sort.dir === "asc"
        ? sa.localeCompare(sb)
        : sb.localeCompare(sa);
    });
  }, [rows, sort, columns]);

  const sortIcon = (key: string) => {
    if (sort?.key !== key) return "↕";
    return sort.dir === "asc" ? "↑" : "↓";
  };

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
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr
              className={cn(
                isDark ? "bg-[#1e293b]/60" : "bg-slate-50",
              )}
            >
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    "px-4 py-2.5 text-[10px] font-semibold tracking-[0.12em] uppercase whitespace-nowrap",
                    col.align === "right" ? "text-right" : "text-left",
                    col.align === "center" && "text-center",
                    isDark ? "text-slate-500" : "text-slate-400",
                    col.sortable && "cursor-pointer select-none hover:text-slate-300",
                  )}
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                >
                  {col.label}
                  {col.sortable && (
                    <span className="ml-1 text-[9px] opacity-60">
                      {sortIcon(col.key)}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((row, ri) => (
              <tr
                key={ri}
                className={cn(
                  "transition-colors duration-150",
                  isDark
                    ? "border-t border-white/[0.04] hover:bg-white/[0.02]"
                    : "border-t border-slate-100 hover:bg-slate-50/60",
                )}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn(
                      "px-4 py-3 whitespace-nowrap tabular-nums",
                      col.align === "right" ? "text-right" : "text-left",
                      col.align === "center" && "text-center",
                      isDark ? "text-slate-300" : "text-slate-700",
                    )}
                  >
                    {col.render
                      ? col.render(row)
                      : String(row[col.key] ?? "—")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Convenience render helpers ─────────────────────────────────────
export function renderTrend(value: number, suffix = "%") {
  return <TrendBadge value={value} suffix={suffix} />;
}

export function renderSparkline(data: number[], color?: string) {
  return <Sparkline data={data} color={color} width={64} height={20} />;
}

export function renderMoney(value: number) {
  return (
    <span className="font-mono font-semibold">
      ${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
    </span>
  );
}
