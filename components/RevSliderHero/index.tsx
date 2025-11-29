"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

const RevSliderHero = () => {
  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] overflow-hidden bg-[#336699]">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#336699] via-[#2d5a8a] to-[#1e3d5c]" />

      <div className="relative z-10 mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0 pt-35 md:pt-40 lg:pt-45">
        <div className="flex flex-col lg:flex-row items-center lg:items-start">
          {/* Left Content */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 text-white z-20"
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
              className="text-4xl md:text-5xl lg:text-6xl font-medium uppercase tracking-tight mb-4"
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
              className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide mb-8 leading-relaxed"
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
                className="inline-flex items-center gap-3 bg-[#ffbd1f] text-[#282828] px-10 py-4 rounded-xl text-xl font-bold shadow-lg hover:bg-[#ffc933] hover:scale-105 transition-all duration-200"
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
              className="text-sm text-gray-200 tracking-wide leading-6"
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
            className="w-full lg:w-1/2 lg:absolute lg:right-[-200px] lg:top-1/2 lg:-translate-y-1/2"
          >
            <div className="relative w-full max-w-[700px] lg:max-w-[900px] mx-auto lg:mx-0">
              <Image
                src="/images/hero/laptop-slider.png"
                alt="Your Uninstaller! 7 - Windows Uninstaller Software"
                width={1400}
                height={850}
                className="w-full h-auto object-contain"
                priority
                unoptimized
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RevSliderHero;

