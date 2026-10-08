import Navbar from "@/components/Navbar";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";
import Credentials from "@/components/Credentials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#020611] text-[#f3f4f6] selection:bg-amber-400/30 selection:text-white">
      {/* Floating navigation dock */}
      <Navbar />

      {/* Component 1: The Sticky Scroller (500vh container + HTML5 Canvas + Parallax Overlay) */}
      <ScrollyCanvas />

      {/* Component 3: The Work Grid (Real Case Studies & Repositories) */}
      <Projects />

      {/* Core Technical Architecture & Skills */}
      <TechStack />

      {/* Education Timeline & Industry Certifications */}
      <Credentials />

      {/* Direct Contact, Phone & Email */}
      <Contact />

      {/* Footer with live studio clock and back-to-top */}
      <Footer />
    </main>
  );
}
