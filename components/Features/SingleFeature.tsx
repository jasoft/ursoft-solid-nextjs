import React from "react";
import { Feature } from "@/types/feature";
import Image from "next/image";
import { motion } from "framer-motion";

const SingleFeature = ({ feature, idx }: { feature: Feature; idx?: number }) => {
  const { icon, title, description } = feature;
  const palette = [
    { bg: "bg-blue-500 group-hover:bg-blue-600" },
    { bg: "bg-sky-500 group-hover:bg-sky-600" },
    { bg: "bg-blue-600 group-hover:bg-blue-700" },
    { bg: "bg-sky-600 group-hover:bg-sky-700" },
    { bg: "bg-blue-700 group-hover:bg-blue-800" },
    { bg: "bg-blue-900 group-hover:bg-blue-800" },
  ];
  const baseIndex = typeof (feature as any).id === "number" ? (feature as any).id - 1 : 0;
  const pal = palette[((idx ?? baseIndex) % palette.length + palette.length) % palette.length];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="group animate_top shadow-solid-3 hover:shadow-solid-6 dark:border-strokedark dark:bg-blacksection dark:hover:bg-hoverdark z-40 rounded-lg border border-white bg-white p-7.5 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.03] xl:p-12.5"
      >
        <div className={`relative flex h-16 w-16 items-center justify-center rounded-[10px] ${pal.bg} transition-all duration-300`}>
          <Image src={icon} width={36} height={36} alt={title} className="invert" />
        </div>
        <h3 className="xl:text-itemtitle mt-7.5 mb-5 text-xl font-semibold text-black dark:text-white">
          {title}
        </h3>
        <p>{description}</p>
      </motion.div>
    </>
  );
};

export default SingleFeature;
