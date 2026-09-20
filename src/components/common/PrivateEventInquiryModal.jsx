import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { Calendar, Users, Heart, CheckCircle2, Sparkles } from 'lucide-react';

export const PrivateEventInquiryModal = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: 'Rehearsal Dinner',
    preferredDate: '',
    guestCount: '25-50 Guests',
    message: ''
  });

  const eventTypes = [
    'Rehearsal Dinner',
    'Engagement Dinner',
    'Intimate Reception',
    'Bridal Celebration',
    'Corporate & Private Dining'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      eventType: 'Rehearsal Dinner',
      preferredDate: '',
      guestCount: '25-50 Guests',
      message: ''
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={submitted ? handleReset : onClose}
      title={submitted ? "" : "Plan Your Event at Ember & Oak"}
      subtitle={submitted ? "" : "Wedding dinners, rehearsal celebrations & private receptions in SoHo"}
      maxWidth="max-w-xl"
    >
      {submitted ? (
        <div className="py-8 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-[#17382C] text-[#F7F3EA] flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-8 h-8 text-[#477A5B]" />
          </div>
          <h3 className="font-serif-display text-3xl text-[#17382C]">
            Thank you, {formData.name}.
          </h3>
          <p className="text-sm text-[#716D66] max-w-md mx-auto font-sans leading-relaxed">
            Our private dining & events team will be in touch within 24 hours to help craft your celebration at Ember & Oak.
          </p>
          <div className="pt-4">
            <Button variant="primary" size="md" onClick={handleReset}>
              Done
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 py-1">
          {/* Form Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#17382C] uppercase tracking-wider mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Sarah Jenkins"
                className="w-full p-2.5 bg-white border border-[#DDD5C7] rounded-sm text-base sm:text-xs text-[#22211F] focus:outline-none focus:border-[#B95F3B]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#17382C] uppercase tracking-wider mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="sarah@example.com"
                className="w-full p-2.5 bg-white border border-[#DDD5C7] rounded-sm text-base sm:text-xs text-[#22211F] focus:outline-none focus:border-[#B95F3B]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#17382C] uppercase tracking-wider mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="(212) 555-0199"
                className="w-full p-2.5 bg-white border border-[#DDD5C7] rounded-sm text-base sm:text-xs text-[#22211F] focus:outline-none focus:border-[#B95F3B]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#17382C] uppercase tracking-wider mb-1">
                Occasion / Event Type
              </label>
              <select
                value={formData.eventType}
                onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                className="w-full p-2.5 bg-white border border-[#DDD5C7] rounded-sm text-base sm:text-xs text-[#22211F] focus:outline-none focus:border-[#B95F3B]"
              >
                {eventTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#17382C] uppercase tracking-wider mb-1">
                Preferred Date
              </label>
              <input
                type="date"
                value={formData.preferredDate}
                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                className="w-full p-2.5 bg-white border border-[#DDD5C7] rounded-sm text-base sm:text-xs text-[#22211F] focus:outline-none focus:border-[#B95F3B]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#17382C] uppercase tracking-wider mb-1">
                Estimated Guest Count
              </label>
              <select
                value={formData.guestCount}
                onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                className="w-full p-2.5 bg-white border border-[#DDD5C7] rounded-sm text-base sm:text-xs text-[#22211F] focus:outline-none focus:border-[#B95F3B]"
              >
                <option value="10-20 Guests">10 – 20 Guests</option>
                <option value="25-50 Guests">25 – 50 Guests</option>
                <option value="50-80 Guests">50 – 80 Guests</option>
                <option value="80+ Full Buyout">80+ Guests (Full Buyout)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#17382C] uppercase tracking-wider mb-1">
              Event Details & Notes
            </label>
            <textarea
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us about your celebration, timing, dietary requests, or aesthetic preferences..."
              className="w-full p-2.5 bg-white border border-[#DDD5C7] rounded-sm text-base sm:text-xs text-[#22211F] focus:outline-none focus:border-[#B95F3B] placeholder-[#716D66]/60"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              REQUEST EVENT DETAILS
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
