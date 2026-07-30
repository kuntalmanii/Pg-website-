"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Star, MapPin, Utensils, ShieldCheck, ArrowUpRight } from "lucide-react";

/* ── Animation helpers ───────────────────────────────────────────────────── */
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 24 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.8, ease: EASE, delay },
});

interface HeroVideoProps {
  onOpen?: () => void;
  onSchedule?: () => void;
}

export default function HeroVideo({ onOpen, onSchedule }: HeroVideoProps) {
  const handleOpen = onOpen || onSchedule || (() => {});
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  /* ── Parallax Scroll Motion Values ───────────────────────────────────────── */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);
  const contentY   = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full h-[100dvh] overflow-hidden bg-[#1C1A18] scroll-mt-24"
      aria-label="Hero section"
    >
      {/* ── Parallax Video Background ──────────────────────────────────── */}
      <motion.div
        style={{ scale: videoScale }}
        className="absolute inset-0 w-full h-full origin-center pointer-events-none"
      >
        <video
          ref={videoRef}
          src="/hero-banner.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/frames/frame-000.jpg"
          className="w-full h-full object-cover opacity-65"
          aria-hidden="true"
        />
      </motion.div>

      {/* ── Layered Ambient Gradient Masks ─────────────────────────────── */}
      {/* Bottom seamless blend into canvas */}
      <div
        className="absolute bottom-0 inset-x-0 h-[60%] pointer-events-none"
        style={{
          background: "linear-gradient(to top, #1C1A18 0%, rgba(28,26,24,0.85) 35%, rgba(28,26,24,0.4) 65%, transparent 100%)",
        }}
        aria-hidden
      />
      {/* Left vignette for reading comfort */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to right, rgba(28,26,24,0.65) 0%, transparent 60%)" }}
        aria-hidden
      />
      {/* Top gradient for floating navbar clarity */}
      <div
        className="absolute top-0 inset-x-0 h-40 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(28,26,24,0.5) 0%, transparent 100%)" }}
        aria-hidden
      />

      {/* ── Floating Live Status Pill — Top Right ───────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1,  y: 0   }}
        transition={{ delay: 0.7, duration: 0.6, ease: EASE }}
      className="hidden sm:flex absolute top-10 right-8 md:right-12 items-center gap-2.5 px-4 py-2 rounded-full z-20 shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
        style={{
          background:           "rgba(28,26,24,0.65)",
          backdropFilter:       "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
        aria-label="Location: Sector 126, Noida"
      >
        {/* Live status dot */}
        <span className="relative flex h-2 w-2 shrink-0" aria-hidden>
          <motion.span
            animate={{ scale: [1, 2.2], opacity: [0.7, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
            className="absolute inline-flex h-full w-full rounded-full bg-[#D4B886]"
          />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#D4B886]" />
        </span>

        <span className="text-[10px] font-medium tracking-[0.18em] uppercase text-[#F7F4EF]/85">
          Sector 126 &bull; Noida
        </span>
      </motion.div>

      {/* ── Main Hero Content ──────────────────────────────────────────── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 w-full h-full flex flex-col justify-end pb-12 sm:pb-16 md:pb-20 px-6 sm:px-10 md:px-16 lg:px-20 max-w-6xl mx-auto"
      >
        {/* Location pill */}
        <motion.div {...fadeUp(0.1)} className="mb-5 flex items-center gap-2">
          <span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-medium tracking-[0.18em] uppercase shadow-[0_4px_24px_rgba(212,184,134,0.22)]"
            style={{
              background:     "rgba(212,184,134,0.14)",
              color:          "#D4B886",
              backdropFilter: "blur(16px)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4B886] shrink-0" aria-hidden />
            Near Amity University Gate 2 · 2 min walk
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.22)}
          className="text-[clamp(2.6rem,6.8vw,5.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-[#F7F4EF]"
        >
          Unrivaled Comfort.
          <br />
          <span
            style={{
              background:           "linear-gradient(95deg, #F7F4EF 30%, #D4B886 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor:  "transparent",
            }}
          >
            Exceptional Living.
          </span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          {...fadeUp(0.35)}
          className="mt-5 max-w-xl md:max-w-2xl text-[clamp(0.95rem,1.7vw,1.15rem)] leading-relaxed text-[#B5ACA1] font-normal"
        >
          Luxury student residence engineered for peace of mind — featuring 3 chef-prepared meals, high-speed Wi-Fi, daily housekeeping, and study-focused spaces minutes from{" "}
          <span className="text-[#D4B886] font-medium">Amity University</span>.
        </motion.p>

        {/* CTA Row */}
        <motion.div {...fadeUp(0.48)} className="mt-8 md:mt-10 flex items-center gap-4 sm:gap-5 flex-wrap">
          <button
            id="hero-cta-schedule"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleOpen();
            }}
            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-xs sm:text-sm font-semibold tracking-[0.02em] text-[#1C1A18] transition-all duration-300 cursor-pointer shadow-[0_8px_32px_rgba(212,184,134,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B886]"
            style={{ background: "#D4B886" }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 12px 40px rgba(212,184,134,0.6)")}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 8px 32px rgba(212,184,134,0.4)")}
          >
            Schedule a Private Tour
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </button>

          <a
            id="hero-cta-tour"
            href="#scrollytelling"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-xs sm:text-sm font-medium tracking-[0.02em] text-[#F7F4EF] hover:bg-white/18 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B886]"
            style={{
              background:     "rgba(255,255,255,0.1)",
              backdropFilter: "blur(16px)",
              boxShadow:      "0 4px 24px rgba(0,0,0,0.2)",
            }}
          >
            Explore Room Architecture
            <ChevronDown size={15} />
          </a>
        </motion.div>

        {/* ── High-Trust Indicator Bar (Communicating ₹20k+/month Value) ───── */}
        <motion.div
          {...fadeUp(0.6)}
          className="mt-12 pt-6 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
        >
          {/* Trust Stat 1 */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 bg-[#D4B886]/16 text-[#D4B886]">
              <Star size={18} fill="#D4B886" strokeWidth={1} />
            </div>
            <div>
              <p className="text-xs font-bold text-[#F7F4EF]">4.9 / 5 Rating</p>
              <p className="text-[11px] text-[#B5ACA1]">50+ Resident Reviews</p>
            </div>
          </div>

          {/* Trust Stat 2 */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 bg-[#D4B886]/16 text-[#D4B886]">
              <MapPin size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-[#F7F4EF]">2 Min Walk</p>
              <p className="text-[11px] text-[#B5ACA1]">Amity Gate 2 Noida</p>
            </div>
          </div>

          {/* Trust Stat 3 — hidden on small mobile, visible md+ */}
          <div className="hidden md:flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 bg-[#D4B886]/16 text-[#D4B886]">
              <Utensils size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-[#F7F4EF]">3 Chef Meals</p>
              <p className="text-[11px] text-[#B5ACA1]">Fresh & Hygienic</p>
            </div>
          </div>

          {/* Trust Stat 4 — hidden on small mobile, visible md+ */}
          <div className="hidden md:flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 bg-[#D4B886]/16 text-[#D4B886]">
              <ShieldCheck size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-[#F7F4EF]">24/7 Security</p>
              <p className="text-[11px] text-[#B5ACA1]">Biometric Access</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Scroll to Discover Indicator — Bottom Right ──────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="hidden lg:flex absolute bottom-8 right-12 z-20 flex-col items-center gap-2 pointer-events-none"
        aria-hidden
      >
        <span className="text-[9px] font-medium tracking-[0.24em] uppercase text-[#B5ACA1]/60">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown size={14} className="text-[#D4B886]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
