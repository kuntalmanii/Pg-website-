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
  const [activeFeatureId, setActiveFeatureId] = useState<string>(FEATURES[0].id);
  const activeFeatureIdRef = useRef<string>(FEATURES[0].id);
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

  /* Low-overhead threshold listener — prevents main-thread re-render lag */
  useEffect(() => {
    return smoothProgress.on("change", (latest) => {
      const feature = FEATURES.find(
        (f) => latest >= f.scrollStart && latest <= f.scrollEnd
      ) || FEATURES[0];

      if (feature.id !== activeFeatureIdRef.current) {
        activeFeatureIdRef.current = feature.id;
        setActiveFeatureId(feature.id);
      }
    });
  }, [smoothProgress]);

  // GPU accelerated progress width (zero React re-renders)
  const progressWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  /* Preload sequence / preview images with proper cleanup on unmount */
  useEffect(() => {
    const imagesToPreload = ["/luxspace_room_showcase.png", "/frames/frame-000.jpg"];
    const loadedImages: HTMLImageElement[] = [];

    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
      loadedImages.push(img);
    });

    return () => {
      loadedImages.forEach((img) => {
        img.onload = null;
        img.onerror = null;
        img.src = "";
      });
    };
  }, []);

  // Subtle video scale on scroll
  const mediaScale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.05, 1.08]);

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
      if (!nextMuted) {
        videoRef.current.play().catch(() => {});
      }
    }
  }, []);

  /* Smooth scroll to feature target */
  const jumpToFeature = (startProgress: number) => {
    if (typeof window === "undefined" || !containerRef.current) return;
    const container = containerRef.current;
    const top = container.offsetTop + startProgress * (container.offsetHeight - window.innerHeight);
    window.scrollTo({ top, behavior: "smooth" });
  };

  // Determine active feature based on activeFeatureId state
  const activeFeature = FEATURES.find((f) => f.id === activeFeatureId) || FEATURES[0];

  return (
    <section
      id="scrollytelling"
      ref={containerRef}
      className="relative w-full bg-[#050505] text-[#FDFBF7] scroll-mt-24"
      style={{ height: "350vh" }}
      aria-label="Room Architecture Showcase"
    >
      {/* ── Sticky Fullscreen Viewport (Hardware Accelerated) ───────────── */}
      <div className="sticky top-0 w-full h-[100dvh] overflow-hidden bg-[#050505] will-change-transform transform-gpu">

        {/* ── 1. Fullscreen Background Video (100% Width & Height) ───── */}
        <motion.div
          style={{ scale: mediaScale }}
          className="absolute inset-0 w-full h-full bg-[#050505]"
        >
          <video
            ref={videoRef}
            src="/luxspace_room_showcase.mp4"
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
        <div className="relative z-20 w-full h-full flex flex-col justify-between p-6 sm:p-10 md:p-14 lg:p-16">

          {/* ── Top Bar: Section Label & Sound Control ────────────────── */}
          <div className="flex items-center justify-between max-w-6xl mx-auto w-full">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#D4B886]">
                Room Architecture
              </p>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-[#F7F4EF] mt-1">
                Engineered for living.
              </h2>
            </div>

            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute video audio" : "Mute video audio"}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-[#1C1A18]/80 text-[#F7F4EF]/85 hover:text-[#F7F4EF] hover:bg-[#1C1A18]/95 transition-all cursor-pointer backdrop-blur-xl shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B886]"
            >
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} className="text-[#D4B886]" />}
              <span className="text-[10px] uppercase font-semibold tracking-wider">
                {isMuted ? "Muted" : "Sound On"}
              </span>
            </button>
          </div>

          {/* ── Floating Apple-Style Feature Info Card ────────────────── */}
          <div className="max-w-6xl mx-auto w-full flex items-end">
            <div className="max-w-sm md:max-w-lg w-full mb-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature.id}
                  initial={{ opacity: 0, y: 18, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="p-8 sm:p-9 md:p-10 rounded-3xl backdrop-blur-3xl shadow-[0_30px_70px_rgba(0,0,0,0.6)]"
                  style={{
                    background: "rgba(28, 26, 24, 0.85)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-2.5">
                    <activeFeature.icon size={16} className="text-[#D4B886]" />
                    <span className="text-[10px] font-mono font-medium tracking-[0.18em] uppercase text-[#D4B886]">
                      {activeFeature.badge}
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight text-[#F7F4EF]">
                    {activeFeature.headline}
                  </h3>
                  <p className="text-xs md:text-sm font-medium text-[#D4B886] mt-1.5">
                    {activeFeature.subheadline}
                  </p>

                  <p className="text-xs md:text-sm font-normal text-[#B5ACA1] mt-3 leading-relaxed">
                    {activeFeature.detail}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ── Bottom Dock Bar: Apple Floating Segmented Switcher ────── */}
          <div className="flex items-center justify-between max-w-6xl mx-auto w-full pt-6 gap-6 flex-wrap">

            {/* Apple Floating Dock */}
            <div className="flex items-center gap-1 sm:gap-1.5 p-1.5 rounded-full bg-[#1C1A18]/90 backdrop-blur-2xl shadow-[0_16px_48px_rgba(0,0,0,0.45)] max-w-full overflow-x-auto">
              {FEATURES.map((feature) => {
                const isActive = activeFeature.id === feature.id;
                const Icon = feature.icon;

                return (
                  <button
                    key={feature.id}
                    type="button"
                    onClick={() => jumpToFeature(feature.scrollStart)}
                    className={`flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full text-[11px] sm:text-xs font-medium tracking-[0.015em] whitespace-nowrap transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B886] ${
                      isActive
                        ? "bg-[#D4B886] text-[#1C1A18] shadow-[0_4px_16px_rgba(212,184,134,0.35)] scale-105"
                        : "text-[#B5ACA1] hover:text-[#F7F4EF] hover:bg-white/10"
                    }`}
                  >
                    <Icon size={13} className={isActive ? "text-[#1C1A18]" : "text-[#B5ACA1]"} />
                    <span>{feature.label}</span>
                  </button>
                );
              })}
            </div>

              {/* Minimal Scroll Progress Bar — no debug counter */}
              <div className="flex items-center gap-3">
                <div className="w-28 sm:w-36 h-1.5 bg-[#D4B886]/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[#D4B886] rounded-full"
                    style={{ width: progressWidth }}
                  />
                </div>
              </div>

          </div>

        </div>
      </div>
    </section>
  );
}
