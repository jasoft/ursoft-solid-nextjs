import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LanguageRedirect from "@/components/LanguageRedirect";
import Lines from "@/components/Lines";
import Providers from "@/components/Providers";
import ScrollToTop from "@/components/ScrollToTop";
import { locales, normalizeLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { ContentProvider } from "@/app/context/ContentContext";

import { site } from "../content";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
};

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = normalizeLocale(lang);
  const content = await getDictionary(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body suppressHydrationWarning className={`dark:bg-black ${inter.className}`}>
        <Providers>
          <ContentProvider content={content}>
            <Lines />
            <LanguageRedirect />
            <Header />
            {children}
            <Footer />
            <ScrollToTop />
          </ContentProvider>
        </Providers>
      </body>
    </html>
  );
}
