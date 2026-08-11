"use client";

import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import type { FooterAST, FooterColumnAST, FragmentLink } from "@/types/fragments";

interface FragmentFooterProps {
  ast: FooterAST;
}

export default function FragmentFooter({ ast }: FragmentFooterProps) {
  const currentYear = new Date().getFullYear();

  const getGridColsClass = () => {
    switch (ast.layout) {
      case "TWO_COLUMN_LAYOUT":
        return "grid-cols-1 md:grid-cols-2";
      case "FOUR_COLUMN_LAYOUT":
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
      case "CENTERED_FOOTER":
        return "grid-cols-1 text-center";
      case "THREE_COLUMN_LAYOUT":
      default:
        return "grid-cols-1 md:grid-cols-3";
    }
  };

  return (
    <footer className="bg-[var(--color-primary)] pt-16 pb-12 border-t border-[var(--border-subtle)] relative overflow-hidden text-[var(--color-text-primary)]">
      {/* Decorative background glow */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute left-1/3 top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-[var(--color-accent)]/20 to-transparent blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className={`grid ${getGridColsClass()} gap-10 lg:gap-12 mb-12`}>
          {ast.columns.map((col, idx) => (
            <RenderFooterColumn key={idx} column={col} />
          ))}
        </div>

        {/* BOTTOM LEGAL & COPYRIGHT BAR */}
        <div className="border-t border-[var(--border-subtle)] pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-[var(--color-text-secondary)]">
          <p className="mb-4 md:mb-0">
            © {currentYear} Benjamin Sanchez Zebadua. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-widest">
              Agnostic Fragment Engine v1.0
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function RenderFooterColumn({ column }: { column: FooterColumnAST }) {
  return (
    <div className="flex flex-col space-y-4">
      {column.title && (
        <h4 className="font-serif text-lg font-bold text-[var(--color-text-primary)] tracking-wide border-b border-[var(--border-subtle)] pb-2">
          {column.title}
        </h4>
      )}

      {/* TEXT BLOCKS */}
      {column.textBlocks.map((text, idx) => (
        <p key={idx} suppressHydrationWarning className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
          {text}
        </p>
      ))}

      {/* LINKS */}
      <div className="flex flex-col space-y-2.5">
        {column.links.map((link, idx) => (
          <RenderFooterLink key={idx} item={link} />
        ))}
      </div>
    </div>
  );
}

function RenderFooterLink({ item }: { item: FragmentLink }) {
  // Render badge/image links
  if (item.imageUrl) {
    return (
      <a
        href={item.href}
        target={item.isExternal ? "_blank" : "_self"}
        rel={item.isExternal ? "noopener noreferrer" : undefined}
        className="inline-flex items-center hover:opacity-85 transition-opacity my-1"
      >
        <img
          src={item.imageUrl}
          alt={item.imageAlt || item.text}
          className="h-6 object-contain rounded-xs"
        />
      </a>
    );
  }

  // Render mailto email CTA button
  if (item.isMailto) {
    return (
      <a
        href={item.href}
        className="inline-flex items-center text-[var(--color-accent)] font-semibold text-base hover:text-[var(--color-text-primary)] transition-colors group mt-2"
      >
        <Mail className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
        {item.text}
        <ArrowUpRight className="ml-1.5 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </a>
    );
  }

  // Standard Link
  return (
    <Link
      href={item.href}
      target={item.isExternal ? "_blank" : "_self"}
      rel={item.isExternal ? "noopener noreferrer" : undefined}
      className="text-[var(--color-text-secondary)] text-sm hover:text-[var(--color-accent)] transition-colors inline-flex items-center"
    >
      {item.text}
      {item.isExternal && <ArrowUpRight className="ml-1 w-3 h-3 opacity-60" />}
    </Link>
  );
}
