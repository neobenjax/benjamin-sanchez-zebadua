import Hero from "@/components/Hero";
import Synergy from "@/components/Synergy";
import Journey from "@/components/Journey";
import Insights from "@/components/Insights";
import Toolbox from "@/components/Toolbox";

export default function Home() {
  return (
    <main className="flex-grow">
      <Hero />
      <Synergy />
      <Journey />
      <Insights />
      <Toolbox />
      
      {/* Simple Footer */}
      <footer className="bg-primary border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <div className="font-serif text-lg tracking-widest text-white font-semibold mb-4 opacity-50">
            BENJAMIN <span className="font-sans tracking-normal mx-1">//</span> STRATEGIST
          </div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Benjamin. Engineering Reliable Wealth Strategies.
          </p>
        </div>
      </footer>
    </main>
  );
}
