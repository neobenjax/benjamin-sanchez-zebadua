"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import Link from "next/link";
import { PostInfo } from "@/lib/posts";

interface InsightsProps {
  posts: PostInfo[];
}

export default function Insights({ posts }: InsightsProps) {
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
          {posts.map((post, idx) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="group glass rounded-sm relative overflow-hidden flex flex-col h-full hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_0_40px_rgba(16,185,129,0.1)] hover:border-white/20"
            >
              <div className="p-8 flex flex-col h-full relative z-10">
                {/* Header with Badges */}
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-300 line-clamp-1">
                    {post.category}
                  </span>
                  
                  <div className="flex items-center px-2.5 py-1 rounded-sm glass text-gray-300 text-xs font-medium whitespace-nowrap ml-4">
                    <Clock className="w-3 h-3 mr-1.5" />
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-serif text-white font-bold mb-4 group-hover:text-accent transition-colors duration-300">
                  {post.title}
                </h3>
                
                <p className="text-gray-300 text-sm leading-relaxed mb-8 flex-grow">
                  {post.description}
                </p>

                {/* Footer Link */}
                <div className="pt-4 border-t border-white/10 mt-auto min-h-[40px]">
                  <Link href={`/entry/${post.slug}`} className="inline-flex items-center text-sm font-semibold text-accent group-hover:text-white transition-colors">
                    Read Analysis
                    <ArrowUpRight className="ml-1 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* See More Button */}
        {posts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 flex justify-center"
          >
            <Link
              href="/insights"
              className="px-8 py-3 rounded-sm border border-accent/50 text-accent font-semibold hover:bg-accent hover:text-primary transition-all duration-300"
            >
              View Full Strategic Feed
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
