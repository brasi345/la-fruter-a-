import React, { useRef, useState, useEffect } from 'react';
import { Phone, ArrowUpRight } from 'lucide-react';
import { REAL_PHOTOS, BUSINESS_INFO } from '../data/content';

interface ProductsSectionProps {
  scrollY: number;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({ scrollY: _scrollY }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleCardClick = () => {
    const contactEl = document.getElementById('contacto');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 3 prominent product exhibition photos
  const productPhotos = REAL_PHOTOS.filter(
    (p) =>
      p.id === 'expositor-cajas-madera' ||
      p.id === 'expositor-aguacates-hortalizas' ||
      p.id === 'cesta-fruta-preparada'
  );

  return (
    <section
      id="productos"
      ref={sectionRef}
      className="py-24 sm:py-32 md:py-40 bg-[#FAF7F2] text-[#142E1F] border-b border-stone-200/80 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full">
        
        {/* Section Heading */}
        <div
          className="text-center max-w-2xl mx-auto mb-16 sm:mb-20 transition-all duration-1000 ease-out will-change-transform"
          style={{
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
            opacity: inView ? 1 : 0,
          }}
        >
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-[#8C6D46] block mb-2 sm:mb-3">
            Fotografías del establecimiento
          </span>
          <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-semibold uppercase tracking-tight text-[#142E1F] leading-none">
            PRODUCTOS
          </h2>
          <p className="font-editorial text-xl sm:text-2xl text-stone-600 mt-4 font-light">
            Fruta fresca, hortalizas y cestas seleccionadas a diario en Murcia
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {productPhotos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={handleCardClick}
              className="group cursor-pointer rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-stone-200/90 shadow-md hover:shadow-2xl transition-all duration-500 ease-out will-change-transform flex flex-col hover:-translate-y-2 active:scale-98"
              style={{
                transform: inView ? 'translateY(0)' : 'translateY(36px)',
                opacity: inView ? 1 : 0,
                transitionDelay: `${index * 140}ms`,
              }}
            >
              {/* Photo Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                
                {/* Floating Contact Trigger Indicator */}
                <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#142E1F]/90 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                  <ArrowUpRight className="w-4 h-4" />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
              </div>

              {/* Card Content */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#142E1F] tracking-wide mb-2 group-hover:text-[#E85D04] transition-colors">
                    {photo.title}
                  </h3>
                  <p className="text-sm text-stone-600 font-light leading-relaxed">
                    {photo.caption}
                  </p>
                </div>

                {/* Call Action Bar */}
                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-[#8C6D46] font-medium tracking-wider uppercase">
                  <span className="flex items-center gap-1.5 group-hover:text-[#142E1F] transition-colors">
                    <Phone className="w-3.5 h-3.5" />
                    Consultar o pedir
                  </span>
                  <span className="text-stone-400 group-hover:text-[#142E1F] group-hover:translate-x-1 transition-all">
                    →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
