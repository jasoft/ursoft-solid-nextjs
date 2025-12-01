"use client";
import Image from "next/image";
import SectionHeader from "../Common/SectionHeader";
import { pricingHeader, pricingOptions, pricingLabels } from "@/app/content";
import { BadgeCheck } from "lucide-react";
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
          <div className="flex flex-wrap justify-center gap-7.5 lg:flex-nowrap xl:gap-12.5">
            {pricingOptions.map((plan, idx) => (
              <div
                key={idx}
                className={`animate_top group relative rounded-lg border bg-white p-7.5 md:w-[45%] lg:w-1/3 xl:p-12.5 dark:bg-blacksection ${
                  plan.badge
                    ? "border-primary shadow-solid-10"
                    : "border-stroke dark:border-strokedark shadow-solid-10 dark:shadow-none"
                }`}
              >
                {plan.badge ? (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                    {plan.badge}
                  </div>
                ) : null}
                <h4 className="mb-2.5 text-xl font-semibold text-black dark:text-white">
                  {plan.title}
                </h4>
                {plan.subtitle ? (
                  <p className="mb-5 text-sm text-black/70 dark:text-manatee">
                    {plan.subtitle}
                  </p>
                ) : null}
                <h3 className="mb-2 text-3xl font-bold text-black dark:text-white xl:text-sectiontitle3">
                  {plan.price}
                </h3>
                <p className="text-sm text-primary">{pricingLabels.oneTimeNote}</p>
                <div className="mt-9 border-t border-stroke pt-9 pb-12.5 dark:border-strokedark">
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
                          <div className="flex items-start gap-2">
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="mt-0.5 shrink-0 text-primary"
                            >
                              <path
                                d="M20 6L9 17L4 12"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="flex flex-col items-start">
                              <span>{b}</span>
                              {highlight ? (
                                <span className="bg-green-500/10 text-green-600 mt-2 inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs">
                                  <BadgeCheck className="h-3 w-3" />
                                  <span>{pricingLabels.lifetimeTag}</span>
                                </span>
                              ) : null}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <a
                  href={plan.buyUrl || "/order"}
                  className="group/btn inline-flex w-full items-center justify-center gap-2.5 rounded-md bg-primary px-4 py-3 font-medium text-white transition-all duration-300 hover:bg-primary/90"
                >
                  <span className="duration-300 group-hover/btn:pr-2">
                    {pricingLabels.buyButton}
                  </span>
                  <svg
                    width="16"
                    height="16"
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
