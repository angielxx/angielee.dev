"use client";

import { useRef, useEffect } from "react";

export default function AmbientGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!ref.current) return;
      ref.current.style.background = `radial-gradient(700px circle at ${e.clientX}px ${e.clientY}px, color-mix(in srgb, var(--brand-500) 7%, transparent) 0%, transparent 60%)`;
      ref.current.style.opacity = "1";
    };
    const onLeave = () => {
      if (!ref.current) return;
      ref.current.style.opacity = "0";
    };
    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-[1] opacity-0 transition-opacity duration-500"
      aria-hidden
    />
  );
}
