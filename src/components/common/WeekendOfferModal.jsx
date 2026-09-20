import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { useApp } from '../../context/AppContext';
import { Sparkles, Check, Utensils, Calendar } from 'lucide-react';

export const WeekendOfferModal = ({ isOpen, onClose }) => {
  const { addToCart, setCustomizingItem } = useApp();

  const offerItem = {
    id: "m_offer_dinner2",
    name: "Weekend Dinner for Two Package",
    category: "popular",
    price: 49.00,
    calories: 1450,
    rating: 4.9,
    reviewCount: 95,
    badges: ["Weekend Special", "Value Deal"],
    dietaryTags: ["High Protein"],
    spiceLevel: 0,
    description: "Two signature mains, one shared artisanal starter, and one handcrafted dessert for a complete fire-grilled dining experience.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    customizationOptions: {
      patties: [
        { name: "Main 1: Truffle Mushroom Burger & Main 2: Hot Honey Chicken", priceOffset: 0 },
        { name: "Main 1: Maple Glazed Salmon & Main 2: Truffle Mushroom Burger", priceOffset: 5.00 },
        { name: "Main 1: Fire-Grilled Chicken Bowl & Main 2: Hot Honey Chicken", priceOffset: 0 }
      ],
      cheeses: [
        { name: "Starter: Charred Brussels & Bacon", priceOffset: 0 },
        { name: "Starter: Smoked Mac & Cheese", priceOffset: 0 }
      ],
      extras: [
        { id: "ex_cake", name: "Dessert: Molten Chocolate Lava Cake", price: 0 }
      ]
    }
  };

  const handleCustomizePackage = () => {
    onClose();
    setCustomizingItem(offerItem);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Weekend Dinner for Two — $49"
      subtitle="Available Friday through Sunday • Dine-in, Pickup or Delivery"
      maxWidth="max-w-xl"
    >
      <div className="space-y-6 py-2">
        {/* Banner Visual */}
        <div className="relative h-44 rounded-none overflow-hidden bg-[#10291F]">
          <img
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
            alt="Dinner for Two Table Setting"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#10291F] via-[#10291F]/40 to-transparent flex items-end p-4">
            <div className="text-white">
              <span className="text-[11px] font-semibold text-[#B95F3B] uppercase tracking-widest block">
                WEEKEND SPECIAL
              </span>
              <h4 className="font-serif-display text-2xl text-white mt-1">
                Complete 3-Course Feast for Two
              </h4>
            </div>
          </div>
        </div>

        {/* Package Inclusions List */}
        <div className="space-y-3">
          <h5 className="text-xs font-semibold text-[#17382C] uppercase tracking-wider">
            Package Inclusions ($72 Regular Value)
          </h5>

          <div className="space-y-2 text-xs">
            <div className="p-3 bg-white rounded-xl border border-[#DDD5C7] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-full bg-[#17382C] text-white flex items-center justify-center font-bold text-[11px]">1</div>
                <div>
                  <div className="font-semibold text-[#17382C]">Choice of Any 2 Signature Mains</div>
                  <div className="text-[#716D66]">Burgers, Hot Honey Chicken, or Grain Bowls</div>
                </div>
              </div>
              <Check className="w-4 h-4 text-[#477A5B]" />
            </div>

            <div className="p-3 bg-white rounded-xl border border-[#DDD5C7] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-full bg-[#17382C] text-white flex items-center justify-center font-bold text-[11px]">2</div>
                <div>
                  <div className="font-semibold text-[#17382C]">1 Shared Artisan Starter</div>
                  <div className="text-[#716D66]">Charred Brussels & Bacon or Smoked Mac & Cheese</div>
                </div>
              </div>
              <Check className="w-4 h-4 text-[#477A5B]" />
            </div>

            <div className="p-3 bg-white rounded-xl border border-[#DDD5C7] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-full bg-[#17382C] text-white flex items-center justify-center font-bold text-[11px]">3</div>
                <div>
                  <div className="font-semibold text-[#17382C]">1 Handcrafted Dessert</div>
                  <div className="text-[#716D66]">Molten Chocolate Lava Cake or Bourbon Pecan Tart</div>
                </div>
              </div>
              <Check className="w-4 h-4 text-[#477A5B]" />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <Button variant="outline" fullWidth onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" fullWidth onClick={handleCustomizePackage}>
            CUSTOMIZE PACKAGE — $49.00
          </Button>
        </div>
      </div>
    </Modal>
  );
};
