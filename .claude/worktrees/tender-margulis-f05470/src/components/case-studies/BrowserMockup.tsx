"use client";

import type { ReactNode } from "react";

type BrowserMockupProps = {
  url: string;
  children: ReactNode;
  className?: string;
  variant?: "light" | "dark";
};

export function BrowserMockup({
  url,
  children,
  className = "",
  variant = "dark",
}: BrowserMockupProps) {
  const isDark = variant === "dark";

  return (
    <div
      className={`rounded-xl overflow-hidden ${className}`}
      style={{
        background: isDark ? "#1e1e2e" : "#ffffff",
        border: `1px solid ${isDark ? "rgba(255,255,255,0.10)" : "#e2e8f0"}`,
        boxShadow: isDark
          ? "0 0 0 1px rgba(56,182,255,0.06), 0 8px 40px -12px rgba(0,0,0,0.7), 0 0 80px -20px rgba(56,182,255,0.12)"
          : "0 8px 40px -12px rgba(0,0,0,0.15), 0 2px 6px rgba(0,0,0,0.04)",
      }}
    >
      {/* Chrome bar */}
      <div
        className="flex items-center gap-3 px-4 py-3"
        style={{
          background: isDark ? "#161622" : "#f8fafc",
          borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "#e2e8f0"}`,
        }}
      >
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>

        {/* Address bar */}
        <div
          className="flex-1 flex items-center gap-2 rounded-md px-3 py-1.5 min-w-0"
          style={{
            background: isDark ? "rgba(255,255,255,0.06)" : "#f1f5f9",
            border: `1px solid ${isDark ? "rgba(255,255,255,0.04)" : "#e2e8f0"}`,
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 16 16"
            fill="none"
            className="shrink-0"
            aria-hidden
          >
            <rect
              x="3"
              y="7"
              width="10"
              height="7"
              rx="1.5"
              fill={isDark ? "#64748b" : "#94a3b8"}
            />
            <path
              d="M5 7V5a3 3 0 116 0v2"
              stroke={isDark ? "#64748b" : "#94a3b8"}
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          <span
            className="font-mono text-[11px] truncate"
            style={{ color: isDark ? "#94a3b8" : "#64748b" }}
          >
            {url}
          </span>
        </div>
      </div>

      {/* Viewport */}
      <div className="relative overflow-hidden">{children}</div>
    </div>
  );
}
