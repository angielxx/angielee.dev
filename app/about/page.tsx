import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "프론트엔드 개발자 angielee 소개",
};

const SKILLS = [
  { group: "언어", items: ["TypeScript", "JavaScript"] },
  { group: "프레임워크", items: ["React", "Next.js"] },
  { group: "스타일링", items: ["Tailwind CSS", "CSS/SCSS"] },
  { group: "도구", items: ["Git", "Figma", "Vercel"] },
];

const TIMELINE = [
  {
    period: "2024 –",
    title: "프론트엔드 개발자",
    desc: "사용자 경험을 최우선으로 생각하는 프론트엔드 개발",
  },
  {
    period: "– 2023",
    title: "영상 디자인 · 모션 그래픽",
    desc: "영상 제작 및 모션 그래픽 경력 — 인터랙티브 UI 모션에 대한 감각을 키움",
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      {/* 소개 */}
      <section className="mb-16">
        <h1 className="text-3xl font-bold text-[var(--fg)] mb-6">About</h1>
        <p className="text-[var(--muted)] leading-relaxed text-base mb-4">
          안녕하세요, 프론트엔드 개발자 <span className="font-medium text-[var(--fg)]">angielee</span>입니다.
        </p>
        <p className="text-[var(--muted)] leading-relaxed text-base mb-4">
          영상 디자인과 모션 그래픽 경험을 바탕으로, 움직임이 살아있는 UI를 만드는 것을 좋아합니다.
          사용자가 자연스럽게 인터랙션할 수 있는 인터페이스, 읽기 좋은 코드를 지향합니다.
        </p>
        <p className="text-[var(--muted)] leading-relaxed text-base">
          이 블로그는 개발하며 배운 것들, 회고, 일상의 기록을 담는 공간입니다.
        </p>
      </section>

      {/* 기술 스택 */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-[var(--fg)] mb-6">기술 스택</h2>
        <div className="flex flex-col gap-5">
          {SKILLS.map(({ group, items }) => (
            <div key={group} className="flex gap-4 items-start">
              <span className="text-sm text-[var(--muted)] w-20 shrink-0 pt-0.5">{group}</span>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full text-sm border border-[var(--border)] text-[var(--fg)] hover:border-brand-500 hover:text-brand-600 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 타임라인 */}
      <section>
        <h2 className="text-xl font-bold text-[var(--fg)] mb-6">경력</h2>
        <div className="flex flex-col gap-0">
          {TIMELINE.map(({ period, title, desc }, i) => (
            <div key={i} className="flex gap-6 group">
              {/* 타임라인 선 */}
              <div className="flex flex-col items-center">
                <div className="w-2 h-2 rounded-full bg-brand-500 mt-1.5 shrink-0" />
                {i < TIMELINE.length - 1 && (
                  <div className="w-px flex-1 bg-[var(--border)] my-1" />
                )}
              </div>
              {/* 내용 */}
              <div className="pb-8">
                <p className="text-xs text-brand-600 font-medium mb-1">{period}</p>
                <p className="text-base font-semibold text-[var(--fg)] mb-1">{title}</p>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
