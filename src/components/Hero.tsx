"use client";

import { motion } from "framer-motion";
import { profileData } from "@/data/profile";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);
import { useSectionTracking } from "@/hooks/useSectionTracking";

export default function Hero() {
  const sectionRef = useSectionTracking("hero");

  return (
    <section ref={sectionRef} id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#10B981]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#334155]/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8 lg:px-8 relative z-10 w-full flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-4xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-full mb-8 border border-accent/20"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-medium tracking-wide text-gray-300">
              Current State: Bridging Software Engineering & Financial Strategy
            </span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white leading-tight mb-6 mt-4">
            {profileData.hero.headline}
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10">
            {profileData.hero.subtext}
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col lg:flex-row items-center justify-center w-full max-w-sm lg:max-w-none mx-auto gap-4"
          >
            <a
              href={profileData.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-umami-event="linkedin-connect-hero-click"
              className="group flex items-center justify-center px-8 py-4 bg-[#0077B5] text-white font-bold rounded-sm text-lg hover:saturate-50 hover:scale-[0.98] transition-all w-full lg:w-auto"
            >
              <LinkedinIcon className="mr-3 w-5 h-5" />
              Let's Connect
            </a>
            <Link
              href="/#synergy"
              className="group flex items-center px-8 py-4 bg-accent text-primary font-bold rounded-sm text-lg hover:brightness-110 transition-all w-full lg:w-auto justify-center"
            >
              Explore Synergy
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/#journey"
              className="flex items-center px-8 py-4 glass text-white font-semibold rounded-sm text-lg hover:bg-white/10 transition-all border border-transparent hover:border-white/20 w-full lg:w-auto justify-center"
            >
              View Journey
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
