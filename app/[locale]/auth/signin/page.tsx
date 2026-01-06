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
  params: { locale: Locale };
}): Promise<Metadata> {
  const messages = await getMessages(params.locale);

  return {
    title: messages.siteMetadata.auth.signin.title,
    description: messages.siteMetadata.auth.signin.description,
  };
}

export default async function SigninPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const messages = await getMessages(params.locale);
  return (
    <>
      <Signin signinTexts={messages.auth.signin} />
    </>
  );
}
