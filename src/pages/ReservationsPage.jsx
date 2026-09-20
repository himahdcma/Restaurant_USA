import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar as CalendarIcon,
  Clock,
  Users,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Check,
  CheckCircle2,
  Sparkles,
  Sun,
  Utensils,
  Wine,
  Heart,
  ArrowRight,
  Edit3,
  Download,
  Navigation,
  Info,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  Phone,
  Mail
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { restaurantInfo } from '../data/restaurantData';

// Helper: Format Date to readable strings
const formatDateLong = (dateObj) => {
  if (!dateObj) return '';
  return dateObj.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

const formatDateShort = (dateObj) => {
  if (!dateObj) return '';
  return dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
};

// Helper to get YYYY-MM-DD
const toISODateString = (d) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const ReservationsPage = () => {
  // Current date initialization
  const today = useMemo(() => new Date(), []);
  
  // State for Booking Journey
  const [step, setStep] = useState(1); // 1: Table & Time, 2: Details & Review, 3: Confirmation
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Step 1 State
  const [partySize, setPartySize] = useState(2);
  const [currentMonth, setCurrentMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(() => {
    // Default to tomorrow or next Friday if today is late
    const defaultD = new Date(today);
    defaultD.setDate(defaultD.getDate() + 1);
    return defaultD;
  });
  const [selectedTime, setSelectedTime] = useState('7:30 PM');
  const [seatingPreference, setSeatingPreference] = useState('no-preference');
  const [occasion, setOccasion] = useState('Just Dinner');
  const [occasionNotes, setOccasionNotes] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // Step 2 State (Guest Details)
  const [guestInfo, setGuestInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    receiveText: true,
    receiveEmail: true
  });

  const [formErrors, setFormErrors] = useState({});
  const [reservationId, setReservationId] = useState('');

  // Seating options definition
  const seatingOptions = [
    {
      id: 'indoor',
      label: 'INDOOR',
      sub: 'Warm dining room',
      icon: Utensils
    },
    {
      id: 'patio',
      label: 'PATIO',
      sub: 'Outdoor seating',
      icon: Sun
    },
    {
      id: 'bar',
      label: 'BAR',
      sub: 'Counter seating',
      icon: Wine
    },
    {
      id: 'no-preference',
      label: 'NO PREFERENCE',
      sub: 'First available',
      icon: Sparkles
    }
  ];

  // Occasions list
  const occasionsList = [
    'Birthday',
    'Anniversary',
    'Date Night',
    'Business Dinner',
    'Engagement',
    'Just Dinner',
    'Other'
  ];

  // Mock deterministic time slots based on date & party size
  const timeSlots = useMemo(() => {
    const isWeekend = selectedDate ? (selectedDate.getDay() === 5 || selectedDate.getDay() === 6) : false;
    
    return [
      { time: '5:00 PM', period: 'Dinner', available: true, label: null },
      { time: '5:30 PM', period: 'Dinner', available: true, label: 'Indoor & patio' },
      { time: '6:00 PM', period: 'Dinner', available: !isWeekend || partySize < 6, label: !isWeekend ? 'Indoor available' : 'Unavailable' },
      { time: '6:30 PM', period: 'Dinner', available: true, label: 'Patio only' },
      { time: '7:00 PM', period: 'Dinner', available: true, label: 'Popular time' },
      { time: '7:30 PM', period: 'Dinner', available: true, label: 'Popular time' },
      { time: '8:00 PM', period: 'Dinner', available: true, label: null },
      { time: '8:30 PM', period: 'Dinner', available: true, label: 'Late seating' },
      { time: '9:00 PM', period: 'Dinner', available: true, label: null }
    ];
  }, [selectedDate, partySize]);

  // Calendar calculations
  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    
    // Blank padded cells before month start
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(null);
    }
    
    // Actual month days
    for (let day = 1; day <= totalDays; day++) {
      const d = new Date(year, month, day);
      days.push(d);
    }
    
    return days;
  }, [currentMonth]);

  // Quick Date Shortcut Handlers
  const setQuickDate = (type) => {
    const newD = new Date(today);
    if (type === 'today') {
      // today
    } else if (type === 'tomorrow') {
      newD.setDate(newD.getDate() + 1);
    } else if (type === 'friday') {
      const day = newD.getDay();
      const diff = (5 - day + 7) % 7 || 7;
      newD.setDate(newD.getDate() + diff);
    } else if (type === 'saturday') {
      const day = newD.getDay();
      const diff = (6 - day + 7) % 7 || 7;
      newD.setDate(newD.getDate() + diff);
    }
    setSelectedDate(newD);
    setCurrentMonth(new Date(newD.getFullYear(), newD.getMonth(), 1));
  };

  // Month navigation
  const prevMonth = () => {
    const prev = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    if (prev.getMonth() >= today.getMonth() || prev.getFullYear() > today.getFullYear()) {
      setCurrentMonth(prev);
    }
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const isPastDate = (d) => {
    if (!d) return true;
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return d < startOfToday;
  };

  const isSameDay = (d1, d2) => {
    if (!d1 || !d2) return false;
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  // Form Field Validation
  const validateForm = () => {
    const errors = {};
    if (!guestInfo.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    if (!guestInfo.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    if (!guestInfo.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guestInfo.email.trim())) {
      errors.email = 'Enter a valid email address';
    }
    if (!guestInfo.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (guestInfo.phone.replace(/\D/g, '').length < 7) {
      errors.phone = 'Enter a valid phone number';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submission handler
  const handleConfirmReservation = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate short 1100ms hospitality delay
    setTimeout(() => {
      const mockId = `EO${Math.floor(1000 + Math.random() * 9000)}`;
      setReservationId(mockId);
      setIsSubmitting(false);
      setStep(3); // Go to Confirmation Success
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1100);
  };

  // ICS Calendar Generator
  const handleAddToCalendar = () => {
    if (!selectedDate) return;
    
    // Parse time
    const [timeStr, period] = selectedTime.split(' ');
    let [hours, minutes] = timeStr.split(':').map(Number);
    if (period === 'PM' && hours < 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;

    const start = new Date(selectedDate);
    start.setHours(hours, minutes, 0);

    const end = new Date(start);
    end.setHours(start.getHours() + 2); // 2 hour duration

    const formatICSDate = (d) => {
      return d.toISOString().replace(/-|:|\.\d+/g, '');
    };

    const title = 'Reservation at Ember & Oak';
    const description = `Ember & Oak Reservation #${reservationId}\\nParty of ${partySize}\\nSeating: ${seatingOptions.find(s => s.id === seatingPreference)?.label}\\nOccasion: ${occasion}`;
    const location = '123 Mercer Street, New York, NY 10012';

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Ember & Oak Kitchen//Reservations//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      `DTSTART:${formatICSDate(start)}`,
      `DTEND:${formatICSDate(end)}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Ember-Oak-Reservation-${reservationId}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Google Maps Directions link
  const handleGetDirections = () => {
    window.open(
      'https://www.google.com/maps/search/?api=1&query=123+Mercer+Street+New+York+NY+10012',
      '_blank',
      'noopener,noreferrer'
    );
  };

  // Personalized Occasion Copy for Confirmation
  const getOccasionConfirmationMessage = () => {
    switch (occasion) {
      case 'Anniversary':
        return "We're honored to be part of your anniversary celebration.";
      case 'Birthday':
        return "We'll help make your birthday celebration exceptional.";
      case 'Engagement':
        return "Congratulations — we look forward to celebrating with you.";
      case 'Business Dinner':
        return "We will ensure a quiet, seamless dining experience for your team.";
      case 'Date Night':
        return "We've reserved a welcoming table for your date night.";
      default:
        return "We look forward to hosting you for an exceptional evening.";
    }
  };

  return (
    <div className="bg-[#F7F3EA] min-h-screen text-[#22211F] font-sans pb-16">

      {/* ============================================================
          1. RESERVATION HERO (320-420px height)
         ============================================================ */}
      <section className="relative h-[340px] sm:h-[400px] flex items-center bg-[#10291F] text-white overflow-hidden">
        {/* Warm Dining Background Photography */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80"
            alt="Ember & Oak Candlelight Dining Atmosphere"
            className="w-full h-full object-cover object-center filter brightness-[0.75]"
          />
          {/* Subtle Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#10291F]/95 via-[#10291F]/80 to-[#10291F]/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#10291F] via-transparent to-transparent opacity-90" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-xl text-left space-y-3">
            
            {/* Editorial Eyebrow (Pure Typography ONLY - NO pill background!) */}
            <span className="text-xs font-semibold tracking-widest text-[#B95F3B] uppercase block">
              RESERVATIONS
            </span>

            {/* Headline */}
            <h1 className="font-serif-display text-3xl sm:text-5xl lg:text-6xl font-normal leading-tight text-white">
              Your table is waiting.
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-[#DDD5C7] font-light leading-relaxed">
              Dinner with friends, date night, or something worth celebrating.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-[#DDD5C7]/90 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#477A5B] animate-pulse" />
              <span>Reservations available tonight & upcoming weeks</span>
            </div>

          </div>
        </div>
      </section>


      {/* ============================================================
          2. MAIN RESERVATION EXPERIENCE WRAPPER (~1000–1100px max width)
         ============================================================ */}
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        
        {/* Restrained Progress Indicator */}
        <div className="border-b border-[#DDD5C7] pb-6 mb-8 sm:mb-12">
          <div className="flex items-center justify-between max-w-2xl mx-auto text-xs sm:text-sm">
            
            {/* Step 1 */}
            <button
              type="button"
              onClick={() => step > 1 && step < 3 && setStep(1)}
              className={`flex items-center gap-2 transition-all ${
                step === 1
                  ? 'text-[#17382C] font-bold'
                  : step > 1
                  ? 'text-[#477A5B] hover:text-[#17382C]'
                  : 'text-[#716D66]'
              }`}
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                step === 1 ? 'bg-[#17382C] text-white' : step > 1 ? 'bg-[#477A5B] text-white' : 'bg-[#DDD5C7] text-[#716D66]'
              }`}>
                01
              </span>
              <span className="tracking-wider uppercase">FIND A TABLE</span>
            </button>

            <div className={`flex-1 mx-3 sm:mx-6 h-px ${step >= 2 ? 'bg-[#477A5B]' : 'bg-[#DDD5C7]'}`} />

            {/* Step 2 */}
            <button
              type="button"
              onClick={() => step === 2 && setStep(2)}
              className={`flex items-center gap-2 transition-all ${
                step === 2
                  ? 'text-[#17382C] font-bold'
                  : step > 2
                  ? 'text-[#477A5B]'
                  : 'text-[#716D66]'
              }`}
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                step === 2 ? 'bg-[#17382C] text-white' : step > 2 ? 'bg-[#477A5B] text-white' : 'bg-[#DDD5C7] text-[#716D66]'
              }`}>
                02
              </span>
              <span className="tracking-wider uppercase">YOUR DETAILS</span>
            </button>

            <div className={`flex-1 mx-3 sm:mx-6 h-px ${step === 3 ? 'bg-[#477A5B]' : 'bg-[#DDD5C7]'}`} />

            {/* Step 3 */}
            <div className={`flex items-center gap-2 ${step === 3 ? 'text-[#17382C] font-bold' : 'text-[#716D66]'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                step === 3 ? 'bg-[#17382C] text-white' : 'bg-[#DDD5C7] text-[#716D66]'
              }`}>
                03
              </span>
              <span className="tracking-wider uppercase">CONFIRMATION</span>
            </div>

          </div>
        </div>


        {/* ============================================================
            STEP 1 & STEP 2 DESKTOP LAYOUT (Grid with Live Sidebar)
           ============================================================ */}
        {step < 3 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* LEFT MAIN INTERACTION AREA (Cols 1-7 or 1-8) */}
            <div className="lg:col-span-8 space-y-10">

              {/* STEP 1: FIND A TABLE */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-10"
                >
                  {/* Party Size Header & Selector */}
                  <div className="space-y-4">
                    <div>
                      <h2 className="font-serif-display text-2xl sm:text-3xl text-[#17382C]">
                        Let's find your table.
                      </h2>
                      <p className="text-sm text-[#716D66] mt-1">
                        Tell us who's joining.
                      </p>
                    </div>

                    {/* Party Size Counter */}
                    <div className="flex items-center gap-4 bg-[#EFE9DD] p-2 border border-[#DDD5C7] w-fit">
                      <button
                        type="button"
                        onClick={() => setPartySize(prev => Math.max(1, prev - 1))}
                        disabled={partySize <= 1}
                        className="w-10 h-10 bg-[#F7F3EA] border border-[#DDD5C7] text-[#17382C] font-bold flex items-center justify-center hover:bg-white disabled:opacity-40 transition-all text-lg"
                      >
                        −
                      </button>

                      <div className="px-4 text-center min-w-[110px]">
                        <span className="font-serif-display text-2xl text-[#17382C] block font-medium">
                          {partySize} {partySize === 1 ? 'Guest' : 'Guests'}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => setPartySize(prev => Math.min(12, prev + 1))}
                        disabled={partySize >= 12}
                        className="w-10 h-10 bg-[#F7F3EA] border border-[#DDD5C7] text-[#17382C] font-bold flex items-center justify-center hover:bg-white disabled:opacity-40 transition-all text-lg"
                      >
                        +
                      </button>
                    </div>

                    {/* Large Party Callout (> 8 guests) */}
                    {partySize > 8 && (
                      <div className="p-3.5 bg-[#EFE9DD]/80 border border-[#B95F3B]/30 text-xs text-[#22211F] flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-[#B95F3B] shrink-0" />
                          <span>Planning something larger? For parties over 8 guests, explore our Private Dining options.</span>
                        </div>
                        <Link to="/catering" className="text-[#B95F3B] font-semibold hover:underline shrink-0 flex items-center gap-1">
                          Explore Private Dining →
                        </Link>
                      </div>
                    )}
                  </div>

                  <hr className="border-[#DDD5C7]" />

                  {/* Date Selection Section */}
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <span className="text-xs font-semibold uppercase tracking-widest text-[#B95F3B] block">
                        SELECT DATE
                      </span>

                      {/* Quick Date Shortcuts */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <button
                          type="button"
                          onClick={() => setQuickDate('today')}
                          className="px-3 py-1 border border-[#DDD5C7] text-xs font-medium bg-[#F7F3EA] hover:border-[#17382C] text-[#22211F] transition-all"
                        >
                          Today
                        </button>
                        <button
                          type="button"
                          onClick={() => setQuickDate('tomorrow')}
                          className="px-3 py-1 border border-[#DDD5C7] text-xs font-medium bg-[#F7F3EA] hover:border-[#17382C] text-[#22211F] transition-all"
                        >
                          Tomorrow
                        </button>
                        <button
                          type="button"
                          onClick={() => setQuickDate('friday')}
                          className="px-3 py-1 border border-[#DDD5C7] text-xs font-medium bg-[#F7F3EA] hover:border-[#17382C] text-[#22211F] transition-all"
                        >
                          Friday
                        </button>
                        <button
                          type="button"
                          onClick={() => setQuickDate('saturday')}
                          className="px-3 py-1 border border-[#DDD5C7] text-xs font-medium bg-[#F7F3EA] hover:border-[#17382C] text-[#22211F] transition-all"
                        >
                          Saturday
                        </button>
                      </div>
                    </div>

                    {/* Custom Compact Interactive Calendar */}
                    <div className="bg-[#EFE9DD] p-4 sm:p-6 border border-[#DDD5C7] space-y-4">
                      {/* Calendar Month Header */}
                      <div className="flex items-center justify-between px-2">
                        <h3 className="font-serif-display text-lg text-[#17382C] font-semibold">
                          {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </h3>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={prevMonth}
                            className="p-1.5 border border-[#DDD5C7] bg-[#F7F3EA] hover:bg-white text-[#17382C] transition-all"
                            aria-label="Previous month"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={nextMonth}
                            className="p-1.5 border border-[#DDD5C7] bg-[#F7F3EA] hover:bg-white text-[#17382C] transition-all"
                            aria-label="Next month"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Day Labels Header */}
                      <div className="grid grid-cols-7 text-center text-xs font-semibold text-[#716D66] py-1 border-b border-[#DDD5C7]/60">
                        <span>Sun</span>
                        <span>Mon</span>
                        <span>Tue</span>
                        <span>Wed</span>
                        <span>Thu</span>
                        <span>Fri</span>
                        <span>Sat</span>
                      </div>

                      {/* Calendar Grid */}
                      <div className="grid grid-cols-7 gap-1 text-center">
                        {calendarDays.map((d, idx) => {
                          if (!d) {
                            return <div key={`empty-${idx}`} className="h-9 sm:h-11" />;
                          }

                          const disabled = isPastDate(d);
                          const isSelected = selectedDate && isSameDay(d, selectedDate);
                          const isTodayDate = isSameDay(d, today);

                          return (
                            <button
                              key={d.toISOString()}
                              type="button"
                              disabled={disabled}
                              onClick={() => setSelectedDate(d)}
                              className={`h-9 sm:h-11 text-sm font-medium transition-all flex flex-col items-center justify-center relative ${
                                isSelected
                                  ? 'bg-[#17382C] text-[#F7F3EA] font-semibold'
                                  : disabled
                                  ? 'text-[#716D66]/40 cursor-not-allowed'
                                  : 'text-[#22211F] hover:bg-[#F7F3EA] hover:border hover:border-[#17382C]'
                              }`}
                            >
                              <span>{d.getDate()}</span>
                              {isTodayDate && !isSelected && (
                                <span className="w-1 h-1 bg-[#B95F3B] absolute bottom-1" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <hr className="border-[#DDD5C7]" />

                  {/* Available Time Slots Section */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      {/* Pure Typography Eyebrow */}
                      <span className="text-xs font-semibold uppercase tracking-widest text-[#B95F3B] block">
                        AVAILABLE TIMES
                      </span>
                      <span className="text-xs text-[#716D66]">
                        {formatDateShort(selectedDate)} • Dinner Service
                      </span>
                    </div>

                    {/* Time Slot Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {timeSlots.map((slot) => {
                        const isSelected = selectedTime === slot.time;
                        return (
                          <button
                            key={slot.time}
                            type="button"
                            disabled={!slot.available}
                            onClick={() => setSelectedTime(slot.time)}
                            className={`p-3 rounded-xl border text-center transition-all ${
                              isSelected
                                ? 'bg-[#17382C] text-white border-[#17382C] shadow-sm ring-2 ring-[#17382C]/30'
                                : !slot.available
                                ? 'bg-[#EFE9DD]/50 border-[#DDD5C7]/50 text-[#716D66]/50 cursor-not-allowed opacity-60'
                                : 'bg-[#F7F3EA] border-[#DDD5C7] text-[#22211F] hover:border-[#17382C]'
                            }`}
                          >
                            <div className="font-semibold text-sm">
                              {slot.time}
                            </div>
                            <div className={`text-[11px] mt-0.5 ${
                              isSelected
                                ? 'text-[#DDD5C7]'
                                : !slot.available
                                ? 'text-[#716D66]/50'
                                : 'text-[#716D66]'
                            }`}>
                              {slot.available ? (slot.label || 'Available') : 'Unavailable'}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <hr className="border-[#DDD5C7]" />

                  {/* Seating Preference Section */}
                  <div className="space-y-4">
                    {/* Pure Typography Eyebrow */}
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#B95F3B] block">
                      SEATING PREFERENCE
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {seatingOptions.map((option) => {
                        const Icon = option.icon;
                        const isSelected = seatingPreference === option.id;
                        return (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => setSeatingPreference(option.id)}
                            className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all ${
                              isSelected
                                ? 'bg-[#17382C] text-white border-[#17382C] shadow-sm'
                                : 'bg-[#F7F3EA] text-[#22211F] border-[#DDD5C7] hover:border-[#17382C]'
                            }`}
                          >
                            <div className={`p-2 rounded-lg shrink-0 ${
                              isSelected ? 'bg-[#10291F] text-[#B95F3B]' : 'bg-[#EFE9DD] text-[#17382C]'
                            }`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="font-semibold text-xs tracking-wider uppercase">
                                {option.label}
                              </div>
                              <div className={`text-xs mt-0.5 ${isSelected ? 'text-[#DDD5C7]' : 'text-[#716D66]'}`}>
                                {option.sub}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <hr className="border-[#DDD5C7]" />

                  {/* Occasion Personalization Section */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-serif-display text-xl text-[#17382C]">
                        Are we celebrating something?
                      </h3>
                      <p className="text-xs text-[#716D66] mt-0.5">
                        Let us know so our team can prepare for your visit.
                      </p>
                    </div>

                    {/* Occasion Chips */}
                    <div className="flex flex-wrap gap-2">
                      {occasionsList.map((occ) => {
                        const isSelected = occasion === occ;
                        return (
                          <button
                            key={occ}
                            type="button"
                            onClick={() => setOccasion(occ)}
                            className={`px-3.5 py-2 rounded-full border text-xs font-medium transition-all ${
                              isSelected
                                ? 'bg-[#17382C] text-white border-[#17382C]'
                                : 'bg-[#F7F3EA] border-[#DDD5C7] text-[#22211F] hover:border-[#17382C]'
                            }`}
                          >
                            {occ}
                          </button>
                        );
                      })}
                    </div>

                    {/* Optional Occasion Details if Birthday / Anniversary / Engagement */}
                    {['Birthday', 'Anniversary', 'Engagement'].includes(occasion) && (
                      <div className="pt-2 space-y-1.5 animate-fade-in">
                        <label className="text-xs font-medium text-[#17382C] block">
                          Anything you'd like us to know for this {occasion.toLowerCase()}? (Optional)
                        </label>
                        <input
                          type="text"
                          value={occasionNotes}
                          onChange={(e) => setOccasionNotes(e.target.value)}
                          placeholder={`E.g., We're celebrating Sarah's ${occasion.toLowerCase()}...`}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD5C7] bg-[#F7F3EA] text-sm text-[#22211F] focus:outline-none focus:border-[#17382C] focus:ring-1 focus:ring-[#17382C]"
                        />
                      </div>
                    )}
                  </div>

                  <hr className="border-[#DDD5C7]" />

                  {/* Special Requests Section */}
                  <div className="space-y-3">
                    {/* Pure Typography Eyebrow */}
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#B95F3B] block">
                      SPECIAL REQUESTS
                    </span>

                    <textarea
                      rows={3}
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      placeholder="Accessibility needs, dietary notes, high chair, window table preference..."
                      className="w-full p-3.5 rounded-xl border border-[#DDD5C7] bg-[#F7F3EA] text-sm text-[#22211F] focus:outline-none focus:border-[#17382C] focus:ring-1 focus:ring-[#17382C]"
                    />

                    <p className="text-[11px] text-[#716D66] italic">
                      We'll do our best to accommodate requests, but some requests may depend on seating availability upon arrival.
                    </p>
                  </div>

                  {/* Continue Button */}
                  <div className="pt-4">
                    <Button
                      variant="primary"
                      size="lg"
                      fullWidth
                      onClick={() => setStep(2)}
                      disabled={!selectedDate || !selectedTime}
                      icon={ArrowRight}
                      iconPosition="right"
                    >
                      CONTINUE TO GUEST DETAILS
                    </Button>
                  </div>

                </motion.div>
              )}


              {/* STEP 2: GUEST DETAILS & REVIEW */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  {/* Step Header */}
                  <div>
                    <h2 className="font-serif-display text-2xl sm:text-3xl text-[#17382C]">
                      Almost there.
                    </h2>
                    <p className="text-sm text-[#716D66] mt-1">
                      We'll use these details to hold your reservation.
                    </p>
                  </div>

                  {/* Inline Summary Review Card with Edit Links */}
                  <div className="bg-[#EFE9DD] p-5 rounded-2xl border border-[#DDD5C7] space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold tracking-widest text-[#B95F3B] uppercase">
                        RESERVATION SUMMARY
                      </span>
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-xs text-[#17382C] font-semibold hover:underline flex items-center gap-1"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        Edit Selection
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs pt-1">
                      <div>
                        <span className="text-[#716D66] block text-[11px] uppercase tracking-wider">Date</span>
                        <span className="font-semibold text-[#17382C] text-sm block mt-0.5">
                          {formatDateShort(selectedDate)}
                        </span>
                      </div>
                      <div>
                        <span className="text-[#716D66] block text-[11px] uppercase tracking-wider">Time</span>
                        <span className="font-semibold text-[#17382C] text-sm block mt-0.5">
                          {selectedTime}
                        </span>
                      </div>
                      <div>
                        <span className="text-[#716D66] block text-[11px] uppercase tracking-wider">Party</span>
                        <span className="font-semibold text-[#17382C] text-sm block mt-0.5">
                          {partySize} Guests
                        </span>
                      </div>
                      <div>
                        <span className="text-[#716D66] block text-[11px] uppercase tracking-wider">Seating</span>
                        <span className="font-semibold text-[#17382C] text-sm block mt-0.5 capitalize">
                          {seatingOptions.find(s => s.id === seatingPreference)?.label}
                        </span>
                      </div>
                    </div>

                    {occasion && occasion !== 'Just Dinner' && (
                      <div className="pt-2 border-t border-[#DDD5C7]/70 text-xs flex items-center gap-2 text-[#17382C]">
                        <Heart className="w-3.5 h-3.5 text-[#B95F3B]" />
                        <span>Celebrating: <strong>{occasion}</strong></span>
                        {occasionNotes && <span className="text-[#716D66]">({occasionNotes})</span>}
                      </div>
                    )}
                  </div>

                  {/* Guest Information Form */}
                  <form onSubmit={handleConfirmReservation} className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-serif-display text-xl text-[#17382C]">
                        Guest Information
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* First Name */}
                        <div>
                          <label className="text-xs font-semibold text-[#17382C] block mb-1">
                            First Name *
                          </label>
                          <input
                            type="text"
                            value={guestInfo.firstName}
                            onChange={(e) => setGuestInfo({ ...guestInfo, firstName: e.target.value })}
                            className={`w-full px-3.5 py-2.5 rounded-sm border bg-white text-base sm:text-sm text-[#22211F] focus:outline-none ${
                              formErrors.firstName ? 'border-red-500' : 'border-[#DDD5C7] focus:border-[#17382C] focus:ring-1 focus:ring-[#17382C]'
                            }`}
                            placeholder="Alex"
                          />
                          {formErrors.firstName && (
                            <span className="text-xs text-red-600 mt-1 block">{formErrors.firstName}</span>
                          )}
                        </div>

                        {/* Last Name */}
                        <div>
                          <label className="text-xs font-semibold text-[#17382C] block mb-1">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            value={guestInfo.lastName}
                            onChange={(e) => setGuestInfo({ ...guestInfo, lastName: e.target.value })}
                            className={`w-full px-3.5 py-2.5 rounded-sm border bg-white text-base sm:text-sm text-[#22211F] focus:outline-none ${
                              formErrors.lastName ? 'border-red-500' : 'border-[#DDD5C7] focus:border-[#17382C] focus:ring-1 focus:ring-[#17382C]'
                            }`}
                            placeholder="Morgan"
                          />
                          {formErrors.lastName && (
                            <span className="text-xs text-red-600 mt-1 block">{formErrors.lastName}</span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Email */}
                        <div>
                          <label className="text-xs font-semibold text-[#17382C] block mb-1">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            value={guestInfo.email}
                            onChange={(e) => setGuestInfo({ ...guestInfo, email: e.target.value })}
                            className={`w-full px-3.5 py-2.5 rounded-sm border bg-white text-base sm:text-sm text-[#22211F] focus:outline-none ${
                              formErrors.email ? 'border-red-500' : 'border-[#DDD5C7] focus:border-[#17382C] focus:ring-1 focus:ring-[#17382C]'
                            }`}
                            placeholder="alex@example.com"
                          />
                          {formErrors.email && (
                            <span className="text-xs text-red-600 mt-1 block">{formErrors.email}</span>
                          )}
                        </div>

                        {/* Phone */}
                        <div>
                          <label className="text-xs font-semibold text-[#17382C] block mb-1">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            value={guestInfo.phone}
                            onChange={(e) => setGuestInfo({ ...guestInfo, phone: e.target.value })}
                            className={`w-full px-3.5 py-2.5 rounded-sm border bg-white text-base sm:text-sm text-[#22211F] focus:outline-none ${
                              formErrors.phone ? 'border-red-500' : 'border-[#DDD5C7] focus:border-[#17382C] focus:ring-1 focus:ring-[#17382C]'
                            }`}
                            placeholder="(212) 555-0184"
                          />
                          {formErrors.phone && (
                            <span className="text-xs text-red-600 mt-1 block">{formErrors.phone}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Contact Preferences */}
                    <div className="pt-2 space-y-2">
                      <span className="text-xs font-semibold text-[#17382C] block">
                        Reservation Updates & Reminders
                      </span>
                      <div className="flex items-center gap-6 text-xs text-[#22211F]">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={guestInfo.receiveText}
                            onChange={(e) => setGuestInfo({ ...guestInfo, receiveText: e.target.checked })}
                            className="rounded border-[#DDD5C7] text-[#17382C] focus:ring-[#17382C]"
                          />
                          <span>Text message SMS</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={guestInfo.receiveEmail}
                            onChange={(e) => setGuestInfo({ ...guestInfo, receiveEmail: e.target.checked })}
                            className="rounded border-[#DDD5C7] text-[#17382C] focus:ring-[#17382C]"
                          />
                          <span>Email confirmation</span>
                        </label>
                      </div>
                    </div>

                    {/* Reservation Hold Policy Note */}
                    <div className="p-3.5 bg-[#EFE9DD]/70 rounded-xl border border-[#DDD5C7] text-xs text-[#716D66] flex items-start gap-2.5">
                      <Info className="w-4 h-4 text-[#B95F3B] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#17382C]">Hospitality Policy:</strong> We'll hold your table for 15 minutes past your reservation time. If running late, please give us a quick call.
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        onClick={() => setStep(1)}
                        className="w-full sm:w-auto"
                      >
                        ← BACK TO SELECTION
                      </Button>

                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        fullWidth
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Confirming your table...
                          </span>
                        ) : (
                          'CONFIRM RESERVATION'
                        )}
                      </Button>
                    </div>

                  </form>
                </motion.div>
              )}

            </div>


            {/* RIGHT SIDEBAR: LIVE RESERVATION SUMMARY (Desktop ~320px) */}
            <div className="hidden lg:block lg:col-span-4 sticky top-28 space-y-6">
              <div className="bg-[#EFE9DD] rounded-2xl border border-[#DDD5C7] overflow-hidden shadow-sm">
                
                {/* Image Header */}
                <div className="h-32 relative">
                  <img
                    src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=600&q=80"
                    alt="Ember & Oak Restaurant Interior"
                    className="w-full h-full object-cover filter brightness-[0.85]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#EFE9DD] via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 text-xs font-semibold uppercase tracking-widest text-[#17382C]">
                    YOUR RESERVATION
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  {/* Selections live summary */}
                  <div className="space-y-3 text-xs">
                    
                    {/* Party */}
                    <div className="flex items-center justify-between border-b border-[#DDD5C7]/70 pb-2.5">
                      <span className="text-[#716D66]">Guests</span>
                      <span className="font-semibold text-[#17382C]">
                        {partySize} {partySize === 1 ? 'Guest' : 'Guests'}
                      </span>
                    </div>

                    {/* Date */}
                    <div className="flex items-center justify-between border-b border-[#DDD5C7]/70 pb-2.5">
                      <span className="text-[#716D66]">Date</span>
                      <span className="font-semibold text-[#17382C]">
                        {formatDateShort(selectedDate)}
                      </span>
                    </div>

                    {/* Time */}
                    <div className="flex items-center justify-between border-b border-[#DDD5C7]/70 pb-2.5">
                      <span className="text-[#716D66]">Time</span>
                      <span className="font-semibold text-[#17382C]">
                        {selectedTime}
                      </span>
                    </div>

                    {/* Seating */}
                    <div className="flex items-center justify-between border-b border-[#DDD5C7]/70 pb-2.5">
                      <span className="text-[#716D66]">Seating</span>
                      <span className="font-semibold text-[#17382C] capitalize">
                        {seatingOptions.find(s => s.id === seatingPreference)?.label}
                      </span>
                    </div>

                    {/* Occasion */}
                    {occasion && (
                      <div className="flex items-center justify-between pb-1">
                        <span className="text-[#716D66]">Occasion</span>
                        <span className="font-semibold text-[#B95F3B]">
                          {occasion}
                        </span>
                      </div>
                    )}

                  </div>

                  <hr className="border-[#DDD5C7]" />

                  {/* Location Info Footer */}
                  <div className="text-[11px] text-[#716D66] space-y-1">
                    <div className="font-semibold text-[#17382C]">Ember & Oak • SoHo</div>
                    <div>123 Mercer Street, New York, NY 10012</div>
                    <div>(212) 555-0198</div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        ) : (

          /* ============================================================
              3. STEP 3: SUCCESS CONFIRMATION EXPERIENCE
             ============================================================ */
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="max-w-2xl mx-auto space-y-8 text-center py-4"
          >
            {/* Restrained Success Icon */}
            <div className="w-14 h-14 rounded-full bg-[#17382C] text-[#F7F3EA] flex items-center justify-center mx-auto shadow-md">
              <Check className="w-7 h-7 text-[#B95F3B]" />
            </div>

            <div className="space-y-2">
              <h2 className="font-serif-display text-3xl sm:text-4xl text-[#17382C]">
                Your table is reserved.
              </h2>
              <p className="text-base text-[#716D66]">
                We look forward to having you at Ember & Oak.
              </p>
            </div>

            {/* Main Hospitality Confirmation Card */}
            <div className="bg-[#EFE9DD] rounded-2xl border border-[#DDD5C7] p-6 sm:p-8 text-left space-y-6 shadow-sm">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DDD5C7] pb-6">
                <div>
                  <span className="text-xs font-semibold tracking-widest text-[#B95F3B] uppercase block">
                    RESERVATION CONFIRMED
                  </span>
                  <h3 className="font-serif-display text-2xl text-[#17382C] mt-0.5">
                    Ember & Oak
                  </h3>
                </div>

                <div className="bg-[#F7F3EA] px-3.5 py-1.5 rounded-lg border border-[#DDD5C7] text-xs font-mono text-[#17382C] w-fit">
                  CONFIRMATION <strong className="text-[#B95F3B]">#{reservationId}</strong>
                </div>
              </div>

              {/* Reservation Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs">
                <div>
                  <span className="text-[#716D66] block text-[11px] uppercase tracking-wider">Date</span>
                  <span className="font-semibold text-[#17382C] text-base block mt-0.5">
                    {formatDateShort(selectedDate)}
                  </span>
                </div>

                <div>
                  <span className="text-[#716D66] block text-[11px] uppercase tracking-wider">Time</span>
                  <span className="font-semibold text-[#17382C] text-base block mt-0.5">
                    {selectedTime}
                  </span>
                </div>

                <div>
                  <span className="text-[#716D66] block text-[11px] uppercase tracking-wider">Party</span>
                  <span className="font-semibold text-[#17382C] text-base block mt-0.5">
                    {partySize} Guests
                  </span>
                </div>

                <div>
                  <span className="text-[#716D66] block text-[11px] uppercase tracking-wider">Seating</span>
                  <span className="font-semibold text-[#17382C] text-base block mt-0.5 capitalize">
                    {seatingOptions.find(s => s.id === seatingPreference)?.label}
                  </span>
                </div>
              </div>

              {/* Guest Details Summary */}
              <div className="pt-4 border-t border-[#DDD5C7] text-xs space-y-1.5">
                <div className="text-[#716D66] text-[11px] uppercase tracking-wider">Reserved for</div>
                <div className="font-semibold text-[#17382C] text-sm">
                  {guestInfo.firstName} {guestInfo.lastName}
                </div>
                <div className="text-[#716D66] flex flex-wrap items-center gap-4 pt-0.5">
                  <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-[#B95F3B]" /> {guestInfo.email}</span>
                  <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-[#B95F3B]" /> {guestInfo.phone}</span>
                </div>
              </div>

              {/* Personalized Occasion Note */}
              <div className="p-4 bg-[#F7F3EA] rounded-xl border border-[#DDD5C7] text-xs text-[#17382C] italic flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-[#B95F3B] shrink-0" />
                <span>{getOccasionConfirmationMessage()}</span>
              </div>

              {/* Location Address */}
              <div className="text-xs text-[#716D66] flex items-center gap-2 pt-1">
                <MapPin className="w-4 h-4 text-[#B95F3B] shrink-0" />
                <span>123 Mercer Street, New York, NY 10012 • (212) 555-0198</span>
              </div>

            </div>

            {/* Confirmation Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Button
                variant="primary"
                size="md"
                onClick={handleAddToCalendar}
                icon={Download}
              >
                ADD TO CALENDAR (.ICS)
              </Button>

              <Button
                variant="outline"
                size="md"
                onClick={handleGetDirections}
                icon={Navigation}
              >
                GET DIRECTIONS
              </Button>

              <Button
                variant="ghost"
                size="md"
                onClick={() => {
                  setStep(1);
                  setReservationId('');
                }}
              >
                Make Another Reservation
              </Button>
            </div>

          </motion.div>
        )}

        {/* ============================================================
            4. RESTAURANT INFORMATION & BEFORE YOU ARRIVE SECTION
           ============================================================ */}
        <div className="mt-16 sm:mt-24 pt-12 border-t border-[#DDD5C7]">
          {/* Pure Typography Eyebrow */}
          <span className="text-xs font-semibold uppercase tracking-widest text-[#B95F3B] block mb-2 text-center sm:text-left">
            BEFORE YOU ARRIVE
          </span>

          <h3 className="font-serif-display text-2xl text-[#17382C] mb-8 text-center sm:text-left">
            Planning Your Visit
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs text-[#22211F]">
            
            {/* Parking */}
            <div className="bg-[#EFE9DD]/60 p-5 rounded-2xl border border-[#DDD5C7] space-y-2">
              <h4 className="font-semibold text-[#17382C] text-sm uppercase tracking-wider">
                PARKING
              </h4>
              <p className="text-[#716D66] leading-relaxed">
                Street parking available on Mercer & Prince. Nearby valet parking garages on Spring St.
              </p>
            </div>

            {/* Dress */}
            <div className="bg-[#EFE9DD]/60 p-5 rounded-2xl border border-[#DDD5C7] space-y-2">
              <h4 className="font-semibold text-[#17382C] text-sm uppercase tracking-wider">
                DRESS CODE
              </h4>
              <p className="text-[#716D66] leading-relaxed">
                Smart casual. Come comfortable whether celebrating or dining casually.
              </p>
            </div>

            {/* Accessibility */}
            <div className="bg-[#EFE9DD]/60 p-5 rounded-2xl border border-[#DDD5C7] space-y-2">
              <h4 className="font-semibold text-[#17382C] text-sm uppercase tracking-wider">
                ACCESSIBILITY
              </h4>
              <p className="text-[#716D66] leading-relaxed">
                Fully step-free street entrance and accessible indoor and patio dining tables.
              </p>
            </div>

            {/* Large Parties */}
            <div className="bg-[#EFE9DD]/60 p-5 rounded-2xl border border-[#DDD5C7] space-y-2">
              <h4 className="font-semibold text-[#17382C] text-sm uppercase tracking-wider">
                LARGE PARTIES
              </h4>
              <p className="text-[#716D66] leading-relaxed">
                For groups over 8, please view our <Link to="/catering" className="text-[#B95F3B] underline">Private Events page</Link> or contact our dining team.
              </p>
            </div>

          </div>

          {/* Restrained Reservation Policy */}
          <div className="mt-8 text-center text-xs text-[#716D66] max-w-xl mx-auto space-y-1">
            <p>Reservations held for 15 minutes past scheduled time. No credit card deposit required.</p>
            <p>For questions or modifications, call us directly at <strong>(212) 555-0198</strong>.</p>
          </div>
        </div>

      </div>
    </div>
  );
};
