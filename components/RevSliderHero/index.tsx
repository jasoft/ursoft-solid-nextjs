"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

const RevSliderHero = () => {
  return (
    <section className="relative h-[900px] overflow-hidden bg-[#336699]">
      <div className="max-w-c-1390 relative z-10 mx-auto h-full px-4 md:px-8 2xl:px-0">
        <div className="flex h-full flex-col items-center lg:flex-row">
          {/* Left Content */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8 }}
            className="z-20 w-full pt-[120px] text-white lg:mt-[40px] lg:w-1/2 lg:pt-0"
          >
            {/* Main Title */}
            <motion.h1
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 },
              }}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-4 text-4xl leading-[70px] font-medium tracking-[-1px] uppercase md:text-5xl lg:text-[61px]"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Your Uninstaller! 7
            </motion.h1>

            {/* Subtitle */}
            <motion.h2
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0 },
              }}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-10 text-2xl leading-[40px] font-medium tracking-[1px] md:text-3xl lg:text-[47px]"
              style={{ fontFamily: "'Roboto', sans-serif" }}
            >
              Uninstall any unwanted app <br />
              completely!
            </motion.h2>

            {/* Download Button */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-6"
            >
              <Link
                href="https://www.ursoftware.com/dlds/yusetup.exe"
                className="inline-flex items-center gap-3 rounded-xl bg-[#ffbd1f] px-14 py-4 text-[22px] font-bold text-[#282828] shadow-[0_11px_11px_rgba(0,0,0,0.2)] transition-all duration-100 hover:scale-110 hover:bg-[#ffbd1f] hover:brightness-110"
              >
                <span>DOWNLOAD NOW</span>
                <Download className="h-5 w-5" />
              </Link>
            </motion.div>

            {/* Version Info */}
            <motion.p
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-sm leading-6 tracking-[1px] text-[#e5e5e5]"
              style={{ fontFamily: "'Roboto', sans-serif" }}
            >
              Supports Windows 11/10/8/7/Vista/XP
              <br />
              Current Version: 7.5
            </motion.p>
          </motion.div>

          {/* Right Content - Laptop Image */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0 },
            }}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute top-[30px] right-[-585px] hidden lg:block"
          >
            <Image
              src="/images/hero/laptop-slider.png"
              alt="Your Uninstaller! 7 - Windows Uninstaller Software"
              width={1400}
              height={850}
              className="h-[850px] w-[1400px] object-contain"
              priority
              unoptimized
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RevSliderHero;
