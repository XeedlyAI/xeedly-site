"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare, X, Mail, Phone, Calendar } from "lucide-react";
import { CONTACT, MAILTO, TEL } from "@/lib/contact";

const EASE = [0.16, 1, 0.3, 1] as const;

// Paths where the widget is redundant or competes with a primary contact surface.
const HIDDEN_ROUTES = new Set<string>(["/", "/contact"]);
const HIDDEN_PREFIXES = ["/admin"];

export function ContactWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (
    pathname &&
    (HIDDEN_ROUTES.has(pathname) ||
      HIDDEN_PREFIXES.some((p) => pathname.startsWith(p)))
  ) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 print:hidden">
      <AnimatePresence mode="wait" initial={false}>
        {open ? (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="w-[240px] rounded-2xl bg-white border border-[#e2e8f0] shadow-[0_20px_50px_-12px_rgba(15,23,42,0.25)] overflow-hidden"
            role="dialog"
            aria-label="Contact options"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#f1f5f9]">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#22c55e] animate-pulse" />
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#64748b]">
                  Live
                </span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-1 rounded-md text-[#64748b] hover:text-[#0f172a] hover:bg-[#f1f5f9] transition-colors"
                aria-label="Close contact options"
              >
                <X size={14} />
              </button>
            </div>
            <ul className="py-2">
              <WidgetRow
                href={MAILTO}
                icon={<Mail className="h-4 w-4" />}
                label="Email us"
                detail={CONTACT.email}
              />
              <WidgetRow
                href={TEL}
                icon={<Phone className="h-4 w-4" />}
                label="Call us"
                detail={CONTACT.phone}
              />
              <WidgetRow
                href={CONTACT.calendar}
                external
                icon={<Calendar className="h-4 w-4" />}
                label="Book a call"
                detail="30-min discovery"
              />
            </ul>
          </motion.div>
        ) : (
          <motion.button
            key="bubble"
            type="button"
            onClick={() => setOpen(true)}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.22, ease: EASE }}
            whileHover={{ y: -2 }}
            className="inline-flex items-center gap-2 pl-3.5 pr-4 py-2.5 rounded-full bg-[#38b6ff] hover:bg-[#0A8FD4] text-[#0f172a] font-semibold text-[13px] shadow-[0_10px_30px_-8px_rgba(56,182,255,0.6)] transition-colors"
            aria-label="Open contact options"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Talk</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

function WidgetRow({
  href,
  icon,
  label,
  detail,
  external,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  detail: string;
  external?: boolean;
}) {
  return (
    <li>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#f8fafc] transition-colors group"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#38b6ff]/10 text-[#0A8FD4] group-hover:bg-[#38b6ff]/15 transition-colors">
          {icon}
        </span>
        <span className="flex-1 min-w-0">
          <span className="block text-[13px] font-semibold text-[#0f172a] leading-tight">
            {label}
          </span>
          <span className="block font-mono text-[10px] text-[#64748b] truncate">
            {detail}
          </span>
        </span>
      </a>
    </li>
  );
}
