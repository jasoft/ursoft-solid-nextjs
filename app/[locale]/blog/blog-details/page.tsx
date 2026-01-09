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
    title: "Blog Details",
    description: "Blog details page",
  };
}

export default async function SingleBlogPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  return (
    <section className="pb-20 pt-35 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
      <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
        <div className="flex flex-col-reverse gap-7.5 lg:flex-row xl:gap-12.5">
          <div className="w-full text-center">
            <h2 className="mb-5 text-3xl font-semibold text-black dark:text-white">
              Blog Details
            </h2>
            <p>Content coming soon...</p>
          </div>
        </div>
      </div>
    </section>
  );
}
