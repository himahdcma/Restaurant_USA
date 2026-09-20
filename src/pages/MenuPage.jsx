import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CategoryTabs } from '../components/food/CategoryTabs';
import { FilterChip } from '../components/food/FilterChip';
import { FoodGrid } from '../components/food/FoodGrid';
import { FoodCard } from '../components/food/FoodCard';
import { DiningModeSelector } from '../components/ordering/DiningModeSelector';
import { menuItems } from '../data/menuData';
import { Search, Sparkles, X, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { Button } from '../components/common/Button';

export const MenuPage = () => {
  const { setFinderOpen, setCustomizingItem, fulfillmentMode } = useApp();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  const dietaryFilterOptions = [
    'Vegetarian',
    'Gluten Friendly',
    'High Protein',
    'Spicy',
    'Under $20'
  ];

  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setActiveCategory('all');
    setSearchQuery('');
    setSelectedTags([]);
  };

  const filteredItems = menuItems.filter(item => {
    if (activeCategory !== 'all') {
      if (activeCategory === 'popular' && !item.popular) return false;
      if (activeCategory !== 'popular' && item.category !== activeCategory) return false;
    }

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchCat = item.category.toLowerCase().includes(q);
      const matchTag = item.dietaryTags.some(t => t.toLowerCase().includes(q));
      if (!matchName && !matchDesc && !matchCat && !matchTag) return false;
    }

    if (selectedTags.length > 0) {
      for (const tag of selectedTags) {
        if (tag === 'Spicy' && item.spiceLevel === 0) return false;
        if (tag === 'Under $20' && item.price > 20) return false;
        if (['High Protein', 'Vegetarian', 'Gluten Friendly'].includes(tag)) {
          if (!item.dietaryTags.includes(tag)) return false;
        }
      }
    }

    return true;
  });

  const ravioliItem = menuItems.find(i => i.id === 'm_23') || menuItems[3];
  const isFilteringActive = activeCategory !== 'all' || searchQuery.trim() !== '' || selectedTags.length > 0;

  return (
    <div className="space-y-0 pb-16">
      
      {/* ==================================================
          1. MENU HERO
         ================================================== */}
      <section className="relative bg-[#10291F] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1920&q=80"
            alt="Ember & Oak Wood-Fired Kitchen Dining"
            className="w-full h-full object-cover filter brightness-75 rounded-none"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#10291F]/95 via-[#10291F]/85 to-[#10291F]/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl space-y-4">
            <span className="text-xs font-semibold tracking-[0.16em] text-[#B95F3B] uppercase block">
              OUR KITCHEN MENU
            </span>

            <h1 className="font-serif text-4xl sm:text-6xl text-white leading-tight">
              Good food. <br />
              <span className="italic text-[#EFE9DD]">Made to crave.</span>
            </h1>

            <p className="text-sm sm:text-base text-[#DDD5C7] font-sans font-light leading-relaxed max-w-lg">
              Seasonal ingredients, familiar favorites, and a few things worth trying for the first time.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-[#DDD5C7]/90 font-medium tracking-wide">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-[#477A5B]" />
                <span>Open Now</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#B95F3B]" />
                <span>Pickup ready in 20–30 min</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#B95F3B]" />
                <span>123 Mercer Street, SoHo</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          2. FULFILLMENT MODE CONTROL STRIP
         ================================================== */}
      <section className="bg-[#EFE9DD] border-b border-[#DDD5C7] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-medium text-[#17382C]">
            <MapPin className="w-4 h-4 text-[#B95F3B]" />
            <span>
              {fulfillmentMode === 'pickup' && 'Pickup from Ember & Oak • 123 Mercer Street, New York, NY'}
              {fulfillmentMode === 'delivery' && 'Delivery available in select nearby Manhattan areas.'}
              {fulfillmentMode === 'dine-in' && 'Dine-In • Table reservations available'}
            </span>
          </div>

          <div className="w-full sm:w-auto">
            <DiningModeSelector />
          </div>
        </div>
      </section>

      {/* ==================================================
          3. STICKY CATEGORY NAV & SEARCH / FILTERS BAR
         ================================================== */}
      <div className="sticky top-[64px] sm:top-[72px] z-30 bg-[#F7F3EA]/98 backdrop-blur-md border-b border-[#DDD5C7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 space-y-3">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <CategoryTabs
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
            />

            <div className="w-full lg:w-72 relative shrink-0">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search the menu..."
                className="w-full bg-white border border-[#DDD5C7] rounded-none pl-9 pr-4 py-2 text-xs text-[#22211F] placeholder-[#716D66] focus:outline-none focus:border-[#17382C] transition-all"
              />
              <Search className="w-3.5 h-3.5 text-[#716D66] absolute left-3 top-3" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-[#716D66] hover:text-[#22211F]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[#DDD5C7]/50">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-[#716D66] uppercase tracking-wider mr-1">Filters:</span>
              {dietaryFilterOptions.map((tag) => (
                <FilterChip
                  key={tag}
                  label={tag}
                  selected={selectedTags.includes(tag)}
                  onClick={() => toggleTag(tag)}
                />
              ))}
            </div>

            <div className="flex items-center gap-4">
              {(selectedTags.length > 0 || searchQuery || activeCategory !== 'all') && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-[#B95F3B] font-semibold uppercase tracking-wider hover:underline"
                >
                  Clear all
                </button>
              )}
              <button
                onClick={() => setFinderOpen(true)}
                className="text-xs text-[#17382C] font-semibold uppercase tracking-wider hover:text-[#B95F3B] flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#B95F3B]" />
                <span>Smart Finder</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ==================================================
          4. MAIN DISHES DISPLAY
         ================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
        
        {isFilteringActive ? (
          <div>
            <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#DDD5C7]">
              <h3 className="font-serif text-2xl text-[#17382C]">
                Results ({filteredItems.length})
              </h3>
              {filteredItems.length === 0 && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-[#B95F3B] font-semibold uppercase tracking-wider hover:underline"
                >
                  Reset filters
                </button>
              )}
            </div>

            {filteredItems.length === 0 ? (
              <div className="text-center py-20 px-4 bg-[#EFE9DD]/50 border border-[#DDD5C7] space-y-4 rounded-none">
                <h4 className="font-serif text-2xl text-[#17382C]">No matching dishes</h4>
                <p className="text-xs text-[#716D66] max-w-sm mx-auto">
                  Try searching for another dish or clear active dietary filters.
                </p>
                <Button variant="primary" size="sm" onClick={clearFilters}>
                  CLEAR FILTERS
                </Button>
              </div>
            ) : (
              <FoodGrid items={filteredItems} />
            )}
          </div>
        ) : (
          <div className="space-y-20">
            
            <section>
              <div className="mb-8">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B95F3B] block mb-1">
                  POPULAR RIGHT NOW
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#17382C]">
                  Guest Favorites
                </h2>
              </div>
              <FoodGrid items={menuItems.filter(i => i.popular)} />
            </section>

            {/* SEASONAL FEATURE */}
            <section className="bg-[#EFE9DD]/70 p-8 sm:p-12 border border-[#DDD5C7] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-none">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B95F3B] block">
                  FROM THE FALL KITCHEN
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl text-[#17382C]">
                  {ravioliItem.name}
                </h2>
                <p className="text-sm text-[#716D66] font-light leading-relaxed max-w-lg">
                  {ravioliItem.description}
                </p>
                <div className="text-lg font-bold text-[#B95F3B]">
                  ${ravioliItem.price.toFixed(2)} • Limited seasonal menu
                </div>
                <div>
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => setCustomizingItem(ravioliItem)}
                  >
                    CUSTOMIZE DISH — ${ravioliItem.price.toFixed(2)}
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="aspect-[4/3] border border-[#DDD5C7] overflow-hidden rounded-none bg-[#10291F]">
                  <img
                    src={ravioliItem.image}
                    alt={ravioliItem.name}
                    className="w-full h-full object-cover rounded-none"
                  />
                </div>
              </div>
            </section>

            {/* STARTERS & SMALL PLATES */}
            <section>
              <div className="mb-8">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B95F3B] block mb-1">
                  STARTERS &amp; SMALL PLATES
                </span>
                <h2 className="font-serif text-3xl text-[#17382C]">
                  To Share &amp; Begin
                </h2>
              </div>
              <FoodGrid items={menuItems.filter(i => i.category === 'starters')} />
            </section>

            {/* WOOD-FIRED BURGERS */}
            <section>
              <div className="mb-8">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B95F3B] block mb-1">
                  WOOD-FIRED BURGERS
                </span>
                <h2 className="font-serif text-3xl text-[#17382C]">
                  Handheld Favorites
                </h2>
              </div>
              <FoodGrid items={menuItems.filter(i => i.category === 'burgers')} />
            </section>

            {/* SIGNATURE MAINS */}
            <section>
              <div className="mb-8">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B95F3B] block mb-1">
                  SIGNATURE MAINS
                </span>
                <h2 className="font-serif text-3xl text-[#17382C]">
                  Fire-Grilled Specialties
                </h2>
              </div>
              <FoodGrid items={menuItems.filter(i => i.category === 'mains')} />
            </section>

            {/* GRAIN BOWLS */}
            <section>
              <div className="mb-8">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B95F3B] block mb-1">
                  GRAIN BOWLS
                </span>
                <h2 className="font-serif text-3xl text-[#17382C]">
                  Nourishing Bowls
                </h2>
              </div>
              <FoodGrid items={menuItems.filter(i => i.category === 'bowls')} />
            </section>

            {/* FRESH SALADS */}
            <section>
              <div className="mb-8">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B95F3B] block mb-1">
                  FRESH SALADS
                </span>
                <h2 className="font-serif text-3xl text-[#17382C]">
                  Farm Greens &amp; Produce
                </h2>
              </div>
              <FoodGrid items={menuItems.filter(i => i.category === 'salads')} />
            </section>

            {/* DESSERTS & DRINKS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <section>
                <div className="mb-8">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B95F3B] block mb-1">
                    HANDCRAFTED DESSERTS
                  </span>
                  <h2 className="font-serif text-3xl text-[#17382C]">
                    Sweet Endings
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {menuItems.filter(i => i.category === 'desserts').map(item => (
                    <FoodCard key={item.id} item={item} />
                  ))}
                </div>
              </section>

              <section>
                <div className="mb-8">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B95F3B] block mb-1">
                    CRAFT DRINKS
                  </span>
                  <h2 className="font-serif text-3xl text-[#17382C]">
                    Cocktails &amp; Refreshments
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {menuItems.filter(i => i.category === 'drinks').map(item => (
                    <FoodCard key={item.id} item={item} />
                  ))}
                </div>
              </section>
            </div>

          </div>
        )}

      </div>

      {/* DIRECT ORDERING TRUST BANNER */}
      <section className="bg-[#EFE9DD]/60 py-12 border-t border-[#DDD5C7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="flex justify-center text-[#B95F3B]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="font-serif text-xl text-[#17382C]">
            Direct Ordering from Ember &amp; Oak
          </h4>
          <p className="text-xs text-[#716D66] max-w-md mx-auto">
            Fresh from our wood-fire kitchen • Easy 20-min pickup • Earn Oak Rewards on every dollar spent.
          </p>
        </div>
      </section>

    </div>
  );
};
