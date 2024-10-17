"use client";

import Script from "next/script";
import React, { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    googletag: {
      cmd: any[];
      display: (id: string) => void;
      pubads: () => { refresh: () => void };
    };
  }
}

type AdBannerTypes = {
  dataAdId: string;
  width: number;
  height: number;
};
const AdCustom = ({ dataAdId, width, height }: AdBannerTypes) => {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const elementRef = useRef(null);

  // useEffect(() => {
  //   if(isVisible){
  //     return;
  //   }
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       if (entries[0].isIntersecting) {
  //         setIsVisible(true);
  //         if (typeof window !== "undefined") {
  //           window.googletag = window.googletag || { cmd: [] };
  //           window.googletag.cmd.push(async function () {
  //             // window.googletag.pubads().refresh();
  //             window.googletag.display(dataAdId);
  //           });
  //         }
  //         observer.disconnect();
  //       }
  //     },
  //     {
  //       root: null, // Use the viewport as the root
  //       rootMargin: "0px",
  //       threshold: 0.1, // Trigger when 5% of the component is visible
  //     }
  //   );

  //   if (elementRef.current) {
  //     observer.observe(elementRef.current);
  //   }

  //   return () => {
  //     if (observer && observer.unobserve) {
  //       elementRef.current && observer.unobserve(elementRef.current);
  //     }
  //   };
  // }, [isVisible]);

  useEffect(() => {
    try {
      if (!mounted) {
        return;
      }
      if (typeof window !== "undefined") {
        window.googletag = window.googletag || { cmd: [] };
        window.googletag.cmd.push(async function () {
          window.googletag.display(dataAdId);
        });
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }, [mounted]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  return (
    <div
      className="flex justify-center"
      style={{ minWidth: width, minHeight: height }}
      ref={elementRef}
    >
      <div
        id={dataAdId}
        className="flex justify-center"
        style={{ minWidth: width, minHeight: height }}
      >
        {/* <Script
            type="module"
            async={true}
            id="googletag-script"
            strategy="lazyOnload"
            src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
          >
          </Script> */}
      </div>
    </div>
  );
};

export default AdCustom;
