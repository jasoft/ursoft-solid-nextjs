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
    title: "Blog",
    description: "Our latest blog posts",
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  return (
    <section className="py-20 lg:py-25 xl:py-30">
      <div className="mx-auto mt-15 max-w-c-1280 px-4 md:px-8 xl:mt-20 xl:px-0">
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold text-black dark:text-white">
            Blog
          </h2>
          <p>Blog posts coming soon...</p>
        </div>
      </div>
    </section>
  );
}
