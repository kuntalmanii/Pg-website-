"use client";

import { motion } from "framer-motion";
import { Calendar, MessageCircle } from "lucide-react";

interface MobileStickyDockProps {
  onOpenSchedule: () => void;
}

export default function MobileStickyDock({ onOpenSchedule }: MobileStickyDockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
      className="block sm:hidden fixed bottom-4 inset-x-4 z-40 pointer-events-auto"
    >
      <div className="flex items-center gap-2 p-2 rounded-full bg-[#1C1A18]/92 backdrop-blur-2xl border border-white/10 shadow-[0_16px_50px_rgba(0,0,0,0.5)]">
        {/* Primary Schedule CTA */}
        <motion.button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            onOpenSchedule();
          }}
          whileTap={{ scale: 0.96 }}
          className="flex-1 py-3 px-4 rounded-full text-xs font-semibold tracking-[0.02em] bg-[#D4B886] text-[#1C1A18] shadow-[0_4px_16px_rgba(212,184,134,0.35)] flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B886]"
        >
          <Calendar size={15} />
          <span>Schedule Visit</span>
        </motion.button>

        {/* WhatsApp Direct Action */}
        <motion.a
          href="https://wa.me/918882813740?text=Hi%2C%20I%27m%20interested%20in%20Luxspace%20PG."
          target="_blank"
          rel="noopener noreferrer"
          whileTap={{ scale: 0.96 }}
          className="py-3 px-4 rounded-full text-xs font-semibold tracking-[0.02em] text-[#F7F4EF] bg-white/10 backdrop-blur-xl flex items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle size={15} className="text-[#25D366]" />
          <span>WhatsApp</span>
        </motion.a>
      </div>
    </motion.div>
  );
}
