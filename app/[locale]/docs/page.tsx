import { Metadata } from "next";
import { Locale, locales } from "@/i18n";
import { getMessages } from "@/lib/get-messages";
import MdxContent from "@/components/MdxContent";
import DocsSidebarLink from "@/components/Docs/SidebarLink";

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
    title: messages.siteMetadata.docs.title,
    description: messages.siteMetadata.docs.description,
  };
}

export default async function DocsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const messages = await getMessages(locale);
  console.log(`[DEBUG LOG DOCS] Locale: ${locale}`);
  console.log(`[DEBUG LOG DOCS] docsContent exists: ${!!messages?.docsContent}`);
  if (messages?.docsContent) {
      console.log(`[DEBUG LOG DOCS] sidebar title: ${messages.docsContent.sidebar?.title}`);
      console.log(`[DEBUG LOG DOCS] body length: ${messages.docsContent.body?.length}`);
  }
  const mdx = messages.docsContent.body;

  return (
    <main className="pb-20 pt-20 page-main-bg">
      <div className="mx-auto mb-10 max-w-c-1315 px-4 md:px-8 xl:px-0">
        <div className="flex flex-col-reverse gap-7.5 lg:flex-row xl:gap-12.5">
          <div className="md:w-1/2 lg:w-[32%]">
            <div className="animate_top rounded-md border border-stroke bg-white p-3.5 shadow-solid-13 dark:border-strokedark dark:bg-blacksection">
              <h4 className="mb-7.5 text-2xl font-semibold text-black dark:text-white">
                {messages.docsContent.sidebar.title}
              </h4>

              <ul>
                {messages.docsContent.sidebar.sections.map(
                  (section: any, index: number) => (
                    <li key={index} className="mb-3">
                      <h5 className="text-xl font-medium text-black dark:text-white">
                        {section.title}
                      </h5>
                      <ul>
                        {section.links.map((link: any, linkIndex: number) => (
                          <li key={linkIndex} className="mb-2">
                            <DocsSidebarLink
                              link={link}
                              activePath={"/docs/bootstrap-template"} // Adjust active path logic if needed
                            />
                          </li>
                        ))}
                      </ul>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
          <div className="lg:w-2/3">
            <article>
              <MdxContent mdx={mdx} />
            </article>
          </div>
        </div>
      </div>
    </main>
  );
}
