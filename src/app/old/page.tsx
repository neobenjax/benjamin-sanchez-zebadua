import SplitHero from "@/components/SplitHero";
import Synergy from "@/components/Synergy";
import Journey from "@/components/Journey";
import Insights from "@/components/Insights";
import CommunityEngagement from "@/components/CommunityEngagement";
import Toolbox from "@/components/Toolbox";
import Footer from "@/components/Footer";

import { FooterFragment } from "@/components/fragments/FragmentRenderer";
import { getSortedContentByType } from "@/lib/content";

export default function OldHome() {
  const allPosts = getSortedContentByType("posts");
  const stories = getSortedContentByType("articles");

  return (
    <main className="flex-grow">
      {/* Adham Dannaway-Inspired Dual-Core Persona Split Hero */}
      <SplitHero />

      {/* Main Portfolio Layout Sections */}
      <Synergy />
      <Journey />
      <CommunityEngagement stories={stories} />
      <Insights posts={allPosts} />
      <Toolbox />

      {/* Agnostic Fragment Transpiler Engine Footer */}
      <FooterFragment fallback={<Footer />} />
    </main>
  );
}
