import type { Metadata } from "next";
import { CaseStudyTemplate } from "@/components/case-studies/CaseStudyTemplate";
import { PROPERTYJOBZ } from "@/data/case-studies";

export const metadata: Metadata = {
  title: PROPERTYJOBZ.seoTitle,
  description: PROPERTYJOBZ.seoDescription,
  alternates: { canonical: `/case-studies/${PROPERTYJOBZ.slug}` },
};

export default function PropertyJobzCaseStudyPage() {
  return <CaseStudyTemplate slug={PROPERTYJOBZ.slug} />;
}
