"use client";

import { motion } from "framer-motion";
import { profileData } from "@/data/profile";
import { ArrowUpRight, TrendingUp, Clock } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area } from "recharts";

export default function Insights() {
  return (
    <section id="insights" className="relative py-32 bg-primary">
      <div className="max-w-7xl mx-auto px-8 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <div className="flex items-center space-x-4 mb-4">
              <span className="h-px bg-accent w-12" />
              <span className="text-accent tracking-widest text-sm font-semibold uppercase">
                Insights & Analysis
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Strategic Feed</h2>
            <p className="text-xl text-gray-300">
              High-end financial frameworks and thoughtful engineering approaches.
            </p>
          </div>
        </motion.div>

        {/* Card-Based Feed Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {profileData.insights.map((insight, idx) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="group glass rounded-sm relative overflow-hidden flex flex-col h-full hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_0_40px_rgba(16,185,129,0.1)] hover:border-white/20"
            >
              {/* Recharts Background Trend Line (if data exists) */}
              {insight.chartData && (
                <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none mt-16">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={insight.chartData}>
                      <defs>
                        <linearGradient id={`color-${insight.id}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10B981" stopOpacity={0.5} />
                          <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#10B981"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill={`url(#color-${insight.id})`}
                        isAnimationActive={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}

              <div className="p-8 flex flex-col h-full relative z-10">
                {/* Header with Badges */}
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-300">
                    {insight.category}
                  </span>
                  
                  {/* Dynamic Badge */}
                  {insight.badgeType === "metric" && (
                    <div className="flex items-center px-2.5 py-1 rounded-sm bg-accent/20 border border-accent text-accent text-xs font-bold shadow-sm shadow-accent/20">
                      <TrendingUp className="w-3 h-3 mr-1.5" />
                      DATA INSIGHT
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-serif text-white font-bold mb-4 group-hover:text-accent transition-colors duration-300">
                  {insight.title}
                </h3>
                
                <p className="text-gray-300 text-sm leading-relaxed mb-8 flex-grow">
                  {insight.description}
                </p>
                
                {/* Metrics / Keywords */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {insight.metrics.map((metric, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-white/5 border border-white/5 text-gray-300 text-xs rounded-sm font-medium"
                    >
                      {metric}
                    </span>
                  ))}
                </div>

                {/* Footer Link */}
                <div className="pt-4 border-t border-white/10 mt-auto min-h-[40px]">
                  {/* Action links hidden per UI cleanup:
                  <a href={`#${insight.id}`} className="inline-flex items-center text-sm font-semibold text-accent group-hover:text-white transition-colors">
                    Read Analysis
                    <ArrowUpRight className="ml-1 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                  */}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
