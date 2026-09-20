import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Share2, Globe } from 'lucide-react';
import { Logo } from '../common/Logo';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#10291F] text-[#F7F3EA] border-t border-[#17382C] pt-16 pb-12 mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#17382C]/80">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="light" />
            <p className="text-xs md:text-sm text-[#DDD5C7]/80 max-w-sm leading-relaxed font-sans">
              Crafted around open wood fires, seasonal local ranching, and authentic American culinary heritage.
            </p>
            <div className="pt-1 flex items-center space-x-3 text-[#DDD5C7]">
              <a href="#share" className="p-2 border border-[#17382C] text-[#F7F3EA] hover:border-[#B95F3B] hover:text-[#B95F3B] transition-colors" aria-label="Share">
                <Share2 className="w-3.5 h-3.5" />
              </a>
              <a href="#website" className="p-2 border border-[#17382C] text-[#F7F3EA] hover:border-[#B95F3B] hover:text-[#B95F3B] transition-colors" aria-label="Website">
                <Globe className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.14em] uppercase text-[#B95F3B] mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-[#DDD5C7]/80 uppercase tracking-wider font-medium">
              <li><Link to="/menu" className="hover:text-white transition-colors">Our Full Menu</Link></li>
              <li><Link to="/reservations" className="hover:text-white transition-colors">Book a Table</Link></li>
              <li><Link to="/catering" className="hover:text-white transition-colors">Catering &amp; Events</Link></li>
              <li><Link to="/rewards" className="hover:text-white transition-colors">Oak Rewards Club</Link></li>
            </ul>
          </div>

          {/* Hours & Location */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.14em] uppercase text-[#B95F3B] mb-4">
              Visit Us
            </h4>
            <div className="space-y-3 text-xs text-[#DDD5C7]/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#B95F3B] shrink-0 mt-0.5" />
                <span>123 Mercer Street, New York, NY 10012</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[#B95F3B] shrink-0" />
                <span>(212) 555-0198</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-3.5 h-3.5 text-[#B95F3B] shrink-0 mt-0.5" />
                <span>Mon–Thu 11–10 | Fri–Sat 11–11 | Sun 11–9</span>
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.14em] uppercase text-[#B95F3B] mb-4">
              Join the Club
            </h4>
            <p className="text-xs text-[#DDD5C7]/80 mb-3 leading-relaxed">
              Subscribe for chef's secret specials and 100 bonus reward points.
            </p>
            {subscribed ? (
              <div className="p-3 bg-[#17382C] text-xs text-[#F7F3EA] font-semibold border border-[#17382C]">
                ✓ Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex items-center border border-[#DDD5C7]/30 bg-[#17382C]">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-transparent text-white placeholder-[#DDD5C7]/50 text-xs px-3 py-2.5 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2.5 bg-[#B95F3B] hover:bg-[#a25130] text-white text-xs uppercase font-semibold tracking-wider transition-colors shrink-0"
                  >
                    Join
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Sub-footer copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#DDD5C7]/60 gap-4 uppercase tracking-wider">
          <p>© {new Date().getFullYear()} Ember &amp; Oak Modern American Kitchen. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span className="hover:text-white cursor-pointer">Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
