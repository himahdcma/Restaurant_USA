import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  ShoppingBag,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Check,
  Heart,
  Mail,
  Phone
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { PrivateEventInquiryModal } from '../components/common/PrivateEventInquiryModal';
import { CateringInquiryModal } from '../components/common/CateringInquiryModal';
import { GroupOrderModal } from '../components/common/GroupOrderModal';

export const CateringPage = () => {
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [cateringModalOpen, setCateringModalOpen] = useState(false);
  const [groupModalOpen, setGroupModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const handleOpenCateringPackage = (pkg) => {
    setSelectedPackage(pkg);
    setCateringModalOpen(true);
  };

  const cateringPackages = [
    {
      id: 'pkg_1',
      title: 'THE TEAM LUNCH',
      serves: 'Serves 6–8',
      price: 145,
      description: 'Ideal for office lunches & small team meetings.',
      includes: ['Choose 2 Mains', 'Choose 2 Sides', 'House Ranch Salad', 'Fresh Cookie Selection']
    },
    {
      id: 'pkg_2',
      title: 'THE GATHERING',
      serves: 'Serves 10–12',
      price: 235,
      description: 'Our most popular shared platter menu for celebrations & meetings.',
      includes: ['Choose 3 Mains', 'Choose 3 Sides', '2 Salad Choices', 'Artisan Dessert Platter']
    },
    {
      id: 'pkg_3',
      title: 'THE FULL TABLE',
      serves: 'Serves 15–20',
      price: 395,
      description: 'A complete wood-fired feast for larger groups & events.',
      includes: ['Choose 4 Mains', 'Choose 4 Sides', '2 Salad Choices', 'Desserts & House Beverages']
    }
  ];

  const faqs = [
    {
      q: 'HOW FAR IN ADVANCE SHOULD I INQUIRE?',
      a: "For private dining and seasonal events, earlier is always helpful — especially for weekends and autumn dates. For catering packages, 48 hours notice is recommended, though we accommodate shorter notice whenever possible."
    },
    {
      q: 'CAN YOU ACCOMMODATE DIETARY PREFERENCES?',
      a: "Yes! Our kitchen regularly prepares vegetarian, vegan, and gluten-friendly dishes. Please mention any dietary requirements in your inquiry so our team can guide menu choices."
    },
    {
      q: 'IS CATERING AVAILABLE FOR PICKUP AND DELIVERY?',
      a: "Both! Catering packages can be picked up directly at our SoHo location or delivered locally within Downtown Manhattan."
    },
    {
      q: 'CAN I HOST A LARGER PRIVATE EVENT OR FULL BUYOUT?',
      a: "Absolutely. We accommodate intimate groups of 10 to full restaurant buyouts for up to 80+ guests. Submit an event inquiry and our events director will get in touch with layout options."
    }
  ];

  return (
    <div className="bg-[#F7F3EA] min-h-screen text-[#22211F] font-sans pb-24">
      
      {/* 1. HERO */}
      <section className="relative min-h-[480px] flex items-center bg-[#10291F] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1920&q=80"
            alt="Ember & Oak Shared Private Dining Table Atmosphere"
            className="w-full h-full object-cover object-center filter brightness-75 rounded-none"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#10291F]/95 via-[#10291F]/80 to-[#10291F]/50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="max-w-2xl text-left space-y-5">
            <span className="text-xs font-semibold tracking-[0.16em] text-[#B95F3B] uppercase block">
              PRIVATE DINING &amp; CATERING
            </span>

            <h1 className="font-serif text-4xl sm:text-6xl text-white font-normal leading-[1.08]">
              Made for gathering.
            </h1>

            <p className="text-base sm:text-lg text-[#DDD5C7] font-light leading-relaxed max-w-xl">
              From team lunches to rehearsal dinners, we make it easy to bring people together around good wood-fired food.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Button
                variant="primary"
                size="md"
                onClick={() => setEventModalOpen(true)}
              >
                PLAN AN EVENT
              </Button>

              <a
                href="#catering-section"
                className="text-xs font-semibold uppercase tracking-widest text-[#F7F3EA] hover:text-[#B95F3B] transition-colors inline-flex items-center gap-1.5"
              >
                <span>EXPLORE CATERING</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 2. CHOOSE YOUR EXPERIENCE */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        
        <div className="space-y-8">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B95F3B] block">
            HOW CAN WE HELP?
          </span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <a
              href="#catering-section"
              className="bg-[#EFE9DD] p-8 border border-[#DDD5C7] text-left hover:border-[#17382C] transition-colors group flex flex-col justify-between rounded-none"
            >
              <div className="space-y-4">
                <div className="w-9 h-9 bg-[#17382C] text-[#F7F3EA] flex items-center justify-center font-bold">
                  <ShoppingBag className="w-4 h-4 text-[#B95F3B]" />
                </div>
                <h3 className="font-serif text-2xl text-[#17382C] group-hover:text-[#B95F3B] transition-colors">
                  Catering
                </h3>
                <p className="text-xs text-[#716D66] leading-relaxed">
                  Family-style food packages for meetings, offices, and celebrations delivered or ready for pickup.
                </p>
              </div>

              <div className="pt-8 text-xs font-semibold uppercase tracking-wider text-[#17382C] flex items-center gap-1.5 group-hover:text-[#B95F3B]">
                <span>View Packages</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </a>

            <a
              href="#group-order-section"
              className="bg-[#EFE9DD] p-8 border border-[#DDD5C7] text-left hover:border-[#17382C] transition-colors group flex flex-col justify-between rounded-none"
            >
              <div className="space-y-4">
                <div className="w-9 h-9 bg-[#17382C] text-[#F7F3EA] flex items-center justify-center font-bold">
                  <Users className="w-4 h-4 text-[#B95F3B]" />
                </div>
                <h3 className="font-serif text-2xl text-[#17382C] group-hover:text-[#B95F3B] transition-colors">
                  Group Ordering
                </h3>
                <p className="text-xs text-[#716D66] leading-relaxed">
                  Everyone chooses their own meal. Share a link with your team while one organizer manages final checkout.
                </p>
              </div>

              <div className="pt-8 text-xs font-semibold uppercase tracking-wider text-[#17382C] flex items-center gap-1.5 group-hover:text-[#B95F3B]">
                <span>Start Group Order</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </a>

            <a
              href="#private-dining-section"
              className="bg-[#EFE9DD] p-8 border border-[#DDD5C7] text-left hover:border-[#17382C] transition-colors group flex flex-col justify-between rounded-none"
            >
              <div className="space-y-4">
                <div className="w-9 h-9 bg-[#17382C] text-[#F7F3EA] flex items-center justify-center font-bold">
                  <Heart className="w-4 h-4 text-[#B95F3B]" />
                </div>
                <h3 className="font-serif text-2xl text-[#17382C] group-hover:text-[#B95F3B] transition-colors">
                  Private Dining
                </h3>
                <p className="text-xs text-[#716D66] leading-relaxed">
                  Rehearsal dinners, engagement celebrations, and business events hosted in our SoHo restaurant.
                </p>
              </div>

              <div className="pt-8 text-xs font-semibold uppercase tracking-wider text-[#17382C] flex items-center gap-1.5 group-hover:text-[#B95F3B]">
                <span>Plan an Event</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </a>

          </div>
        </div>

        {/* 3. CATERING PACKAGES */}
        <div id="catering-section" className="pt-24 space-y-10 scroll-mt-24">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#DDD5C7] pb-6">
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B95F3B] block">
                EMBER &amp; OAK CATERING
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#17382C]">
                Good food travels well.
              </h2>
            </div>

            <div className="flex flex-wrap gap-2 text-xs text-[#17382C] font-semibold uppercase tracking-wider">
              <span className="px-3 py-1 bg-[#EFE9DD] border border-[#DDD5C7]">Office Lunches</span>
              <span className="px-3 py-1 bg-[#EFE9DD] border border-[#DDD5C7]">Team Meetings</span>
              <span className="px-3 py-1 bg-[#EFE9DD] border border-[#DDD5C7]">Events</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cateringPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-[#EFE9DD] border border-[#DDD5C7] p-8 flex flex-col justify-between space-y-6 hover:border-[#17382C] transition-colors rounded-none"
              >
                <div className="space-y-5">
                  <div className="border-b border-[#DDD5C7] pb-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#B95F3B]">
                      {pkg.serves}
                    </span>
                    <h3 className="font-serif text-2xl text-[#17382C] mt-1">
                      {pkg.title}
                    </h3>
                    <div className="font-serif text-3xl text-[#17382C] mt-2 font-normal">
                      ${pkg.price}
                    </div>
                  </div>

                  <p className="text-xs text-[#716D66] leading-relaxed">
                    {pkg.description}
                  </p>

                  <div className="space-y-2 pt-2">
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-[#17382C] block">
                      INCLUDES:
                    </span>
                    <ul className="space-y-2 text-xs text-[#22211F]">
                      {pkg.includes.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#B95F3B] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    variant="primary"
                    size="md"
                    fullWidth
                    onClick={() => handleOpenCateringPackage(pkg)}
                  >
                    START CATERING ORDER
                  </Button>
                </div>

              </div>
            ))}
          </div>

        </div>

        {/* 4. GROUP ORDERING */}
        <div id="group-order-section" className="pt-24 space-y-8 scroll-mt-24">
          
          <div className="bg-[#17382C] text-[#F7F3EA] border border-[#10291F] p-8 sm:p-12 space-y-10 rounded-none">
            
            <div className="max-w-xl space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#B95F3B] block">
                GROUP ORDERING
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#F7F3EA]">
                Everyone gets what they want.
              </h2>
              <p className="text-sm text-[#DDD5C7] leading-relaxed">
                Start the order, share the link, and let everyone choose their own meal. You handle the final checkout.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-2 border-t border-white/15">
              
              <div className="space-y-2">
                <div className="text-xs font-bold text-[#B95F3B] uppercase tracking-widest">
                  STEP 01
                </div>
                <h4 className="font-serif text-lg text-white">
                  Start a Group Order
                </h4>
                <p className="text-xs text-[#DDD5C7] leading-relaxed">
                  Choose pickup or delivery and set an order deadline for your team.
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold text-[#B95F3B] uppercase tracking-widest">
                  STEP 02
                </div>
                <h4 className="font-serif text-lg text-white">
                  Share the Link
                </h4>
                <p className="text-xs text-[#DDD5C7] leading-relaxed">
                  Invite your team, friends or family to pick their favorite wood-fired dishes.
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold text-[#B95F3B] uppercase tracking-widest">
                  STEP 03
                </div>
                <h4 className="font-serif text-lg text-white">
                  Check Out Once
                </h4>
                <p className="text-xs text-[#DDD5C7] leading-relaxed">
                  Review everyone's selections and place one single order cleanly.
                </p>
              </div>

            </div>

            <div className="pt-2">
              <Button
                variant="primary"
                size="md"
                onClick={() => setGroupModalOpen(true)}
                className="bg-[#B95F3B] hover:bg-[#a25130]"
              >
                START A GROUP ORDER
              </Button>
            </div>

          </div>

        </div>

        {/* 5. PRIVATE DINING */}
        <div id="private-dining-section" className="pt-24 space-y-12 scroll-mt-24">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B95F3B] block">
                PRIVATE DINING &amp; WEDDINGS
              </span>

              <h2 className="font-serif text-3xl sm:text-5xl text-[#17382C] leading-tight">
                A beautiful table for a beautiful reason.
              </h2>

              <p className="text-sm text-[#716D66] leading-relaxed">
                From rehearsal dinners to intimate receptions, we create warm, memorable dining experiences around the people who matter most.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#DDD5C7] text-xs uppercase tracking-wider font-sans">
                <div>
                  <span className="font-semibold text-[#17382C] block">INTIMATE DINNERS</span>
                  <span className="text-[#716D66]">Up to 12 guests</span>
                </div>
                <div>
                  <span className="font-semibold text-[#17382C] block">PRIVATE DINING</span>
                  <span className="text-[#716D66]">Up to 30 guests</span>
                </div>
                <div>
                  <span className="font-semibold text-[#17382C] block">FULL BUYOUT</span>
                  <span className="text-[#716D66]">Up to 80+ guests</span>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setEventModalOpen(true)}
                >
                  PLAN YOUR EVENT
                </Button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="border border-[#DDD5C7] relative h-[360px] sm:h-[420px] rounded-none overflow-hidden bg-[#10291F]">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
                  alt="Ember & Oak Private Dining Interior Room Candlelight"
                  className="w-full h-full object-cover filter brightness-[0.85] rounded-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#10291F]/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="text-[10px] font-semibold tracking-widest text-[#B95F3B] uppercase block">
                    WEDDING SEASON (SEPTEMBER — NOVEMBER)
                  </span>
                  <div className="font-serif text-lg text-[#F7F3EA]">
                    Now booking autumn private dining &amp; rehearsal celebrations.
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="bg-[#EFE9DD] p-8 border border-[#DDD5C7] space-y-3 rounded-none">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B95F3B] block">
              CELEBRATIONS WE HOST
            </span>
            <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-[#17382C] font-semibold uppercase tracking-wider">
              <span>Rehearsal Dinners</span>
              <span className="hidden sm:inline text-[#716D66]">•</span>
              <span>Engagement Dinners</span>
              <span className="hidden sm:inline text-[#716D66]">•</span>
              <span>Intimate Receptions</span>
              <span className="hidden sm:inline text-[#716D66]">•</span>
              <span>Bridal Celebrations</span>
              <span className="hidden sm:inline text-[#716D66]">•</span>
              <span>Anniversary Dinners</span>
            </div>
          </div>

        </div>

        {/* 6. FAQ */}
        <div className="pt-24 space-y-8">
          <div className="text-center space-y-1 max-w-xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B95F3B] block">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="font-serif text-3xl text-[#17382C]">
              Planning Your Event
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#EFE9DD] border border-[#DDD5C7] overflow-hidden transition-colors rounded-none"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 text-left flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#17382C]"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-[#B95F3B]" /> : <ChevronDown className="w-4 h-4 text-[#716D66]" />}
                  </button>

                  {isOpen && (
                    <div className="p-4 pt-0 border-t border-[#DDD5C7]/60 text-xs text-[#716D66] leading-relaxed font-sans">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 7. CONTACT FOOTER */}
        <div className="mt-24 pt-16 border-t border-[#DDD5C7] text-center space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B95F3B] block">
              PLAN SOMETHING TOGETHER
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#17382C]">
              Ember &amp; Oak SoHo
            </h2>
            <p className="text-sm text-[#716D66]">
              123 Mercer Street, New York, NY 10012
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#17382C] font-semibold uppercase tracking-wider">
            <div className="flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-[#B95F3B]" />
              <span>Events: <strong>events@emberandoak.example</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-[#B95F3B]" />
              <span>(212) 555-0198</span>
            </div>
          </div>

          <div className="pt-2">
            <Button
              variant="primary"
              size="md"
              onClick={() => setEventModalOpen(true)}
            >
              START AN INQUIRY
            </Button>
          </div>
        </div>

      </div>

      {/* MODALS */}
      <PrivateEventInquiryModal
        isOpen={eventModalOpen}
        onClose={() => setEventModalOpen(false)}
      />

      <CateringInquiryModal
        isOpen={cateringModalOpen}
        onClose={() => setCateringModalOpen(false)}
        selectedPackage={selectedPackage}
      />

      <GroupOrderModal
        isOpen={groupModalOpen}
        onClose={() => setGroupModalOpen(false)}
      />

    </div>
  );
};
