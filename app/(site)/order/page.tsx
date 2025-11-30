import Pricing from "@/components/Pricing";
import { Metadata } from "next";
import { siteMetadata } from "@/app/content";
import OrderFeatures from "./OrderFeatures";

export const metadata: Metadata = {
  title: siteMetadata.order.title,
  description: siteMetadata.order.description,
};

export default function OrderPage() {
  return (
    <main className="page-main-bg">
      <Pricing />
      <OrderFeatures />
    </main>
  );
}
