import Hero from "@/components/Hero";
import Synergy from "@/components/Synergy";
import Journey from "@/components/Journey";
import Insights from "@/components/Insights";
import Toolbox from "@/components/Toolbox";
import Footer from "@/components/Footer";

import { getSortedPostsData } from "@/lib/posts";

export default function Home() {
  const allPosts = getSortedPostsData();
  const recentPosts = allPosts.slice(0, 3);

  return (
    <main className="flex-grow">
      <Hero />
      <Synergy />
      <Journey />
      <Insights posts={recentPosts} />
      <Toolbox />
      <Footer />
    </main>
  );
}
