import { Metadata } from "next";
import RevSliderHero from "@/components/RevSliderHero";
import Hero from "@/components/Hero";
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
  title: "Your Uninstaller! - Uninstall Software, any unwanted app Completely.",
  description:
    "Your Uninstaller! - Free download, award winning uninstaller suite to remove programs, uninstall software completely and easily. Remove every trace of unwanted programs.",
  keywords: [
    "Your Uninstaller!",
    "uninstall",
    "uninstaller",
    "uninstall program",
    "uninstaller software",
    "add remove",
    "add remove programs",
    "cleanup",
    "registry",
    "Windows",
  ],
  formatDetection: { telephone: false },
  themeColor: "#ffffff",
  openGraph: {
    title:
      "Your Uninstaller! - Uninstall Software, any unwanted app Completely.",
    description:
      "Your Uninstaller! - Free download, award winning uninstaller suite to remove programs, uninstall software completely and easily. Remove every trace of unwanted programs.",
    url: "https://www.ursoftware.com/",
    siteName: "Your Uninstaller!",
    images: [{ url: "/images/logo/site-logo.png", width: 300, height: 300 }],
    type: "website",
  },
  icons: {
    icon: "/images/logo/site-logo.png",
    apple: "/images/logo/site-logo.png",
  },
};

export default function Home() {
  return (
    <main>
      <RevSliderHero />
      <Hero />
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
