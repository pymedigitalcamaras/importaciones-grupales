import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle, ArrowRight, ShieldCheck, Box, Anchor } from 'lucide-react';
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

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
  };

  return (
    <div 
      className="relative w-full h-[42vh] sm:h-[46vh] min-h-[330px] max-h-[410px] bg-nae-dark overflow-hidden select-none"
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
            {/* Natural Daylight Industrial Photography (No artificial lights or sun flares) */}
            <img
              src={slide.image_url}
              alt={slide.title}
              className="w-full h-full object-cover object-center"
            />
            
            {/* NAE Platform Gradient Overlay (Navy #072a42 gradient for crisp typography) */}
            <div 
              className="absolute inset-0" 
              style={{
                background: 'linear-gradient(90deg, rgba(7,42,66,.88) 0%, rgba(7,42,66,.65) 55%, rgba(7,42,66,.15) 100%)'
              }}
            />
            
            {/* Slide Content: NAE Style (Eyebrow, Title, Subtitle, CTA) */}
            <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
              <div className="max-w-2xl text-left space-y-2.5">
                {slide.tag && (
                  <div className="inline-block text-[11px] font-bold tracking-widest uppercase text-sky-300">
                    {slide.tag}
                  </div>
                )}
                
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight drop-shadow-xs">
                  {slide.title}
                </h1>
                
                <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-normal max-w-xl">
                  {slide.subtitle}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href="https://wa.me/56990117784?text=Hola,%20deseo%20cotizar%20una%20importaci%C3%B3n%20grupal%20desde%20China"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg font-bold text-xs sm:text-sm bg-nae-red hover:bg-red-700 text-white shadow-xs flex items-center gap-2 transition active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Cotizar por WhatsApp (+56 9 9011 7784)
                  </a>
                  <a
                    href="#contacto"
                    className="px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm text-white hover:bg-white/10 border border-white/40 transition"
                  >
                    Formulario Web
                  </a>
                </div>

                {/* Sub-features */}
                <div className="pt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-200">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                    DIN formal a tu nombre
                  </span>
                  <span className="flex items-center gap-1">
                    <Box className="w-3.5 h-3.5 text-sky-400" />
                    Desde 0.5 CBM
                  </span>
                  <span className="flex items-center gap-1">
                    <Anchor className="w-3.5 h-3.5 text-sky-400" />
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
        className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/30 hover:bg-black/60 text-white border border-white/20 transition hover:scale-105 active:scale-95"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/30 hover:bg-black/60 text-white border border-white/20 transition hover:scale-105 active:scale-95"
        aria-label="Siguiente slide"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Slide Indicators / Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 bg-black/30 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/10">
        {activeSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`transition-all duration-300 rounded-full ${
              idx === currentIndex
                ? 'w-5 h-1.5 bg-white'
                : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Ir al slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
