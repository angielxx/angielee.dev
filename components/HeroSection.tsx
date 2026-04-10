"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

const isDev = process.env.NODE_ENV !== "production";

export default function HeroSection() {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-6xl mx-auto px-4 pt-24 pb-20"
    >
      <motion.p
        variants={item}
        className="text-sm font-medium text-brand-600 tracking-wide mb-4"
      >
        프론트엔드 개발자
      </motion.p>

      <motion.h1
        variants={item}
        className="text-4xl sm:text-5xl font-bold text-[var(--fg)] leading-tight mb-6"
      >
        More than{" "}
        <span className="text-brand-600">Better</span>
      </motion.h1>

      <motion.p
        variants={item}
        className="text-lg text-[var(--muted)] max-w-xl leading-relaxed mb-10"
      >
        더 나은 코드, 더 나은 경험, 더 나은 사람을 향해 나아가는 이야기를 씁니다.
        프론트엔드 개발과 일상의 기록을 담은 공간입니다.
      </motion.p>

      <motion.div variants={item} className="flex flex-wrap gap-3">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 transition-colors"
        >
          글 읽기
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
        {isDev && (
          <Link
            href="/about"
            className="inline-flex items-center px-5 py-2.5 rounded-full border border-[var(--border)] text-sm font-medium text-[var(--muted)] hover:border-brand-500 hover:text-brand-600 transition-colors"
          >
            소개
          </Link>
        )}
      </motion.div>
    </motion.section>
  );
}
