"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Navigation, Train, GraduationCap, UtensilsCrossed, Copy, Check, Clock, ShoppingBag, Building2 } from "lucide-react";

const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number];
const FULL_ADDRESS = "J-14, Royal Street Lane, 80 Raipur Khadar, Sector 126, Noida — 201 313";

/* ── Distance tabs ───────────────────────────────────────────────────────── */
const TABS = [
  {
    id:     "tab-amity",
    icon:   GraduationCap,
    short:  "Amity University",
    time:   "2 min walk",
    detail: "Direct road via Royal Street Lane — no crossings",
    color:  "#A7B7E7",
  },
  {
    id:     "tab-metro",
    icon:   Train,
    short:  "Metro Station",
    time:   "5 min drive",
    detail: "Sector 137 — Aqua Line, direct to Noida City Centre",
    color:  "#0050FF",
  },
  {
    id:     "tab-food",
    icon:   UtensilsCrossed,
    short:  "Food Street",
    time:   "3 min walk",
    detail: "Sector 126 market — cafes, dhabas & quick bites",
    color:  "#A7B7E7",
  },
] as const;

type TabId = typeof TABS[number]["id"];

/* ── Nearby landmarks (rich data) ───────────────────────────────────────── */
const NEARBY = [
  {
    id:       "near-amity-gate",
    icon:     GraduationCap,
    category: "University",
    label:    "Amity Gate 2",
    detail:   "Direct road, no crossing",
    time:     "2 min walk",
    fill:     96,           // % of bar to fill — visual proximity indicator
    accent:   "#A7B7E7",
    url:      "https://maps.app.goo.gl/adn6FJcrz7XnTu9o9",
  },
  {
    id:       "near-amity-main",
    icon:     GraduationCap,
    category: "University",
    label:    "Amity Main Gate",
    detail:   "Via Royal Street Lane",
    time:     "5 min walk",
    fill:     78,
    accent:   "#A7B7E7",
    url:      "https://maps.app.goo.gl/adn6FJcrz7XnTu9o9",
  },
  {
    id:       "near-metro",
    icon:     Train,
    category: "Transit",
    label:    "Sector 137 Metro",
    detail:   "Aqua Line · Noida City Centre",
    time:     "5 min drive",
    fill:     65,
    accent:   "#0050FF",
    url:      "https://maps.app.goo.gl/adn6FJcrz7XnTu9o9",
  },
  {
    id:       "near-food",
    icon:     UtensilsCrossed,
    category: "Food",
    label:    "Food Street",
    detail:   "Cafes, dhabas & quick bites",
    time:     "3 min walk",
    fill:     88,
    accent:   "#A7B7E7",
    url:      "https://maps.app.goo.gl/adn6FJcrz7XnTu9o9",
  },
  {
    id:       "near-market",
    icon:     ShoppingBag,
    category: "Market",
    label:    "Sector 126 Market",
    detail:   "Grocery, pharmacy & ATM",
    time:     "4 min walk",
    fill:     82,
    accent:   "#A7B7E7",
    url:      "https://maps.app.goo.gl/adn6FJcrz7XnTu9o9",
  },
  {
    id:       "near-hospital",
    icon:     Building2,
    category: "Healthcare",
    label:    "Felix Hospital",
    detail:   "24/7 emergency services",
    time:     "6 min drive",
    fill:     58,
    accent:   "#0050FF",
    url:      "https://maps.app.goo.gl/adn6FJcrz7XnTu9o9",
  },
];

