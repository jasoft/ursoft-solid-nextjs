"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { revSliderContent } from "@/app/content";

const RevSliderHero = () => {
  return (
    <section className="relative overflow-hidden bg-[#235699] h-[640px] md:h-[720px] lg:h-[820px] 2xl:h-[900px]">
      
      <div className="max-w-c-1390 relative z-10 mx-auto h-full px-4 md:px-8 2xl:px-0">
        <div className="flex h-full flex-col items-center lg:flex-row">
          {/* Left Content */}
          <div className="z-20 w-full pt-[120px] text-white lg:mt-[40px] lg:w-1/2 lg:pt-0">
            <h1
              className="mb-4 text-4xl leading-[44px] md:leading-[54px] lg:leading-[70px] font-medium tracking-[-1px] uppercase md:text-5xl lg:text-[61px]"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {revSliderContent.title}
            </h1>

            {/* Subtitle */}
            <h2
              className="mt-8 mb-8 text-2xl leading-[34px] md:mt-10 md:mb-10 md:leading-[40px] font-medium tracking-[1px] md:text-3xl lg:text-[47px]"
              style={{ fontFamily: "'Roboto', sans-serif" }}
            >
              {revSliderContent.subtitle.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  {i === 0 && <br />}
                </span>
              ))}
            </h2>

            {/* Download Button */}
            <div className="mb-6">
              <Link
                href={revSliderContent.downloadUrl}
                className="mt-20 inline-flex items-center gap-3 rounded-xl bg-[#ffbd1f] px-14 py-4 text-[22px] font-bold text-[#282828] shadow-[0_11px_11px_rgba(0,0,0,0.2)] transition-all duration-100 hover:scale-110 hover:bg-[#ffbd1f] hover:brightness-110"
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

          {/* Right Content - Laptop Image */}
          <div className="absolute top-[12px] right-[-420px] 2xl:right-[-585px] hidden lg:block">
            <Image
              src="/images/hero/laptop-slider.png"
              alt={revSliderContent.laptopAlt}
              width={1400}
              height={850}
              className="h-[560px] w-[920px] md:h-[600px] md:w-[980px] lg:h-[656px] lg:w-[1080px] 2xl:h-[850px] 2xl:w-[1400px] object-contain"
              sizes="(max-width: 1024px) 100vw, 100vw"
              decoding="async"
              loading="lazy"
              fetchPriority="low"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RevSliderHero;
