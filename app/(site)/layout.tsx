import type { Metadata } from "next";
import { site } from "../content";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Lines from "@/components/Lines";
import ScrollToTop from "@/components/ScrollToTop";
import Providers from "@/components/Providers";
import { Inter } from "next/font/google";
import "../globals.css";
const inter = Inter({ subsets: ["latin"] });

import ToasterContext from "../context/ToastContext";
import { ContentProvider } from "@/app/context/ContentContext";
import * as defaultContent from "@/app/content";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`dark:bg-black ${inter.className}`}>
        <Providers>
          <ContentProvider content={{ ...defaultContent }}>
            <Lines />
            <Header />
            {children}
            <Footer />
            <ScrollToTop />
          </ContentProvider>
        </Providers>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
};
