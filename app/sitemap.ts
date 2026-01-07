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
  "/delivery-policy"
];
export const dynamic = "force-static";

export default function sitemap() {
  const lastModified = new Date().toISOString();
  return seoRoutes.map((path) => ({
    url: `${site.url}${path}`,
    lastModified,
  }));
}
