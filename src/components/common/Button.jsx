import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  icon: Icon = null,
  iconPosition = 'left',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#17382C] disabled:opacity-50 disabled:cursor-not-allowed rounded-none';

  const variants = {
    primary: 'bg-[#17382C] hover:bg-[#10291F] text-[#F7F3EA] border border-transparent',
    secondary: 'bg-transparent border border-[#17382C] text-[#17382C] hover:bg-[#17382C] hover:text-[#F7F3EA]',
    outline: 'border border-[#DDD5C7] text-[#22211F] hover:border-[#17382C] hover:bg-[#EFE9DD]/60 bg-transparent',
    ghost: 'text-[#22211F] hover:bg-[#EFE9DD] hover:text-[#17382C] bg-transparent',
    dark: 'bg-[#22211F] hover:bg-[#10291F] text-[#F7F3EA] border border-transparent',
    terracotta: 'bg-[#B95F3B] hover:bg-[#a25130] text-white border border-transparent',
    link: 'bg-transparent text-[#17382C] hover:text-[#B95F3B] p-0 underline-offset-4 hover:underline font-semibold tracking-wide'
  };

  const sizes = {
    sm: 'px-3.5 py-1.5 text-xs gap-1.5 tracking-wider uppercase',
    md: 'px-5 py-2.5 text-xs md:text-sm gap-2 tracking-wider uppercase font-semibold',
    lg: 'px-7 py-3.5 text-sm gap-2.5 tracking-widest uppercase font-semibold'
  };

  const sizeClasses = variant === 'link' ? 'py-0 px-0' : sizes[size];

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizeClasses} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />}
    </button>
  );
};
