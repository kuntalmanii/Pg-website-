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
import { Menu, X } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: Parameters<typeof clsx>) => twMerge(clsx(...inputs));

interface NavbarProps {
  onOpen?: () => void;
  onSchedule?: () => void;
}

const NAV_LINKS = [
  { label: "Amenities", href: "#amenities" },
  { label: "Location",  href: "#location"  },
  { label: "Pricing",   href: "#pricing"   },
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
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      style={{ x: springX, y: springY, rotateX, rotateY, transformPerspective: 600 }}
      className={cn(
        "hidden md:flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold select-none cursor-pointer",
        "backdrop-blur-[14px] bg-[rgba(167,183,231,0.18)] border border-[rgba(167,183,231,0.35)]",
        "text-dark-void hover:bg-[rgba(167,183,231,0.32)] transition-colors duration-200",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]",
        className
      )}
    >
      {children}
    </motion.button>
  );
}

/* ── Main Navbar ─────────────────────────────────────────────────────────── */
export default function Navbar({ onOpen, onSchedule }: NavbarProps) {
  const handleOpen = onOpen || onSchedule || (() => {});
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  /* Scroll progress for the indicator bar */
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── Floating Navbar ──────────────────────────────────────────────── */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] as [number,number,number,number] }}
        className={cn(
          "fixed top-4 left-1/2 z-50 -translate-x-1/2 w-[calc(100%-2rem)] max-w-5xl",
          "rounded-2xl px-5 py-3 flex flex-col",          /* column so bar sits flush at bottom */
          "transition-all duration-300 overflow-hidden",
          scrolled
            ? "backdrop-blur-[18px] bg-[rgba(253,251,247,0.1)] border border-[rgba(167,183,231,0.2)] shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
            : "backdrop-blur-[12px] bg-[rgba(253,251,247,0.06)] border border-[rgba(167,183,231,0.12)]"
        )}
      >
        {/* Inner row */}
        <div className="flex items-center justify-between w-full">
          {/* Brand */}
          <a
            href="/"
            className="text-[1.45rem] font-black tracking-[-0.04em] text-dark-void select-none"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            LUX<span className="text-[#A7B7E7]">SPACE</span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Primary navigation">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className={cn(
                  "text-sm font-medium text-dark-void/70 hover:text-dark-void",
                  "transition-colors duration-200 relative group"
                )}
              >
                {label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#A7B7E7] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <MagneticButton onClick={handleOpen}>
              Schedule Visit
            </MagneticButton>

            {/* Mobile hamburger */}
            <button
              id="mobile-menu-btn"
              type="button"
              className="md:hidden p-1.5 text-dark-void/80 hover:text-dark-void transition-colors cursor-pointer"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* ── Scroll Progress Bar — flush bottom of navbar ─────────────── */}
        <motion.div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-[1px] origin-left"
          style={{
            scaleX,
            background: "linear-gradient(90deg, #A7B7E7, #0050FF)",
            transformOrigin: "left",
          }}
        />
      </motion.header>

      {/* ── Mobile Dropdown ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,  scale: 1 }}
            exit={{   opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className={cn(
              "fixed top-[4.5rem] left-1/2 z-40 -translate-x-1/2",
              "w-[calc(100%-2rem)] max-w-sm rounded-2xl p-5",
              "backdrop-blur-[18px] bg-[rgba(253,251,247,0.92)] border border-[rgba(167,183,231,0.25)]",
              "shadow-[0_12px_40px_rgba(0,0,0,0.1)] flex flex-col gap-3"
            )}
          >
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-dark-void/75 hover:text-dark-void py-1.5 transition-colors"
              >
                {label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => { setMenuOpen(false); handleOpen(); }}
              className={cn(
                "mt-1 w-full py-2.5 rounded-xl text-sm font-semibold cursor-pointer",
                "bg-[rgba(167,183,231,0.25)] border border-[rgba(167,183,231,0.4)]",
                "text-dark-void hover:bg-[rgba(167,183,231,0.42)] transition-all"
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
