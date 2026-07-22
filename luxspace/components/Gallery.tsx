"use client";

import { useState, useEffect, memo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryImage {
  src: string;
  title: string;
}

const galleryImages: GalleryImage[] = [
  { src: "/gallery/room-1.jpg", title: "Twin Room & Workspace" },
  { src: "/gallery/room-2.jpg", title: "Double Sharing Suite" },
  { src: "/gallery/room-3.jpg", title: "Private Room Overview" },
  { src: "/gallery/room-4.jpg", title: "Ergonomic Study Station" },
  { src: "/gallery/room-5.jpg", title: "Furnished Living Suite" },
  { src: "/gallery/room-6.jpg", title: "Modern Ambient Lighting" },
];

function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section id="gallery" className="w-full section-padding bg-[#F7F1E8]">
      <div className="apple-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center mb-16 sm:mb-20"
        >
          <span className="text-xs font-sans font-semibold uppercase tracking-[0.25em] text-[#7C8DBB] block mb-3">
            Space Showcase
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-[#2D2D2D] leading-tight">
            Gallery
          </h2>
        </motion.div>

        {/* Editorial Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.src}
              onClick={() => setSelectedImage(image)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -4 }}
              className="break-inside-avoid relative group rounded-[24px] overflow-hidden bg-[#FFFDF9] border border-[rgba(0,0,0,0.06)] shadow-sm cursor-pointer"
            >
              {/* Image with Next/Image and hover zoom */}
              <div className="overflow-hidden relative w-full h-auto">
                <Image
                  src={image.src}
                  alt={image.title}
                  width={600}
                  height={450}
                  loading="lazy"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Minimal Editorial Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="font-serif text-lg font-medium text-white tracking-tight">
                  {image.title}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 10 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-5xl w-full max-h-[90vh] rounded-[24px] overflow-hidden bg-[#FFFDF9] border border-[rgba(0,0,0,0.1)] shadow-2xl flex flex-col justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage.src}
                alt={selectedImage.title}
                width={1200}
                height={900}
                priority
                className="w-full h-auto max-h-[80vh] object-contain bg-[#050505]"
              />

              {/* Modal Footer Caption */}
              <div className="p-6 bg-[#FFFDF9] flex items-center justify-between border-t border-[rgba(0,0,0,0.06)]">
                <span className="font-serif text-xl font-semibold text-[#2D2D2D]">
                  {selectedImage.title}
                </span>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="px-4 py-2 rounded-full text-xs font-sans font-semibold uppercase tracking-wider text-[#2D2D2D] bg-[#2D2D2D]/10 hover:bg-[#2D2D2D]/20 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default memo(GallerySection);
