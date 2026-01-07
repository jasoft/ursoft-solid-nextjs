"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const About = ({ importantFeatures }: { importantFeatures: any[] }) => {
  return (
    <>
      {/* <!-- ===== Important Feature #1 Start ===== --> */}
      <section className="overflow-hidden pb-20 lg:pb-25 xl:pb-30 pt-8">
        <div className="mx-auto max-w-c-1235 px-4 md:px-8 xl:px-0">
          <div className="flex items-center gap-8 lg:gap-32.5">
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: -20,
                },

                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_left mx-auto hidden md:block"
            >
              <div className="inline-block overflow-hidden rounded-2xl bg-white p-3 md:p-4 shadow-solid-4 border border-stroke dark:border-strokedark dark:bg-blacksection">
                <Image
                  src={importantFeatures[0].image}
                  alt={importantFeatures[0].title}
                  width={560}
                  height={417}
                  className="rounded-2xl"
                  unoptimized
                />
              </div>
            </motion.div>
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: 20,
                },

                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_right md:w-1/2"
            >
              <h2 className="relative mb-6 text-3xl font-bold text-black dark:text-white xl:text-hero">
                {importantFeatures[0].title}
              </h2>
              <h4 className="font-medium uppercase text-black dark:text-white">
                {importantFeatures[0].subTitle}
              </h4>
              <p>{importantFeatures[0].description}</p>

              
            </motion.div>
          </div>
        </div>
      </section>
      {/* <!-- ===== Important Feature #1 End ===== --> */}

      {/* <!-- ===== Important Feature #2 Start ===== --> */}
      <section>
        <div className="mx-auto max-w-c-1235 overflow-visible px-4 md:px-8 2xl:px-0">
          <div className="flex items-center gap-8 lg:gap-32.5">
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: -20,
                },

                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_left md:w-1/2"
            >
              <h2 className="relative mb-6 text-3xl font-bold text-black dark:text-white xl:text-hero">
                {importantFeatures[1].title}
              </h2>
              <h4 className="font-medium uppercase text-black dark:text-white">
                {importantFeatures[1].subTitle}
              </h4>
              <p>{importantFeatures[1].description}</p>
              <div>
                <a
                  href="/features"
                  className="group mt-7.5 inline-flex items-center gap-2.5 text-black hover:text-primary dark:text-white dark:hover:text-primary"
                >
                  <span className="duration-300 group-hover:pr-2">
                    Learn More
                  </span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="currentColor"
                  >
                    <path d="M10.4767 6.16701L6.00668 1.69701L7.18501 0.518677L13.6667 7.00034L7.18501 13.482L6.00668 12.3037L10.4767 7.83368H0.333344V6.16701H10.4767Z" />
                  </svg>
                </a>
              </div>
            </motion.div>
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: 20,
                },

                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_right mx-auto hidden md:block"
            >
              <div className="relative z-10 inline-block overflow-hidden rounded-2xl bg-white p-3 md:p-4 shadow-solid-4 border border-stroke dark:border-strokedark dark:bg-blacksection">
                <Image
                  src={importantFeatures[1].image}
                  alt={importantFeatures[1].title}
                  width={559}
                  height={419}
                  className="rounded-2xl"
                  unoptimized
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* <!-- ===== Important Feature #2 End ===== --> */}
    </>
  );
};

export default About;
