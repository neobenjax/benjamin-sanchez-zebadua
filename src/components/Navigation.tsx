"use client";

import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Synergy", href: "/#synergy" },
  { name: "Journey", href: "/#journey" },
  { name: "Leadership", href: "/#purpose-driven" },
  { name: "Insights", href: "/#insights" },
  { name: "Toolbox", href: "/#toolbox" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <nav className="fixed w-full z-[100] glass border-b border-black/5 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-8 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink flex-1 max-w-[75%] sm:max-w-none mr-4">
            <Link href="/" className="font-serif text-[clamp(0.85rem,2.5vw,1.25rem)] leading-tight tracking-normal md:tracking-wide lg:tracking-[0.2em] text-slate-900 dark:text-white font-semibold flex flex-wrap items-center">
              <span>BENJAMIN</span> <span className="opacity-50 font-sans tracking-normal mx-1 md:mx-2 text-slate-500 dark:text-white">//</span> <span>FINTECH ARCHITECT</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <div className="flex items-baseline space-x-6 xl:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="flex items-center space-x-4 border-l border-slate-300 dark:border-white/10 pl-6">
              {mounted && (
                <button
                  onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
                  className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-gray-300 transition-colors"
                  aria-label="Toggle Theme"
                >
                  {currentTheme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              )}
              <a
                href="/benjamin-cv.pdf"
                download
                className="px-6 py-2.5 rounded-sm bg-accent text-white dark:text-primary font-semibold text-sm hover:brightness-110 transition-all whitespace-nowrap"
              >
                Download CV
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white focus:outline-none"
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
            className="lg:hidden glass overflow-hidden border-t border-black/5 dark:border-white/10"
          >
            <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3 flex flex-col">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-black/5 dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/5"
                >
                  {item.name}
                </Link>
              ))}
              
              {mounted && (
                <button
                  onClick={() => {
                    setTheme(currentTheme === "dark" ? "light" : "dark");
                    setIsOpen(false);
                  }}
                  className="flex items-center px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-black/5 dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/5 text-left"
                >
                  {currentTheme === "dark" ? (
                    <><Sun className="w-5 h-5 mr-3" /> Light Mode</>
                  ) : (
                    <><Moon className="w-5 h-5 mr-3" /> Dark Mode</>
                  )}
                </button>
              )}

              <a
                href="/benjamin-cv.pdf"
                download
                className="block px-3 py-3 mt-4 text-center rounded-sm bg-accent text-white dark:text-primary font-bold text-base hover:brightness-110 transition-all"
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
