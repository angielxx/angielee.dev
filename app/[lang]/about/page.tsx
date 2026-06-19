import type { Metadata } from "next";
import type { Lang } from "@/lib/i18n";

interface Props {
  params: Promise<{ lang: Lang }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: "About",
    description:
      lang === "ko"
        ? "프론트엔드 개발자 angielee 소개"
        : "About frontend developer angielee",
  };
}

const SKILLS = [
  { group: "언어", groupEn: "Languages", items: ["TypeScript", "JavaScript"] },
  { group: "프레임워크", groupEn: "Frameworks", items: ["React", "Next.js"] },
  { group: "스타일링", groupEn: "Styling", items: ["Tailwind CSS", "CSS/SCSS"] },
  { group: "도구", groupEn: "Tools", items: ["Git", "Figma", "Vercel"] },
];

const TIMELINE = [
  {
    period: "2024 –",
    title: "프론트엔드 개발자",
    titleEn: "Frontend Developer",
    desc: "사용자 경험을 최우선으로 생각하는 프론트엔드 개발",
    descEn: "Frontend development with user experience as the top priority",
  },
  {
    period: "– 2023",
    title: "영상 디자인 · 모션 그래픽",
    titleEn: "Video Design · Motion Graphics",
    desc: "영상 제작 및 모션 그래픽 경력 — 인터랙티브 UI 모션에 대한 감각을 키움",
    descEn:
      "Video production and motion graphics experience — developed a sense for interactive UI motion",
  },
];

export default async function AboutPage({ params }: Props) {
  const { lang } = await params;
  const isKo = lang === "ko";

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      {/* 소개 */}
      <section className="mb-16">
        <h1 className="text-3xl font-bold text-[var(--fg)] mb-6">About</h1>
        {isKo ? (
          <>
            <p className="text-[var(--muted)] leading-relaxed text-base mb-4">
              안녕하세요, 프론트엔드 개발자{" "}
              <span className="font-medium text-[var(--fg)]">angielee</span>입니다.
            </p>
            <p className="text-[var(--muted)] leading-relaxed text-base mb-4">
              영상 디자인과 모션 그래픽 경험을 바탕으로, 움직임이 살아있는 UI를 만드는 것을
              좋아합니다. 사용자가 자연스럽게 인터랙션할 수 있는 인터페이스, 읽기 좋은 코드를
              지향합니다.
            </p>
            <p className="text-[var(--muted)] leading-relaxed text-base">
              이 블로그는 개발하며 배운 것들, 회고, 일상의 기록을 담는 공간입니다.
            </p>
          </>
        ) : (
          <>
            <p className="text-[var(--muted)] leading-relaxed text-base mb-4">
              Hi, I&apos;m{" "}
              <span className="font-medium text-[var(--fg)]">angielee</span>, a frontend developer.
            </p>
            <p className="text-[var(--muted)] leading-relaxed text-base mb-4">
              Drawing on a background in video design and motion graphics, I love building UIs that
              feel alive. I strive for interfaces that users can interact with naturally and code
              that&apos;s a pleasure to read.
            </p>
            <p className="text-[var(--muted)] leading-relaxed text-base">
              This blog is a space to document things I learn while developing, retrospectives, and
              everyday life.
            </p>
          </>
        )}
      </section>

      {/* 기술 스택 */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-[var(--fg)] mb-6">
          {isKo ? "기술 스택" : "Tech Stack"}
        </h2>
        <div className="flex flex-col gap-5">
          {SKILLS.map(({ group, groupEn, items }) => (
            <div key={group} className="flex gap-4 items-start">
              <span className="text-sm text-[var(--muted)] w-24 shrink-0 pt-0.5">
                {isKo ? group : groupEn}
              </span>
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
        <h2 className="text-xl font-bold text-[var(--fg)] mb-6">
          {isKo ? "경력" : "Experience"}
        </h2>
        <div className="flex flex-col gap-0">
          {TIMELINE.map(({ period, title, titleEn, desc, descEn }, i) => (
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
                <p className="text-base font-semibold text-[var(--fg)] mb-1">
                  {isKo ? title : titleEn}
                </p>
                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  {isKo ? desc : descEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
