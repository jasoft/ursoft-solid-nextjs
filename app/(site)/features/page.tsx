import Feature from "@/components/Features";
import CTA from "@/components/CTA";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features - Your Uninstaller! 7",
  description: "Core features of Your Uninstaller! 7",
};

export default function FeaturesPage() {
  return (
    <main className="pt-40 pb-20">
      <Feature />
      <CTA />
    </main>
  );
}

