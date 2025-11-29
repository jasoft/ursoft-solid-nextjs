import React from "react";
import Contact from "@/components/Contact";
import { supportContent } from "@/app/content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support - Your Uninstaller! 7",

  // other metadata
  description: "This is Support page for Your Uninstaller! 7"
};

const SupportPage = () => {
  return (
    <div className="pb-20 pt-40">
      <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0 mb-10">
        <h1 className="mb-4 text-3xl font-bold text-black dark:text-white">
          {supportContent.title}
        </h1>
        {supportContent.intro.map((p, i) => (
          <p key={i} className="mb-3">
            {p}
          </p>
        ))}
        <a
          href={supportContent.lostKeyUrl}
          className="inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white hover:opacity-90 dark:bg-white dark:text-black"
        >
          Get My Key
        </a>
      </div>
      <Contact />
    </div>
  );
};

export default SupportPage;
