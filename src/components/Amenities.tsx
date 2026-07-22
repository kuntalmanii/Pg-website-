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
    span: "col-span-2 row-span-2 md:col-span-2 md:row-span-2",
    dark: true,
  },
  {
    id: "tile-wifi",
    code: "[02]",
    icon: Zap,
    badge: "100 Mbps Dedicated",
    title: "High-Speed Wi-Fi",
    desc: "Low-latency fibre connection across all floors with zero speed throttling.",
    span: "col-span-2 md:col-span-1",
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
    span: "col-span-2 md:col-span-1",
    dark: true,
  },
  {
    id: "tile-pool",
    code: "[04]",
    icon: Gamepad2,
    badge: "Recreation Lounge",
    title: "Pool Table & Chill Zone",
    desc: "Unwind after classes with our full-size pool table, board games & lounge seating.",
    span: "col-span-2 md:col-span-2",
    dark: false,
  },
  {
    id: "tile-security",
    code: "[05]",
    icon: ShieldCheck,
    badge: "24/7 Active Security",
    title: "CCTV & On-Site Guard",
    desc: "32 HD cameras covering entry points + round-the-clock security guard.",
    span: "col-span-2 md:col-span-1",
    dark: true,
  },
  {
    id: "tile-terrace",
    code: "[06]",
    icon: Trees,
    badge: "Rooftop Space",
    title: "Terrace Garden",
    desc: "Curated outdoor green space perfect for sunset study sessions and fresh air.",
    span: "col-span-2 md:col-span-1",
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

  const bg = item.dark
    ? "#050505"
    : item.accent
    ? "rgba(167,183,231,0.12)"
    : "#F4EFEA";

  const textPrimary = item.dark ? "#FDFBF7" : "#050505";
  const textSecondary = item.dark ? "rgba(253,251,247,0.55)" : "rgba(5,5,5,0.55)";
  const border = item.dark
    ? "rgba(253,251,247,0.08)"
    : item.accent
    ? "rgba(167,183,231,0.3)"
    : "rgba(5,5,5,0.08)";

  return (
    <motion.div
      id={item.id}
      variants={ITEM}
      whileHover={{
        y: -4,
        scale: 1.012,
        boxShadow: item.dark
          ? "0 24px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.12)"
          : "0 18px 40px rgba(167,183,231,0.3)",
        borderColor: item.dark ? "rgba(167,183,231,0.4)" : "rgba(167,183,231,0.6)",
        transition: { duration: 0.25, ease: "easeOut" },
      }}
      className={cn(
        "relative rounded-3xl p-6 md:p-8 flex flex-col justify-between overflow-hidden cursor-default transition-colors duration-300",
        item.span
      )}
      style={{ background: bg, border: `1px solid ${border}` }}
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
          style={{ background: "#A7B7E7" }}
          aria-hidden
        />
      )}

      {/* Top Bar: Icon Badge + Technical Code */}
      <div className="flex items-start justify-between relative z-10">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-105"
          style={{
            background: item.dark
              ? "rgba(167,183,231,0.12)"
              : "rgba(5,5,5,0.05)",
            borderColor: item.dark
              ? "rgba(167,183,231,0.25)"
              : "rgba(5,5,5,0.1)",
          }}
        >
          <Icon
            size={20}
            style={{ color: item.dark ? "#A7B7E7" : "#050505" }}
            strokeWidth={2}
          />
        </div>

        <span
          className="text-[10px] font-mono font-bold tracking-widest uppercase opacity-40"
          style={{ color: textPrimary }}
        >
          {item.code}
        </span>
      </div>

      {/* Content Section */}
      <div className="mt-6 relative z-10">
        <span
          className="inline-block px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase mb-2.5 border"
          style={{
            background: item.dark
              ? "rgba(167,183,231,0.12)"
              : "rgba(5,5,5,0.04)",
            borderColor: item.dark
              ? "rgba(167,183,231,0.22)"
              : "rgba(5,5,5,0.08)",
            color: item.dark ? "#A7B7E7" : "rgba(5,5,5,0.7)",
          }}
        >
          {item.badge}
        </span>

        <h3
          className="text-xl md:text-2xl font-black tracking-tight leading-snug"
          style={{ color: textPrimary }}
        >
          {item.title}
        </h3>

        <p
          className="mt-2 text-xs md:text-sm leading-relaxed"
          style={{ color: textSecondary }}
        >
          {item.desc}
        </p>
      </div>

      {/* Optical Corner Checkmark */}
      <div className="mt-4 pt-3 border-t flex items-center justify-between relative z-10" style={{ borderColor: border }}>
        <span className="text-[11px] font-semibold text-[rgba(167,183,231,0.9)] flex items-center gap-1.5">
          <CheckCircle2 size={13} style={{ color: item.dark ? "#A7B7E7" : "#050505" }} />
          100% Free Included
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
      className="w-full bg-[#FDFBF7] py-24 md:py-32 px-6 md:px-12 relative overflow-hidden"
      aria-labelledby="amenities-heading"
    >
      <div className="max-w-5xl mx-auto relative z-10">

        {/* ── Section Header ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="mb-12 md:mb-16 flex flex-col items-start gap-2"
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#0050FF]" />
            <p className="text-[11px] font-mono font-bold tracking-[0.22em] uppercase text-[#0050FF]">
              INCLUDED IN EVERY STAY
            </p>
          </div>

          <h2
            id="amenities-heading"
            className="text-[clamp(2.2rem,5vw,3.6rem)] font-black tracking-[-0.03em] leading-[1.05] text-[#050505]"
          >
            Everything you need.
            <br />
            <span
              style={{
                background: "linear-gradient(95deg, #050505 40%, #A7B7E7 100%)",
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
          className="grid grid-cols-2 md:grid-cols-4 auto-rows-[minmax(200px,auto)] gap-4 md:gap-5"
        >
          {AMENITIES.map((item) => (
            <BentoCard key={item.id} item={item} />
          ))}
        </motion.div>

        {/* ── Footer Note ────────────────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-10 text-center text-xs font-mono text-[rgba(5,5,5,0.4)] tracking-wide"
        >
          All listed amenities are covered in your monthly ₹12,000 rent. Zero hidden maintenance charges.
        </motion.p>
      </div>
    </section>
  );
}
