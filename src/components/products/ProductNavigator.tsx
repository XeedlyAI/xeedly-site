"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Line = "intelligence" | "growth";

const INTEL_TABS = [
  { id: "sovvrn", label: "Sovvrn" },
  { id: "propertyolio", label: "Propertyolio" },
  { id: "propertydocz", label: "PropertyDocz" },
  { id: "propertyjobz", label: "PropertyJobz" },
];

const GROWTH_TABS = [
  { id: "ai-ad-engine", label: "AI Ad Engine" },
  { id: "seo-autopilot", label: "SEO Autopilot" },
  { id: "ai-communication", label: "AI Communication" },
  { id: "review-intelligence", label: "Review Intelligence" },
  { id: "payment-automation", label: "Payment Automation" },
];

export function ProductNavigator() {
  const [line, setLine] = useState<Line>("intelligence");
  const [active, setActive] = useState<string>("sovvrn");

  const tabs = line === "intelligence" ? INTEL_TABS : GROWTH_TABS;

  function switchLine(next: Line) {
    setLine(next);
    const first = next === "intelligence" ? "sovvrn" : "ai-ad-engine";
    setActive(first);
    scrollTo(first);
  }

  function scrollTo(id: string) {
    setActive(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <section className="section-white sticky top-16 z-30 border-b border-[#e2e8f0]/70 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        {/* Top-level segment toggle */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-full border border-[#e2e8f0] p-1 bg-[#FAFAFA]">
            {(
              [
                { id: "intelligence", label: "Intelligence Platforms" },
                { id: "growth", label: "Growth Systems" },
              ] as const
            ).map((l) => {
              const selected = line === l.id;
              return (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => switchLine(l.id)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-[12px] font-semibold transition-all",
                    selected
                      ? "bg-[#38b6ff] text-white shadow-sm"
                      : "text-[#64748b] hover:text-[#0f172a]",
                  )}
                >
                  {l.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sub-tabs */}
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          {tabs.map((t) => {
            const selected = active === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => scrollTo(t.id)}
                className={cn(
                  "px-3 py-1.5 rounded-md text-[12px] transition-all",
                  selected
                    ? "bg-[#38b6ff]/10 text-[#0A8FD4] font-semibold"
                    : "text-[#64748b] hover:text-[#0f172a] hover:bg-[#f1f5f9]",
                )}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
