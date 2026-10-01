/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { TopNav } from './components/TopNav';
import { HeroSection } from './components/HeroSection';
import { ProductsSection } from './components/ProductsSection';
import { PresentationSection } from './components/PresentationSection';
import { LocationSection } from './components/LocationSection';
import { ContactSection } from './components/ContactSection';
import { FooterSection } from './components/FooterSection';

export default function App() {
  const { smoothScrollY } = useSmoothScroll();

  return (
    <div className="relative min-h-screen bg-[#FAF7F2] text-[#1A1A1A] antialiased selection:bg-[#142E1F] selection:text-[#FAF7F2] overflow-x-hidden">
      {/* Navigation */}
      <TopNav />

      {/* Main Experience Journey */}
      <main>
        {/* 1. Hero / Portada (con indicador DESLIZA abajo) */}
        <HeroSection scrollY={smoothScrollY} />

        {/* 2. Productos: inmediatamente debajo de DESLIZA */}
        <ProductsSection scrollY={smoothScrollY} />

        {/* 3. Sección de Presentación de La Frutería (con Horario en pequeño) */}
        <PresentationSection scrollY={smoothScrollY} />

        {/* 4. Ubicación y Mapa */}
        <LocationSection />

        {/* 5. Contacto */}
        <ContactSection />
      </main>

      {/* Footer */}
      <FooterSection />
    </div>
  );
}
