import { getSortedPostsData } from "@/lib/posts";
import Link from "next/link";
import { ArrowLeft, Clock, TrendingUp, ArrowUpRight } from "lucide-react";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Strategic Feed | Benjamin Sanchez Zebadua",
  description: "Aggregated thought leadership and professional insights.",
};

export default function InsightsList() {
  const posts = getSortedPostsData();

  return (
    <main className="flex-grow bg-primary pt-32 min-h-screen flex flex-col">
      <div className="max-w-7xl mx-auto px-8 lg:px-8 flex-grow w-full mb-24">
        {/* Navigation */}
        <Link
          href="/"
          className="inline-flex items-center text-accent mb-12 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Portfolio
        </Link>

        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
            Strategic Feed
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            A complete archive of engineering blueprints, tax-minimization logic, and architectural case studies.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post.slug}
              className="group glass rounded-sm relative overflow-hidden flex flex-col h-full hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_0_40px_rgba(16,185,129,0.1)] hover:border-white/20"
            >
              <div className="p-8 flex flex-col h-full relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-300 line-clamp-1">
                    {post.category}
                  </span>
                  
                  <div className="flex items-center px-2.5 py-1 rounded-sm glass text-gray-300 text-xs font-medium whitespace-nowrap ml-4">
                    <Clock className="w-3 h-3 mr-1.5" />
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                </div>
                
                <h3 className="text-2xl font-serif text-white font-bold mb-4 group-hover:text-accent transition-colors duration-300">
                  {post.title}
                </h3>
                
                <p className="text-gray-300 text-sm leading-relaxed mb-8 flex-grow">
                  {post.description}
                </p>
                
                <div className="pt-4 border-t border-white/10 mt-auto min-h-[40px]">
                  <Link href={`/entry/${post.slug}`} className="inline-flex items-center text-sm font-semibold text-accent group-hover:text-white transition-colors">
                    Read Analysis
                    <ArrowUpRight className="ml-1 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {posts.length === 0 && (
            <div className="col-span-full py-12 text-center border border-white/10 rounded-sm glass">
              <p className="text-gray-400">No entries found. Check back later.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
