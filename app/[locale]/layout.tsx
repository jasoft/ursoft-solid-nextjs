import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Lines from "@/components/Lines";
import Providers from "@/components/Providers";
import ScrollToTop from "@/components/ScrollToTop";
import { locales, defaultLocale, Locale } from "@/i18n";
import { getMessages } from "@/lib/get-messages";

import "../globals.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale: resolvedLocale } = await params;
  const locale = locales.includes(resolvedLocale)
    ? resolvedLocale
    : defaultLocale;
  const messages = await getMessages(locale);

  return (
    <Providers>
      <Lines />
      <Header
        headerMenu={messages.headerMenu}
        headerContent={messages.headerContent}
        locale={locale}
      />
      {children}
      <Footer
        footerCompanyDescription={messages.footerCompanyDescription}
        footerContent={messages.footerContent}
        locale={locale}
      />
      <ScrollToTop accessibilityTexts={messages.accessibilityTexts} />
    </Providers>
  );
}
