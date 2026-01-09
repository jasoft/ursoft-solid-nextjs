import { Metadata } from "next";
import { Locale, locales } from "@/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  return {
    title: "Documentation",
    description: "Product documentation",
  };
}

export default async function DocsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  return (
    <main className="pb-20 pt-20 page-main-bg">
      <div className="mx-auto mb-10 max-w-c-1315 px-4 md:px-8 xl:px-0">
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold text-black dark:text-white">
            Documentation
          </h2>
          <p>Documentation coming soon...</p>
        </div>
      </div>
    </main>
  );
}
