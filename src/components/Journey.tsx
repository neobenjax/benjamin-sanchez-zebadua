"use client";

import { motion } from "framer-motion";
import { profileData } from "@/data/profile";
import { Briefcase, GraduationCap } from "lucide-react";
import Link from "next/link";

export default function Journey() {
  return (
    <section id="journey" className="relative py-32 bg-[#081426]">
      <div className="max-w-7xl mx-auto px-8 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            Journey Timeline
          </h2>
          <div className="flex flex-col items-center">
            <p className="text-xl text-gray-300 max-w-2xl text-center">
              The evolution from engineering high-traffic architecture to structuring holistic wealth strategies.
            </p>
            <Link 
              href="/entry/001-vibecoding-workflow" 
              className="mt-6 inline-flex items-center px-5 py-2.5 glass border border-accent/20 rounded-sm text-sm text-accent hover:bg-white/5 hover:border-accent/40 transition-all group"
            >
              Read about how I engineered this site in under 4 hours
              <span className="ml-2 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all">→</span>
            </Link>
          </div>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2" />

          {profileData.journey.map((node, index) => {
            const isEducation = node.type === "education";
            const isEven = index % 2 === 0;

            return (
              <div key={node.id} className={`relative mb-16 md:mb-24 flex items-center md:justify-between w-full p-4 md:p-0 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary border-2 border-accent rounded-full transform -translate-x-1/2 mt-1 md:mt-0 z-10" />

                {/* Content spacer for desktop alternating layout */}
                <div className="hidden md:block w-5/12" />

                <motion.div
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="ml-10 md:ml-0 md:w-5/12 glass p-8 rounded-sm hover:-translate-y-1 transition-transform duration-300"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-semibold uppercase tracking-wider rounded-sm">
                      {node.period}
                    </span>
                    {isEducation ? (
                      <GraduationCap className="h-5 w-5 text-gray-300" />
                    ) : (
                      <Briefcase className="h-5 w-5 text-gray-300" />
                    )}
                  </div>
                  
                  <h3 className="text-2xl font-serif font-bold text-white mb-1">
                    {node.role}
                  </h3>
                  <div className="text-lg text-gray-300 mb-6 font-medium">
                    {node.company}
                  </div>
                  <p className="text-gray-300 mb-6 pb-6 border-b border-white/10">
                    {node.description}
                  </p>
                  
                  <ul className="space-y-3">
                    {node.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex text-sm text-gray-300">
                        <span className="text-accent mr-3 font-serif select-none">→</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
