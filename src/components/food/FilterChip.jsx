import React from 'react';
import { Check } from 'lucide-react';

export const FilterChip = ({ label, selected, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
        selected
          ? 'bg-[#17382C] text-white border-[#17382C] font-semibold'
          : 'bg-[#EFE9DD]/50 text-[#22211F] border-[#DDD5C7] hover:border-[#17382C]'
      }`}
    >
      {selected && <Check className="w-3.5 h-3.5 text-white" />}
      <span>{label}</span>
    </button>
  );
};
