import { Suspense } from "react";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { CATEGORIES } from "@/lib/categories";
import type { Category } from "@/lib/categories";
import PostCard from "@/components/PostCard";
import CategoryFilter from "@/components/CategoryFilter";

export const metadata: Metadata = {
  title: "블로그",
  description: "프론트엔드, 회고, 일상, 독서에 관한 글들",
};

interface BlogPageProps {
  searchParams: Promise<{ category?: string; tag?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { category, tag } = await searchParams;

  const allPosts = getAllPosts();

  const filtered = allPosts.filter((post) => {
    if (category && post.category !== category) return false;
    if (tag && !post.tags.includes(tag)) return false;
    return true;
  });

  const heading = tag
    ? `#${tag}`
    : category
    ? category
    : "전체 글";

  const count = filtered.length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--fg)] mb-1">{heading}</h1>
        <p className="text-sm text-[var(--muted)]">글 {count}편</p>
      </div>

      {/* 카테고리 필터 */}
      <div className="mb-8">
        <Suspense>
          <CategoryFilter
            categories={CATEGORIES}
            activeCategory={category}
            activeTag={tag}
          />
        </Suspense>
      </div>

      {/* 태그 필터 표시 */}
      {tag && (
        <div className="mb-6 flex items-center gap-2 text-sm text-[var(--muted)]">
          <span>태그 필터:</span>
          <span className="px-2.5 py-0.5 rounded-full bg-[var(--tag-bg)] text-[var(--tag-text)] border border-brand-200 font-medium">
            #{tag}
          </span>
          <a href="/blog" className="text-brand-600 hover:underline">
            지우기
          </a>
        </div>
      )}

      {/* 포스트 그리드 */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center text-[var(--muted)]">
          <p className="text-lg">아직 글이 없습니다.</p>
        </div>
      )}
    </div>
  );
}
