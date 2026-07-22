"use client";

import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import HeroVideo from "@/components/HeroVideo";
import Scrollytelling from "@/components/Scrollytelling";
import Amenities from "@/components/Amenities";
import LocationSection from "@/components/LocationSection";
import Footer from "@/components/Footer";
import ScheduleVisitModal from "@/components/ScheduleVisitModal";

export default function Home() {
  /* ── Global modal state — single source of truth ──────────────────────── */
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen  = useCallback(() => setIsModalOpen(true),  []);
  const handleClose = useCallback(() => setIsModalOpen(false), []);

  return (
    <>
      {/* ── Global ScheduleVisitModal ──────────────────────────────────── */}
      <ScheduleVisitModal isOpen={isModalOpen} onClose={handleClose} />

      <main>
        {/* ── 1. Floating navbar ─────────────────────────────────────── */}
        <Navbar onOpen={handleOpen} onSchedule={handleOpen} />

        {/* ── 2. Fullscreen ambient video hero ───────────────────────── */}
        <HeroVideo onOpen={handleOpen} onSchedule={handleOpen} />

        {/* ── 3. Canvas-based scroll-driven frame sequencer ──────────── */}
        <Scrollytelling />

        {/* ── 4. Amenities bento grid ────────────────────────────────── */}
        <Amenities />

        {/* ── 5. Location + distance indicators ─────────────────────── */}
        <LocationSection />

        {/* ── 6. Footer with pricing CTA + WhatsApp ─────────────────── */}
        <Footer onOpen={handleOpen} onSchedule={handleOpen} />
      </main>
    </>
  );
}
