import Hero from "@/components/Hero";
import Synergy from "@/components/Synergy";
import Journey from "@/components/Journey";
import Insights from "@/components/Insights";
import Toolbox from "@/components/Toolbox";
import Footer from "@/components/Footer";

import { getSortedPostsData } from "@/lib/posts";

export default function Home() {
  const allPosts = getSortedPostsData();

  return (
    <main className="flex-grow">
      <Hero />
      <Synergy />
      <Journey />
      <Insights posts={allPosts} />
      <Toolbox />
      <Footer />
    </main>
  );
}
