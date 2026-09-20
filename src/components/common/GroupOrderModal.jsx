import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { CheckCircle2, Copy, Check, Users, Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const GroupOrderModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [created, setCreated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    organizerName: 'Alex Morgan',
    groupName: 'Friday Team Lunch',
    fulfillment: 'pickup',
    orderDate: 'Today',
    orderTime: '12:30 PM',
    deadline: '11:30 AM'
  });

  const mockShareUrl = `emberandoak.com/group/EO-G482`;

  const handleCreateGroup = (e) => {
    e.preventDefault();
    if (formData.organizerName) {
      setCreated(true);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://${mockShareUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleReset = () => {
    setCreated(false);
    onClose();
  };

  const handleGoToMenu = () => {
    handleReset();
    navigate('/menu');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={created ? handleReset : onClose}
      title={created ? "" : "Start a Group Order"}
      subtitle={created ? "" : "Everyone chooses their own meal. One organizer checks out."}
      maxWidth="max-w-lg"
    >
      {created ? (
        <div className="py-6 space-y-6 text-left">
          
          <div className="space-y-1 border-b border-[#DDD5C7] pb-4">
            <span className="text-xs font-semibold tracking-widest text-[#B95F3B] uppercase block">
              GROUP ORDER READY
            </span>
            <h3 className="font-serif-display text-2xl text-[#17382C]">
              {formData.groupName}
            </h3>
            <p className="text-xs text-[#716D66]">
              Organized by {formData.organizerName} • Closes at {formData.deadline}
            </p>
          </div>

          {/* Share Link Box */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#17382C] uppercase tracking-wider block">
              Share this link with your team:
            </label>
            <div className="flex items-center gap-2 bg-[#F7F3EA] p-2.5 rounded-xl border border-[#DDD5C7]">
              <span className="font-mono text-xs text-[#17382C] flex-1 truncate">
                {mockShareUrl}
              </span>
              <button
                type="button"
                onClick={handleCopyLink}
                className="px-3 py-1.5 rounded-lg bg-[#17382C] text-white text-xs font-semibold hover:bg-[#10291F] transition-colors flex items-center gap-1.5 shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#B95F3B]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>
          </div>

          {/* Group Members Progress */}
          <div className="bg-[#F7F3EA] p-4 rounded-xl border border-[#DDD5C7] space-y-3 text-xs">
            <div className="flex items-center justify-between font-semibold text-[#17382C]">
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#B95F3B]" />
                <span>4 Members Invited</span>
              </span>
              <span className="text-[#477A5B]">2 Meals Added</span>
            </div>

            <div className="space-y-2 pt-1 border-t border-[#DDD5C7]/70 text-xs">
              <div className="flex justify-between items-center">
                <span>Alex (Organizer)</span>
                <span className="text-[#477A5B] font-semibold">Order added</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Maya</span>
                <span className="text-[#477A5B] font-semibold">Order added</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Jordan</span>
                <span className="text-[#B95F3B] italic">Choosing items...</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Chris</span>
                <span className="text-[#716D66] opacity-70">Waiting</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <Button
              variant="primary"
              size="md"
              fullWidth
              onClick={handleGoToMenu}
              icon={ArrowRight}
              iconPosition="right"
            >
              BROWSE MENU & ADD YOUR MEAL
            </Button>
            <Button
              variant="outline"
              size="md"
              fullWidth
              onClick={handleReset}
            >
              Done
            </Button>
          </div>

        </div>
      ) : (
        <form onSubmit={handleCreateGroup} className="space-y-4 py-1 text-left">
          
          <div>
            <label className="block text-xs font-semibold text-[#17382C] uppercase tracking-wider mb-1">
              Organizer Name *
            </label>
            <input
              type="text"
              required
              value={formData.organizerName}
              onChange={(e) => setFormData({ ...formData, organizerName: e.target.value })}
              className="w-full p-2.5 bg-white border border-[#DDD5C7] rounded-sm text-base sm:text-xs text-[#22211F] focus:outline-none focus:border-[#17382C]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#17382C] uppercase tracking-wider mb-1">
              Group Order Name (Optional)
            </label>
            <input
              type="text"
              value={formData.groupName}
              onChange={(e) => setFormData({ ...formData, groupName: e.target.value })}
              placeholder="e.g. Friday Team Lunch"
              className="w-full p-2.5 bg-white border border-[#DDD5C7] rounded-sm text-base sm:text-xs text-[#22211F] focus:outline-none focus:border-[#17382C]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#17382C] uppercase tracking-wider mb-1">
                Order Date
              </label>
              <select
                value={formData.orderDate}
                onChange={(e) => setFormData({ ...formData, orderDate: e.target.value })}
                className="w-full p-2.5 bg-white border border-[#DDD5C7] rounded-sm text-base sm:text-xs text-[#22211F] focus:outline-none focus:border-[#17382C]"
              >
                <option value="Today">Today</option>
                <option value="Tomorrow">Tomorrow</option>
                <option value="Friday">This Friday</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#17382C] uppercase tracking-wider mb-1">
                Order Deadline
              </label>
              <select
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                className="w-full p-2.5 bg-white border border-[#DDD5C7] rounded-sm text-base sm:text-xs text-[#22211F] focus:outline-none focus:border-[#17382C]"
              >
                <option value="11:30 AM">11:30 AM</option>
                <option value="12:00 PM">12:00 PM</option>
                <option value="1:00 PM">1:00 PM</option>
                <option value="5:00 PM">5:00 PM</option>
              </select>
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              CREATE GROUP ORDER
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
