import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Box, Anchor } from 'lucide-react';
import { SlideItem } from '../types';

interface HeroSliderProps {
  slides: SlideItem[];
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ slides }) => {
  const activeSlides = slides.filter(s => s.is_active);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (activeSlides.length <= 1 || isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [activeSlides.length, isPaused]);

  if (activeSlides.length === 0) return null;

  const current = activeSlides[currentIndex] || activeSlides[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
  };

  return (
    <div 
      className="relative w-full h-[66vh] sm:h-[70vh] min-h-[460px] max-h-[620px] bg-slate-950 overflow-hidden select-none border-b border-slate-800"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Slides */}
      {activeSlides.map((slide, idx) => {
        const isActive = idx === currentIndex;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background Image with Dark Gradient Overlays */}
            <img
              src={slide.image_url}
              alt={slide.title}
              className="w-full h-full object-cover object-center scale-105 transition-transform duration-[8000ms] ease-out"
              style={{
                transform: isActive ? 'scale(1.0)' : 'scale(1.08)'
              }}
            />
            {/* Multi-layer gradient overlays for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
            
            {/* Slide Content */}
            <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
              <div className="max-w-2xl text-left space-y-4">
                {slide.tag && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-blue-500/20 text-blue-400 border border-blue-500/30 backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
                    {slide.tag}
                  </div>
                )}
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight drop-shadow-sm">
                  {slide.title}
                </h1>
                
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                  {slide.subtitle}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href={slide.cta_link || '#cotizador'}
                    className="px-6 py-3 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 flex items-center gap-2 transition transform active:scale-95"
                  >
                    {slide.cta_text || 'Cotizar mi Carga'}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="#como-funciona"
                    className="px-5 py-3 rounded-xl font-medium text-sm text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 backdrop-blur-sm transition"
                  >
                    ¿Cómo Funciona?
                  </a>
                </div>

                {/* Micro guarantees */}
                <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    DIN a nombre de tu empresa
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Box className="w-4 h-4 text-blue-400" />
                    Desde 0.5 CBM (Sin mínimo excesivo)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Anchor className="w-4 h-4 text-indigo-400" />
                    Almacén Ningbo & Guangzhou
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white border border-slate-700/50 backdrop-blur-md transition-all hover:scale-110 active:scale-95"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white border border-slate-700/50 backdrop-blur-md transition-all hover:scale-110 active:scale-95"
        aria-label="Siguiente slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Indicators / Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-slate-950/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-800">
        {activeSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`transition-all duration-300 rounded-full ${
              idx === currentIndex
                ? 'w-6 h-2 bg-blue-500'
                : 'w-2 h-2 bg-slate-600 hover:bg-slate-400'
            }`}
            aria-label={`Ir al slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
