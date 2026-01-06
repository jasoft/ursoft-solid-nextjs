"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    // Optional: Redirect to a more generic error page or homepage after some time
    // For now, let's just display the 404 content
    // router.replace('/');
  }, [router]);

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
        404 - 页面未找到
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">
        抱歉，您要查找的页面不存在。
      </p>
      <Link href="/" className="mt-6 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
        返回首页
      </Link>
    </div>
  );
}