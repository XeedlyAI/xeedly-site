"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/platform", label: "Platform" },
  { href: "/products", label: "Products" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

const LOGO_LIGHT = "/images/logos/Xeedly_ai_logo_bright_blue.png";
const LOGO_DARK = "/images/logos/Xeedly_ai_logo_dark_blue.png";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed z-50 transition-all duration-300 ease-out",
          scrolled
            ? "top-3 left-1/2 -translate-x-1/2 w-[min(950px,calc(100%-16px))] rounded-full border border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.15),0_1px_4px_rgba(0,0,0,0.08)]"
            : "top-0 left-0 right-0 w-full border border-transparent",
        )}
        style={{
          background: scrolled ? "rgba(15, 23, 42, 0.75)" : "transparent",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          transitionProperty:
            "top, width, max-width, background, border-color, box-shadow, border-radius, transform, backdrop-filter",
        }}
      >
        <div
          className={cn(
            "mx-auto flex items-center justify-between transition-all duration-300",
            scrolled
              ? "h-14 px-4 sm:px-5"
              : "h-16 px-4 sm:px-6 lg:px-8 max-w-7xl",
          )}
        >
          {/* Logo — stays light in both states (dark bg in both) */}
          <Link href="/" className="flex items-center shrink-0" aria-label="XeedlyAI home">
            <Image
              src={LOGO_LIGHT}
              alt="XeedlyAI"
              width={320}
              height={64}
              priority
              className={cn(
                "w-auto transition-all duration-300",
                scrolled ? "h-8" : "h-9 md:h-9",
              )}
            />
          </Link>

          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[13px] font-medium text-[#f1f5f9] hover:text-[#38b6ff] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center px-4 py-2 rounded-full bg-[#38b6ff] hover:bg-[#0A8FD4] text-[#0f172a] text-[13px] font-semibold transition-colors"
            >
              Talk to Us
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 rounded-md text-white transition-colors"
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
              <Image
                src={LOGO_DARK}
                alt="XeedlyAI"
                width={320}
                height={64}
                className="h-7 w-auto"
              />
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
