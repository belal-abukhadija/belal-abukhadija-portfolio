import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
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

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
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
      <main className="grain pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink-soft hover:text-mint transition-colors mb-10"
            >
              <ArrowLeft className="w-4 h-4" />
              All articles
            </Link>

            <div className="flex items-center gap-4 font-display text-[0.68rem] font-semibold uppercase tracking-widest text-ink-faint mb-6">
              <span>{formatDate(article.date)}</span>
              <span>·</span>
              <span>{article.readingTime}</span>
            </div>

            <h1 className="font-display font-black tracking-tight text-ink leading-[1.02] text-[clamp(2rem,5.5vw,3.4rem)] mb-10">
              {article.title}
            </h1>

            <div className="article-body">
              <MDXRemote source={article.content} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
