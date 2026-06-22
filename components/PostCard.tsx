"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Post } from "@/lib/posts";
import { getCategoryLabel } from "@/lib/categories";
import TagBadge from "./TagBadge";

interface PostCardProps {
  post: Post;
  lang: string;
}

export default function PostCard({ post, lang }: PostCardProps) {
  const {
    slug, title, date, description, category,
    tags, thumbnail, series, seriesOrder, readingTime,
  } = post;

  const formattedDate = new Date(date).toLocaleDateString(
    lang === "ko" ? "ko-KR" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  const readingTimeLabel = lang === "ko" ? "분 읽기" : "min read";

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="rounded-xl border border-[var(--border)] bg-[var(--ds-surface)] overflow-hidden group
                 hover:[box-shadow:4px_4px_0px_0px_var(--ds-accent)] transition-[transform] duration-200"
    >
      <Link href={`/${lang}/blog/${slug}`} className="block h-full">
        {/* 썸네일 */}
        {thumbnail && (
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        <div className={`p-5 flex flex-col gap-3 h-full ${!thumbnail ? "border-l-2 border-brand-accent" : ""}`}>
          {/* 시리즈 배지 */}
          {series && (
            <span className="inline-flex items-center gap-1 text-xs font-bold bg-[var(--fg)]/10 text-brand-text-sub border border-[var(--border)] rounded-full px-2.5 py-0.5 w-fit">
              {series}
              {seriesOrder && <span className="opacity-70">#{seriesOrder}</span>}
            </span>
          )}

          {/* 카테고리 배지: 사이버 시안 네오브루탈 + ring pulse */}
          <span className="relative inline-flex w-fit">
            <span className="inline-flex items-center text-xs font-bold bg-brand-accent text-black px-2.5 py-0.5 rounded-full">
              {getCategoryLabel(category, lang)}
            </span>
            <span className="absolute inset-0 rounded-full border-2 border-[var(--ds-accent)] group-hover:animate-ring-pulse" />
          </span>

          {/* 제목 + 설명 */}
          <div className="flex-1">
            <h2 className="text-base font-semibold text-brand-text-main group-hover:text-brand-accent transition-colors line-clamp-2 mb-1">
              {title}
            </h2>
            <p className="text-sm text-brand-text-sub line-clamp-2">{description}</p>
          </div>

          {/* 태그 */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <TagBadge key={tag} tag={tag} lang={lang} />
              ))}
            </div>
          )}

          {/* 메타 정보 */}
          <div className="flex items-center gap-2 text-xs text-brand-text-sub">
            <span>{readingTime}{readingTimeLabel}</span>
            <span>·</span>
            <time dateTime={date}>{formattedDate}</time>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
