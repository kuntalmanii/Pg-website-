"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

/* ── Animation helpers ───────────────────────────────────────────────────── */
const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number];

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 22 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.72, ease: EASE, delay },
});

interface HeroVideoProps {
  onOpen?: () => void;
  onSchedule?: () => void;
}

export default function HeroVideo({ onOpen, onSchedule }: HeroVideoProps) {
  const handleOpen = onOpen || onSchedule || (() => {});
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section
      id="hero"
      className="relative w-full h-[100dvh] overflow-hidden bg-[#050505]"
      aria-label="Hero section"
    >
      {/* ── Ambient Video ─────────────────────────────────────────────── */}
      <video
        ref={videoRef}
        src="/hero-banner.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/frames/frame-000.jpg"
        className="absolute inset-0 w-full h-full object-cover opacity-70"
        aria-hidden="true"
      />

      {/* ── Layered Gradient Overlays ──────────────────────────────────── */}
      {/* Bottom mask — bleeds seamlessly into #050505 canvas section */}
      <div
        className="absolute bottom-0 inset-x-0 h-[55%] pointer-events-none"
        style={{
          background: "linear-gradient(to top, #050505 0%, rgba(5,5,5,0.85) 30%, rgba(5,5,5,0.4) 60%, transparent 100%)",
        }}
        aria-hidden
      />
      {/* Left vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to right, rgba(5,5,5,0.6) 0%, transparent 55%)" }}
        aria-hidden
      />
      {/* Top bar for navbar legibility */}
      <div
        className="absolute top-0 inset-x-0 h-36 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(5,5,5,0.45) 0%, transparent 100%)" }}
        aria-hidden
      />

      {/* ── Floating Location Badge — top-right ───────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1,  y: 0   }}
        transition={{ delay: 0.7, duration: 0.55, ease: EASE }}
        className="absolute top-20 right-4 sm:top-8 sm:right-6 md:right-10 flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full z-20"
        style={{
          background:     "rgba(5,5,5,0.55)",
          border:         "1px solid rgba(167,183,231,0.22)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        }}
        aria-label="Location: Sector 126, Noida"
      >
        {/* Live status dot */}
        <span className="relative flex h-2 w-2 shrink-0" aria-hidden>
          {/* Ping ring */}
          <motion.span
            animate={{ scale: [1, 2.2], opacity: [0.7, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
            className="absolute inline-flex h-full w-full rounded-full"
            style={{ background: "#0050FF" }}
          />
          {/* Solid core */}
          <span
            className="relative inline-flex h-2 w-2 rounded-full"
            style={{ background: "#0050FF" }}
          />
        </span>

        <span
          className="text-[10px] font-bold tracking-[0.18em] uppercase"
          style={{ color: "rgba(253,251,247,0.75)" }}
        >
          Sector 126 &bull; Noida
        </span>
      </motion.div>

      {/* ── Content ───────────────────────────────────────────────────── */}
      <div className="absolute inset-0 flex flex-col justify-end pb-28 md:pb-32 px-6 md:px-16 max-w-6xl">

        {/* Location pill */}
        <motion.div {...fadeUp(0.1)} className="mb-5 flex items-center gap-2">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
            style={{
              background:     "rgba(167,183,231,0.14)",
              border:         "1px solid rgba(167,183,231,0.28)",
              color:          "#A7B7E7",
              backdropFilter: "blur(10px)",
            }}
          >
            {/* Subtle pin dot */}
            <span className="w-1.5 h-1.5 rounded-full bg-[#A7B7E7] shrink-0" aria-hidden />
            Near Amity University · 2 min walk
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          {...fadeUp(0.22)}
          className="text-[clamp(2.8rem,7vw,6rem)] font-black leading-[1.02] tracking-[-0.03em] text-[#FDFBF7]"
        >
          Live Smart.
          <br />
          <span
            style={{
              background:           "linear-gradient(95deg, #FDFBF7 30%, #A7B7E7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor:  "transparent",
            }}
          >
            Live Comfortable.
          </span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          {...fadeUp(0.38)}
          className="mt-5 max-w-xl text-[clamp(0.95rem,1.8vw,1.15rem)] leading-relaxed text-[rgba(253,251,247,0.62)] font-medium"
        >
          Premium paying guest accommodation — minutes from{" "}
          <span className="text-[#A7B7E7] font-semibold">Amity University</span>,
          with high-speed Wi-Fi, three nutritious meals, and spaces designed
          for how you actually live.
        </motion.p>

        {/* CTA row */}
        <motion.div {...fadeUp(0.52)} className="mt-8 flex items-center gap-4 flex-wrap">
          <a
            id="hero-cta-tour"
            href="#scrollytelling"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold text-[#050505] transition-all duration-300"
            style={{
              background: "#A7B7E7",
              boxShadow:  "0 6px 28px rgba(167,183,231,0.4)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow = "0 10px 36px rgba(167,183,231,0.62)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow = "0 6px 28px rgba(167,183,231,0.4)")
            }
          >
            Explore the Room
            <ChevronDown size={15} className="group-hover:translate-y-0.5 transition-transform duration-200" />
          </a>

          <button
            id="hero-cta-schedule"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleOpen();
            }}
            className="inline-flex items-center gap-1 px-6 py-3 rounded-2xl text-sm font-semibold text-[rgba(253,251,247,0.75)] hover:text-[#FDFBF7] transition-colors duration-200 cursor-pointer"
            style={{
              border:         "1px solid rgba(253,251,247,0.18)",
              backdropFilter: "blur(8px)",
            }}
          >
            Schedule a Visit
          </button>
        </motion.div>
      </div>

      {/* ── Scroll to Discover — bottom-center ────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.65, ease: EASE }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden
      >
        <span
          className="text-[9px] font-bold tracking-[0.28em] uppercase"
          style={{ color: "rgba(253,251,247,0.32)" }}
        >
          Scroll to Discover
        </span>

        {/* Triple stacked animated chevrons */}
        {[0, 0.18, 0.36].map((delay, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, 5, 0], opacity: [0.25, 0.8, 0.25] }}
            transition={{
              repeat:   Infinity,
              duration: 1.5,
              ease:     "easeInOut",
              delay,
            }}
          >
            <ChevronDown
              size={14}
              style={{ color: "#A7B7E7" }}
              strokeWidth={2.5}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* ── Grain texture overlay ──────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:  `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize:   "180px",
        }}
        aria-hidden
      />
    </section>
  );
}
