import { seoRoutes, site } from "./content";

export default function sitemap() {
  const lastModified = new Date().toISOString();
  return seoRoutes.map((path) => ({
    url: `${site.url}${path}`,
    lastModified,
  }));
}
