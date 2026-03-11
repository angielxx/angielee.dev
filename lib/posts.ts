import fs from "fs";
import path from "path";
import matter from "gray-matter";
export type { Category } from "@/lib/categories";
export { CATEGORIES, CATEGORY_GROUPS } from "@/lib/categories";
import type { Category } from "@/lib/categories";

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
}

export interface Post extends PostMeta {
  content: string;
}

// ── 상수 ─────────────────────────────────────────

const POSTS_DIR = path.join(process.cwd(), "posts");
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

export function getAllSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getPostBySlug(slug: string): Post {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
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
  };
}

export function getAllPosts(): Post[] {
  return getAllSlugs()
    .map(getPostBySlug)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostsByCategory(category: Category): Post[] {
  return getAllPosts().filter((p) => p.category === category);
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((p) => p.tags.includes(tag));
}

export function getSeriesPosts(seriesName: string): Post[] {
  return getAllPosts()
    .filter((p) => p.series === seriesName)
    .sort((a, b) => (a.seriesOrder ?? 0) - (b.seriesOrder ?? 0));
}

export function getAllTags(): string[] {
  const tags = getAllPosts().flatMap((p) => p.tags);
  return [...new Set(tags)].sort();
}
