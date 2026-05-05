"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, HeartHandshake } from "lucide-react";
import Link from "next/link";
import { PostInfo } from "@/lib/posts";

interface CommunityEngagementProps {
  stories: PostInfo[];
}

export default function CommunityEngagement({ stories }: CommunityEngagementProps) {
  return (
    <section id="purpose-driven" data-umami-event="section-view-leadership" className="relative py-32 bg-primary/95">
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/95 to-primary z-0"></div>
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
              <span className="text-accent tracking-widest text-sm font-semibold uppercase flex items-center">
                <HeartHandshake className="w-4 h-4 mr-2" />
                Leadership in Action
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Purpose-Driven Community Engagement</h2>
            <p className="text-xl text-gray-300">
              Applying structural logic and operational rigor to initiatives that matter.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((item, idx) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="group relative overflow-hidden flex flex-col h-full rounded-sm border border-accent/20 bg-[#0c1e38] hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] hover:border-accent/50"
            >
              <div className="p-8 flex flex-col h-full relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                    {/* Extract Role from title if possible, or just use category */}
                    {item.title.split(":")[0]}
                  </span>
                </div>
                
                <h3 className="text-2xl font-serif text-white font-bold mb-3 group-hover:text-accent transition-colors duration-300">
                  {item.title.includes(":") ? item.title.split(":")[1].trim() : item.title}
                </h3>
                
                <p className="text-gray-300 text-sm leading-relaxed mb-8 flex-grow">
                  {item.description}
                </p>

                <div className="pt-4 border-t border-accent/10 mt-auto min-h-[40px]">
                  <Link href={`/entry/${item.slug}`} className="inline-flex items-center text-sm font-semibold text-gray-300 group-hover:text-white transition-colors">
                    Read Story
                    <ArrowUpRight className="ml-1 w-4 h-4 text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