/* ── Copy Address Button ─────────────────────────────────────────────────── */
function CopyAddressButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(FULL_ADDRESS);
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
        return;
      }
      // Fallback for restricted clipboard context
      const textarea = document.createElement("textarea");
      textarea.value = FULL_ADDRESS;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* fallback — fail gracefully */
    }
  }, []);

  return (
    <motion.button
      id="copy-address-btn"
      onClick={handleCopy}
      whileHover={{ scale: 1.04 }}
      whileTap={{  scale: 0.95 }}
      className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0050FF]"
      style={{
        background:     copied ? "rgba(167,183,231,0.95)" : "rgba(253,251,247,0.92)",
        border:         copied ? "1px solid #A7B7E7"      : "1px solid rgba(167,183,231,0.3)",
        backdropFilter: "blur(12px)",
        color:          copied ? "#050505" : "rgba(5,5,5,0.65)",
        boxShadow:      "0 4px 16px rgba(0,0,0,0.08)",
      }}
      aria-label="Copy address to clipboard"
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="check"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1,   opacity: 1 }}
            exit={{   scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="flex items-center gap-1"
          >
            <Check size={11} strokeWidth={2.8} />
            Copied!
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1,   opacity: 1 }}
            exit={{   scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="flex items-center gap-1"
          >
            <Copy size={11} strokeWidth={2.2} />
            Copy Address
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

/* ── Main component ──────────────────────────────────────────────────────── */
export default function LocationSection() {
  const [activeTab, setActiveTab] = useState<TabId>("tab-amity");
  const active = TABS.find((t) => t.id === activeTab)!;

  return (
    <section
      id="location"
      className="w-full bg-[#F3ECE2] py-28 sm:py-36 md:py-44 lg:py-52 px-6 sm:px-10 md:px-16 lg:px-20 scroll-mt-24"
      aria-labelledby="location-heading"
    >
      <div className="max-w-6xl mx-auto">

        {/* ── Section header ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-16 md:mb-20 lg:mb-24"
        >
          <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#D4B886] mb-3">
            Prime location
          </p>
          <h2
            id="location-heading"
            className="text-[clamp(2.2rem,4.8vw,3.4rem)] font-bold tracking-[-0.025em] leading-[1.1] text-[#24211E]"
          >
            Two minutes from
            <br />
            <span
              style={{
                background: "linear-gradient(95deg, #24211E 30%, #C5A059 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Amity University.
            </span>
          </h2>
        </motion.div>

        {/* ── Two-column grid ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-start">

          {/* ── Left col: Map + address ────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: EASE }}
            className="flex flex-col gap-6"
          >
            {/* ── Map container ──────────────────────────────────────── */}
            <div className="relative h-[380px] sm:h-[420px] md:h-[460px]">
              {/* Outer glow ring */}
              <div
                className="absolute -inset-[3px] rounded-[1.75rem] pointer-events-none"
                style={{
                  background:  "conic-gradient(from 180deg, rgba(212,184,134,0.45), rgba(156,149,166,0.25), rgba(212,184,134,0.45))",
                  filter:      "blur(2px)",
                  borderRadius: "1.75rem",
                }}
                aria-hidden
              />

              {/* Map wrapper */}
              <div
                className="relative w-full h-full overflow-hidden rounded-3xl shadow-[0_20px_60px_rgba(212,184,134,0.18)]"
              >
                <iframe
                  id="location-map"
                  title="Luxspace PG Location — Sector 126, Noida"
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: "block" }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://maps.google.com/maps?q=Raipur+Khadar,+Sector+126,+Noida,+Uttar+Pradesh+(Luxspace+PG)&z=16&output=embed"
                />

                {/* Brand badge — top-left */}
                <div
                  className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-semibold z-10"
                  style={{
                    background:     "rgba(250,246,240,0.96)",
                    backdropFilter: "blur(16px)",
                    color:          "#24211E",
                    boxShadow:      "0 8px 24px rgba(28,26,24,0.12)",
                  }}
                >
                  <MapPin size={12} style={{ color: "#D4B886" }} />
                  Luxspace PG
                </div>

                {/* ── Copy Address — bottom-right ──────────────── */}
                <CopyAddressButton />
              </div>
            </div>

            {/* Address card */}
            <motion.div
              whileHover={{ y: -3, boxShadow: "0 28px 60px rgba(0,0,0,0.45)" }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="rounded-3xl p-7 md:p-8 bg-[#1C1A18] shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
            >
              <div className="flex items-start gap-4">
                <div
                  className="mt-0.5 w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(212,184,134,0.18)" }}
                >
                  <MapPin size={18} style={{ color: "#D4B886" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-medium tracking-[0.18em] uppercase text-[#D4B886] mb-1">
                    Full Address
                  </p>
                  <p className="text-base font-bold text-[#F7F4EF] leading-snug">J-14, Royal Street Lane</p>
                  <p className="text-sm font-normal text-[#B5ACA1] leading-relaxed mt-1">
                    80 Raipur Khadar, Sector 126<br />
                    Noida, Uttar Pradesh — 201 313
                  </p>
                  <a
                    id="location-directions-link"
                    href="https://maps.app.goo.gl/adn6FJcrz7XnTu9o9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-xs font-medium tracking-[0.015em] transition-colors duration-200 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B886]"
                    style={{ color: "#D4B886" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#F7F4EF")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#D4B886")}
                  >
                    <Navigation size={12} />
                    Get Directions
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right col: Distance tabs + nearby list ─────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
            className="flex flex-col gap-5"
          >
            {/* ── Tabs ───────────────────────────────────────────────── */}
            <div>
              <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#736B63] mb-3 px-1">
                Distance from Luxspace
              </p>

              {/* Tab pills */}
              <div
                className="flex gap-2 p-1.5 rounded-2xl mb-4 bg-[#24211E]/5 shadow-inner"
                role="tablist"
                aria-label="Distance tabs"
              >
                {TABS.map((tab) => {
                  const Icon    = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <motion.button
                      key={tab.id}
                      id={tab.id}
                      role="tab"
                      aria-selected={isActive}
                      aria-controls="location-tabpanel"
                      onClick={() => setActiveTab(tab.id)}
                      whileTap={{ scale: 0.97 }}
                      className="flex-1 flex flex-col items-center gap-1 py-2.5 px-2 rounded-xl text-xs font-semibold transition-colors duration-200 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B886]"
                      style={{ color: isActive ? "#24211E" : "#736B63" }}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="tab-bg"
                          className="absolute inset-0 rounded-xl"
                          style={{
                            background: "#FAF6F0",
                            boxShadow:  "0 4px 16px rgba(28,26,24,0.08)",
                          }}
                          transition={{ duration: 0.28, ease: EASE }}
                        />
                      )}
                      <span className="relative z-10">
                        <Icon size={14} strokeWidth={2.2} />
                      </span>
                      <span className="relative z-10 leading-none text-center whitespace-nowrap">
                        {tab.short}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Active tab detail card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  id="location-tabpanel"
                  role="tabpanel"
                  aria-labelledby={activeTab}
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{   opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.28, ease: EASE }}
                  className="rounded-2xl p-5 flex items-center gap-4 bg-[#D4B886]/14 shadow-[0_8px_24px_rgba(212,184,134,0.12)]"
                >
                  {/* Time badge */}
                  <div
                    className="shrink-0 w-16 h-16 rounded-2xl flex flex-col items-center justify-center gap-0.5"
                    style={{
                      background: "#D4B886",
                      boxShadow:  `0 6px 20px rgba(212,184,134,0.35)`,
                    }}
                  >
                    <active.icon size={18} style={{ color: "#1C1A18" }} strokeWidth={2.2} />
                    <span className="text-[10px] font-black text-[#1C1A18] text-center leading-tight">
                      {active.time.split(" ").slice(0, 2).join(" ")}
                    </span>
                    <span className="text-[9px] text-[#1C1A18]/70 font-semibold">
                      {active.time.split(" ").slice(2).join(" ")}
                    </span>
                  </div>

                  <div>
                    <p className="text-sm font-black text-[#24211E]">{active.short}</p>
                    <p className="text-xs text-[#736B63] mt-0.5 leading-snug">{active.detail}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ── Nearby landmarks card grid ────────────────────────── */}
            <div>
              <div className="flex items-center justify-between mb-3 px-1">
                <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#736B63]">
                  All nearby landmarks
                </p>
                <span className="text-[10px] font-semibold text-[#736B63]/60">
                  {NEARBY.length} places
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {NEARBY.map(({ id, icon: Icon, category, label, detail, time, fill, accent, url }, i) => (
                  <motion.a
                    key={id}
                    id={id}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: EASE, delay: 0.07 * i }}
                    whileHover={{ y: -4, boxShadow: "0 14px 32px rgba(36,33,30,0.08)" }}
                    whileTap={{ scale: 0.97 }}
                    className="group flex flex-col gap-3 p-4.5 rounded-2xl cursor-pointer bg-[#FAF6F0] shadow-[0_6px_24px_rgba(28,26,24,0.04)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B886]"
                  >
                    {/* Top row: icon + category badge */}
                    <div className="flex items-start justify-between">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                        style={{
                          background: `${accent}22`,
                          border:     `1px solid ${accent}40`,
                        }}
                      >
                        <Icon size={15} style={{ color: accent }} strokeWidth={2.2} />
                      </div>
                      <span
                        className="text-[9px] font-bold tracking-wide uppercase px-2 py-0.5 rounded-full"
                        style={{
                          background: `${accent}18`,
                          color:      accent,
                        }}
                      >
                        {category}
                      </span>
                    </div>

                    {/* Label + detail */}
                    <div>
                      <p className="text-[13px] font-bold text-[#24211E] leading-tight">{label}</p>
                      <p className="text-[11px] text-[#736B63] mt-0.5 leading-snug">{detail}</p>
                    </div>

                    {/* Distance bar + time */}
                    <div className="flex flex-col gap-1.5">
                      {/* Proximity bar */}
                      <div
                        className="w-full h-[3px] rounded-full overflow-hidden"
                        style={{ background: "rgba(36,33,30,0.07)" }}
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${fill}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1], delay: 0.1 + 0.07 * i }}
                          className="h-full rounded-full"
                          style={{ background: `linear-gradient(90deg, ${accent}, ${accent}99)` }}
                        />
                      </div>

                      {/* Time pill row */}
                      <div className="flex items-center gap-1">
                        <Clock size={10} style={{ color: "#736B63" }} strokeWidth={2.2} />
                        <span className="text-[11px] font-bold" style={{ color: accent }}>
                          {time}
                        </span>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
