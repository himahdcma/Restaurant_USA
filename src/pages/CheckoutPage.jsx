import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  Truck,
  CreditCard,
  CheckCircle2,
  Clock,
  MapPin,
  ShieldCheck,
  ArrowRight,
  Edit3,
  ChevronDown,
  ChevronUp,
  Check,
  Sparkles,
  Smartphone,
  Info,
  Lock,
  Utensils
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { restaurantInfo } from '../data/restaurantData';

export const CheckoutPage = () => {
  const {
    cart,
    cartSubtotal,
    taxAmount,
    deliveryFee,
    tipAmount,
    tipPercentage,
    setTipPercentage,
    customTipAmount,
    setCustomTipAmount,
    orderTotal,
    fulfillmentMode,
    setFulfillmentMode,
    setCartOpen,
    placeOrder,
    user
  } = useApp();

  const navigate = useNavigate();

  // Component state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // Mobile Order Summary collapse toggle
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState(false);

  // Pickup Time state
  const [pickupTimeOption, setPickupTimeOption] = useState('asap'); // 'asap' | 'scheduled'
  const [scheduledTime, setScheduledTime] = useState('7:30 PM');
  const [scheduledDay, setScheduledDay] = useState('Today');

  // Delivery Address State
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: '',
    apartment: '',
    city: 'New York',
    state: 'NY',
    zip: '10012'
  });

  // Contact Info State
  const [contactInfo, setContactInfo] = useState({
    firstName: user?.name ? user.name.split(' ')[0] : 'Alex',
    lastName: user?.name ? user.name.split(' ')[1] || 'Morgan' : 'Morgan',
    email: user?.email || 'alex@example.com',
    phone: user?.phone || '(212) 555-0184',
    textUpdates: true
  });

  // Payment Method State
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'apple_pay' | 'google_pay'
  const [cardDetails, setCardDetails] = useState({
    number: '4242 4242 4242 4242',
    exp: '12/29',
    cvc: '123',
    name: 'Alex Morgan'
  });

  // Order Notes
  const [orderNotes, setOrderNotes] = useState('');

  // Form Validation Errors
  const [errors, setErrors] = useState({});

  // Estimated timing calculation
  const calculatedEstimatedTime = useMemo(() => {
    const now = new Date();
    if (fulfillmentMode === 'pickup') {
      if (pickupTimeOption === 'asap') {
        const readyTime = new Date(now.getTime() + 25 * 60000);
        return `Ready around ${readyTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`;
      } else {
        return `Scheduled for ${scheduledDay}, ${scheduledTime}`;
      }
    } else {
      const deliveryStart = new Date(now.getTime() + 35 * 60000);
      const deliveryEnd = new Date(now.getTime() + 45 * 60000);
      return `Estimated delivery ${deliveryStart.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}–${deliveryEnd.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`;
    }
  }, [fulfillmentMode, pickupTimeOption, scheduledTime, scheduledDay]);

  // Form Validation
  const validate = () => {
    const errs = {};

    // Contact Validation
    if (!contactInfo.firstName.trim()) errs.firstName = 'Enter your first name.';
    if (!contactInfo.lastName.trim()) errs.lastName = 'Enter your last name.';
    if (!contactInfo.email.trim()) {
      errs.email = 'Enter a valid email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactInfo.email.trim())) {
      errs.email = 'Enter a valid email address.';
    }
    if (!contactInfo.phone.trim()) {
      errs.phone = 'Enter a valid phone number.';
    } else if (contactInfo.phone.replace(/\D/g, '').length < 7) {
      errs.phone = 'Enter a valid phone number.';
    }

    // Delivery Address Validation (if delivery selected)
    if (fulfillmentMode === 'delivery') {
      if (!deliveryAddress.street.trim()) errs.street = 'Enter your street address.';
      if (!deliveryAddress.city.trim()) errs.city = 'Enter city.';
      if (!deliveryAddress.state.trim()) errs.state = 'Enter state.';
      if (!deliveryAddress.zip.trim()) errs.zip = 'Enter ZIP code.';
    }

    // Card Validation (if card selected)
    if (paymentMethod === 'card') {
      if (!cardDetails.number.trim() || cardDetails.number.replace(/\s/g, '').length < 13) {
        errs.cardNumber = 'Enter a valid card number.';
      }
      if (!cardDetails.exp.trim() || !cardDetails.exp.includes('/')) {
        errs.cardExp = 'Enter valid MM/YY.';
      }
      if (!cardDetails.cvc.trim() || cardDetails.cvc.length < 3) {
        errs.cardCvc = 'Enter CVC.';
      }
      if (!cardDetails.name.trim()) errs.cardName = 'Enter cardholder name.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Place Order Handler
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate short direct ordering delay (1400ms)
    setTimeout(() => {
      const generatedId = `EO-${Math.floor(1000 + Math.random() * 9000)}`;

      const orderPayload = {
        orderId: generatedId,
        items: [...cart],
        fulfillmentMode,
        fulfillmentDetails: {
          estimatedTime: calculatedEstimatedTime,
          pickupLocation: restaurantInfo.locations[0],
          deliveryAddress: fulfillmentMode === 'delivery' ? deliveryAddress : null
        },
        contact: contactInfo,
        paymentMethod,
        orderNotes,
        cartSubtotal,
        taxAmount,
        deliveryFee,
        tipAmount,
        orderTotal,
        pointsEarned: Math.round(cartSubtotal)
      };

      // Call context helper to update global state and clear cart safely
      placeOrder(orderPayload);
      setConfirmedOrder(orderPayload);
      setIsSubmitting(false);
      setIsConfirmed(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1400);
  };

  // Tip Selector Handler
  const handleSelectTipPercent = (pct) => {
    setCustomTipAmount(null);
    setTipPercentage(pct);
  };

  const handleCustomTipChange = (val) => {
    const num = parseFloat(val);
    if (isNaN(num) || num < 0) {
      setCustomTipAmount(0);
    } else {
      setCustomTipAmount(num);
    }
  };

  // EMPTY CART CHECKOUT GUARD (unless order just confirmed)
  if (cart.length === 0 && !isConfirmed) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6 min-h-[60vh] flex flex-col items-center justify-center">
        {/* Pure Typography Eyebrow */}
        <span className="text-xs font-semibold tracking-widest text-[#B95F3B] uppercase block">
          CHECKOUT
        </span>

        <h1 className="font-serif-display text-4xl sm:text-5xl text-[#17382C]">
          YOUR ORDER IS EMPTY
        </h1>

        <p className="text-base text-[#716D66] max-w-md">
          Explore our menu and add your favorite wood-fired kitchen dishes before checking out.
        </p>

        <div className="pt-4">
          <Link to="/menu">
            <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
              BROWSE MENU
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // ORDER CONFIRMATION VIEW (POST ORDER PLACEMENT)
  if (isConfirmed && confirmedOrder) {
    return (
      <div className="bg-[#F7F3EA] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="max-w-2xl mx-auto space-y-8 text-center"
        >
          {/* Restrained Success Indicator */}
          <div className="w-14 h-14 rounded-full bg-[#17382C] text-[#F7F3EA] flex items-center justify-center mx-auto shadow-sm">
            <Check className="w-7 h-7 text-[#B95F3B]" />
          </div>

          <div className="space-y-2">
            <h1 className="font-serif-display text-3xl sm:text-5xl text-[#17382C]">
              Order confirmed.
            </h1>
            <p className="text-base text-[#716D66]">
              We're getting everything ready in the kitchen.
            </p>
          </div>

          {/* Key Time Banner */}
          <div className="bg-[#17382C] text-white p-5 rounded-2xl shadow-sm text-center space-y-1">
            <span className="text-[11px] font-semibold tracking-widest uppercase text-[#B95F3B]">
              {confirmedOrder.fulfillmentMode === 'pickup' ? 'READY AROUND' : 'ESTIMATED DELIVERY'}
            </span>
            <div className="font-serif-display text-2xl sm:text-3xl text-[#F7F3EA]">
              {confirmedOrder.fulfillmentDetails.estimatedTime}
            </div>
            <div className="text-xs text-[#DDD5C7] pt-1">
              Order #{confirmedOrder.orderId}
            </div>
          </div>

          {/* Confirmation Details Summary Card */}
          <div className="bg-[#EFE9DD] rounded-2xl border border-[#DDD5C7] p-6 sm:p-8 text-left space-y-6">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#DDD5C7] pb-4 text-xs">
              <div>
                <span className="font-semibold text-[#17382C] uppercase tracking-wider block">
                  FULFILLMENT
                </span>
                <span className="text-sm font-serif-display text-[#17382C] mt-0.5 block capitalize">
                  {confirmedOrder.fulfillmentMode === 'pickup' ? 'Pickup from SoHo' : 'Direct Delivery'}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[#716D66] block">Items Total</span>
                <span className="font-bold text-[#B95F3B] text-sm">${confirmedOrder.orderTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Address / Location details */}
            <div className="text-xs text-[#22211F] space-y-1">
              {confirmedOrder.fulfillmentMode === 'pickup' ? (
                <>
                  <div className="font-semibold text-[#17382C]">Ember & Oak SoHo</div>
                  <div className="text-[#716D66]">123 Mercer Street, New York, NY 10012</div>
                </>
              ) : (
                <>
                  <div className="font-semibold text-[#17382C]">Delivery Address</div>
                  <div className="text-[#716D66]">
                    {confirmedOrder.fulfillmentDetails.deliveryAddress?.street}
                    {confirmedOrder.fulfillmentDetails.deliveryAddress?.apartment && `, ${confirmedOrder.fulfillmentDetails.deliveryAddress.apartment}`}, {confirmedOrder.fulfillmentDetails.deliveryAddress?.city}, {confirmedOrder.fulfillmentDetails.deliveryAddress?.state} {confirmedOrder.fulfillmentDetails.deliveryAddress?.zip}
                  </div>
                </>
              )}
            </div>

            <hr className="border-[#DDD5C7]" />

            {/* Items Summary */}
            <div className="space-y-3">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#716D66] block">
                ORDERED ITEMS ({confirmedOrder.items.reduce((s, i) => s + i.quantity, 0)})
              </span>
              <div className="space-y-2.5 text-xs text-[#22211F]">
                {confirmedOrder.items.map((item) => (
                  <div key={item.cartId} className="flex justify-between items-start">
                    <div>
                      <span className="font-semibold">{item.quantity}x {item.item.name}</span>
                    </div>
                    <span className="font-medium">${item.totalItemPrice.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Earned Rewards Moment */}
            <div className="p-3.5 bg-[#F7F3EA] rounded-xl border border-[#DDD5C7] text-xs text-[#17382C] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#B95F3B]" />
                <span>You earned <strong>+{confirmedOrder.pointsEarned} points</strong> with this order!</span>
              </div>
              <span className="text-[11px] font-bold text-[#B95F3B] uppercase tracking-wider">EMBER REWARDS</span>
            </div>

          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate(`/order/${confirmedOrder.orderId}`)}
              icon={ArrowRight}
              iconPosition="right"
              fullWidth
              className="sm:w-auto min-w-[220px]"
            >
              TRACK YOUR ORDER →
            </Button>

            <Link to="/menu" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" fullWidth className="min-w-[180px]">
                BACK TO MENU
              </Button>
            </Link>
          </div>

        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[#F7F3EA] min-h-screen text-[#22211F] font-sans pb-16">
      
      {/* ============================================================
          1. CHECKOUT PAGE INTRO (No hero image!)
         ============================================================ */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        
        {/* Page Header */}
        <div className="space-y-2 mb-8">
          {/* Pure Typography Eyebrow (NO pill background!) */}
          <span className="text-xs font-semibold tracking-widest text-[#B95F3B] uppercase block">
            CHECKOUT
          </span>

          <h1 className="font-serif-display text-3xl sm:text-5xl text-[#17382C]">
            Almost there.
          </h1>

          <p className="text-sm sm:text-base text-[#716D66]">
            Review your order and choose how you'd like to receive it.
          </p>
        </div>


        {/* Mobile Collapsible Order Summary Banner (~390px) */}
        <div className="lg:hidden mb-6 bg-[#EFE9DD] rounded-xl border border-[#DDD5C7] overflow-hidden">
          <button
            type="button"
            onClick={() => setMobileSummaryOpen(!mobileSummaryOpen)}
            className="w-full p-4 flex items-center justify-between text-xs font-semibold text-[#17382C]"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#B95F3B]" />
              <span>YOUR ORDER ({cart.reduce((s, i) => s + i.quantity, 0)} ITEMS)</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-[#B95F3B]">${orderTotal.toFixed(2)}</span>
              {mobileSummaryOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>

          {mobileSummaryOpen && (
            <div className="p-4 pt-0 border-t border-[#DDD5C7]/70 space-y-3 text-xs animate-fade-in">
              {cart.map((item) => (
                <div key={item.cartId} className="flex justify-between items-start py-1">
                  <span>{item.quantity}x {item.item.name}</span>
                  <span className="font-semibold">${item.totalItemPrice.toFixed(2)}</span>
                </div>
              ))}
              <div className="pt-2 border-t border-[#DDD5C7]/70 space-y-1">
                <div className="flex justify-between text-[#716D66]"><span>Subtotal</span><span>${cartSubtotal.toFixed(2)}</span></div>
                {fulfillmentMode === 'delivery' && <div className="flex justify-between text-[#716D66]"><span>Delivery</span><span>${deliveryFee.toFixed(2)}</span></div>}
                <div className="flex justify-between text-[#716D66]"><span>Tax</span><span>${taxAmount.toFixed(2)}</span></div>
                <div className="flex justify-between text-[#716D66]"><span>Tip</span><span>${tipAmount.toFixed(2)}</span></div>
              </div>
            </div>
          )}
        </div>


        {/* ============================================================
            2. MAIN CHECKOUT GRID (Left: Form ~65%, Right: Sticky Summary ~35%)
           ============================================================ */}
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: CHECKOUT FORM SECTIONS */}
          <div className="lg:col-span-7 space-y-10">

            {/* SECTION 1: FULFILLMENT METHOD */}
            <div className="space-y-4">
              {/* Pure Typography Eyebrow */}
              <span className="text-xs font-semibold uppercase tracking-widest text-[#B95F3B] block">
                HOW WOULD YOU LIKE YOUR ORDER?
              </span>

              {/* Pickup / Delivery Toggles */}
              <div className="grid grid-cols-2 gap-3">
                
                {/* PICKUP */}
                <button
                  type="button"
                  onClick={() => setFulfillmentMode('pickup')}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    fulfillmentMode === 'pickup'
                      ? 'bg-[#17382C] text-white border-[#17382C] shadow-sm'
                      : 'bg-[#F7F3EA] text-[#22211F] border-[#DDD5C7] hover:border-[#17382C]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider">PICKUP</span>
                    <ShoppingBag className={`w-4 h-4 ${fulfillmentMode === 'pickup' ? 'text-[#B95F3B]' : 'text-[#716D66]'}`} />
                  </div>
                  <div className={`text-xs ${fulfillmentMode === 'pickup' ? 'text-[#DDD5C7]' : 'text-[#716D66]'}`}>
                    Ready in 20–30 min
                  </div>
                </button>

                {/* DELIVERY */}
                <button
                  type="button"
                  onClick={() => setFulfillmentMode('delivery')}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    fulfillmentMode === 'delivery'
                      ? 'bg-[#17382C] text-white border-[#17382C] shadow-sm'
                      : 'bg-[#F7F3EA] text-[#22211F] border-[#DDD5C7] hover:border-[#17382C]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider">DELIVERY</span>
                    <Truck className={`w-4 h-4 ${fulfillmentMode === 'delivery' ? 'text-[#B95F3B]' : 'text-[#716D66]'}`} />
                  </div>
                  <div className={`text-xs ${fulfillmentMode === 'delivery' ? 'text-[#DDD5C7]' : 'text-[#716D66]'}`}>
                    35–45 min • $3.99 fee
                  </div>
                </button>

              </div>

              {/* Fulfillment Option Details */}
              {fulfillmentMode === 'pickup' ? (
                <div className="bg-[#EFE9DD] p-4 sm:p-5 rounded-2xl border border-[#DDD5C7] space-y-4 animate-fade-in">
                  <div className="space-y-1 text-xs">
                    <span className="text-[11px] font-semibold tracking-wider text-[#716D66] uppercase block">
                      PICKUP LOCATION
                    </span>
                    <div className="font-semibold text-sm text-[#17382C]">Ember & Oak SoHo</div>
                    <div className="text-[#716D66]">123 Mercer Street, New York, NY 10012</div>
                  </div>

                  <hr className="border-[#DDD5C7]/70" />

                  {/* Pickup Timing Options */}
                  <div className="space-y-3">
                    <span className="text-[11px] font-semibold tracking-wider text-[#716D66] uppercase block">
                      WHEN WOULD YOU LIKE TO PICK UP?
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => setPickupTimeOption('asap')}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          pickupTimeOption === 'asap'
                            ? 'bg-[#17382C] text-white border-[#17382C]'
                            : 'bg-[#F7F3EA] border-[#DDD5C7] text-[#22211F] hover:border-[#17382C]'
                        }`}
                      >
                        <div className="font-semibold">AS SOON AS POSSIBLE</div>
                        <div className={`text-[11px] ${pickupTimeOption === 'asap' ? 'text-[#DDD5C7]' : 'text-[#716D66]'}`}>
                          Recommended (20–30 min)
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPickupTimeOption('scheduled')}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          pickupTimeOption === 'scheduled'
                            ? 'bg-[#17382C] text-white border-[#17382C]'
                            : 'bg-[#F7F3EA] border-[#DDD5C7] text-[#22211F] hover:border-[#17382C]'
                        }`}
                      >
                        <div className="font-semibold">SCHEDULE FOR LATER</div>
                        <div className={`text-[11px] ${pickupTimeOption === 'scheduled' ? 'text-[#DDD5C7]' : 'text-[#716D66]'}`}>
                          Select date & time
                        </div>
                      </button>
                    </div>

                    {/* If Scheduled */}
                    {pickupTimeOption === 'scheduled' && (
                      <div className="pt-2 grid grid-cols-2 gap-3 animate-fade-in">
                        <div>
                          <label className="text-[11px] font-semibold text-[#17382C] block mb-1">Day</label>
                          <select
                            value={scheduledDay}
                            onChange={(e) => setScheduledDay(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-[#DDD5C7] bg-[#F7F3EA] text-xs text-[#22211F]"
                          >
                            <option value="Today">Today</option>
                            <option value="Tomorrow">Tomorrow</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[11px] font-semibold text-[#17382C] block mb-1">Time Slot</label>
                          <select
                            value={scheduledTime}
                            onChange={(e) => setScheduledTime(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-[#DDD5C7] bg-[#F7F3EA] text-xs text-[#22211F]"
                          >
                            <option value="6:30 PM">6:30 PM</option>
                            <option value="7:00 PM">7:00 PM</option>
                            <option value="7:30 PM">7:30 PM</option>
                            <option value="8:00 PM">8:00 PM</option>
                            <option value="8:30 PM">8:30 PM</option>
                            <option value="9:00 PM">9:00 PM</option>
                          </select>
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              ) : (
                /* DELIVERY ADDRESS FIELDS */
                <div className="bg-[#EFE9DD] p-4 sm:p-5 rounded-2xl border border-[#DDD5C7] space-y-4 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold tracking-wider text-[#716D66] uppercase block">
                      DELIVERY ADDRESS
                    </span>
                    <span className="text-[11px] text-[#477A5B] font-medium flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> 35–45 min estimated
                    </span>
                  </div>

                  <div className="space-y-3">
                    {/* Street Address */}
                    <div>
                      <label className="text-xs font-semibold text-[#17382C] block mb-1">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        value={deliveryAddress.street}
                        onChange={(e) => setDeliveryAddress({ ...deliveryAddress, street: e.target.value })}
                        placeholder="e.g. 450 Broome Street"
                        className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm text-[#22211F] focus:outline-none ${
                          errors.street ? 'border-red-500' : 'border-[#DDD5C7] focus:border-[#17382C] focus:ring-1 focus:ring-[#17382C]'
                        }`}
                      />
                      {errors.street && <span className="text-xs text-red-600 mt-1 block">{errors.street}</span>}
                    </div>

                    {/* Apt / Suite */}
                    <div>
                      <label className="text-xs font-semibold text-[#17382C] block mb-1">
                        Apartment, Suite, or Unit (Optional)
                      </label>
                      <input
                        type="text"
                        value={deliveryAddress.apartment}
                        onChange={(e) => setDeliveryAddress({ ...deliveryAddress, apartment: e.target.value })}
                        placeholder="Apt 4B"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD5C7] bg-white text-sm text-[#22211F] focus:outline-none focus:border-[#17382C] focus:ring-1 focus:ring-[#17382C]"
                      />
                    </div>

                    {/* City, State, Zip */}
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="text-xs font-semibold text-[#17382C] block mb-1">City *</label>
                        <input
                          type="text"
                          value={deliveryAddress.city}
                          onChange={(e) => setDeliveryAddress({ ...deliveryAddress, city: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-[#DDD5C7] bg-white text-sm text-[#22211F] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-[#17382C] block mb-1">State *</label>
                        <input
                          type="text"
                          value={deliveryAddress.state}
                          onChange={(e) => setDeliveryAddress({ ...deliveryAddress, state: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-[#DDD5C7] bg-white text-sm text-[#22211F] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-[#17382C] block mb-1">ZIP Code *</label>
                        <input
                          type="text"
                          value={deliveryAddress.zip}
                          onChange={(e) => setDeliveryAddress({ ...deliveryAddress, zip: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-[#DDD5C7] bg-white text-sm text-[#22211F] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-[#716D66] italic">
                    Delivery available within our local Downtown Manhattan service area.
                  </p>
                </div>
              )}

            </div>

            <hr className="border-[#DDD5C7]" />

            {/* SECTION 2: CONTACT INFORMATION */}
            <div className="space-y-4">
              {/* Pure Typography Eyebrow */}
              <span className="text-xs font-semibold uppercase tracking-widest text-[#B95F3B] block">
                CONTACT INFORMATION
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* First Name */}
                <div>
                  <label className="text-xs font-semibold text-[#17382C] block mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={contactInfo.firstName}
                    onChange={(e) => setContactInfo({ ...contactInfo, firstName: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-sm border bg-white text-base sm:text-sm text-[#22211F] focus:outline-none ${
                      errors.firstName ? 'border-red-500' : 'border-[#DDD5C7] focus:border-[#17382C] focus:ring-1 focus:ring-[#17382C]'
                    }`}
                  />
                  {errors.firstName && <span className="text-xs text-red-600 mt-1 block">{errors.firstName}</span>}
                </div>

                {/* Last Name */}
                <div>
                  <label className="text-xs font-semibold text-[#17382C] block mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={contactInfo.lastName}
                    onChange={(e) => setContactInfo({ ...contactInfo, lastName: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-sm border bg-white text-base sm:text-sm text-[#22211F] focus:outline-none ${
                      errors.lastName ? 'border-red-500' : 'border-[#DDD5C7] focus:border-[#17382C] focus:ring-1 focus:ring-[#17382C]'
                    }`}
                  />
                  {errors.lastName && <span className="text-xs text-red-600 mt-1 block">{errors.lastName}</span>}
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
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-sm border bg-white text-base sm:text-sm text-[#22211F] focus:outline-none ${
                      errors.email ? 'border-red-500' : 'border-[#DDD5C7] focus:border-[#17382C] focus:ring-1 focus:ring-[#17382C]'
                    }`}
                  />
                  {errors.email && <span className="text-xs text-red-600 mt-1 block">{errors.email}</span>}
                </div>

                {/* Phone */}
                <div>
                  <label className="text-xs font-semibold text-[#17382C] block mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-sm border bg-white text-base sm:text-sm text-[#22211F] focus:outline-none ${
                      errors.phone ? 'border-red-500' : 'border-[#DDD5C7] focus:border-[#17382C] focus:ring-1 focus:ring-[#17382C]'
                    }`}
                  />
                  {errors.phone && <span className="text-xs text-red-600 mt-1 block">{errors.phone}</span>}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-[#716D66] pt-1">
                <span>We'll only use this information for your order status updates.</span>
                <label className="flex items-center gap-2 cursor-pointer text-[#17382C] font-medium shrink-0">
                  <input
                    type="checkbox"
                    checked={contactInfo.textUpdates}
                    onChange={(e) => setContactInfo({ ...contactInfo, textUpdates: e.target.checked })}
                    className="rounded border-[#DDD5C7] text-[#17382C] focus:ring-[#17382C]"
                  />
                  <span>Text me updates</span>
                </label>
              </div>
            </div>

            <hr className="border-[#DDD5C7]" />

            {/* SECTION 3: ADD A TIP */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                {/* Pure Typography Eyebrow */}
                <span className="text-xs font-semibold uppercase tracking-widest text-[#B95F3B] block">
                  ADD A TIP
                </span>
                <span className="text-xs text-[#716D66]">
                  100% goes directly to the restaurant team
                </span>
              </div>

              {/* Tip options buttons */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {[0.15, 0.18, 0.20, 0.25].map((pct) => {
                  const calculated = cartSubtotal * pct;
                  const isSelected = customTipAmount === null && tipPercentage === pct;
                  return (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => handleSelectTipPercent(pct)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        isSelected
                          ? 'bg-[#17382C] text-white border-[#17382C]'
                          : 'bg-[#F7F3EA] border-[#DDD5C7] text-[#22211F] hover:border-[#17382C]'
                      }`}
                    >
                      <div className="font-semibold text-xs">{Math.round(pct * 100)}%</div>
                      <div className={`text-[11px] mt-0.5 ${isSelected ? 'text-[#DDD5C7]' : 'text-[#716D66]'}`}>
                        ${calculated.toFixed(2)}
                      </div>
                    </button>
                  );
                })}

                {/* Custom Tip Button */}
                <button
                  type="button"
                  onClick={() => {
                    setTipPercentage(0);
                    setCustomTipAmount(5.0);
                  }}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    customTipAmount !== null && customTipAmount > 0
                      ? 'bg-[#17382C] text-white border-[#17382C]'
                      : 'bg-[#F7F3EA] border-[#DDD5C7] text-[#22211F] hover:border-[#17382C]'
                  }`}
                >
                  <div className="font-semibold text-xs">Custom</div>
                  <div className={`text-[11px] mt-0.5 ${customTipAmount !== null && customTipAmount > 0 ? 'text-[#DDD5C7]' : 'text-[#716D66]'}`}>
                    {customTipAmount !== null && customTipAmount > 0 ? `$${customTipAmount.toFixed(2)}` : 'Specify'}
                  </div>
                </button>

                {/* No Tip Button */}
                <button
                  type="button"
                  onClick={() => {
                    setCustomTipAmount(0);
                    setTipPercentage(0);
                  }}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    customTipAmount === 0 && tipPercentage === 0
                      ? 'bg-[#17382C] text-white border-[#17382C]'
                      : 'bg-[#F7F3EA] border-[#DDD5C7] text-[#22211F] hover:border-[#17382C]'
                  }`}
                >
                  <div className="font-semibold text-xs">No Tip</div>
                  <div className={`text-[11px] mt-0.5 ${customTipAmount === 0 && tipPercentage === 0 ? 'text-[#DDD5C7]' : 'text-[#716D66]'}`}>
                    $0.00
                  </div>
                </button>
              </div>

              {/* Custom Tip Input if active */}
              {customTipAmount !== null && customTipAmount > 0 && (
                <div className="pt-2 flex items-center gap-2 max-w-xs animate-fade-in">
                  <span className="text-xs text-[#716D66]">Custom Tip Amount ($):</span>
                  <input
                    type="number"
                    step="0.50"
                    min="0"
                    value={customTipAmount}
                    onChange={(e) => handleCustomTipChange(e.target.value)}
                    className="w-24 px-3 py-1.5 rounded-xl border border-[#DDD5C7] bg-white text-xs font-semibold text-[#17382C] focus:outline-none"
                  />
                </div>
              )}
            </div>

            <hr className="border-[#DDD5C7]" />

            {/* SECTION 4: PAYMENT SECTION */}
            <div className="space-y-4">
              {/* Pure Typography Eyebrow */}
              <span className="text-xs font-semibold uppercase tracking-widest text-[#B95F3B] block">
                PAYMENT METHOD
              </span>

              {/* Payment Selectors */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                    paymentMethod === 'card'
                      ? 'bg-[#17382C] text-white border-[#17382C]'
                      : 'bg-[#F7F3EA] border-[#DDD5C7] text-[#22211F] hover:border-[#17382C]'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span className="text-xs font-semibold">Credit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple_pay')}
                  className={`p-3.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                    paymentMethod === 'apple_pay'
                      ? 'bg-[#17382C] text-white border-[#17382C]'
                      : 'bg-[#F7F3EA] border-[#DDD5C7] text-[#22211F] hover:border-[#17382C]'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span className="text-xs font-semibold">Apple Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('google_pay')}
                  className={`p-3.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                    paymentMethod === 'google_pay'
                      ? 'bg-[#17382C] text-white border-[#17382C]'
                      : 'bg-[#F7F3EA] border-[#DDD5C7] text-[#22211F] hover:border-[#17382C]'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-xs font-semibold">Google Pay</span>
                </button>
              </div>

              {/* CARD FORM */}
              {paymentMethod === 'card' ? (
                <div className="bg-[#EFE9DD] p-4 sm:p-5 rounded-2xl border border-[#DDD5C7] space-y-3.5 animate-fade-in">
                  <div>
                    <label className="text-xs font-semibold text-[#17382C] block mb-1">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                      placeholder="4242 4242 4242 4242"
                      className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm font-mono text-[#22211F] focus:outline-none ${
                        errors.cardNumber ? 'border-red-500' : 'border-[#DDD5C7] focus:border-[#17382C] focus:ring-1 focus:ring-[#17382C]'
                      }`}
                    />
                    {errors.cardNumber && <span className="text-xs text-red-600 mt-1 block">{errors.cardNumber}</span>}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-[#17382C] block mb-1">
                        MM / YY *
                      </label>
                      <input
                        type="text"
                        value={cardDetails.exp}
                        onChange={(e) => setCardDetails({ ...cardDetails, exp: e.target.value })}
                        placeholder="12/29"
                        className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm font-mono text-[#22211F] focus:outline-none ${
                          errors.cardExp ? 'border-red-500' : 'border-[#DDD5C7] focus:border-[#17382C] focus:ring-1 focus:ring-[#17382C]'
                        }`}
                      />
                      {errors.cardExp && <span className="text-xs text-red-600 mt-1 block">{errors.cardExp}</span>}
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#17382C] block mb-1">
                        CVC *
                      </label>
                      <input
                        type="text"
                        value={cardDetails.cvc}
                        onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value })}
                        placeholder="123"
                        className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm font-mono text-[#22211F] focus:outline-none ${
                          errors.cardCvc ? 'border-red-500' : 'border-[#DDD5C7] focus:border-[#17382C] focus:ring-1 focus:ring-[#17382C]'
                        }`}
                      />
                      {errors.cardCvc && <span className="text-xs text-red-600 mt-1 block">{errors.cardCvc}</span>}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#17382C] block mb-1">
                      Name on Card *
                    </label>
                    <input
                      type="text"
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                      placeholder="Alex Morgan"
                      className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm text-[#22211F] focus:outline-none ${
                        errors.cardName ? 'border-red-500' : 'border-[#DDD5C7] focus:border-[#17382C] focus:ring-1 focus:ring-[#17382C]'
                      }`}
                    />
                    {errors.cardName && <span className="text-xs text-red-600 mt-1 block">{errors.cardName}</span>}
                  </div>
                </div>
              ) : (
                <div className="bg-[#EFE9DD] p-4 rounded-xl border border-[#DDD5C7] text-xs text-[#716D66] space-y-1 animate-fade-in">
                  <div className="font-semibold text-[#17382C]">
                    {paymentMethod === 'apple_pay' ? 'Apple Pay Selected' : 'Google Pay Selected'}
                  </div>
                  <div>You'll confirm payment authorization after placing your order.</div>
                </div>
              )}
            </div>

            <hr className="border-[#DDD5C7]" />

            {/* SECTION 5: ORDER NOTES */}
            <div className="space-y-2">
              {/* Pure Typography Eyebrow */}
              <span className="text-xs font-semibold uppercase tracking-widest text-[#B95F3B] block">
                ORDER NOTES
              </span>

              <textarea
                rows={2}
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                placeholder="Anything the kitchen should know regarding order fulfillment?"
                className="w-full p-3 rounded-xl border border-[#DDD5C7] bg-[#F7F3EA] text-xs text-[#22211F] focus:outline-none focus:border-[#17382C] focus:ring-1 focus:ring-[#17382C]"
              />
            </div>

            {/* Submit Action for Mobile */}
            <div className="lg:hidden pt-4 space-y-2">
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
                    Placing your order...
                  </span>
                ) : (
                  `PLACE ORDER — $${orderTotal.toFixed(2)}`
                )}
              </Button>
              <div className="text-[11px] text-center text-[#716D66]">
                Order directly from Ember & Oak.
              </div>
            </div>

          </div>


          {/* RIGHT COLUMN: STICKY ORDER SUMMARY (Desktop ~35%) */}
          <div className="hidden lg:block lg:col-span-5 sticky top-28 space-y-6">
            <div className="bg-[#EFE9DD] rounded-2xl border border-[#DDD5C7] p-6 space-y-6 shadow-sm">
              
              {/* Summary Header */}
              <div className="flex items-center justify-between border-b border-[#DDD5C7] pb-4">
                <span className="font-serif-display text-xl text-[#17382C]">YOUR ORDER</span>
                <button
                  type="button"
                  onClick={() => setCartOpen(true)}
                  className="text-xs text-[#B95F3B] font-semibold hover:underline flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  EDIT ORDER
                </button>
              </div>

              {/* Items List */}
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                {cart.map((cartItem) => (
                  <div key={cartItem.cartId} className="flex gap-3 text-xs border-b border-[#DDD5C7]/60 pb-3 last:border-b-0">
                    {cartItem.item.image && (
                      <img
                        src={cartItem.item.image}
                        alt={cartItem.item.name}
                        className="w-14 h-14 rounded-none object-cover border border-[#DDD5C7] shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between font-semibold text-[#17382C]">
                        <span>{cartItem.quantity}× {cartItem.item.name}</span>
                        <span>${cartItem.totalItemPrice.toFixed(2)}</span>
                      </div>
                      
                      {/* Compact Customization Summary */}
                      {cartItem.selectedOptions && Object.keys(cartItem.selectedOptions).length > 0 && (
                        <div className="text-[11px] text-[#716D66] mt-0.5 leading-tight">
                          {cartItem.selectedOptions.patty && <span>{cartItem.selectedOptions.patty.name} • </span>}
                          {cartItem.selectedOptions.cheese && <span>{cartItem.selectedOptions.cheese.name} • </span>}
                          {cartItem.selectedOptions.extras && cartItem.selectedOptions.extras.map(e => e.name).join(', ')}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <hr className="border-[#DDD5C7]" />

              {/* Price Breakdown */}
              <div className="space-y-2.5 text-xs text-[#22211F]">
                <div className="flex justify-between text-[#716D66]">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#22211F]">${cartSubtotal.toFixed(2)}</span>
                </div>

                {fulfillmentMode === 'delivery' && (
                  <div className="flex justify-between text-[#716D66]">
                    <span>Delivery Fee</span>
                    <span className="font-medium text-[#22211F]">${deliveryFee.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#716D66]">
                  <span>Estimated Tax (8.875%)</span>
                  <span className="font-medium text-[#22211F]">${taxAmount.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-[#716D66]">
                  <span>Tip</span>
                  <span className="font-medium text-[#22211F]">${tipAmount.toFixed(2)}</span>
                </div>

                <div className="flex justify-between font-serif-display text-lg text-[#17382C] pt-2 border-t border-[#DDD5C7]">
                  <span>TOTAL</span>
                  <span className="text-[#B95F3B] font-bold">${orderTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Reward Points Preview */}
              <div className="p-3 bg-[#F7F3EA] rounded-xl border border-[#DDD5C7] text-xs text-[#17382C] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#B95F3B] shrink-0" />
                <span>You'll earn <strong>+{Math.round(cartSubtotal)} Ember Rewards points</strong> with this order.</span>
              </div>

              {/* Desktop CTA */}
              <div className="pt-2 space-y-2">
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
                      Placing your order...
                    </span>
                  ) : (
                    `PLACE ORDER — $${orderTotal.toFixed(2)}`
                  )}
                </Button>

                <div className="text-[11px] text-center text-[#716D66]">
                  Order directly from Ember & Oak.
                </div>
              </div>

            </div>
          </div>

        </form>
      </div>

    </div>
  );
};
