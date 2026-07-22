"use client";

import { memo } from "react";
import { motion } from "framer-motion";

function HeroSection() {
  return (
    <section id="hero" className="relative w-full min-h-screen h-screen overflow-hidden flex items-center bg-[#F7F1E8]">
      <div className="apple-container max-w-7xl mx-auto px-6 lg:px-12 w-full pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading, Description & Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center text-left"
          >
            <span className="text-xs font-sans font-semibold uppercase tracking-[0.25em] text-[#7C8DBB] block mb-4">
              Sector 126 Noida
            </span>
            <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-bold text-[#2D2D2D] tracking-tight leading-none mb-6">
              LUXSPACE
            </h1>
            <p className="font-sans text-xl sm:text-2xl font-medium text-[#2D2D2D]/90 tracking-tight mb-3">
              Premium Co-Living in Noida
            </p>
            <p className="font-sans text-sm sm:text-base font-light text-[#2D2D2D]/70 tracking-wide uppercase mb-8">
              Walking Distance from Amity University
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <a
                href="#schedule-visit"
                className="w-full sm:w-auto text-center px-8 py-4 rounded-full text-xs font-sans font-semibold uppercase tracking-wider text-white bg-[#7C8DBB] hover:bg-[#6B7CA9] transition-all shadow-md active:scale-95"
              >
                Schedule Visit
              </a>
              <a
                href="#room-story"
                className="w-full sm:w-auto text-center px-8 py-4 rounded-full text-xs font-sans font-semibold uppercase tracking-wider text-[#2D2D2D] border border-[#2D2D2D]/20 hover:bg-[#2D2D2D]/5 transition-all shadow-sm active:scale-95"
              >
                View Rooms
              </a>
            </div>
          </motion.div>

          {/* Right Column: Hero Video Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 luxury-card rounded-[24px] overflow-hidden aspect-[4/3] lg:aspect-[16/11] relative shadow-xl border border-[rgba(0,0,0,0.06)] bg-white"
          >
            <video
              src="/hero/hero.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover rounded-[24px]"
            />
            {/* Soft Overlay */}
            <div className="absolute inset-0 bg-black/10 pointer-events-none rounded-[24px]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default memo(HeroSection);
