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
