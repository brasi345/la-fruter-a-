import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';
import { getStoreStatus } from '../utils/storeStatus';

interface HeroSectionProps {
  scrollY: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ scrollY }) => {
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState(getStoreStatus());

  // Interactive mouse/touch movement state
  const [hoverOffset, setHoverOffset] = useState({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Progressive timed entrance
    const timer = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Update store open/closed status periodically
    const interval = setInterval(() => {
      setStatus(getStoreStatus());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // When mouse moves over title and subtitle
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);

    setHoverOffset({
      x: Math.max(-1, Math.min(1, deltaX)) * 24,
      y: Math.max(-1, Math.min(1, deltaY)) * 14,
      rotateX: -deltaY * 5,
      rotateY: deltaX * 7,
    });
    setIsHovered(true);
  };

  // When mouse leaves: automatically centers everything back to (0, 0)
  const handleMouseLeave = () => {
    setIsHovered(false);
    setHoverOffset({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
  };

  // Touch support for mobile devices
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (touch.clientX - centerX) / (rect.width / 2);
      const deltaY = (touch.clientY - centerY) / (rect.height / 2);

      setHoverOffset({
        x: Math.max(-1, Math.min(1, deltaX)) * 18,
        y: Math.max(-1, Math.min(1, deltaY)) * 10,
        rotateX: -deltaY * 4,
        rotateY: deltaX * 5,
      });
      setIsHovered(true);
    }
  };

  // When touch ends: automatically centers everything back to (0, 0)
  const handleTouchEnd = () => {
    setIsHovered(false);
    setHoverOffset({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
  };

  const vh = typeof window !== 'undefined' ? window.innerHeight : 900;
  // Scroll ratio for Hero section
  const p = Math.min(1.5, Math.max(0, scrollY / (vh * 0.9)));

  // Multi-tier parallax for depth illusion on scroll
  const imageTranslateY = scrollY * 0.38;
  const imageScale = Math.max(1.02, 1.15 - p * 0.12);
  const imageRotateX = p * 6;

  const titleY = scrollY * 0.65;
  const titleOpacity = Math.max(0, 1 - p * 1.3);

  const subY = scrollY * 0.55;
  const subOpacity = Math.max(0, 1 - p * 1.4);

  return (
    <section
      id="inicio"
      className="relative w-full h-screen min-h-[660px] overflow-hidden select-none bg-[#0E2317] flex items-center justify-center perspective-1200"
    >
      {/* Background Image with Cinematic Ken Burns & Scroll Parallax */}
      <div
        className="absolute inset-0 overflow-hidden will-change-transform transform-style-3d pointer-events-none"
        style={{
          transform: `translate3d(0, ${imageTranslateY}px, 0) scale(${imageScale}) rotateX(${imageRotateX}deg)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        <img
          src="/src/assets/images/store_local_murcia_1790847737040.jpg"
          alt="Fotografía de la entrada e interior de La Frutería en Murcia"
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover transition-transform duration-[14000ms] ease-out will-change-transform ${
            mounted ? 'scale-100' : 'scale-115'
          }`}
        />

        {/* Cinematographic Lighting Scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/50 pointer-events-none" />
        <div className="absolute inset-0 bg-[#0E2317]/30 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/60 pointer-events-none" />
      </div>

      {/* Interactive Title & Subtitle Container (moves on hover/touch, auto-centers on leave) */}
      <div
        className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 text-center text-white flex flex-col items-center justify-center transform-style-3d pointer-events-auto cursor-default py-8"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        
        {/* Tier 1: Title "LA FRUTERÍA" - Moves smoothly on hover, auto-centers on leave */}
        <div
          className="will-change-transform"
          style={{
            transform: `translate3d(${hoverOffset.x * 1.15}px, ${hoverOffset.y * 1.15 - titleY}px, 0) rotateX(${hoverOffset.rotateX}deg) rotateY(${hoverOffset.rotateY}deg) ${
              mounted ? 'scale(1)' : 'translateY(36px) scale(0.92)'
            }`,
            opacity: mounted ? titleOpacity : 0,
            transition: isHovered
              ? 'transform 0.1s ease-out, opacity 0.5s ease-out'
              : 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease-out',
          }}
        >
          <h1
            className="font-editorial text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] tracking-[0.14em] uppercase font-semibold text-white leading-[0.88] text-balance transition-all"
            style={{
              textShadow: isHovered
                ? `${-hoverOffset.x * 0.8}px ${25 - hoverOffset.y * 0.5}px 60px rgba(0,0,0,0.75)`
                : '0 25px 60px rgba(0,0,0,0.65)',
            }}
          >
            {BUSINESS_INFO.name}
          </h1>
        </div>

        {/* Tier 2: Status "ABIERTO" / "CERRADO" in the middle of decorative lines */}
        <div
          className="mt-6 sm:mt-8 flex items-center justify-center gap-3 sm:gap-5 will-change-transform"
          style={{
            transform: `translate3d(${hoverOffset.x * 0.85}px, ${hoverOffset.y * 0.85 - subY}px, 0) rotateX(${hoverOffset.rotateX * 0.8}deg) rotateY(${hoverOffset.rotateY * 0.8}deg) ${
              mounted ? 'translateY(0)' : 'translateY(24px)'
            }`,
            opacity: mounted ? subOpacity : 0,
            transition: isHovered
              ? 'transform 0.12s ease-out, opacity 0.5s ease-out'
              : 'transform 0.75s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease-out',
          }}
        >
          <div
            className="h-[1px] bg-[#DDA15E]/80 transition-all duration-1000 delay-500"
            style={{ width: mounted ? '48px' : '0px' }}
          />
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-widest uppercase border backdrop-blur-md transition-all ${
              status.isOpen
                ? 'bg-emerald-950/75 border-emerald-400/40 text-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.25)]'
                : 'bg-stone-950/75 border-red-500/40 text-red-300 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                status.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-red-500'
              }`}
            />
            <span>{status.isOpen ? 'ABIERTO' : 'CERRADO'}</span>
          </div>
          <div
            className="h-[1px] bg-[#DDA15E]/80 transition-all duration-1000 delay-500"
            style={{ width: mounted ? '48px' : '0px' }}
          />
        </div>

      </div>

      {/* Subtle Scroll Down Prompt with Parallax Fade */}
      <div
        className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 z-10 text-white/60 flex flex-col items-center gap-1.5 transition-all duration-700 pointer-events-none"
        style={{
          opacity: Math.max(0, 1 - p * 2.5),
        }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-stone-300">
          DESLIZA
        </span>
        <ChevronDown className="w-4 h-4 animate-bounce text-stone-300" />
      </div>
    </section>
  );
};
