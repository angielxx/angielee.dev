"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { TocItem } from "@/lib/toc";

interface Props {
  title: string;
  category: string;
  readingTime: number;
  readingTimeLabel: string;
  toc: TocItem[];
}

export default function PostStickyHeader({ title, category, readingTime, readingTimeLabel, toc }: Props) {
  const [visible, setVisible] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const tocLabel = "Contents";

  useEffect(() => {
    const sentinel = document.getElementById("post-header-sentinel");
    if (!sentinel) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
        if (entry.isIntersecting) setTocOpen(false);
      },
      { threshold: 0 }
    );
    obs.observe(sentinel);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const update = () => {
      const article = document.querySelector("article");
      if (!article) return;
      const { top, height } = article.getBoundingClientRect();
      const scrolled = Math.max(0, -top);
      const total = height - window.innerHeight;
      setProgress(total > 0 ? Math.min(1, scrolled / total) : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  if (!visible) return null;

  return (
    <div id="post-sticky-bar" className="fixed top-16 left-0 right-0 z-40">
      {/* 컴팩트 헤더 */}
      <div className="backdrop-blur-md bg-[var(--ds-header-bg)] border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-4 h-11 flex items-center justify-between gap-3">
          {/* 왼쪽: 카테고리 + 제목 */}
          <div className="flex items-center gap-2 min-w-0">
            <span className="shrink-0 text-xs font-semibold text-brand-600">{category}</span>
            <span className="shrink-0 text-[var(--muted)] text-xs opacity-50">·</span>
            <p className="text-sm font-medium text-[var(--fg)] truncate">{title}</p>
          </div>

          {/* 오른쪽 (데스크탑): 읽기 시간 */}
          <div className="hidden lg:flex items-center shrink-0 text-xs text-[var(--muted)]">
            <span>{readingTime}{readingTimeLabel}</span>
          </div>

          {/* 오른쪽 (모바일): 목차 버튼 */}
          {toc.length > 0 && (
            <button
              onClick={() => setTocOpen((v) => !v)}
              className="lg:hidden shrink-0 flex items-center gap-1.5 text-xs text-[var(--muted)] hover:text-[var(--fg)] transition-colors"
              aria-label={tocOpen ? `${tocLabel} 닫기` : `${tocLabel} 열기`}
              aria-expanded={tocOpen}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h10M4 18h7" />
              </svg>
              {tocLabel}
            </button>
          )}
        </div>

        {/* 진행 바 */}
        <div className="h-0.5 bg-[var(--border)]">
          <div
            className="h-full bg-brand-600 transition-[width] duration-75 ease-out"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      {/* 모바일 목차 드롭다운 */}
      <AnimatePresence>
        {tocOpen && (
          <motion.div
            key="mobile-toc-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden backdrop-blur-md bg-[var(--ds-header-bg)] border-b border-[var(--border)]"
          >
            <nav aria-label={tocLabel} className="max-w-6xl mx-auto px-4 py-3">
              <ul className="flex flex-col gap-0.5 max-h-64 overflow-y-auto">
                {toc.map((item) => (
                  <li
                    key={item.id}
                    style={{ paddingLeft: item.level === 1 ? 0 : item.level === 2 ? 10 : 20 }}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        const el = document.getElementById(item.id);
                        if (el) {
                          const bar = document.getElementById("post-sticky-bar");
                          const offset = (bar?.getBoundingClientRect().bottom ?? 64) + 8;
                          const top = el.getBoundingClientRect().top + window.scrollY - offset;
                          window.scrollTo({ top, behavior: "smooth" });
                          history.pushState(null, "", `#${item.id}`);
                        }
                        setTocOpen(false);
                      }}
                      className="block text-xs py-1 text-[var(--muted)] hover:text-[var(--fg)] transition-colors"
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
