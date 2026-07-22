"use client";

import { memo } from "react";
import { motion } from "framer-motion";

function HeroSection() {
  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-[#050505]">
      {/* Background Video */}
      <video
        src="/hero/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay with 30% Opacity */}
      <div className="absolute inset-0 bg-black/30 z-10" />

      {/* Hero Content Container */}
      <div className="relative z-20 apple-container text-center flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center max-w-4xl mx-auto"
        >
          {/* Main Title Heading */}
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-bold text-white tracking-tight leading-none drop-shadow-lg mb-4">
            LUXSPACE
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-xl sm:text-2xl md:text-3xl font-medium text-white/90 tracking-tight drop-shadow-md mb-3">
            Premium Co-Living in Noida
          </p>

          {/* Location / Amity Highlight */}
          <p className="font-sans text-sm sm:text-base md:text-lg font-light text-white/80 tracking-wide uppercase drop-shadow-sm mb-10">
            Walking Distance from Amity University
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <a
              href="#schedule-visit"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-sans font-semibold uppercase tracking-wider text-white bg-[#7C8DBB] hover:bg-[#6B7CA9] transition-colors shadow-lg shadow-black/20"
            >
              Schedule Visit
            </a>
            <a
              href="#room-story"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-sans font-semibold uppercase tracking-wider text-white border border-white/40 hover:bg-white/10 backdrop-blur-sm transition-colors shadow-lg shadow-black/20"
            >
              View Rooms
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default memo(HeroSection);
