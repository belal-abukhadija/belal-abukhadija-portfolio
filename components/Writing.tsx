import Link from "next/link";
import type { ArticleSummary } from "@/lib/articles";

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function ArticleList({ articles }: { articles: ArticleSummary[] }) {
  if (articles.length === 0) {
    return <p>Nothing published yet. Check back soon.</p>;
  }

  return (
    <ul className="border-t-2 border-ink">
      {articles.map((article) => (
        <li key={article.slug} className="border-b-2 border-ink">
          <Link
            href={`/articles/${article.slug}`}
            className="group grid md:grid-cols-12 gap-x-8 gap-y-3 py-8 md:py-10"
          >
            <p className="md:col-span-3 font-medium text-ink-soft">
              {formatDate(article.date)}
              <br />
              {article.part ? `${article.part}, ` : ""}
              {article.readingTime} read
            </p>
            <div className="md:col-span-9">
              <p className="display text-3xl md:text-5xl mb-4 max-w-[22ch] underline decoration-transparent group-hover:decoration-mark">
                {article.title}
              </p>
              <p className="text-lg max-w-[60ch]">{article.excerpt}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Writing({ articles }: { articles: ArticleSummary[] }) {
  return (
    <section id="articles" className="gutter py-24 md:py-36">
      <div className="flex flex-wrap items-end justify-between gap-6 mb-12 md:mb-16">
        <h2 className="display size-title">Notes from the builds</h2>
        <Link href="/articles" className="link text-xl font-bold">
          Read all articles
        </Link>
      </div>
      <ArticleList articles={articles} />
    </section>
  );
}
