"use client";

import { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface ScheduleVisitData {
  name: string;
  phone: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  occupation: "Student" | "Working Professional";
  message?: string;
}

export interface ScheduleVisitProps {
  onSubmitData?: (data: ScheduleVisitData) => void;
  className?: string;
  title?: string;
  subtitle?: string;
}

function ScheduleVisitSection({
  onSubmitData,
  className = "",
  title = "Schedule Your Visit",
  subtitle = "EXPERIENCE LUXSPACE IN PERSON",
}: ScheduleVisitProps) {
  const [formData, setFormData] = useState<ScheduleVisitData>({
    name: "",
    phone: "",
    email: "",
    preferredDate: "",
    preferredTime: "",
    occupation: "Student",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ScheduleVisitData, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ScheduleVisitData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9+\-\s()]{7,15}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = "Please select a preferred date";
    }

    if (!formData.preferredTime) {
      newErrors.preferredTime = "Please select a preferred time";
    }

    if (!formData.occupation) {
      newErrors.occupation = "Please select your occupation";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    field: keyof ScheduleVisitData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      if (onSubmitData) {
        onSubmitData(formData);
      }
    }, 400);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      preferredDate: "",
      preferredTime: "",
      occupation: "Student",
      message: "",
    });
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <section id="schedule-visit" className={`w-full section-padding bg-[#F7F1E8] ${className}`}>
      <div className="apple-container max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-xs font-sans font-semibold uppercase tracking-[0.25em] text-[#7C8DBB] block mb-3">
            {subtitle}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-[#2D2D2D]">
            {title}
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#2D2D2D]/70 max-w-lg mx-auto mt-4">
            Take a walk-through of our luxury rooms and premium amenities in Sector 126 Noida.
          </p>
        </motion.div>

        {/* Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="luxury-card p-6 sm:p-10 md:p-12 bg-[#FFFDF9] rounded-[28px] border border-[rgba(0,0,0,0.06)] shadow-xl relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-center py-12 px-4 flex flex-col items-center justify-center min-h-[380px]"
              >
                <div className="w-16 h-16 rounded-full bg-[#7C8DBB]/15 text-[#7C8DBB] flex items-center justify-center mb-6">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2D2D2D] mb-3">
                  Visit Scheduled!
                </h3>
                <p className="font-sans text-sm sm:text-base text-[#2D2D2D]/70 max-w-md mb-8">
                  Thank you, <span className="font-semibold text-[#2D2D2D]">{formData.name}</span>. We have reserved your visit slot on{" "}
                  <span className="font-semibold text-[#2D2D2D]">{formData.preferredDate}</span> at{" "}
                  <span className="font-semibold text-[#2D2D2D]">{formData.preferredTime}</span>. Our representative will contact you shortly.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-8 py-3 rounded-full text-xs font-sans font-semibold uppercase tracking-wider text-white bg-[#7C8DBB] hover:bg-[#6B7CA9] transition-colors shadow-md"
                >
                  Schedule Another Visit
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                onSubmit={handleSubmit}
                noValidate
                className="space-y-6 sm:space-y-8"
              >
                {/* Grid 1: Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#2D2D2D]/80 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className={`w-full px-4 py-3.5 rounded-2xl bg-[#F7F1E8]/50 border ${
                        errors.name ? "border-red-400 focus:ring-red-400" : "border-[rgba(0,0,0,0.08)] focus:ring-[#7C8DBB]"
                      } text-sm text-[#2D2D2D] placeholder-[#2D2D2D]/40 focus:outline-none focus:ring-2 focus:bg-white transition-all`}
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-red-500 font-sans">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#2D2D2D]/80 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className={`w-full px-4 py-3.5 rounded-2xl bg-[#F7F1E8]/50 border ${
                        errors.phone ? "border-red-400 focus:ring-red-400" : "border-[rgba(0,0,0,0.08)] focus:ring-[#7C8DBB]"
                      } text-sm text-[#2D2D2D] placeholder-[#2D2D2D]/40 focus:outline-none focus:ring-2 focus:bg-white transition-all`}
                    />
                    {errors.phone && (
                      <p className="mt-1.5 text-xs text-red-500 font-sans">{errors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Grid 2: Email & Occupation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#2D2D2D]/80 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="e.g. rahul@example.com"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className={`w-full px-4 py-3.5 rounded-2xl bg-[#F7F1E8]/50 border ${
                        errors.email ? "border-red-400 focus:ring-red-400" : "border-[rgba(0,0,0,0.08)] focus:ring-[#7C8DBB]"
                      } text-sm text-[#2D2D2D] placeholder-[#2D2D2D]/40 focus:outline-none focus:ring-2 focus:bg-white transition-all`}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-red-500 font-sans">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#2D2D2D]/80 mb-2">
                      Occupation <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3 pt-0.5">
                      {(["Student", "Working Professional"] as const).map((occ) => (
                        <button
                          key={occ}
                          type="button"
                          onClick={() => handleChange("occupation", occ)}
                          className={`py-3 px-3 rounded-2xl text-xs font-sans font-medium border transition-all text-center ${
                            formData.occupation === occ
                              ? "bg-[#7C8DBB] text-white border-[#7C8DBB] shadow-sm"
                              : "bg-[#F7F1E8]/50 text-[#2D2D2D]/80 border-[rgba(0,0,0,0.08)] hover:bg-[#F7F1E8]"
                          }`}
                        >
                          {occ}
                        </button>
                      ))}
                    </div>
                    {errors.occupation && (
                      <p className="mt-1.5 text-xs text-red-500 font-sans">{errors.occupation}</p>
                    )}
                  </div>
                </div>

                {/* Grid 3: Preferred Date & Preferred Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="preferredDate" className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#2D2D2D]/80 mb-2">
                      Preferred Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="preferredDate"
                      type="date"
                      value={formData.preferredDate}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => handleChange("preferredDate", e.target.value)}
                      className={`w-full px-4 py-3.5 rounded-2xl bg-[#F7F1E8]/50 border ${
                        errors.preferredDate ? "border-red-400 focus:ring-red-400" : "border-[rgba(0,0,0,0.08)] focus:ring-[#7C8DBB]"
                      } text-sm text-[#2D2D2D] focus:outline-none focus:ring-2 focus:bg-white transition-all`}
                    />
                    {errors.preferredDate && (
                      <p className="mt-1.5 text-xs text-red-500 font-sans">{errors.preferredDate}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="preferredTime" className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#2D2D2D]/80 mb-2">
                      Preferred Time Slot <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="preferredTime"
                      value={formData.preferredTime}
                      onChange={(e) => handleChange("preferredTime", e.target.value)}
                      className={`w-full px-4 py-3.5 rounded-2xl bg-[#F7F1E8]/50 border ${
                        errors.preferredTime ? "border-red-400 focus:ring-red-400" : "border-[rgba(0,0,0,0.08)] focus:ring-[#7C8DBB]"
                      } text-sm text-[#2D2D2D] focus:outline-none focus:ring-2 focus:bg-white transition-all`}
                    >
                      <option value="">Select a time slot</option>
                      <option value="10:00 AM - 12:00 PM">Morning (10:00 AM - 12:00 PM)</option>
                      <option value="12:00 PM - 03:00 PM">Afternoon (12:00 PM - 03:00 PM)</option>
                      <option value="03:00 PM - 06:00 PM">Evening (03:00 PM - 06:00 PM)</option>
                      <option value="06:00 PM - 08:00 PM">Night (06:00 PM - 08:00 PM)</option>
                    </select>
                    {errors.preferredTime && (
                      <p className="mt-1.5 text-xs text-red-500 font-sans">{errors.preferredTime}</p>
                    )}
                  </div>
                </div>

                {/* Grid 4: Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#2D2D2D]/80 mb-2">
                    Message <span className="text-xs text-[#2D2D2D]/40 font-normal lowercase">(optional)</span>
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Tell us any specific requirements or questions..."
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    className="w-full px-4 py-3.5 rounded-2xl bg-[#F7F1E8]/50 border border-[rgba(0,0,0,0.08)] focus:ring-[#7C8DBB] text-sm text-[#2D2D2D] placeholder-[#2D2D2D]/40 focus:outline-none focus:ring-2 focus:bg-white transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2 text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-10 py-4 rounded-full text-xs font-sans font-semibold uppercase tracking-widest text-white bg-[#7C8DBB] hover:bg-[#6B7CA9] active:scale-[0.99] transition-all shadow-lg shadow-[#7C8DBB]/25 disabled:opacity-60"
                  >
                    {isSubmitting ? "Scheduling..." : "Schedule My Visit"}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

export default memo(ScheduleVisitSection);
