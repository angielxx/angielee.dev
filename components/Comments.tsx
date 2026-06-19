"use client";

import { useEffect, useRef } from "react";

// Giscus 설정값을 환경변수로 주입합니다.
// .env.local에 아래 변수를 설정하세요:
//   NEXT_PUBLIC_GISCUS_REPO=owner/repo
//   NEXT_PUBLIC_GISCUS_REPO_ID=R_...
//   NEXT_PUBLIC_GISCUS_CATEGORY=Comments
//   NEXT_PUBLIC_GISCUS_CATEGORY_ID=DIC_...
//
// 설정값은 https://giscus.app 에서 발급받을 수 있습니다.
// (레포에서 Settings → Discussions 활성화 후 giscus.app 방문)

interface CommentsProps {
  lang: string;
  slug: string;
}

export default function Comments({ lang, slug }: CommentsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const repo = process.env.NEXT_PUBLIC_GISCUS_REPO;
    const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
    if (!repo || !repoId) return;

    const getTheme = () =>
      document.documentElement.classList.contains("dark") ? "dark" : "light";

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", repo);
    script.setAttribute("data-repo-id", repoId);
    script.setAttribute("data-category", process.env.NEXT_PUBLIC_GISCUS_CATEGORY || "Ideas");
    script.setAttribute("data-category-id", process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || "");
    script.setAttribute("data-mapping", "specific");
    script.setAttribute("data-term", slug);
    script.setAttribute("data-strict", "1");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", getTheme());
    script.setAttribute("data-lang", lang === "ko" ? "ko" : "en");
    script.crossOrigin = "anonymous";
    script.async = true;

    container.appendChild(script);

    const observer = new MutationObserver(() => {
      const iframe = document.querySelector<HTMLIFrameElement>("iframe.giscus-frame");
      iframe?.contentWindow?.postMessage(
        { giscus: { setConfig: { theme: getTheme() } } },
        "https://giscus.app"
      );
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      container.innerHTML = "";
      observer.disconnect();
    };
  }, [lang, slug]);

  return (
    <div className="mt-16 pt-12 border-t border-[var(--border)]">
      <div ref={containerRef} className="giscus" />
    </div>
  );
}
