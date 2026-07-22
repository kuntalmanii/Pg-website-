"use client";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import WhyLuxSpace from "../components/WhyLuxSpace";
import RoomStory from "../components/RoomStory";
import Features from "../components/Features";
import Amenities from "../components/Amenities";
import Gallery from "../components/Gallery";
import StudentLifestyle from "../components/StudentLifestyle";
import Location from "../components/Location";
import ScheduleVisit from "../components/ScheduleVisit";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-[#F7F1E8] text-[#2D2D2D] selection:bg-[#A7B7E7]/40 selection:text-[#2D2D2D]">
      {/* 1. Transparent Navbar */}
      <Navbar />

      {/* 2. Full-screen Cinematic Hero Video */}
      <Hero />

      {/* 3. Why LuxSpace */}
      <WhyLuxSpace />

      {/* 4. Room Showcase (Hotspots & Interactive Side Panel) */}
      <RoomStory />

      {/* 5. Amenities (Icon Cards) */}
      <Features />
      <Amenities />

      {/* 6. Gallery (Masonry Layout) */}
      <Gallery />

      {/* 7. Student Lifestyle (Large Editorial Section) */}
      <StudentLifestyle />

      {/* 8. Location (Interactive Map) */}
      <Location />

      {/* 9. Schedule Visit (Premium Booking Card) */}
      <ScheduleVisit />

      {/* 10. Footer */}
      <Footer />
    </main>
  );
}
