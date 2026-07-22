"use client";

import { useRef, memo } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface Hotspot {
  id: string;
  name: string;
  detail: string;
  top: string;
  left: string;
  scrollStart: number;
  scrollEnd: number;
}

const roomHotspots: Hotspot[] = [
  {
    id: "bed",
    name: "Bed",
    detail: "Solid wood frame with orthopaedic mattress & crisp linens",
    top: "62%",
    left: "28%",
    scrollStart: 0.15,
    scrollEnd: 0.3,
  },
  {
    id: "study",
    name: "Study Table",
    detail: "Dedicated ergonomic study desk with laptop charging station",
    top: "54%",
    left: "48%",
    scrollStart: 0.3,
    scrollEnd: 0.45,
  },
  {
    id: "wardrobe",
    name: "Wardrobe",
    detail: "Full-height modular storage wardrobe with lockable drawer",
    top: "35%",
    left: "15%",
    scrollStart: 0.45,
    scrollEnd: 0.6,
  },
  {
    id: "ac",
    name: "AC",
    detail: "Individual quiet inverter air conditioner unit",
    top: "28%",
    left: "82%",
    scrollStart: 0.6,
    scrollEnd: 0.72,
  },
  {
    id: "washroom",
    name: "Washroom",
    detail: "Ensuite private attached bathroom with hot water geyser",
    top: "40%",
    left: "92%",
    scrollStart: 0.72,
    scrollEnd: 0.85,
  },
  {
    id: "lighting",
    name: "Lighting",
    detail: "Warm ambient bedside lamp & focused study task lights",
    top: "52%",
    left: "74%",
    scrollStart: 0.85,
    scrollEnd: 0.95,
  },
];

function HotspotPin({ hotspot, progress }: { hotspot: Hotspot; progress: MotionValue<number> }) {
  const pStartMinus = Math.max(0, hotspot.scrollStart - 0.04);
  const pStart = Math.max(0, Math.min(1, hotspot.scrollStart));
  const pEnd = Math.max(0, Math.min(1, hotspot.scrollEnd));
  const pEndPlus = Math.min(1, hotspot.scrollEnd + 0.04);

  const opacity = useTransform(
    progress,
    [pStartMinus, pStart, pEnd, pEndPlus],
    [0, 1, 1, 0]
  );

  const scale = useTransform(
    progress,
    [pStartMinus, pStart, pEnd],
    [0.7, 1, 1]
  );

  const isRightSide = parseInt(hotspot.left) > 60;

  return (
    <motion.div
      style={{
        top: hotspot.top,
        left: hotspot.left,
        opacity,
        scale,
      }}
      className="absolute -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
    >
      {/* Pulsing Target Ring */}
      <div className="relative flex items-center justify-center">
        <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-[#7C8DBB]/40 opacity-75" />
        <span className="relative inline-flex rounded-full h-4 w-4 bg-[#7C8DBB] border-2 border-white shadow-md" />
      </div>

      {/* Floating Glass Annotation Badge */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 w-56 sm:w-64 p-3.5 sm:p-4 rounded-2xl bg-[#FFFDF9]/95 backdrop-blur-md border border-[rgba(0,0,0,0.08)] shadow-xl text-left ${
          isRightSide ? "right-6" : "left-6"
        }`}
      >
        <span className="text-[10px] font-sans font-semibold uppercase tracking-widest text-[#7C8DBB] block mb-1">
          Feature
        </span>
        <h4 className="font-serif text-base sm:text-lg font-bold text-[#2D2D2D] leading-tight mb-1">
          {hotspot.name}
        </h4>
        <p className="font-sans text-xs text-[#2D2D2D]/70 font-light leading-relaxed">
          {hotspot.detail}
        </p>
      </div>
    </motion.div>
  );
}

function RoomStorySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const roomOpacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.95, 1],
    [0.2, 1, 1, 0.4]
  );

  return (
    <section ref={containerRef} className="relative w-full h-[300vh] bg-[#F7F1E8]">
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-center items-center">
        {/* Section Title Header Overlay */}
        <div className="absolute top-20 sm:top-24 left-0 right-0 z-40 apple-container text-center pointer-events-none">
          <span className="text-xs font-sans font-semibold uppercase tracking-[0.25em] text-[#7C8DBB] block mb-2">
            Interactive Room Tour
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-[#2D2D2D]">
            Crafted Room Anatomy
          </h2>
        </div>

        {/* Room High-Res Image Showcase Frame */}
        <motion.div
          style={{ opacity: roomOpacity }}
          className="relative w-full max-w-5xl aspect-[16/10] sm:aspect-[16/9] mx-auto px-4 sm:px-6 rounded-[28px] sm:rounded-[32px] overflow-hidden shadow-2xl border border-[rgba(0,0,0,0.06)] bg-[#FFFDF9]"
        >
          <Image
            src="/gallery/room-1.jpg"
            alt="LuxSpace Premium Room Tour"
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="w-full h-full object-cover rounded-[24px] sm:rounded-[28px]"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20 pointer-events-none rounded-[24px] sm:rounded-[28px]" />

          {/* Hotspot Annotations */}
          {roomHotspots.map((hotspot) => (
            <HotspotPin
              key={hotspot.id}
              hotspot={hotspot}
              progress={scrollYProgress}
            />
          ))}
        </motion.div>

        {/* Scroll Instruction Indicator */}
        <div className="absolute bottom-6 sm:bottom-8 z-40 text-center pointer-events-none">
          <span className="text-[11px] font-sans uppercase tracking-widest text-[#2D2D2D]/50">
            Scroll to inspect room features ↓
          </span>
        </div>
      </div>
    </section>
  );
}

export default memo(RoomStorySection);
