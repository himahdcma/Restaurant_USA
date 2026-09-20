import React from 'react';

export const SectionHeading = ({
  kicker = '',
  title = '',
  subtitle = '',
  align = 'left',
  className = ''
}) => {
  const alignment = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end'
  };

  return (
    <div className={`flex flex-col ${alignment[align]} ${className}`}>
      {kicker && (
        <span className="text-xs font-semibold tracking-widest text-[#B95F3B] uppercase mb-2">
          {kicker}
        </span>
      )}
      {title && (
        <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl text-[#17382C] leading-tight tracking-tight">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="mt-3 text-base sm:text-lg text-[#716D66] max-w-2xl font-sans leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
