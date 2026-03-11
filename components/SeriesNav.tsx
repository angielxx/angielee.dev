import Link from "next/link";
import type { Post } from "@/lib/posts";

interface SeriesNavProps {
  currentSlug: string;
  seriesName: string;
  posts: Post[];
}

export default function SeriesNav({ currentSlug, seriesName, posts }: SeriesNavProps) {
  const currentIndex = posts.findIndex((p) => p.slug === currentSlug);
  const total = posts.length;
  const current = currentIndex + 1;

  return (
    <aside className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] overflow-hidden">
      <div className="px-4 py-3 border-b border-[var(--border)] flex items-center justify-between">
        <p className="text-sm font-semibold text-[var(--fg)]">{seriesName}</p>
        <span className="text-xs text-[var(--muted)]">
          {current}/{total}
        </span>
      </div>
      <ol className="p-2 flex flex-col gap-0.5">
        {posts.map((post, idx) => {
          const isCurrent = post.slug === currentSlug;
          return (
            <li key={post.slug}>
              {isCurrent ? (
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-brand-50">
                  <span className="w-4 h-4 flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </span>
                  <span className="text-sm font-semibold text-brand-600 line-clamp-1">{post.title}</span>
                </div>
              ) : (
                <Link
                  href={`/blog/${post.slug}`}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[var(--border)] transition-colors group"
                >
                  <span className="w-4 h-4 flex items-center justify-center shrink-0 text-xs text-[var(--muted)] font-medium">
                    {idx + 1}
                  </span>
                  <span className="text-sm text-[var(--muted)] group-hover:text-[var(--fg)] transition-colors line-clamp-1">
                    {post.title}
                  </span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
