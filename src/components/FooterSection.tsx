import React from 'react';
import { BUSINESS_INFO } from '../data/content';

export const FooterSection: React.FC = () => {
  return (
    <footer className="bg-[#09170F] text-stone-400 py-10 sm:py-12 border-t border-emerald-950/70 select-none">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 text-center space-y-3">
        <p className="font-editorial text-2xl sm:text-3xl font-semibold uppercase text-stone-200 tracking-wider">
          {BUSINESS_INFO.name}
        </p>
        
        <p className="text-xs sm:text-sm text-stone-400">
          {BUSINESS_INFO.address} · {BUSINESS_INFO.postalCode}
        </p>

        <p className="font-mono text-xs sm:text-sm font-medium text-stone-300">
          {BUSINESS_INFO.phone}
        </p>

        <div className="pt-6 border-t border-emerald-950/50 text-[11px] text-stone-600">
          © {new Date().getFullYear()} {BUSINESS_INFO.name}
        </div>
      </div>
    </footer>
  );
};
