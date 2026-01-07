import { Metadata } from "next";
import { Locale, locales } from "@/i18n";
import { getMessages } from "@/lib/get-messages";
import Contact from "@/components/Contact";

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
    title: messages.siteMetadata.support.title,
    description: messages.siteMetadata.support.description,
  };
}

export default async function SupportPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const messages = await getMessages(params.locale);
  return (
    <main className="pb-20 pt-40 page-main-bg">
      <div className="mx-auto max-w-c-1390 px-7.5 lg:px-15 xl:px-20 mb-10">
        <h1 className="mb-4 text-3xl font-bold text-black dark:text-white">
          {messages.supportContent.title}
        </h1>
        {messages.supportContent.intro.map((p: string, i: number) => (
          <p key={i} className="mb-3">
            {p}
          </p>
        ))}
        <h3 className="mt-8 mb-2 text-metatitle3 font-medium text-black dark:text-white">
          {messages.supportContent.lostKeyHint}
        </h3>
        <a
          href={messages.supportContent.lostKeyUrl}
          className="inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white hover:opacity-90 dark:bg-white dark:text-black"
        >
          {messages.supportContent.lostKeyButtonLabel}
        </a>
      </div>
      <Contact contactTexts={messages.contactTexts} funFactAlt={messages.funFactAlt} />
    </main>
  );
}