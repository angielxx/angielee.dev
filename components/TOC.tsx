"use client";

import { useEffect, useRef, useState } from "react";
import type { TocItem } from "@/lib/toc";

interface TOCProps {
  items: TocItem[];
}

function getScrollOffset(): number {
  const bar = document.getElementById("post-sticky-bar");
  return (bar?.getBoundingClientRect().bottom ?? 64) + 12;
}

export default function TOC({ items }: TOCProps) {
  const [activeId, setActiveId] = useState<string>("");
  const listRef = useRef<HTMLUListElement>(null);
  const tocLabel = "On this page";

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll<HTMLElement>("h1, h2, h3"));
    if (headings.length === 0) return;

    const update = () => {
      const offset = getScrollOffset();
      let currentId = headings[0].id;
      for (const el of headings) {
        if (el.getBoundingClientRect().top <= offset) {
          currentId = el.id;
        } else {
          break;
        }
      }
      setActiveId(currentId);
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  // TOC 목록 내에서 활성 항목이 보이도록 ul만 스크롤 (page scroll에 영향 없음)
  useEffect(() => {
    if (!activeId || !listRef.current) return;
    const ul = listRef.current;
    if (ul.scrollHeight <= ul.clientHeight) return;
    const activeEl = ul.querySelector<HTMLElement>(`[data-id="${activeId}"]`);
    if (!activeEl) return;
    const elTop = activeEl.offsetTop;
    const elBottom = elTop + activeEl.offsetHeight;
    if (elTop < ul.scrollTop) {
      ul.scrollTop = elTop;
    } else if (elBottom > ul.scrollTop + ul.clientHeight) {
      ul.scrollTop = elBottom - ul.clientHeight;
    }
  }, [activeId]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="목차">
      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-3">
        {tocLabel}
      </p>
      <ul ref={listRef} className="flex flex-col gap-1 max-h-[calc(100vh-14rem)] overflow-y-auto">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li
              key={item.id}
              data-id={item.id}
              style={{ paddingLeft: item.level === 1 ? 0 : item.level === 2 ? 8 : 16 }}
            >
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(item.id);
                  if (el) {
                    const offset = getScrollOffset();
                    const top = el.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({ top, behavior: "smooth" });
                    history.pushState(null, "", `#${item.id}`);
                  }
                  setActiveId(item.id);
                }}
                className={[
                  "block text-xs py-0.5 transition-colors duration-150 line-clamp-2",
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
