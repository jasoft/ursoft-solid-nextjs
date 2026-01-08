"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

const RevSliderHero = ({ revSliderContent }: { revSliderContent: any }) => {
  return (
    <section className="relative h-[640px] overflow-hidden bg-[#235699] md:h-[720px] lg:h-[820px] 2xl:h-[900px]">
      <div className="absolute inset-0 z-0">
        <Image
          src={revSliderContent.laptopSrc}
          alt={revSliderContent.laptopAlt}
          fill
          className="object-cover"
          priority
          placeholder="blur"
          blurDataURL="data:image/webp;base64,UklGRlIAAABXRUJQVlA4IE4AAADwAQCdASoQAAgAAUAmJaQAA3AA/v89WAAAAA=="
        />
        {/* Optional overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="max-w-c-1390 relative z-10 mx-auto h-full px-4 md:px-8 2xl:px-0">
        <div className="flex h-full flex-col items-center justify-center">
          {/* Content */}
          <div className="w-full text-center text-white">
            <h1
              className="mb-4 text-4xl leading-[44px] font-medium tracking-[-1px] uppercase md:text-5xl md:leading-[54px] lg:text-[61px] lg:leading-[70px]"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {revSliderContent.title}
            </h1>

            {/* Subtitle */}
            <h2
              className="mt-8 mb-8 text-2xl leading-[34px] font-medium tracking-[1px] md:mt-10 md:mb-10 md:text-3xl md:leading-[40px] lg:text-[47px] lg:leading-[1.2]"
              style={{ fontFamily: "'Roboto', sans-serif" }}
            >
              {revSliderContent.subtitle.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  {i < revSliderContent.subtitle.split("\n").length - 1 && (
                    <br />
                  )}
                </span>
              ))}
            </h2>

            {/* Download Button */}
            <div className="mb-6 flex justify-center">
              <Link
                href={revSliderContent.downloadUrl}
                className="inline-flex items-center gap-3 rounded-xl bg-[#ffbd1f] px-14 py-4 text-[22px] font-bold text-[#282828] shadow-[0_11px_11px_rgba(0,0,0,0.2)] transition-all duration-100 hover:scale-110 hover:bg-[#ffbd1f] hover:brightness-110"
              >
                <span>{revSliderContent.downloadLabel}</span>
                <Download className="h-5 w-5" />
              </Link>
            </div>

            {/* Version Info */}
            <p
              className="text-sm leading-6 tracking-[1px] text-[#e5e5e5]"
              style={{ fontFamily: "'Roboto', sans-serif" }}
            >
              {revSliderContent.versionInfo.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  {i === 0 && <br />}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RevSliderHero;
