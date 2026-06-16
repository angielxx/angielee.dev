"use client";

import { useRef, useState } from "react";

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

export default function CodeBlock({ children, className }: CodeBlockProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const text = preRef.current?.innerText ?? "";
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="relative my-6 rounded-xl overflow-hidden border border-[var(--fg)]/10 bg-[var(--pre-bg)] shadow-brand-brutal">
      {/* 상단 바 */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--fg)]/10 bg-[var(--fg)]/5">
        {/* macOS 창 조절 버튼 */}
        <div className="flex items-center gap-1.5">
          <span className="block w-3 h-3 rounded-full bg-[#FF5F57]" />
          <span className="block w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <span className="block w-3 h-3 rounded-full bg-[#28C840]" />
        </div>
        {/* Copy 버튼 */}
        <button
          onClick={handleCopy}
          aria-label="코드 복사"
          className={`text-xs font-mono transition-colors duration-150 ${
            copied
              ? "text-brand-accent"
              : "text-[var(--pre-fg)]/60 hover:text-[var(--pre-fg)]"
          }`}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      {/* 코드 본문: .prose pre 스타일을 !important로 리셋 후 직접 적용 */}
      <pre
        ref={preRef}
        className={`!p-0 !m-0 !bg-transparent !rounded-none !border-0 overflow-x-auto px-5 py-4 text-sm leading-relaxed text-[#E2E8F0] ${className ?? ""}`}
      >
        {children}
      </pre>
    </div>
  );
}
