import React, { useRef, useState, useEffect } from 'react';
import { Star, MapPin, Clock } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';

interface PresentationSectionProps {
  scrollY: number;
}

export const PresentationSection: React.FC<PresentationSectionProps> = ({ scrollY: _scrollY }) => {
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

  let progress = 0;
  if (sectionRef.current) {
    const rect = sectionRef.current.getBoundingClientRect();
    const windowH = window.innerHeight;
    progress = Math.min(1, Math.max(0, (windowH - rect.top) / (rect.height + windowH)));
  }

  // Smooth scroll-driven kinematics
  const textX = inView ? 0 : -40;
  const imageX = inView ? 0 : 40;
  const imageScale = 1.0 + Math.sin(progress * Math.PI) * 0.06;
  const imageTranslateY = (progress - 0.5) * -35;

  return (
    <section
      id="la-fruteria"
      ref={sectionRef}
      className="relative py-24 sm:py-32 md:py-40 bg-[#142E1F] text-[#FAF7F2] border-y border-[#244A34] overflow-hidden transition-colors duration-700"
    >
      {/* Decorative ambient gradients for contrast and depth */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-700/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8C6D46]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Information Column with Staggered Entrance */}
          <div
            className="lg:col-span-6 flex flex-col justify-center transition-all duration-1000 ease-out will-change-transform"
            style={{
              transform: `translate3d(${textX}px, 0, 0)`,
              opacity: inView ? 1 : 0,
            }}
          >
            {/* Rating: Exactly ★ 4,9 in a refined dark-glass pill */}
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md self-start">
              <div className="flex items-center gap-1 text-[#F59E0B]">
                <Star className="w-4 h-4 fill-[#F59E0B]" />
              </div>
              <span className="font-mono font-bold text-base text-white tracking-tight">
                ★ 4,9
              </span>
              <span className="text-[11px] uppercase tracking-widest text-[#DDA15E] ml-1 font-semibold">
                Puntuación
              </span>
            </div>

            {/* Brand Title with Editorial Typography */}
            <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold uppercase tracking-tight text-white leading-none">
              {BUSINESS_INFO.name}
            </h2>

            {/* Location Description */}
            <div className="mt-8 sm:mt-10 pt-8 border-t border-white/15 space-y-3">
              <p className="text-xs uppercase tracking-[0.28em] font-semibold text-[#DDA15E]">
                Frutería ubicada en:
              </p>
              
              <div className="flex items-start gap-3.5 mt-2">
                <MapPin className="w-6 h-6 text-[#85C495] shrink-0 mt-0.5" />
                <div>
                  <p className="font-editorial text-2xl sm:text-4xl text-stone-100 font-semibold leading-tight">
                    {BUSINESS_INFO.address}
                  </p>
                  <p className="text-base sm:text-lg text-stone-300 mt-1 font-light">
                    {BUSINESS_INFO.postalCode}
                  </p>
                </div>
              </div>
            </div>

            {/* Compact Schedule ("en pequeño") with dark frosted glass */}
            <div className="mt-8 pt-6 border-t border-white/15">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#DDA15E] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#DDA15E]" />
                  <span>Horario</span>
                </span>
              </div>

              <div className="bg-black/30 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/15 shadow-xl space-y-2.5 text-xs">
                <div className="flex justify-between items-center gap-2 text-stone-300">
                  <span className="font-medium text-white shrink-0">Lunes – Viernes</span>
                  <span className="font-mono text-stone-300 text-right">09:30–14:30 · 17:30–21:00</span>
                </div>
                <div className="flex justify-between items-center gap-2 text-stone-300">
                  <span className="font-medium text-white shrink-0">Sábado</span>
                  <span className="font-mono text-stone-300 text-right">09:30–14:30</span>
                </div>
                <div className="flex justify-between items-center gap-2 text-stone-300">
                  <span className="font-medium text-white shrink-0">Domingo</span>
                  <span className="font-mono text-[11px] font-bold text-red-300 uppercase tracking-wider bg-red-950/70 border border-red-500/40 px-2.5 py-0.5 rounded-full">
                    Cerrado
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Real Photograph Column with Scroll-Zoom & Soft Tilt */}
          <div
            className="lg:col-span-6 transition-all duration-1000 delay-200 ease-out will-change-transform"
            style={{
              transform: `translate3d(${imageX}px, 0, 0)`,
              opacity: inView ? 1 : 0,
            }}
          >
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-white/15 bg-black/40 aspect-[4/3] group transition-all duration-500 hover:shadow-[0_25px_60px_rgba(0,0,0,0.5)] hover:-translate-y-1.5">
              <img
                src="/src/assets/images/market_crates_fresh_1790847721292.jpg"
                alt="Expositor de fruta en cajas de madera en La Frutería"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-108"
                style={{
                  transform: `scale(${imageScale}) translateY(${imageTranslateY}px)`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6 text-white flex items-end justify-between">
                <div>
                  <p className="font-editorial text-lg sm:text-2xl font-medium text-white">
                    Expositor de fruta en cajas de madera
                  </p>
                  <p className="text-xs text-stone-300 mt-0.5">
                    La Frutería · C. Torre Álvarez, 7
                  </p>
                </div>
                <span className="text-[11px] uppercase tracking-widest text-[#DDA15E] hidden sm:inline">
                  Murcia
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
