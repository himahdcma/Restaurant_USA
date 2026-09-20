import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ShoppingBag, Menu as MenuIcon, Award, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';
import { Logo } from '../common/Logo';
import { MobileNav } from './MobileNav';

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartQuantityCount, setCartOpen, setFinderOpen, user } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleExploreEvents = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/#wedding-events');
    } else {
      const el = document.getElementById('wedding-events');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navLinkClass = ({ isActive }) =>
    `py-1 text-xs uppercase tracking-[0.14em] font-semibold transition-all ${
      isActive
        ? 'text-[#17382C] border-b border-[#17382C]'
        : 'text-[#716D66] hover:text-[#17382C]'
    }`;

  return (
    <>
      {/* Editorial Announcement Bar */}
      <div className="bg-[#17382C] text-[#F7F3EA] text-xs py-2 px-4 text-center border-b border-[#10291F]">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 font-sans tracking-wide">
          <span className="hidden sm:inline font-semibold text-[#F7F3EA] uppercase tracking-widest text-[11px]">
            WEDDING SEASON AT EMBER &amp; OAK:
          </span>
          <span className="hidden md:inline text-[#DDD5C7]/90 text-xs">
            Private dinners, rehearsal celebrations &amp; intimate receptions.
          </span>
          <span className="sm:hidden text-white font-medium text-xs">
            Wedding Season at Ember &amp; Oak
          </span>
          <a
            href="#wedding-events"
            onClick={handleExploreEvents}
            className="inline-flex items-center gap-1 text-[#F7F3EA] hover:text-[#B95F3B] font-semibold underline underline-offset-4 ml-1.5 transition-colors text-xs"
          >
            <span>Explore Events</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Main Header Container */}
      <header
        className={`sticky top-0 z-40 transition-all duration-200 bg-[#F7F3EA]/98 backdrop-blur-md border-b border-[#DDD5C7] ${
          scrolled ? 'py-0' : 'py-0.5'
        }`}
      >
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-200 ${
          scrolled ? 'h-16' : 'h-20'
        }`}>
          {/* Logo Lockup */}
          <Logo variant="dark" />

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/menu" className={navLinkClass}>
              Menu
            </NavLink>
            <NavLink to="/reservations" className={navLinkClass}>
              Reservations
            </NavLink>
            <NavLink to="/catering" className={navLinkClass}>
              Catering
            </NavLink>
          </nav>

          {/* Right Side Utility Actions */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Smart Finder Text Link (Desktop) */}
            <button
              onClick={() => setFinderOpen(true)}
              className="hidden lg:flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#17382C] hover:text-[#B95F3B] transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B95F3B]" />
              <span>Smart Finder</span>
            </button>

            {/* Rewards Link (Desktop) */}
            <Link
              to="/rewards"
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#17382C] hover:text-[#B95F3B] transition-colors"
            >
              <Award className="w-3.5 h-3.5 text-[#B95F3B]" />
              <span>{user.points} pts</span>
            </Link>

            {/* Cart Button */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-[#22211F] hover:text-[#17382C] transition-colors focus:outline-none"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 text-[#17382C]" />
              {cartQuantityCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#B95F3B] text-white text-[10px] font-bold w-4 h-4 rounded-none flex items-center justify-center">
                  {cartQuantityCount}
                </span>
              )}
            </button>

            {/* Primary Order Online CTA */}
            <div className="hidden sm:block">
              <Link to="/menu">
                <Button variant="primary" size="sm">
                  Order Online
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 md:hidden text-[#22211F] hover:text-[#17382C] transition-colors focus:outline-none"
              aria-label="Open mobile menu"
            >
              <MenuIcon className="w-6 h-6 text-[#17382C]" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
};
