import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { getAllSlugs, getPostBySlug, getSeriesPosts } from "@/lib/posts";
import { extractToc } from "@/lib/toc";
import TagBadge from "@/components/TagBadge";
import SeriesNav from "@/components/SeriesNav";
import TOC from "@/components/TOC";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = getPostBySlug(slug);
    return {
      title: post.title,
      description: post.description,
      openGraph: {
        title: post.title,
        description: post.description,
        type: "article",
        publishedTime: post.date,
        ...(post.thumbnail && { images: [{ url: post.thumbnail }] }),
      },
    };
  } catch {
    return { title: "Not Found" };
  }
}

const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "wrap" }],
    ] as never,
  },
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  const toc = extractToc(post.content);
  const seriesPosts = post.series ? getSeriesPosts(post.series) : [];

  const formattedDate = new Date(post.date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "angielee",
      url: "https://angielee.dev",
    },
    ...(post.thumbnail && { image: post.thumbnail }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* 포스트 헤더 */}
        <header className="mb-10 max-w-3xl">
          {post.series && (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-brand-600 bg-brand-50 border border-brand-200 rounded-full px-2.5 py-0.5 mb-4">
              {post.series}
              {post.seriesOrder && <span className="opacity-70">#{post.seriesOrder}</span>}
            </span>
          )}

          <h1 className="text-3xl font-bold text-[var(--fg)] leading-tight mb-4">
            {post.title}
          </h1>

          <p className="text-[var(--muted)] text-base mb-6">{post.description}</p>

          <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--muted)] mb-4">
            <span className="font-medium text-brand-600">{post.category}</span>
            <span>·</span>
            <span>{post.readingTime}분 읽기</span>
            <span>·</span>
            <time dateTime={post.date}>{formattedDate}</time>
          </div>

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <TagBadge key={tag} tag={tag} clickable />
              ))}
            </div>
          )}
        </header>

        {/* 시리즈 네비게이션 */}
        {post.series && seriesPosts.length > 1 && (
          <div className="max-w-3xl mb-10">
            <SeriesNav
              currentSlug={post.slug}
              seriesName={post.series}
              posts={seriesPosts}
            />
          </div>
        )}

        {/* 콘텐츠 + TOC 그리드 */}
        <div className="lg:grid lg:grid-cols-[1fr_240px] lg:gap-12 lg:items-start">
          {/* MDX 본문 */}
          <article className="prose prose-neutral dark:prose-invert max-w-none min-w-0">
            <MDXRemote source={post.content} {...mdxOptions} />
          </article>

          {/* TOC 사이드바 (lg 이상) */}
          {toc.length > 0 && (
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <TOC items={toc} />
              </div>
            </aside>
          )}
        </div>
      </div>
    </>
  );
}
