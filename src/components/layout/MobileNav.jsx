import React from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { X, ShoppingBag, Award, Sparkles } from 'lucide-react';
import { Button } from '../common/Button';
import { Logo } from '../common/Logo';
import { motion, AnimatePresence } from 'framer-motion';

export const MobileNav = ({ isOpen, onClose }) => {
  const { cartQuantityCount, setCartOpen, setFinderOpen, fulfillmentMode, setFulfillmentMode, user } = useApp();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Menu', path: '/menu' },
    { label: 'Reservations', path: '/reservations' },
    { label: 'Catering & Groups', path: '/catering' },
    { label: 'Rewards Club', path: '/rewards' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#22211F]/60"
          />

          {/* Slide-out Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-[#F7F3EA] flex flex-col justify-between border-l border-[#DDD5C7] z-10 rounded-none"
          >
            {/* Header */}
            <div>
              <div className="p-5 border-b border-[#DDD5C7] flex items-center justify-between">
                <Logo variant="dark" />
                <button
                  onClick={onClose}
                  className="p-2 text-[#716D66] hover:text-[#22211F] transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Dining Mode Quick Switcher */}
              <div className="p-4 bg-[#EFE9DD]/60 border-b border-[#DDD5C7]">
                <span className="text-[11px] font-semibold text-[#716D66] uppercase tracking-widest block mb-2">
                  Fulfillment Mode
                </span>
                <div className="grid grid-cols-3 gap-1 p-1 bg-[#F7F3EA] border border-[#DDD5C7]">
                  {['pickup', 'delivery', 'dine-in'].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setFulfillmentMode(mode)}
                      className={`py-1.5 text-xs font-semibold uppercase tracking-wider capitalize transition-colors ${
                        fulfillmentMode === mode
                          ? 'bg-[#17382C] text-[#F7F3EA]'
                          : 'text-[#716D66] hover:text-[#22211F]'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="p-5 space-y-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `block px-4 py-3 text-sm font-semibold uppercase tracking-widest transition-colors ${
                        isActive
                          ? 'bg-[#17382C] text-[#F7F3EA]'
                          : 'text-[#22211F] hover:bg-[#EFE9DD]'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>

              {/* Smart Food Finder Trigger */}
              <div className="px-5">
                <button
                  onClick={() => {
                    onClose();
                    setFinderOpen(true);
                  }}
                  className="w-full p-4 bg-[#17382C] text-[#F7F3EA] border border-[#10291F] flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-4 h-4 text-[#B95F3B]" />
                    <div className="text-left">
                      <div className="font-semibold text-xs uppercase tracking-wider">Smart Food Finder</div>
                      <div className="text-[11px] text-[#DDD5C7]">Find your perfect dish match</div>
                    </div>
                  </div>
                  <span className="text-[10px] bg-[#B95F3B] text-white px-2 py-0.5 font-semibold uppercase tracking-wider">Try Now</span>
                </button>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="p-5 border-t border-[#DDD5C7] bg-[#EFE9DD]/30 space-y-4">
              {/* Rewards User Info */}
              <div className="flex items-center justify-between text-xs text-[#716D66] bg-[#F7F3EA] p-3 border border-[#DDD5C7]">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#B95F3B]" />
                  <span className="uppercase font-medium tracking-wide">{user.name} ({user.tier})</span>
                </div>
                <span className="font-bold text-[#17382C]">{user.points} pts</span>
              </div>

              {/* Cart Button */}
              <Button
                variant="primary"
                fullWidth
                size="md"
                icon={ShoppingBag}
                onClick={() => {
                  onClose();
                  setCartOpen(true);
                }}
              >
                View Cart ({cartQuantityCount})
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
