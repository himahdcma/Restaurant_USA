import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Toast = () => {
  const { toast, setCartOpen } = useApp();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-[#477A5B] shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />,
    info: <Info className="w-5 h-5 text-[#B95F3B] shrink-0" />
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.25 }}
        className="fixed bottom-6 right-6 z-50 max-w-md bg-[#10291F] text-white px-4 py-3.5 rounded-2xl shadow-xl border border-[#17382C] flex items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          {icons[toast.type] || icons.success}
          <p className="text-xs sm:text-sm font-medium text-[#F7F3EA]">{toast.message}</p>
        </div>

        <button
          onClick={() => setCartOpen(true)}
          className="text-xs font-bold text-[#B95F3B] hover:text-white bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-lg shrink-0 transition-colors uppercase tracking-wider flex items-center gap-1"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>View Cart</span>
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
