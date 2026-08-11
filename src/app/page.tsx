import { ComingSoonFragment, FooterFragment } from "@/components/fragments/FragmentRenderer";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main id="main-content" className="flex-grow flex flex-col justify-between">
      {/* Dynamic Fragment Transpiler Engine Coming Soon Frontpage */}
      <ComingSoonFragment />

      {/* Agnostic Fragment Transpiler Engine Footer */}
      <FooterFragment fallback={<Footer />} />
    </main>
  );
}
