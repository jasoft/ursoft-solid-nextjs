import { Metadata } from "next";
import { Locale, locales } from "@/i18n";
import { getMessages } from "@/lib/get-messages";

// Import all components used in the Home page
import RevSliderHero from "@/components/RevSliderHero";
import Brands from "@/components/Brands";
import Feature from "@/components/Features";
import About from "@/components/About";
import FunFact from "@/components/FunFact";
import Integration from "@/components/Integration";
import CTA from "@/components/CTA";
// import FAQ from "@/components/FAQ"; // FAQ is imported but not rendered in the original Home
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import Testimonial from "@/components/Testimonial";

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
    title: messages.siteMetadata.home.title,
    description: messages.siteMetadata.home.description,
    keywords: messages.siteMetadata.home.keywords,
    formatDetection: { telephone: false },
    openGraph: {
      title: messages.siteMetadata.home.title,
      description: messages.siteMetadata.home.description,
      url: messages.siteMetadata.home.openGraph.url,
      siteName: messages.siteMetadata.home.openGraph.siteName,
      images: [
        { url: messages.siteMetadata.home.openGraph.image, width: 300, height: 300 },
      ],
      type: "website",
    },
    icons: {
      icon: "/favicon.png",
      apple: "/favicon.png",
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const messages = await getMessages(locale);

  return (
    <main>
      {/* Each component will now receive its content via props */}
      <RevSliderHero revSliderContent={messages.revSliderContent} />
      <Brands brandData={messages.brandData} />
      <About importantFeatures={messages.importantFeatures} />
      <Feature featuresSection={messages.featuresSection} featuresData={messages.featuresData} />
      <FunFact funFactHeader={messages.funFactHeader} funFactData={messages.funFactData} funFactAlt={messages.funFactAlt} />
      <Integration integrationHeader={messages.integrationHeader} integrationIcons={messages.integrationIcons} integrationAlt={messages.integrationAlt} />
      <CTA ctaData={messages.ctaData} ctaAlt={messages.ctaAlt} updateContent={messages.updateContent} />
      {/* FAQ is not rendered in original Home, but if it were, it would receive props */}
      <Testimonial testimonialHeader={messages.testimonialHeader} testimonialData={messages.testimonialData} />
      <Pricing pricingHeader={messages.pricingHeader} pricingIntro={messages.pricingIntro} pricingLabels={messages.pricingLabels} pricingOptions={messages.pricingOptions} pricingImageAlt={messages.pricingImageAlt} />
      <Contact contactTexts={messages.contactTexts} funFactAlt={messages.funFactAlt} />
    </main>
  );
}
