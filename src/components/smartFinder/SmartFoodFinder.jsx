import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { menuItems } from '../../data/menuData';
import { Sparkles, Check, ArrowRight, RefreshCw, Flame, Heart, Leaf } from 'lucide-react';
import { Badge } from '../common/Badge';

export const SmartFoodFinder = () => {
  const { finderOpen, setFinderOpen, setCustomizingItem } = useApp();
  const [step, setStep] = useState(1);
  const [selectedCraving, setSelectedCraving] = useState('Hearty');
  const [selectedPreferences, setSelectedPreferences] = useState(['High Protein']);

  const cravings = [
    { id: 'Hearty', label: 'Hearty & Wood-Fired', desc: 'Satisfying, rich protein & oak charcoal smoke', icon: Flame },
    { id: 'Fresh', label: 'Fresh & Light', desc: 'Vibrant salads, grain bowls, clean herbs', icon: Leaf },
    { id: 'Spicy', label: 'Bold & Spicy', desc: 'Habanero honey, chipotle crema, shishito peppers', icon: Sparkles },
    { id: 'Comfort', label: 'Warm Comfort', desc: 'Smoked mac, smashed burgers, warm brioche', icon: Heart },
    { id: 'Sweet', label: 'Sweet Treat', desc: 'Decadent chocolate lava cake, bourbon churros', icon: Sparkles }
  ];

  const preferenceOptions = [
    'High Protein',
    'Vegetarian',
    'Gluten Friendly',
    'Under 700 Calories',
    'Under $20'
  ];

  const togglePreference = (pref) => {
    setSelectedPreferences(prev =>
      prev.includes(pref) ? prev.filter(p => p !== pref) : [...prev, pref]
    );
  };

  // Deterministic recommendation algorithm based on cravings & preferences
  const getRecommendation = () => {
    let filtered = menuItems;

    if (selectedCraving === 'Fresh') {
      filtered = filtered.filter(item => item.category === 'salads' || item.category === 'bowls');
    } else if (selectedCraving === 'Spicy') {
      filtered = filtered.filter(item => item.spiceLevel > 0);
    } else if (selectedCraving === 'Sweet') {
      filtered = filtered.filter(item => item.category === 'desserts');
    } else if (selectedCraving === 'Comfort') {
      filtered = filtered.filter(item => item.category === 'burgers' || item.id === 'm_13');
    }

    if (selectedPreferences.includes('Vegetarian')) {
      const veg = filtered.filter(i => i.dietaryTags.includes('Vegetarian'));
      if (veg.length > 0) filtered = veg;
    }
    if (selectedPreferences.includes('Under $20')) {
      const cheap = filtered.filter(i => i.price <= 20);
      if (cheap.length > 0) filtered = cheap;
    }
    if (selectedPreferences.includes('Under 700 Calories')) {
      const lowCal = filtered.filter(i => i.calories <= 700);
      if (lowCal.length > 0) filtered = lowCal;
    }

    // Default match if no filter results
    const match = filtered[0] || menuItems[0];
    return {
      dish: match,
      percentage: 97,
      reason: `Matches your craving for ${selectedCraving} and your preference for ${selectedPreferences.join(', ') || 'quality American cuisine'}.`
    };
  };

  const recommendation = getRecommendation();

  const handleReset = () => {
    setStep(1);
    setSelectedCraving('Hearty');
    setSelectedPreferences(['High Protein']);
  };

  const handleSelectRecommendation = () => {
    setFinderOpen(false);
    setCustomizingItem(recommendation.dish);
  };

  return (
    <Modal
      isOpen={finderOpen}
      onClose={() => setFinderOpen(false)}
      title="Smart Food Finder"
      subtitle="Answer 2 quick questions to uncover your ideal Ember & Oak match"
      maxWidth="max-w-xl"
    >
      <div className="py-2">
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#DDD5C7]">
          <div className="flex items-center gap-2">
            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              step >= 1 ? 'bg-[#17382C] text-white' : 'bg-[#EFE9DD] text-[#716D66]'
            }`}>1</span>
            <span className="text-xs font-semibold text-[#17382C]">Craving</span>
          </div>

          <div className="w-8 h-0.5 bg-[#DDD5C7]" />

          <div className="flex items-center gap-2">
            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              step >= 2 ? 'bg-[#17382C] text-white' : 'bg-[#EFE9DD] text-[#716D66]'
            }`}>2</span>
            <span className="text-xs font-semibold text-[#17382C]">Preferences</span>
          </div>

          <div className="w-8 h-0.5 bg-[#DDD5C7]" />

          <div className="flex items-center gap-2">
            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              step === 3 ? 'bg-[#B95F3B] text-white' : 'bg-[#EFE9DD] text-[#716D66]'
            }`}>3</span>
            <span className="text-xs font-semibold text-[#17382C]">Match</span>
          </div>
        </div>

        {/* STEP 1: Cravings */}
        {step === 1 && (
          <div className="space-y-4">
            <h4 className="font-serif-display text-xl text-[#17382C]">What are you craving today?</h4>
            <div className="space-y-2.5">
              {cravings.map((c) => {
                const IconComponent = c.icon;
                const isSelected = selectedCraving === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedCraving(c.id)}
                    className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                      isSelected
                        ? 'border-[#B95F3B] bg-[#B95F3B]/10 font-semibold text-[#17382C]'
                        : 'border-[#DDD5C7] bg-white text-[#22211F] hover:border-[#17382C]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isSelected ? 'bg-[#B95F3B] text-white' : 'bg-[#EFE9DD] text-[#716D66]'}`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-[#17382C]">{c.label}</div>
                        <div className="text-xs text-[#716D66]">{c.desc}</div>
                      </div>
                    </div>
                    {isSelected && <Check className="w-5 h-5 text-[#B95F3B]" />}
                  </button>
                );
              })}
            </div>

            <div className="pt-4 flex justify-end">
              <Button
                variant="primary"
                onClick={() => setStep(2)}
                icon={ArrowRight}
                iconPosition="right"
              >
                Next Step
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2: Preferences */}
        {step === 2 && (
          <div className="space-y-4">
            <h4 className="font-serif-display text-xl text-[#17382C]">Select your dietary preferences:</h4>
            <div className="flex flex-wrap gap-2.5 py-2">
              {preferenceOptions.map((pref) => {
                const isSelected = selectedPreferences.includes(pref);
                return (
                  <button
                    key={pref}
                    type="button"
                    onClick={() => togglePreference(pref)}
                    className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all ${
                      isSelected
                        ? 'bg-[#17382C] text-white border-[#17382C] font-semibold'
                        : 'bg-white text-[#716D66] border-[#DDD5C7] hover:border-[#17382C]'
                    }`}
                  >
                    {isSelected ? `✓ ${pref}` : `+ ${pref}`}
                  </button>
                );
              })}
            </div>

            <div className="pt-6 flex items-center justify-between">
              <Button variant="ghost" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button
                variant="primary"
                onClick={() => setStep(3)}
                icon={Sparkles}
              >
                Find My Match
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: Match Result */}
        {step === 3 && (
          <div className="space-y-5 text-center">
            <div className="inline-flex items-center gap-1.5 bg-[#B95F3B]/10 text-[#B95F3B] px-3 py-1 text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-4 h-4" />
              <span>{recommendation.percentage}% PERFECT MATCH FOUND</span>
            </div>

            <div className="bg-white border border-[#DDD5C7] p-4 text-left shadow-xs flex flex-col sm:flex-row gap-4 items-center">
              <img
                src={recommendation.dish.image}
                alt={recommendation.dish.name}
                className="w-full sm:w-36 h-36 rounded-none object-cover border border-[#DDD5C7]"
              />
              <div className="flex-1">
                <div className="flex items-center gap-1.5 mb-1">
                  {recommendation.dish.badges.map((b, idx) => (
                    <Badge key={idx}>{b}</Badge>
                  ))}
                </div>
                <h3 className="font-serif-display text-2xl text-[#17382C]">
                  {recommendation.dish.name}
                </h3>
                <p className="text-xs text-[#716D66] line-clamp-2 my-1">
                  {recommendation.dish.description}
                </p>
                <div className="flex items-center gap-3 text-xs font-bold text-[#17382C] mt-2">
                  <span className="text-[#B95F3B] text-base">${recommendation.dish.price.toFixed(2)}</span>
                  <span>• {recommendation.dish.calories} cal</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-[#716D66] italic bg-[#EFE9DD]/60 p-3 rounded-xl">
              "{recommendation.reason}"
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Button variant="outline" fullWidth onClick={handleReset} icon={RefreshCw}>
                Start Over
              </Button>
              <Button variant="primary" fullWidth onClick={handleSelectRecommendation}>
                CUSTOMIZE & ADD — ${recommendation.dish.price.toFixed(2)}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
