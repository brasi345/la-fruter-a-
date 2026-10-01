import React, { useRef, useState, useEffect } from 'react';
import { Phone, Star } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';

export const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contacto"
      ref={sectionRef}
      className="py-28 sm:py-36 md:py-48 bg-[#0E2317] text-[#FAF7F2] relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-emerald-600/30 rounded-full blur-[130px]" />
      </div>

      <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center relative z-10">
        
        {/* Rating: Exactly ★ 4,9 with Staggered Entrance */}
        <div
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-800/40 text-stone-200 text-sm font-semibold mb-8 transition-all duration-1000 ease-out will-change-transform"
          style={{
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            opacity: inView ? 1 : 0,
          }}
        >
          <Star className="w-4 h-4 fill-[#E85D04] text-[#E85D04]" />
          <span className="font-mono">{BUSINESS_INFO.rating}</span>
        </div>

        {/* Monumental Brand Title */}
        <h2
          className="font-editorial text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase font-semibold text-white tracking-[0.14em] leading-none transition-all duration-1000 delay-150 ease-out will-change-transform"
          style={{
            transform: inView ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.96)',
            opacity: inView ? 1 : 0,
          }}
        >
          {BUSINESS_INFO.name}
        </h2>

        {/* Address */}
        <div
          className="mt-8 space-y-1 text-stone-300 transition-all duration-1000 delay-300 ease-out will-change-transform"
          style={{
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            opacity: inView ? 1 : 0,
          }}
        >
          <p className="font-editorial text-2xl sm:text-3xl text-stone-100">
            {BUSINESS_INFO.address}
          </p>
          <p className="text-sm sm:text-base text-stone-400 font-light">
            {BUSINESS_INFO.postalCode}
          </p>
        </div>

        {/* Phone Display */}
        <div
          className="mt-6 transition-all duration-1000 delay-450 ease-out will-change-transform"
          style={{
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            opacity: inView ? 1 : 0,
          }}
        >
          <p className="font-mono text-2xl sm:text-4xl font-bold text-[#DDA15E] tracking-wider">
            {BUSINESS_INFO.phone}
          </p>
        </div>

        {/* LLAMAR Button with Glow and Scale Hover */}
        <div
          className="mt-10 sm:mt-14 flex justify-center transition-all duration-1000 delay-600 ease-out will-change-transform"
          style={{
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            opacity: inView ? 1 : 0,
          }}
        >
          <a
            href={BUSINESS_INFO.phoneTel}
            className="group px-10 sm:px-14 py-4 sm:py-5 rounded-full bg-[#FAF7F2] text-[#0E2317] text-xs sm:text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-3.5 hover:bg-white hover:shadow-[0_10px_40px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 touch-manipulation min-h-[52px] shadow-2xl"
          >
            <Phone className="w-4 h-4 text-[#0E2317] group-hover:rotate-12 transition-transform duration-300" />
            <span>LLAMAR</span>
          </a>
        </div>

      </div>
    </section>
  );
};
