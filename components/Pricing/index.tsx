"use client";
import Image from "next/image";
import SectionHeader from "../Common/SectionHeader";
import { pricingHeader, pricingOptions, pricingLabels } from "@/app/content";
// static pricing only

const Pricing = () => {
  return (
    <>
      {/* <!-- ===== Pricing Table Start ===== --> */}
      <section
        id="pricing"
        className="overflow-hidden pt-15 pb-20 lg:pb-25 xl:pb-30"
      >
        <div className="max-w-c-1315 mx-auto px-4 md:px-8 xl:px-0">
          {/* <!-- Section Title Start --> */}
          <div className="animate_top mx-auto text-center">
            <SectionHeader headerInfo={pricingHeader} />
          </div>
          {/* <!-- Section Title End --> */}
        </div>

        <div className="relative mx-auto mt-15 max-w-[1207px] px-4 md:px-8 xl:mt-20 xl:px-0">
          <div className="absolute -bottom-15 -z-1 h-full w-full">
            <Image
              fill
              src="/images/shape/shape-dotted-light.svg"
              alt="Dotted"
              className="dark:hidden"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-7.5 lg:flex-nowrap xl:gap-12.5">
            {pricingOptions.map((plan, idx) => (
              <div
                key={idx}
                className="animate_top group border-stroke shadow-solid-10 dark:border-strokedark dark:bg-blacksection relative rounded-lg border bg-white p-7.5 md:w-[45%] lg:w-1/3 xl:p-12.5 dark:shadow-none"
              >
                <h3 className="xl:text-sectiontitle3 mb-7.5 text-3xl font-bold text-black dark:text-white">
                  {plan.price}
                </h3>
                <h4 className="text-para2 mb-2.5 font-medium text-black dark:text-white">
                  {plan.title}
                </h4>
                <div className="border-stroke dark:border-strokedark mt-9 border-t pt-9 pb-12.5">
                  <ul>
                    {plan.bullets.map((b, i) => {
                      const highlight = /All upgrades are free/i.test(b);
                      return (
                        <li
                          key={i}
                          className={`mb-4 last:mb-0 ${
                            highlight
                              ? "text-primary font-semibold"
                              : "dark:text-manatee text-black"
                          }`}
                        >
                          {b}
                          {highlight ? (
                            <span className="bg-primary/10 text-primary ml-2 inline-flex items-center rounded-full px-2 py-0.5 text-xs">
                              {pricingLabels.lifetimeTag}
                            </span>
                          ) : null}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <a
                  href={plan.buyUrl || "/order"}
                  className="group/btn text-primary dark:hover:text-primary inline-flex items-center gap-2.5 font-medium transition-all duration-300 dark:text-white"
                >
                  <span className="duration-300 group-hover/btn:pr-2">
                    {pricingLabels.buyButton}
                  </span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.4767 6.16701L6.00668 1.69701L7.18501 0.518677L13.6667 7.00034L7.18501 13.482L6.00668 12.3037L10.4767 7.83368H0.333344V6.16701H10.4767Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* <!-- ===== Pricing Table End ===== --> */}
    </>
  );
};

export default Pricing;
