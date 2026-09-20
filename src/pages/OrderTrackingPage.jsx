import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  CheckCircle2,
  Clock,
  MapPin,
  ChefHat,
  ShoppingBag,
  Truck,
  Sparkles,
  ArrowRight,
  Phone,
  HelpCircle,
  Star,
  Navigation,
  RefreshCw,
  Info
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { restaurantInfo } from '../data/restaurantData';

export const OrderTrackingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentOrder, addToCart, showToast } = useApp();

  // Rating feedback state for Delivery
  const [userRating, setUserRating] = useState(0);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);

  // Active Order lookup (currentOrder from context or matching ID)
  const order = useMemo(() => {
    if (currentOrder && (currentOrder.orderId === id || !id)) {
      return currentOrder;
    }
    return null;
  }, [currentOrder, id]);

  // Elapsed seconds timer calculation
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    if (!order || !order.createdAt) return;

    const updateTimer = () => {
      const created = new Date(order.createdAt).getTime();
      const now = Date.now();
      const seconds = Math.max(0, Math.floor((now - created) / 1000));
      setElapsedSeconds(seconds);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [order]);

  // Stage Index calculation: 0..4
  const currentStepIndex = useMemo(() => {
    if (elapsedSeconds < 4) return 0;   // Order Received
    if (elapsedSeconds < 9) return 1;   // Confirmed
    if (elapsedSeconds < 17) return 2;  // Preparing
    if (elapsedSeconds < 25) return 3;  // Almost Ready / Out for Delivery
    return 4;                           // Ready for Pickup / Delivered
  }, [elapsedSeconds]);

  const isPickup = order?.fulfillmentMode === 'pickup';
  const isCompleted = currentStepIndex === 4;

  // Stages definition based on fulfillment mode
  const stages = useMemo(() => {
    if (isPickup) {
      return [
        { title: 'ORDER RECEIVED', key: 'received', desc: "Your order has been received by Ember & Oak." },
        { title: 'CONFIRMED', key: 'confirmed', desc: "The kitchen has confirmed your order." },
        { title: 'PREPARING', key: 'preparing', desc: "Your dishes are being prepared fresh over open wood fires." },
        { title: 'ALMOST READY', key: 'almost_ready', desc: "Finishing touches — we'll have it ready shortly." },
        { title: 'READY FOR PICKUP', key: 'ready', desc: "Everything's packed and waiting for you at the counter." }
      ];
    } else {
      return [
        { title: 'ORDER RECEIVED', key: 'received', desc: "Your order has been received by Ember & Oak." },
        { title: 'CONFIRMED', key: 'confirmed', desc: "The kitchen has confirmed your order." },
        { title: 'PREPARING', key: 'preparing', desc: "Your dishes are being prepared fresh in our kitchen." },
        { title: 'OUT FOR DELIVERY', key: 'out_for_delivery', desc: "Your order has left Ember & Oak and is on the way." },
        { title: 'DELIVERED', key: 'delivered', desc: "Delivered. Enjoy your meal!" }
      ];
    }
  }, [isPickup]);

  // Dynamic Headline Copy based on active step
  const getDynamicHeadline = () => {
    if (isCompleted) {
      return isPickup ? "Your order is ready." : "Delivered.";
    }
    switch (currentStepIndex) {
      case 0:
        return "We've got your order.";
      case 1:
        return "Your order is confirmed.";
      case 2:
        return "Your order is in the kitchen.";
      case 3:
        return isPickup ? "Almost ready." : "Your order is on the way.";
      default:
        return "Tracking your order.";
    }
  };

  // Re-order handler
  const handleOrderAgain = () => {
    if (!order || !order.items) return;
    order.items.forEach(cartItem => {
      addToCart(cartItem.item, cartItem.selectedOptions || {}, cartItem.quantity, cartItem.specialInstructions || '');
    });
    showToast("Your favorites are back in your cart!");
    navigate('/menu');
  };

  // Directions Handler
  const handleGetDirections = () => {
    window.open(
      'https://www.google.com/maps/search/?api=1&query=123+Mercer+Street+New+York+NY+10012',
      '_blank',
      'noopener,noreferrer'
    );
  };

  // INVALID ROUTE / MISSING ORDER GUARD
  if (!order) {
    return (
      <div className="bg-[#F7F3EA] min-h-screen py-20 px-4 text-center space-y-6 flex flex-col items-center justify-center">
        {/* Editorial Label */}
        <span className="text-xs font-semibold tracking-widest text-[#B95F3B] uppercase block">
          ORDER NOT FOUND
        </span>

        <h1 className="font-serif-display text-4xl sm:text-5xl text-[#17382C]">
          We couldn't find that order.
        </h1>

        <p className="text-base text-[#716D66] max-w-md">
          If you just placed an order, please check your confirmation screen or explore our menu to place a new order.
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

  return (
    <div className="bg-[#F7F3EA] min-h-screen text-[#22211F] font-sans pb-16">
      
      {/* ============================================================
          1. HEADER & DYNAMIC STATUS INTRO
         ============================================================ */}
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        
        <div className="space-y-2 mb-8">
          {/* Editorial Typography Label (NO filled badge/pill!) */}
          <span className="text-xs font-semibold tracking-widest text-[#B95F3B] uppercase block">
            ORDER #{order.orderId}
          </span>

          {/* Dynamic Headline */}
          <h1 className="font-serif-display text-3xl sm:text-5xl text-[#17382C] leading-tight">
            {getDynamicHeadline()}
          </h1>

          {/* Dynamic Subtitle */}
          <p className="text-sm sm:text-base text-[#716D66] max-w-lg">
            {stages[currentStepIndex].desc}
          </p>
        </div>


        {/* ============================================================
            2. DESKTOP GRID (Left: Status & Timeline ~65%, Right: Order Summary ~35%)
           ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: PRIMARY STATUS & TIMELINE */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Primary Timing Box */}
            <div className={`p-6 rounded-2xl border transition-all ${
              isCompleted
                ? 'bg-[#17382C] text-white border-[#17382C] shadow-sm'
                : 'bg-[#EFE9DD] border-[#DDD5C7]'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  {/* Pure Typography Eyebrow */}
                  <span className={`text-[11px] font-semibold tracking-widest uppercase block ${
                    isCompleted ? 'text-[#B95F3B]' : 'text-[#B95F3B]'
                  }`}>
                    {isPickup ? 'READY AROUND' : 'ESTIMATED DELIVERY'}
                  </span>

                  <div className={`font-serif-display text-2xl sm:text-4xl mt-1 ${
                    isCompleted ? 'text-[#F7F3EA]' : 'text-[#17382C]'
                  }`}>
                    {order.fulfillmentDetails?.estimatedTime || '20–30 Min'}
                  </div>
                </div>

                {/* Status Badge */}
                <div className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 ${
                  isCompleted
                    ? 'bg-[#477A5B] text-white'
                    : 'bg-[#17382C] text-white'
                }`}>
                  <span className="w-2 h-2 rounded-full bg-[#B95F3B] animate-pulse" />
                  <span>{stages[currentStepIndex].title}</span>
                </div>
              </div>

              {!isCompleted && (
                <div className="text-xs text-[#716D66] mt-3 pt-3 border-t border-[#DDD5C7]/70 flex items-center justify-between">
                  <span>Target Fulfillment Time</span>
                  <span className="font-semibold text-[#17382C]">
                    {isPickup ? 'Approx 20 minutes from order' : 'Approx 35 minutes from order'}
                  </span>
                </div>
              )}
            </div>


            {/* ORDER PROGRESS TIMELINE */}
            <div className="bg-[#EFE9DD] p-6 rounded-2xl border border-[#DDD5C7] space-y-6">
              
              <div className="flex items-center justify-between border-b border-[#DDD5C7]/70 pb-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#B95F3B] block">
                  ORDER TIMELINE
                </span>
                <span className="text-xs text-[#716D66]">
                  {isPickup ? 'Pickup Service' : 'Direct Delivery'}
                </span>
              </div>

              {/* Responsive Timeline representation (Vertical on Mobile / Clean Grid on Desktop) */}
              <div className="space-y-4">
                {stages.map((stage, idx) => {
                  const isDone = idx < currentStepIndex;
                  const isCurrent = idx === currentStepIndex;
                  const isFuture = idx > currentStepIndex;

                  return (
                    <div key={stage.key} className="flex items-start gap-4 relative">
                      
                      {/* Line connector */}
                      {idx < stages.length - 1 && (
                        <div
                          className={`absolute left-[13px] top-7 bottom-0 w-0.5 -mb-4 transition-colors ${
                            idx < currentStepIndex ? 'bg-[#17382C]' : 'bg-[#DDD5C7]'
                          }`}
                        />
                      )}

                      {/* Step Indicator Dot */}
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold transition-all relative z-10 ${
                        isDone
                          ? 'bg-[#17382C] text-[#F7F3EA]'
                          : isCurrent
                          ? 'bg-[#B95F3B] text-white ring-4 ring-[#B95F3B]/20'
                          : 'bg-[#DDD5C7] text-[#716D66]'
                      }`}>
                        {isDone ? (
                          <Check className="w-4 h-4 text-white" />
                        ) : (
                          <span>{idx + 1}</span>
                        )}
                      </div>

                      {/* Stage Text */}
                      <div className="flex-1 pt-0.5">
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-semibold uppercase tracking-wider ${
                            isCurrent
                              ? 'text-[#B95F3B] font-bold text-sm'
                              : isDone
                              ? 'text-[#17382C]'
                              : 'text-[#716D66]'
                          }`}>
                            {stage.title}
                          </span>

                          {isCurrent && (
                            <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-[#B95F3B]/15 text-[#B95F3B]">
                              IN PROGRESS
                            </span>
                          )}
                        </div>

                        <p className={`text-xs mt-0.5 ${
                          isCurrent ? 'text-[#22211F] font-medium' : 'text-[#716D66]'
                        }`}>
                          {stage.desc}
                        </p>
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>


            {/* LOCATION / FULFILLMENT INFORMATION SECTION */}
            <div className="bg-[#EFE9DD] p-6 rounded-2xl border border-[#DDD5C7] space-y-4 text-xs">
              
              <div className="flex items-center justify-between border-b border-[#DDD5C7]/70 pb-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#B95F3B] block">
                  {isPickup ? 'PICKUP AT' : 'DELIVERING TO'}
                </span>
                {isPickup && (
                  <button
                    type="button"
                    onClick={handleGetDirections}
                    className="text-xs text-[#17382C] font-semibold hover:underline flex items-center gap-1"
                  >
                    <Navigation className="w-3.5 h-3.5 text-[#B95F3B]" />
                    GET DIRECTIONS →
                  </button>
                )}
              </div>

              {isPickup ? (
                <div className="space-y-3">
                  <div>
                    <div className="font-semibold text-sm text-[#17382C]">Ember & Oak SoHo</div>
                    <div className="text-[#716D66]">123 Mercer Street, New York, NY 10012</div>
                    <div className="text-[#716D66] mt-0.5">Phone: (212) 555-0198</div>
                  </div>

                  <div className="p-3 bg-[#F7F3EA] rounded-xl border border-[#DDD5C7] text-xs text-[#716D66] flex items-start gap-2">
                    <Info className="w-4 h-4 text-[#B95F3B] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#17382C]">Pickup Instructions:</strong> Enter through the main entrance on Mercer Street and check in directly at our dedicated pickup counter.
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="font-semibold text-sm text-[#17382C]">
                    {order.contact?.firstName} {order.contact?.lastName}
                  </div>
                  <div className="text-[#716D66]">
                    {order.fulfillmentDetails?.deliveryAddress?.street}
                    {order.fulfillmentDetails?.deliveryAddress?.apartment && `, ${order.fulfillmentDetails.deliveryAddress.apartment}`}, {order.fulfillmentDetails?.deliveryAddress?.city}, {order.fulfillmentDetails?.deliveryAddress?.state} {order.fulfillmentDetails?.deliveryAddress?.zip}
                  </div>
                </div>
              )}

            </div>


            {/* COMPLETED PICKUP / DELIVERY FEEDBACK UI */}
            {isCompleted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#EFE9DD] p-6 rounded-2xl border border-[#DDD5C7] space-y-4"
              >
                {isPickup ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-serif-display text-xl text-[#17382C]">
                        Your order is ready for pickup!
                      </h3>
                      <p className="text-xs text-[#716D66] mt-0.5">
                        Head over to 123 Mercer Street to collect your meal.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <Button
                        variant="primary"
                        size="md"
                        onClick={handleGetDirections}
                        icon={Navigation}
                      >
                        GET DIRECTIONS
                      </Button>

                      <Button
                        variant="outline"
                        size="md"
                        onClick={handleOrderAgain}
                        icon={RefreshCw}
                      >
                        ORDER AGAIN
                      </Button>
                    </div>
                  </div>
                ) : (
                  /* Delivery Feedback Stars */
                  <div className="space-y-3">
                    <h3 className="font-serif-display text-xl text-[#17382C]">
                      HOW WAS EVERYTHING?
                    </h3>
                    <p className="text-xs text-[#716D66]">
                      Let us know how your delivery experience was today.
                    </p>

                    {!ratingSubmitted ? (
                      <div className="flex items-center gap-2 pt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => {
                              setUserRating(star);
                              setRatingSubmitted(true);
                            }}
                            className="p-2 rounded-lg hover:bg-[#F7F3EA] transition-all text-[#B95F3B]"
                          >
                            <Star className={`w-6 h-6 ${star <= userRating ? 'fill-[#B95F3B]' : ''}`} />
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="p-3 bg-[#F7F3EA] rounded-xl border border-[#DDD5C7] text-xs font-semibold text-[#17382C] flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#B95F3B]" />
                        <span>Thanks for the feedback! We appreciate your support.</span>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}

          </div>


          {/* RIGHT COLUMN: STICKY ORDER SUMMARY (~35%) */}
          <div className="hidden lg:block lg:col-span-5 sticky top-28 space-y-6">
            <div className="bg-[#EFE9DD] rounded-2xl border border-[#DDD5C7] p-6 space-y-6 shadow-sm">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#DDD5C7] pb-3">
                <span className="font-serif-display text-xl text-[#17382C]">YOUR ORDER</span>
                <span className="text-xs text-[#716D66] font-medium">
                  {order.items?.reduce((sum, i) => sum + i.quantity, 0)} Items
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                {order.items?.map((cartItem) => (
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
                      
                      {/* Customization Details */}
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
                  <span className="font-medium text-[#22211F]">${order.cartSubtotal?.toFixed(2)}</span>
                </div>

                {order.fulfillmentMode === 'delivery' && (
                  <div className="flex justify-between text-[#716D66]">
                    <span>Delivery Fee</span>
                    <span className="font-medium text-[#22211F]">${order.deliveryFee?.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#716D66]">
                  <span>Estimated Tax</span>
                  <span className="font-medium text-[#22211F]">${order.taxAmount?.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-[#716D66]">
                  <span>Tip</span>
                  <span className="font-medium text-[#22211F]">${order.tipAmount?.toFixed(2)}</span>
                </div>

                <div className="flex justify-between font-serif-display text-lg text-[#17382C] pt-2 border-t border-[#DDD5C7]">
                  <span>TOTAL</span>
                  <span className="text-[#B95F3B] font-bold">${order.orderTotal?.toFixed(2)}</span>
                </div>
              </div>

              {/* Rewards Moment */}
              <div className="p-3 bg-[#F7F3EA] rounded-xl border border-[#DDD5C7] text-xs text-[#17382C] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#B95F3B]" />
                  <span>Earned <strong>+{order.pointsEarned || Math.round(order.cartSubtotal || 0)} points</strong></span>
                </div>
                <Link to="/rewards" className="text-[#B95F3B] font-semibold hover:underline text-[11px]">
                  VIEW REWARDS →
                </Link>
              </div>

              {/* Support / Need Help */}
              <div className="pt-2 border-t border-[#DDD5C7] space-y-1.5 text-xs">
                <span className="font-semibold text-[#17382C] block uppercase tracking-wider text-[11px]">
                  NEED HELP?
                </span>
                <div className="text-[#716D66]">
                  Call restaurant directly at{' '}
                  <a href="tel:2125550198" className="text-[#17382C] font-semibold underline">
                    (212) 555-0198
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
