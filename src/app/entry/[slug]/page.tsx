import { getPostData, getSortedPostsData } from "@/lib/posts";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostData(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.frontMatter.title} - Benjamin Sanchez Zebadua`,
    description: post.frontMatter.description,
  };
}

export default async function Entry({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostData(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="flex-grow bg-primary pt-32 min-h-screen">
      <div className="max-w-4xl mx-auto px-8 lg:px-8 mb-24">
        {/* Navigation */}
        <Link
          href="/"
          className="inline-flex items-center text-accent mb-12 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Portfolio
        </Link>

        {/* Header */}
        <header className="mb-12 border-b border-white/10 pb-12">
          <div className="flex items-center space-x-4 mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-300">
              {post.frontMatter.category}
            </span>
            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-300">
              {new Date(post.frontMatter.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">
            {post.frontMatter.title}
          </h1>
          <p className="text-xl text-gray-300">
            {post.frontMatter.description}
          </p>
        </header>

        {/* Markdown Content */}
        <article className="prose prose-invert prose-emerald max-w-none 
          prose-headings:font-serif prose-headings:text-white
          prose-p:text-gray-300 prose-p:leading-relaxed
          prose-strong:text-white prose-strong:font-semibold
          prose-a:text-accent prose-a:no-underline hover:prose-a:text-white
          prose-blockquote:border-l-accent prose-blockquote:bg-white/5 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-sm
          prose-code:text-accent prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-sm
          prose-pre:bg-[#081426] prose-pre:border prose-pre:border-white/10
          mb-20"
        >
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>
      </div>
      <Footer />
    </main>
  );
}
