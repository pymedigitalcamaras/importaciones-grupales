import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowDown, Calculator, HelpCircle, MessageCircle } from 'lucide-react';
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

  const phoneNumber = "+56 9 9011 7784";
  const whatsappUrl = "https://wa.me/56990117784?text=Hola,%20deseo%20cotizar%20una%20importaci%C3%B3n%20grupal%20desde%20China";

  return (
    <div className="relative w-full">
      {/* Hero Carousel Container (NAE Height & Aspect) */}
      <div 
        className="relative w-full h-[54vh] sm:h-[62vh] min-h-[440px] max-h-[560px] bg-slate-900 overflow-hidden select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {activeSlides.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Clean Daylight Industrial Photography (Absolute background) */}
              <img
                src={slide.image_url}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              
              {/* NAE Platform Navy Gradient Overlay (Absolute z-10) */}
              <div 
                className="absolute inset-0 z-10" 
                style={{
                  background: 'linear-gradient(90deg, rgba(7,42,66,.88) 0%, rgba(7,42,66,.65) 55%, rgba(7,42,66,.2) 100%)'
                }}
              />
              
              {/* Slide Content (Absolute z-20 centered over background) */}
              <div className="absolute inset-0 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center pb-12 pointer-events-none">
                <div className="max-w-3xl text-left space-y-3 sm:space-y-4 pointer-events-auto">
                  {slide.tag && (
                    <div className="text-[11px] sm:text-xs font-bold tracking-widest uppercase text-slate-200">
                      {slide.tag}
                    </div>
                  )}
                  
                  <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight drop-shadow-xs">
                    {slide.title}
                  </h1>
                  
                  <p className="text-xs sm:text-base text-slate-100 leading-relaxed font-normal max-w-2xl">
                    {slide.subtitle}
                  </p>

                  <div className="pt-2 sm:pt-4">
                    <a
                      href="#como-funciona"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/60 text-white hover:bg-white/10 font-semibold text-xs sm:text-sm transition group"
                    >
                      <span>Conoce la plataforma</span>
                      <ArrowDown className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-0.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Navigation Arrows (< and >) */}
        <button
          onClick={handlePrev}
          className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-2.5 rounded-full bg-black/30 hover:bg-black/60 text-white border border-white/20 transition hover:scale-105 active:scale-95"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-2.5 rounded-full bg-black/30 hover:bg-black/60 text-white border border-white/20 transition hover:scale-105 active:scale-95"
          aria-label="Siguiente slide"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Slide Indicators at bottom right (Orange active pill + white/gray dots, like in NAE screenshot) */}
        <div className="absolute bottom-16 sm:bottom-14 right-6 sm:right-10 z-30 flex items-center gap-1.5">
          {activeSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`transition-all duration-300 rounded-full ${
                idx === currentIndex
                  ? 'w-7 h-2 bg-[#ea580c]'
                  : 'w-2 h-2 bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Ir al slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* FLOATING ACTION DOCK (Exact NAE Screenshot Replica) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-9 sm:-mt-10 relative z-30">
        <div className="bg-white rounded-2xl sm:rounded-full border border-slate-200 shadow-xl p-3 sm:px-6 sm:py-2.5 flex flex-wrap items-center justify-between gap-3">
          {/* Left: Agent Online */}
          <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-emerald-500 overflow-hidden flex items-center justify-center font-bold text-xs text-slate-700">
                CR
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                Estamos en línea — <span className="font-extrabold text-nae-blue">Camila Rojas, Ejecutiva Comercial</span>
              </div>
              <div className="text-[11px] text-slate-500">Respuesta en minutos, en tu idioma</div>
            </div>
          </div>

          {/* Middle: Quick Links + PRINTED PHONE (No clickable dialer link) */}
          <div className="hidden lg:flex items-center gap-5 text-xs font-semibold text-slate-700">
            <a href="#calculadora" className="flex items-center gap-1.5 hover:text-nae-blue transition">
              <Calculator className="w-4 h-4 text-slate-500" />
              Calculadora de ahorro
            </a>
            <a href="#como-funciona" className="flex items-center gap-1.5 hover:text-nae-blue transition">
              <HelpCircle className="w-4 h-4 text-slate-500" />
              ¿Qué necesito?
            </a>
            <div className="text-xs font-semibold text-slate-700 bg-slate-50 px-3 py-1 rounded-full border border-slate-200 select-all cursor-default" title="Teléfono">
              Celular: <strong className="text-slate-900">{phoneNumber}</strong>
            </div>
          </div>

          {/* Right: Orange WhatsApp Direct Button */}
          <div className="flex items-center gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#ea580c] hover:bg-[#c2410c] text-white px-5 py-2.5 rounded-full font-bold text-xs flex items-center gap-2 shadow-md transition active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              WhatsApp directo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
