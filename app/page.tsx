"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Check user's preferred language
    const language = navigator.language || (navigator as any).userLanguage;

    // Simple detection: if it contains 'zh', go to /zh, else /en
    if (language && language.toLowerCase().includes("zh")) {
      router.replace("/zh");
    } else {
      router.replace("/en");
    }
  }, [router]);

  // Return empty or a loading spinner while redirecting
  return null;
}
