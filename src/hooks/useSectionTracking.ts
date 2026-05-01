"use client";

import { useEffect, useRef } from "react";

export function useSectionTracking(sectionName: string) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let timer: NodeJS.Timeout;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer = setTimeout(() => {
            if (typeof window !== "undefined" && window.umami) {
              window.umami.track("Section View", { name: sectionName });
            }
            observer.unobserve(element);
          }, 1000);
        } else {
          if (timer) clearTimeout(timer);
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    observer.observe(element);

    return () => {
      if (timer) clearTimeout(timer);
      if (element) observer.unobserve(element);
    };
  }, [sectionName]);

  return ref as React.RefObject<HTMLElement>;
}
