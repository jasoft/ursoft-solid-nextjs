import CTA from "@/components/CTA";
import Feature from "@/components/Features";
import { Locale, locales } from "@/i18n";
import { getMessages } from "@/lib/get-messages";
import { Metadata } from "next";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages(locale);

  return {
    title: messages.siteMetadata.features.title,
    description: messages.siteMetadata.features.description,
  };
}

export default async function FeaturesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const messages = await getMessages(locale);

  return (
    <main className="page-main-bg -mt-20">
      <Feature
        featuresSection={messages.featuresSection}
        featuresData={messages.featuresData}
      />
      <CTA
        ctaData={messages.ctaData}
        ctaAlt={messages.ctaAlt}
        updateContent={messages.updateContent}
      />
    </main>
  );
}
