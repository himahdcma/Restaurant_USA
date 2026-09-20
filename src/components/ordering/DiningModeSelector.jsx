import React from 'react';
import { useApp } from '../../context/AppContext';
import { diningModes } from '../../data/restaurantData';
import { ShoppingBag, Truck, Utensils } from 'lucide-react';

export const DiningModeSelector = () => {
  const { fulfillmentMode, setFulfillmentMode } = useApp();

  const getIcon = (id) => {
    switch (id) {
      case 'pickup': return <ShoppingBag className="w-4 h-4" />;
      case 'delivery': return <Truck className="w-4 h-4" />;
      case 'dine-in': return <Utensils className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="grid grid-cols-3 gap-2 bg-[#EFE9DD] p-1.5 rounded-xl border border-[#DDD5C7]">
      {diningModes.map((mode) => {
        const isActive = fulfillmentMode === mode.id;
        return (
          <button
            key={mode.id}
            type="button"
            onClick={() => setFulfillmentMode(mode.id)}
            className={`flex flex-col items-center justify-center py-2 px-1.5 rounded-lg text-xs font-semibold transition-all ${
              isActive
                ? 'bg-[#17382C] text-white shadow-xs'
                : 'text-[#716D66] hover:text-[#22211F]'
            }`}
          >
            <div className="flex items-center gap-1.5 mb-0.5">
              {getIcon(mode.id)}
              <span>{mode.label}</span>
            </div>
            <span className={`text-[10px] font-normal ${isActive ? 'text-[#DDD5C7]' : 'text-[#716D66]/80'}`}>
              {mode.time}
            </span>
          </button>
        );
      })}
    </div>
  );
};
