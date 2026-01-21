import { locales } from "@/i18n";
import { MetadataRoute } from "next";

const site = {
  url: "https://www.ursoftware.com",
};

const seoRoutes = [
  "",
  "/features",
  "/download",
  "/order",
  "/support",
  "/privacy",
  "/refund-policy",
  "/delivery-policy",
];

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date().toISOString();

  // Generate sitemap entries for all locales and routes
  const sitemapEntries = locales.flatMap((locale) =>
    seoRoutes.map((route) => ({
      url: `${site.url}/${locale}${route}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
  );

  return sitemapEntries;
}
