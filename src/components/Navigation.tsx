"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Synergy", href: "/#synergy" },
  { name: "Journey", href: "/#journey" },
  { name: "Insights", href: "/#insights" },
  { name: "Toolbox", href: "/#toolbox" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-8 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink flex-1 max-w-[70%] sm:max-w-none">
            <Link href="/" className="font-serif text-base md:text-xl tracking-[0.1em] md:tracking-[0.2em] text-white font-semibold flex flex-wrap items-center">
              <span>BENJAMIN</span> <span className="opacity-50 font-sans tracking-normal mx-1 hidden sm:inline">//</span><span className="opacity-50 font-sans tracking-normal mx-1 sm:hidden"> </span> <span>FINTECH ARCHITECT</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-baseline space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <a
              href="/benjamin-cv.pdf"
              download
              className="px-6 py-2.5 rounded-sm bg-accent text-primary font-semibold text-sm hover:brightness-110 transition-all whitespace-nowrap"
            >
              Download CV
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass overflow-hidden border-t border-white/10"
          >
            <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3 flex flex-col">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-3 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5"
                >
                  {item.name}
                </Link>
              ))}
              <a
                href="/benjamin-cv.pdf"
                download
                className="block px-3 py-3 mt-4 text-center rounded-sm bg-accent text-primary font-bold text-base hover:brightness-110 transition-all"
              >
                Download CV
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
