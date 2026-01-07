import { Metadata } from "next";
import { Locale, locales } from "@/i18n";
import { getMessages } from "@/lib/get-messages";
import Pricing from "@/components/Pricing";

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
    title: messages.siteMetadata.order.title,
    description: messages.siteMetadata.order.description,
  };
}

export default async function OrderPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const messages = await getMessages(locale);
  return (
    <main className="page-main-bg">
      <Pricing
        pricingHeader={messages.pricingHeader}
        pricingIntro={messages.pricingIntro}
        pricingLabels={messages.pricingLabels}
        pricingOptions={messages.pricingOptions}
        pricingImageAlt={messages.pricingImageAlt}
      />
    </main>
  );
}
