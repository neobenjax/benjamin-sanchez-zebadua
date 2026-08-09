"use client";

import { useState } from "react";
import { Menu, X, Download } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { HeaderAST, FragmentLink } from "@/types/fragments";

interface FragmentHeaderProps {
  ast: HeaderAST;
}

export default function FragmentHeader({ ast }: FragmentHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] glass border-b border-white/10 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* LEFT / BRANDING SLOT */}
          <div className="flex-shrink flex-1 max-w-[75%] sm:max-w-none mr-4 flex items-center space-x-3">
            {ast.branding.map((brand, idx) => (
              <RenderBrandItem key={idx} item={brand} />
            ))}
          </div>

          {/* RIGHT / DESKTOP NAVIGATION SLOT */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <nav className="flex items-center space-x-6 xl:space-x-8" aria-label="Main Navigation">
              {ast.navigation.map((item, idx) => (
                <RenderNavLink key={idx} item={item} />
              ))}
            </nav>

            {/* ACTIONS (CTA / DOWNLOAD CV) */}
            {ast.actions.map((action, idx) => (
              <RenderActionButton key={idx} item={action} />
            ))}
          </div>

          {/* MOBILE MENU TOGGLE BUTTON */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-sm text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-accent"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE SLIDE-OUT MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden glass border-t border-white/10 overflow-hidden"
          >
            <div className="px-6 pt-4 pb-6 space-y-3 flex flex-col">
              {ast.navigation.map((item, idx) => (
                <RenderNavLink key={idx} item={item} isMobile onClick={() => setIsOpen(false)} />
              ))}
              {ast.actions.map((action, idx) => (
                <RenderActionButton key={idx} item={action} isMobile onClick={() => setIsOpen(false)} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function RenderBrandItem({ item }: { item: FragmentLink }) {
  if (item.imageUrl) {
    return (
      <Link href={item.href} className="inline-flex items-center group">
        <Image
          src={item.imageUrl}
          alt={item.imageAlt || "Website Logo"}
          width={32}
          height={32}
          className="w-8 h-8 object-contain mr-3 group-hover:scale-105 transition-transform"
        />
        <span className="text-lg tracking-[0.15em] text-white font-semibold group-hover:text-accent transition-colors">
          {item.text || "BENJAMIN"}
        </span>
      </Link>
    );
  }

  return (
    <Link href={item.href} className="text-[clamp(0.85rem,2.5vw,1.25rem)] leading-tight tracking-normal md:tracking-wide lg:tracking-[0.2em] text-white font-semibold flex flex-wrap items-center">
      <span>{item.text}</span>
    </Link>
  );
}

function RenderNavLink({
  item,
  isMobile,
  onClick,
}: {
  item: FragmentLink;
  isMobile?: boolean;
  onClick?: () => void;
}) {
  if (isMobile) {
    return (
      <Link
        href={item.href}
        onClick={onClick}
        className="block px-3 py-2.5 rounded-sm text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
      >
        {item.text}
      </Link>
    );
  }

  return (
    <Link
      href={item.href}
      className="text-sm font-medium text-gray-300 hover:text-accent transition-colors"
    >
      {item.text}
    </Link>
  );
}

function RenderActionButton({
  item,
  isMobile,
  onClick,
}: {
  item: FragmentLink;
  isMobile?: boolean;
  onClick?: () => void;
}) {
  if (isMobile) {
    return (
      <a
        href={item.href}
        download={item.isDownload}
        onClick={onClick}
        className="mt-3 w-full inline-flex items-center justify-center px-4 py-3 rounded-sm bg-accent text-primary font-bold text-base hover:brightness-110 transition-all shadow-md"
      >
        {item.isDownload && <Download className="w-4 h-4 mr-2" />}
        {item.text}
      </a>
    );
  }

  return (
    <a
      href={item.href}
      download={item.isDownload}
      className="inline-flex items-center px-5 py-2.5 rounded-sm bg-accent text-primary font-semibold text-sm hover:brightness-110 transition-all shadow-sm whitespace-nowrap"
    >
      {item.isDownload && <Download className="w-4 h-4 mr-2" />}
      {item.text}
    </a>
  );
}
