"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  downloadPageContent,
  revSliderContent,
  downloadContent,
} from "@/app/content";
import {
  Download,
  Shield,
  Zap,
  Clock,
  Monitor,
  CheckCircle2,
  Trash2,
  HardDrive,
  Lock,
  Sparkles,
  X,
} from "lucide-react";
import { useState } from "react";

const screenshots = downloadPageContent.gallery.items;

const featureIcons = [Trash2, HardDrive, Zap, Lock];
const features = downloadPageContent.features.map((f, i) => ({
  icon: featureIcons[i],
  title: f.title,
  desc: f.desc,
}));

export default function DownloadContent() {
  const [activeImage, setActiveImage] = useState<null | { src: string; alt: string; title: string }>(null);
  return (
    <main className="page-main-bg pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="bg-primary/10 dark:bg-btndark mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl shadow-lg ring-1 ring-black/5">
              <Image
                src={downloadPageContent.assets.logo}
                alt={downloadPageContent.hero.logoAlt}
                width={64}
                height={64}
              />
            </div>
            <h1 className="mb-4 text-4xl font-bold text-black md:text-5xl dark:text-white">
              {downloadPageContent.hero.title}
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              {downloadPageContent.hero.description}
            </p>
            <motion.a
              href={revSliderContent.downloadUrl}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 rounded-full bg-[#ffbd1f] px-8 py-4 text-lg font-semibold text-[#282828] shadow-lg transition-shadow hover:brightness-110"
            >
              <Download className="h-6 w-6" />
              {downloadPageContent.hero.downloadLabel}
            </motion.a>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <Monitor className="h-4 w-4" />
                {downloadPageContent.hero.badges.os}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {downloadPageContent.hero.badges.trial}
              </span>
              <span className="flex items-center gap-1">
                <Shield className="h-4 w-4" />
                {downloadPageContent.hero.badges.secure}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="border-stroke shadow-solid-3 hover:shadow-solid-4 dark:border-strokedark dark:bg-blacksection rounded-xl border bg-white p-6 text-center"
              >
                <f.icon className="text-primary mx-auto mb-3 h-8 w-8" />
                <h3 className="font-semibold text-black dark:text-white">
                  {f.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Description */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="border-stroke dark:border-strokedark dark:bg-blacksection rounded-2xl border bg-white p-8 shadow-sm"
          >
            <div className="mb-6 flex items-center gap-3">
              <Sparkles className="text-primary h-6 w-6" />
              <h2 className="text-2xl font-bold text-black dark:text-white">
                {downloadPageContent.description.title}
              </h2>
            </div>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              {downloadContent.paragraphs.slice(1, 3).map((t, i) => (
                <p key={i}>{t}</p>
              ))}
              <p className="text-primary flex items-center gap-2 font-medium">
                <CheckCircle2 className="h-5 w-5" />
                {downloadPageContent.description.callout}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Screenshots Gallery */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <h2 className="mb-10 text-center text-3xl font-bold text-black dark:text-white">
            {downloadPageContent.gallery.title}
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 px-2">
            {screenshots.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                viewport={{ once: true, margin: "100px" }}
                className="group border-stroke dark:border-strokedark dark:bg-blacksection overflow-hidden rounded-xl border bg-white p-4 shadow-sm transition-shadow hover:shadow-lg"
              >
                <button onClick={() => setActiveImage(s)} aria-label={downloadPageContent.gallery.modal.closeAriaLabel} className="block w-full cursor-zoom-in">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                    <Image
                      src={s.src}
                      alt={s.alt}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="pt-4 text-center">
                    <h3 className="font-medium text-black dark:text-white">
                      {s.title}
                    </h3>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {activeImage && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4">
          <div className="relative w-[92vw] max-w-5xl">
            <button onClick={() => setActiveImage(null)} aria-label={downloadPageContent.gallery.modal.closeAriaLabel} className="absolute right-3 top-3 rounded-full bg白/90 p-2 text黑 shadow hover:bg白">
              <X className="h-5 w-5" />
            </button>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg黑">
              <Image src={activeImage.src} alt={activeImage.alt} fill className="object-contain" />
            </div>
            <div className="mt-3 text-center text-black dark:text白">
              <h3 className="font-medium">{activeImage.title}</h3>
            </div>
          </div>
          <button className="absolute inset-0 -z-10" onClick={() => setActiveImage(null)} aria-label={downloadPageContent.gallery.modal.closeAriaLabel} />
        </motion.div>
      )}
    </main>
  );
}
