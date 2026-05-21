"use client";

import { useState, createContext, useContext, useCallback } from "react";
import { cn } from "@/lib/utils";

// ── Context ─────────────────────────────────────────────────────────
type AppShellContext = {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
};

const Ctx = createContext<AppShellContext>({
  sidebarOpen: true,
  toggleSidebar: () => {},
});

export const useAppShell = () => useContext(Ctx);

// ── Types ───────────────────────────────────────────────────────────
export type SidebarItem = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: number | string;
  section?: string; // group label (e.g. "Clients")
};

export type AppShellProps = {
  /** App name shown in sidebar header */
  appName: string;
  /** Optional subtitle / version */
  appSubtitle?: string;
  /** Sidebar navigation items */
  sidebarItems: SidebarItem[];
  /** Currently active sidebar item id */
  activeSidebarId?: string;
  /** Called when a sidebar item is clicked */
  onSidebarSelect?: (id: string) => void;
  /** Slot: right-side header content (search, clock, etc.) */
  headerRight?: React.ReactNode;
  /** Slot: content above the sidebar nav (e.g. breadcrumb) */
  headerContent?: React.ReactNode;
  /** Main content area */
  children: React.ReactNode;
  variant?: "dark" | "light";
  className?: string;
};

// ── Sidebar Icon fallback ───────────────────────────────────────────
function SidebarDot({ active }: { active: boolean }) {
  return (
    <span
      className={cn(
        "w-1.5 h-1.5 rounded-full shrink-0",
        active ? "bg-amber-400" : "bg-slate-600",
      )}
    />
  );
}

// ── Component ───────────────────────────────────────────────────────
export function AppShell({
  appName,
  appSubtitle,
  sidebarItems,
  activeSidebarId,
  onSidebarSelect,
  headerRight,
  headerContent,
  children,
  variant = "dark",
  className,
}: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = useCallback(
    () => setSidebarOpen((prev) => !prev),
    [],
  );
  const isDark = variant === "dark";

  // Group items by section
  const sections: { section: string | null; items: SidebarItem[] }[] = [];
  let currentSection: string | null = null;

  for (const item of sidebarItems) {
    if (item.section && item.section !== currentSection) {
      currentSection = item.section;
      sections.push({ section: currentSection, items: [item] });
    } else if (sections.length === 0) {
      sections.push({ section: null, items: [item] });
    } else {
      sections[sections.length - 1].items.push(item);
    }
  }

  return (
    <Ctx.Provider value={{ sidebarOpen, toggleSidebar }}>
      <div
        className={cn(
          "flex h-screen overflow-hidden",
          isDark ? "bg-[#080e1a] text-slate-100" : "bg-slate-50 text-slate-900",
          className,
        )}
      >
        {/* ── Sidebar ──────────────────────────────────────── */}
        <aside
          className={cn(
            "shrink-0 flex flex-col transition-[width] duration-200 ease-out overflow-hidden",
            isDark
              ? "bg-[#0b1120] border-r border-white/[0.06]"
              : "bg-white border-r border-slate-200",
            sidebarOpen ? "w-56" : "w-0 md:w-14",
          )}
        >
          {/* Sidebar header */}
          <div
            className={cn(
              "flex items-center gap-2 px-4 h-12 shrink-0 border-b",
              isDark ? "border-white/[0.06]" : "border-slate-200",
            )}
          >
            <button
              onClick={toggleSidebar}
              className={cn(
                "w-6 h-6 flex items-center justify-center rounded text-xs",
                isDark
                  ? "text-slate-500 hover:text-slate-300 hover:bg-white/[0.04]"
                  : "text-slate-400 hover:text-slate-600 hover:bg-slate-100",
              )}
              aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
              {sidebarOpen ? "◀" : "▶"}
            </button>
            {sidebarOpen && (
              <div className="flex items-baseline gap-2 min-w-0 overflow-hidden">
                <span
                  className={cn(
                    "text-xs font-bold tracking-wide uppercase truncate",
                    isDark ? "text-amber-400" : "text-slate-800",
                  )}
                >
                  {appName}
                </span>
                {appSubtitle && (
                  <span className="text-[9px] font-mono text-slate-600 truncate">
                    {appSubtitle}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Sidebar nav */}
          <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-1">
            {sections.map((group, gi) => (
              <div key={gi}>
                {group.section && sidebarOpen && (
                  <div
                    className={cn(
                      "px-2 pt-4 pb-1 text-[9px] font-semibold tracking-[0.16em] uppercase",
                      isDark ? "text-slate-600" : "text-slate-400",
                    )}
                  >
                    {group.section}
                  </div>
                )}
                {group.items.map((item) => {
                  const active = item.id === activeSidebarId;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onSidebarSelect?.(item.id)}
                      className={cn(
                        "w-full flex items-center gap-2.5 rounded-md px-2.5 py-2 text-left transition-colors duration-150",
                        sidebarOpen ? "" : "justify-center",
                        active
                          ? isDark
                            ? "bg-white/[0.06] text-amber-400"
                            : "bg-slate-100 text-slate-900 font-medium"
                          : isDark
                            ? "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                            : "text-slate-500 hover:text-slate-700 hover:bg-slate-50",
                      )}
                    >
                      {item.icon ?? <SidebarDot active={active} />}
                      {sidebarOpen && (
                        <>
                          <span className="text-xs truncate flex-1">
                            {item.label}
                          </span>
                          {item.badge !== undefined && (
                            <span
                              className={cn(
                                "text-[9px] font-bold tabular-nums px-1.5 py-0.5 rounded-full",
                                active
                                  ? "bg-amber-400/20 text-amber-400"
                                  : isDark
                                    ? "bg-white/[0.06] text-slate-500"
                                    : "bg-slate-100 text-slate-400",
                              )}
                            >
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>
        </aside>

        {/* ── Main area ────────────────────────────────────── */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Top bar */}
          <header
            className={cn(
              "shrink-0 flex items-center justify-between gap-4 px-5 h-12 border-b",
              isDark
                ? "bg-[#0f172a] border-white/[0.06]"
                : "bg-white border-slate-200",
            )}
          >
            {/* Mobile sidebar toggle */}
            <button
              onClick={toggleSidebar}
              className={cn(
                "md:hidden w-8 h-8 flex items-center justify-center rounded",
                isDark
                  ? "text-slate-400 hover:bg-white/[0.04]"
                  : "text-slate-500 hover:bg-slate-100",
              )}
              aria-label="Toggle sidebar"
            >
              ☰
            </button>

            <div className="flex-1 min-w-0">
              {headerContent}
            </div>

            {headerRight && (
              <div className="flex items-center gap-3 shrink-0">
                {headerRight}
              </div>
            )}
          </header>

          {/* Content — scrollable */}
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </Ctx.Provider>
  );
}
