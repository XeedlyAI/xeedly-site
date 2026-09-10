import type { Metadata } from "next";
import type { ReactNode } from "react";

/**
 * Admin shell: bypasses the public Layout (no Navbar/Footer/KpiTicker/ContactWidget).
 * Since the public Layout wraps all pages in `app/layout.tsx`, we can't undo it
 * here — but we can render a slim header and apply admin-specific background.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
