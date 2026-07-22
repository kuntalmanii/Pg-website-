"use client";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import RoomStory from "../components/RoomStory";
import Features from "../components/Features";
import Amenities from "../components/Amenities";
import Gallery from "../components/Gallery";
import ScheduleVisit from "../components/ScheduleVisit";
import Location from "../components/Location";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-[#F7F1E8] text-[#2D2D2D] selection:bg-[#A7B7E7]/40 selection:text-[#2D2D2D]">
      <Navbar />
      <Hero />
      <RoomStory />
      <Features />
      <Amenities />
      <Gallery />
      <ScheduleVisit />
      <Location />
      <Footer />
    </main>
  );
}
