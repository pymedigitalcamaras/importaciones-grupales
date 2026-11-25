import React, { useState } from 'react';
import { Ship, Calculator, Calendar, Phone, Settings, Menu, X, MessageCircle } from 'lucide-react';

interface NavbarProps {
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const phoneNumber = "+56 9 9011 7784";
  const whatsappUrl = "https://wa.me/56990117784?text=Hola,%20deseo%20cotizar%20una%20importaci%C3%B3n%20grupal%20desde%20China";

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-nae-border shadow-xs">
      {/* Main Navigation (Clean, NO top gray bar) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Brand Logo */}
          <a href="#" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-lg bg-nae-blue flex items-center justify-center text-white shadow-xs group-hover:bg-nae-dark transition">
              <Ship className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-nae-dark flex items-center gap-1">
                GRUPO<span className="text-nae-blue">IMPORTA</span>
              </span>
              <span className="block text-[10px] font-bold tracking-wider uppercase text-slate-500">
                Carga Consolidada LCL China
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center space-x-7 text-sm font-semibold text-slate-700">
            <a href="#como-funciona" className="hover:text-nae-blue transition">Cómo Funciona</a>
            <a href="#beneficios" className="hover:text-nae-blue transition">Ventajas</a>
            <a href="#calculadora" className="hover:text-nae-blue transition flex items-center gap-1.5">
              <Calculator className="w-4 h-4 text-nae-blue" />
              Calculadora CBM
            </a>
            <a href="#zarpes" className="hover:text-nae-blue transition flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-500" />
              Próximos Zarpes
            </a>
            <a href="#contacto" className="hover:text-nae-blue transition">Contacto</a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center space-x-3">
            <a
              href="tel:+56990117784"
              className="text-xs font-semibold text-slate-700 hover:text-nae-blue flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-50 transition"
              title="Llamar directo"
            >
              <Phone className="w-3.5 h-3.5 text-slate-600" />
              {phoneNumber}
            </a>
            
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg text-xs font-bold bg-nae-blue hover:bg-nae-dark text-white shadow-xs flex items-center gap-1.5 transition active:scale-95"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp Directo
            </a>

            <button
              onClick={onOpenAdmin}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 border border-nae-border transition"
              title="Panel de Administración"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-emerald-600 hover:bg-emerald-50 border border-emerald-200"
              title="WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <button
              onClick={onOpenAdmin}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 border border-nae-border transition"
              title="Panel Admin"
            >
              <Settings className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-nae-border bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <a
            href="#como-funciona"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-slate-800 hover:text-nae-blue py-1"
          >
            Cómo Funciona
          </a>
          <a
            href="#beneficios"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-slate-800 hover:text-nae-blue py-1"
          >
            Ventajas & Legalidad
          </a>
          <a
            href="#calculadora"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-slate-800 hover:text-nae-blue py-1"
          >
            Calculadora CBM
          </a>
          <a
            href="#zarpes"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-slate-800 hover:text-nae-blue py-1"
          >
            Próximos Zarpes
          </a>
          <a
            href="#contacto"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-slate-800 hover:text-nae-blue py-1"
          >
            Formulario de Contacto
          </a>
          <div className="pt-2 space-y-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold bg-nae-blue hover:bg-nae-dark text-white"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Directo: {phoneNumber}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
