import { deliveryContent, siteMetadata } from "@/app/content";
import MdxContent from "@/components/MdxContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: siteMetadata.deliveryPolicy.title,
  description: siteMetadata.deliveryPolicy.description,
};


const DeliveryPolicyPage = () => {
  const mdx = deliveryContent.body;
  return (
    <main className="pb-20 pt-20 page-main-bg">
      <div className="mx-auto mb-10 max-w-c-1315 px-4 md:px-8 xl:px-0">
        <article>
          <MdxContent mdx={mdx} />
        </article>
      </div>
    </main>
  );
};

export default DeliveryPolicyPage;
