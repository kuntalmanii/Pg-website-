"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";

/* ── Critical Path Components (Static Imports for Instant Above-the-Fold LCP) ── */
import Navbar from "@/components/Navbar";
import HeroVideo from "@/components/HeroVideo";

/* ── Non-Critical Components (Dynamic Imports for Code Splitting) ───────────── */
const Scrollytelling = dynamic(() => import("@/components/Scrollytelling"), {
  ssr: true,
});
const RoomShowcase = dynamic(() => import("@/components/RoomShowcase"), {
  ssr: true,
});
const Amenities = dynamic(() => import("@/components/Amenities"), {
  ssr: true,
});
const TrustSection = dynamic(() => import("@/components/TrustSection"), {
  ssr: true,
});
const LocationSection = dynamic(() => import("@/components/LocationSection"), {
  ssr: true,
});
const Gallery = dynamic(() => import("@/components/Gallery"), {
  ssr: true,
});
const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: true,
});
const ScheduleVisitModal = dynamic(
  () => import("@/components/ScheduleVisitModal"),
  { ssr: false }
);
const MobileStickyDock = dynamic(
  () => import("@/components/MobileStickyDock"),
  { ssr: false }
);

export default function Home() {
  /* ── Global modal state — single source of truth ──────────────────────── */
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen  = useCallback(() => setIsModalOpen(true),  []);
  const handleClose = useCallback(() => setIsModalOpen(false), []);

  return (
    <>
      {/* ── Global ScheduleVisitModal ──────────────────────────────────── */}
      <ScheduleVisitModal isOpen={isModalOpen} onClose={handleClose} />

      {/* ── Floating Mobile Sticky CTA Dock ────────────────────────────── */}
      <MobileStickyDock onOpenSchedule={handleOpen} />

      <main>
        {/* ── 1. Floating navbar ─────────────────────────────────────── */}
        <Navbar onOpen={handleOpen} onSchedule={handleOpen} />

        {/* ── 2. Fullscreen ambient video hero ───────────────────────── */}
        <HeroVideo onOpen={handleOpen} onSchedule={handleOpen} />

        {/* ── 3. Canvas-based scroll-driven frame sequencer ──────────── */}
        <Scrollytelling />

        {/* ── 4. Luxury Hotel-Grade Room Showcase ────────────────────── */}
        <RoomShowcase onOpen={handleOpen} onSchedule={handleOpen} />

        {/* ── 5. Amenities bento grid ────────────────────────────────── */}
        <Amenities />

        {/* ── 6. Verified Trust & Resident Reviews ──────────────────── */}
        <TrustSection />

        {/* ── 7. Location + distance indicators ─────────────────────── */}
        <LocationSection />

        {/* ── 8. Luxury Architectural Gallery ───────────────────────── */}
        <Gallery />

        {/* ── 9. Footer with pricing CTA + WhatsApp ─────────────────── */}
        <Footer onOpen={handleOpen} onSchedule={handleOpen} />
      </main>
    </>
  );
}
