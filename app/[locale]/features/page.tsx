import { Metadata } from "next";
import { Locale, locales } from "@/i18n";
import { getMessages } from "@/lib/get-messages";
import Feature from "@/components/Features";
import CTA from "@/components/CTA";
import FeaturesTab from "@/components/FeaturesTab"; // Assuming FeaturesTab is a component

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
    <main className="-mt-20 page-main-bg">
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
