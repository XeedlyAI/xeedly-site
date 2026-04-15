import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { KpiTicker } from "./KpiTicker";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* Spacer for fixed navbar, then KPI ticker directly under */}
      <div className="h-16" aria-hidden />
      <KpiTicker variant="dark" />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
