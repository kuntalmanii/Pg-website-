"use client";

import { motion } from "framer-motion";

const pricingPlans = [
  {
    type: "Single Occupancy",
    price: "₹12,000",
    period: "/ month",
    badge: "Maximum Privacy",
    popular: true,
    features: [
      "Private Room for 1 Person",
      "Attached Personal Washroom",
      "Individual Split Air Conditioner",
      "3 Fresh Meals Included Daily",
      "High-Speed Fiber Wi-Fi & Electricity",
      "Daily Room Housekeeping",
    ],
  },
  {
    type: "Double Sharing",
    price: "₹9,500",
    period: "/ person / month",
    badge: "Best Value",
    popular: false,
    features: [
      "Spacious Room for 2 Persons",
      "Attached Personal Washroom",
      "Individual Split Air Conditioner",
      "3 Fresh Meals Included Daily",
      "High-Speed Fiber Wi-Fi & Electricity",
      "Daily Room Housekeeping",
    ],
  },
  {
    type: "Triple Sharing",
    price: "₹7,500",
    period: "/ person / month",
    badge: "Budget Friendly",
    popular: false,
    features: [
      "Furnished Room for 3 Persons",
      "Attached Personal Washroom",
      "Individual Split Air Conditioner",
      "3 Fresh Meals Included Daily",
      "High-Speed Fiber Wi-Fi & Electricity",
      "Daily Room Housekeeping",
    ],
  },
];

export default function VisitCTA() {
  return (
    <section id="pricing" className="relative w-full py-24 sm:py-32 bg-[#050505] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-[0.3em] text-blue-400 block mb-3"
          >
            All-Inclusive Tariffs
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black tracking-tight text-white"
          >
            TRANSPARENT PRICING
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-white/60 font-light"
          >
            No hidden maintenance fees. Price covers room rent, meals, Wi-Fi, electricity & cleaning.
          </motion.p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {pricingPlans.map((plan, idx) => (
            <motion.div
              key={plan.type}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                plan.popular
                  ? "bg-gradient-to-b from-[#121224] to-[#0A0A12] border-2 border-blue-500 shadow-2xl shadow-blue-500/20"
                  : "bg-[#0B0B0E] border border-white/10 hover:border-white/20 shadow-xl"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-blue-600 text-white text-[11px] font-bold uppercase tracking-wider shadow-lg">
                  Most Preferred
                </div>
              )}

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 block mb-2">
                  {plan.badge}
                </span>
                <h3 className="text-2xl font-bold text-white mb-4">{plan.type}</h3>

                <div className="flex items-baseline gap-1 mb-8 pb-6 border-b border-white/10">
                  <span className="text-4xl sm:text-5xl font-black text-white">{plan.price}</span>
                  <span className="text-xs text-white/50">{plan.period}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-3 text-sm text-white/70">
                      <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold">
                        ✓
                      </span>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="tel:+919999999999"
                className={`w-full py-4 rounded-xl text-center text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-lg ${
                  plan.popular
                    ? "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30"
                    : "bg-white/10 hover:bg-white/20 text-white"
                }`}
              >
                Reserve This Suite
              </a>
            </motion.div>
          ))}
        </div>

        {/* Immediate Contact Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-blue-950/40 border border-blue-500/30 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl"
        >
          <div className="max-w-xl text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400 block mb-2">
              Walk-In Inspections Welcome
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white mb-3">
              Want to see the room in person?
            </h3>
            <p className="text-sm sm:text-base text-white/70 font-light">
              Visit us today at J-14 Royal Street Lane, Sector 126 Noida. Open for visits daily from 9:00 AM to 8:00 PM.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <a
              href="tel:+919999999999"
              className="px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/30 hover:scale-105"
            >
              Call +91 99999 99999
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
