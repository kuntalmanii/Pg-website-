"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles, MapPin } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

interface GalleryItem {
  id: string;
  title: string;
  category: "suites" | "lounge" | "dining" | "terrace";
  categoryLabel: string;
  src: string;
  aspectRatio: string;
  location: string;
  caption: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "exec-suite",
    title: "Executive Private Suite",
    category: "suites",
    categoryLabel: "Suites & Rooms",
    src: "/gallery/executive-suite.png",
    aspectRatio: "aspect-[4/3]",
    location: "Floor 2 • West Wing",
    caption: "Sunlit private suite featuring acoustic double-glazed windows, private workstation, and ensuite marble bath.",
  },
  {
    id: "lounge-study",
    title: "Double-Height Social Lounge",
    category: "lounge",
    categoryLabel: "Lounge & Study",
    src: "/gallery/lounge-study.png",
    aspectRatio: "aspect-square",
    location: "Ground Level • Main Hub",
    caption: "Architectural study sanctuary with warm Scandinavian furniture, acoustic quiet zones, and Gigabit Wi-Fi.",
  },
  {
    id: "dining-kitchen",
    title: "Gourmet Chef Kitchen & Dining",
    category: "dining",
    categoryLabel: "Dining & Kitchen",
    src: "/gallery/dining-kitchen.png",
    aspectRatio: "aspect-[4/3]",
    location: "Level 1 • Residence Dining",
    caption: "Marble dining island offering 3 fresh daily chef-curated meals, organic fruit bowls, and espresso station.",
  },
  {
    id: "dual-suite",
    title: "Premium Dual Suite",
    category: "suites",
    categoryLabel: "Suites & Rooms",
    src: "/gallery/dual-suite.png",
    aspectRatio: "aspect-square",
    location: "Floor 3 • East Wing",
    caption: "Spacious twin sharing suite with individual study nooks, twin queen beds, and built-in oak wardrobes.",
  },
  {
    id: "rooftop-deck",
    title: "Sunset Rooftop Lounge & Firepit",
    category: "terrace",
    categoryLabel: "Rooftop Terrace",
    src: "/gallery/rooftop-deck.png",
    aspectRatio: "aspect-[16/10]",
    location: "Rooftop • 360° Skyline",
    caption: "Panoramic skyline deck equipped with ambient string lighting, firepit lounge, and outdoor relaxing zones.",
  },
];

