"use client";

import { motion } from "framer-motion";
import Image from "next/image";
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
} from "lucide-react";

const screenshots = [
  { src: "https://ursoftware.com/wp-content/uploads/2023/03/yu_main.png", alt: "Main Interface", title: "Main Interface" },
  { src: "https://ursoftware.com/wp-content/uploads/2023/03/yu_uninstallmodes.png", alt: "Uninstall Modes", title: "Uninstall Modes" },
  { src: "https://ursoftware.com/wp-content/uploads/2023/03/yu_scanning.png", alt: "Scanning", title: "Deep Scanning" },
  { src: "https://ursoftware.com/wp-content/uploads/2023/03/yu_startup.png", alt: "Startup Manager", title: "Startup Manager" },
  { src: "https://ursoftware.com/wp-content/uploads/2023/03/yu_diskcleaner.png", alt: "Disk Cleaner", title: "Disk Cleaner" },
  { src: "https://ursoftware.com/wp-content/uploads/2023/03/yu_shredder.png", alt: "File Shredder", title: "File Shredder" },
];

const features = [
  { icon: Trash2, title: "Complete Uninstall", desc: "Remove programs entirely" },
  { icon: HardDrive, title: "Registry Cleanup", desc: "Clean leftover entries" },
  { icon: Zap, title: "Fast & Efficient", desc: "Lightning-fast scanning" },
  { icon: Lock, title: "App Lock", desc: "Protect important apps" },
];

export default function DownloadContent() {
  return (
    <main className="pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-purple-50 to-white py-20 dark:from-purple-950/20 dark:to-black">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
              <Image src="https://www.ursoftware.com/wp-content/uploads/2023/03/yulogo_96.png" alt="Your Uninstaller Logo" width={64} height={64} unoptimized />
            </div>
            <h1 className="mb-4 text-4xl font-bold text-black dark:text-white md:text-5xl">Your Uninstaller! 7</h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              The world&apos;s most popular uninstaller utility. Completely remove any program from your Windows PC - no trace left behind.
            </p>
            <motion.a
              href="https://www.ursoftware.com/dlds/yusetup.exe"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-shadow hover:shadow-xl"
            >
              <Download className="h-6 w-6" />
              Download Free Trial
            </motion.a>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1"><Monitor className="h-4 w-4" />Windows 11/10/8/7</span>
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" />21-day Free Trial</span>
              <span className="flex items-center gap-1"><Shield className="h-4 w-4" />Safe & Secure</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <f.icon className="mx-auto mb-3 h-8 w-8 text-purple-600" />
                <h3 className="font-semibold text-black dark:text-white">{f.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Description */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="mb-6 flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-black dark:text-white">Why Choose Your Uninstaller?</h2>
            </div>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>Your Uninstaller works the way you think, making it easier to uninstall programs quickly, efficiently, and ultimately. With an advanced system scanning algorithm, it can easily remove any program - entirely, no trace left.</p>
              <p>Manage applications on your PC: lock apps from accidental removal, change default icons, write comments, save registration keys, and always know newly installed programs.</p>
              <p className="flex items-center gap-2 font-medium text-purple-600 dark:text-purple-400">
                <CheckCircle2 className="h-5 w-5" />Right-click any desktop icon and select uninstall - it&apos;s that simple!
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Screenshots Gallery */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <h2 className="mb-10 text-center text-3xl font-bold text-black dark:text-white">Screenshots Gallery</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {screenshots.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} viewport={{ once: true }}
                className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
                <a href={s.src} target="_blank" rel="noopener noreferrer">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={s.src} alt={s.alt} fill className="object-cover transition-transform group-hover:scale-105" unoptimized />
                  </div>
                  <div className="p-4 text-center"><h3 className="font-medium text-black dark:text-white">{s.title}</h3></div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 text-center md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 p-10 text-white shadow-xl">
            <h2 className="mb-4 text-3xl font-bold">Try Before You Buy</h2>
            <p className="mb-6 text-lg opacity-90">We offer a 21-day trial period with all features. If you wish to use the software after that period, please purchase a license.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="https://www.ursoftware.com/dlds/yusetup.exe" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-purple-600 shadow transition-transform hover:scale-105">
                <Download className="h-5 w-5" />Download Now
              </a>
              <a href="/order" className="inline-flex items-center gap-2 rounded-full border-2 border-white px-6 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-purple-600">
                Purchase License
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

