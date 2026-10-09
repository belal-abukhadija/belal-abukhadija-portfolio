import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArticleList } from "@/components/Writing";
import { getAllArticles } from "@/lib/articles";
import { personalInfo } from "@/lib/projects-data";

export const metadata: Metadata = {
  title: "Articles",
  description: `Notes on the projects I ship, build logs, and things I've learned, from ${personalInfo.name}.`,
};

export default function ArticlesIndexPage() {
  const articles = getAllArticles();

  return (
    <>
      <Header />
      <main className="gutter pt-32 pb-24 md:pt-40 md:pb-36 min-h-svh">
        <Link href="/#articles" className="link font-bold">
          Back home
        </Link>
        <h1 className="display size-hero mt-8 mb-14 md:mb-20">Notes from the builds</h1>
        <ArticleList articles={articles} />
      </main>
      <Footer />
    </>
  );
}
