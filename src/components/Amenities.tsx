"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Utensils,
  Zap,
  Sparkles,
  Gamepad2,
  ShieldCheck,
  Trees,
  CheckCircle2,
} from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...i: Parameters<typeof clsx>) => twMerge(clsx(...i));

/* ── Apple-Grade Bento Tile Definition ───────────────────────────────────── */
type BentoItem = {
  id: string;
  code: string;
  icon: React.ElementType;
  badge: string;
  title: string;
  desc: string;
  span: string; // Tailwind grid layout span
  dark: boolean;
  accent?: boolean;
};

const AMENITIES: BentoItem[] = [
  {
    id: "tile-meals",
    code: "[01]",
    icon: Utensils,
    badge: "In-House Kitchen",
    title: "3× Daily Meals Included",
    desc: "Wholesome home-style breakfast, lunch & dinner prepared fresh daily by our professional kitchen staff.",
    span: "col-span-1 sm:col-span-2 sm:row-span-2 md:col-span-2 md:row-span-2",
    dark: true,
  },
  {
    id: "tile-wifi",
    code: "[02]",
    icon: Zap,
    badge: "100 Mbps Dedicated",
    title: "High-Speed Wi-Fi",
    desc: "Low-latency fibre connection across all floors with zero speed throttling.",
    span: "col-span-1 sm:col-span-1 md:col-span-1",
    dark: false,
    accent: true,
  },
  {
    id: "tile-housekeeping",
    code: "[03]",
    icon: Sparkles,
    badge: "Refreshed Daily",
    title: "Daily Housekeeping",
    desc: "Every room is professionally cleaned & trash cleared every morning.",
    span: "col-span-1 sm:col-span-1 md:col-span-1",
    dark: true,
  },
  {
    id: "tile-pool",
    code: "[04]",
    icon: Gamepad2,
    badge: "Recreation Lounge",
    title: "Pool Table & Chill Zone",
    desc: "Unwind after classes with our full-size pool table, board games & lounge seating.",
    span: "col-span-1 sm:col-span-2 md:col-span-2",
    dark: false,
  },
  {
    id: "tile-security",
    code: "[05]",
    icon: ShieldCheck,
    badge: "24/7 Active Security",
    title: "CCTV & On-Site Guard",
    desc: "32 HD cameras covering entry points + round-the-clock security guard.",
    span: "col-span-1 sm:col-span-1 md:col-span-1",
    dark: true,
  },
  {
    id: "tile-terrace",
    code: "[06]",
    icon: Trees,
    badge: "Rooftop Space",
    title: "Terrace Garden",
    desc: "Curated outdoor green space perfect for sunset study sessions and fresh air.",
    span: "col-span-1 sm:col-span-1 md:col-span-1",
    dark: false,
    accent: true,
  },
];

/* ── Motion Variants ─────────────────────────────────────────────────────── */
const CONTAINER = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const ITEM = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

/* ── Single Bento Card Component ─────────────────────────────────────────── */
function BentoCard({ item }: { item: BentoItem }) {
  const Icon = item.icon;

  const textPrimary = item.dark ? "#F7F4EF" : "#24211E";
  const textSecondary = item.dark ? "#B5ACA1" : "#736B63";

  return (
    <motion.div
      id={item.id}
      variants={ITEM}
      whileHover={{
        y: -5,
        scale: 1.012,
        boxShadow: item.dark
          ? "0 30px 70px rgba(0,0,0,0.45)"
          : "0 22px 50px rgba(36,33,30,0.1)",
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
      }}
      className={cn(
        "relative rounded-3xl p-8 md:p-9 lg:p-10 flex flex-col justify-between overflow-hidden cursor-default transition-all duration-300",
        item.dark
          ? "bg-[#25221F] shadow-[0_20px_50px_rgba(0,0,0,0.3)] text-[#F7F4EF]"
          : "bg-[#F7F4EF] shadow-[0_12px_40px_rgba(36,33,30,0.06)] text-[#24211E]",
        item.span
      )}
    >
      {/* Subtle Noise Texture on Dark Tiles */}
      {item.dark && (
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03] rounded-3xl"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
          aria-hidden
        />
      )}

      {/* Ambient Radial Accent Glow */}
      {item.accent && (
        <div
          className="pointer-events-none absolute -top-12 -right-12 w-44 h-44 rounded-full blur-3xl opacity-25"
          style={{ background: "#D4B886" }}
          aria-hidden
        />
      )}

      {/* Top Bar: Icon Badge + Technical Code */}
      <div className="flex items-start justify-between relative z-10">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
          style={{
            background: item.dark
              ? "rgba(212,184,134,0.16)"
              : "rgba(36,33,30,0.06)",
          }}
        >
          <Icon
            size={20}
            style={{ color: item.dark ? "#D4B886" : "#24211E" }}
            strokeWidth={2}
          />
        </div>

        <span
          className="text-[10px] font-mono font-medium tracking-[0.16em] uppercase opacity-60"
          style={{ color: textPrimary }}
        >
          {item.code}
        </span>
      </div>

      {/* Content Section */}
      <div className="mt-8 relative z-10">
        <span
          className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-medium tracking-[0.14em] uppercase mb-3"
          style={{
            background: item.dark
              ? "rgba(212,184,134,0.16)"
              : "rgba(127,130,107,0.12)",
            color: item.dark ? "#D4B886" : "#7F826B",
          }}
        >
          {item.badge}
        </span>

        <h3
          className="text-xl md:text-2xl font-semibold tracking-tight leading-snug"
          style={{ color: textPrimary }}
        >
          {item.title}
        </h3>

        <p
          className="mt-2.5 text-xs md:text-sm font-normal leading-relaxed"
          style={{ color: textSecondary }}
        >
          {item.desc}
        </p>
      </div>

      {/* Optical Corner Checkmark */}
      <div className="mt-6 pt-4 flex items-center justify-between relative z-10">
          <span className="text-[11px] font-medium text-[#D4B886] flex items-center gap-1.5">
            <CheckCircle2 size={13} style={{ color: "#D4B886" }} />
            Included in Rent
          </span>
      </div>
    </motion.div>
  );
}

/* ── Main Amenities Component ────────────────────────────────────────────── */
export default function Amenities() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="amenities"
      className="w-full bg-[#FAF6F0] py-28 sm:py-36 md:py-44 lg:py-52 px-6 sm:px-10 md:px-16 lg:px-20 relative overflow-hidden scroll-mt-24"
      aria-labelledby="amenities-heading"
    >
      <div className="max-w-6xl mx-auto relative z-10">

        {/* ── Section Header ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="mb-16 md:mb-20 lg:mb-24 flex flex-col items-start gap-2.5"
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#D4B886]" />
            <p className="text-[11px] font-mono font-medium tracking-[0.2em] uppercase text-[#D4B886]">
              INCLUDED IN EVERY STAY
            </p>
          </div>

          <h2
            id="amenities-heading"
            className="text-[clamp(2.2rem,4.8vw,3.4rem)] font-bold tracking-[-0.025em] leading-[1.1] text-[#24211E]"
          >
            Everything you need.
            <br />
            <span
              style={{
                background: "linear-gradient(95deg, #24211E 40%, #C5A059 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Nothing you don&apos;t.
            </span>
          </h2>
        </motion.div>

        {/* ── Apple-Grade Bento Grid ─────────────────────────────────── */}
        <motion.div
          ref={ref}
          variants={CONTAINER}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-[minmax(200px,auto)] gap-6 md:gap-8"
        >
          {AMENITIES.map((item) => (
            <BentoCard key={item.id} item={item} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
