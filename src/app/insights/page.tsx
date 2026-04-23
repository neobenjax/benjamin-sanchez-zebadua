import { getSortedPostsData } from "@/lib/posts";
import Link from "next/link";
import { ArrowLeft, Clock, TrendingUp, ArrowUpRight, X } from "lucide-react";
import Footer from "@/components/Footer";
import TagFilterDropdown from "@/components/TagFilterDropdown";
import tagsData from "@/data/tags.json";

export const metadata = {
  title: "Strategic Feed | Benjamin Sanchez Zebadua",
  description: "Aggregated thought leadership and professional insights.",
};

export default async function InsightsList({ searchParams }: { searchParams: Promise<{ tag?: string }> }) {
  const resolvedParams = await searchParams;
  const activeTag = resolvedParams?.tag;
  const allPosts = getSortedPostsData();
  
  let displayTag = activeTag;
  if (activeTag) {
    const matchedTag = tagsData.find(t => t.toLowerCase() === activeTag.toLowerCase());
    if (matchedTag) displayTag = matchedTag;
  }

  const posts = activeTag
    ? allPosts.filter(post => post.tags && post.tags.some(t => t.toLowerCase() === activeTag.toLowerCase()))
    : allPosts;

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
          
          <div className="mt-6 max-w-xs">
            <TagFilterDropdown tags={tagsData} />
          </div>
          
          {activeTag && (
            <div className="flex items-center space-x-4 mt-8">
              <span className="text-gray-400">Filtered by skill:</span>
              <span className="inline-flex items-center px-3 py-1 rounded-full border border-accent text-accent text-xs font-semibold bg-accent/10">
                {displayTag}
              </span>
              <Link href="/insights" className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors">
                <X className="w-4 h-4 mr-1" />
                Clear Filter
              </Link>
            </div>
          )}
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
                    {new Date(post.date).toLocaleDateString('en-CA', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      timeZone: 'UTC'
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
