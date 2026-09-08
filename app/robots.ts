import type { MetadataRoute } from "next";

const site = {
  url: "https://www.ursoftware.com",
};
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}

