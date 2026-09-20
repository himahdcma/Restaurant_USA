import React from 'react';
import { useApp } from '../../context/AppContext';

export const PriceSummary = () => {
  const {
    cartSubtotal,
    taxAmount,
    deliveryFee,
    fulfillmentMode
  } = useApp();

  const total = cartSubtotal + taxAmount + (fulfillmentMode === 'delivery' ? deliveryFee : 0);

  return (
    <div className="space-y-2 text-xs text-[#716D66] pt-3 border-t border-[#DDD5C7]">
      <div className="flex justify-between">
        <span>Subtotal</span>
        <span className="font-medium text-[#22211F]">${cartSubtotal.toFixed(2)}</span>
      </div>
      
      <div className="flex justify-between">
        <span>Estimated Tax (8.875%)</span>
        <span className="font-medium text-[#22211F]">${taxAmount.toFixed(2)}</span>
      </div>

      {fulfillmentMode === 'delivery' && (
        <div className="flex justify-between">
          <span>Delivery Fee</span>
          <span className="font-medium text-[#22211F]">${deliveryFee.toFixed(2)}</span>
        </div>
      )}

      <div className="flex justify-between text-base font-bold text-[#17382C] pt-2.5 border-t border-[#DDD5C7]/70">
        <span>Estimated Total</span>
        <span className="text-[#B95F3B]">${total.toFixed(2)}</span>
      </div>
    </div>
  );
};
