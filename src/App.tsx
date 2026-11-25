import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';
import { HowItWorks } from './components/HowItWorks';
import { ValueProposition } from './components/ValueProposition';
import { CbmCalculator } from './components/CbmCalculator';
import { DeparturesSchedule } from './components/DeparturesSchedule';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { SlideItem } from './types';
import { fetchSlides, defaultSlides } from './lib/supabase';

export function App() {
  const [slides, setSlides] = useState<SlideItem[]>(defaultSlides);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [prefilledCbm, setPrefilledCbm] = useState<string>('');
  const [prefilledDetails, setPrefilledDetails] = useState<string>('');

  useEffect(() => {
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
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-nae-blue selection:text-white">
      {/* Navigation Bar (No top gray line, NAE style) */}
      <Navbar
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Full-width Hero Slider with NAE Message Overlay & Daylight Images */}
        <HeroSlider slides={slides} />

        {/* How it works */}
        <HowItWorks />

        {/* Benefits & Value Proposition */}
        <ValueProposition />

        {/* Interactive Volume CBM & Freight Calculator */}
        <CbmCalculator onApplyCbm={handleApplyCbm} />

        {/* Scheduled Sailings Calendar */}
        <DeparturesSchedule />

        {/* Dedicated Contact Form */}
        <ContactSection
          initialCbm={prefilledCbm}
          initialDetails={prefilledDetails}
        />
      </main>

      {/* Site Footer */}
      <Footer
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Floating WhatsApp Action Button (+56 9 9011 7784) */}
      <FloatingWhatsApp />

      {/* Admin Panel Modal (Leads & Slider Management) */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        slides={slides}
        onSlidesUpdated={(newSlides) => setSlides(newSlides)}
      />
    </div>
  );
}

export default App;
