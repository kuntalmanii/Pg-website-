'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Phone, Calendar, CheckCircle2, Loader2 } from 'lucide-react';

interface ScheduleVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PHONE_REGEX = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;

const sanitizeInput = (str: string): string => {
  return str.replace(/<[^>]*>?/gm, '').trim();
};

export default function ScheduleVisitModal({ isOpen, onClose }: ScheduleVisitModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    occupancy: 'Boys',
    roomType: 'Single',
    visitDate: '',
  });

  const [honeypot, setHoneypot] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  /* Prevent background scrolling when modal is open */
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = isOpen ? 'hidden' : '';
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
          visitDate: '',
        });
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Rate Limiting Guard: Prevent double-click or rapid re-submission
    if (isSubmitting) return;

    // 2. Honeypot Check: Silently reject automated bot submissions
    if (honeypot.trim() !== '') {
      return;
    }

    // 3. Input Sanitization & Validation
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
      // Construct formatted WhatsApp lead message
      const targetWhatsAppNumber = "918882813740"; // Luxspace PG WhatsApp contact
      const messageText = `Hi Luxspace PG! I would like to schedule a visit.

*Name:* ${sanitizedName}
*Phone:* ${sanitizedPhone}
*Occupancy:* ${formData.occupancy}
*Room Type:* ${formData.roomType} Room
*Preferred Date:* ${formData.visitDate || 'Not specified'}`;

      const whatsappUrl = `https://wa.me/${targetWhatsAppNumber}?text=${encodeURIComponent(messageText)}`;

      // Open WhatsApp pre-filled chat in a new secure window
      if (typeof window !== 'undefined') {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      }

      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2500);
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

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
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#FDFBF7] text-[#050505] rounded-3xl p-6 sm:p-8 shadow-2xl border border-black/10 z-50 custom-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              type="button"
              className="absolute top-6 right-6 p-2 rounded-full bg-black/5 hover:bg-black/10 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-black/70" />
            </button>

            {isSuccess ? (
              <div className="py-12 text-center space-y-4">
                <div className="inline-flex p-4 rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-[#050505]">Visit Scheduled!</h3>
                <p className="text-black/60 max-w-xs mx-auto text-sm">
                  We&apos;ve received your details for Luxspace PG, Sector 126. Our team will call you shortly to confirm.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <span className="text-[11px] font-bold tracking-widest uppercase text-[#0050FF]">LUXSPACE PG</span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 text-[#050505]">Schedule a Visit</h2>
                  <p className="text-xs sm:text-sm text-black/60 mt-1">We&apos;ll confirm your slot within 2 hours.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Honeypot Field for Bot Spam Prevention */}
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
                    <label htmlFor="fullName" className="block text-[10px] font-bold tracking-wider uppercase text-black/60 mb-1.5 cursor-pointer">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
                      <input
                        id="fullName"
                        type="text"
                        required
                        placeholder="e.g. Arjun Mehra"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        disabled={isSubmitting}
                        className="w-full bg-black/5 border border-black/10 rounded-xl pl-10 pr-4 py-3 text-sm text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-[#A7B7E7] transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label htmlFor="phone" className="block text-[10px] font-bold tracking-wider uppercase text-black/60 mb-1.5 cursor-pointer">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
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
                        className={`w-full bg-black/5 border ${
                          phoneError ? 'border-red-500 focus:ring-red-400' : 'border-black/10 focus:ring-[#A7B7E7]'
                        } rounded-xl pl-10 pr-4 py-3 text-sm text-black placeholder:text-black/30 focus:outline-none focus:ring-2 transition-all`}
                      />
                    </div>
                    {phoneError && (
                      <p className="mt-1 text-xs text-red-500 font-medium">{phoneError}</p>
                    )}
                  </div>

                  {/* Occupancy Type */}
                  <fieldset>
                    <legend className="block text-[10px] font-bold tracking-wider uppercase text-black/60 mb-1.5">
                      Occupancy Type *
                    </legend>
                    <div className="grid grid-cols-2 gap-2">
                      {['Boys', 'Girls'].map((type) => (
                        <button
                          key={type}
                          type="button"
                          aria-pressed={formData.occupancy === type}
                          aria-label={`Select ${type} occupancy`}
                          onClick={() => setFormData({ ...formData, occupancy: type })}
                          className={`py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                            formData.occupancy === type
                              ? 'bg-[#A7B7E7] border-[#A7B7E7] text-[#050505] shadow-sm'
                              : 'bg-black/5 border-black/10 text-black/60 hover:bg-black/10'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  {/* Room Preference */}
                  <fieldset>
                    <legend className="block text-[10px] font-bold tracking-wider uppercase text-black/60 mb-1.5">
                      Room Preference *
                    </legend>
                    <div className="grid grid-cols-2 gap-2">
                      {['Single', 'Sharing'].map((room) => (
                        <button
                          key={room}
                          type="button"
                          aria-pressed={formData.roomType === room}
                          aria-label={`Select ${room} room`}
                          onClick={() => setFormData({ ...formData, roomType: room })}
                          className={`py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                            formData.roomType === room
                              ? 'bg-[#A7B7E7] border-[#A7B7E7] text-[#050505] shadow-sm'
                              : 'bg-black/5 border-black/10 text-black/60 hover:bg-black/10'
                          }`}
                        >
                          {room} Room
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  {/* Preferred Visit Date */}
                  <div>
                    <label htmlFor="visitDate" className="block text-[10px] font-bold tracking-wider uppercase text-black/60 mb-1.5 cursor-pointer">
                      Preferred Visit Date *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
                      <input
                        id="visitDate"
                        type="date"
                        required
                        min={today}
                        value={formData.visitDate}
                        onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                        disabled={isSubmitting}
                        className="w-full bg-black/5 border border-black/10 rounded-xl pl-10 pr-4 py-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#A7B7E7] transition-all cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl text-sm font-bold bg-[#A7B7E7] text-[#050505] hover:bg-[#96a8e0] active:scale-[0.99] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#050505]" />
                        <span>Scheduling Visit...</span>
                      </>
                    ) : (
                      <span>Confirm Visit Request</span>
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
