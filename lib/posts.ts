import fs from "fs";
import path from "path";
import matter from "gray-matter";
export type { Category } from "@/lib/categories";
export { CATEGORIES, CATEGORY_GROUPS } from "@/lib/categories";
import type { Category } from "@/lib/categories";
import type { Lang } from "@/lib/i18n";

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  category: Category;
  tags: string[];
  thumbnail?: string;
  series?: string;
  seriesOrder?: number;
  readingTime: number;
  featured?: boolean;
}

export interface Post extends PostMeta {
  content: string;
}

// ── 상수 ─────────────────────────────────────────

const getPostsDir = (lang: Lang) => path.join(process.cwd(), "posts", lang);
const KO_CHARS_PER_MIN = 500;

// ── 유틸 ─────────────────────────────────────────

export function calcReadingTime(content: string): number {
  const text = content
    .replace(/^---[\s\S]*?---/, "")
    .replace(/```[\s\S]*?```/gm, "")
    .replace(/[#*`\[\]()>_~]/g, "")
    .trim();
  return Math.max(1, Math.ceil(text.length / KO_CHARS_PER_MIN));
}

// ── 조회 함수 ─────────────────────────────────────

export function getAllSlugs(lang: Lang): string[] {
  const dir = getPostsDir(lang);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getPostBySlug(slug: string, lang: Lang): Post {
  const dir = getPostsDir(lang);
  const filePath = path.join(dir, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    content,
    title: data.title ?? "",
    date: data.date ?? "",
    description: data.description ?? "",
    category: data.category ?? "일상",
    tags: data.tags ?? [],
    thumbnail: data.thumbnail,
    series: data.series,
    seriesOrder: data.seriesOrder,
    readingTime: calcReadingTime(content),
    featured: data.featured ?? false,
  };
}

export function getAllPosts(lang: Lang): Post[] {
  return getAllSlugs(lang)
    .map((slug) => getPostBySlug(slug, lang))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getFeaturedPosts(lang: Lang): Post[] {
  return getAllPosts(lang).filter((p) => p.featured);
}

export function getPostsByCategory(category: Category, lang: Lang): Post[] {
  return getAllPosts(lang).filter((p) => p.category === category);
}

export function getPostsByTag(tag: string, lang: Lang): Post[] {
  return getAllPosts(lang).filter((p) => p.tags.includes(tag));
}

export function getSeriesPosts(seriesName: string, lang: Lang): Post[] {
  return getAllPosts(lang)
    .filter((p) => p.series === seriesName)
    .sort((a, b) => (a.seriesOrder ?? 0) - (b.seriesOrder ?? 0));
}

export function getAllTags(lang: Lang): string[] {
  const tags = getAllPosts(lang).flatMap((p) => p.tags);
  return [...new Set(tags)].sort();
}
