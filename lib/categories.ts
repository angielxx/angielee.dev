// 클라이언트/서버 공용 상수 (fs 미사용)
export type Category = "프론트엔드" | "회고" | "일상" | "독서";

export const CATEGORIES: Category[] = ["프론트엔드", "회고", "일상", "독서"];

export const CATEGORY_GROUPS: Record<string, Category[]> = {
  개발: ["프론트엔드", "회고"],
  개인: ["일상", "독서"],
};
