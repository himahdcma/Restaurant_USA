import React from 'react';
import { useApp } from '../../context/AppContext';
import { QuantitySelector } from '../common/QuantitySelector';
import { Trash2 } from 'lucide-react';

export const CartItem = ({ cartItem }) => {
  const { updateCartQuantity, removeFromCart } = useApp();
  const { cartId, item, quantity, selectedOptions, specialInstructions, totalItemPrice } = cartItem;

  // Build clean string of selected customizations
  const getCustomizationSummary = () => {
    const list = [];
    if (selectedOptions.patty) list.push(selectedOptions.patty.name);
    if (selectedOptions.doneness) list.push(selectedOptions.doneness.name);
    if (selectedOptions.cheese && selectedOptions.cheese.name !== 'No Cheese') list.push(selectedOptions.cheese.name);
    if (selectedOptions.base) list.push(selectedOptions.base.name);
    if (selectedOptions.protein) list.push(selectedOptions.protein.name);
    
    if (selectedOptions.extras && selectedOptions.extras.length > 0) {
      selectedOptions.extras.forEach(e => list.push(`+ ${e.name}`));
    }
    if (selectedOptions.removals && selectedOptions.removals.length > 0) {
      selectedOptions.removals.forEach(r => list.push(`No ${r}`));
    }
    return list;
  };

  const summaryList = getCustomizationSummary();

  return (
    <div className="py-3.5 border-b border-[#DDD5C7]/60 flex items-start gap-3">
      {/* Small Food Image */}
      <img
        src={item.image}
        alt={item.name}
        className="w-14 h-14 rounded-xl object-cover bg-[#EFE9DD] shrink-0 border border-[#DDD5C7]/50"
      />

      {/* Item Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-serif-display text-base text-[#17382C] leading-snug truncate">
            {item.name}
          </h4>
          <span className="font-bold text-sm text-[#17382C] shrink-0">
            ${totalItemPrice.toFixed(2)}
          </span>
        </div>

        {/* Selected options as clean secondary text */}
        {summaryList.length > 0 && (
          <p className="text-xs text-[#716D66] mt-0.5 leading-relaxed line-clamp-2">
            {summaryList.join(' · ')}
          </p>
        )}

        {/* Special Instructions */}
        {specialInstructions && (
          <p className="text-[11px] text-[#B95F3B] italic mt-0.5 truncate">
            "{specialInstructions}"
          </p>
        )}

        {/* Quantity Selector & Remove Action */}
        <div className="mt-2.5 flex items-center justify-between">
          <QuantitySelector
            quantity={quantity}
            onDecrease={() => updateCartQuantity(cartId, -1)}
            onIncrease={() => updateCartQuantity(cartId, 1)}
            size="sm"
          />

          <button
            type="button"
            onClick={() => removeFromCart(cartId)}
            className="text-[11px] text-[#716D66] hover:text-red-600 transition-colors underline"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};
