'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Phone, Calendar, Clock, CheckCircle2, Loader2, Sparkles, ArrowRight } from 'lucide-react';

interface ScheduleVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PHONE_REGEX = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;

const TIME_SLOTS = [
  { id: 'morning', label: '10:00 AM – 12:00 PM', short: 'Morning' },
  { id: 'afternoon', label: '02:00 PM – 04:00 PM', short: 'Afternoon' },
  { id: 'evening', label: '05:00 PM – 07:00 PM', short: 'Evening' },
];

const sanitizeInput = (str: string): string => {
  return str.replace(/<[^>]*>?/gm, '').trim();
};

/* Format local date YYYY-MM-DD */
const formatLocalDate = (d: Date): string => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function ScheduleVisitModal({ isOpen, onClose }: ScheduleVisitModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    occupancy: 'Boys',
    roomType: 'Single',
    visitDate: formatLocalDate(new Date()),
    visitTime: '10:00 AM – 12:00 PM',
  });

  const [honeypot, setHoneypot] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const firstInputRef = useRef<HTMLInputElement>(null);

  /* Quick Date Preset Helper */
  const setPresetDate = (type: 'today' | 'tomorrow' | 'saturday' | 'sunday') => {
    const d = new Date();
    if (type === 'tomorrow') {
      d.setDate(d.getDate() + 1);
    } else if (type === 'saturday' || type === 'sunday') {
      const day = d.getDay();
      const targetDay = type === 'saturday' ? 6 : 0;
      let diff = targetDay - day;
      if (diff <= 0) diff += 7;
      d.setDate(d.getDate() + diff);
    }
    setFormData((prev) => ({ ...prev, visitDate: formatLocalDate(d) }));
  };

  /* Auto-focus first input when modal opens & prevent background scroll */
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }
    if (isOpen) {
      setTimeout(() => {
        firstInputRef.current?.focus();
      }, 100);
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
      }
    };
  }, [isOpen]);

  /* Handle Escape key */
  useEffect(() => {
    if (!isOpen || typeof window === 'undefined') return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  /* Reset form state after modal closes */
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setIsSuccess(false);
        setIsSubmitting(false);
        setPhoneError('');
        setHoneypot('');
        setFormData({
          fullName: '',
          phone: '',
          occupancy: 'Boys',
          roomType: 'Single',
          visitDate: formatLocalDate(new Date()),
          visitTime: '10:00 AM – 12:00 PM',
        });
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (honeypot.trim() !== '') {
      return;
    }

    const sanitizedName = sanitizeInput(formData.fullName);
    const sanitizedPhone = sanitizeInput(formData.phone);

    if (!sanitizedName) return;

    const digitsOnly = sanitizedPhone.replace(/\D/g, '');
    if (!PHONE_REGEX.test(sanitizedPhone) || digitsOnly.length < 7) {
      setPhoneError('Please enter a valid phone number.');
      return;
    }

    setPhoneError('');
    setIsSubmitting(true);

    try {
      const targetWhatsAppNumber = "918882813740";
      const messageText = `Hi Luxspace PG! I would like to schedule a private visit.

*Name:* ${sanitizedName}
*Phone:* ${sanitizedPhone}
*Occupancy:* ${formData.occupancy}
*Room Type:* ${formData.roomType} Room
*Preferred Date:* ${formData.visitDate}
*Preferred Time Slot:* ${formData.visitTime}`;

      const whatsappUrl = `https://wa.me/${targetWhatsAppNumber}?text=${encodeURIComponent(messageText)}`;

      if (typeof window !== 'undefined') {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      }

      await new Promise((resolve) => setTimeout(resolve, 750));
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = formatLocalDate(new Date());

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#1C1A18]/75 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="schedule-modal-title"
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 24 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#FAF6F0] text-[#24211E] rounded-3xl p-7 sm:p-9 md:p-10 shadow-[0_32px_80px_rgba(28,26,24,0.24)] custom-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              type="button"
              className="absolute top-6 right-6 p-2.5 rounded-full bg-[#24211E]/5 hover:bg-[#24211E]/10 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B886]"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-[#24211E]/70" />
            </button>

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="py-10 text-center space-y-5"
              >
                {/* Animated Green Checkmark Ring */}
                <div className="relative inline-flex items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0.1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full bg-[#D4B886]/30"
                  />
                  <div className="relative p-4 rounded-full bg-[#D4B886]/20 text-[#D4B886]">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-mono font-medium tracking-[0.2em] uppercase text-[#D4B886]">
                    REQUEST CONFIRMED
                  </span>
                  <h3 className="text-2xl font-bold tracking-tight text-[#24211E] mt-1">
                    Visit Request Sent!
                  </h3>
                  <p className="text-[#736B63] max-w-xs mx-auto text-xs sm:text-sm font-normal leading-relaxed mt-2">
                    We&apos;ve prepared your pre-filled details for Luxspace PG, Sector 126. Our concierge team will reach out shortly.
                  </p>
                </div>

                {/* Instant Booking Summary Card */}
                <div className="p-4 rounded-2xl bg-[#24211E]/5 border border-[#24211E]/8 text-left space-y-2 max-w-sm mx-auto text-xs">
                  <div className="flex justify-between items-center text-[#736B63]">
                    <span>Visitor Name</span>
                    <span className="font-semibold text-[#24211E]">{formData.fullName}</span>
                  </div>
                  <div className="flex justify-between items-center text-[#736B63]">
                    <span>Preferred Date</span>
                    <span className="font-semibold text-[#24211E]">{formData.visitDate}</span>
                  </div>
                  <div className="flex justify-between items-center text-[#736B63]">
                    <span>Time Slot</span>
                    <span className="font-semibold text-[#D4B886]">{formData.visitTime}</span>
                  </div>
                  <div className="flex justify-between items-center text-[#736B63]">
                    <span>Room Preference</span>
                    <span className="font-semibold text-[#24211E]">{formData.occupancy} ({formData.roomType})</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="mt-4 px-8 py-3.5 rounded-full text-xs font-semibold bg-[#24211E] text-[#F7F4EF] hover:bg-[#1C1A18] transition-all cursor-pointer"
                >
                  Done & Close
                </button>
              </motion.div>
            ) : (
              <>
                <div className="mb-6">
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium tracking-[0.18em] uppercase text-[#D4B886]">
                    <Sparkles size={12} />
                    LUXSPACE RESIDENCES
                  </span>
                  <h2 id="schedule-modal-title" className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mt-1 text-[#24211E]">
                    Schedule a Private Visit
                  </h2>
                  <p className="text-xs sm:text-sm text-[#736B63] font-normal mt-1">
                    Select your date, preferred time slot, and room choice.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Honeypot Field */}
                  <input
                    type="text"
                    name="website"
                    id="website-hp"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-[10px] font-mono font-medium tracking-[0.14em] uppercase text-[#736B63] mb-1.5 cursor-pointer">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#736B63]/60" />
                      <input
                        ref={firstInputRef}
                        id="fullName"
                        type="text"
                        required
                        placeholder="e.g. Arjun Mehra"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        disabled={isSubmitting}
                        className="w-full bg-[#24211E]/5 rounded-2xl pl-11 pr-4 py-3 text-sm font-normal text-[#24211E] placeholder:text-[#736B63]/40 focus:outline-none focus:ring-2 focus:ring-[#D4B886] transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label htmlFor="phone" className="block text-[10px] font-mono font-medium tracking-[0.14em] uppercase text-[#736B63] mb-1.5 cursor-pointer">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#736B63]/60" />
                      <input
                        id="phone"
                        type="tel"
                        required
                        placeholder="+91 88828 13740"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (phoneError) setPhoneError('');
                        }}
                        disabled={isSubmitting}
                        className={`w-full bg-[#24211E]/5 ${phoneError ? 'focus:ring-red-400' : 'focus:ring-[#D4B886]'
                          } rounded-2xl pl-11 pr-4 py-3 text-sm font-normal text-[#24211E] placeholder:text-[#736B63]/40 focus:outline-none focus:ring-2 transition-all`}
                      />
                    </div>
                    {phoneError && (
                      <p className="mt-1.5 text-xs text-red-500 font-medium">{phoneError}</p>
                    )}
                  </div>

                  {/* Occupancy & Room Type Row */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* Occupancy Type */}
                    <div>
                      <label className="block text-[10px] font-mono font-medium tracking-[0.14em] uppercase text-[#736B63] mb-1.5">
                        Occupancy *
                      </label>
                      <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#24211E]/5 rounded-2xl">
                        {['Boys', 'Girls'].map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setFormData({ ...formData, occupancy: type })}
                            className={`py-2 rounded-xl text-xs font-medium transition-all ${
                              formData.occupancy === type
                                ? 'bg-[#D4B886] text-[#1C1A18] shadow-sm font-semibold'
                                : 'text-[#736B63] hover:text-[#24211E]'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Room Preference */}
                    <div>
                      <label className="block text-[10px] font-mono font-medium tracking-[0.14em] uppercase text-[#736B63] mb-1.5">
                        Room *
                      </label>
                      <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#24211E]/5 rounded-2xl">
                        {['Single', 'Sharing'].map((room) => (
                          <button
                            key={room}
                            type="button"
                            onClick={() => setFormData({ ...formData, roomType: room })}
                            className={`py-2 rounded-xl text-xs font-medium transition-all ${
                              formData.roomType === room
                                ? 'bg-[#D4B886] text-[#1C1A18] shadow-sm font-semibold'
                                : 'text-[#736B63] hover:text-[#24211E]'
                            }`}
                          >
                            {room}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Preferred Date & Quick Presets */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label htmlFor="visitDate" className="text-[10px] font-mono font-medium tracking-[0.14em] uppercase text-[#736B63] cursor-pointer">
                        Preferred Date *
                      </label>
                      {/* Date Presets */}
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setPresetDate('today')}
                          className="px-2 py-0.5 text-[9px] font-mono font-medium rounded-full bg-[#24211E]/5 text-[#736B63] hover:bg-[#D4B886]/20 hover:text-[#24211E] transition-all"
                        >
                          Today
                        </button>
                        <button
                          type="button"
                          onClick={() => setPresetDate('tomorrow')}
                          className="px-2 py-0.5 text-[9px] font-mono font-medium rounded-full bg-[#24211E]/5 text-[#736B63] hover:bg-[#D4B886]/20 hover:text-[#24211E] transition-all"
                        >
                          Tomorrow
                        </button>
                        <button
                          type="button"
                          onClick={() => setPresetDate('saturday')}
                          className="px-2 py-0.5 text-[9px] font-mono font-medium rounded-full bg-[#24211E]/5 text-[#736B63] hover:bg-[#D4B886]/20 hover:text-[#24211E] transition-all"
                        >
                          Sat
                        </button>
                      </div>
                    </div>

                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#736B63]/60" />
                      <input
                        id="visitDate"
                        type="date"
                        required
                        min={today}
                        value={formData.visitDate}
                        onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                        disabled={isSubmitting}
                        className="w-full bg-[#24211E]/5 rounded-2xl pl-11 pr-4 py-3 text-sm font-normal text-[#24211E] focus:outline-none focus:ring-2 focus:ring-[#D4B886] transition-all cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Preferred Time Slot */}
                  <div>
                    <label className="block text-[10px] font-mono font-medium tracking-[0.14em] uppercase text-[#736B63] mb-1.5">
                      Preferred Time Slot *
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {TIME_SLOTS.map((slot) => {
                        const isSelected = formData.visitTime === slot.label;
                        return (
                          <button
                            key={slot.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, visitTime: slot.label })}
                            className={`py-2.5 px-2 rounded-2xl text-[11px] font-medium flex flex-col items-center gap-0.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B886] ${
                              isSelected
                                ? 'bg-[#D4B886] text-[#1C1A18] font-semibold shadow-[0_4px_16px_rgba(212,184,134,0.35)]'
                                : 'bg-[#24211E]/5 text-[#736B63] hover:bg-[#24211E]/10 hover:text-[#24211E]'
                            }`}
                          >
                            <Clock size={12} className={isSelected ? 'text-[#1C1A18]' : 'text-[#736B63]'} />
                            <span>{slot.short}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-full text-xs sm:text-sm font-semibold tracking-[0.02em] bg-[#D4B886] text-[#1C1A18] hover:bg-[#C5A059] active:scale-[0.99] transition-all duration-200 shadow-[0_8px_30px_rgba(212,184,134,0.4)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B886]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#1C1A18]" />
                        <span>Confirming Visit Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Confirm Visit Request</span>
                        <ArrowRight size={15} />
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
