import { Metadata } from "next";
import { siteMetadata } from "@/app/content";
import RevSliderHero from "@/components/RevSliderHero";
import Brands from "@/components/Brands";
import Feature from "@/components/Features";
import About from "@/components/About";
import FunFact from "@/components/FunFact";
import Integration from "@/components/Integration";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import Testimonial from "@/components/Testimonial";

export const metadata: Metadata = {
  title: siteMetadata.home.title,
  description: siteMetadata.home.description,
  keywords: siteMetadata.home.keywords,
  formatDetection: { telephone: false },
  openGraph: {
    title: siteMetadata.home.title,
    description: siteMetadata.home.description,
    url: siteMetadata.home.openGraph.url,
    siteName: siteMetadata.home.openGraph.siteName,
    images: [{ url: siteMetadata.home.openGraph.image, width: 300, height: 300 }],
    type: "website",
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function Home() {
  return (
    <main>
      <RevSliderHero />
      <Brands />
      <About />
      <Feature />
      <FunFact />
      <Integration />
      <CTA />
      <FAQ />
      <Testimonial />
      <Pricing />
      <Contact />
    </main>
  );
}
