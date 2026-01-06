import { Metadata } from "next";
import Home from "../../(site)/page";
import { getDictionary } from "@/lib/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const content = await getDictionary(lang);
  
  return {
    title: content.siteMetadata.home.title,
    description: content.siteMetadata.home.description,
    keywords: content.siteMetadata.home.keywords,
    openGraph: {
      title: content.siteMetadata.home.title,
      description: content.siteMetadata.home.description,
      url: content.siteMetadata.home.openGraph.url,
      siteName: content.siteMetadata.home.openGraph.siteName,
      images: [
        {
          url: content.siteMetadata.home.openGraph.image,
          width: 300,
          height: 300,
        },
      ],
      type: "website",
    },
  };
}

export default Home;