const CATEGORIES = [
  { id: "all", label: "All Spaces" },
  { id: "suites", label: "Suites & Rooms" },
  { id: "lounge", label: "Lounge & Study" },
  { id: "dining", label: "Dining & Kitchen" },
  { id: "terrace", label: "Rooftop Terrace" },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = GALLERY_ITEMS.filter(
    (item) => activeCategory === "all" || item.category === activeCategory
  );

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const nextImage = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % filteredItems.length : 0
    );
  }, [lightboxIndex, filteredItems.length]);

  const prevImage = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : 0
    );
  }, [lightboxIndex, filteredItems.length]);

  /* Keyboard Navigation Listener */
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, closeLightbox, nextImage, prevImage]);

  /* Prevent background scroll when Lightbox is open */
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    }
    return () => {
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }
    };
  }, [lightboxIndex]);

  const activeItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <section
      id="gallery"
      className="relative py-28 sm:py-36 md:py-44 bg-[#FAF6F0] overflow-hidden scroll-mt-24"
      aria-label="Residence Gallery"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-10 md:px-16 lg:px-20">

        {/* ── Section Header ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.85, ease: EASE }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 sm:mb-16"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-mono font-medium tracking-[0.2em] uppercase bg-[#D4B886]/14 text-[#D4B886]">
                <Sparkles size={12} />
                ARCHITECTURAL GALLERY
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#24211E] leading-[1.1]">
              A Glimpse into <span className="text-[#D4B886]">Luxspace.</span>
            </h2>
          </div>

          <p className="max-w-md text-xs sm:text-sm font-normal text-[#736B63] leading-relaxed">
            Explore curated living spaces, study lounges, dining halls, and rooftop gardens — captured in natural light.
          </p>
        </motion.div>

        {/* ── Category Filter Pills ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="flex items-center gap-2 mb-10 overflow-x-auto pb-2 custom-scrollbar"
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-medium tracking-[0.01em] whitespace-nowrap transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B886] ${
                  isActive
                    ? "bg-[#D4B886] text-[#1C1A18] shadow-[0_4px_16px_rgba(212,184,134,0.35)]"
                    : "bg-[#24211E]/5 text-[#736B63] hover:bg-[#24211E]/10 hover:text-[#24211E]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </motion.div>

        {/* ── Masonry Grid Layout ─────────────────────────────────────── */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, ease: EASE }}
                whileHover={{ y: -6 }}
                onClick={() => openLightbox(idx)}
                className={`group relative ${item.aspectRatio} rounded-3xl overflow-hidden cursor-pointer shadow-[0_12px_40px_rgba(36,33,30,0.06)] bg-[#24211E]/5`}
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  loading="lazy"
                />

                {/* Dark Ambient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A18]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Hover Content */}
                <div className="absolute bottom-0 inset-x-0 p-6 flex items-end justify-between z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div>
                    <span className="text-[10px] font-mono font-medium tracking-[0.14em] uppercase text-[#D4B886] mb-1 block">
                      {item.categoryLabel}
                    </span>
                    <h3 className="text-base font-bold text-[#F7F4EF] leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  <div className="w-9 h-9 rounded-full bg-[#FAF6F0]/20 backdrop-blur-md flex items-center justify-center text-[#F7F4EF]">
                    <Maximize2 size={16} />
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── Interactive Lightbox Modal ───────────────────────────────── */}
      <AnimatePresence>
        {lightboxIndex !== null && activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
              className="fixed inset-0 bg-[#1C1A18]/90 backdrop-blur-2xl"
            />

            {/* Lightbox Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="relative z-10 w-full max-w-5xl max-h-[90vh] flex flex-col rounded-3xl overflow-hidden bg-[#1C1A18] shadow-[0_30px_90px_rgba(0,0,0,0.8)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Controls Bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 text-[#F7F4EF]">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-medium tracking-[0.18em] uppercase text-[#D4B886]">
                    {activeItem.categoryLabel}
                  </span>
                  <span className="text-xs text-[#B5ACA1]/60">•</span>
                  <span className="text-xs text-[#B5ACA1] font-mono">
                    {lightboxIndex + 1} / {filteredItems.length}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={closeLightbox}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B886]"
                  aria-label="Close Lightbox"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Main Image Display */}
              <div className="relative flex-1 min-h-[380px] sm:min-h-[500px] w-full bg-black/40 overflow-hidden flex items-center justify-center">
                <Image
                  src={activeItem.src}
                  alt={activeItem.title}
                  fill
                  sizes="100vw"
                  className="object-contain p-2 sm:p-4"
                  priority
                />

                {/* Left Navigation Arrow */}
                <button
                  type="button"
                  onClick={prevImage}
                  className="absolute left-4 p-3 rounded-full bg-black/50 hover:bg-black/80 text-[#F7F4EF] backdrop-blur-md transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B886]"
                  aria-label="Previous Image"
                >
                  <ChevronLeft size={20} />
                </button>

                {/* Right Navigation Arrow */}
                <button
                  type="button"
                  onClick={nextImage}
                  className="absolute right-4 p-3 rounded-full bg-black/50 hover:bg-black/80 text-[#F7F4EF] backdrop-blur-md transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B886]"
                  aria-label="Next Image"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Bottom Caption Bar */}
              <div className="p-6 bg-[#1C1A18] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1 text-[#D4B886]">
                    <MapPin size={13} />
                    <span className="text-[11px] font-mono font-medium tracking-[0.14em] uppercase">
                      {activeItem.location}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#F7F4EF]">{activeItem.title}</h3>
                  <p className="text-xs text-[#B5ACA1] font-normal mt-0.5 leading-relaxed max-w-2xl">
                    {activeItem.caption}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
