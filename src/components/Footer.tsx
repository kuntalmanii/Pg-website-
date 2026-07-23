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
      className="w-full bg-[#050505] text-[#FDFBF7] pt-20 pb-12 px-6 md:px-12 border-t border-[rgba(253,251,247,0.08)]"
      aria-label="Site footer"
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-16">

        {/* ── 1. Minimal Callout Banner ───────────────────────────────── */}
        <motion.div
          id="pricing"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden"
          style={{
            background: "rgba(253, 251, 247, 0.03)",
            border:     "1px solid rgba(167, 183, 231, 0.15)",
          }}
        >
          {/* Subtle ambient glow */}
          <div
            className="pointer-events-none absolute -top-20 -right-20 w-56 h-56 rounded-full blur-3xl opacity-10"
            style={{ background: "#A7B7E7" }}
            aria-hidden
          />

          <div>
            <p className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#A7B7E7] mb-1.5">
              ALL-INCLUSIVE RESIDENCE
            </p>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#FDFBF7]">
              Starting at ₹12,000 <span className="text-sm font-normal text-[rgba(253,251,247,0.45)]">/ month</span>
            </h2>
            <p className="mt-1.5 text-xs text-[rgba(253,251,247,0.5)]">
              3 daily meals, high-speed Wi-Fi & daily housekeeping included.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3 flex-wrap shrink-0">
            <motion.button
              id="footer-schedule-btn"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleOpen();
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-[#050505] transition-all duration-200 cursor-pointer shadow-lg"
              style={{ background: "#A7B7E7" }}
            >
              Schedule Visit
              <ArrowUpRight size={14} />
            </motion.button>

            <motion.a
              id="footer-whatsapp-btn"
              href="https://wa.me/918882813740?text=Hi%2C%20I%27m%20interested%20in%20Luxspace%20PG."
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-semibold text-[#FDFBF7] transition-all duration-200"
              style={{
                background: "rgba(253, 251, 247, 0.06)",
                border:     "1px solid rgba(253, 251, 247, 0.12)",
              }}
            >
              <MessageCircle size={14} className="text-[#25D366]" />
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
          className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-[rgba(253,251,247,0.06)]"
        >
          {/* Brand & Address Column (6 cols) */}
          <div className="md:col-span-6 flex flex-col gap-3">
            <h3 className="text-xl font-black tracking-tight text-[#FDFBF7]">
              LUX<span className="text-[#A7B7E7]">SPACE</span>
            </h3>
            <p className="text-xs text-[rgba(253,251,247,0.5)] max-w-sm leading-relaxed">
              Premium student living accommodation. Designed for comfort, study productivity, and peace of mind.
            </p>
            <a
              href="https://maps.app.goo.gl/adn6FJcrz7XnTu9o9"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1.5 text-xs text-[#A7B7E7] hover:underline"
            >
              <MapPin size={13} />
              Sector 126, Noida &bull; 2 Min Walk from Amity Gate 2
            </a>
          </div>

          {/* Navigation Links Column (3 cols) */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[rgba(253,251,247,0.3)]">
              NAVIGATION
            </span>
            <ul className="flex flex-col gap-2">
              {NAV_ITEMS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-xs text-[rgba(253,251,247,0.6)] hover:text-[#FDFBF7] transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact Column (3 cols) */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[rgba(253,251,247,0.3)]">
              CONTACT
            </span>
            <ul className="flex flex-col gap-2 text-xs text-[rgba(253,251,247,0.6)]">
              <li>
                <a href="tel:+918882813740" className="inline-flex items-center gap-2 hover:text-[#FDFBF7] transition-colors">
                  <Phone size={13} className="text-[#A7B7E7]" />
                  +91 88828 13740
                </a>
              </li>
              <li>
                <a href="mailto:hello@luxspacepg.in" className="inline-flex items-center gap-2 hover:text-[#FDFBF7] transition-colors">
                  <Mail size={13} className="text-[#A7B7E7]" />
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
          className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[rgba(253,251,247,0.35)]"
        >
          <p>&copy; {new Date().getFullYear()} Luxspace PG. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-[rgba(253,251,247,0.7)] transition-colors">
              Terms of Stay
            </a>
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-[rgba(253,251,247,0.7)] transition-colors">
              Privacy Policy
            </a>
          </div>
        </motion.div>

      </div>
    </footer>
  );
}
