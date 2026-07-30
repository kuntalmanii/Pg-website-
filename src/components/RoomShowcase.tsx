"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2, ArrowUpRight, Sparkles, User, Users } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const FADE_UP = {
  initial:    { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport:   { once: true, margin: "-60px" },
  transition: { duration: 0.85, ease: EASE },
};

interface RoomShowcaseProps {
  onOpen?: () => void;
  onSchedule?: () => void;
}

interface RoomTier {
  id: string;
  name: string;
  subtitle: string;
  occupancy: string;
  occupancyIcon: typeof User;
  price: string;
  period: string;
  badge: string;
  badgeStyle: { bg: string; color: string };
  image: string;
  description: string;
  features: string[];
  amenities: string[];
}

const ROOM_TIERS: RoomTier[] = [
  {
    id: "executive-suite",
    name: "The Executive Suite",
    subtitle: "Single Private Occupancy",
    occupancy: "Private Suite",
    occupancyIcon: User,
    price: "₹18,000",
    period: "/ month all-inclusive",
    badge: "Only 2 Suites Left",
    badgeStyle: { bg: "rgba(212,184,134,0.22)", color: "#D4B886" },
    image: "/rooms/executive-suite.png",
    description:
      "Engineered for deep focus and maximum privacy. Features a king-sized plush bed, private workstation, attached balcony, and acoustic soundproofing.",
    features: [
      "Private Ergonomic Oak Workstation",
      "Private Balcony & City Skyline View",
      "Acoustic Soundproof Double-Glazed Windows",
      "55\" 4K Smart TV & Personal Mini Fridge",
      "Ensuite Marble Bath with Rain Shower",
    ],
    amenities: ["AC", "Attached Bath", "Private Desk", "Smart Lock", "High-Speed Wi-Fi"],
  },
  {
    id: "premium-dual",
    name: "The Premium Dual Suite",
    subtitle: "Twin Occupancy",
    occupancy: "2 Person Sharing",
    occupancyIcon: Users,
    price: "₹14,000",
    period: "/ month per resident",
    badge: "Fast Filling",
    badgeStyle: { bg: "rgba(127,130,107,0.25)", color: "#7F826B" },
    image: "/rooms/dual-suite.png",
    description:
      "Spacious shared suite offering individual study nooks, twin queen beds, personalized oak wardrobes, and ambient architectural LED lighting.",
    features: [
      "Individual Dedicated Study Nooks",
      "Twin Queen Beds with Hotel Linens",
      "Dual Floor-to-Ceiling Oak Wardrobes",
      "Ensuite Bath with Hot Water Geyser",
      "Daily Housekeeping & Weekly Deep Clean",
    ],
    amenities: ["AC", "Ensuite Bath", "Dual Desks", "Housekeeping", "3 Chef Meals"],
  },
  {
    id: "deluxe-shared",
    name: "The Deluxe Residence",
    subtitle: "Triple Occupancy",
    occupancy: "3 Person Sharing",
    occupancyIcon: Users,
    price: "₹12,000",
    period: "/ month per resident",
    badge: "Available Now",
    badgeStyle: { bg: "rgba(36,33,30,0.08)", color: "#736B63" },
    image: "/rooms/deluxe-shared.png",
    description:
      "High-value residence designed for community living without compromise. Equipped with personal reading lamps, storage, and 3 fresh daily meals.",
    features: [
      "Personal Reading Lights & Charging Docks",
      "Individual Locked Wardrobe Storage",
      "High-Speed Gigabit Wi-Fi 6 Router",
      "Three Nutritious Chef-Prepared Meals",
      "24/7 Biometric Guarded Access",
    ],
    amenities: ["AC", "Personal Locker", "3 Daily Meals", "Wi-Fi 6", "24/7 Security"],
  },
];

