const site = {
  url: "https://www.ursoftware.com",
};
export const dynamic = "force-static";

export default function robots() {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
