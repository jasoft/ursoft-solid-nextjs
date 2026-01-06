import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LanguageRedirect from "@/components/LanguageRedirect";
import Lines from "@/components/Lines";
import Providers from "@/components/Providers";
import ScrollToTop from "@/components/ScrollToTop";
import { locales, defaultLocale, Locale } from "@/i18n"; // Import from root i18n.ts
import { getMessages } from "@/lib/get-messages"; // New import path and function name

import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

// Metadata will be generated dynamically per page/layout via getMessages
// Temporarily keep a placeholder or remove if not needed at this level
// export const metadata: Metadata = {
//   metadataBase: new URL(site.url),
// };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale }; // Use Locale type and direct access, as generateStaticParams makes it non-Promise
}) {
  const locale = locales.includes(params.locale) ? params.locale : defaultLocale;
  // In this SSG approach, getMessages is called per page, not per layout
  // const messages = await getMessages(locale); // No longer needed here if passed via props or called in children

  return (
    <html lang={locale} suppressHydrationWarning>
      <body suppressHydrationWarning className={`dark:bg-black ${inter.className}`}>
        <Providers>
          {/* Components that were previously wrapped by ContentProvider need to either receive props
              or call getMessages themselves. For this layout, we'll assume they will be updated. */}
          <Lines />
          <LanguageRedirect />
          <Header /> {/* Header will need to fetch its own content or receive props */}
          {children}
          <Footer /> {/* Footer will need to fetch its own content or receive props */}
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}