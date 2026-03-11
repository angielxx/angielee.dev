"use client";

import { useEffect, useRef, useState } from "react";
import type { TocItem } from "@/lib/toc";

interface TOCProps {
  items: TocItem[];
}

export default function TOC({ items }: TOCProps) {
  const [activeId, setActiveId] = useState<string>("");
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    const headings = document.querySelectorAll("h1, h2, h3");
    headings.forEach((el) => observer.current?.observe(el));

    return () => observer.current?.disconnect();
  }, []);

  if (items.length === 0) return null;

  return (
    <nav aria-label="목차">
      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-3">
        목차
      </p>
      <ul className="flex flex-col gap-1">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li
              key={item.id}
              style={{ paddingLeft: item.level === 1 ? 0 : item.level === 2 ? 8 : 16 }}
            >
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(item.id);
                  if (el) {
                    const top = el.getBoundingClientRect().top + window.scrollY - 88;
                    window.scrollTo({ top, behavior: "smooth" });
                  }
                  setActiveId(item.id);
                }}
                className={[
                  "block text-xs py-0.5 transition-colors duration-200 line-clamp-2",
                  isActive
                    ? "text-brand-600 font-semibold"
                    : "text-[var(--muted)] hover:text-[var(--fg)]",
                ].join(" ")}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
