"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import type { Category } from "@/lib/categories";

interface CategoryFilterProps {
  categories: Category[];
  activeCategory?: string;
  activeTag?: string;
}

export default function CategoryFilter({ categories, activeCategory, activeTag }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryClick = (category: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    // 카테고리 변경 시 태그 필터 유지
    router.push(`/blog?${params.toString()}`);
  };

  const allActive = !activeCategory && !activeTag;

  return (
    <div className="flex flex-wrap gap-2">
      {/* 전체 버튼 */}
      <motion.button
        layout
        onClick={() => handleCategoryClick(null)}
        className={[
          "px-4 py-1.5 rounded-full text-sm font-medium transition-colors",
          allActive
            ? "bg-brand-600 text-white"
            : "border border-[var(--border)] text-[var(--muted)] hover:border-brand-500 hover:text-brand-600",
        ].join(" ")}
      >
        전체
      </motion.button>

      {categories.map((cat) => {
        const isActive = activeCategory === cat;
        return (
          <motion.button
            key={cat}
            layout
            onClick={() => handleCategoryClick(cat)}
            className={[
              "px-4 py-1.5 rounded-full text-sm font-medium transition-colors",
              isActive
                ? "bg-brand-600 text-white"
                : "border border-[var(--border)] text-[var(--muted)] hover:border-brand-500 hover:text-brand-600",
            ].join(" ")}
          >
            {cat}
          </motion.button>
        );
      })}
    </div>
  );
}
