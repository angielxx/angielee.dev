"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getLangFromPathname, type Lang } from "@/lib/i18n";

export default function LangToggle() {
  const pathname = usePathname();
  const lang: Lang = getLangFromPathname(pathname);
  const otherLang: Lang = lang === "ko" ? "en" : "ko";

  const otherLangPath = (() => {
    const segs = pathname.split("/");
    segs[1] = otherLang;
    return segs.join("/") || `/${otherLang}`;
  })();

  return (
    <Link
      href={otherLangPath}
      className="flex items-center px-2.5 py-1 rounded-full border border-[var(--border)] text-xs font-bold text-brand-text-sub hover:text-brand-accent hover:border-brand-accent transition-colors"
    >
      {otherLang.toUpperCase()}
    </Link>
  );
}
