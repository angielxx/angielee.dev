import Link from "next/link";
import { getAllPosts, getPostBySlug, getFeaturedPosts } from "@/lib/posts";
import { getTopSlugs } from "@/lib/redis";
import HeroSection from "@/components/HeroSection";
import PostCard from "@/components/PostCard";
import type { Lang } from "@/lib/i18n";

export const revalidate = 3600;

interface Props {
  params: Promise<{ lang: Lang }>;
}

export default async function Home({ params }: Props) {
  const { lang } = await params;
  const topSlugs = await getTopSlugs(3);
  const hasViewData = topSlugs.length > 0;
  const featuredPosts = hasViewData
    ? topSlugs
        .map((slug) => { try { return getPostBySlug(slug, lang); } catch { return null; } })
        .filter((p) => p !== null)
    : getFeaturedPosts(lang);
  const latestPosts = getAllPosts(lang).slice(0, 3);

  const t =
    lang === "ko"
      ? { popular: hasViewData ? "인기 글" : "추천 글", latest: "최신 글", viewAll: "전체 보기" }
      : { popular: hasViewData ? "Popular" : "Featured", latest: "Latest", viewAll: "View All" };

  return (
    <>
      <HeroSection />

      {/* 인기 글 / Popular */}
      {featuredPosts.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-[var(--fg)] flex items-center gap-2">
              <span className="text-brand-accent">✦</span>
              {t.popular}
            </h2>
            <Link
              href={`/${lang}/blog`}
              className="text-sm text-brand-600 hover:underline flex items-center gap-1"
            >
              {t.viewAll}
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <PostCard key={post.slug} post={post} lang={lang} />
            ))}
          </div>
        </section>
      )}

      {/* 섹션 구분선 */}
      {featuredPosts.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 pb-16">
          <hr className="border-[var(--border)]" />
        </div>
      )}

      {/* 최신 글 / Latest */}
      {latestPosts.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pb-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-[var(--fg)] flex items-center gap-2">
              <span className="text-brand-accent">✦</span>
              {t.latest}
            </h2>
            <Link
              href={`/${lang}/blog`}
              className="text-sm text-brand-600 hover:underline flex items-center gap-1"
            >
              {t.viewAll}
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <PostCard key={post.slug} post={post} lang={lang} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
