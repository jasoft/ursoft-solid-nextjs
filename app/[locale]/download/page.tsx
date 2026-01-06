import { Metadata } from "next";
import { Locale, locales } from "@/i18n";
import { getMessages } from "@/lib/get-messages";
import DownloadContent from "../../../components/DownloadContent";

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
    title: messages.siteMetadata.download.title,
    description: messages.siteMetadata.download.description,
  };
}

export default async function DownloadPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const messages = await getMessages(params.locale);
  return (
    <>
      <DownloadContent
        downloadPageContent={messages.downloadPageContent}
        updateContent={messages.updateContent}
      />
    </>
  );
}
