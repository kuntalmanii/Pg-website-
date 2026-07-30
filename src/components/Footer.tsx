"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MessageCircle, ArrowUpRight, MapPin } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const NAV_ITEMS = [
  { label: "Amenities", href: "#amenities" },
  { label: "Room Tour", href: "#scrollytelling" },
  { label: "Location",  href: "#location" },
  { label: "Pricing",   href: "#pricing" },
];

interface FooterProps {
  onOpen?: () => void;
  onSchedule?: () => void;
}

export default function Footer({ onOpen, onSchedule }: FooterProps) {
  const handleOpen = onOpen || onSchedule || (() => {});

  return (
    <footer
      id="footer"
      className="w-full bg-[#1C1A18] text-[#F7F4EF] pt-28 sm:pt-36 md:pt-44 pb-28 sm:pb-16 px-6 sm:px-10 md:px-16 lg:px-20 border-t border-[rgba(212,184,134,0.15)] scroll-mt-24"
      aria-label="Site footer"
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-20">

        {/* ── 1. Minimal Callout Banner ───────────────────────────────── */}
        <motion.div
          id="pricing"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="rounded-3xl p-10 sm:p-14 lg:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative overflow-hidden scroll-mt-24 bg-[rgba(250,246,240,0.04)] backdrop-blur-2xl shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
        >
          {/* Subtle ambient glow */}
          <div
            className="pointer-events-none absolute -top-20 -right-20 w-56 h-56 rounded-full blur-3xl opacity-20"
            style={{ background: "#D4B886" }}
            aria-hidden
          />

          <div>
            <p className="text-[10px] font-mono font-medium tracking-[0.2em] uppercase text-[#D4B886] mb-2">
              ALL-INCLUSIVE RESIDENCE
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F7F4EF]">
              Starting at ₹12,000 <span className="text-sm font-normal text-[#B5ACA1]">/ month</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm font-normal text-[#B5ACA1] leading-relaxed">
              3 daily meals, high-speed Wi-Fi & daily housekeeping included.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-4 flex-wrap shrink-0">
            <motion.button
              id="footer-schedule-btn"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleOpen();
              }}
              whileHover={{ scale: 1.02, boxShadow: "0 12px 36px rgba(212,184,134,0.5)" }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-xs font-semibold tracking-[0.02em] text-[#1C1A18] transition-all duration-200 cursor-pointer shadow-[0_8px_30px_rgba(212,184,134,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B886]"
              style={{ background: "#D4B886" }}
            >
              Schedule Visit
              <ArrowUpRight size={15} />
            </motion.button>

            <motion.a
              id="footer-whatsapp-btn"
              href="https://wa.me/918882813740?text=Hi%2C%20I%27m%20interested%20in%20Luxspace%20PG."
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-xs font-semibold tracking-[0.02em] text-[#F7F4EF] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] bg-[rgba(250,246,240,0.08)] backdrop-blur-xl shadow-md hover:bg-[rgba(250,246,240,0.14)]"
            >
              <MessageCircle size={15} className="text-[#25D366]" />
              WhatsApp
            </motion.a>
          </div>
        </motion.div>

        {/* ── 2. Clean 3-Column Minimal Grid ──────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 lg:gap-20 pb-16"
        >
          {/* Brand & Address Column (6 cols) */}
          <div className="md:col-span-6 flex flex-col gap-3">
            <h3 className="text-xl font-bold tracking-tight text-[#F7F4EF]">
              LUX<span className="text-[#D4B886]">SPACE</span>
            </h3>
            <p className="text-xs font-normal text-[#B5ACA1] max-w-sm leading-relaxed">
              Premium student living accommodation. Designed for comfort, study productivity, and peace of mind.
            </p>
            <a
              href="https://maps.app.goo.gl/adn6FJcrz7XnTu9o9"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-[#D4B886] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B886] rounded"
            >
              <MapPin size={13} />
              Sector 126, Noida &bull; 2 Min Walk from Amity Gate 2
            </a>
          </div>

          {/* Navigation Links Column (3 cols) */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="text-[10px] font-mono font-medium tracking-[0.2em] uppercase text-[#D4B886]/80">
              NAVIGATION
            </span>
            <ul className="flex flex-col gap-2">
              {NAV_ITEMS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-xs font-normal text-[#B5ACA1] hover:text-[#F7F4EF] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B886] rounded px-1"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact Column (3 cols) */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="text-[10px] font-mono font-medium tracking-[0.2em] uppercase text-[#D4B886]/80">
              CONTACT
            </span>
            <ul className="flex flex-col gap-2 text-xs font-normal text-[#B5ACA1]">
              <li>
                <a href="tel:+918882813740" className="inline-flex items-center gap-2 hover:text-[#F7F4EF] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B886] rounded px-1">
                  <Phone size={13} className="text-[#D4B886]" />
                  +91 88828 13740
                </a>
              </li>
              <li>
                <a href="mailto:hello@luxspacepg.in" className="inline-flex items-center gap-2 hover:text-[#F7F4EF] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B886] rounded px-1">
                  <Mail size={13} className="text-[#D4B886]" />
                  hello@luxspacepg.in
                </a>
              </li>
            </ul>
          </div>

        </motion.div>

        {/* ── 3. Apple-Style Fine Print Legal Bar ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#B5ACA1]/60"
        >
          <p>&copy; {new Date().getFullYear()} Luxspace PG. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <span className="opacity-50 cursor-default" aria-label="Terms of Stay — coming soon">
              Terms of Stay
            </span>
            <span className="opacity-50 cursor-default" aria-label="Privacy Policy — coming soon">
              Privacy Policy
            </span>
          </div>
        </motion.div>

      </div>
    </footer>
  );
}
