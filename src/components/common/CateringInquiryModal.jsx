import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { CheckCircle2, ShoppingBag, Truck } from 'lucide-react';

export const CateringInquiryModal = ({ isOpen, onClose, selectedPackage = null }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    eventDate: '',
    guestCount: selectedPackage?.serves || '10-15 Guests',
    packageName: selectedPackage?.title || 'The Gathering',
    fulfillment: 'pickup',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={submitted ? handleReset : onClose}
      title={submitted ? "" : "Request Ember & Oak Catering"}
      subtitle={submitted ? "" : "Shared platters & package catering for meetings & celebrations"}
      maxWidth="max-w-xl"
    >
      {submitted ? (
        <div className="py-8 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-[#17382C] text-[#F7F3EA] flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-8 h-8 text-[#477A5B]" />
          </div>
          <h3 className="font-serif-display text-3xl text-[#17382C]">
            Thanks, {formData.name}.
          </h3>
          <p className="text-sm text-[#716D66] max-w-md mx-auto leading-relaxed">
            Our catering team will be in touch to confirm your order details and event schedule for {formData.packageName}.
          </p>
          <div className="pt-4">
            <Button variant="primary" size="md" onClick={handleReset}>
              Done
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 py-1 text-left">
          
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
                placeholder="Alex Morgan"
                className="w-full p-2.5 bg-white border border-[#DDD5C7] rounded-sm text-base sm:text-xs text-[#22211F] focus:outline-none focus:border-[#17382C]"
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
                placeholder="alex@example.com"
                className="w-full p-2.5 bg-white border border-[#DDD5C7] rounded-sm text-base sm:text-xs text-[#22211F] focus:outline-none focus:border-[#17382C]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#17382C] uppercase tracking-wider mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="(212) 555-0184"
                className="w-full p-2.5 bg-white border border-[#DDD5C7] rounded-sm text-base sm:text-xs text-[#22211F] focus:outline-none focus:border-[#17382C]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#17382C] uppercase tracking-wider mb-1">
                Company / Organization (Optional)
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Acme Corp"
                className="w-full p-2.5 bg-white border border-[#DDD5C7] rounded-sm text-base sm:text-xs text-[#22211F] focus:outline-none focus:border-[#17382C]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#17382C] uppercase tracking-wider mb-1">
                Event Date *
              </label>
              <input
                type="date"
                required
                value={formData.eventDate}
                onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                className="w-full p-2.5 bg-white border border-[#DDD5C7] rounded-sm text-base sm:text-xs text-[#22211F] focus:outline-none focus:border-[#17382C]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#17382C] uppercase tracking-wider mb-1">
                Catering Package
              </label>
              <select
                value={formData.packageName}
                onChange={(e) => setFormData({ ...formData, packageName: e.target.value })}
                className="w-full p-2.5 bg-white border border-[#DDD5C7] rounded-sm text-base sm:text-xs text-[#22211F] focus:outline-none focus:border-[#17382C]"
              >
                <option value="The Team Lunch">The Team Lunch (6–8 guests)</option>
                <option value="The Gathering">The Gathering (10–12 guests)</option>
                <option value="The Full Table">The Full Table (15–20 guests)</option>
                <option value="Custom Catering">Custom Catering Package</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#17382C] uppercase tracking-wider mb-1">
              Fulfillment Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, fulfillment: 'pickup' })}
                className={`p-2.5 rounded-sm border text-xs font-medium flex items-center justify-center gap-2 ${
                  formData.fulfillment === 'pickup'
                    ? 'bg-[#17382C] text-white border-[#17382C]'
                    : 'bg-white text-[#22211F] border-[#DDD5C7]'
                }`}
              >
                <ShoppingBag className="w-4 h-4" /> Pickup from SoHo
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, fulfillment: 'delivery' })}
                className={`p-2.5 rounded-sm border text-xs font-medium flex items-center justify-center gap-2 ${
                  formData.fulfillment === 'delivery'
                    ? 'bg-[#17382C] text-white border-[#17382C]'
                    : 'bg-white text-[#22211F] border-[#DDD5C7]'
                }`}
              >
                <Truck className="w-4 h-4" /> Local Delivery
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#17382C] uppercase tracking-wider mb-1">
              Special Requests or Dietary Notes
            </label>
            <textarea
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Tell us about specific dish choices, dietary needs, or delivery timing..."
              className="w-full p-2.5 bg-white border border-[#DDD5C7] rounded-sm text-base sm:text-xs text-[#22211F] focus:outline-none focus:border-[#17382C]"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              REQUEST CATERING
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
