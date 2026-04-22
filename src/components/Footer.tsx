"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { profileData } from "@/data/profile";

export default function Footer() {
  const mailSubject = encodeURIComponent("Exploration: Bridging Tech & Finance with Benjamin");
  const mailBody = encodeURIComponent("Hi Benjamin, I came across your FinTech Architect portfolio. I’m interested in your dual-core approach—specifically how you’re applying a computing mindset to financial strategy. Are you available for a brief sync regarding [Project/Role]?");

  return (
    <footer className="bg-primary pt-20 pb-12 border-t border-white/5 relative overflow-hidden">
      {/* Decorative subtle background elements */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute left-1/4 top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-[#10B981]/20 to-transparent blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-8 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          
          <div className="flex flex-col">
            <h3 className="text-3xl font-serif text-white font-bold mb-6">
              Let's Engineer Your Strategy.
            </h3>
            <p className="text-gray-300 text-lg mb-8 max-w-md">
              Bringing quantitative rigor and software scaling discipline to holistic wealth and risk management.
            </p>
            <a
              href={`mailto:hello@benjaminsz.com?subject=${mailSubject}&body=${mailBody}`}
              className="inline-flex items-center text-accent font-semibold text-lg hover:text-white transition-colors"
            >
              Reach Out via Email
              <ArrowUpRight className="ml-2 w-5 h-5" />
            </a>
          </div>

          <div className="flex flex-col md:items-end justify-end space-y-4">
            <div className="font-serif text-xl tracking-[0.2em] text-white font-semibold opacity-50 mb-4">
              BENJAMIN <span className="font-sans tracking-normal mx-1">//</span> FINTECH ARCHITECT
            </div>
            {/* FOOTER GROUNDING */}
            <div className="text-gray-300 text-right text-sm">
              <span className="block mb-1 text-white font-medium">Based in Ottawa, ON | Relocated from Mexico.</span>
              Open to local and remote opportunities in FinTech and Financial Strategy.
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} Benjamin Sanchez Zebadua. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 space-x-6">
            <a href={profileData.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">LinkedIn</a>
            <a href={profileData.social.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
