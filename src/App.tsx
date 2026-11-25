import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';
import { HowItWorks } from './components/HowItWorks';
import { ValueProposition } from './components/ValueProposition';
import { CbmCalculator } from './components/CbmCalculator';
import { DeparturesSchedule } from './components/DeparturesSchedule';
import { MarketResearchSection } from './components/MarketResearchSection';
import { QuoteContactForm } from './components/QuoteContactForm';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import { BibliographyModal } from './components/BibliographyModal';
import { SlideItem } from './types';
import { fetchSlides, defaultSlides } from './lib/supabase';

export function App() {
  const [slides, setSlides] = useState<SlideItem[]>(defaultSlides);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isBibliographyOpen, setIsBibliographyOpen] = useState(false);
  const [prefilledCbm, setPrefilledCbm] = useState<string>('');
  const [prefilledDetails, setPrefilledDetails] = useState<string>('');

  useEffect(() => {
    // Load slides from Supabase / Local storage
    fetchSlides().then((data) => {
      if (data && data.length > 0) {
        setSlides(data);
      }
    });
  }, []);

  const handleApplyCbm = (cbm: string, details: string) => {
    setPrefilledCbm(cbm);
    setPrefilledDetails(details);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Navigation Bar */}
      <Navbar
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenBibliography={() => setIsBibliographyOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Full-width Hero Slider with Peek to next section below */}
        <HeroSlider slides={slides} />

        {/* Next Section (Header visible right below the slider fold) */}
        <HowItWorks />

        {/* Benefits & Value Proposition (Synthesizing WS Cargo, Komex, Contenedor Compartido) */}
        <ValueProposition />

        {/* Interactive Volume CBM & Freight Calculator */}
        <CbmCalculator onApplyCbm={handleApplyCbm} />

        {/* Scheduled Sailings Calendar */}
        <DeparturesSchedule />

        {/* Market Research & Benchmarking Section */}
        <MarketResearchSection onOpenBibliographyModal={() => setIsBibliographyOpen(true)} />

        {/* Interactive Lead / Quote Contact Form */}
        <QuoteContactForm
          initialCbm={prefilledCbm}
          initialDetails={prefilledDetails}
        />
      </main>

      {/* Site Footer */}
      <Footer
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenBibliography={() => setIsBibliographyOpen(true)}
      />

      {/* Admin Panel Modal (Leads & Slider Management) */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        slides={slides}
        onSlidesUpdated={(newSlides) => setSlides(newSlides)}
      />

      {/* Bibliography & Web Sources Modal */}
      <BibliographyModal
        isOpen={isBibliographyOpen}
        onClose={() => setIsBibliographyOpen(false)}
      />
    </div>
  );
}

export default App;
