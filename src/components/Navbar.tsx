"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
  useScroll,
} from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: Parameters<typeof clsx>) => twMerge(clsx(...inputs));

interface NavbarProps {
  onOpen?: () => void;
  onSchedule?: () => void;
}

const NAV_LINKS = [
  { label: "Residences", href: "#rooms" },
  { label: "Amenities",  href: "#amenities" },
  { label: "Location",   href: "#location" },
  { label: "Gallery",    href: "#gallery" },
  { label: "Pricing",    href: "#pricing" },
];

/* ── Magnetic Button ─────────────────────────────────────────────────────── */
function MagneticButton({
  onClick,
  children,
  className,
}: {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  const ref       = useRef<HTMLButtonElement>(null);
  const rawX      = useMotionValue(0);
  const rawY      = useMotionValue(0);
  const springX   = useSpring(rawX, { stiffness: 300, damping: 24, mass: 0.5 });
  const springY   = useSpring(rawY, { stiffness: 300, damping: 24, mass: 0.5 });

  // Map spring displacement → subtle 3D tilt
  const rotateX   = useTransform(springY, [-8, 8], [3, -3]);
  const rotateY   = useTransform(springX, [-8, 8], [-3, 3]);

  const handleMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    const dx   = e.clientX - cx;
    const dy   = e.clientY - cy;
    // Subtle magnetic pull (max ~6px) so click is never missed
    rawX.set(dx * 0.18);
    rawY.set(dy * 0.18);
  }, [rawX, rawY]);

  const handleLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return (
    <motion.button
      ref={ref}
      id="schedule-visit-btn"
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={{ scale: 1.03, boxShadow: "0 8px 28px rgba(212,184,134,0.5)" }}
      whileTap={{ scale: 0.96 }}
      style={{ x: springX, y: springY, rotateX, rotateY, transformPerspective: 600 }}
      className={cn(
        "hidden md:flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-[0.02em] select-none cursor-pointer",
        "bg-[#D4B886] text-[#1C1A18] hover:bg-[#C5A059] transition-all duration-300",
        "shadow-[0_4px_20px_rgba(212,184,134,0.35)]",
        className
      )}
    >
      {children}
      <ArrowUpRight size={15} className="shrink-0" />
    </motion.button>
  );
}

/* ── Main Navbar ─────────────────────────────────────────────────────────── */
export default function Navbar({ onOpen, onSchedule }: NavbarProps) {
  const handleOpen = onOpen || onSchedule || (() => { });
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  /* Scroll progress for the indicator bar */
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  /* Keyboard listener: close mobile menu on Escape key */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    <>
      {/* ── Floating Navbar ──────────────────────────────────────────────── */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] as [number,number,number,number] }}
        className={cn(
          "fixed top-4 sm:top-5 left-1/2 z-40 -translate-x-1/2 w-[calc(100%-2.5rem)] max-w-6xl",
          "rounded-full px-7 py-3.5 sm:px-9 sm:py-4 flex flex-col",          /* column so bar sits flush at bottom */
          "transition-all duration-300 overflow-hidden",
          scrolled
            ? "backdrop-blur-2xl bg-[rgba(250,246,240,0.88)] shadow-[0_12px_40px_rgba(28,26,24,0.08)]"
            : "backdrop-blur-xl bg-[rgba(250,246,240,0.72)] shadow-[0_8px_28px_rgba(28,26,24,0.04)]"
        )}
      >
        {/* Inner row */}
        <div className="flex items-center justify-between w-full">
          {/* Brand */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-[1.4rem] sm:text-[1.5rem] font-bold tracking-[-0.035em] text-[#24211E] select-none rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B886]"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            LUX<span className="text-[#D4B886]">SPACE</span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10" aria-label="Primary navigation">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className={cn(
                  "text-xs sm:text-sm font-medium tracking-[0.015em] text-[#4A4540] hover:text-[#24211E]",
                  "transition-colors duration-200 relative group rounded-md p-1",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B886]"
                )}
              >
                {label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#D4B886] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <MagneticButton onClick={handleOpen} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B886]">
              Schedule Visit
            </MagneticButton>

            {/* Mobile hamburger */}
            <button
              id="mobile-menu-btn"
              type="button"
              className="md:hidden p-1.5 text-[#24211E]/80 hover:text-[#24211E] transition-colors cursor-pointer rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B886]"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* ── Scroll Progress Bar — flush bottom of navbar ─────────────── */}
        <motion.div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-[1.5px] origin-left"
          style={{
            scaleX,
            background: "linear-gradient(90deg, #D4B886, #9C95A6)",
            transformOrigin: "left",
          }}
        />
      </motion.header>

      {/* ── Mobile Dropdown ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            id="mobile-menu"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,  scale: 1 }}
            exit={{   opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className={cn(
              "fixed top-[5.2rem] left-1/2 z-40 -translate-x-1/2",
              "w-[calc(100%-2.5rem)] max-w-sm rounded-3xl p-6.5",
              "backdrop-blur-2xl bg-[rgba(250,246,240,0.96)]",
              "shadow-[0_24px_60px_rgba(28,26,24,0.16)] flex flex-col gap-3.5"
            )}
          >
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium tracking-[0.015em] text-[#4A4540] hover:text-[#24211E] py-1.5 transition-colors rounded-lg px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B886]"
              >
                {label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => { setMenuOpen(false); handleOpen(); }}
              className={cn(
                "mt-1 w-full py-3 rounded-full text-sm font-semibold tracking-[0.02em] cursor-pointer",
                "bg-[#D4B886] text-[#1C1A18] hover:bg-[#C5A059] transition-all shadow-[0_4px_20px_rgba(212,184,134,0.35)]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B886]"
              )}
            >
              Schedule Visit
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
