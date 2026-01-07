import { Metadata } from "next";
import { Locale, locales } from "@/i18n";
import { getMessages } from "@/lib/get-messages";
import Signin from "@/components/Auth/Signin";

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
    title: messages.siteMetadata.auth.signin.title,
    description: messages.siteMetadata.auth.signin.description,
  };
}

export default async function SigninPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const messages = await getMessages(locale);
  return (
    <>
      <Signin signinTexts={messages.siteMetadata.auth.signin} />
    </>
  );
}
