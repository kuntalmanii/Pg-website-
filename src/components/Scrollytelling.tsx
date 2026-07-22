"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import {
  useScroll,
  useSpring,
  useTransform,
  motion,
  AnimatePresence,
} from "framer-motion";
import {
  Wind,
  Bath,
  Laptop,
  VolumeX,
  Volume2,
} from "lucide-react";

/* ── Apple Feature Reveals ────────────────────────────────────────────────── */
const FEATURES = [
  {
    id: "climate",
    label: "Climate",
    icon: Wind,
    badge: "Climate Control",
    headline: "Personalized Inverter AC.",
    subheadline: "24/7 dual power backup. Stay cool & focused around the clock.",
    detail: "Independent climate control unit in every single room. Zero noise, high efficiency, and instant cooling even during peak summer.",
    accent: "#A7B7E7",
    scrollStart: 0.1,
    scrollEnd: 0.38,
  },
  {
    id: "washroom",
    label: "En-Suite Bath",
    icon: Bath,
    badge: "Private Bathroom",
    headline: "Private En-Suite Washroom.",
    subheadline: "Attached hot water geyser & modern sanitaryware.",
    detail: "Every room comes with its own private attached bathroom. Anti-skid ceramic flooring, instant hot water, and premium brass fittings.",
    accent: "#A7B7E7",
    scrollStart: 0.4,
    scrollEnd: 0.68,
  },
  {
    id: "study",
    label: "Study Station",
    icon: Laptop,
    badge: "Work & Study",
    headline: "Dedicated Gigabit Desk.",
    subheadline: "Ergonomic seating & 100 Mbps Fibre Wi-Fi.",
    detail: "Thoughtfully engineered study nook with dedicated task lighting, dual universal power ports, and low-latency fibre connectivity.",
    accent: "#A7B7E7",
    scrollStart: 0.7,
    scrollEnd: 0.95,
  },
];

export default function Scrollytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  /* Track scroll position */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /* Smooth spring interpolation for 60fps motion */
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.0005,
  });

  useEffect(() => {
    return smoothProgress.on("change", (latest) => {
      setScrollProgress(latest);
    });
  }, [smoothProgress]);

  // Subtle video scale on scroll
  const mediaScale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.05, 1.08]);

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  }, [isMuted]);

  /* Smooth scroll to feature target */
  const jumpToFeature = (startProgress: number) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const top = container.offsetTop + startProgress * (container.offsetHeight - window.innerHeight);
    window.scrollTo({ top, behavior: "smooth" });
  };

  // Determine active feature
  const activeFeature = FEATURES.find(
    (f) => scrollProgress >= f.scrollStart && scrollProgress <= f.scrollEnd
  ) || FEATURES[0];

  return (
    <section
      id="scrollytelling"
      ref={containerRef}
      className="relative w-full bg-[#050505] text-[#FDFBF7]"
      style={{ height: "350vh" }}
      aria-label="Room Architecture Showcase"
    >
      {/* ── Sticky Fullscreen Viewport ────────────────────────────────── */}
      <div className="sticky top-0 w-full h-[100dvh] overflow-hidden bg-[#050505]">

        {/* ── 1. Fullscreen Background Video (100% Width & Height) ───── */}
        <motion.div
          style={{ scale: mediaScale }}
          className="absolute inset-0 w-full h-full bg-[#050505]"
        >
          <video
            ref={videoRef}
            src="/hero-banner.mp4"
            poster="/luxspace_room_showcase.png"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            preload="auto"
            className="w-full h-full object-cover bg-[#050505]"
          />

          {/* Fullscreen Gradient Overlay for Contrast & Vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.35) 45%, rgba(5,5,5,0.7) 100%), radial-gradient(ellipse at center, transparent 40%, rgba(5,5,5,0.65) 100%)",
            }}
            aria-hidden
          />
        </motion.div>

        {/* ── Viewport UI Overlay Grid ────────────────────────────────── */}
        <div className="relative z-20 w-full h-full flex flex-col justify-between p-6 md:p-12">

          {/* ── Top Bar: Section Label & Sound Control ────────────────── */}
          <div className="flex items-center justify-between max-w-6xl mx-auto w-full">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#A7B7E7]">
                Room Architecture
              </p>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-[#FDFBF7] mt-0.5">
                Engineered for living.
              </h2>
            </div>

            <button
              type="button"
              onClick={toggleMute}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-black/50 border border-white/15 text-white/85 hover:text-white hover:bg-black/70 transition-all cursor-pointer backdrop-blur-md shadow-lg"
            >
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} className="text-[#A7B7E7]" />}
              <span className="text-[10px] uppercase font-semibold tracking-wider">
                {isMuted ? "Muted" : "Sound On"}
              </span>
            </button>
          </div>

          {/* ── Floating Apple-Style Feature Info Card ────────────────── */}
          <div className="max-w-6xl mx-auto w-full flex items-end">
            <div className="max-w-sm md:max-w-md w-full mb-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature.id}
                  initial={{ opacity: 0, y: 18, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="p-6 md:p-7 rounded-3xl backdrop-blur-3xl border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.85)]"
                  style={{
                    background: "rgba(5, 5, 5, 0.85)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <activeFeature.icon size={16} className="text-[#A7B7E7]" />
                    <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#A7B7E7]">
                      {activeFeature.badge}
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-black tracking-tight text-[#FDFBF7]">
                    {activeFeature.headline}
                  </h3>
                  <p className="text-xs md:text-sm font-semibold text-[#A7B7E7] mt-1">
                    {activeFeature.subheadline}
                  </p>

                  <p className="text-xs text-[rgba(253,251,247,0.65)] mt-2.5 leading-relaxed">
                    {activeFeature.detail}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ── Bottom Dock Bar: Apple Floating Segmented Switcher ────── */}
          <div className="flex items-center justify-between max-w-6xl mx-auto w-full pt-4 border-t border-white/15 gap-4 flex-wrap">

            {/* Apple Floating Dock */}
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-black/60 border border-white/15 backdrop-blur-xl">
              {FEATURES.map((feature) => {
                const isActive = activeFeature.id === feature.id;
                const Icon = feature.icon;

                return (
                  <button
                    key={feature.id}
                    type="button"
                    onClick={() => jumpToFeature(feature.scrollStart)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-[#FDFBF7] text-[#050505] shadow-lg scale-105"
                        : "text-[rgba(253,251,247,0.6)] hover:text-[#FDFBF7] hover:bg-white/10"
                    }`}
                  >
                    <Icon size={14} className={isActive ? "text-[#050505]" : "text-[rgba(253,251,247,0.5)]"} />
                    <span>{feature.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Minimal Scroll Progress Bar */}
            <div className="flex items-center gap-3">
              <div className="w-28 sm:w-36 h-1.5 bg-white/15 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#A7B7E7] rounded-full"
                  style={{
                    width: `${scrollProgress * 100}%`,
                  }}
                />
              </div>
              <span className="text-xs font-mono text-[rgba(253,251,247,0.5)]">
                {Math.round(scrollProgress * 100)}%
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
