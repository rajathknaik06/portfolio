"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import Overlay from "./Overlay";
import { Loader2 } from "lucide-react";

const TOTAL_FRAMES = 50;

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const activeFrameRef = useRef<number>(0);
  const renderReqRef = useRef<number | null>(null);

  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [activeFrame, setActiveFrame] = useState<number>(0);
  // Framing mode: "fit" (Full view, 100% uncropped subject) or "cinematic" (Face-safe fill)
  const [fitMode, setFitMode] = useState<"fit" | "cinematic">("fit");
  const fitModeRef = useRef<"fit" | "cinematic">("fit");

  useEffect(() => {
    fitModeRef.current = fitMode;
  }, [fitMode]);

  // Scroll tracking across the 500vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // High-performance canvas draw routine with face-safe framing & crisp resolution
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const img = imagesRef.current[frameIdx];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;

    const targetWidth = Math.round(width * dpr);
    const targetHeight = Math.round(height * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // Fill background with deep obsidian tone matching frame video
    ctx.fillStyle = "#020611";
    ctx.fillRect(0, 0, width, height);

    const currentMode = fitModeRef.current;
    const isWidescreen = width / height > img.naturalWidth / img.naturalHeight;

    let drawWidth: number;
    let drawHeight: number;
    let centerShiftX: number;
    let centerShiftY: number;

    if (currentMode === "fit") {
      // FULL VIEW: Fit to height on desktop, fit to screen on mobile so the full face and body are 100% visible
      const scale = Math.min(width / img.naturalWidth, height / img.naturalHeight);
      drawWidth = img.naturalWidth * scale;
      drawHeight = img.naturalHeight * scale;
      centerShiftX = (width - drawWidth) / 2;
      centerShiftY = (height - drawHeight) / 2;
    } else {
      // CINEMATIC (FACE-SAFE):
      // On wide screens, scale up slightly (1.18x) while anchoring to the face (Y = 38% in source)
      // This ensures the top of the head/hair/eyes are NEVER cropped!
      const baseScale = Math.min(width / img.naturalWidth, height / img.naturalHeight);
      const scale = isWidescreen
        ? baseScale * 1.18
        : Math.max(width / img.naturalWidth, height / img.naturalHeight);

      drawWidth = img.naturalWidth * scale;
      drawHeight = img.naturalHeight * scale;
      centerShiftX = (width - drawWidth) / 2;

      // Face center in source is ~38% down (Y = 480 / 1280)
      const faceSourceY = img.naturalHeight * 0.38;
      const targetFaceScreenY = height * 0.38;
      const calculatedShiftY = targetFaceScreenY - faceSourceY * scale;

      const minShiftY = height - drawHeight; // clamp to bottom
      const maxShiftY = 0; // clamp to top
      centerShiftY = Math.min(maxShiftY, Math.max(minShiftY, calculatedShiftY));
    }

    // Pass 1: Update ambient background blur canvas
    const bgCanvas = bgCanvasRef.current;
    if (bgCanvas) {
      const bgCtx = bgCanvas.getContext("2d", { alpha: false });
      if (bgCtx) {
        if (bgCanvas.width !== 360 || bgCanvas.height !== 202) {
          bgCanvas.width = 360;
          bgCanvas.height = 202;
        }
        bgCtx.drawImage(img, 0, 0, 360, 202);
      }
    }

    // Pass 2: Draw the crisp focused portrait
    ctx.drawImage(
      img,
      0,
      0,
      img.naturalWidth,
      img.naturalHeight,
      centerShiftX,
      centerShiftY,
      drawWidth,
      drawHeight
    );

    ctx.restore();
  }, []);

  // Preload all 50 frames into memory
  useEffect(() => {
    let isMounted = true;
    let loadedCounter = 0;
    const loadedImages: HTMLImageElement[] = [];

    const handleSingleImageLoaded = () => {
      if (!isMounted) return;
      loadedCounter++;
      const pct = Math.round((loadedCounter / TOTAL_FRAMES) * 100);
      setLoadProgress(pct);

      if (loadedCounter === TOTAL_FRAMES) {
        imagesRef.current = loadedImages;
        setImagesLoaded(true);
        requestAnimationFrame(() => {
          drawFrame(0);
        });
      }
    };

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(2, "0");
      img.src = `/sequence/frame_${paddedIndex}.webp`;

      img.onload = handleSingleImageLoaded;
      img.onerror = () => {
        img.src = `/sequence/frame_${paddedIndex}_delay-0.067s.webp`;
        img.onload = handleSingleImageLoaded;
        img.onerror = handleSingleImageLoaded;
      };

      loadedImages.push(img);
    }

    return () => {
      isMounted = false;
    };
  }, [drawFrame]);

  // Scrub through frames as user scrolls
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (!imagesLoaded) return;

    const clampedProgress = Math.max(0, Math.min(1, progress));
    const frameIndex = Math.min(
      TOTAL_FRAMES - 1,
      Math.max(0, Math.round(clampedProgress * (TOTAL_FRAMES - 1)))
    );

    if (frameIndex !== activeFrameRef.current) {
      activeFrameRef.current = frameIndex;
      setActiveFrame(frameIndex);

      if (renderReqRef.current) {
        cancelAnimationFrame(renderReqRef.current);
      }

      renderReqRef.current = requestAnimationFrame(() => {
        drawFrame(frameIndex);
      });
    }
  });

  // Re-render immediately when fit mode changes
  const toggleFitMode = () => {
    const nextMode = fitMode === "fit" ? "cinematic" : "fit";
    fitModeRef.current = nextMode;
    setFitMode(nextMode);
    if (imagesLoaded) {
      drawFrame(activeFrameRef.current);
    }
  };

  // Handle window resizing
  useEffect(() => {
    const handleResize = () => {
      if (imagesLoaded) {
        drawFrame(activeFrameRef.current);
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      if (renderReqRef.current) {
        cancelAnimationFrame(renderReqRef.current);
      }
    };
  }, [imagesLoaded, drawFrame]);

  return (
    <div
      ref={containerRef}
      id="story"
      className="relative w-full h-[500vh] bg-[#020611]"
    >
      {/* Sticky Fullscreen Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Preloader Overlay */}
        {!imagesLoaded && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#020611] text-white">
            <div className="flex flex-col items-center gap-6 max-w-sm px-6 text-center">
              <div className="relative">
                <Loader2 className="w-12 h-12 text-amber-400 animate-spin" />
                <div className="absolute inset-0 blur-md bg-amber-400/20 rounded-full animate-pulse" />
              </div>
              <div>
                <h3 className="text-sm font-mono tracking-widest text-amber-300 uppercase">
                  Buffering Interactive Sequence
                </h3>
                <p className="mt-1 text-xs text-white/50 font-mono">
                  Caching 50 frames into memory with face-safe framing
                </p>
              </div>
              <div className="w-48 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-yellow-300 transition-all duration-150 ease-out"
                  style={{ width: `${loadProgress}%` }}
                />
              </div>
              <span className="text-xs font-mono text-white/40">{loadProgress}%</span>
            </div>
          </div>
        )}

        {/* Ambient Blurred Background Canvas (matching the frame lighting) */}
        <canvas
          ref={bgCanvasRef}
          className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-30 pointer-events-none scale-110"
        />

        {/* The Primary HTML5 Canvas for crystal-clear uncropped portrait scrub */}
        <canvas
          ref={canvasRef}
          className="relative z-[2] w-full h-full block select-none pointer-events-none"
        />

        {/* Soft edge blending gradients (leaves upper face and center completely clean and bright) */}
        <div
          className="absolute inset-0 pointer-events-none z-[5]"
          style={{
            background:
              "radial-gradient(circle at 50% 40%, transparent 55%, rgba(2, 6, 17, 0.3) 80%, rgba(2, 6, 17, 0.85) 100%)",
          }}
        />
        {/* Very subtle top edge fade (doesn't darken the head) */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#020611]/50 to-transparent pointer-events-none z-[6]" />
        {/* Bottom edge fade blending into project section */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#020611] to-transparent pointer-events-none z-[6]" />

        {/* Parallax Overlay sitting on top */}
        <Overlay
          scrollYProgress={scrollYProgress}
          currentFrame={activeFrame}
          totalFrames={TOTAL_FRAMES}
          fitMode={fitMode}
          onToggleFitMode={toggleFitMode}
        />
      </div>
    </div>
  );
}
