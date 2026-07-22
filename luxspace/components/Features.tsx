"use client";

import { motion } from "framer-motion";

const keyAmenities = [
  {
    icon: "🛏️",
    title: "Fully Furnished Rooms",
    description: "Orthopaedic mattress beds, modular wardrobes, and personal study stations for optimal focus.",
  },
  {
    icon: "❄️",
    title: "Quiet Air Conditioning",
    description: "Individual energy-efficient split AC in every single room for all-season climate control.",
  },
  {
    icon: "🚿",
    title: "Attached Washrooms",
    description: "Private ensuite washrooms with modern sanitary fittings and 24/7 hot water supply.",
  },
  {
    icon: "🍽️",
    title: "3 Meals Included",
    description: "Nutritious, hygienic home-cooked Breakfast, Lunch & Dinner prepared fresh daily.",
  },
  {
    icon: "📶",
    title: "High-Speed Wi-Fi",
    description: "High-speed fiber optical broadband connection across all floors for seamless streaming & work.",
  },
  {
    icon: "🧹",
    title: "Daily Housekeeping",
    description: "Professional cleaning staff ensuring spotless room and washroom sanitation every day.",
  },
  {
    icon: "🎱",
    title: "Recreation & Terrace",
    description: "Indoor games room featuring a pool table and a beautifully decorated rooftop terrace lounge.",
  },
  {
    icon: "🔐",
    title: "24x7 Security & Guard",
    description: "Round-the-clock CCTV surveillance, biometric smart lock access, and dedicated night security guard.",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative w-full py-24 sm:py-32 bg-[#050505] text-white overflow-hidden">
      {/* Background glow highlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-[0.3em] text-blue-400 block mb-3"
          >
            Curated Living Experience
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight"
          >
            DESIGNED FOR COMFORT. <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-white">
              BUILT FOR SUCCESS.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-base sm:text-lg text-white/60 font-light leading-relaxed"
          >
            Everything you need for a premium, hassle-free lifestyle in Sector 126 Noida — just walking distance from Amity Campus.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {keyAmenities.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="p-8 rounded-3xl bg-[#0B0B0E] border border-white/10 hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between group shadow-xl hover:shadow-2xl hover:shadow-blue-500/5"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 group-hover:bg-blue-500/10 group-hover:border-blue-500/30 transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-white/60 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/5 flex items-center text-xs font-semibold text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                Included in Stay →
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
