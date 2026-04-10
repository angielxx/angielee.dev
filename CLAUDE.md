# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

**angielee.dev**는 프론트엔드 개발자의 개인 블로그 겸 포트폴리오 웹사이트입니다. Next.js 16 (App Router)을 기반으로 TypeScript, Tailwind CSS, MDX를 사용합니다.

**핵심 특징:**
- 한국어 기반 콘텐츠
- 블로그 포스트는 MDX 파일 기반 (정적 사이트 생성)
- 카테고리, 태그, 시리즈로 포스트 분류
- Tailwind CSS와 CSS 변수를 이용한 다크모드 지원
- SEO 최적화 (Schema.org JSON-LD)

## 개발 명령어

```bash
npm run dev      # 개발 서버 시작 (localhost:3000)
npm run build    # 프로덕션 빌드
npm start        # 프로덕션 서버 실행
npm run lint     # ESLint 실행
```

## 아키텍처 개요

### 주요 디렉토리 구조

- **`app/`** — Next.js App Router 페이지
  - `layout.tsx` — 루트 레이아웃 (Header, Footer, 메타데이터)
  - `page.tsx` — 홈 페이지
  - `blog/page.tsx` — 블로그 목록 (카테고리/태그 필터링)
  - `blog/[slug]/page.tsx` — 블로그 상세 페이지 (정적 생성)
  - `about/`, `contact/` — 정적 페이지

- **`components/`** — 재사용 가능한 React 컴포넌트
  - `Header.tsx`, `Footer.tsx` — 레이아웃 구성요소
  - `PostCard.tsx` — 블로그 카드
  - `CategoryFilter.tsx` — 필터 UI
  - `TOC.tsx` — 목차 사이드바
  - `TagBadge.tsx`, `SeriesNav.tsx` — 블로그 보조 컴포넌트

- **`lib/`** — 유틸리티 함수
  - `posts.ts` — MDX 파일 읽기 및 필터링
  - `categories.ts` — 카테고리/태그 타입 및 상수
  - `toc.ts` — MDX 콘텐츠에서 제목 구조 추출

- **`posts/`** — 블로그 콘텐츠 (MDX 파일)

### 블로그 포스트 데이터 흐름

1. `posts/` 디렉토리의 MDX 파일 읽기 (파일명: `slug-name.mdx`)
2. `gray-matter`로 YAML 프론트매터 파싱
3. `lib/posts.ts`의 함수로 정렬 및 필터링
4. `blog/[slug]/page.tsx`의 `generateStaticParams()`로 정적 라우트 생성

### 포스트 프론트매터 필드

```yaml
title: 제목
date: 2024-03-15
description: 짧은 설명
category: 프론트엔드  # 또는 회고, 일상, 독서
tags: [react, nextjs]
series: 시리즈명 (선택)
seriesOrder: 1 (시리즈 순서)
thumbnail: 썸네일 이미지 URL (선택)
```

`readingTime`은 자동 계산됨 (한글 기준 분당 500자).

### 주요 의존성

- **Next.js 16.1.6** — React 프레임워크
- **next-mdx-remote** — 서버 사이드 MDX 렌더링
- **TailwindCSS 4** — 스타일링
- **gray-matter** — YAML 프론트매터 파싱
- **rehype/remark 플러그인** — Markdown 변환 (slug, autolink, GFM)

## 스타일링

- Tailwind CSS + CSS 변수 조합으로 다크모드 구현
- 전역 스타일: `app/globals.css`
- MDX 본문: Tailwind prose 플러그인

## 포스트 쿼리 함수 (`lib/posts.ts`)

```typescript
getAllPosts()              // 날짜순 정렬된 모든 포스트
getPostsByCategory(cat)    // 카테고리로 필터
getPostsByTag(tag)         // 태그로 필터
getSeriesPosts(name)       // 시리즈로 필터
getAllTags()               // 모든 태그 (중복 제거, 정렬)
```

## 메타데이터

- 사이트 전역: `app/layout.tsx`
- 페이지별: `generateMetadata()` 함수
- Schema.org JSON-LD 마크업으로 SEO 최적화
