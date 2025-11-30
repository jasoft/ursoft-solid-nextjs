import { Metadata } from "next";
import MdxContent from "@/components/MdxContent";
import { uninstallerUpdateMarkdown } from "@/app/content";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Update Your Uninstaller!",
  description: "Download and install the latest version of Your Uninstaller.",
};

export default function UpdatePage() {
  return (
    <main className="page-main-bg pb-20 pt-20">
      <div className="mx-auto mb-10 max-w-c-1315 px-4 md:px-8 xl:px-0">
        <article>
          <MdxContent mdx={uninstallerUpdateMarkdown} />
        </article>
      </div>
    </main>
  );
}
