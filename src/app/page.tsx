import Hero from "@/components/Hero";
import Synergy from "@/components/Synergy";
import Journey from "@/components/Journey";
import Insights from "@/components/Insights";
import CommunityEngagement from "@/components/CommunityEngagement";
import Toolbox from "@/components/Toolbox";
import Footer from "@/components/Footer";

import { getSortedPostsData } from "@/lib/posts";

export default function Home() {
  const allPosts = getSortedPostsData(true);

  return (
    <main className="flex-grow">
      <Hero />
      <Synergy />
      <Journey />
      <CommunityEngagement />
      <Insights posts={allPosts} />
      <Toolbox />
      <Footer />
    </main>
  );
}
