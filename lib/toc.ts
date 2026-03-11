import GithubSlugger from "github-slugger";

// ── 타입 ─────────────────────────────────────────

export interface TocItem {
  id: string;
  text: string;
  level: 1 | 2 | 3;
}

// ── 헤딩 추출 ─────────────────────────────────────
// rehype-slug와 동일하게 github-slugger를 사용해 id 생성
// → 한국어 헤딩 id가 TOC 앵커와 정확히 일치

export function extractToc(content: string): TocItem[] {
  const slugger = new GithubSlugger();
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const toc: TocItem[] = [];
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length as 1 | 2 | 3;
    const text = match[2].trim();
    toc.push({ id: slugger.slug(text), text, level });
  }

  return toc;
}
