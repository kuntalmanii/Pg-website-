'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Phone, Calendar, CheckCircle2, Loader2 } from 'lucide-react';

interface ScheduleVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ScheduleVisitModal({ isOpen, onClose }: ScheduleVisitModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    occupancy: 'Boys',
    roomType: 'Single',
    visitDate: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  /* Prevent background scrolling when modal is open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  /* Handle Escape key */
  useEffect(() => {
    if (!isOpen) return;
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
    setIsSubmitting(true);

    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 1200));

    setIsSubmitting(false);
    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2500);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-[999]"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#FDFBF7] text-[#050505] rounded-3xl p-6 sm:p-8 shadow-2xl border border-black/10 z-[1000] custom-scrollbar"
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
                  {/* Full Name */}
                  <div>
                    <label className="block text-[10px] font-bold tracking-wider uppercase text-black/60 mb-1.5">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
                      <input
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
                    <label className="block text-[10px] font-bold tracking-wider uppercase text-black/60 mb-1.5">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        disabled={isSubmitting}
                        className="w-full bg-black/5 border border-black/10 rounded-xl pl-10 pr-4 py-3 text-sm text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-[#A7B7E7] transition-all"
                      />
                    </div>
                  </div>

                  {/* Occupancy Type */}
                  <div>
                    <label className="block text-[10px] font-bold tracking-wider uppercase text-black/60 mb-1.5">
                      Occupancy Type *
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Boys', 'Girls'].map((type) => (
                        <button
                          key={type}
                          type="button"
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
                  </div>

                  {/* Room Preference */}
                  <div>
                    <label className="block text-[10px] font-bold tracking-wider uppercase text-black/60 mb-1.5">
                      Room Preference *
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Single', 'Sharing'].map((room) => (
                        <button
                          key={room}
                          type="button"
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
                  </div>

                  {/* Preferred Visit Date */}
                  <div>
                    <label className="block text-[10px] font-bold tracking-wider uppercase text-black/60 mb-1.5">
                      Preferred Visit Date *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
                      <input
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
