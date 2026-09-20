import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { menuItems } from '../data/menuData';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  Sparkles,
  Gift,
  ShoppingBag,
  Plus,
  Check,
  RotateCcw,
  Heart,
  ArrowRight,
  Utensils,
  ChevronRight,
  Calendar,
  X,
  Clock,
  Star,
  Zap
} from 'lucide-react';
import { Button } from '../components/common/Button';

export const RewardsPage = () => {
  const { user, setUser, addToCart, setCartOpen, setCustomizingItem, showToast, currentOrder } = useApp();

  // Redemption Modal State
  const [selectedRewardToRedeem, setSelectedRewardToRedeem] = useState(null);
  const [redeemedRewardIds, setRedeemedRewardIds] = useState([]);

  // Local points activity tracking
  const [extraActivity, setExtraActivity] = useState([]);

  // Favorite dishes lookup from menuData
  const favoriteDishes = useMemo(() => {
    const favIds = user.favoriteDishIds || ['m_1', 'm_3', 'm_7'];
    return menuItems.filter(item => favIds.includes(item.id));
  }, [user.favoriteDishIds]);

  // Personalized recommendation item (e.g. Smoked Brisket Mac & Cheese 'm_2')
  const recommendedDish = useMemo(() => {
    return menuItems.find(item => item.id === 'm_2') || menuItems[1];
  }, []);

  // Calculate percentage to next milestone (1000 points)
  const targetMilestone = 1000;
  const currentPoints = user.points || 780;
  const pointsNeeded = Math.max(0, targetMilestone - currentPoints);
  const progressPercent = Math.min(100, Math.round((currentPoints / targetMilestone) * 100));

  // Available rewards list
  const rewardsList = user.availableRewards || [];

  // Redeem Reward Handler
  const handleConfirmRedemption = () => {
    if (!selectedRewardToRedeem) return;

    const cost = selectedRewardToRedeem.pointsCost;
    if (currentPoints < cost) {
      showToast("Insufficient points balance.", "error");
      setSelectedRewardToRedeem(null);
      return;
    }

    // Deduct points
    const newPoints = currentPoints - cost;
    setUser(prev => ({
      ...prev,
      points: newPoints
    }));

    // Mark as redeemed
    setRedeemedRewardIds(prev => [...prev, selectedRewardToRedeem.id]);

    // Add activity log entry
    const newActivityEntry = {
      id: `act_${Date.now()}`,
      date: 'Today',
      description: `${selectedRewardToRedeem.title} Redeemed`,
      pointsChange: -cost
    };
    setExtraActivity(prev => [newActivityEntry, ...prev]);

    showToast(`Reward redeemed! ${selectedRewardToRedeem.title} added to your account.`);
    setSelectedRewardToRedeem(null);
  };

  // Re-order past order handler
  const handleReorderPastOrder = (orderItemIds) => {
    if (!orderItemIds || orderItemIds.length === 0) {
      // Fallback: reorder top favorite dish
      const item = favoriteDishes[0];
      if (item) addToCart(item);
    } else {
      let count = 0;
      orderItemIds.forEach(id => {
        const found = menuItems.find(m => m.id === id);
        if (found) {
          addToCart(found);
          count++;
        }
      });
    }

    showToast("Your favorites are back in your order!");
    setCartOpen(true);
  };

  return (
    <div className="bg-[#F7F3EA] min-h-screen text-[#22211F] font-sans pb-16">
      
      {/* ============================================================
          1. INTRO & CUSTOMER RECOGNITION (No hero image!)
         ============================================================ */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-12">
        
        {/* Editorial Page Header */}
        <div className="space-y-2">
          {/* Pure Typography Eyebrow (NO pill background!) */}
          <span className="text-xs font-semibold tracking-widest text-[#B95F3B] uppercase block">
            EMBER REWARDS
          </span>

          <h1 className="font-serif-display text-3xl sm:text-5xl text-[#17382C]">
            Good to see you, {user.name.split(' ')[0]}.
          </h1>

          <p className="text-sm sm:text-base text-[#716D66] max-w-xl">
            Good food tastes even better when it comes with something back.
          </p>
        </div>


        {/* ============================================================
            2. PRIMARY POINTS BALANCE & PROGRESS (Editorial Composition)
           ============================================================ */}
        <div className="bg-[#EFE9DD] rounded-2xl border border-[#DDD5C7] p-6 sm:p-8 space-y-6 shadow-sm">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Left: Points Hero Typography */}
            <div className="md:col-span-5 space-y-1 border-b md:border-b-0 md:border-r border-[#DDD5C7] pb-6 md:pb-0 md:pr-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#B95F3B] block">
                YOUR BALANCE
              </span>

              <div className="flex items-baseline gap-3">
                <span className="font-serif-display text-5xl sm:text-6xl text-[#17382C] font-normal">
                  {currentPoints}
                </span>
                <span className="text-lg sm:text-xl font-bold tracking-wider text-[#17382C] uppercase">
                  POINTS
                </span>
              </div>

              <div className="text-xs text-[#716D66] pt-1">
                Member status • $1 spent = 1 Ember Point
              </div>
            </div>

            {/* Right: Horizontal Progress Indicator */}
            <div className="md:col-span-7 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-[#17382C]">
                <span>PROGRESS TO NEXT REWARD</span>
                <span>{currentPoints} / {targetMilestone} PTS</span>
              </div>

              {/* Progress Bar (Deep Forest fill, Sand background) */}
              <div className="h-3 w-full bg-[#DDD5C7] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#17382C] transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-[#716D66]">
                <span>
                  {pointsNeeded > 0 ? (
                    <><strong>{pointsNeeded} points</strong> until your next $25 Dining Reward.</>
                  ) : (
                    <>You've unlocked the <strong>$25 Dining Reward!</strong></>
                  )}
                </span>
                <span className="text-[#B95F3B] font-semibold">{progressPercent}% complete</span>
              </div>
            </div>

          </div>

        </div>


        {/* ============================================================
            3. AVAILABLE REWARDS (Redemption Interaction)
           ============================================================ */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            {/* Pure Typography Eyebrow */}
            <span className="text-xs font-semibold uppercase tracking-widest text-[#B95F3B] block">
              AVAILABLE FOR YOU
            </span>
            <span className="text-xs text-[#716D66]">
              Redeem points for dining rewards
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {rewardsList.map((reward) => {
              const canRedeem = currentPoints >= reward.pointsCost;
              const isRedeemed = redeemedRewardIds.includes(reward.id);

              return (
                <div
                  key={reward.id}
                  className={`p-5 rounded-2xl border flex flex-col justify-between transition-all ${
                    isRedeemed
                      ? 'bg-[#17382C] text-white border-[#17382C]'
                      : canRedeem
                      ? 'bg-[#EFE9DD] border-[#DDD5C7] text-[#22211F] hover:border-[#17382C]'
                      : 'bg-[#EFE9DD]/50 border-[#DDD5C7]/50 opacity-60 text-[#716D66]'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold uppercase tracking-wider ${
                        isRedeemed ? 'text-[#B95F3B]' : 'text-[#B95F3B]'
                      }`}>
                        {reward.pointsCost} POINTS
                      </span>
                      {isRedeemed && (
                        <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded bg-[#B95F3B] text-white">
                          READY TO USE
                        </span>
                      )}
                    </div>

                    <h3 className={`font-serif-display text-lg ${
                      isRedeemed ? 'text-white' : 'text-[#17382C]'
                    }`}>
                      {reward.title}
                    </h3>

                    <p className={`text-xs leading-relaxed ${
                      isRedeemed ? 'text-[#DDD5C7]' : 'text-[#716D66]'
                    }`}>
                      {reward.description}
                    </p>
                  </div>

                  <div className="pt-4">
                    {isRedeemed ? (
                      <div className="text-xs text-[#DDD5C7] font-medium flex items-center gap-1.5">
                        <Check className="w-4 h-4 text-[#B95F3B]" />
                        <span>Applied to your account</span>
                      </div>
                    ) : canRedeem ? (
                      <Button
                        variant="primary"
                        size="sm"
                        fullWidth
                        onClick={() => setSelectedRewardToRedeem(reward)}
                      >
                        REDEEM →
                      </Button>
                    ) : (
                      <div className="text-xs text-[#716D66] font-medium text-center py-1 bg-[#DDD5C7]/40 rounded-lg">
                        {reward.pointsCost - currentPoints} PTS NEEDED
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </div>


        {/* ============================================================
            4. YOUR FAVORITES (Quick Order / Customize)
           ============================================================ */}
        <div className="space-y-6 pt-4">
          <div>
            {/* Pure Typography Eyebrow */}
            <span className="text-xs font-semibold uppercase tracking-widest text-[#B95F3B] block mb-1">
              YOUR FAVORITES
            </span>
            <h2 className="font-serif-display text-2xl sm:text-3xl text-[#17382C]">
              The dishes you keep coming back to.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {favoriteDishes.map((dish) => (
              <div
                key={dish.id}
                className="bg-[#EFE9DD] border border-[#DDD5C7] overflow-hidden flex flex-col justify-between hover:border-[#17382C] transition-all group"
              >
                <div>
                  {/* Dish Thumbnail */}
                  <div className="h-44 relative overflow-hidden">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover rounded-none transition-transform duration-500 filter brightness-95"
                    />
                    <div className="absolute top-3 right-3 bg-[#17382C]/90 backdrop-blur-xs text-white text-xs font-bold px-2.5 py-1">
                      ${dish.price.toFixed(2)}
                    </div>
                  </div>

                  {/* Dish Info */}
                  <div className="p-4 space-y-1.5">
                    <h3 className="font-serif-display text-lg text-[#17382C] group-hover:text-[#B95F3B] transition-colors">
                      {dish.name}
                    </h3>
                    <p className="text-xs text-[#716D66] line-clamp-2 leading-relaxed">
                      {dish.description}
                    </p>
                  </div>
                </div>

                {/* Dish Action */}
                <div className="p-4 pt-0">
                  {dish.customizable ? (
                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      onClick={() => setCustomizingItem(dish)}
                    >
                      CUSTOMIZE
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      size="sm"
                      fullWidth
                      onClick={() => {
                        addToCart(dish);
                      }}
                    >
                      ORDER AGAIN
                    </Button>
                  )}
                </div>

              </div>
            ))}
          </div>
        </div>


        {/* ============================================================
            5. RECENT ORDERS & INSTANT REORDER
           ============================================================ */}
        <div className="space-y-6 pt-4">
          <div>
            {/* Pure Typography Eyebrow */}
            <span className="text-xs font-semibold uppercase tracking-widest text-[#B95F3B] block mb-1">
              RECENT ORDERS
            </span>
            <h2 className="font-serif-display text-2xl sm:text-3xl text-[#17382C]">
              Order history & instant reordering.
            </h2>
          </div>

          <div className="bg-[#EFE9DD] rounded-2xl border border-[#DDD5C7] divide-y divide-[#DDD5C7] overflow-hidden">
            
            {/* Render Current Order if placed recently */}
            {currentOrder && (
              <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#F7F3EA]/60">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#B95F3B]">
                      TODAY • {currentOrder.fulfillmentMode.toUpperCase()}
                    </span>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[#477A5B] text-white">
                      {currentOrder.orderId}
                    </span>
                  </div>
                  <div className="font-serif-display text-base text-[#17382C]">
                    {currentOrder.items.map(i => `${i.quantity}x ${i.item.name}`).join(', ')}
                  </div>
                  <div className="text-xs text-[#716D66]">
                    Total: ${currentOrder.orderTotal.toFixed(2)} • Earned +{currentOrder.pointsEarned} points
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleReorderPastOrder(currentOrder.items.map(i => i.item.id))}
                  icon={RotateCcw}
                  className="shrink-0"
                >
                  ORDER AGAIN →
                </Button>
              </div>
            )}

            {/* Past Mock Orders */}
            {(user.recentOrders || []).map((pastOrder) => (
              <div key={pastOrder.id} className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#17382C]">
                      {pastOrder.date} • {pastOrder.fulfillmentMode?.toUpperCase() || 'PICKUP'}
                    </span>
                    <span className="text-xs text-[#716D66]">#{pastOrder.id}</span>
                  </div>
                  <div className="font-serif-display text-base text-[#17382C]">
                    {pastOrder.itemsSummary}
                  </div>
                  <div className="text-xs text-[#716D66]">
                    Total: ${pastOrder.total.toFixed(2)} • {pastOrder.itemsCount} items
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleReorderPastOrder(pastOrder.itemIds)}
                  icon={RotateCcw}
                  className="shrink-0"
                >
                  ORDER AGAIN →
                </Button>
              </div>
            ))}

          </div>
        </div>


        {/* ============================================================
            6. YOU MIGHT LIKE (Personalized Recommendation)
           ============================================================ */}
        <div className="bg-[#EFE9DD] rounded-2xl border border-[#DDD5C7] p-6 sm:p-8 space-y-4">
          {/* Pure Typography Eyebrow */}
          <span className="text-xs font-semibold uppercase tracking-widest text-[#B95F3B] block">
            YOU MIGHT LIKE
          </span>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-lg">
              <span className="text-xs text-[#716D66] block italic">
                Because you order the Truffle Mushroom Burger...
              </span>
              <h3 className="font-serif-display text-2xl text-[#17382C]">
                {recommendedDish.name}
              </h3>
              <p className="text-xs text-[#716D66] leading-relaxed">
                {recommendedDish.description}
              </p>
            </div>

            <div className="flex items-center gap-4 shrink-0 w-full md:w-auto justify-between md:justify-end">
              <div className="font-serif-display text-2xl text-[#17382C]">
                ${recommendedDish.price.toFixed(2)}
              </div>

              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  if (recommendedDish.customizable) {
                    setCustomizingItem(recommendedDish);
                  } else {
                    addToCart(recommendedDish);
                  }
                }}
              >
                TRY THIS →
              </Button>
            </div>
          </div>
        </div>


        {/* ============================================================
            7. MEMBER BENEFITS & BIRTHDAY TREAT
           ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Benefits */}
          <div className="bg-[#EFE9DD]/70 rounded-2xl border border-[#DDD5C7] p-6 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#B95F3B] block">
              MEMBER BENEFITS
            </span>
            <h3 className="font-serif-display text-xl text-[#17382C]">
              Ember & Oak Loyalty
            </h3>
            <ul className="text-xs text-[#716D66] space-y-2 pt-1">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#B95F3B] shrink-0 mt-0.5" />
                <span>Earn 1 point for every $1 spent on all direct online orders & dining.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#B95F3B] shrink-0 mt-0.5" />
                <span>Early access to seasonal wood-fired menu highlights & chef specials.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#B95F3B] shrink-0 mt-0.5" />
                <span>Complimentary dessert reward during your birthday month.</span>
              </li>
            </ul>
          </div>

          {/* Birthday Treat */}
          <div className="bg-[#17382C] text-white rounded-2xl p-6 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#B95F3B]">
                  BIRTHDAY BENEFIT
                </span>
                <Gift className="w-5 h-5 text-[#B95F3B]" />
              </div>
              <h3 className="font-serif-display text-xl text-[#F7F3EA]">
                A Little Something On Your Birthday
              </h3>
              <p className="text-xs text-[#DDD5C7] leading-relaxed">
                Rewards members receive a complimentary wood-fired dessert during their birthday month.
              </p>
            </div>

            <div className="text-[11px] text-[#DDD5C7] pt-2 border-t border-white/15">
              Automatically applied to your account during your birthday month.
            </div>
          </div>

        </div>


        {/* ============================================================
            8. POINTS ACTIVITY LOG
           ============================================================ */}
        <div className="space-y-4 pt-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#B95F3B] block">
            POINTS ACTIVITY
          </span>

          <div className="bg-[#EFE9DD] rounded-2xl border border-[#DDD5C7] divide-y divide-[#DDD5C7] text-xs">
            
            {/* Extra activity entries if redeemed during session */}
            {extraActivity.map(act => (
              <div key={act.id} className="p-4 flex justify-between items-center bg-[#F7F3EA]/80">
                <div>
                  <div className="font-semibold text-[#17382C]">{act.description}</div>
                  <div className="text-[#716D66] text-[11px]">{act.date}</div>
                </div>
                <span className="font-bold text-[#B95F3B]">{act.pointsChange} pts</span>
              </div>
            ))}

            {currentOrder && (
              <div className="p-4 flex justify-between items-center">
                <div>
                  <div className="font-semibold text-[#17382C]">
                    {currentOrder.fulfillmentMode === 'pickup' ? 'Pickup Order' : 'Delivery Order'} #{currentOrder.orderId}
                  </div>
                  <div className="text-[#716D66] text-[11px]">Today</div>
                </div>
                <span className="font-bold text-[#477A5B]">+{currentOrder.pointsEarned} pts</span>
              </div>
            )}

            <div className="p-4 flex justify-between items-center">
              <div>
                <div className="font-semibold text-[#17382C]">Pickup Order #ORD-88219</div>
                <div className="text-[#716D66] text-[11px]">Sep 14, 2026</div>
              </div>
              <span className="font-bold text-[#477A5B]">+43 pts</span>
            </div>

            <div className="p-4 flex justify-between items-center">
              <div>
                <div className="font-semibold text-[#17382C]">Delivery Order #ORD-77104</div>
                <div className="text-[#716D66] text-[11px]">Aug 29, 2026</div>
              </div>
              <span className="font-bold text-[#477A5B]">+68 pts</span>
            </div>

          </div>
        </div>


        {/* Bottom Menu CTA Strip */}
        <div className="pt-8 text-center space-y-4 border-t border-[#DDD5C7]">
          <h3 className="font-serif-display text-2xl text-[#17382C]">
            Ready for your next meal?
          </h3>
          <Link to="/menu">
            <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
              ORDER ONLINE TO EARN POINTS
            </Button>
          </Link>
        </div>

      </div>


      {/* ============================================================
          REDEMPTION CONFIRMATION MODAL
         ============================================================ */}
      <AnimatePresence>
        {selectedRewardToRedeem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#EFE9DD] rounded-2xl border border-[#DDD5C7] max-w-md w-full p-6 space-y-6 shadow-xl text-left"
            >
              <div className="flex items-center justify-between border-b border-[#DDD5C7] pb-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#B95F3B]">
                  CONFIRM REDEMPTION
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedRewardToRedeem(null)}
                  className="p-1 rounded-lg text-[#716D66] hover:text-[#17382C]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                <h3 className="font-serif-display text-2xl text-[#17382C]">
                  {selectedRewardToRedeem.title}
                </h3>
                <p className="text-xs text-[#716D66] leading-relaxed">
                  Redeem <strong>{selectedRewardToRedeem.pointsCost} points</strong> for this reward? Your new balance will be <strong>{currentPoints - selectedRewardToRedeem.pointsCost} points</strong>.
                </p>
              </div>

              <div className="p-3 bg-[#F7F3EA] rounded-xl border border-[#DDD5C7] text-xs text-[#17382C]">
                Once redeemed, this reward will be ready to apply on your next order.
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => setSelectedRewardToRedeem(null)}
                >
                  CANCEL
                </Button>

                <Button
                  variant="primary"
                  size="md"
                  onClick={handleConfirmRedemption}
                >
                  REDEEM REWARD
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
