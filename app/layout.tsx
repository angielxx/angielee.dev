import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://angielee.dev"),
  title: {
    default: "More than Better",
    template: "%s | More than Better",
  },
  description: "프론트엔드 개발자 angielee의 블로그 겸 포트폴리오",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://angielee.dev",
    siteName: "More than Better",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "More than Better" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://angielee.dev" },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://angielee.dev/#website",
      url: "https://angielee.dev",
      name: "More than Better",
      description: "프론트엔드 개발자 angielee의 블로그 겸 포트폴리오",
    },
    {
      "@type": "Person",
      "@id": "https://angielee.dev/#person",
      name: "angielee",
      url: "https://angielee.dev",
      sameAs: ["https://github.com/angielxx"],
    },
  ],
};

const themeInitScript = `(function(){try{var s=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(s==='dark'||(s===null&&d)){document.documentElement.classList.add('dark')}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${firaCode.variable} antialiased`}
      >
        <Header />
        <main className="pt-16 min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
