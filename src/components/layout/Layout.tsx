import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { KpiTicker } from "./KpiTicker";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* Spacer for fixed navbar — matches dark theme so transparent nav doesn't reveal body white */}
      <div className="h-16 bg-[#0f172a]" aria-hidden />
      <KpiTicker variant="dark" />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
