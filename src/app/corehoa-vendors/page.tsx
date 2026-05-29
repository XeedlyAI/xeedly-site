import type { Metadata } from "next";
import { VendorLanding } from "@/components/corehoa-vendors/VendorLanding";

export const metadata: Metadata = {
  title: "Core HOA Vendor Program — Custom Website + Marketing System",
  description:
    "Exclusive vendor pricing for the Core HOA network. Custom website + Core30 marketing system built in 2 weeks. Pricing starts at $495.",
  alternates: { canonical: "/corehoa-vendors" },
  openGraph: {
    title: "Core HOA Vendor Program — XeedlyAI",
    description:
      "Marc Kennedy arranged vendor-only pricing for the Core HOA network. Custom websites and marketing systems for service businesses.",
    url: "/corehoa-vendors",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CoreHOAVendorsPage() {
  return <VendorLanding />;
}
