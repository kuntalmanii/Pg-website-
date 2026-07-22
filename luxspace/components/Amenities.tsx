"use client";

import { memo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface AmenityBlock {
  title: string;
  tag: string;
  description: string;
  image: string;
}

const amenitiesData: AmenityBlock[] = [
  {
    title: "Meals Included",
    tag: "Culinary Care",
    description: "Hygienic, home-style Breakfast, Lunch & Dinner prepared fresh in-house daily with nutritious menu variety designed for students and working professionals.",
    image: "/gallery/room-1.jpg",
  },
  {
    title: "Daily Cleaning",
    tag: "Housekeeping",
    description: "Daily room sanitization, floor mopping, and private washroom cleaning by dedicated staff ensuring spotless hygiene every single day.",
    image: "/gallery/room-2.jpg",
  },
  {
    title: "High Speed Internet",
    tag: "Fiber Connectivity",
    description: "High-speed optical fiber Wi-Fi broadband across all floors and rooms for uninterrupted online classes, work from home & 4K streaming.",
    image: "/gallery/room-3.jpg",
  },
  {
    title: "Safe Environment",
    tag: "Perimeter Safety",
    description: "Gated entry, 24x7 HD CCTV surveillance across all corridors, smart biometric access locks, and complete peaceful surroundings.",
    image: "/gallery/room-4.jpg",
  },
  {
    title: "Beautiful Terrace",
    tag: "Outdoor Lounge",
    description: "A beautifully landscaped rooftop terrace lounge with greenery and seating for evening coffee, study breaks & open air relaxation.",
    image: "/gallery/room-5.jpg",
  },
  {
    title: "Indoor Recreation",
    tag: "Common Zone",
    description: "Common recreation zone equipped with a full-size pool table and comfortable seating for unwinding with fellow residents.",
    image: "/gallery/room-6.jpg",
  },
  {
    title: "Parking",
    tag: "Vehicle Security",
    description: "Secured parking bay for two-wheelers and vehicles with easy street access and night monitoring.",
    image: "/gallery/room-1.jpg",
  },
  {
    title: "Power Backup",
    tag: "24/7 Continuity",
    description: "Uninterrupted power generator backup ensuring round-the-clock electricity for air conditioning, lighting, and laptop study stations.",
    image: "/gallery/room-2.jpg",
  },
  {
    title: "Night Guard",
    tag: "On-Site Guarding",
    description: "Dedicated night security personnel stationed at the main gate for round-the-clock protection and peace of mind.",
    image: "/gallery/room-3.jpg",
  },
];

function AmenitiesSection() {
  return (
    <section id="amenities" className="w-full section-padding bg-[#F7F1E8]">
      <div className="apple-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center mb-20 sm:mb-28"
        >
          <span className="text-xs font-sans font-semibold uppercase tracking-[0.25em] text-[#7C8DBB] block mb-3">
            Life at LuxSpace
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-[#2D2D2D] leading-tight">
            Included Amenities & Services
          </h2>
        </motion.div>

        {/* Editorial Alternating Image/Text Blocks */}
        <div className="flex flex-col gap-16 sm:gap-24">
          {amenitiesData.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={item.title}
                className={`flex flex-col md:flex-row items-center gap-8 lg:gap-16 ${
                  isEven ? "" : "md:flex-row-reverse"
                }`}
              >
                {/* Image Block with Next/Image, Fade + Scale */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.97, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full md:w-1/2 aspect-[16/11] rounded-[28px] overflow-hidden bg-[#FFFDF9] border border-[rgba(0,0,0,0.06)] shadow-md group relative"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </motion.div>

                {/* Content Block with Fade + Slide */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full md:w-1/2 flex flex-col justify-center gap-4 px-2 sm:px-6"
                >
                  <span className="text-xs font-sans font-semibold uppercase tracking-widest text-[#7C8DBB]">
                    0{index + 1} · {item.tag}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-4xl font-semibold text-[#2D2D2D] leading-tight">
                    {item.title}
                  </h3>
                  <p className="font-sans text-base text-[#2D2D2D]/70 font-light leading-relaxed max-w-lg">
                    {item.description}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default memo(AmenitiesSection);
