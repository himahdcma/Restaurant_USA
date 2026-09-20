import React from 'react';
import { menuCategories } from '../../data/menuData';

export const CategoryTabs = ({ activeCategory, onSelectCategory }) => {
  return (
    <div className="w-full overflow-x-auto custom-scrollbar border-b border-[#DDD5C7] pb-1">
      <div className="flex items-center space-x-6 min-w-max px-2">
        {menuCategories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`py-2 text-sm transition-all whitespace-nowrap ${
                isActive
                  ? 'text-[#17382C] font-bold border-b-2 border-[#B95F3B]'
                  : 'text-[#716D66] font-medium hover:text-[#17382C]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
