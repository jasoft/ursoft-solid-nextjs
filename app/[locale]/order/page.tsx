import { Metadata } from "next";
import { Locale, locales } from "@/i18n";
import { getMessages } from "@/lib/get-messages";
import Pricing from "@/components/Pricing";
import OrderFeatures from "../../../app/(site)/order/OrderFeatures"; // Assuming OrderFeatures is in a specific path

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const messages = await getMessages(params.locale);

  return {
    title: messages.siteMetadata.order.title,
    description: messages.siteMetadata.order.description,
  };
}

export default async function OrderPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const messages = await getMessages(params.locale);
  return (
    <main className="page-main-bg">
      <Pricing
        pricingHeader={messages.pricingHeader}
        pricingIntro={messages.pricingIntro}
        pricingLabels={messages.pricingLabels}
        pricingOptions={messages.pricingOptions}
        pricingImageAlt={messages.pricingImageAlt}
      />
      <OrderFeatures orderFeatures={messages.orderFeatures} />
    </main>
  );
}