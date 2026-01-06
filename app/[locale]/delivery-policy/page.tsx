import { Metadata } from "next";
import { Locale, locales } from "@/i18n";
import { getMessages } from "@/lib/get-messages";
import MdxContent from "@/components/MdxContent";

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
    title: messages.siteMetadata.deliveryPolicy.title,
    description: messages.siteMetadata.deliveryPolicy.description,
  };
}

export default async function DeliveryPolicyPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const messages = await getMessages(params.locale);
  const mdx = messages.deliveryContent.body;
  return (
    <main className="pb-20 pt-20 page-main-bg">
      <div className="mx-auto mb-10 max-w-c-1315 px-4 md:px-8 xl:px-0">
        <article>
          <MdxContent mdx={mdx} />
        </article>
      </div>
    </main>
  );
}
