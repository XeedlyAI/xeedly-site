"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/platform", label: "Platform" },
  { href: "/products", label: "Products" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
            : "bg-transparent",
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1.5 group">
            <span
              className={cn(
                "text-lg font-bold tracking-tight transition-colors",
                scrolled ? "text-[#0f172a]" : "text-white",
              )}
            >
              Xeedly
            </span>
            <span className="text-lg font-bold tracking-tight text-[#38b6ff]">
              AI
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-[13px] font-medium transition-colors",
                  scrolled
                    ? "text-[#334155] hover:text-[#0f172a]"
                    : "text-white/80 hover:text-white",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center px-4 py-2 rounded-full bg-[#38b6ff] hover:bg-[#0A8FD4] text-[#0f172a] text-[13px] font-semibold transition-colors"
            >
              Talk to Us
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className={cn(
                "md:hidden p-2 rounded-md transition-colors",
                scrolled ? "text-[#0f172a]" : "text-white",
              )}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile slide-in panel */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-[80%] max-w-xs bg-white shadow-xl flex flex-col">
            <div className="h-16 px-5 flex items-center justify-between border-b border-[#e2e8f0]">
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold tracking-tight text-[#0f172a]">
                  Xeedly
                </span>
                <span className="text-lg font-bold tracking-tight text-[#38b6ff]">
                  AI
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="p-2 text-[#334155]"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>
            <nav className="flex-1 px-5 py-6 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 text-[15px] font-medium text-[#0f172a]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="p-5 border-t border-[#e2e8f0]">
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="w-full inline-flex items-center justify-center px-4 py-3 rounded-full bg-[#38b6ff] hover:bg-[#0A8FD4] text-[#0f172a] text-[14px] font-semibold transition-colors"
              >
                Talk to Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
