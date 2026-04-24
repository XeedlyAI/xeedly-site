import type { Metadata } from "next";
import { DealCloser } from "./DealCloser";

export const metadata: Metadata = {
  title: "Close · Admin · XeedlyAI",
  robots: { index: false, follow: false },
};

export default async function AdminClosePage({
  searchParams,
}: {
  searchParams: Promise<{
    success?: string;
    cancelled?: string;
    deal?: string;
  }>;
}) {
  const params = await searchParams;
  return (
    <main className="min-h-screen bg-[#0f172a]">
      <DealCloser
        stripeReturnSuccess={params.success === "true"}
        stripeReturnCancelled={params.cancelled === "true"}
        stripeReturnDealId={params.deal}
      />
    </main>
  );
}
