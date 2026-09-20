import React from 'react';
import { FoodCard } from './FoodCard';

export const FoodGrid = ({ items = [] }) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-[#EFE9DD]/50 rounded-2xl border border-dashed border-[#DDD5C7]">
        <h3 className="font-serif-display text-2xl text-[#17382C] mb-2">No dishes match your filter</h3>
        <p className="text-sm text-[#716D66]">Try clearing your search query or dietary preferences.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item) => (
        <FoodCard key={item.id} item={item} />
      ))}
    </div>
  );
};
