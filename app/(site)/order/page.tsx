import Pricing from "@/components/Pricing";
import { Metadata } from "next";
import Image from "next/image";
import { pricingIntro, siteMetadata } from "@/app/content";

export const metadata: Metadata = {
  title: siteMetadata.order.title,
  description: siteMetadata.order.description,
};

export default function OrderPage() {
  return (
    <main className="page-main-bg">
      <Pricing />
      <section className="mt-15">
        <div className="mx-auto max-w-[980px] px-4 text-center md:px-8">
          <h3 className="mb-2 text-2xl font-semibold text-black dark:text-white">
            {pricingIntro.claimTitle}
          </h3>
          <p className="mb-3 text-black dark:text-white">
            {pricingIntro.claimStats}
          </p>
          <ul className="mx-auto grid grid-cols-1 gap-2 text-left sm:grid-cols-2">
            {pricingIntro.bullets.map((b, i) => (
              <li key={i} className="dark:text-manatee text-black">
                {b}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-black dark:text-white">
            {pricingIntro.keyDelivery}
          </p>
          <div className="mt-6 inline-flex items-center gap-3">
            <Image
              src="/images/pricing/payment.png"
              alt="Payments"
              width={128}
              height={128}
              className="rounded-md"
            />
            <p className="text-black dark:text-white">
              {pricingIntro.guarantee}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
