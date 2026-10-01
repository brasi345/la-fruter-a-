import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';

export const TopNav: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sections = [
    { id: 'inicio', label: 'INICIO', desc: 'Portada principal' },
    { id: 'productos', label: 'PRODUCTOS', desc: 'Fruta fresca, mostrador y cajas preparadas' },
    { id: 'la-fruteria', label: 'LA FRUTERÍA', desc: 'Presentación, fotografías y horario' },
    { id: 'ubicacion', label: 'UBICACIÓN', desc: 'Mapa y cómo llegar' },
    { id: 'contacto', label: 'CONTACTO', desc: 'Teléfono de atención y llamada directa' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#142E1F]/95 backdrop-blur-md shadow-lg text-[#FAF7F2] border-b border-[#244834]'
            : 'bg-gradient-to-b from-black/75 via-black/35 to-transparent text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Name */}
          <div className="flex items-center">
            <a
              href="#inicio"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="font-editorial text-2xl sm:text-3xl tracking-[0.16em] uppercase font-semibold text-white transition-opacity hover:opacity-85"
            >
              {BUSINESS_INFO.name}
            </a>
          </div>

          {/* Quick Desktop Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs tracking-widest uppercase font-medium">
            {sections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => scrollTo(sec.id)}
                className="text-stone-200 hover:text-white transition-colors cursor-pointer"
              >
                {sec.label}
              </button>
            ))}
          </nav>

          {/* Action Zone: 3 Lines Menu Button to choose section */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="px-3.5 sm:px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 border border-white/25 text-white transition-all cursor-pointer flex items-center gap-2 min-h-[44px] touch-manipulation"
              aria-label="Elegir apartado"
              title="Elegir apartado"
            >
              <span className="text-xs font-medium tracking-widest uppercase text-stone-200 hidden sm:inline">
                APARTADOS
              </span>
              {menuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Sections Selector Overlay (3 Lines Menu) */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0E2317]/98 backdrop-blur-xl flex flex-col justify-between pt-24 pb-12 px-6 sm:px-12 max-w-full overflow-y-auto animate-fadeIn">
          <div className="max-w-xl mx-auto w-full pt-4">
            
            <div className="mb-6 pb-4 border-b border-emerald-900/60 flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8C6D46]">
                Elige un apartado
              </span>
              <span className="text-xs text-stone-400">
                La Frutería · Murcia
              </span>
            </div>

            <nav className="flex flex-col gap-3">
              {sections.map((sec, idx) => (
                <button
                  key={sec.id}
                  onClick={() => scrollTo(sec.id)}
                  className="group p-4 sm:p-5 rounded-2xl bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 hover:border-[#8C6D46]/60 transition-all text-left cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-[#8C6D46] font-semibold">
                        0{idx + 1}
                      </span>
                      <span className="font-editorial text-2xl sm:text-3xl uppercase tracking-wider text-white group-hover:text-[#E85D04] transition-colors">
                        {sec.label}
                      </span>
                    </div>
                    <p className="text-xs text-stone-400 mt-1 pl-7 font-light">
                      {sec.desc}
                    </p>
                  </div>
                  <span className="text-stone-400 group-hover:text-white group-hover:translate-x-1 transition-all text-xl">
                    →
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Bottom Store Coordinates & Phone */}
          <div className="max-w-xl mx-auto w-full pt-6 border-t border-emerald-900/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
            <span>{BUSINESS_INFO.fullAddress}</span>
            <a
              href={BUSINESS_INFO.phoneTel}
              className="font-mono font-medium text-stone-200 hover:text-white transition-colors"
            >
              Tel. {BUSINESS_INFO.phone}
            </a>
          </div>
        </div>
      )}
    </>
  );
};
