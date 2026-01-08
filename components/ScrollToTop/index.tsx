"use client";
import { useEffect, useState } from "react";

export default function ScrollToTop({
  accessibilityTexts,
}: {
  accessibilityTexts?: any;
}) {
  // Fallback if not provided, though ideally it should be provided
  const texts = accessibilityTexts || {
    scrollToTopAria: "Scroll to top",
    scrollToTopSrOnly: "Scroll to top",
  };
  const [isVisible, setIsVisible] = useState(false);

  // Top: 0 takes us all the way back to the top of the page
  // Behavior: smooth keeps it smooth!
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    return () => {};
  };

  useEffect(() => {
    // Button is displayed after scrolling for 500 pixels
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div suppressHydrationWarning className="fixed right-8 bottom-8 z-99">
      {isVisible && (
        <div
          onClick={scrollToTop}
          aria-label={texts.scrollToTopAria}
          className="hover:shadow-signUp bg-primary hover:bg-primary/80 flex h-10 w-10 cursor-pointer items-center justify-center rounded-xs text-white shadow-md transition duration-300 ease-in-out"
        >
          <span className="mt-[6px] h-3 w-3 rotate-45 border-t border-l border-white"></span>
          <span className="sr-only">{texts.scrollToTopSrOnly}</span>
        </div>
      )}
    </div>
  );
}
