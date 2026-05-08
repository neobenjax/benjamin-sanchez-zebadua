"use client";

import { motion } from "framer-motion";
import { profileData } from "@/data/profile";
import { Layers } from "lucide-react";
import { useSectionTracking } from "@/hooks/useSectionTracking";

export default function Toolbox() {
  const sectionRef = useSectionTracking("skills");

  return (
    <section ref={sectionRef} id="toolbox" className="relative py-32 bg-[var(--color-bg-surface)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-8 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-3 bg-accent/10 rounded-full mb-6">
            <Layers className="text-accent w-8 h-8" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[var(--color-text-main)] mb-6">The Toolbox</h2>
          <p className="text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto">
            A dual-track skill array combining technical deployment with deep financial architecture.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {profileData.toolbox.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="glass p-8 md:p-10 rounded-sm border border-[var(--color-border)] dark:border-transparent border-t-[var(--color-border)] dark:border-t-transparent hover:border-t-accent transition-all duration-300 relative group shadow-sm dark:shadow-none bg-[var(--color-bg-base)] dark:bg-transparent"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/5 dark:from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              
              <h3 className="text-2xl font-serif font-bold text-[var(--color-text-main)] mb-8 border-b border-[var(--color-border)] dark:border-white/10 pb-4 relative z-10">
                {category.title}
              </h3>
              
              <ul className="space-y-4 relative z-10">
                {category.skills.map((skill, i) => (
                  <li key={i} className="flex items-center group/item">
                    <span className="w-8 h-[1px] bg-slate-300 dark:bg-white/20 mr-4 group-hover/item:bg-accent group-hover/item:w-10 transition-all duration-300" />
                    <span className="text-[var(--color-text-muted)] font-medium group-hover/item:text-[var(--color-text-main)] transition-colors duration-300 text-lg">
                      {skill}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
