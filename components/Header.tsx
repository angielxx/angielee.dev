"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORY_GROUPS } from "@/lib/categories";
import ThemeToggle from "@/components/ThemeToggle";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full backdrop-blur-md bg-brand-bg/80 border-b border-white/10"
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* 워드마크 */}
        <Link
          href="/"
          className="text-base font-bold tracking-tight shrink-0 logo-shimmer transition-all duration-300 text-brand-text-main"
        >
          Angie<span className="text-brand-accent">.Lee</span>
        </Link>

        {/* 데스크탑 네비게이션 */}
        <nav className="hidden lg:flex items-center gap-6 text-sm">
          {/* 블로그 드롭다운 */}
          <div className="relative group">
            <button
              className={[
                "flex items-center gap-1 py-1 transition-colors",
                isActive("/blog")
                  ? "text-brand-accent font-medium"
                  : "text-brand-text-sub hover:text-brand-text-main",
              ].join(" ")}
            >
              블로그
              <svg
                className="w-3 h-3 transition-transform group-hover:rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* 드롭다운 메뉴 */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
              <div className="bg-brand-surface border border-white/10 rounded-xl shadow-lg p-2 min-w-[140px]">
                <Link
                  href="/blog"
                  className="block px-3 py-1.5 rounded-lg text-sm text-brand-text-sub hover:bg-white/5 hover:text-brand-text-main transition-colors"
                >
                  전체 글
                </Link>
                <div className="my-1 border-t border-white/10" />
                {Object.entries(CATEGORY_GROUPS).map(([group, categories]) => (
                  <div key={group}>
                    <p className="px-3 pt-2 pb-1 text-[11px] font-bold text-brand-text-sub opacity-50 uppercase tracking-widest">
                      {group}
                    </p>
                    {categories.map((cat) => (
                      <Link
                        key={cat}
                        href={`/blog?category=${encodeURIComponent(cat)}`}
                        className="block px-3 py-1.5 rounded-lg text-sm text-brand-text-main opacity-80 hover:bg-white/5 hover:opacity-100 hover:text-brand-accent transition-colors"
                      >
                        {cat}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={[
                "relative py-1 transition-colors group",
                isActive(href)
                  ? "text-brand-accent font-medium"
                  : "text-brand-text-sub hover:text-brand-text-main",
              ].join(" ")}
            >
              {label}
              <span
                className={[
                  "absolute bottom-0 left-0 h-px bg-brand-accent transition-all duration-200 origin-left",
                  isActive(href) ? "w-full" : "w-0 group-hover:w-full",
                ].join(" ")}
              />
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        {/* 모바일: 테마 토글 + 햄버거 버튼 */}
        <div className="lg:hidden flex items-center gap-1">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
            className="p-2 -mr-2 text-brand-text-sub hover:text-brand-text-main transition-colors"
          >
            <span className="sr-only">{menuOpen ? "닫기" : "메뉴"}</span>
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={["block h-px bg-current transition-all duration-200 origin-center", menuOpen ? "rotate-45 translate-y-[7px]" : ""].join(" ")} />
              <span className={["block h-px bg-current transition-all duration-200", menuOpen ? "opacity-0" : ""].join(" ")} />
              <span className={["block h-px bg-current transition-all duration-200 origin-center", menuOpen ? "-rotate-45 -translate-y-[9px]" : ""].join(" ")} />
            </div>
          </button>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden border-t border-white/10 bg-brand-bg/95"
          >
            <nav className="px-4 py-4 flex flex-col gap-1 text-sm">
              <Link
                href="/blog"
                onClick={() => setMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-brand-text-sub hover:bg-white/5 hover:text-brand-text-main transition-colors"
              >
                전체 글
              </Link>

              {Object.entries(CATEGORY_GROUPS).map(([group, categories]) => (
                <div key={group}>
                  <p className="px-3 pt-3 pb-1 text-[11px] font-bold text-brand-text-sub opacity-50 uppercase tracking-widest mt-1">
                    {group}
                  </p>
                  {categories.map((cat) => (
                    <Link
                      key={cat}
                      href={`/blog?category=${encodeURIComponent(cat)}`}
                      onClick={() => setMenuOpen(false)}
                      className="block px-3 py-2.5 rounded-lg text-brand-text-main opacity-80 hover:bg-white/5 hover:opacity-100 hover:text-brand-accent transition-colors"
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              ))}

              <div className="my-2 border-t border-white/10" />

              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={[
                    "px-3 py-2.5 rounded-lg transition-colors",
                    isActive(href)
                      ? "text-brand-accent font-medium bg-white/5"
                      : "text-brand-text-sub hover:bg-white/5 hover:text-brand-text-main",
                  ].join(" ")}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
