import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { CATEGORIES, getCategoryLabel, type Category } from "@/lib/categories";
import PostCard from "@/components/PostCard";
import CategoryFilter from "@/components/CategoryFilter";
import { SITE_URL } from "@/lib/site";
import type { Lang } from "@/lib/i18n";

interface Props {
  params: Promise<{ lang: Lang }>;
  searchParams: Promise<{ category?: string; tag?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const title = lang === "ko" ? "블로그" : "Blog";
  const description =
    lang === "ko"
      ? "프론트엔드, 회고, 일상, 독서에 관한 글들"
      : "Posts about frontend, retrospectives, daily life, and reading";
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/${lang}/blog` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${lang}/blog`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function BlogPage({ params, searchParams }: Props) {
  const { lang } = await params;
  const { category, tag } = await searchParams;

  const allPosts = getAllPosts(lang);

  const filtered = allPosts.filter((post) => {
    if (category && post.category !== category) return false;
    if (tag && !post.tags.includes(tag)) return false;
    return true;
  });

  const heading = tag
    ? `#${tag}`
    : category
    ? getCategoryLabel(category as Category, lang)
    : lang === "ko"
    ? "전체 글"
    : "All Posts";

  const count = filtered.length;
  const countLabel =
    lang === "ko" ? `글 ${count}편` : `${count} post${count !== 1 ? "s" : ""}`;
  const tagFilterLabel = lang === "ko" ? "태그 필터:" : "Tag filter:";
  const clearLabel = lang === "ko" ? "지우기" : "Clear";
  const emptyLabel =
    lang === "ko" ? "아직 글이 없습니다." : "No posts yet.";

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--fg)] mb-1">{heading}</h1>
        <p className="text-sm text-[var(--muted)]">{countLabel}</p>
      </div>

      {/* 카테고리 필터 */}
      <div className="mb-8">
        <Suspense>
          <CategoryFilter
            categories={CATEGORIES}
            activeCategory={category}
            activeTag={tag}
            lang={lang}
          />
        </Suspense>
      </div>

      {/* 태그 필터 표시 */}
      {tag && (
        <div className="mb-6 flex items-center gap-2 text-sm text-[var(--muted)]">
          <span>{tagFilterLabel}</span>
          <span className="px-2.5 py-0.5 rounded-full bg-[var(--tag-bg)] text-[var(--tag-text)] border border-brand-200 font-medium">
            #{tag}
          </span>
          <Link href={`/${lang}/blog`} className="text-brand-600 hover:underline">
            {clearLabel}
          </Link>
        </div>
      )}

      {/* 포스트 그리드 */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <PostCard key={post.slug} post={post} lang={lang} />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center text-[var(--muted)]">
          <p className="text-lg">{emptyLabel}</p>
        </div>
      )}
    </div>
  );
}
