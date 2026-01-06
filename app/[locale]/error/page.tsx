import { Metadata } from "next";
import { Locale, locales } from "@/i18n";
import { getMessages } from "@/lib/get-messages";
import ErrorView from "@/components/ErrorView";

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
    title: messages.notFoundContent.title,
    description: messages.notFoundContent.body,
  };
}

export default async function ErrorPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const messages = await getMessages(params.locale);
  return (
    <>
      <ErrorView notFoundContent={messages.notFoundContent} />
    </>
  );
}
