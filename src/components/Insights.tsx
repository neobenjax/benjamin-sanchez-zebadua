"use client";

import { motion } from "framer-motion";
import { profileData } from "@/data/profile";
import { BarChart, ArrowUpRight } from "lucide-react";

export default function Insights() {
  return (
    <section id="insights" className="relative py-32 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Financial Case Studies</h2>
            <p className="text-xl text-gray-400">
              Applying rigorous analytical frameworks to real-world financial scenarios.
            </p>
          </div>
          <div className="mt-8 md:mt-0 flex-shrink-0">
             <a href="#contact" className="inline-flex items-center text-accent hover:text-white font-medium transition-colors">
               Discuss Methodology
               <ArrowUpRight className="ml-2 w-4 h-4" />
             </a>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {profileData.insights.map((insight, idx) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="group glass p-8 md:p-10 rounded-sm relative overflow-hidden"
            >
              {/* Decorative hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="flex items-center justify-between mb-8 relative z-10">
                <span className="px-4 py-1.5 bg-white/5 border border-white/10 text-gray-300 text-sm font-semibold rounded-sm">
                  {insight.category}
                </span>
                <BarChart className="text-accent/50 w-6 h-6" />
              </div>
              
              <h3 className="text-3xl font-serif text-white font-bold mb-4 relative z-10 group-hover:text-accent transition-colors duration-300">
                {insight.title}
              </h3>
              
              <p className="text-gray-400 text-lg mb-10 leading-relaxed relative z-10">
                {insight.description}
              </p>
              
              <div className="flex flex-wrap gap-3 relative z-10">
                {insight.metrics.map((metric, i) => (
                  <span
                    key={i}
                    className="flex items-center px-4 py-2 bg-black/20 text-gray-300 text-sm rounded-sm font-medium"
                  >
                    <span className="w-1.5 h-1.5 bg-accent rounded-full mr-2" />
                    {metric}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
