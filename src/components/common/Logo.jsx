import React from 'react';
import { Link } from 'react-router-dom';

export const Logo = ({ 
  variant = 'dark', // 'dark' | 'light' | 'terracotta'
  compact = false, 
  className = '',
  linkable = true
}) => {
  const textColor = variant === 'light' 
    ? 'text-[#F7F3EA]' 
    : variant === 'terracotta' 
    ? 'text-[#B95F3B]' 
    : 'text-[#17382C]';

  const accentColor = variant === 'light' 
    ? 'text-[#B95F3B]' 
    : variant === 'terracotta' 
    ? 'text-[#17382C]' 
    : 'text-[#B95F3B]';

  const content = compact ? (
    <div className={`inline-flex items-center gap-1.5 font-serif text-xl tracking-tight font-bold ${textColor} ${className}`}>
      <span>E</span>
      <span className={`text-xs font-sans tracking-normal italic ${accentColor}`}>&amp;</span>
      <span>O</span>
    </div>
  ) : (
    <div className={`inline-flex flex-col ${className}`}>
      <div className={`flex items-baseline gap-1.5 font-serif text-xl md:text-2xl tracking-[0.18em] font-medium uppercase ${textColor}`}>
        <span>EMBER</span>
        <span className={`text-base font-serif italic ${accentColor}`}>&amp;</span>
        <span>OAK</span>
      </div>
      <span className="text-[9px] font-sans tracking-[0.35em] text-[#716D66] uppercase font-semibold -mt-0.5">
        Modern American Kitchen
      </span>
    </div>
  );

  if (linkable) {
    return (
      <Link to="/" className="inline-block focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B95F3B] group">
        {content}
      </Link>
    );
  }

  return content;
};
