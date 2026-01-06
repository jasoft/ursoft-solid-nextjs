"use client";
import Link from "next/link";

const SidebarLink = ({ link, activePath }: { link: any, activePath: string }) => {
  return (
    <Link
      href={link.href}
      className={`flex w-full rounded-xs px-3 py-2 text-base text-black dark:text-white ${
        activePath === link.href ? "bg-stroke dark:bg-blackho" : ""
      }`}
    >
      {link.label}
    </Link>
  );
};

export default SidebarLink;