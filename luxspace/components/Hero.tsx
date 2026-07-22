"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";

const TOTAL_FRAMES = 300;
const FRAME_PATH = (n: number) =>
  `/frames/ezgif-frame-${String(n).padStart(3, "0")}.jpg`;

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number>(0);
  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.4 });

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = canvas;
    const scale = Math.max(width / img.naturalWidth, height / img.naturalHeight);
    const x = (width - img.naturalWidth * scale) / 2;
    const y = (height - img.naturalHeight * scale) / 2;

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale);
  }, []);

  // Preload frame images efficiently
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    const loadSingle = (i: number): Promise<void> =>
      new Promise((resolve) => {
        const img = new Image();
        img.src = FRAME_PATH(i + 1);
        img.onload = () => {
          loadedCount++;
          setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
          if (loadedCount === TOTAL_FRAMES) setLoaded(true);
          resolve();
        };
        img.onerror = () => resolve();
        images[i] = img;
      });

    // Immediate load first 15 frames for instant render
    for (let i = 0; i < Math.min(15, TOTAL_FRAMES); i++) {
      loadSingle(i);
    }

    // Deferred load for rest
    const timer = setTimeout(() => {
      for (let i = 15; i < TOTAL_FRAMES; i++) {
        loadSingle(i);
      }
    }, 50);

    imagesRef.current = images;
    return () => clearTimeout(timer);
  }, []);

  // Window resize listener
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(currentFrameRef.current);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame]);

  // Sync scroll progress to canvas frames
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (progress) => {
      const idx = Math.min(
        Math.floor(progress * (TOTAL_FRAMES - 1)),
        TOTAL_FRAMES - 1
      );
      if (idx !== currentFrameRef.current) {
        currentFrameRef.current = idx;
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => drawFrame(idx));
      }
    });

    return () => unsubscribe();
  }, [smoothProgress, drawFrame]);

  // Initial draw
  useEffect(() => {
    if (loaded) drawFrame(0);
  }, [loaded, drawFrame]);

  // Scroll opacity steps
  const titleOpacity = useTransform(smoothProgress, [0, 0.05, 0.15, 0.22], [1, 1, 1, 0]);
  const titleY = useTransform(smoothProgress, [0, 0.22], [0, -40]);

  const beat1Opacity = useTransform(smoothProgress, [0.25, 0.32, 0.42, 0.48], [0, 1, 1, 0]);
  const beat1Y = useTransform(smoothProgress, [0.25, 0.32, 0.48], [40, 0, -40]);

  const beat2Opacity = useTransform(smoothProgress, [0.52, 0.58, 0.68, 0.74], [0, 1, 1, 0]);
  const beat2Y = useTransform(smoothProgress, [0.52, 0.58, 0.74], [40, 0, -40]);

  const beat3Opacity = useTransform(smoothProgress, [0.78, 0.84, 0.94, 1.0], [0, 1, 1, 1]);
  const beat3Y = useTransform(smoothProgress, [0.78, 0.84, 1.0], [40, 0, 0]);

  return (
    <div id="hero" ref={containerRef} className="relative w-full h-[500vh] bg-[#050505]">
      {/* Sticky viewport viewport */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-[#050505] flex items-center justify-center">
        {/* Preloader */}
        <AnimatePresence>
          {!loaded && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.6 } }}
              className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-extrabold text-xl shadow-xl shadow-blue-500/20 animate-pulse">
                  L
                </div>
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-400">
                  LUXSPACE PG
                </span>
                <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-400 transition-all duration-150"
                    style={{ width: `${loadProgress}%` }}
                  />
                </div>
                <span className="text-xs font-mono text-white/50">{loadProgress}% Loaded</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animation Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Ambient Dark Overlay Gradients */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40" />

        {/* Overlay Storytelling Beats */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center pointer-events-none">
          {/* Act 0: Initial Hero Title */}
          <motion.div
            style={{ opacity: titleOpacity, y: titleY }}
            className="text-center max-w-3xl flex flex-col items-center gap-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-300">
                Ultra-Premium Co-Living · Sector 126 Noida
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-none">
              REDEFINING <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-white">
                STUDENT LIVING
              </span>
            </h1>
            <p className="text-base sm:text-lg text-white/70 max-w-xl font-light leading-relaxed">
              Experience modern air-conditioned fully furnished rooms, attached personal washrooms, and chef-curated meals right near Amity University.
            </p>
            <div className="flex items-center gap-3 pt-4">
              <div className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center p-1">
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="w-1.5 h-1.5 bg-blue-400 rounded-full"
                />
              </div>
              <span className="text-xs tracking-widest text-white/50 uppercase font-mono">
                Scroll to Explore Space
              </span>
            </div>
          </motion.div>

          {/* Act 1: Features Spotlight */}
          <motion.div
            style={{ opacity: beat1Opacity, y: beat1Y }}
            className="absolute inset-x-4 sm:inset-x-8 max-w-2xl mx-auto p-8 rounded-3xl bg-black/60 border border-white/10 backdrop-blur-2xl text-center flex flex-col items-center gap-4"
          >
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-indigo-400">
              Personal Sanctuary
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Fully Furnished & Air Conditioned
            </h2>
            <p className="text-sm sm:text-base text-white/70 font-normal leading-relaxed">
              Every suite features individual quiet AC units, orthopaedic beds, individual study desks, and private attached washrooms with 24/7 hot water.
            </p>
          </motion.div>

          {/* Act 2: Services & Meals */}
          <motion.div
            style={{ opacity: beat2Opacity, y: beat2Y }}
            className="absolute inset-x-4 sm:inset-x-8 max-w-2xl mx-auto p-8 rounded-3xl bg-black/60 border border-white/10 backdrop-blur-2xl text-center flex flex-col items-center gap-4"
          >
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">
              Zero Maintenance Stress
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Fresh Meals & Daily Housekeeping
            </h2>
            <p className="text-sm sm:text-base text-white/70 font-normal leading-relaxed">
              Hygienic home-style Breakfast, Lunch & Dinner included. High-speed fiber Wi-Fi, daily professional cleaning, and laundry services.
            </p>
          </motion.div>

          {/* Act 3: Ready to Move */}
          <motion.div
            style={{ opacity: beat3Opacity, y: beat3Y }}
            className="absolute inset-x-4 sm:inset-x-8 max-w-2xl mx-auto p-8 rounded-3xl bg-black/75 border border-blue-500/30 backdrop-blur-2xl text-center flex flex-col items-center gap-4 shadow-2xl shadow-blue-500/10"
          >
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-blue-400">
              Prime Amity Location
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Starting ₹12,000 / Month
            </h2>
            <p className="text-sm sm:text-base text-white/80 font-normal">
              Walking distance from Amity University Noida, Sector 126. Limited rooms available for upcoming academic intake.
            </p>
            <div className="pt-2">
              <a
                href="tel:+919999999999"
                className="pointer-events-auto inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/30 hover:scale-105"
              >
                Book Inspection Visit →
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
