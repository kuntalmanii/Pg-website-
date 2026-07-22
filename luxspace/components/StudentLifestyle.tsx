"use client";

import { memo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface LifestyleStory {
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  image: string;
}

const lifestyleStories: LifestyleStory[] = [
  {
    tag: "Academic Excellence",
    title: "Quiet Study Environment",
    subtitle: "Built for Focus and High Performance",
    description: "Whether preparing for semester exams or working on startup projects, LuxSpace provides silent study desks in every room, high-speed fiber Wi-Fi, and 24/7 power continuity.",
    highlights: ["Personal Study Desk", "4K Fiber Wi-Fi", "Zero Power Outages"],
    image: "/gallery/room-4.jpg",
  },
  {
    tag: "Nutritious Living",
    title: "Fresh In-House Meals",
    subtitle: "Home-Style Food Prepared Fresh Daily",
    description: "Enjoy nutritious, balanced Breakfast, Lunch & Dinner prepared in our clean, hygienic kitchen. Healthy menu rotation designed specifically to power your daily university schedule.",
    highlights: ["3 Meals Daily", "Hygienic Kitchen", "Varied Menu"],
    image: "/gallery/room-1.jpg",
  },
  {
    tag: "Social & Wellness",
    title: "Rooftop & Games Lounge",
    subtitle: "Unwind and Connect With Community",
    description: "Take evening coffee breaks on the green rooftop terrace garden or challenge friends to a game of pool in the common recreation lounge.",
    highlights: ["Rooftop Garden", "Pool Table Lounge", "Evening Coffee Spots"],
    image: "/gallery/room-5.jpg",
  },
];

function StudentLifestyleSection() {
  return (
    <section id="lifestyle" className="w-full section-padding bg-[#F7F1E8]">
      <div className="apple-container max-w-7xl mx-auto px-6 lg:px-12 w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="text-xs font-sans font-semibold uppercase tracking-[0.25em] text-[#7C8DBB] block mb-3">
            Editorial Living
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-[#2D2D2D]">
            Student & Professional Lifestyle
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#2D2D2D]/70 mt-3 max-w-lg mx-auto">
            A sanctuary designed to balance intense academic work with peaceful living and community.
          </p>
        </motion.div>

        {/* Large Editorial Showcase Blocks */}
        <div className="flex flex-col gap-16 sm:gap-24">
          {lifestyleStories.map((story, idx) => {
            const isReverse = idx % 2 !== 0;

            return (
              <motion.div
                key={story.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${
                  isReverse ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image Block */}
                <div
                  className={`lg:col-span-7 luxury-card rounded-[24px] overflow-hidden aspect-[16/10] relative shadow-lg bg-white border border-[rgba(0,0,0,0.06)] ${
                    isReverse ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    loading="lazy"
                    className="object-cover rounded-[24px] hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Editorial Copy Block */}
                <div
                  className={`lg:col-span-5 flex flex-col justify-center gap-4 ${
                    isReverse ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <span className="text-xs font-sans font-semibold uppercase tracking-widest text-[#7C8DBB]">
                    {story.tag}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-4xl font-bold text-[#2D2D2D] leading-tight">
                    {story.title}
                  </h3>
                  <p className="font-sans text-sm font-medium text-[#7C8DBB]">
                    {story.subtitle}
                  </p>
                  <p className="font-sans text-sm text-[#2D2D2D]/75 leading-relaxed font-light">
                    {story.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {story.highlights.map((h) => (
                      <span
                        key={h}
                        className="px-3 py-1 rounded-full text-[11px] font-sans font-medium text-[#2D2D2D]/80 bg-white border border-[rgba(0,0,0,0.06)] shadow-sm"
                      >
                        ✓ {h}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default memo(StudentLifestyleSection);
