"use client";

import React, { useState } from "react";
import { motion, MotionValue, useTransform, useMotionValueEvent } from "framer-motion";
import {
  ArrowDown,
  Sparkles,
  Terminal,
  Code2,
  Compass,
  Maximize2,
  Scan,
} from "lucide-react";
import SideHUD from "./SideHUD";

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
  currentFrame: number;
  totalFrames: number;
  fitMode?: "fit" | "cinematic";
  onToggleFitMode?: () => void;
}

export default function Overlay({
  scrollYProgress,
  currentFrame,
  totalFrames,
  fitMode = "fit",
  onToggleFitMode,
}: OverlayProps) {
  // --- Section 1: Hero (0% - 20%) ---
  // Positioned in the lower-third so the user's face is 100% visible and unobstructed
  const s1Opacity = useTransform(scrollYProgress, [0, 0.12, 0.2], [1, 0.9, 0]);
  const s1Y = useTransform(scrollYProgress, [0, 0.2], [0, -60]);

  // --- Section 2: Statement (22% - 50%) ---
  // Left aligned: "I build digital experiences."
  const s2Opacity = useTransform(
    scrollYProgress,
    [0.18, 0.26, 0.42, 0.5],
    [0, 1, 1, 0]
  );
  const s2Y = useTransform(scrollYProgress, [0.18, 0.28, 0.42, 0.5], [60, 0, 0, -60]);
  const s2X = useTransform(scrollYProgress, [0.18, 0.28, 0.5], [-20, 0, 0]);

  // --- Section 3: Synthesis (52% - 84%) ---
  // Right aligned: "Bridging design and engineering."
  const s3Opacity = useTransform(
    scrollYProgress,
    [0.52, 0.6, 0.78, 0.86],
    [0, 1, 1, 0]
  );
  const s3Y = useTransform(scrollYProgress, [0.52, 0.62, 0.78, 0.86], [60, 0, 0, -60]);
  const s3X = useTransform(scrollYProgress, [0.52, 0.62, 0.86], [20, 0, 0]);

  // --- Section 4: Transition to Projects (88% - 100%) ---
  const s4Opacity = useTransform(scrollYProgress, [0.86, 0.94, 1], [0, 1, 0.8]);
  const s4Y = useTransform(scrollYProgress, [0.86, 0.96], [40, 0]);

  const [percent, setPercent] = useState<number>(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setPercent(Math.round(Math.min(100, Math.max(0, v * 100))));
  });

  const scrollToProjects = () => {
    const el = document.getElementById("projects");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between overflow-hidden">
      {/* Flank HUDs & Technical Matrix for Left & Right Viewport Sides */}
      <SideHUD
        currentFrame={currentFrame}
        totalFrames={totalFrames}
        scrollYProgress={scrollYProgress}
      />

      {/* Top Header Status Row */}
      <div className="w-full flex justify-between items-center px-6 md:px-12 pt-24 text-xs font-mono tracking-widest text-white/50 select-none">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-ping opacity-75" />
          <span className="text-white/70 uppercase">Interaction Reel</span>
          <span className="hidden sm:inline text-white/30">| 60 FPS SCRUB</span>
        </div>
        <div className="flex items-center gap-4">
          {/* Interactive Framing Mode Toggle Button */}
          {onToggleFitMode && (
            <button
              onClick={onToggleFitMode}
              className="pointer-events-auto flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.1] hover:border-amber-400/40 text-[11px] font-mono text-white/70 hover:text-white transition-all shadow-sm"
              title="Click to toggle framing style"
            >
              <Scan className="w-3 h-3 text-amber-400" />
              <span>{fitMode === "fit" ? "Full View" : "Cinematic Focus"}</span>
            </button>
          )}

          <span className="px-2.5 py-1 rounded border border-white/10 bg-white/5 text-amber-300/90 font-mono">
            {String(currentFrame + 1).padStart(2, "0")} / {String(totalFrames).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Main Viewport for Story Sections */}
      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 my-auto flex-1 flex flex-col justify-end pb-12 sm:pb-16">
        {/* ================= SECTION 1: HERO (0% SCROLL) ================= */}
        <motion.div
          style={{ opacity: s1Opacity, y: s1Y }}
          className="w-full flex flex-col items-center text-center select-none"
        >
          {/* Subtle Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/10 bg-black/40 backdrop-blur-md mb-4 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="text-xs font-mono tracking-wider text-amber-200 uppercase">
              Python &amp; Cloud Developer
            </span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span className="text-xs font-mono text-white/50">GITAM CSE &bull; Bengaluru</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tight text-white leading-none uppercase max-w-4xl drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
            Rajath K Naik
            <span className="block mt-1 sm:mt-2 text-xl sm:text-3xl md:text-5xl font-extralight tracking-normal text-white/80 lowercase italic font-serif">
              Python &amp; Cloud Developer.
            </span>
          </h1>

          <p className="mt-3 sm:mt-4 text-xs sm:text-base text-white/70 max-w-lg mx-auto font-light leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
            Architecting concurrent socket servers, scalable Django backends, and Microsoft Azure cloud solutions.
          </p>

          {/* Action buttons */}
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-3.5 pointer-events-auto">
            <button
              onClick={scrollToProjects}
              className="px-6 py-2.5 rounded-full bg-white text-black font-medium text-xs tracking-wide hover:bg-amber-300 transition-all duration-300 flex items-center gap-2 shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:shadow-[0_0_35px_rgba(251,191,36,0.45)] hover:scale-105 active:scale-95"
            >
              <span>Explore Projects</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/15 bg-black/60 text-xs font-mono text-white/70 backdrop-blur-md shadow-lg">
              <Compass className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: "12s" }} />
              <span>Scroll down to scrub sequence</span>
            </div>
          </div>
        </motion.div>

        {/* ================= SECTION 2: LEFT-ALIGNED (30% SCROLL) ================= */}
        <motion.div
          style={{ opacity: s2Opacity, y: s2Y, x: s2X }}
          className="absolute left-6 md:left-12 bottom-14 sm:bottom-16 max-w-md xl:max-w-lg select-none text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-black/60 backdrop-blur-md mb-3 text-xs font-mono text-amber-300/90">
            <Terminal className="w-3 h-3" />
            <span>01 // DISTRIBUTED ARCHITECTURE</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.1] drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
            Building real-time <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500">
              cloud &amp; socket systems.
            </span>
          </h2>

          <p className="mt-3 text-xs sm:text-sm md:text-base text-white/75 leading-relaxed font-light drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
            Developing event-driven Python socket communication networks, multithreaded client-server protocols, and cloud resource provisioning on Microsoft Azure.
          </p>

          <div className="mt-5 flex flex-wrap gap-2 text-xs font-mono text-white/70">
            <span className="px-3 py-1 rounded-md bg-black/50 border border-white/10 backdrop-blur-sm">
              ◆ Python Sockets &amp; Tkinter
            </span>
            <span className="px-3 py-1 rounded-md bg-black/50 border border-white/10 backdrop-blur-sm">
              ◆ Microsoft Azure Cloud
            </span>
            <span className="px-3 py-1 rounded-md bg-black/50 border border-white/10 backdrop-blur-sm">
              ◆ Django &amp; PostgreSQL
            </span>
          </div>
        </motion.div>

        {/* ================= SECTION 3: RIGHT-ALIGNED (60% SCROLL) ================= */}
        <motion.div
          style={{ opacity: s3Opacity, y: s3Y, x: s3X }}
          className="absolute right-6 md:right-12 bottom-14 sm:bottom-16 max-w-md xl:max-w-lg select-none text-right ml-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-black/60 backdrop-blur-md mb-3 text-xs font-mono text-amber-300/90">
            <Code2 className="w-3 h-3" />
            <span>02 // COMPUTATIONAL RIGOR</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.1] drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
            Bridging core systems and <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-200 via-amber-400 to-yellow-500">
              cloud scalability.
            </span>
          </h2>

          <p className="mt-3 text-xs sm:text-sm md:text-base text-white/75 leading-relaxed font-light ml-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
            Grounding software in solid Data Structures, Algorithms, and Object-Oriented Design. Combining low-level Linux systems with high-level cloud abstractions and creative UI aesthetics.
          </p>

          <div className="mt-5 flex flex-wrap justify-end gap-2 text-xs font-mono text-white/70">
            <span className="px-3 py-1 rounded-md bg-black/50 border border-white/10 backdrop-blur-sm">
              ◆ Data Structures &amp; OOP
            </span>
            <span className="px-3 py-1 rounded-md bg-black/50 border border-white/10 backdrop-blur-sm">
              ◆ Linux Shell &amp; Kernel Basics
            </span>
            <span className="px-3 py-1 rounded-md bg-black/50 border border-white/10 backdrop-blur-sm">
              ◆ Relational DBMS (SQL)
            </span>
          </div>
        </motion.div>

        {/* ================= SECTION 4: OUTRO CUE (90% - 100% SCROLL) ================= */}
        <motion.div
          style={{ opacity: s4Opacity, y: s4Y }}
          className="w-full flex flex-col items-center justify-center text-center select-none"
        >
          <div className="inline-block p-2 rounded-full border border-amber-400/30 bg-black/50 mb-3 animate-bounce">
            <ArrowDown className="w-4 h-4 text-amber-300" />
          </div>
          <h3 className="text-xl sm:text-3xl font-bold text-white tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
            Selected Work & Case Studies
          </h3>
          <p className="mt-1 text-xs text-white/60 font-mono">
            Scroll further to inspect featured architecture & experiments
          </p>
        </motion.div>
      </div>

      {/* Bottom Scrubber HUD / Status Pill */}
      <div className="w-full px-6 md:px-12 pb-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/50 select-none">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="tracking-widest uppercase text-white/70">60 FPS Render Pipeline</span>
        </div>

        {/* Cinematic Progress Scrubber Bar */}
        <div className="w-full sm:w-72 flex items-center gap-3">
          <span className="text-[10px] text-white/40">00%</span>
          <div className="relative flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full"
              style={{
                width: useTransform(scrollYProgress, (v) => `${Math.min(100, Math.max(0, v * 100))}%`),
              }}
            />
          </div>
          <span className="text-[10px] text-white/40">100%</span>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-white/40">
          <span>SCRUB OFFSET:</span>
          <span className="text-amber-300/90 font-mono">
            {percent}%
          </span>
        </div>
      </div>
    </div>
  );
}
