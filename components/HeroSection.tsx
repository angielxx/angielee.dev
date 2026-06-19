"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, type Variants } from "framer-motion";
import { AUTHOR_EMAIL } from "@/lib/site";
import { getLangFromPathname } from "@/lib/i18n";

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

interface UnderlineProps {
  drawDelay: number;
  shimmerDelay: number;
}

function AnimatedUnderline({ drawDelay, shimmerDelay }: UnderlineProps) {
  return (
    <>
      {/* 글로우 레이어 — 블러 처리된 두꺼운 레이어 */}
      <motion.span
        className="absolute left-0 w-full rounded-full"
        style={{
          bottom: "0.04em",
          height: "8px",
          background: "var(--brand-500)",
          filter: "blur(5px)",
          opacity: 0.55,
          transformOrigin: "left",
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.55, delay: drawDelay, ease: [0.25, 0.1, 0.25, 1] }}
      />
      {/* 크리스프 레이어 — 선명한 얇은 선 */}
      <motion.span
        className="absolute left-0 w-full rounded-full bg-brand-600"
        style={{ bottom: "0.06em", height: "2.5px", transformOrigin: "left" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.55, delay: drawDelay, ease: [0.25, 0.1, 0.25, 1] }}
      />
      {/* 시머 레이어 — 흰빛이 좌→우로 흐름 */}
      <motion.span
        className="absolute rounded-full"
        style={{
          bottom: "0.06em",
          left: 0,
          width: "30%",
          height: "2.5px",
          background: "linear-gradient(to right, transparent, rgba(255,255,255,0.92), transparent)",
        }}
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: "350%", opacity: [0, 0.9, 0.9, 0] }}
        transition={{
          x: { duration: 0.75, delay: shimmerDelay, ease: "easeInOut" },
          opacity: { duration: 0.75, delay: shimmerDelay, times: [0, 0.1, 0.75, 1] },
        }}
      />
    </>
  );
}

export default function HeroSection() {
  const pathname = usePathname();
  const lang = getLangFromPathname(pathname);
  const isKo = lang === "ko";

  return (
    <motion.section
      variants={container}
      initial={false}
      animate="show"
      className="relative pt-28 pb-24 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.h1
          variants={item}
          className="text-6xl sm:text-8xl font-extrabold text-[var(--fg)] leading-[1.05] tracking-tight mb-6"
        >
          <span className="block">
            Still{" "}
            <span className="relative inline-block text-brand-600">
              exploring,
              <AnimatedUnderline drawDelay={0.55} shimmerDelay={1.15} />
            </span>
          </span>
          <span className="block">
            Still{" "}
            <span className="relative inline-block text-brand-600">
              building.
              <AnimatedUnderline drawDelay={0.75} shimmerDelay={1.35} />
            </span>
          </span>
        </motion.h1>

        <motion.h2
          variants={item}
          className="text-base sm:text-lg font-medium text-[var(--muted)] mb-6 tracking-widest uppercase"
        >
          {isKo ? "이은지" : "Angie Lee"} · Frontend Engineer
        </motion.h2>

        <motion.p
          variants={item}
          className="text-lg text-[var(--muted)] max-w-xl leading-relaxed mb-4"
        >
          {isKo
            ? "더 나은 코드, 더 나은 경험, 더 나은 사람을 향해 나아가는 이야기를 씁니다. 프론트엔드 개발과 일상의 기록을 담은 공간입니다."
            : "Stories of growing toward better code, better experiences, and a better self. A space documenting frontend development and everyday life."}
        </motion.p>

        <motion.p
          variants={item}
          className="text-sm text-[var(--muted)] mb-10"
        >
          {AUTHOR_EMAIL}
        </motion.p>

        <motion.div variants={item} className="flex flex-wrap gap-3">
          <Link
            href={`/${lang}/blog`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 transition-colors"
          >
            {isKo ? "글 읽기" : "Read Posts"}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            href={`/${lang}/about`}
            className="inline-flex items-center px-5 py-2.5 rounded-full border border-[var(--border)] text-sm font-medium text-[var(--muted)] hover:border-brand-500 hover:text-brand-600 transition-colors"
          >
            {isKo ? "소개" : "About"}
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
