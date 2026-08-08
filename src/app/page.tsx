import SplitHero from "@/components/SplitHero";
import Synergy from "@/components/Synergy";
import Journey from "@/components/Journey";
import Insights from "@/components/Insights";
import CommunityEngagement from "@/components/CommunityEngagement";
import Toolbox from "@/components/Toolbox";
import Footer from "@/components/Footer";

import { FooterFragment } from "@/components/fragments/FragmentRenderer";
import { getSortedContentByType } from "@/lib/content";

export default function Home() {
  const allPosts = getSortedContentByType("posts");
  const stories = getSortedContentByType("articles");

  return (
    <main className="flex-grow">
      {/* Adham Dannaway-Inspired Dual-Core Persona Split Hero */}
      <SplitHero />

      {/* Main Portfolio Layout Sections */}
      <section id="synergy">
        <Synergy />
      </section>

      <section id="journey">
        <Journey />
      </section>

      <section id="leadership">
        <CommunityEngagement stories={stories} />
      </section>

      <section id="insights">
        <Insights posts={allPosts} />
      </section>

      <section id="toolbox">
        <Toolbox />
      </section>

      {/* Agnostic Fragment Transpiler Engine Footer */}
      <FooterFragment fallback={<Footer />} />
    </main>
  );
}
