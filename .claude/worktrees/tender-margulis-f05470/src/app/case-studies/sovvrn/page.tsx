import type { Metadata } from "next";
import { CaseStudyTemplate } from "@/components/case-studies/CaseStudyTemplate";
import { SOVVRN } from "@/data/case-studies";

export const metadata: Metadata = {
  title: SOVVRN.seoTitle,
  description: SOVVRN.seoDescription,
  alternates: { canonical: `/case-studies/${SOVVRN.slug}` },
};

export default function SovvrnCaseStudyPage() {
  return <CaseStudyTemplate slug={SOVVRN.slug} />;
}
