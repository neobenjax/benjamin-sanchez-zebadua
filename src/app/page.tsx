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
  const stories = getSortedPostsData(false).filter(post => post.type === "story" && post.slug !== "about-me");

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
