import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Box, Anchor, MessageCircle } from 'lucide-react';
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
      className="relative w-full h-[46vh] sm:h-[48vh] min-h-[350px] max-h-[440px] bg-slate-100 overflow-hidden select-none border-b border-slate-200"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Slides */}
      {activeSlides.map((slide, idx) => {
        const isActive = idx === currentIndex;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Bright, Natural Daylight Photography */}
            <img
              src={slide.image_url}
              alt={slide.title}
              className="w-full h-full object-cover object-center"
            />
            
            {/* Soft, clean daylight overlay (white-to-transparent gradient for crisp text readability) */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent sm:to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent sm:hidden" />
            
            {/* Slide Content */}
            <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
              <div className="max-w-xl text-left space-y-3 bg-white/40 sm:bg-transparent p-4 sm:p-0 rounded-2xl backdrop-blur-xs sm:backdrop-blur-none">
                {slide.tag && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-blue-100 text-blue-800 border border-blue-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    {slide.tag}
                  </div>
                )}
                
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight">
                  {slide.title}
                </h1>
                
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal line-clamp-2 sm:line-clamp-none">
                  {slide.subtitle}
                </p>

                <div className="pt-1 flex flex-wrap items-center gap-2.5">
                  <a
                    href="https://wa.me/56990117784?text=Hola,%20deseo%20cotizar%20una%20importaci%C3%B3n%20grupal%20desde%20China"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-lg font-bold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs flex items-center gap-2 transition active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp +56 9 9011 7784
                  </a>
                  <a
                    href="#como-funciona"
                    className="px-4 py-2.5 rounded-lg font-semibold text-xs sm:text-sm text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-300 shadow-2xs transition"
                  >
                    Ver Cómo Funciona
                  </a>
                </div>

                {/* Micro guarantees */}
                <div className="pt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 font-medium">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    DIN formal a tu nombre
                  </span>
                  <span className="flex items-center gap-1">
                    <Box className="w-3.5 h-3.5 text-blue-600" />
                    Desde 0.5 CBM
                  </span>
                  <span className="flex items-center gap-1">
                    <Anchor className="w-3.5 h-3.5 text-blue-600" />
                    Bodegas Ningbo & Guangzhou
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
        className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/80 hover:bg-white text-slate-800 border border-slate-300 shadow-sm transition hover:scale-105 active:scale-95"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/80 hover:bg-white text-slate-800 border border-slate-300 shadow-sm transition hover:scale-105 active:scale-95"
        aria-label="Siguiente slide"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Slide Indicators / Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-white/80 backdrop-blur-xs px-3 py-1 rounded-full border border-slate-200 shadow-2xs">
        {activeSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`transition-all duration-300 rounded-full ${
              idx === currentIndex
                ? 'w-5 h-1.5 bg-blue-600'
                : 'w-1.5 h-1.5 bg-slate-300 hover:bg-slate-400'
            }`}
            aria-label={`Ir al slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
