import Feature from "@/components/Features";
import CTA from "@/components/CTA";
import { Metadata } from "next";
import { siteMetadata } from "@/app/content";

export const metadata: Metadata = {
  title: siteMetadata.features.title,
  description: siteMetadata.features.description,
};

export default function FeaturesPage() {
  return (
    <main className="-mt-20 page-main-bg">
      <Feature />
      <CTA />
    </main>
  );
}
