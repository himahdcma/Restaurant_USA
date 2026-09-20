import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { ArrowRight, Utensils } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="bg-[#F7F3EA] min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20 space-y-6">
      {/* Pure Typography Eyebrow */}
      <span className="text-xs font-semibold tracking-widest text-[#B95F3B] uppercase block">
        404 — PAGE NOT FOUND
      </span>

      <h1 className="font-serif-display text-4xl sm:text-6xl text-[#17382C]">
        This table's not here.
      </h1>

      <p className="text-base text-[#716D66] max-w-md font-sans">
        The page you're looking for couldn't be found. Let's get you back to good food.
      </p>

      <div className="pt-4 flex items-center justify-center gap-4">
        <Link to="/">
          <Button variant="outline" size="lg">
            BACK HOME
          </Button>
        </Link>
        <Link to="/menu">
          <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
            BROWSE MENU
          </Button>
        </Link>
      </div>
    </div>
  );
};
