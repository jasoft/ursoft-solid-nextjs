"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { pricingIntro, pricingImageAlt } from "@/app/content";
import {
  Trash2,
  HardDrive,
  ShieldCheck,
  Zap,
  RefreshCw,
  Headphones,
  Globe,
  Download,
  Mail,
  Clock,
  CreditCard,
} from "lucide-react";

const featureIcons = [Trash2, HardDrive, ShieldCheck, Zap, RefreshCw, Headphones];

export default function OrderFeatures() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        {/* Hero Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Globe className="h-4 w-4" />
            {pricingIntro.claimTitle}
          </div>
          <div className="flex items-center justify-center gap-3 text-3xl font-bold text-black dark:text-white md:text-4xl">
            <Download className="h-8 w-8 text-primary" />
            <span>{pricingIntro.claimStats}</span>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pricingIntro.bullets.map((bullet, i) => {
            const Icon = featureIcons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-start gap-4 rounded-xl border border-stroke bg-white p-5 shadow-solid-3 transition-all hover:shadow-solid-4 dark:border-strokedark dark:bg-blacksection"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <p className="text-sm font-medium text-black dark:text-white">{bullet}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Key Delivery Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-8 rounded-2xl border border-stroke bg-gradient-to-r from-primary/5 to-transparent p-6 dark:border-strokedark dark:bg-blacksection"
        >
          <div className="flex flex-col items-center gap-4 text-center md:flex-row md:text-left">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Mail className="h-7 w-7 text-primary" />
            </div>
            <div className="flex-1">
              <div className="mb-1 flex items-center justify-center gap-2 md:justify-start">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-primary">{pricingIntro.instantDeliveryLabel}</span>
              </div>
              <p className="text-black dark:text-white">{pricingIntro.keyDelivery}</p>
            </div>
          </div>
        </motion.div>

        {/* Payment & Guarantee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="rounded-2xl border border-stroke bg-white p-8 shadow-solid-3 dark:border-strokedark dark:bg-blacksection"
        >
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className="flex items-center justify-center">
              <Image
                src="/images/pricing/guarantee.png"
                alt={pricingImageAlt.guarantee}
                width={512}
                height={256}
                className="h-16 w-auto md:h-20"
              />
            </div>
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-5 py-2.5 text-sm font-semibold text-green-700 dark:bg-green-900/20 dark:text-green-400">
                <ShieldCheck className="h-16 w-16" />
                <span className="text-xl">{pricingIntro.guarantee}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
