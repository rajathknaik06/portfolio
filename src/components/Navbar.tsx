"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-4 sm:top-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav
        className={`pointer-events-auto flex items-center justify-between gap-6 sm:gap-8 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border transition-all duration-300 ${
          scrolled
            ? "bg-[#020611]/85 border-white/15 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.8)] backdrop-blur-xl"
            : "bg-[#020611]/50 border-white/10 backdrop-blur-md"
        }`}
      >
        {/* Monogram Brand */}
        <button
          onClick={() => scrollTo("story")}
          className="flex items-center gap-2 group text-left"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center font-bold text-black text-xs tracking-tighter shadow-md group-hover:scale-105 transition-transform">
            RN
          </div>
          <span className="font-mono text-xs font-semibold text-white tracking-widest uppercase hidden sm:inline">
            RAJATH<span className="text-amber-400">.DEV</span>
          </span>
        </button>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-5 lg:gap-6 text-xs font-mono text-white/70">
          <button
            onClick={() => scrollTo("story")}
            className="hover:text-amber-300 transition-colors"
          >
            01. Reel
          </button>
          <button
            onClick={() => scrollTo("projects")}
            className="hover:text-amber-300 transition-colors"
          >
            02. Projects
          </button>
          <button
            onClick={() => scrollTo("capabilities")}
            className="hover:text-amber-300 transition-colors"
          >
            03. Skills
          </button>
          <button
            onClick={() => scrollTo("credentials")}
            className="hover:text-amber-300 transition-colors"
          >
            04. Education
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="hover:text-amber-300 transition-colors"
          >
            05. Contact
          </button>
        </div>

        {/* Right Action / Availability Pill */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono text-white/70">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Open for Roles</span>
          </div>

          <button
            onClick={() => scrollTo("contact")}
            className="px-4 py-1.5 rounded-full bg-amber-400 hover:bg-amber-300 text-black text-xs font-medium tracking-wide transition-all duration-300 hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] flex items-center gap-1.5 active:scale-95"
          >
            <span>Let&apos;s Connect</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-full bg-white/5 border border-white/10 md:hidden text-white/80"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto absolute top-20 inset-x-6 p-6 rounded-3xl bg-[#020611]/95 border border-white/15 backdrop-blur-2xl shadow-2xl flex flex-col gap-4 text-sm font-mono text-white/80 md:hidden">
          <button
            onClick={() => scrollTo("story")}
            className="text-left py-2 hover:text-amber-300 border-b border-white/5"
          >
            01. Reel
          </button>
          <button
            onClick={() => scrollTo("projects")}
            className="text-left py-2 hover:text-amber-300 border-b border-white/5"
          >
            02. Projects
          </button>
          <button
            onClick={() => scrollTo("capabilities")}
            className="text-left py-2 hover:text-amber-300 border-b border-white/5"
          >
            03. Skills
          </button>
          <button
            onClick={() => scrollTo("credentials")}
            className="text-left py-2 hover:text-amber-300 border-b border-white/5"
          >
            04. Education &amp; Certifications
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="text-left py-2 hover:text-amber-300"
          >
            05. Contact
          </button>
        </div>
      )}
    </header>
  );
}
