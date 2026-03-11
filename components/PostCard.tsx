"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Post } from "@/lib/posts";
import TagBadge from "./TagBadge";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const { slug, title, date, description, category, tags, thumbnail, series, seriesOrder, readingTime } = post;

  const formattedDate = new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -4 }}
    >
      <Link href={`/blog/${slug}`} className="block group h-full">
        {thumbnail ? (
          /* 썸네일 있는 레이아웃 */
          <div className="rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--bg)] h-full flex flex-col">
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={thumbnail}
                alt={title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="p-5 flex flex-col gap-3 flex-1">
              <CardBody
                series={series}
                seriesOrder={seriesOrder}
                title={title}
                description={description}
                category={category}
                readingTime={readingTime}
                formattedDate={formattedDate}
                tags={tags}
              />
            </div>
          </div>
        ) : (
          /* 썸네일 없는 레이아웃: 좌측 accent */
          <div className="rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--bg)] h-full flex">
            <div className="w-1 shrink-0 bg-brand-500 rounded-l-2xl" />
            <div className="p-5 flex flex-col gap-3 flex-1">
              <CardBody
                series={series}
                seriesOrder={seriesOrder}
                title={title}
                description={description}
                category={category}
                readingTime={readingTime}
                formattedDate={formattedDate}
                tags={tags}
              />
            </div>
          </div>
        )}
      </Link>
    </motion.article>
  );
}

interface CardBodyProps {
  series?: string;
  seriesOrder?: number;
  title: string;
  description: string;
  category: string;
  readingTime: number;
  formattedDate: string;
  tags: string[];
}

function CardBody({ series, seriesOrder, title, description, category, readingTime, formattedDate, tags }: CardBodyProps) {
  return (
    <>
      {/* 시리즈 배지 */}
      {series && (
        <span className="inline-flex items-center gap-1 text-xs font-medium text-brand-600 bg-brand-50 border border-brand-200 rounded-full px-2.5 py-0.5 w-fit">
          {series}
          {seriesOrder && <span className="opacity-70">#{seriesOrder}</span>}
        </span>
      )}

      {/* 제목 + 설명 */}
      <div className="flex-1">
        <h2 className="text-base font-semibold text-[var(--fg)] group-hover:text-brand-600 transition-colors line-clamp-2 mb-1">
          {title}
        </h2>
        <p className="text-sm text-[var(--muted)] line-clamp-2">{description}</p>
      </div>

      {/* 태그 */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      )}

      {/* 메타 정보 */}
      <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
        <span className="font-medium text-brand-600">{category}</span>
        <span>·</span>
        <span>{readingTime}분 읽기</span>
        <span>·</span>
        <time>{formattedDate}</time>
      </div>
    </>
  );
}
