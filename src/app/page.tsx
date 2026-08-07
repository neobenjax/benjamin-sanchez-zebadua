import Hero from "@/components/Hero";
import Synergy from "@/components/Synergy";
import Journey from "@/components/Journey";
import Insights from "@/components/Insights";
import CommunityEngagement from "@/components/CommunityEngagement";
import Toolbox from "@/components/Toolbox";
import Footer from "@/components/Footer";

import { getSortedContentByType } from "@/lib/content";

export default function Home() {
  const allPosts = getSortedContentByType("posts");
  const stories = getSortedContentByType("articles");

  return (
    <main className="flex-grow">
      <Hero />
      <Synergy />
      <Journey />
      <CommunityEngagement stories={stories} />
      <Insights posts={allPosts} />
      <Toolbox />
      <Footer />
    </main>
  );
}
