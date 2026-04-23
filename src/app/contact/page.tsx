import type { Metadata } from "next";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactPanel } from "@/components/contact/ContactPanel";
import { DirectContact } from "@/components/contact/DirectContact";
import { ContactBooking } from "@/components/contact/ContactBooking";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us about your business. We'll respond within one business day with a concrete recommendation — Growth Systems, Intelligence Platform, or both.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — XeedlyAI",
    description:
      "Start a conversation about your intelligence layer or growth systems.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactPanel />
      <DirectContact />
      <ContactBooking />
    </>
  );
}
