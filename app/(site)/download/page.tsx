import { Metadata } from "next";
import { siteMetadata } from "@/app/content";
import DownloadContent from "./DownloadContent";

export const metadata: Metadata = {
  title: siteMetadata.download.title,
  description: siteMetadata.download.description,
};

export default function DownloadPage() {
  return <DownloadContent />;
}
