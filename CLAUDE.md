# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

**angielee.dev**는 프론트엔드 개발자의 개인 블로그 겸 포트폴리오 웹사이트입니다. Next.js 16 (App Router) + TypeScript + Tailwind CSS 4 + MDX 기반의 정적 사이트입니다.

## 개발 명령어

```bash
pnpm dev         # 개발 서버 (localhost:3000)
pnpm build       # 프로덕션 빌드 (정적 생성 포함)
pnpm lint        # ESLint 실행
```

테스트 프레임워크는 설정되어 있지 않습니다.

## 아키텍처

### 핵심 상수

**`lib/site.ts`** — `SITE_URL`, `SITE_NAME`, `AUTHOR_NAME` 등 사이트 전역 상수의 단일 진실 공급원. 메타데이터·JSON-LD·사이트맵 등 모든 곳에서 이 파일을 참조합니다.

**`lib/categories.ts`** — `Category` 타입과 `CATEGORIES` 배열. `fs`를 사용하지 않아 클라이언트/서버 양쪽에서 import 가능합니다.

### 블로그 포스트 파이프라인

1. `posts/*.mdx` 파일을 `fs.readdirSync`로 읽음 (빌드 타임 전용)
2. `gray-matter`로 YAML 프론트매터 파싱 → `PostMeta` / `Post` 타입으로 반환
3. `blog/[slug]/page.tsx`의 `generateStaticParams()`가 모든 슬러그를 정적 라우트로 생성
4. MDX 본문은 `next-mdx-remote/rsc` (서버 컴포넌트)로 렌더링

`lib/posts.ts`의 모든 함수(`getAllPosts`, `getPostBySlug` 등)는 서버 전용입니다.

### 포스트 프론트매터 스키마

```yaml
title: 제목
date: 2024-03-15
description: 짧은 설명
category: React         # lib/categories.ts의 Category 타입 값
tags: [react, nextjs]
series: 시리즈명         # 선택
seriesOrder: 1           # 선택, 시리즈 내 순서
thumbnail: https://...   # 선택
```

`readingTime`은 `calcReadingTime()`이 자동 계산합니다 (한글 기준 분당 500자).

### 블로그 목록 필터링

`app/blog/page.tsx`는 URL searchParams(`?category=React&tag=nextjs`)로 필터링합니다. 클라이언트 상태는 없습니다. `CategoryFilter`는 searchParams를 읽기 때문에 반드시 `<Suspense>`로 감싸야 합니다.

### TOC 생성

`lib/toc.ts`의 `extractToc()`는 `github-slugger`로 헤딩 ID를 생성합니다. `rehype-slug`도 동일 라이브러리를 사용하므로 한국어 헤딩의 앵커 ID가 정확히 일치합니다.

### 다크 모드

FOUC 방지를 위해 `app/layout.tsx`의 `<head>`에 인라인 스크립트를 삽입합니다. 이 스크립트는 `localStorage.getItem('theme')`을 읽어 페이지 로드 직후 `document.documentElement`에 `dark` 클래스를 추가합니다.

### 스타일링 시스템

`app/globals.css`에서 CSS 변수(`--bg`, `--fg`, `--brand-*` 등)를 정의하고, `@theme inline` 블록으로 Tailwind 유틸리티(`text-brand-600`, `bg-background` 등)에 매핑합니다. 컴포넌트에서 CSS 변수를 직접 쓸 때는 `text-[var(--muted)]` 형태를 사용합니다.

### 폰트

- **Pretendard** — 한국어 본문용, CDN(`cdn.jsdelivr.net`)에서 로드. `@font-face`로 선언.
- **Fira Code** — 코드 블록용, Next.js `next/font/google`으로 로드. CSS 변수 `--font-fira-code`로 주입.

### SEO

- `app/layout.tsx` — 전역 `WebSite` + `Person` JSON-LD
- `app/blog/[slug]/page.tsx` — 개별 포스트 `BlogPosting` JSON-LD
- `app/sitemap.ts` — 자동 생성 사이트맵
- `app/robots.ts` — robots.txt
- `next.config.ts` — 보안 헤더 (HSTS, X-Frame-Options 등)

### 애니메이션

`framer-motion`이 의존성으로 설치되어 있습니다.
