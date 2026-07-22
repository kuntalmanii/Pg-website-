"use client";

import { useEffect, useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "Room Anatomy", href: "#room-story" },
  { name: "Features", href: "#features" },
  { name: "Amenities", href: "#amenities" },
  { name: "Gallery", href: "#gallery" },
  { name: "Schedule Visit", href: "#schedule-visit" },
  { name: "Location", href: "#location" },
];

function NavbarComponent() {
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
            ? "bg-[#F7F1E8]/90 backdrop-blur-md border-b border-[rgba(0,0,0,0.06)] shadow-sm py-4"
            : "bg-transparent border-b border-transparent py-6"
        }`}
      >
        <div className="apple-container max-w-7xl mx-auto px-6 lg:px-12 w-full flex items-center justify-between">
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
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-sans font-medium uppercase tracking-wider text-[#2D2D2D]/75 hover:text-[#7C8DBB] transition-colors relative py-1"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center">
            <a
              href="#schedule-visit"
              className="px-6 py-2.5 rounded-full text-xs font-sans font-semibold uppercase tracking-wider text-white bg-[#7C8DBB] hover:bg-[#6B7CA9] transition-all shadow-sm active:scale-95"
            >
              Book Visit
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
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setMobileDrawerOpen(false)}
              className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm lg:hidden"
            />

            {/* Slide Drawer Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-4/5 max-w-sm bg-white border-l border-[rgba(0,0,0,0.06)] shadow-2xl p-8 flex flex-col justify-between lg:hidden"
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
                <nav className="flex flex-col gap-5">
                  {navLinks.map((link, idx) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 + idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                      onClick={() => setMobileDrawerOpen(false)}
                      className="text-base font-sans font-medium text-[#2D2D2D] hover:text-[#7C8DBB] transition-colors"
                    >
                      {link.name}
                    </motion.a>
                  ))}
                </nav>
              </div>

              {/* Mobile CTA */}
              <div className="pt-6 border-t border-[rgba(0,0,0,0.06)]">
                <a
                  href="#schedule-visit"
                  onClick={() => setMobileDrawerOpen(false)}
                  className="w-full block py-3.5 rounded-full text-center text-xs font-sans font-semibold uppercase tracking-wider text-white bg-[#7C8DBB] hover:bg-[#6B7CA9] transition-colors shadow-sm"
                >
                  Schedule Visit
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default memo(NavbarComponent);
