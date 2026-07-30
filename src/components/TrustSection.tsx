"use client";

import { motion } from "framer-motion";
import {
  Star,
  GraduationCap,
  Train,
  Users,
  Quote,
  Sparkles,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

interface Testimonial {
  id: string;
  name: string;
  role: string;
  college: string;
  rating: number;
  avatarText: string;
  avatarBg: string;
  comment: string;
  tag: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "review-1",
    name: "Rohan Sharma",
    role: "B.Tech Computer Science",
    college: "Amity University (Batch of '25)",
    rating: 5,
    avatarText: "RS",
    avatarBg: "#D4B886",
    comment:
      "Living at Luxspace transformed my college years. The 1 Gbps Wi-Fi never drops during coding marathons, and having three chef meals ready every day saves me 2+ hours daily.",
    tag: "Resident for 2 Years",
  },
  {
    id: "review-2",
    name: "Ananya Deshmukh",
    role: "MBA International Business",
    college: "Amity Business School",
    rating: 5,
    avatarText: "AD",
    avatarBg: "#9C95A6",
    comment:
      "The security here is top tier — 24/7 biometric gates and guards make me and my parents feel 100% safe. Plus, Gate 2 is literally a 2-minute walk from my room.",
    tag: "Verified Resident",
  },
  {
    id: "review-3",
    name: "Kabir Malhotra",
    role: "UX Design Intern",
    college: "Sector 125 Corporate Hub",
    rating: 5,
    avatarText: "KM",
    avatarBg: "#7F826B",
    comment:
      "The quiet study lounge and rooftop terrace are unmatched. It feels like staying in a 5-star boutique hotel with daily housekeeping and laundry service.",
    tag: "Verified Resident",
  },
];

export default function TrustSection() {
  return (
    <section
      id="trust"
      className="relative py-28 sm:py-36 md:py-44 bg-[#FAF6F0] overflow-hidden scroll-mt-24"
      aria-label="Trust & Testimonials"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-10 md:px-16 lg:px-20">

        {/* ── 1. Live Trust Metrics Header Bar ────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.85, ease: EASE }}
          className="rounded-3xl p-8 sm:p-10 md:p-12 bg-[#1C1A18] text-[#F7F4EF] shadow-[0_24px_60px_rgba(0,0,0,0.35)] mb-20 relative overflow-hidden"
        >
          {/* Subtle Ambient Glow */}
          <div
            className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-20"
            style={{ background: "#D4B886" }}
            aria-hidden
          />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-mono font-medium tracking-[0.2em] uppercase bg-[#D4B886]/16 text-[#D4B886] mb-3">
                <Sparkles size={12} />
                TRUSTED BY 1,200+ STUDENTS
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-snug text-[#F7F4EF]">
                The Gold Standard in <span className="text-[#D4B886]">Student Hospitality.</span>
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-[#B5ACA1] leading-relaxed">
                Backed by 50+ verified 5-star Google reviews and trusted by students across top Noida institutions.
              </p>
            </div>

            {/* Metric Counters Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 lg:pt-0 border-t lg:border-t-0 lg:border-l border-white/10 lg:pl-10 shrink-0">
              {/* Metric 1 */}
              <div>
                <div className="flex items-center gap-1 text-[#D4B886]">
                  <Star size={16} fill="#D4B886" />
                  <span className="text-2xl font-extrabold text-[#F7F4EF]">4.9</span>
                </div>
                <p className="text-[11px] text-[#B5ACA1] mt-1">Google Rating</p>
              </div>

              {/* Metric 2 */}
              <div>
                <div className="flex items-center gap-1 text-[#D4B886]">
                  <Users size={16} />
                  <span className="text-2xl font-extrabold text-[#F7F4EF]">1,200+</span>
                </div>
                <p className="text-[11px] text-[#B5ACA1] mt-1">Residents Hosted</p>
              </div>

              {/* Metric 3 */}
              <div>
                <div className="flex items-center gap-1 text-[#D4B886]">
                  <GraduationCap size={16} />
                  <span className="text-2xl font-extrabold text-[#F7F4EF]">2 Min</span>
                </div>
                <p className="text-[11px] text-[#B5ACA1] mt-1">Amity Gate 2</p>
              </div>

              {/* Metric 4 */}
              <div>
                <div className="flex items-center gap-1 text-[#D4B886]">
                  <Train size={16} />
                  <span className="text-2xl font-extrabold text-[#F7F4EF]">5 Min</span>
                </div>
                <p className="text-[11px] text-[#B5ACA1] mt-1">Sector 126 Metro</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Living Pillars removed — covered in Amenities section above */}

        {/* ── 3. Verified Resident Testimonials ───────────────────────── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
          >
            <div>
              <span className="text-[10px] font-mono font-medium tracking-[0.2em] uppercase text-[#D4B886] mb-2 block">
                RESIDENT REVIEWS
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#24211E]">
                Loved by Students. <span className="text-[#D4B886]">Approved by Parents.</span>
              </h3>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-[#24211E]">
              <div className="flex text-[#D4B886]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="#D4B886" />
                ))}
              </div>
              <span>4.9 Average Rating across 50+ reviews</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {TESTIMONIALS.map((item, idx) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.75, ease: EASE, delay: 0.1 * idx }}
                whileHover={{ y: -5 }}
                className="rounded-3xl p-7 md:p-8 bg-[#F7F4EF] shadow-[0_12px_40px_rgba(36,33,30,0.05)] flex flex-col justify-between transition-all duration-300"
              >
                <div>
                  {/* Rating & Quote Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex text-[#D4B886]">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} size={14} fill="#D4B886" />
                      ))}
                    </div>
                    <Quote size={20} className="text-[#D4B886]/40" />
                  </div>

                  <p className="text-xs sm:text-sm font-normal text-[#4A4540] leading-relaxed mb-6 italic">
                    &ldquo;{item.comment}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-[#24211E]/8 flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-[#1C1A18] shrink-0"
                    style={{ background: item.avatarBg }}
                  >
                    {item.avatarText}
                  </div>

                  <div className="min-w-0">
                    <h5 className="text-xs font-bold text-[#24211E] truncate">{item.name}</h5>
                    <p className="text-[11px] text-[#736B63] truncate">{item.role}</p>
                    <p className="text-[10px] text-[#D4B886] font-medium truncate">{item.college}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
