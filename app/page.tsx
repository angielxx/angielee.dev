import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import HeroSection from "@/components/HeroSection";
import PostCard from "@/components/PostCard";

export default function Home() {
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <>
      <HeroSection />

      {/* 최신 글 */}
      {latestPosts.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pb-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-[var(--fg)]">최근 글</h2>
            <Link
              href="/blog"
              className="text-sm text-brand-600 hover:underline flex items-center gap-1"
            >
              전체 보기
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
