"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const [timeStr, setTimeStr] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZoneName: "short",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full py-12 px-6 md:px-12 bg-[#01040b] border-t border-white/10 z-20">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono text-white/40">
        {/* Left branding */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-amber-400 text-black flex items-center justify-center font-bold text-[10px]">
            RN
          </div>
          <span>&copy; {new Date().getFullYear()} RAJATH K NAIK. ALL RIGHTS RESERVED.</span>
        </div>

        {/* Center Live Clock */}
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>STUDIO TIME:</span>
          <span className="text-white/80">{timeStr || "LOCAL TIME"}</span>
        </div>

        {/* Right back to top button */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 hover:border-amber-400/40 hover:text-white hover:bg-white/5 transition-all text-white/60"
        >
          <span>TOP OF REEL</span>
          <ArrowUp className="w-3.5 h-3.5 text-amber-400" />
        </button>
      </div>
    </footer>
  );
}
