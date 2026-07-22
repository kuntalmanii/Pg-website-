"use client";

import { useState, useRef, memo } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

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
    name: "Bed & Orthopaedic Mattress",
    detail: "Solid wood frame equipped with premium orthopaedic mattress and crisp luxury linens for restful sleep.",
    top: "62%",
    left: "28%",
    scrollStart: 0.1,
    scrollEnd: 0.25,
  },
  {
    id: "study",
    name: "Ergonomic Study Table",
    detail: "Dedicated study desk with laptop charging station, cable management, and comfortable task chair.",
    top: "54%",
    left: "48%",
    scrollStart: 0.25,
    scrollEnd: 0.4,
  },
  {
    id: "wardrobe",
    name: "Modular Storage Wardrobe",
    detail: "Full-height modular storage wardrobe with lockable drawer, clothes hanging bar, and shoe rack.",
    top: "35%",
    left: "15%",
    scrollStart: 0.4,
    scrollEnd: 0.55,
  },
  {
    id: "ac",
    name: "Split Air Conditioner",
    detail: "Individual quiet inverter split air conditioner unit for complete personal climate control.",
    top: "28%",
    left: "82%",
    scrollStart: 0.55,
    scrollEnd: 0.7,
  },
  {
    id: "washroom",
    name: "Attached Ensuite Washroom",
    detail: "Private attached washroom with modern bathroom fixtures, hot water geyser & vanity mirror.",
    top: "40%",
    left: "92%",
    scrollStart: 0.7,
    scrollEnd: 0.85,
  },
  {
    id: "lighting",
    name: "Warm Ambient Lighting",
    detail: "Warm ambient bedside illumination paired with focused study reading lights.",
    top: "52%",
    left: "74%",
    scrollStart: 0.85,
    scrollEnd: 1.0,
  },
];

function RoomStorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot>(roomHotspots[0]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Track active hotspot based on scroll progress
  scrollYProgress.on("change", (latest) => {
    const current = roomHotspots.find(
      (h) => latest >= h.scrollStart && latest <= h.scrollEnd
    );
    if (current && current.id !== selectedHotspot.id) {
      setSelectedHotspot(current);
    }
  });

  return (
    <section ref={containerRef} id="room-story" className="relative w-full bg-[#F7F1E8] section-padding">
      <div className="apple-container max-w-7xl mx-auto px-6 lg:px-12 w-full">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-sans font-semibold uppercase tracking-[0.25em] text-[#7C8DBB] block mb-3">
            Interactive Tour
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-[#2D2D2D]">
            Crafted Room Anatomy
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#2D2D2D]/70 mt-3">
            Scroll or click on room hotspots to explore each handcrafted interior feature.
          </p>
        </div>

        {/* Side-by-Side Grid: Left Room Image + Hotspots | Right Side Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left / Main Column: Room Image Frame with Overlaid Hotspot Pins */}
          <div className="lg:col-span-8 relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-[24px] overflow-hidden shadow-xl border border-[rgba(0,0,0,0.06)] bg-white">
            <Image
              src="/gallery/room-1.jpg"
              alt="LuxSpace Premium Room Anatomy"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover rounded-[24px]"
            />

            {/* Subtle Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 pointer-events-none rounded-[24px]" />

            {/* Overlaid Hotspot Pins */}
            {roomHotspots.map((hotspot) => {
              const isActive = selectedHotspot.id === hotspot.id;

              return (
                <button
                  key={hotspot.id}
                  type="button"
                  onClick={() => setSelectedHotspot(hotspot)}
                  style={{ top: hotspot.top, left: hotspot.left }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer group focus:outline-none"
                  aria-label={`View details for ${hotspot.name}`}
                >
                  <div className="relative flex items-center justify-center">
                    <span
                      className={`animate-ping absolute inline-flex h-8 w-8 rounded-full bg-[#7C8DBB]/40 ${
                        isActive ? "opacity-100" : "opacity-0 group-hover:opacity-75"
                      } transition-opacity`}
                    />
                    <span
                      className={`relative inline-flex rounded-full transition-all ${
                        isActive
                          ? "h-5 w-5 bg-[#7C8DBB] border-2 border-white shadow-lg scale-110"
                          : "h-4 w-4 bg-white/90 border-2 border-[#7C8DBB] group-hover:scale-110"
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Side Panel with Feature Details & Interactive Hotspot Selector */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Active Feature Detail Card */}
            <motion.div
              key={selectedHotspot.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="luxury-card p-6 sm:p-8 bg-white rounded-[24px] border border-[rgba(0,0,0,0.06)] shadow-md space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-sans font-semibold uppercase tracking-widest text-[#7C8DBB]">
                  Feature Highlight
                </span>
                <span className="w-2 h-2 rounded-full bg-[#7C8DBB]" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#2D2D2D]">
                {selectedHotspot.name}
              </h3>
              <p className="font-sans text-sm text-[#2D2D2D]/75 leading-relaxed font-light">
                {selectedHotspot.detail}
              </p>
            </motion.div>

            {/* List of Features Selector */}
            <div className="luxury-card p-4 bg-white rounded-[24px] border border-[rgba(0,0,0,0.06)] shadow-sm space-y-2">
              <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-[#2D2D2D]/50 px-3 block mb-1">
                Select Feature
              </span>
              {roomHotspots.map((h) => {
                const isCurrent = selectedHotspot.id === h.id;
                return (
                  <button
                    key={h.id}
                    type="button"
                    onClick={() => setSelectedHotspot(h)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-sans font-medium transition-all flex items-center justify-between ${
                      isCurrent
                        ? "bg-[#7C8DBB] text-white shadow-sm font-semibold"
                        : "text-[#2D2D2D]/80 hover:bg-[#F7F1E8]"
                    }`}
                  >
                    <span>{h.name}</span>
                    {isCurrent && (
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(RoomStorySection);
