"use client";

import { motion } from "framer-motion";

export default function Location() {
  return (
    <section id="location" className="relative w-full py-24 sm:py-32 bg-[#0A0A0D] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Address Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-blue-400 block mb-3">
                Prime Connectivity
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                LOCATION & ADDRESS
              </h2>
              <p className="mt-4 text-base text-white/60 font-light leading-relaxed">
                Situated right in the heart of Sector 126 Noida, giving students and working professionals instant access to universities, tech parks, and transport hubs.
              </p>
            </div>

            {/* Details Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-[#121218] border border-white/10">
                <div className="text-xl mb-2">📍</div>
                <h4 className="text-sm font-bold text-white mb-1">Exact Address</h4>
                <p className="text-xs text-white/60 leading-relaxed">
                  J-14, Royal Street Lane, Sector 126, Noida, Uttar Pradesh 201313
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#121218] border border-white/10">
                <div className="text-xl mb-2">🚶</div>
                <h4 className="text-sm font-bold text-white mb-1">Amity Distance</h4>
                <p className="text-xs text-white/60 leading-relaxed">
                  Walking distance (~500m) to Amity University Campus Gate.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#121218] border border-white/10">
                <div className="text-xl mb-2">🚇</div>
                <h4 className="text-sm font-bold text-white mb-1">Metro Access</h4>
                <p className="text-xs text-white/60 leading-relaxed">
                  Quick auto ride to Okhla Bird Sanctuary & Botanical Garden Metro.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#121218] border border-white/10">
                <div className="text-xl mb-2">🛡️</div>
                <h4 className="text-sm font-bold text-white mb-1">Safety & Security</h4>
                <p className="text-xs text-white/60 leading-relaxed">
                  Gated street with 24x7 night security guard and CCTV monitoring.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Embedded Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full h-[400px] sm:h-[480px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative bg-[#121218]"
          >
            <iframe
              src="https://maps.google.com/maps?q=Sector%20126%20Noida%20Raipur%20Khadar&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(1.2)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="LuxSpace Location Map"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
