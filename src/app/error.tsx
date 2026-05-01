"use client";

import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (typeof window !== "undefined" && window.umami) {
      window.umami.track("System Error", { type: "500", path: window.location.pathname });
    }
    // Optionally log to the console in development
    console.error("System Error caught by error boundary:", error);
  }, [error]);

  return (
    <>
      <div className="flex-grow flex flex-col items-center justify-center text-center px-4 py-32 bg-primary">
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">System Anomaly Detected</h1>
        <p className="text-gray-300 mb-12 max-w-2xl">
          An unexpected error occurred during execution. The event has been logged for architectural review.
        </p>
        <button 
          onClick={() => reset()}
          className="px-8 py-4 border border-accent text-accent font-bold rounded-sm text-lg hover:bg-accent hover:text-primary transition-all inline-flex items-center"
        >
          Reinitialize Component
        </button>
      </div>
      <Footer />
    </>
  );
}
