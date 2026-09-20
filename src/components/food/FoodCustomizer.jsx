import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Check, Star, AlertCircle, Plus } from 'lucide-react';
import { QuantitySelector } from '../common/QuantitySelector';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { motion, AnimatePresence } from 'framer-motion';

export const FoodCustomizer = () => {
  const { customizingItem, setCustomizingItem, addToCart } = useApp();

  const [quantity, setQuantity] = useState(1);
  const [selectedPatty, setSelectedPatty] = useState(null);
  const [selectedCheese, setSelectedCheese] = useState(null);
  const [selectedBase, setSelectedBase] = useState(null);
  const [selectedProtein, setSelectedProtein] = useState(null);
  const [selectedDoneness, setSelectedDoneness] = useState(null);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [removedIngredients, setRemovedIngredients] = useState([]);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [addedPairing, setAddedPairing] = useState(null);

  // Reset local state when a new item opens
  useEffect(() => {
    if (customizingItem) {
      setQuantity(1);
      setSpecialInstructions('');
      setSelectedExtras([]);
      setRemovedIngredients([]);
      setAddedPairing(null);

      const opts = customizingItem.customizationOptions || {};
      
      if (opts.patties && opts.patties.length > 0) {
        setSelectedPatty(opts.patties[0]);
      } else {
        setSelectedPatty(null);
      }

      if (opts.cheeses && opts.cheeses.length > 0) {
        setSelectedCheese(opts.cheeses[0]);
      } else {
        setSelectedCheese(null);
      }

      if (opts.base && opts.base.length > 0) {
        setSelectedBase(opts.base[0]);
      } else {
        setSelectedBase(null);
      }

      if (opts.protein && opts.protein.length > 0) {
        setSelectedProtein(opts.protein[0]);
      } else {
        setSelectedProtein(null);
      }

      if (opts.doneness && opts.doneness.length > 0) {
        setSelectedDoneness(opts.doneness[0]);
      } else {
        setSelectedDoneness(null);
      }
    }
  }, [customizingItem]);

  if (!customizingItem) return null;

  const opts = customizingItem.customizationOptions || {};

  // Calculate dynamic price per single unit
  const computeUnitPrice = () => {
    let price = customizingItem.price;
    if (selectedPatty?.priceOffset) price += selectedPatty.priceOffset;
    if (selectedCheese?.priceOffset) price += selectedCheese.priceOffset;
    if (selectedBase?.priceOffset) price += selectedBase.priceOffset;
    if (selectedProtein?.priceOffset) price += selectedProtein.priceOffset;
    if (selectedDoneness?.priceOffset) price += selectedDoneness.priceOffset;
    
    selectedExtras.forEach(ex => {
      price += ex.price || 0;
    });

    if (addedPairing) {
      price += addedPairing.price;
    }

    return price;
  };

  const unitPrice = computeUnitPrice();
  const totalPrice = unitPrice * quantity;

  const toggleExtra = (extra) => {
    setSelectedExtras(prev => {
      const exists = prev.some(e => e.id === extra.id);
      if (exists) {
        return prev.filter(e => e.id !== extra.id);
      } else {
        return [...prev, extra];
      }
    });
  };

  const toggleRemoval = (ingredient) => {
    setRemovedIngredients(prev => {
      if (prev.includes(ingredient)) {
        return prev.filter(i => i !== ingredient);
      } else {
        return [...prev, ingredient];
      }
    });
  };

  const handleAddToCart = () => {
    const selectedOptions = {
      patty: selectedPatty,
      cheese: selectedCheese,
      base: selectedBase,
      protein: selectedProtein,
      doneness: selectedDoneness,
      extras: addedPairing ? [...selectedExtras, addedPairing] : selectedExtras,
      removals: removedIngredients
    };

    addToCart(customizingItem, selectedOptions, quantity, specialInstructions);
    setCustomizingItem(null);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setCustomizingItem(null)}
          className="fixed inset-0 bg-[#22211F]/70 backdrop-blur-xs"
        />

        {/* Customizer Large Desktop Modal / Mobile Sheet */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 240 }}
          className="relative w-full max-w-4xl max-h-[92vh] sm:max-h-[85vh] bg-[#F7F3EA] rounded-none sm:rounded-sm shadow-2xl border border-[#DDD5C7] overflow-hidden flex flex-col z-10"
        >
          {/* Header Close Button */}
          <button
            onClick={() => setCustomizingItem(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-[#22211F]/60 text-white hover:bg-[#22211F] transition-colors z-20"
            aria-label="Close customizer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Desktop Asymmetric Split (Left ~45% Image, Right ~55% Content) */}
          <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
            
            {/* LEFT: Large Food Photo */}
            <div className="md:col-span-5 relative bg-[#10291F] min-h-[200px] md:min-h-full">
              <img
                src={customizingItem.image}
                alt={customizingItem.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#10291F]/90 via-transparent to-transparent md:hidden" />
              
              <div className="absolute bottom-4 left-4 right-4 text-white md:hidden">
                <h3 className="font-serif-display text-2xl text-white">
                  {customizingItem.name}
                </h3>
                <p className="text-xs text-[#EFE9DD]/90 line-clamp-1">
                  ${customizingItem.price.toFixed(2)} • {customizingItem.calories} cal
                </p>
              </div>
            </div>

            {/* RIGHT: Scrollable Customization Content */}
            <div className="md:col-span-7 flex flex-col overflow-hidden bg-[#F7F3EA]">
              
              {/* Dish Header Info (Desktop) */}
              <div className="hidden md:block p-6 pb-4 border-b border-[#DDD5C7]">
                <div className="flex items-center gap-2 mb-1.5">
                  {customizingItem.badges && customizingItem.badges.map((b, idx) => (
                    <Badge key={idx}>{b}</Badge>
                  ))}
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-serif-display text-3xl text-[#17382C]">
                      {customizingItem.name}
                    </h2>
                    <p className="text-xs text-[#716D66] mt-1 leading-relaxed max-w-md">
                      {customizingItem.description}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-2xl font-bold text-[#17382C] block">
                      ${customizingItem.price.toFixed(2)}
                    </span>
                    {customizingItem.calories && (
                      <span className="text-xs text-[#716D66] font-medium block">
                        {customizingItem.calories} cal
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Scrollable Options List */}
              <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">

                {/* REQUIRED: Patty Choice */}
                {opts.patties && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xs font-semibold text-[#17382C] uppercase tracking-wider">
                        CHOOSE YOUR PATTY
                      </h4>
                      <span className="text-[11px] font-semibold text-[#B95F3B] bg-[#B95F3B]/10 px-2 py-0.5 rounded">Required</span>
                    </div>
                    <div className="space-y-2">
                      {opts.patties.map((p, idx) => (
                        <label
                          key={idx}
                          onClick={() => setSelectedPatty(p)}
                          className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                            selectedPatty?.name === p.name
                              ? 'border-[#17382C] bg-[#17382C]/5 font-semibold text-[#17382C]'
                              : 'border-[#DDD5C7] hover:border-[#17382C] bg-white text-[#22211F]'
                          }`}
                        >
                          <span className="text-sm">{p.name}</span>
                          <div className="flex items-center gap-2">
                            {p.priceOffset > 0 && (
                              <span className="text-xs text-[#B95F3B] font-semibold">+${p.priceOffset.toFixed(2)}</span>
                            )}
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                              selectedPatty?.name === p.name ? 'border-[#17382C] bg-[#17382C]' : 'border-[#DDD5C7]'
                            }`}>
                              {selectedPatty?.name === p.name && <Check className="w-3 h-3 text-white" />}
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* DONENESS */}
                {opts.doneness && (
                  <div>
                    <h4 className="text-xs font-semibold text-[#17382C] uppercase tracking-wider mb-3">
                      HOW WOULD YOU LIKE IT COOKED?
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {opts.doneness.map((d, idx) => (
                        <label
                          key={idx}
                          onClick={() => setSelectedDoneness(d)}
                          className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                            selectedDoneness?.name === d.name
                              ? 'border-[#17382C] bg-[#17382C]/5 font-semibold text-[#17382C]'
                              : 'border-[#DDD5C7] hover:border-[#17382C] bg-white text-[#22211F]'
                          }`}
                        >
                          <span className="text-xs">{d.name}</span>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            selectedDoneness?.name === d.name ? 'border-[#17382C] bg-[#17382C]' : 'border-[#DDD5C7]'
                          }`}>
                            {selectedDoneness?.name === d.name && <Check className="w-2.5 h-2.5 text-white" />}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* CHEESE */}
                {opts.cheeses && (
                  <div>
                    <h4 className="text-xs font-semibold text-[#17382C] uppercase tracking-wider mb-3">
                      CHEESE SELECTION
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {opts.cheeses.map((c, idx) => (
                        <label
                          key={idx}
                          onClick={() => setSelectedCheese(c)}
                          className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                            selectedCheese?.name === c.name
                              ? 'border-[#17382C] bg-[#17382C]/5 font-semibold text-[#17382C]'
                              : 'border-[#DDD5C7] hover:border-[#17382C] bg-white text-[#22211F]'
                          }`}
                        >
                          <span className="text-xs">{c.name}</span>
                          <div className="flex items-center gap-2">
                            {c.priceOffset > 0 && <span className="text-xs text-[#B95F3B]">+${c.priceOffset.toFixed(2)}</span>}
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              selectedCheese?.name === c.name ? 'border-[#17382C] bg-[#17382C]' : 'border-[#DDD5C7]'
                            }`}>
                              {selectedCheese?.name === c.name && <Check className="w-2.5 h-2.5 text-white" />}
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* ADD EXTRAS */}
                {opts.extras && opts.extras.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-[#17382C] uppercase tracking-wider mb-3">
                      ADD EXTRAS
                    </h4>
                    <div className="space-y-2">
                      {opts.extras.map((ex) => {
                        const isChecked = selectedExtras.some(e => e.id === ex.id);
                        return (
                          <label
                            key={ex.id}
                            onClick={() => toggleExtra(ex)}
                            className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                              isChecked
                                ? 'border-[#B95F3B] bg-[#B95F3B]/5 font-semibold text-[#17382C]'
                                : 'border-[#DDD5C7] hover:border-[#17382C] bg-white text-[#22211F]'
                            }`}
                          >
                            <span className="text-sm">{ex.name}</span>
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-[#B95F3B] font-semibold">+${ex.price.toFixed(2)}</span>
                              <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                                isChecked ? 'border-[#B95F3B] bg-[#B95F3B]' : 'border-[#DDD5C7]'
                              }`}>
                                {isChecked && <Check className="w-3.5 h-3.5 text-white" />}
                              </div>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* PAIR IT WITH (UPSELL) */}
                <div className="p-4 bg-[#EFE9DD]/60 rounded-2xl border border-[#DDD5C7] space-y-2">
                  <div className="text-[11px] font-semibold text-[#B95F3B] uppercase tracking-wider">
                    PAIR IT WITH
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <div className="font-semibold text-[#17382C]">Truffle Hand-Cut Fries</div>
                      <div className="text-[#716D66]">Golden crispy fries with truffle oil & parmesan</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAddedPairing(addedPairing ? null : { id: 'pair_fries', name: 'Truffle Hand-Cut Fries Side', price: 7.50 })}
                      className={`px-3 py-1.5 rounded-xl font-semibold border transition-all ${
                        addedPairing ? 'bg-[#17382C] text-white border-[#17382C]' : 'bg-white text-[#17382C] border-[#DDD5C7] hover:border-[#17382C]'
                      }`}
                    >
                      {addedPairing ? '✓ Added +$7.50' : '+ $7.50'}
                    </button>
                  </div>
                </div>

                {/* REMOVE INGREDIENTS */}
                {opts.removals && opts.removals.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-[#17382C] uppercase tracking-wider mb-3">
                      REMOVE INGREDIENTS
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {opts.removals.map((itemRemove, idx) => {
                        const isRemoved = removedIngredients.includes(itemRemove);
                        return (
                          <button
                            type="button"
                            key={idx}
                            onClick={() => toggleRemoval(itemRemove)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                              isRemoved
                                ? 'bg-red-500/10 border-red-300 text-red-700 line-through'
                                : 'bg-white border-[#DDD5C7] text-[#22211F] hover:border-[#17382C]'
                            }`}
                          >
                            {isRemoved ? `No ${itemRemove}` : itemRemove}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* SPECIAL INSTRUCTIONS */}
                <div>
                  <h4 className="text-xs font-semibold text-[#17382C] uppercase tracking-wider mb-2">
                    SPECIAL INSTRUCTIONS
                  </h4>
                  <textarea
                    rows={2}
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="Allergies or special requests? We'll do our best to accommodate."
                    className="w-full p-3 bg-white border border-[#DDD5C7] rounded-xl text-xs text-[#22211F] focus:outline-none focus:border-[#B95F3B] placeholder-[#716D66]/60"
                  />
                </div>

                {/* ALLERGY NOTE */}
                <div className="flex items-start gap-2 text-[11px] text-[#716D66] bg-white p-3 rounded-xl border border-[#DDD5C7]/70">
                  <AlertCircle className="w-4 h-4 text-[#B95F3B] shrink-0 mt-0.5" />
                  <span>
                    <strong>Have a food allergy?</strong> Please let our team know. While we take care in preparation, cross-contact may occur in our open wood-fire kitchen.
                  </span>
                </div>

              </div>

              {/* STICKY BOTTOM ACTION BAR */}
              <div className="p-4 sm:p-5 bg-[#EFE9DD] border-t border-[#DDD5C7] flex items-center justify-between gap-4 shrink-0">
                <QuantitySelector
                  quantity={quantity}
                  onDecrease={() => setQuantity(q => Math.max(1, q - 1))}
                  onIncrease={() => setQuantity(q => q + 1)}
                  size="md"
                />

                <Button
                  variant="primary"
                  size="lg"
                  className="flex-1"
                  onClick={handleAddToCart}
                >
                  ADD TO ORDER — ${totalPrice.toFixed(2)}
                </Button>
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
