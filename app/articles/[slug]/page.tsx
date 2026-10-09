import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { formatDate } from "@/components/Writing";
import { getAllArticles, getArticleBySlug } from "@/lib/articles";

export async function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <>
      <Header />
      <main className="gutter pt-32 pb-24 md:pt-40 md:pb-36">
        <Link href="/articles" className="link font-bold">
          All articles
        </Link>

        <h1 className="display size-title mt-8 mb-6 max-w-[20ch]">{article.title}</h1>
        <p className="font-medium text-ink-soft mb-12 md:mb-16">
          {formatDate(article.date)}, {article.readingTime} read
        </p>

        <div className="article-body max-w-[66ch]">
          <MDXRemote source={article.content} />
        </div>
      </main>
      <Footer />
    </>
  );
}
