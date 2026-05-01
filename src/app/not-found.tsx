"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function NotFound() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.umami) {
      window.umami.track("System Error", { type: "404", path: window.location.pathname });
    }
  }, []);

  return (
    <>
      <div className="flex-grow flex flex-col items-center justify-center text-center px-4 py-32 bg-primary">
        <h1 className="text-6xl md:text-8xl font-serif font-bold text-white mb-6">404</h1>
        <h2 className="text-2xl md:text-3xl text-gray-300 mb-8 max-w-2xl">
          The requested trajectory cannot be calculated.
        </h2>
        <p className="text-gray-400 mb-12 max-w-xl">
          This URL pathway doesn't exist in the current architecture. It may have been deprecated or never existed.
        </p>
        <Link 
          href="/" 
          className="px-8 py-4 bg-accent text-primary font-bold rounded-sm text-lg hover:brightness-110 transition-all inline-flex items-center"
        >
          Return to Hub
        </Link>
      </div>
      <Footer />
    </>
  );
}
