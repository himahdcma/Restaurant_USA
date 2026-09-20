import React from 'react';

export const Badge = ({ children, variant = 'neutral', className = '' }) => {
  const styles = {
    popular: 'bg-[#B95F3B] text-white border border-white/20',
    chef: 'bg-[#17382C] text-[#F7F3EA] border border-white/20',
    spicy: 'bg-[#B95F3B] text-white border border-white/20',
    vegetarian: 'bg-[#17382C] text-[#F7F3EA] border border-white/20',
    healthy: 'bg-[#F7F3EA] text-[#22211F] border border-[#17382C]/20',
    seafood: 'bg-[#F7F3EA] text-[#22211F] border border-[#17382C]/20',
    sweet: 'bg-[#F7F3EA] text-[#22211F] border border-[#17382C]/20',
    neutral: 'bg-[#F7F3EA] text-[#22211F] border border-[#17382C]/20'
  };

  const getVariant = (text) => {
    if (variant !== 'neutral') return styles[variant] || styles.neutral;
    if (!text) return styles.neutral;
    const str = String(text);
    if (str.includes('Popular')) return styles.popular;
    if (str.includes("Chef's Pick")) return styles.chef;
    if (str.includes('Spicy')) return styles.spicy;
    if (str.includes('Vegetarian')) return styles.vegetarian;
    if (str.includes('Sweet')) return styles.sweet;
    if (str.includes('Healthy')) return styles.healthy;
    if (str.includes('Seafood')) return styles.seafood;
    return styles.neutral;
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] md:text-[11px] font-semibold tracking-wider uppercase leading-none select-none ${getVariant(children)} ${className}`}>
      {children}
    </span>
  );
};
