import { Metadata } from "next";
import { Locale, locales } from "@/i18n";
import { getMessages } from "@/lib/get-messages";
import MdxContent from "@/components/MdxContent";
import Image from "next/image";

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
    title: messages.siteMetadata.installed.title,
    description: messages.siteMetadata.installed.description,
  };
}

export default async function InstalledPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const messages = await getMessages(locale);
  const mdx = messages.installedMarkdown;

  return (
    <main className="page-main-bg pt-20 pb-20">
      <div className="max-w-c-1315 mx-auto mb-10 px-4 md:px-8 xl:px-0">
        <div className="border-stroke shadow-solid-13 dark:border-strokedark dark:bg-blacksection relative z-1 mb-10 flex w-full flex-col justify-between rounded-md border bg-white p-6 md:flex-row md:items-center">
          <div className="flex w-full items-center gap-6">
            <div className="h-10 w-10 flex-shrink-0">
              <Image
                src={messages.installedAssets.bannerSrc}
                alt={messages.installedAssets.bannerAlt}
                width={40}
                height={40}
              />
            </div>
            <div className="w-full">
              <ul className="list-disc pl-5 text-black dark:text-white">
                {messages.installedContent.tips.map(
                  (tip: string, i: number) => (
                    <li key={i}>{tip}</li>
                  ),
                )}
              </ul>
            </div>
          </div>
        </div>
        <article>
          <MdxContent mdx={mdx} />
        </article>
      </div>
    </main>
  );
}
