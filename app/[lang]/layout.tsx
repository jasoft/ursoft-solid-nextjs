import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LanguageRedirect from "@/components/LanguageRedirect";
import Lines from "@/components/Lines";
import Providers from "@/components/Providers";
import ScrollToTop from "@/components/ScrollToTop";
import { locales, normalizeLocale } from "@/lib/i18n";

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

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const locale = normalizeLocale(params?.lang);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body suppressHydrationWarning className={`dark:bg-black ${inter.className}`}>
        <Providers>
          <Lines />
          <LanguageRedirect />
          <Header />
          {children}
          <Footer />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}