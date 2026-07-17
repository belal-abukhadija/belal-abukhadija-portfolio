import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

export interface ArticleFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  part?: string;
}

export interface ArticleSummary extends ArticleFrontmatter {
  slug: string;
  readingTime: string;
}

export interface Article extends ArticleSummary {
  content: string;
}

function readSlugs(): string[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getAllArticles(): ArticleSummary[] {
  return readSlugs()
    .map((slug) => {
      const raw = fs.readFileSync(path.join(ARTICLES_DIR, `${slug}.mdx`), "utf8");
      const { data, content } = matter(raw);
      const frontmatter = data as ArticleFrontmatter;
      return {
        slug,
        ...frontmatter,
        readingTime: readingTime(content).text.replace("read", "").trim(),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticleBySlug(slug: string): Article | null {
  const filePath = path.join(ARTICLES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as ArticleFrontmatter;
  return {
    slug,
    ...frontmatter,
    readingTime: readingTime(content).text.replace("read", "").trim(),
    content,
  };
}
