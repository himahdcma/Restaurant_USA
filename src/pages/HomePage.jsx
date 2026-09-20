import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '../components/common/Button';
import { FoodCard } from '../components/food/FoodCard';
import { menuItems } from '../data/menuData';
import { WeekendOfferModal } from '../components/common/WeekendOfferModal';
import { PrivateEventInquiryModal } from '../components/common/PrivateEventInquiryModal';
import {
  Sparkles,
  Star,
  MapPin,
  ArrowRight,
  ShoppingBag,
  Truck,
  Utensils,
  Calendar,
  Compass
} from 'lucide-react';
import { motion } from 'framer-motion';

export const HomePage = () => {
  const {
    setFinderOpen,
    setCustomizingItem,
    fulfillmentMode,
    setFulfillmentMode
  } = useApp();

  const navigate = useNavigate();
  const [offerModalOpen, setOfferModalOpen] = useState(false);
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [showEventGallery, setShowEventGallery] = useState(false);

  // Exact 4 popular items
  const popularDishIds = ['m_1', 'm_3', 'm_2', 'm_15'];
  const popularDishes = menuItems.filter(item => popularDishIds.includes(item.id));

  // Chef's Special item: Maple Glazed Salmon (m_4)
  const salmonDish = menuItems.find(item => item.id === 'm_4') || menuItems[3];

  const testimonials = [
    {
      quote: "The burger alone is worth coming back for.",
      author: "Marcus Vance",
      tag: "Regular Guest"
    },
    {
      quote: "Beautiful space, great service, and the salmon was perfect.",
      author: "Elena Rostova",
      tag: "Dinner Guest"
    },
    {
      quote: "Our new favorite dinner spot downtown.",
      author: "David K.",
      tag: "SoHo Resident"
    }
  ];

  const eventTypes = [
    "Rehearsal Dinners",
    "Engagement Dinners",
    "Intimate Receptions",
    "Bridal Celebrations",
    "Corporate & Private Dining"
  ];

  return (
    <div className="space-y-0 pb-0 overflow-x-hidden">
      
      {/* ==================================================
          1. HERO — EDITORIAL RECTANGULAR ATMOSPHERE (85vh)
         ================================================== */}
      <section className="relative min-h-[85vh] lg:min-h-[88vh] flex items-center bg-[#10291F] text-white overflow-hidden">
        {/* Full-Width Background Photography - Strictly Square */}
        <div className="absolute inset-0 z-0 rounded-none">
          <img
            src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1920&q=80"
            alt="Ember & Oak Warm Evening Restaurant Dining Atmosphere"
            className="w-full h-full object-cover object-center filter brightness-90 rounded-none"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#10291F]/95 via-[#10291F]/80 to-[#10291F]/40" />
        </div>

        {/* Editorial Left-Aligned Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 lg:py-28">
          <div className="max-w-2xl text-left space-y-6">
            
            {/* Editorial Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-xs font-semibold tracking-[0.16em] text-[#B95F3B] uppercase block"
            >
              MODERN AMERICAN KITCHEN
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.08] tracking-tight text-white"
            >
              Good food. <br />
              <span className="italic text-[#EFE9DD]">Made for good moments.</span>
            </motion.h1>

            {/* Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              className="text-base sm:text-lg text-[#DDD5C7] font-sans font-light leading-relaxed max-w-lg"
            >
              Seasonal ingredients, bold flavors, and dishes made fresh every day.
            </motion.p>

            {/* Primary Action & Editorial Link */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.15 }}
              className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-6"
            >
              <Link to="/menu">
                <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
                  ORDER ONLINE
                </Button>
              </Link>

              <Link
                to="/reservations"
                className="text-xs font-semibold uppercase tracking-widest text-[#F7F3EA] hover:text-[#B95F3B] transition-colors inline-flex items-center gap-1.5"
              >
                <span>RESERVE A TABLE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>

            {/* Info Subtitle Bar */}
            <div className="pt-6 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[#DDD5C7]/90 font-medium tracking-wide">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#477A5B]" />
                <span>Open now • Serving dinner until 11 PM</span>
              </div>
              <span className="hidden sm:inline text-white/30">•</span>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#B95F3B]" />
                <span>123 Mercer Street, SoHo</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          2. DINING MODE STRIP — RECTANGULAR
         ================================================== */}
      <section className="bg-[#EFE9DD] border-b border-[#DDD5C7] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B95F3B] block mb-1">
                ORDERING &amp; DINING OPTIONS
              </span>
              <h3 className="font-serif text-2xl text-[#17382C]">
                How are you dining today?
              </h3>
            </div>

            {/* 3 Dining Options Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full md:w-auto">
              
              <button
                type="button"
                onClick={() => setFulfillmentMode('pickup')}
                className={`p-4 border text-left transition-colors rounded-none ${
                  fulfillmentMode === 'pickup'
                    ? 'bg-[#17382C] text-[#F7F3EA] border-[#17382C]'
                    : 'bg-[#F7F3EA] text-[#22211F] border-[#DDD5C7] hover:border-[#17382C]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold uppercase tracking-wider">PICKUP</span>
                  <ShoppingBag className={`w-4 h-4 ${fulfillmentMode === 'pickup' ? 'text-[#B95F3B]' : 'text-[#716D66]'}`} />
                </div>
                <div className={`text-xs ${fulfillmentMode === 'pickup' ? 'text-[#DDD5C7]' : 'text-[#716D66]'}`}>
                  Ready in 20–30 min
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFulfillmentMode('delivery')}
                className={`p-4 border text-left transition-colors rounded-none ${
                  fulfillmentMode === 'delivery'
                    ? 'bg-[#17382C] text-[#F7F3EA] border-[#17382C]'
                    : 'bg-[#F7F3EA] text-[#22211F] border-[#DDD5C7] hover:border-[#17382C]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold uppercase tracking-wider">DELIVERY</span>
                  <Truck className={`w-4 h-4 ${fulfillmentMode === 'delivery' ? 'text-[#B95F3B]' : 'text-[#716D66]'}`} />
                </div>
                <div className={`text-xs ${fulfillmentMode === 'delivery' ? 'text-[#DDD5C7]' : 'text-[#716D66]'}`}>
                  35–45 min
                </div>
              </button>

              <button
                type="button"
                onClick={() => navigate('/reservations')}
                className="p-4 border border-[#DDD5C7] bg-[#F7F3EA] text-[#22211F] hover:border-[#17382C] text-left transition-colors group rounded-none"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold uppercase tracking-wider">DINE-IN</span>
                  <Utensils className="w-4 h-4 text-[#716D66] group-hover:text-[#B95F3B]" />
                </div>
                <div className="text-xs text-[#716D66] group-hover:text-[#17382C] flex items-center gap-1 font-medium">
                  <span>Reserve table</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </button>

            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          3. POPULAR RIGHT NOW — EDITORIAL CATALOGUE
         ================================================== */}
      <section className="bg-[#F7F3EA] py-24 lg:py-32 border-b border-[#DDD5C7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B95F3B] block mb-2">
                POPULAR RIGHT NOW
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#17382C]">
                The dishes our guests keep coming back for.
              </h2>
            </div>

            <Link
              to="/menu"
              className="text-xs font-semibold uppercase tracking-widest text-[#17382C] hover:text-[#B95F3B] transition-colors inline-flex items-center gap-1.5 shrink-0"
            >
              <span>VIEW FULL MENU</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 4 Popular Dishes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDishes.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>

        </div>
      </section>

      {/* ==================================================
          4. CHEF'S SPECIAL — EDITORIAL RECTANGULAR SELECTION
         ================================================== */}
      <section className="bg-[#EFE9DD]/60 py-24 lg:py-32 border-b border-[#DDD5C7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Image Side (7 cols desktop) — 0px radius */}
            <div className="lg:col-span-7">
              <div className="aspect-[4/3] overflow-hidden border border-[#DDD5C7] bg-[#10291F] rounded-none">
                <img
                  src={salmonDish.image}
                  alt={salmonDish.name}
                  className="w-full h-full object-cover object-center rounded-none"
                />
              </div>
            </div>

            {/* Text Side (5 cols desktop) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B95F3B] block mb-2">
                  CHEF'S SIGNATURE SELECTION
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl text-[#17382C] leading-tight">
                  {salmonDish.name}
                </h2>
                <div className="text-xl font-bold text-[#B95F3B] mt-2">
                  ${salmonDish.price.toFixed(2)}
                </div>
              </div>

              <p className="text-sm text-[#716D66] font-sans font-light leading-relaxed">
                {salmonDish.description}
              </p>

              <div className="flex items-center gap-6 text-xs font-semibold text-[#17382C] py-3 border-y border-[#DDD5C7]/70 uppercase tracking-wider">
                <div className="flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 fill-[#B95F3B] text-[#B95F3B]" />
                  <span>{salmonDish.rating} Rating ({salmonDish.reviewCount} reviews)</span>
                </div>
                <span>•</span>
                <div>{salmonDish.calories} Calories</div>
              </div>

              <div>
                <Button
                  variant="primary"
                  size="md"
                  icon={ArrowRight}
                  iconPosition="right"
                  onClick={() => setCustomizingItem(salmonDish)}
                >
                  CUSTOMIZE DISH — ${salmonDish.price.toFixed(2)}
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          5. WEEKEND OFFER — EDITORIAL BANNER
         ================================================== */}
      <section className="relative bg-[#10291F] text-white py-24 lg:py-28 overflow-hidden border-b border-[#17382C]">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1920&q=80"
            alt="Weekend Dining Table Background"
            className="w-full h-full object-cover opacity-20 filter brightness-75 rounded-none"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#B95F3B] block">
            WEEKEND SPECIAL
          </span>

          <h2 className="font-serif text-4xl sm:text-6xl text-white">
            Dinner for Two
          </h2>

          <p className="text-base sm:text-lg text-[#DDD5C7] max-w-lg mx-auto font-sans font-light">
            Two mains. One shared starter. One dessert.
          </p>

          <div className="text-3xl sm:text-4xl font-bold text-[#F7F3EA] font-serif">
            $49 <span className="text-xs font-sans text-[#DDD5C7]/80 font-normal uppercase tracking-widest">/ Friday – Sunday</span>
          </div>

          <div className="pt-2">
            <Button
              variant="primary"
              size="md"
              onClick={() => setOfferModalOpen(true)}
            >
              VIEW THE OFFER
            </Button>
          </div>
        </div>
      </section>

      {/* ==================================================
          6. SMART FOOD FINDER
         ================================================== */}
      <section className="bg-[#F7F3EA] py-24 lg:py-32 border-b border-[#DDD5C7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#17382C] text-[#F7F3EA] p-8 sm:p-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-[#10291F] rounded-none">
            
            <div className="lg:col-span-8 space-y-5">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#B95F3B] block">
                SMART RECOMMENDATION ENGINE
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl leading-tight text-white">
                NOT SURE WHAT YOU'RE CRAVING? <br />
                <span className="text-[#EFE9DD] italic">Let us find your match.</span>
              </h2>
              <p className="text-sm text-[#DDD5C7] max-w-xl font-light leading-relaxed">
                Tell us what sounds good and we'll recommend something handcrafted from the kitchen in seconds.
              </p>
              <div className="pt-2">
                <Button
                  variant="primary"
                  size="md"
                  icon={Sparkles}
                  onClick={() => setFinderOpen(true)}
                  className="bg-[#B95F3B] hover:bg-[#a25130]"
                >
                  HELP ME CHOOSE →
                </Button>
              </div>
            </div>

            <div className="lg:col-span-4 hidden lg:block">
              <div className="aspect-square border border-white/20 bg-[#10291F] rounded-none overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80"
                  alt="Truffle Mushroom Burger Recommendation Match"
                  className="w-full h-full object-cover rounded-none"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          7. RESTAURANT STORY — EDITORIAL MAGAZINE GRID
         ================================================== */}
      <section className="bg-[#F7F3EA] py-24 lg:py-32 border-b border-[#DDD5C7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B95F3B] block mb-2">
              FROM OUR KITCHEN TO YOUR TABLE
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#17382C]">
              Simple ingredients. Thoughtfully prepared.
            </h2>
            <p className="text-sm text-[#716D66] font-light leading-relaxed mt-4 max-w-xl">
              We cook with seasonal ingredients, bold flavors, and the belief that good food doesn't need to be complicated.
            </p>
          </div>

          {/* 3 Cohesive Rectangular Images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="aspect-[4/3] border border-[#DDD5C7] overflow-hidden rounded-none">
                <img
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
                  alt="Chef cooking over Texas Red Oak Fire"
                  className="w-full h-full object-cover rounded-none"
                />
              </div>
              <h4 className="font-serif text-xl text-[#17382C]">1. Wood-Fired Flame</h4>
              <p className="text-xs text-[#716D66] leading-relaxed font-sans">
                Texas red oak logs providing authentic sear and deep caramelization.
              </p>
            </div>

            <div className="space-y-4">
              <div className="aspect-[4/3] border border-[#DDD5C7] overflow-hidden rounded-none">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
                  alt="Warm Dining Interior Atmosphere"
                  className="w-full h-full object-cover rounded-none"
                />
              </div>
              <h4 className="font-serif text-xl text-[#17382C]">2. Warm Atmosphere</h4>
              <p className="text-xs text-[#716D66] leading-relaxed font-sans">
                Designed for relaxed gatherings, long conversations, and good moments.
              </p>
            </div>

            <div className="space-y-4">
              <div className="aspect-[4/3] border border-[#DDD5C7] overflow-hidden rounded-none">
                <img
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"
                  alt="Artisanal Grain Bowl Plating"
                  className="w-full h-full object-cover rounded-none"
                />
              </div>
              <h4 className="font-serif text-xl text-[#17382C]">3. Fresh Plating</h4>
              <p className="text-xs text-[#716D66] leading-relaxed font-sans">
                Seasonal ranch vegetables and house sauces crafted fresh daily.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ==================================================
          8. WEDDINGS & PRIVATE EVENTS
         ================================================== */}
      <section id="wedding-events" className="bg-[#EFE9DD]/70 py-24 lg:py-32 border-b border-[#DDD5C7] scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-3">
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B95F3B] flex flex-wrap items-center gap-2">
                <span>WEDDINGS &amp; PRIVATE EVENTS</span>
                <span className="text-[#DDD5C7]">•</span>
                <span className="text-[#17382C] font-medium tracking-normal">WEDDING SEASON: September – November</span>
              </div>

              <h2 className="font-serif text-4xl sm:text-6xl text-[#17382C] leading-tight">
                Celebrate around a table <br />
                <span className="italic text-[#B95F3B]">worth remembering.</span>
              </h2>

              <p className="text-sm text-[#716D66] font-light leading-relaxed max-w-xl">
                From intimate rehearsal dinners to engagement celebrations and private receptions, we'll create a dining experience built around your occasion.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end items-start lg:items-end">
              <Button
                variant="primary"
                size="md"
                onClick={() => setEventModalOpen(true)}
                icon={Calendar}
              >
                PLAN YOUR EVENT →
              </Button>
              <button
                type="button"
                onClick={() => setShowEventGallery(!showEventGallery)}
                className="text-xs text-[#17382C] font-semibold uppercase tracking-widest hover:text-[#B95F3B] underline transition-colors"
              >
                {showEventGallery ? "Hide Details ↑" : "View Details ↓"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7">
              <div className="aspect-[16/10] overflow-hidden border border-[#DDD5C7] bg-[#10291F] rounded-none">
                <img
                  src="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=80"
                  alt="Ember & Oak Private Dining Room Candlelight Table Setting"
                  className="w-full h-full object-cover rounded-none"
                />
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#F7F3EA] p-8 border border-[#DDD5C7] space-y-6 rounded-none">
              <h4 className="font-serif text-2xl text-[#17382C] border-b border-[#DDD5C7] pb-3">
                Tailored Celebrations
              </h4>

              <div className="space-y-3.5">
                {eventTypes.map((event, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-[#DDD5C7]/50 last:border-0 font-sans">
                    <span className="font-semibold text-[#17382C] uppercase tracking-wider">{event}</span>
                    <span className="text-[#B95F3B] font-mono">0{idx + 1}</span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-[#716D66] italic font-sans leading-relaxed pt-2">
                "Custom wood-fired menus, wine pairings, and dedicated service for your guests."
              </p>
            </div>

          </div>

          {showEventGallery && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#DDD5C7]"
            >
              <div className="bg-[#F7F3EA] p-6 border border-[#DDD5C7] space-y-2 rounded-none">
                <div className="font-serif text-xl text-[#17382C]">Custom Tasting Menus</div>
                <p className="text-xs text-[#716D66] leading-relaxed">
                  Work directly with Chef to select 3-course or 5-course wood-fired menus featuring Texas Wagyu, wild salmon, and seasonal wine pairings.
                </p>
              </div>

              <div className="bg-[#F7F3EA] p-6 border border-[#DDD5C7] space-y-2 rounded-none">
                <div className="font-serif text-xl text-[#17382C]">Exclusive Space Buyouts</div>
                <p className="text-xs text-[#716D66] leading-relaxed">
                  Host up to 80 guests in our main dining room or opt for our private garden room for intimate dinners under 30.
                </p>
              </div>
            </motion.div>
          )}

        </div>
      </section>

      {/* ==================================================
          9. REWARDS SECTION
         ================================================== */}
      <section className="bg-[#EFE9DD] py-24 lg:py-32 border-b border-[#DDD5C7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F7F3EA] p-8 sm:p-12 border border-[#DDD5C7] flex flex-col lg:flex-row items-center justify-between gap-8 rounded-none">
            
            <div className="space-y-4 max-w-xl text-left">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B95F3B] block">
                OAK LOYALTY CLUB
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#17382C]">
                GOOD FOOD SHOULD COME WITH REWARDS.
              </h2>
              <p className="text-sm text-[#716D66] font-light leading-relaxed">
                Earn 1 point for every $1 spent on takeout, delivery, or in-person dining.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <div className="px-3.5 py-1.5 bg-[#EFE9DD] border border-[#DDD5C7] text-xs font-semibold text-[#17382C] uppercase tracking-wider">
                  <span className="text-[#B95F3B] font-bold">100 POINTS</span> — Free Dessert
                </div>
                <div className="px-3.5 py-1.5 bg-[#EFE9DD] border border-[#DDD5C7] text-xs font-semibold text-[#17382C] uppercase tracking-wider">
                  <span className="text-[#B95F3B] font-bold">250 POINTS</span> — $10 Reward
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto">
              <Link to="/rewards" className="w-full sm:w-auto">
                <Button variant="primary" size="md">
                  JOIN EMBER REWARDS →
                </Button>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          10. RESERVATION HERO CTA
         ================================================== */}
      <section className="relative bg-[#10291F] text-white py-28 overflow-hidden border-b border-[#17382C]">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80"
            alt="Ember & Oak Atmospheric Evening Restaurant Table Setting"
            className="w-full h-full object-cover filter brightness-50 rounded-none"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#B95F3B] block">
            HOSPITALITY RESERVATIONS
          </span>
          
          <h2 className="font-serif text-4xl sm:text-6xl text-white">
            YOUR TABLE IS WAITING.
          </h2>

          <p className="text-base sm:text-lg text-[#DDD5C7] max-w-lg mx-auto font-sans font-light leading-relaxed">
            Dinner with friends, date night, or something worth celebrating.
          </p>

          <div className="pt-2">
            <Link to="/reservations">
              <Button variant="primary" size="lg">
                RESERVE A TABLE
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================
          11. SOCIAL PROOF — RESTRAINED TESTIMONIALS
         ================================================== */}
      <section className="bg-[#F7F3EA] py-24 border-b border-[#DDD5C7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B95F3B] block mb-2">
              LOVED BY OUR GUESTS
            </span>
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#17382C] uppercase tracking-widest">
              <span>4.8</span>
              <div className="flex text-[#B95F3B]">★★★★★</div>
              <span className="text-[#716D66] font-normal">Based on 324 guest reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-[#EFE9DD]/50 p-8 border border-[#DDD5C7] flex flex-col justify-between rounded-none"
              >
                <p className="font-serif text-lg text-[#17382C] leading-relaxed mb-6 italic">
                  "{t.quote}"
                </p>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#17382C]">{t.author}</div>
                  <div className="text-[11px] text-[#716D66] uppercase tracking-wider">{t.tag}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==================================================
          12. LOCATION + HOURS — SOHO
         ================================================== */}
      <section className="bg-[#F7F3EA] py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B95F3B] block mb-2">
                  FIND US IN SOHO
                </span>
                <h2 className="font-serif text-4xl text-[#17382C]">
                  Ember &amp; Oak
                </h2>
                <p className="text-sm text-[#716D66] font-light mt-1">
                  123 Mercer Street, New York, NY 10012
                </p>
              </div>

              <div className="bg-[#EFE9DD]/60 p-6 border border-[#DDD5C7] space-y-4 rounded-none">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#17382C] uppercase tracking-wider">
                  <span className="w-2 h-2 bg-[#477A5B]" />
                  <span>Open Now • Serving Dinner</span>
                </div>

                <div className="space-y-2 text-xs text-[#22211F] font-sans">
                  <div className="flex justify-between py-1 border-b border-[#DDD5C7]/50">
                    <span className="font-medium text-[#716D66]">Monday – Thursday</span>
                    <span className="font-semibold text-[#17382C]">11 AM – 10 PM</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#DDD5C7]/50">
                    <span className="font-medium text-[#716D66]">Friday – Saturday</span>
                    <span className="font-semibold text-[#17382C]">11 AM – 11 PM</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="font-medium text-[#716D66]">Sunday</span>
                    <span className="font-semibold text-[#17382C]">11 AM – 9 PM</span>
                  </div>
                </div>
              </div>

              <div>
                <a
                  href="https://maps.google.com/?q=123+Mercer+Street+New+York+NY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex"
                >
                  <Button variant="primary" size="md" icon={Compass}>
                    GET DIRECTIONS
                  </Button>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="aspect-[4/3] border border-[#DDD5C7] bg-[#EFE9DD] relative rounded-none overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9?auto=format&fit=crop&w=1000&q=80"
                  alt="Mercer Street SoHo New York Neighborhood Map View"
                  className="w-full h-full object-cover rounded-none"
                />
                <div className="absolute inset-0 bg-[#17382C]/10" />
                
                <div className="absolute bottom-6 left-6 right-6 bg-[#F7F3EA] p-4 border border-[#DDD5C7] flex items-center justify-between rounded-none">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-[#17382C] text-[#F7F3EA] flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-[#B95F3B]" />
                    </div>
                    <div>
                      <div className="font-semibold text-xs text-[#17382C] uppercase tracking-wider">Ember &amp; Oak SoHo</div>
                      <div className="text-[11px] text-[#716D66]">123 Mercer St, NYC</div>
                    </div>
                  </div>
                  <span className="text-[10px] bg-[#17382C] text-[#F7F3EA] font-semibold px-2 py-0.5 uppercase tracking-wider">
                    OPEN
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Modals */}
      <WeekendOfferModal
        isOpen={offerModalOpen}
        onClose={() => setOfferModalOpen(false)}
      />

      <PrivateEventInquiryModal
        isOpen={eventModalOpen}
        onClose={() => setEventModalOpen(false)}
      />

    </div>
  );
};
