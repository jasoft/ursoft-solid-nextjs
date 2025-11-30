import { Metadata } from "next";
import MdxContent from "@/components/MdxContent";
import { installedMarkdown, installedAssets } from "@/app/content";
import Image from "next/image";
import Feature from "@/components/Features";
import Pricing from "@/components/Pricing";

export const dynamic = "force-static";

const mdTitle = "Successfully installed.";
const mdx = installedMarkdown;

export const metadata: Metadata = {
  title: mdTitle || "Your Uninstaller – Installed",
  description: mdTitle || "Your Uninstaller – Installed",
};

export default function InstalledPage() {
  return (
    <main className="pb-20">
      <div className="max-w-c-1315 mx-auto mb-10 px-4 md:px-8 xl:px-0">
        <div className="mb-6">
          <div className="relative h-20 w-full">
            <Image src={installedAssets.bannerSrc} alt={installedAssets.bannerAlt} fill sizes="(max-width: 768px) 100vw, 100vw" priority />
          </div>
        </div>
        <article>
          <MdxContent mdx={mdx} />
        </article>
      </div>
      <Feature />
      <Pricing />
    </main>
  );
}
