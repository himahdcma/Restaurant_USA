import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { DiningModeSelector } from './DiningModeSelector';
import { CartItem } from './CartItem';
import { PriceSummary } from './PriceSummary';
import { Button } from '../common/Button';
import { menuItems } from '../../data/menuData';
import { X, ShoppingBag, ArrowRight, MapPin, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CartDrawer = () => {
  const {
    cart,
    cartOpen,
    setCartOpen,
    cartQuantityCount,
    cartSubtotal,
    taxAmount,
    deliveryFee,
    fulfillmentMode,
    selectedLocation,
    clearCart,
    addToCart
  } = useApp();

  const navigate = useNavigate();

  if (!cartOpen) return null;

  const total = cartSubtotal + taxAmount + (fulfillmentMode === 'delivery' ? deliveryFee : 0);

  // Recommended Upsell Dish (Lava Cake m_15 or Truffle Fries m_6)
  const upsellDish = menuItems.find(i => i.id === 'm_15') || menuItems[0];
  const isUpsellInCart = cart.some(ci => ci.item.id === upsellDish.id);

  const handleCheckout = () => {
    setCartOpen(false);
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setCartOpen(false)}
          className="fixed inset-0 bg-[#22211F]/60 backdrop-blur-xs"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className="w-screen max-w-md bg-[#F7F3EA] shadow-2xl border-l border-[#DDD5C7] flex flex-col justify-between"
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-[#DDD5C7] flex items-center justify-between bg-[#EFE9DD]/50">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#17382C] text-white">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif-display text-xl text-[#17382C]">
                    YOUR ORDER ({cartQuantityCount})
                  </h3>
                  <div className="flex items-center gap-1 text-[11px] text-[#716D66]">
                    <MapPin className="w-3 h-3 text-[#B95F3B]" />
                    <span>Pickup from {selectedLocation.name} • Ready in 20–30 min</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setCartOpen(false)}
                className="p-2 rounded-full text-[#716D66] hover:text-[#22211F] hover:bg-[#EFE9DD]"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Dining Mode Selector */}
            <div className="p-4 bg-[#F7F3EA] border-b border-[#DDD5C7]">
              <DiningModeSelector />
            </div>

            {/* Cart Items List or Empty State */}
            <div className="p-5 flex-1 overflow-y-auto custom-scrollbar space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#EFE9DD] flex items-center justify-center text-[#716D66]">
                    <ShoppingBag className="w-8 h-8 text-[#716D66]" />
                  </div>
                  <div>
                    <h4 className="font-serif-display text-2xl text-[#17382C]">
                      Your table is empty.
                    </h4>
                    <p className="text-xs text-[#716D66] max-w-xs mt-1 leading-relaxed">
                      Find something worth craving from our handcrafted wood-fired menu.
                    </p>
                  </div>
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => setCartOpen(false)}
                  >
                    BROWSE MENU
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-[#716D66]">
                    <span>Item Details</span>
                    <button
                      onClick={clearCart}
                      className="text-[11px] text-red-600 hover:underline"
                    >
                      Clear all
                    </button>
                  </div>
                  
                  <div className="divide-y divide-[#DDD5C7]/50">
                    {cart.map((cartItem) => (
                      <CartItem key={cartItem.cartId} cartItem={cartItem} />
                    ))}
                  </div>

                  {/* Restrained Upsell Add-on */}
                  {!isUpsellInCart && (
                    <div className="p-3.5 bg-[#EFE9DD]/60 border border-[#DDD5C7] flex items-center justify-between gap-3 mt-4">
                      <img
                        src={upsellDish.image}
                        alt={upsellDish.name}
                        className="w-12 h-12 rounded-none object-cover border border-[#DDD5C7]"
                      />
                      <div className="flex-1 min-w-0 text-xs">
                        <div className="text-[10px] text-[#B95F3B] font-bold uppercase tracking-wider">
                          COMPLETE YOUR ORDER
                        </div>
                        <div className="font-semibold text-[#17382C] truncate">{upsellDish.name}</div>
                        <div className="text-[#716D66]">${upsellDish.price.toFixed(2)}</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => addToCart(upsellDish, {}, 1, '')}
                        className="px-2.5 py-1.5 bg-[#17382C] text-white text-xs font-semibold hover:bg-[#B95F3B] transition-colors flex items-center gap-1 shrink-0"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>ADD</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {cart.length > 0 && (
              <div className="p-5 bg-[#EFE9DD]/60 border-t border-[#DDD5C7] space-y-4">
                <PriceSummary />

                <div className="space-y-2">
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    icon={ArrowRight}
                    iconPosition="right"
                    onClick={handleCheckout}
                  >
                    CHECKOUT — ${total.toFixed(2)}
                  </Button>

                  <button
                    type="button"
                    onClick={() => setCartOpen(false)}
                    className="w-full text-center text-xs text-[#716D66] hover:text-[#17382C] font-semibold py-1"
                  >
                    Continue Ordering
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
