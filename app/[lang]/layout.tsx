import { notFound } from "next/navigation";
import { isValidLang } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AmbientGlow from "@/components/AmbientGlow";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, AUTHOR_NAME, AUTHOR_GITHUB } from "@/lib/site";
import type { Metadata } from "next";

interface Props {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return {
    openGraph: {
      type: "website",
      locale: lang === "ko" ? "ko_KR" : "en_US",
      url: SITE_URL,
      siteName: SITE_NAME,
    },
    twitter: { card: "summary_large_image" },
    alternates: { canonical: SITE_URL },
    icons: { icon: "/favicon.ico", shortcut: "/favicon.ico" },
  };
}

export function generateStaticParams() {
  return [{ lang: 'ko' }, { lang: 'en' }];
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: AUTHOR_NAME,
      url: SITE_URL,
      sameAs: [AUTHOR_GITHUB],
    },
  ],
};

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AmbientGlow />
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