export default function RoomShowcase({ onOpen, onSchedule }: RoomShowcaseProps) {
  const handleOpen = onOpen || onSchedule || (() => {});

  return (
    <section
      id="rooms"
      className="relative py-28 sm:py-36 md:py-44 bg-[#FAF6F0] overflow-hidden scroll-mt-24"
      aria-label="Room Showcase"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-10 md:px-16 lg:px-20">

        {/* ── Section Header ─────────────────────────────────────────── */}
        <motion.div {...FADE_UP} className="max-w-3xl mb-16 sm:mb-20">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-mono font-medium tracking-[0.2em] uppercase bg-[#D4B886]/14 text-[#D4B886]">
              <Sparkles size={12} />
              CURATED RESIDENCES
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#24211E] leading-[1.1]">
            Hotel-Grade Architecture.
            <br />
            <span className="text-[#D4B886]">Tailored to Student Life.</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base font-normal text-[#736B63] leading-relaxed max-w-2xl">
            Every residence is custom-crafted with natural materials, sound isolation, and dedicated study zones — just 2 minutes from Amity University Gate 2.
          </p>
        </motion.div>

        {/* ── Room Cards Grid ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10">
          {ROOM_TIERS.map((room, idx) => {
            const OccupancyIcon = room.occupancyIcon;

            return (
              <motion.article
                key={room.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.12 * idx }}
                whileHover={{ y: -6 }}
                className="group relative flex flex-col justify-between rounded-3xl bg-[#F7F4EF] shadow-[0_16px_50px_rgba(36,33,30,0.06)] overflow-hidden transition-all duration-400"
              >
                {/* Top Image Container */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#24211E]/5">
                  <Image
                    src={room.image}
                    alt={`${room.name} interior photography`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />

                  {/* Glass Gradient Overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "linear-gradient(to top, rgba(28,26,24,0.7) 0%, transparent 60%)",
                    }}
                  />

                  {/* Top Floating Glass Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span
                      className="px-3.5 py-1.5 rounded-full text-[10px] font-semibold tracking-[0.12em] uppercase backdrop-blur-xl shadow-md"
                      style={{
                        background: room.badgeStyle.bg,
                        color:      room.badgeStyle.color,
                      }}
                    >
                      {room.badge}
                    </span>

                    <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-medium tracking-[0.08em] uppercase bg-[#1C1A18]/70 text-[#F7F4EF] backdrop-blur-xl">
                      <OccupancyIcon size={11} className="text-[#D4B886]" />
                      {room.occupancy}
                    </span>
                  </div>

                  {/* Image Bottom Headline */}
                  <div className="absolute bottom-4 left-5 right-5 z-10">
                    <h3 className="text-xl font-bold text-[#F7F4EF] leading-snug">{room.name}</h3>
                    <p className="text-xs text-[#D4B886] font-medium mt-0.5">{room.subtitle}</p>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Price Header */}
                    <div className="flex items-baseline gap-1.5 mb-4">
                      <span className="text-2xl font-extrabold text-[#24211E] tracking-tight">{room.price}</span>
                      <span className="text-xs font-normal text-[#736B63]">{room.period}</span>
                    </div>

                    <p className="text-xs sm:text-sm font-normal text-[#736B63] leading-relaxed mb-6">
                      {room.description}
                    </p>

                    {/* Amenities Chips Grid */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {room.amenities.map((amenity) => (
                        <span
                          key={amenity}
                          className="px-2.5 py-1 rounded-lg text-[10px] font-medium bg-[#24211E]/5 text-[#4A4540]"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>

                    {/* Features Checklist */}
                    <div className="space-y-2.5 pt-4 border-t border-[#24211E]/8 mb-8">
                      {room.features.map((feat) => (
                        <div key={feat} className="flex items-start gap-2.5 text-xs text-[#24211E]">
                          <CheckCircle2 size={14} className="text-[#D4B886] shrink-0 mt-0.5" />
                          <span className="font-medium">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2.5 pt-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        handleOpen();
                      }}
                      className="w-full py-3.5 rounded-full text-xs font-semibold tracking-[0.02em] bg-[#D4B886] text-[#1C1A18] hover:bg-[#C5A059] transition-all duration-200 shadow-[0_6px_24px_rgba(212,184,134,0.35)] flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B886]"
                    >
                      Book Visit Now
                      <ArrowUpRight size={14} />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        handleOpen();
                      }}
                      className="w-full py-3 rounded-full text-xs font-medium text-[#736B63] hover:text-[#24211E] hover:bg-[#24211E]/5 transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B886]"
                    >
                      Enquire About This Room
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
