import Hero from "@/components/Hero";
import Synergy from "@/components/Synergy";
import Journey from "@/components/Journey";
import Insights from "@/components/Insights";
import Toolbox from "@/components/Toolbox";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex-grow">
      <Hero />
      <Synergy />
      <Journey />
      <Insights />
      <Toolbox />
      <Footer />
    </main>
  );
}
