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
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages(locale);

  return {
    title: messages.siteMetadata.download.title,
    description: messages.siteMetadata.download.description,
  };
}

export default async function DownloadPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const messages = await getMessages(locale);
  return (
    <>
      <DownloadContent
        downloadPageContent={messages.downloadPageContent}
        updateContent={messages.updateContent}
        revSliderDownloadUrl={messages.revSliderContent.downloadUrl}
      />
    </>
  );
}
