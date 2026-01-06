import { Metadata } from "next";
import { Locale, locales } from "@/i18n";
import { getMessages } from "@/lib/get-messages";
import Signup from "@/components/Auth/Signup";

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
    title: messages.siteMetadata.auth.signup.title,
    description: messages.siteMetadata.auth.signup.description,
  };
}

export default async function SignupPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const messages = await getMessages(params.locale);
  return (
    <>
      <Signup signupTexts={messages.auth.signup} />
    </>
  );
}
