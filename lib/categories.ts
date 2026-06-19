// 클라이언트/서버 공용 상수 (fs 미사용)
export type Category =
  | "React"
  | "Next.js"
  | "웹 성능"
  | "개발 일반"
  | "회고"
  | "일상"
  | "독서";

export const CATEGORIES: Category[] = [
  "React",
  "Next.js",
  "웹 성능",
  "개발 일반",
  "회고",
  "일상",
  "독서",
];

export const CATEGORY_GROUPS: Record<string, Category[]> = {
  개발: ["React", "Next.js", "웹 성능", "개발 일반"],
  개인: ["일상", "회고", "독서"],
};

export const CATEGORY_LABELS: Record<Category, { ko: string; en: string }> = {
  "React":     { ko: "React",    en: "React" },
  "Next.js":   { ko: "Next.js",  en: "Next.js" },
  "웹 성능":   { ko: "웹 성능",  en: "Web Performance" },
  "개발 일반": { ko: "개발 일반", en: "General Dev" },
  "회고":      { ko: "회고",     en: "Retrospective" },
  "일상":      { ko: "일상",     en: "Life" },
  "독서":      { ko: "독서",     en: "Reading" },
};

export const CATEGORY_GROUP_LABELS: Record<string, { ko: string; en: string }> = {
  개발: { ko: "개발", en: "Dev" },
  개인: { ko: "개인", en: "Personal" },
};

export function getCategoryLabel(cat: Category, lang: string): string {
  return lang === "ko" ? CATEGORY_LABELS[cat].ko : CATEGORY_LABELS[cat].en;
}

export function getGroupLabel(group: string, lang: string): string {
  return lang === "ko"
    ? (CATEGORY_GROUP_LABELS[group]?.ko ?? group)
    : (CATEGORY_GROUP_LABELS[group]?.en ?? group);
}
