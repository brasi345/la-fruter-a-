import React, { useRef, useState, useEffect } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';

export const LocationSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.12 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="ubicacion"
      ref={sectionRef}
      className="py-24 sm:py-32 md:py-40 bg-[#FAF7F2] text-[#142E1F] border-b border-stone-200/80 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 w-full">
        
        {/* Section Heading with Fade & Lift */}
        <div
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 transition-all duration-1000 ease-out will-change-transform"
          style={{
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
            opacity: inView ? 1 : 0,
          }}
        >
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-[#8C6D46] block mb-2 sm:mb-3">
            Localización
          </span>
          <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-semibold uppercase tracking-tight text-[#142E1F] leading-none">
            UBICACIÓN
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4 text-stone-700">
            <MapPin className="w-4 h-4 text-[#E85D04]" />
            <p className="font-editorial text-xl sm:text-2xl text-stone-800">
              {BUSINESS_INFO.address}, {BUSINESS_INFO.postalCode}
            </p>
          </div>
        </div>

        {/* Map Container with Smooth Scale Entrance */}
        <div
          className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-stone-200/90 bg-[#E8E4DA] relative min-h-[360px] sm:min-h-[480px] transition-all duration-1000 delay-200 ease-out will-change-transform"
          style={{
            transform: inView ? 'scale(1)' : 'scale(0.95)',
            opacity: inView ? 1 : 0,
          }}
        >
          <iframe
            title="Ubicación de La Frutería en Murcia"
            src="https://maps.google.com/maps?q=C.+Torre+%C3%81lvarez%2C+7%2C+30007+Murcia%2C+Espa%C3%B1a&t=&z=16&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full min-h-[360px] sm:min-h-[480px] border-0 filter saturate-90 contrast-95"
            loading="lazy"
            allowFullScreen
          />

          {/* Floating Action Button: CÓMO LLEGAR */}
          <div className="absolute bottom-5 right-5 sm:bottom-7 sm:right-7 z-10">
            <a
              href={BUSINESS_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#142E1F] text-[#FAF7F2] text-xs font-semibold tracking-widest uppercase shadow-xl hover:bg-[#E85D04] hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2.5 touch-manipulation min-h-[44px]"
            >
              <Navigation className="w-4 h-4 text-white group-hover:rotate-12 transition-transform duration-300" />
              <span>CÓMO LLEGAR</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
