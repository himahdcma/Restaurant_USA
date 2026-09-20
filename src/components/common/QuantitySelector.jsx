import React from 'react';
import { Minus, Plus } from 'lucide-react';

export const QuantitySelector = ({
  quantity = 1,
  onDecrease,
  onIncrease,
  min = 1,
  max = 99,
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'h-8 px-2 text-xs',
    md: 'h-10 px-3 text-sm',
    lg: 'h-12 px-4 text-base'
  };

  const buttonSizes = {
    sm: 'w-6 h-6',
    md: 'w-7 h-7',
    lg: 'w-8 h-8'
  };

  return (
    <div className={`inline-flex items-center bg-[#EFE9DD] rounded-lg border border-[#DDD5C7] ${sizeClasses[size]} ${className}`}>
      <button
        type="button"
        onClick={onDecrease}
        disabled={quantity <= min}
        className={`${buttonSizes[size]} flex items-center justify-center text-[#22211F] hover:text-[#B95F3B] disabled:opacity-30 disabled:hover:text-[#22211F] transition-colors rounded`}
        aria-label="Decrease quantity"
      >
        <Minus className="w-3.5 h-3.5" />
      </button>
      
      <span className="font-semibold text-[#22211F] px-3 min-w-[2rem] text-center select-none">
        {quantity}
      </span>
      
      <button
        type="button"
        onClick={onIncrease}
        disabled={quantity >= max}
        className={`${buttonSizes[size]} flex items-center justify-center text-[#22211F] hover:text-[#B95F3B] disabled:opacity-30 disabled:hover:text-[#22211F] transition-colors rounded`}
        aria-label="Increase quantity"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
