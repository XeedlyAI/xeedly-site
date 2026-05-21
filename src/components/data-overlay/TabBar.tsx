"use client";

import { useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

// ── Types ───────────────────────────────────────────────────────────
export type Tab = {
  id: string;
  label: string;
  badge?: number | string;
  /** Badge severity controls color: "info" (blue), "warn" (amber), "error" (red) */
  badgeVariant?: "info" | "warn" | "error";
};

export type TabBarProps = {
  tabs: Tab[];
  activeTabId: string;
  onTabChange: (id: string) => void;
  variant?: "dark" | "light";
  /** Optional right-aligned controls (filters, date pickers, toggles) */
  rightSlot?: React.ReactNode;
  className?: string;
};

// ── Badge colors ────────────────────────────────────────────────────
const BADGE_VARIANT = {
  info: {
    dark: "bg-sky-400/15 text-sky-400",
    light: "bg-sky-100 text-sky-600",
  },
  warn: {
    dark: "bg-amber-400/15 text-amber-400",
    light: "bg-amber-100 text-amber-600",
  },
  error: {
    dark: "bg-red-400/15 text-red-400",
    light: "bg-red-100 text-red-600",
  },
};

// ── Component ───────────────────────────────────────────────────────
export function TabBar({
  tabs,
  activeTabId,
  onTabChange,
  variant = "dark",
  rightSlot,
  className,
}: TabBarProps) {
  const isDark = variant === "dark";
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  // Scroll active tab into view when it changes
  useEffect(() => {
    if (activeRef.current && scrollRef.current) {
      const container = scrollRef.current;
      const el = activeRef.current;
      const elLeft = el.offsetLeft;
      const elRight = elLeft + el.offsetWidth;
      const scrollLeft = container.scrollLeft;
      const visibleRight = scrollLeft + container.clientWidth;

      if (elLeft < scrollLeft + 16) {
        container.scrollTo({ left: elLeft - 16, behavior: "smooth" });
      } else if (elRight > visibleRight - 16) {
        container.scrollTo({
          left: elRight - container.clientWidth + 16,
          behavior: "smooth",
        });
      }
    }
  }, [activeTabId]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (scrollRef.current && e.deltaY !== 0) {
      e.preventDefault();
      scrollRef.current.scrollLeft += e.deltaY;
    }
  }, []);

  return (
    <div
      className={cn(
        "shrink-0 flex items-center border-b",
        isDark
          ? "bg-[#0f172a] border-white/[0.06]"
          : "bg-white border-slate-200",
        className,
      )}
    >
      {/* Scrollable tab strip */}
      <div
        ref={scrollRef}
        onWheel={handleWheel}
        className="flex-1 overflow-x-auto scrollbar-none"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="flex items-stretch min-w-max">
          {tabs.map((tab) => {
            const active = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                ref={active ? activeRef : undefined}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "relative flex items-center gap-1.5 px-4 py-3 text-xs font-medium whitespace-nowrap transition-colors duration-150",
                  active
                    ? isDark
                      ? "text-amber-400"
                      : "text-slate-900"
                    : isDark
                      ? "text-slate-500 hover:text-slate-300"
                      : "text-slate-400 hover:text-slate-600",
                )}
              >
                {tab.label}

                {/* Badge */}
                {tab.badge !== undefined && (
                  <span
                    className={cn(
                      "text-[9px] font-bold tabular-nums px-1.5 py-0.5 rounded-full leading-none",
                      BADGE_VARIANT[tab.badgeVariant ?? "info"][
                        isDark ? "dark" : "light"
                      ],
                    )}
                  >
                    {tab.badge}
                  </span>
                )}

                {/* Active indicator — bottom bar */}
                {active && (
                  <span
                    className={cn(
                      "absolute bottom-0 left-2 right-2 h-[2px] rounded-full",
                      isDark ? "bg-amber-400" : "bg-slate-900",
                    )}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Right slot (filters, toggles, date pickers) */}
      {rightSlot && (
        <div
          className={cn(
            "shrink-0 flex items-center gap-2 px-4 border-l",
            isDark ? "border-white/[0.06]" : "border-slate-200",
          )}
        >
          {rightSlot}
        </div>
      )}
    </div>
  );
}
