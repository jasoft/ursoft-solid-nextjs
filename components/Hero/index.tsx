"use client";
import Image from "next/image";
import { Download } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { heroData, heroAlt } from "@/app/content";

const Hero = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section className="overflow-hidden pt-35 pb-20 md:pt-40 xl:pt-46 xl:pb-25">
        <div className="max-w-c-1390 mx-auto px-4 md:px-8 2xl:px-0">
          <div className="flex lg:items-center lg:gap-8 xl:gap-32.5">
            <div className="md:w-1/2">
              <h4 className="mb-4.5 text-lg font-medium text-black dark:text-white">
                {heroData.title}
              </h4>
              <h1 className="xl:text-hero mb-5 pr-16 text-3xl font-bold text-black dark:text-white">
                {heroData.subtitle}
              </h1>
              <p>{heroData.description}</p>

              <div className="mt-10">
                <div className="flex flex-wrap gap-5">
                  <Link
                    aria-label="download cta"
                    href={heroData.primaryButtonUrl}
                    className="inline-flex items-center gap-3 rounded-full bg-primary px-8 py-3 text-white shadow-solid-5 ring-1 ring-primary/30 transition-colors duration-300 ease-in-out hover:bg-primaryho dark:bg-primary dark:hover:bg-primaryho"
                  >
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-white text-primary">
                      <Download className="h-4 w-4" />
                    </span>
                    <span>{heroData.primaryButton}</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="animate_right hidden md:w-1/2 lg:block">
              <div className="relative 2xl:-mr-7.5">
                <Image
                  src="/images/shape/shape-02.svg"
                  alt={heroAlt.shape}
                  width={36.9}
                  height={36.7}
                  className="absolute right-0 bottom-0 z-10"
                />
                <Image
                  src="/images/shape/shape-03.svg"
                  alt={heroAlt.shape}
                  width={21.64}
                  height={21.66}
                  className="absolute -right-6.5 bottom-0 z-1"
                />
                <div className="relative aspect-700/444 w-full">
                  <Image
                    className="shadow-amber-50"
                    src={heroData.image}
                    alt={heroAlt.hero}
                    fill
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
