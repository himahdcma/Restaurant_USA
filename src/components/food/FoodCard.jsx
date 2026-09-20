import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { Star, Plus, Utensils } from 'lucide-react';

// Reliable secondary fallback dish photo
const FALLBACK_IMAGE_URL = "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80";

export const FoodCard = ({ item }) => {
  const { setCustomizingItem, addToCart } = useApp();
  
  const [imageSrc, setImageSrc] = useState(item.image);
  const [hasFailedOnce, setHasFailedOnce] = useState(false);
  const [showFallbackUI, setShowFallbackUI] = useState(false);

  const handleImageError = () => {
    if (!hasFailedOnce) {
      setHasFailedOnce(true);
      setImageSrc(FALLBACK_IMAGE_URL);
    } else {
      setShowFallbackUI(true);
    }
  };

  const hasOptions = item.customizationOptions && (
    (item.customizationOptions.patties && item.customizationOptions.patties.length > 0) ||
    (item.customizationOptions.cheeses && item.customizationOptions.cheeses.length > 0) ||
    (item.customizationOptions.doneness && item.customizationOptions.doneness.length > 0) ||
    (item.customizationOptions.base && item.customizationOptions.base.length > 0) ||
    (item.customizationOptions.protein && item.customizationOptions.protein.length > 0) ||
    (item.customizationOptions.sides && item.customizationOptions.sides.length > 0)
  );

  const handleCardClick = () => {
    setCustomizingItem(item);
  };

  const handleButtonClick = (e) => {
    e.stopPropagation();
    if (hasOptions) {
      setCustomizingItem(item);
    } else {
      addToCart(item, {}, 1, '');
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group bg-[#F7F3EA] border border-[#DDD5C7] overflow-hidden flex flex-col cursor-pointer transition-colors duration-200 hover:border-[#17382C]/50 rounded-none"
    >
      {/* Food Image Container (4:3 Aspect Ratio - Strictly Square Corners) */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EFE9DD] rounded-none">
        {!showFallbackUI ? (
          <img
            src={imageSrc}
            alt={item.imageAlt || item.name}
            onError={handleImageError}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-300 ease-out group-hover:scale-[1.02] rounded-none"
          />
        ) : (
          <div className="w-full h-full bg-[#EFE9DD] flex flex-col items-center justify-center p-4 text-center space-y-2 rounded-none">
            <div className="w-9 h-9 bg-[#17382C]/10 flex items-center justify-center text-[#17382C]">
              <Utensils className="w-4 h-4 text-[#B95F3B]" />
            </div>
            <span className="font-serif-display text-xs text-[#17382C] font-semibold">
              Ember &amp; Oak Signature
            </span>
          </div>
        )}

        {/* Functional Badges Overlay */}
        {item.badges && item.badges.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            {item.badges.map((badge, idx) => (
              <Badge key={idx}>{badge}</Badge>
            ))}
          </div>
        )}

        {/* Calorie Overlay */}
        {item.calories && (
          <div className="absolute bottom-3 right-3 bg-[#22211F]/90 text-white text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-sm z-10 border border-white/10">
            {item.calories} cal
          </div>
        )}
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3.5">
        <div>
          {/* Header Row: Title + Rating */}
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="font-serif text-lg md:text-xl text-[#17382C] group-hover:text-[#B95F3B] transition-colors leading-snug">
              {item.name}
            </h3>
            {item.rating && (
              <div className="flex items-center gap-1 text-[11px] font-semibold text-[#17382C] shrink-0 bg-[#EFE9DD] px-2 py-0.5 border border-[#DDD5C7]/60">
                <Star className="w-3 h-3 fill-[#B95F3B] text-[#B95F3B]" />
                <span>{item.rating}</span>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-xs text-[#716D66] line-clamp-2 leading-relaxed font-sans">
            {item.description}
          </p>
        </div>

        {/* Footer Row: Price + Intelligent Action */}
        <div className="pt-3 border-t border-[#DDD5C7]/60 flex items-center justify-between mt-auto">
          <div>
            <span className="text-[10px] text-[#716D66] uppercase tracking-wider block leading-none mb-0.5">Price</span>
            <span className="text-base font-bold text-[#17382C]">
              ${item.price.toFixed(2)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleButtonClick}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors duration-200 rounded-none ${
              hasOptions
                ? 'bg-[#17382C] text-[#F7F3EA] hover:bg-[#10291F]'
                : 'bg-[#B95F3B] text-white hover:bg-[#a25130]'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{hasOptions ? 'Customize' : 'Add'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
