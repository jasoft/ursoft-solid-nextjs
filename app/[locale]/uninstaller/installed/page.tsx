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
  params: { locale: Locale };
}): Promise<Metadata> {
  const messages = await getMessages(params.locale);

  return {
    title: messages.siteMetadata.installed.title,
    description: messages.siteMetadata.installed.description,
  };
}

export default async function InstalledPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const messages = await getMessages(params.locale);
  const mdx = messages.installedMarkdown;

  return (
    <main className="pb-20 pt-20 page-main-bg">
      <div className="mx-auto mb-10 max-w-c-1315 px-4 md:px-8 xl:px-0">
        <div className="relative z-1 mb-10 flex w-full flex-col justify-between rounded-md border border-stroke bg-white p-6 shadow-solid-13 dark:border-strokedark dark:bg-blacksection md:flex-row md:items-center">
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
              <p className="text-black dark:text-white">
                {messages.installedContent.tips.map((tip: string, i: number) => (
                  <li key={i}>{tip}</li>
                ))}
              </p>
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
