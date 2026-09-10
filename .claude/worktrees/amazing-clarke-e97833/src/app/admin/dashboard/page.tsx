import type { Metadata } from "next";
import { DashboardView } from "./DashboardView";

export const metadata: Metadata = {
  title: "Dashboard · Admin · XeedlyAI",
  robots: { index: false, follow: false },
};

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-[#0f172a]">
      <DashboardView />
    </main>
  );
}
