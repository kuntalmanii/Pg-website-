"use client";

import { memo } from "react";

function FooterSection() {
  const quickLinks = [
    { name: "Overview", href: "#hero" },
    { name: "Room Anatomy", href: "#room-story" },
    { name: "Features", href: "#features" },
    { name: "Amenities", href: "#amenities" },
    { name: "Gallery", href: "#gallery" },
    { name: "Schedule Visit", href: "#schedule-visit" },
    { name: "Location", href: "#location" },
  ];

  return (
    <footer className="w-full bg-[#F3ECE2] border-t border-[rgba(0,0,0,0.06)] pt-16 sm:pt-20 pb-12">
      <div className="apple-container">
        {/* Main Footer Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 sm:gap-16 pb-16 border-b border-[rgba(0,0,0,0.06)]">
          {/* Column 1: Logo & Brand Description (4 cols) */}
          <div className="md:col-span-4 flex flex-col space-y-4">
            <div>
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#2D2D2D] block">
                LUXSPACE
              </span>
              <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.25em] text-[#7C8DBB] block mt-1">
                Premium Co-Living
              </span>
            </div>
            <p className="font-sans text-xs sm:text-sm text-[#2D2D2D]/60 max-w-sm leading-relaxed font-light">
              Elevating student & professional living in Sector 126 Noida. Thoughtfully designed spaces with luxury amenities, walking distance from Amity University.
            </p>
          </div>

          {/* Column 2: Quick Links (3 cols) */}
          <div className="md:col-span-3 flex flex-col space-y-4">
            <span className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-[#2D2D2D]/80">
              Quick Links
            </span>
            <ul className="space-y-2.5 text-xs font-sans font-medium text-[#2D2D2D]/70">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-[#7C8DBB] transition-colors inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info (5 cols) */}
          <div className="md:col-span-5 flex flex-col space-y-4">
            <span className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-[#2D2D2D]/80">
              Contact & Location
            </span>
            <div className="space-y-3 text-xs font-sans text-[#2D2D2D]/75">
              {/* Phone */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#7C8DBB]/10 text-[#7C8DBB] flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <a href="tel:+919876543210" className="hover:text-[#7C8DBB] transition-colors font-medium">
                  +91 98765 43210
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#7C8DBB]/10 text-[#7C8DBB] flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <a href="mailto:stay@luxspace.in" className="hover:text-[#7C8DBB] transition-colors font-medium">
                  stay@luxspace.in
                </a>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3 pt-1">
                <div className="w-8 h-8 rounded-full bg-[#7C8DBB]/10 text-[#7C8DBB] flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="font-light leading-relaxed">
                  Sector 126, Noida, Uttar Pradesh — 201313 <br />
                  <span className="text-[11px] text-[#7C8DBB] font-medium">Walking distance from Amity University</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sub-Footer: Social Icons & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <div className="text-xs font-sans text-[#2D2D2D]/50 text-center sm:text-left">
            © {new Date().getFullYear()} LUXSPACE Co-Living. All rights reserved.
          </div>

          {/* Minimal Line Social Icons */}
          <div className="flex items-center gap-4 text-[#2D2D2D]/60">
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full border border-[rgba(0,0,0,0.08)] flex items-center justify-center hover:text-[#7C8DBB] hover:border-[#7C8DBB]/40 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth={1.75} />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" strokeWidth={1.75} />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth={2} strokeLinecap="round" />
              </svg>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-9 h-9 rounded-full border border-[rgba(0,0,0,0.08)] flex items-center justify-center hover:text-[#7C8DBB] hover:border-[#7C8DBB]/40 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 21l1.65-3.8a9 9 0 113.4 2.9L3 21z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 10a.5.5 0 001 0V9a.5.5 0 00-1 0v1zm0 0a5 5 0 005 5h1a.5.5 0 000-1h-1a4 4 0 01-4-4v-1z" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-9 h-9 rounded-full border border-[rgba(0,0,0,0.08)] flex items-center justify-center hover:text-[#7C8DBB] hover:border-[#7C8DBB]/40 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-full border border-[rgba(0,0,0,0.08)] flex items-center justify-center hover:text-[#7C8DBB] hover:border-[#7C8DBB]/40 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" strokeWidth={1.75} />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default memo(FooterSection);
