import type { Metadata } from "next";
import { CaseStudyTemplate } from "@/components/case-studies/CaseStudyTemplate";
import { XEEDLY_PLATFORM } from "@/data/case-studies";

export const metadata: Metadata = {
  title: XEEDLY_PLATFORM.seoTitle,
  description: XEEDLY_PLATFORM.seoDescription,
  alternates: { canonical: `/case-studies/${XEEDLY_PLATFORM.slug}` },
};

export default function XeedlyPlatformCaseStudyPage() {
  return <CaseStudyTemplate slug={XEEDLY_PLATFORM.slug} />;
}
