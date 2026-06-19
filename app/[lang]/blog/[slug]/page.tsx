import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { getAllSlugs, getPostBySlug, getSeriesPosts } from "@/lib/posts";
import { SUPPORTED_LANGS, type Lang } from "@/lib/i18n";
import { SITE_URL, AUTHOR_NAME } from "@/lib/site";
import { extractToc } from "@/lib/toc";
import TagBadge from "@/components/TagBadge";
import SeriesNav from "@/components/SeriesNav";
import TOC from "@/components/TOC";
import PostStickyHeader from "@/components/PostStickyHeader";
import Comments from "@/components/Comments";
import CodeBlock from "@/components/CodeBlock";
import ViewTracker from "@/components/ViewTracker";

interface Props {
  params: Promise<{ lang: Lang; slug: string }>;
}

export function generateStaticParams() {
  return SUPPORTED_LANGS.flatMap((lang) =>
    getAllSlugs(lang).map((slug) => ({ lang, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  try {
    const post = getPostBySlug(slug, lang);
    return {
      title: post.title,
      description: post.description,
      alternates: {
        canonical: `${SITE_URL}/${lang}/blog/${slug}`,
      },
      openGraph: {
        title: post.title,
        description: post.description,
        type: "article",
        publishedTime: post.date,
        url: `${SITE_URL}/${lang}/blog/${slug}`,
        ...(post.thumbnail && { images: [{ url: post.thumbnail }] }),
      },
    };
  } catch {
    return { title: "Not Found" };
  }
}

const mdxOptions = {
  options: {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
      ] as never,
    },
  },
  components: { pre: CodeBlock },
};

export default async function BlogPostPage({ params }: Props) {
  const { lang, slug } = await params;

  let post;
  try {
    post = getPostBySlug(slug, lang);
  } catch {
    notFound();
  }

  const toc = extractToc(post.content);
  const seriesPosts = post.series ? getSeriesPosts(post.series, lang) : [];

  const locale = lang === "ko" ? "ko-KR" : "en-US";
  const formattedDate = new Date(post.date).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const readingTimeLabel = lang === "ko" ? "분 읽기" : "min read";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url: `${SITE_URL}/${lang}/blog/${post.slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/${lang}/blog/${post.slug}`,
    },
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: lang === "ko" ? "ko" : "en",
    author: {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: AUTHOR_NAME,
    },
    publisher: {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: AUTHOR_NAME,
    },
    ...(post.thumbnail && { image: post.thumbnail }),
  };

  return (
    <>
      <ViewTracker slug={slug} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PostStickyHeader
        title={post.title}
        category={post.category}
        readingTime={post.readingTime}
        readingTimeLabel={readingTimeLabel}
        toc={toc}
      />

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* 포스트 헤더 */}
        <header className="mb-10 max-w-3xl">
          {post.series && (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-brand-600 bg-brand-50 border border-brand-200 rounded-full px-2.5 py-0.5 mb-4">
              {post.series}
              {post.seriesOrder && (
                <span className="opacity-70">#{post.seriesOrder}</span>
              )}
            </span>
          )}

          <h1 className="text-3xl font-bold text-[var(--fg)] leading-tight mb-4">
            {post.title}
          </h1>

          <p className="text-[var(--muted)] text-base mb-6">{post.description}</p>

          <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--muted)] mb-4">
            <span className="font-medium text-brand-600">{post.category}</span>
            <span>·</span>
            <span>
              {post.readingTime}
              {readingTimeLabel}
            </span>
            <span>·</span>
            <time dateTime={post.date}>{formattedDate}</time>
          </div>

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <TagBadge key={tag} tag={tag} clickable lang={lang} />
              ))}
            </div>
          )}

          {/* 이 div가 뷰포트 밖으로 나가면 컴팩트 헤더가 표시됨 */}
          <div id="post-header-sentinel" />
        </header>

        {/* 시리즈 네비게이션 */}
        {post.series && seriesPosts.length > 1 && (
          <div className="max-w-3xl mb-10">
            <SeriesNav
              currentSlug={post.slug}
              seriesName={post.series}
              posts={seriesPosts}
              lang={lang}
            />
          </div>
        )}

        {/* 콘텐츠 + TOC 그리드 */}
        <div className="lg:grid lg:grid-cols-[1fr_240px] lg:gap-12">
          {/* MDX 본문 + 댓글 */}
          <div className="min-w-0 lg:self-start">
            <article className="prose prose-neutral dark:prose-invert max-w-none">
              <MDXRemote source={post.content} {...mdxOptions} />
            </article>
            <Comments lang={lang} slug={slug} />
          </div>

          {/* TOC 사이드바 (lg 이상) */}
          {toc.length > 0 && (
            <aside className="hidden lg:block">
              <div className="sticky top-[7.5rem]">
                <TOC items={toc} />
              </div>
            </aside>
          )}
        </div>
      </div>
    </>
  );
}
