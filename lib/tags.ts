const TAG_LABELS: Record<string, { ko: string; en: string }> = {
  독서: { ko: "독서", en: "Reading" },
  성장: { ko: "성장", en: "Growth" },
  커리어: { ko: "커리어", en: "Career" },
  협업: { ko: "협업", en: "Collaboration" },
  항해플러스: { ko: "항해플러스", en: "Hanghae+" },
  컨퍼런스: { ko: "컨퍼런스", en: "Conference" },
};

export function getTagLabel(tag: string, lang: string): string {
  const entry = TAG_LABELS[tag];
  if (!entry) return tag;
  return lang === "ko" ? entry.ko : entry.en;
}
