"use client";

import React, { useState, useEffect } from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import {
  Radio,
  Compass,
  ArrowRight,
  GitBranch,
} from "lucide-react";
import { GithubIcon } from "./Icons";

interface SideHUDProps {
  currentFrame: number;
  totalFrames: number;
  scrollYProgress: MotionValue<number>;
}

export default function SideHUD({
  currentFrame,
  totalFrames,
  scrollYProgress,
}: SideHUDProps) {
  const [ping, setPing] = useState<number>(14);

  useEffect(() => {
    const interval = setInterval(() => {
      setPing(Math.floor(11 + Math.random() * 6));
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  // Intelligent Scroll-Linked Fading to PREVENT COLLISION:
  // - Left Flank dims when Section 2 ("I build digital experiences") is active on the left (20% - 48%)
  const leftOpacity = useTransform(
    scrollYProgress,
    [0, 0.16, 0.22, 0.46, 0.52, 0.84, 0.9],
    [1, 1, 0.1, 0.1, 1, 1, 0]
  );
  const leftY = useTransform(
    scrollYProgress,
    [0.18, 0.24, 0.44, 0.5],
    [0, -15, -15, 0]
  );

  // - Right Flank dims when Section 3 ("Bridging design and engineering") is active on the right (50% - 84%)
  const rightOpacity = useTransform(
    scrollYProgress,
    [0, 0.48, 0.54, 0.82, 0.88],
    [1, 1, 0.1, 0.1, 0]
  );
  const rightY = useTransform(
    scrollYProgress,
    [0.48, 0.54, 0.82, 0.88],
    [0, -15, -15, 0]
  );

  return (
    <>
      {/* ================= LEFT FLANK (Top-Left Anchored: Telemetry & System Stream) ================= */}
      <motion.aside
        style={{ opacity: leftOpacity, y: leftY }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex fixed left-4 xl:left-8 2xl:left-12 top-24 xl:top-28 w-56 xl:w-64 flex-col gap-3 pointer-events-auto z-20 select-none"
      >
        {/* Technical Coordinate Tag */}
        <div className="flex items-center justify-between text-[10px] font-mono text-white/40 border-b border-white/10 pb-1.5">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white/60">NODE // BENGALURU</span>
          </span>
          <span className="text-white/30 text-[9px]">12.97°N • 77.59°E</span>
        </div>

        {/* Live Socket & Network Telemetry Card */}
        <div className="rounded-2xl p-3.5 border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl relative overflow-hidden group hover:border-amber-400/40 transition-all">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Radio className="w-3 h-3 text-amber-400 animate-pulse" />
              <span className="text-[10px] font-mono font-bold text-white tracking-wider">
                SOCKET TELEMETRY
              </span>
            </div>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
              ACTIVE
            </span>
          </div>

          {/* Equalizer Wave Bars */}
          <div className="flex items-end gap-1 h-3.5 mb-2.5 px-1 py-0.5 bg-white/[0.02] rounded border border-white/5">
            {[45, 80, 55, 95, 60, 85, 50, 90, 70].map((h, i) => (
              <span
                key={i}
                className="flex-1 bg-amber-400/70 rounded-xs animate-pulse"
                style={{
                  height: `${h}%`,
                  animationDuration: `${0.5 + (i % 3) * 0.3}s`,
                }}
              />
            ))}
          </div>

          {/* Stream Information */}
          <div className="space-y-1 text-[10px] font-mono text-white/60">
            <div className="flex items-center justify-between">
              <span className="text-white/40 text-[9px]">PROTOCOL:</span>
              <span className="text-amber-300 text-[9px]">TCP/IP MULTITHREAD</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/40 text-[9px]">BUFFER:</span>
              <span className="text-white/80 text-[9px]">
                FRAME_{String(currentFrame + 1).padStart(2, "0")} / {String(totalFrames).padStart(2, "0")}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/40 text-[9px]">SOCKET PING:</span>
              <span className="text-emerald-400 font-mono text-[9px]">{ping} ms</span>
            </div>
          </div>
        </div>

        {/* Compact Academic Badge */}
        <div className="rounded-xl px-3 py-2 border border-white/10 bg-black/60 backdrop-blur-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-semibold text-white">GITAM CSE</span>
            <span className="text-[9px] font-mono text-white/40">|</span>
            <span className="text-[10px] font-mono text-amber-300 font-bold">8.6 CGPA</span>
          </div>
          <span className="text-[9px] font-mono text-white/40">96.8% PCM</span>
        </div>
      </motion.aside>

      {/* ================= RIGHT FLANK (Top-Right Anchored: Timeline Orbit & Pipeline) ================= */}
      <motion.aside
        style={{ opacity: rightOpacity, y: rightY }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex fixed right-4 xl:right-8 2xl:right-12 top-24 xl:top-28 w-56 xl:w-64 flex-col gap-3 pointer-events-auto z-20 select-none text-right"
      >
        {/* Technical Cloud Tag */}
        <div className="flex items-center justify-between text-[10px] font-mono text-white/40 border-b border-white/10 pb-1.5">
          <span className="text-white/30 text-[9px]">REGION: ASIA</span>
          <span className="flex items-center gap-1.5 text-amber-300">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="text-white/60">AZURE CLOUD</span>
          </span>
        </div>

        {/* Circular Progress & Scrubbing Radial Dial */}
        <div className="rounded-2xl p-3.5 border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl relative overflow-hidden group hover:border-amber-400/40 transition-all text-left">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono font-bold text-white tracking-wider">
              TIMELINE ORBIT
            </span>
            <Compass className="w-3 h-3 text-amber-400 animate-spin" style={{ animationDuration: "14s" }} />
          </div>

          <div className="flex items-center gap-3">
            {/* SVG Circular Scrubber Ring */}
            <div className="relative w-11 h-11 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-white/10"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-amber-400 transition-all duration-150"
                  strokeDasharray={`${((currentFrame + 1) / totalFrames) * 100}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-[10px] font-mono font-bold text-white">
                {Math.round(((currentFrame + 1) / totalFrames) * 100)}%
              </span>
            </div>

            <div className="space-y-0.5 text-[9px] font-mono">
              <div className="text-white/40">FRAME SEQUENCE</div>
              <div className="text-xs font-bold text-white font-mono">
                #{String(currentFrame + 1).padStart(2, "0")}{" "}
                <span className="text-[9px] text-white/40 font-normal">/ {totalFrames}</span>
              </div>
              <div className="text-emerald-400 text-[9px]">60 FPS BUFFER</div>
            </div>
          </div>
        </div>

        {/* Compact Pipeline & GitHub Pill */}
        <div className="rounded-xl px-3 py-2 border border-white/10 bg-black/60 backdrop-blur-xl flex items-center justify-between text-left">
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-white/70">
            <GitBranch className="w-3 h-3 text-amber-400" />
            <span>Sockets ➔ Azure</span>
          </div>
          <a
            href="https://github.com/rajathknaik06"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[10px] font-mono text-amber-300 hover:text-white transition-colors"
          >
            <GithubIcon className="w-3 h-3" />
            <span>@rajathknaik06</span>
            <ArrowRight className="w-2.5 h-2.5" />
          </a>
        </div>
      </motion.aside>
    </>
  );
}
