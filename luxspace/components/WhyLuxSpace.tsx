"use client";

import { memo } from "react";
import { motion, Variants } from "framer-motion";

interface ValueProp {
  number: string;
  title: string;
  description: string;
  badge: string;
  icon: React.ReactNode;
}

const valueProps: ValueProp[] = [
  {
    number: "01",
    title: "Zero Commute Stress",
    badge: "3 Mins Walk",
    description: "Located 200 meters from Amity University Gate 2. Say goodbye to traffic, surge pricing cabs, and morning rush.",
    icon: (
      <svg className="w-6 h-6 text-[#7C8DBB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "All-Inclusive Rent",
    badge: "Zero Hidden Costs",
    description: "One single monthly payment covers 3 fresh meals daily, daily housekeeping, optical fiber Wi-Fi, electricity & power backup.",
    icon: (
      <svg className="w-6 h-6 text-[#7C8DBB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Uncompromising Security",
    badge: "24/7 Guarded",
    description: "Gated entry with 24/7 on-site night security personnel, smart biometric access locks, and perimeter HD CCTV coverage.",
    icon: (
      <svg className="w-6 h-6 text-[#7C8DBB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751A11.959 11.959 0 0112 2.714z" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Thoughtful Community",
    badge: "Work & Play",
    description: "Designed for ambitious minds with quiet study stations, rooftop terrace lounges, and indoor pool table recreation.",
    icon: (
      <svg className="w-6 h-6 text-[#7C8DBB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

function WhyLuxSpaceSection() {
  return (
    <section id="why-us" className="w-full section-padding bg-[#F7F1E8]">
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
            The Co-Living Advantage
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-[#2D2D2D]">
            Why LuxSpace
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#2D2D2D]/70 mt-3 max-w-lg mx-auto">
            Combining Apple-inspired attention to detail with Airbnb warmth for an unmatched living experience.
          </p>
        </motion.div>

        {/* 4-Card Precision Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {valueProps.map((item) => (
            <motion.div
              key={item.title}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="luxury-card p-8 bg-white rounded-[24px] border border-[rgba(0,0,0,0.06)] shadow-md hover:shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#A7B7E7]/15 text-[#7C8DBB] flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <span className="text-xs font-sans font-bold text-[#7C8DBB]/60">
                    {item.number}
                  </span>
                </div>
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-sans font-semibold uppercase tracking-wider text-[#7C8DBB] bg-[#7C8DBB]/10 mb-3">
                  {item.badge}
                </span>
                <h3 className="font-serif text-xl font-bold text-[#2D2D2D] mb-2">
                  {item.title}
                </h3>
                <p className="font-sans text-xs text-[#2D2D2D]/70 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default memo(WhyLuxSpaceSection);
