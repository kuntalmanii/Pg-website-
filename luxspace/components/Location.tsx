"use client";

import { memo } from "react";
import { motion } from "framer-motion";

function LocationSection() {
  const mapSearchUrl = "https://www.google.com/maps/search/?api=1&query=Sector+126+Noida+Amity+University";

  const nearbyHighlights = [
    {
      title: "Amity University",
      detail: "Gate 2 & Main Campus",
      distance: "200 meters",
      time: "3 mins walk",
      icon: (
        <svg className="w-5 h-5 text-[#7C8DBB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      ),
    },
    {
      title: "Sector 126",
      detail: "Prime Education & IT Corridor",
      distance: "Heart of Noida",
      time: "Walking Zone",
      icon: (
        <svg className="w-5 h-5 text-[#7C8DBB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 4h4" />
        </svg>
      ),
    },
    {
      title: "Metro Connectivity",
      detail: "Botanical Garden / Okhla Bird Sanctuary",
      distance: "2.5 km",
      time: "5 mins drive",
      icon: (
        <svg className="w-5 h-5 text-[#7C8DBB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 7h8m-8 4h8m-4 8l-3-3m6 0l-3 3M4 5h16a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="location" className="w-full section-padding bg-[#F7F1E8]">
      <div className="apple-container">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <span className="text-xs font-sans font-semibold uppercase tracking-[0.25em] text-[#7C8DBB] block mb-3">
            Prime Noida Address
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-[#2D2D2D]">
            Strategic Location
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#2D2D2D]/70 mt-3">
            Situated right next to Amity University in Sector 126, Noida — effortless daily commute.
          </p>
        </div>

        {/* Split Layout: Left Map | Right Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Interactive Map Embed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 luxury-card rounded-[28px] overflow-hidden border border-[rgba(0,0,0,0.06)] shadow-xl min-h-[380px] sm:min-h-[460px] relative bg-[#FFFDF9] flex flex-col"
          >
            <iframe
              title="LuxSpace Noida Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.5188849491024!2d77.3328424!3d28.5391585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5a43173357b%3A0x37ff13028d7a1267!2sSector%20126%2C%20Noida%2C%20Uttar%20Pradesh%20201313!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              className="w-full h-full min-h-[380px] sm:min-h-[460px] border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

          {/* Right Column: Address & Connectivity Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-6 flex flex-col justify-between space-y-6"
          >
            {/* Primary Address & Distance Summary Card */}
            <div className="luxury-card p-6 sm:p-8 rounded-[28px] bg-[#FFFDF9] border border-[rgba(0,0,0,0.06)] shadow-lg space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#7C8DBB]/15 text-[#7C8DBB] flex items-center justify-center shrink-0 mt-1">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-[#7C8DBB]">
                    Full Address
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2D2D2D] mt-0.5">
                    LuxSpace Co-Living
                  </h3>
                  <p className="font-sans text-sm text-[#2D2D2D]/75 mt-1 leading-relaxed">
                    Sector 126, Noida, Uttar Pradesh — 201313
                  </p>
                </div>
              </div>

              {/* Distance & Walking Time Badge Bar */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[rgba(0,0,0,0.06)]">
                <div className="bg-[#F7F1E8]/70 p-4 rounded-2xl">
                  <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-[#2D2D2D]/60 block mb-1">
                    Distance
                  </span>
                  <span className="font-serif text-lg font-bold text-[#2D2D2D]">
                    200 Meters
                  </span>
                  <p className="text-xs text-[#7C8DBB] font-medium mt-0.5">from Amity Gate 2</p>
                </div>

                <div className="bg-[#F7F1E8]/70 p-4 rounded-2xl">
                  <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-[#2D2D2D]/60 block mb-1">
                    Walking Time
                  </span>
                  <span className="font-serif text-lg font-bold text-[#2D2D2D]">
                    3 Mins Walk
                  </span>
                  <p className="text-xs text-[#7C8DBB] font-medium mt-0.5">Zero Cab Needed</p>
                </div>
              </div>
            </div>

            {/* Nearby Highlights Grid */}
            <div className="space-y-3">
              <span className="text-xs font-sans font-semibold uppercase tracking-wider text-[#2D2D2D]/70 px-1 block">
                Nearby Destinations
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {nearbyHighlights.map((item) => (
                  <div
                    key={item.title}
                    className="luxury-card p-4 rounded-2xl bg-[#FFFDF9] border border-[rgba(0,0,0,0.06)] shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="mb-2">{item.icon}</div>
                    <h4 className="font-serif text-sm font-bold text-[#2D2D2D] leading-snug">
                      {item.title}
                    </h4>
                    <p className="font-sans text-[11px] text-[#2D2D2D]/60 mt-0.5 line-clamp-1">
                      {item.detail}
                    </p>
                    <div className="mt-2 pt-2 border-t border-[rgba(0,0,0,0.04)] flex items-center justify-between text-[10px] text-[#7C8DBB] font-semibold">
                      <span>{item.distance}</span>
                      <span>{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action CTA Button: Open in Google Maps */}
            <div>
              <a
                href={mapSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-8 rounded-full text-xs font-sans font-semibold uppercase tracking-widest text-white bg-[#7C8DBB] hover:bg-[#6B7CA9] active:scale-[0.99] transition-all shadow-md shadow-[#7C8DBB]/20 flex items-center justify-center gap-2 group"
              >
                <span>Open in Google Maps</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default memo(LocationSection);
