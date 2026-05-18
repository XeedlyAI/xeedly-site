import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/blog/ArticleLayout";
import { ArticleStructuredData } from "@/components/blog/ArticleStructuredData";
import {
  ARTICLES,
  ARTICLES_BY_SLUG,
  getLateralSiblings,
} from "@/data/blog";
import { SILO_ORDER, type SiloId } from "@/types/blog";

type Params = { silo: string; slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return ARTICLES.map((a) => ({ silo: a.silo, slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { silo, slug } = await params;
  const article = ARTICLES_BY_SLUG[slug];
  if (!article || article.silo !== silo) return {};
  return {
    title: article.metaTitle,
    description: article.metaDescription,
    alternates: { canonical: `/blog/${silo}/${slug}` },
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      type: "article",
      images: [{ url: article.heroImage }],
      publishedTime: article.publishDate,
      modifiedTime: article.lastReviewedDate,
      authors: [article.author],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { silo, slug } = await params;
  if (!isSiloId(silo)) notFound();
  const article = ARTICLES_BY_SLUG[slug];
  if (!article || article.silo !== silo) notFound();

  const laterals = getLateralSiblings(article, 3);

  return (
    <>
      <ArticleStructuredData article={article} />
      <ArticleLayout article={article} laterals={laterals} />
    </>
  );
}

function isSiloId(s: string): s is SiloId {
  return (SILO_ORDER as string[]).includes(s);
}
