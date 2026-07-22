"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "Rooms", href: "#visit" },
  { name: "Amenities", href: "#features" },
  { name: "Gallery", href: "#gallery" },
  { name: "Location", href: "#location" },
  { name: "Schedule Visit", href: "#visit" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#F7F1E8]/80 backdrop-blur-md border-b border-[rgba(0,0,0,0.06)] shadow-sm py-4"
            : "bg-transparent border-b border-transparent py-6"
        }`}
      >
        <div className="apple-container flex items-center justify-between">
          {/* Logo Left */}
          <a href="#hero" className="flex items-center gap-3 group">
            <span className="font-serif text-2xl font-bold tracking-tight text-[#2D2D2D]">
              LuxSpace
            </span>
            <span className="hidden sm:inline-block text-[11px] font-sans tracking-widest uppercase text-[#7C8DBB] border-l border-[rgba(0,0,0,0.1)] pl-3">
              Sector 126 Noida
            </span>
          </a>

          {/* Desktop Navigation (Minimal Apple Style) */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-sans font-medium uppercase tracking-wider text-[#2D2D2D]/70 hover:text-[#2D2D2D] transition-colors relative py-1"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center">
            <a
              href="tel:+919999999999"
              className="px-6 py-2.5 rounded-full text-xs font-sans font-semibold uppercase tracking-wider text-white bg-[#7C8DBB] hover:bg-[#6B7CA9] transition-all shadow-sm active:scale-95"
            >
              Book Now
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileDrawerOpen(true)}
            className="lg:hidden p-2 text-[#2D2D2D] hover:opacity-75 transition-opacity"
            aria-label="Open Navigation Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.75}
                d="M4 8h16M4 16h16"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Slide Drawer */}
      <AnimatePresence>
        {mobileDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileDrawerOpen(false)}
              className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm lg:hidden"
            />

            {/* Slide Drawer Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-4/5 max-w-sm bg-[#FFFDF9] border-l border-[rgba(0,0,0,0.06)] shadow-2xl p-8 flex flex-col justify-between lg:hidden"
            >
              <div>
                {/* Header inside drawer */}
                <div className="flex items-center justify-between pb-6 border-b border-[rgba(0,0,0,0.06)] mb-8">
                  <span className="font-serif text-xl font-bold text-[#2D2D2D]">
                    LuxSpace
                  </span>
                  <button
                    onClick={() => setMobileDrawerOpen(false)}
                    className="p-2 text-[#2D2D2D]/60 hover:text-[#2D2D2D] transition-colors"
                    aria-label="Close Navigation Menu"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Mobile Links */}
                <nav className="flex flex-col gap-6">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileDrawerOpen(false)}
                      className="text-base font-sans font-medium text-[#2D2D2D] hover:text-[#7C8DBB] transition-colors"
                    >
                      {link.name}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Mobile CTA */}
              <div className="pt-6 border-t border-[rgba(0,0,0,0.06)]">
                <a
                  href="tel:+919999999999"
                  onClick={() => setMobileDrawerOpen(false)}
                  className="w-full block py-3.5 rounded-full text-center text-xs font-sans font-semibold uppercase tracking-wider text-white bg-[#7C8DBB] hover:bg-[#6B7CA9] transition-colors shadow-sm"
                >
                  Book Now
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
