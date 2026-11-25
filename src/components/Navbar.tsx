import React, { useState } from 'react';
import { Ship, Globe, User, MessageCircle, Menu, X, ChevronDown } from 'lucide-react';

interface NavbarProps {
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const phoneNumber = "+56 9 9011 7784";
  const whatsappUrl = "https://wa.me/56990117784?text=Hola,%20deseo%20cotizar%20una%20importaci%C3%B3n%20grupal%20desde%20China";

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Oval Logo (NAE Style) */}
          <div className="flex items-center space-x-6">
            <a href="#" className="flex items-center group">
              <div className="h-9 px-4 rounded-full bg-nae-blue text-white font-black tracking-tight text-sm flex items-center justify-center shadow-xs group-hover:bg-nae-dark transition">
                <span>GRUPO IMPORTA</span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-6 text-xs font-semibold text-slate-700">
              <a href="#como-funciona" className="hover:text-nae-blue transition">Cómo Funciona</a>
              <a href="#beneficios" className="hover:text-nae-blue transition">Ventajas</a>
              <a href="#calculadora" className="hover:text-nae-blue transition">Calculadora CBM</a>
              <a href="#zarpes" className="hover:text-nae-blue transition">Próximos Zarpes</a>
              <a href="#contacto" className="hover:text-nae-blue transition">Contacto</a>
            </nav>
          </div>

          {/* Right Area (Exactly like NAE Screenshot) */}
          <div className="hidden md:flex items-center space-x-4 text-xs">
            {/* Green dot: Estamos en línea */}
            <div className="flex items-center gap-2 px-2 py-1 text-slate-700 font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-medium text-slate-700">Estamos en línea</span>
            </div>

            {/* PRINTED PHONE (Plain text, NON-CLICKABLE, does not trigger a call dialer) */}
            <div className="text-xs font-bold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200 select-all cursor-default" title="Teléfono de contacto">
              {phoneNumber}
            </div>

            {/* Language Selector Dropdown (ES) */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1 text-slate-700 hover:text-slate-900 font-medium px-2 py-1 rounded-md hover:bg-slate-100 transition"
              >
                <Globe className="w-3.5 h-3.5 text-slate-600" />
                <span>ES</span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-50 text-xs">
                  <div className="px-3 py-1.5 font-bold text-slate-900 bg-slate-50">
                    Español
                  </div>
                  <div className="px-3 py-1.5 text-slate-400 flex items-center justify-between">
                    <span>English</span>
                    <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400 bg-slate-100 px-1 py-0.2 rounded">Pronto</span>
                  </div>
                  <div className="px-3 py-1.5 text-slate-400 flex items-center justify-between">
                    <span>中文</span>
                    <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400 bg-slate-100 px-1 py-0.2 rounded">Pronto</span>
                  </div>
                  <div className="px-3 py-1.5 text-slate-400 flex items-center justify-between">
                    <span>Português</span>
                    <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400 bg-slate-100 px-1 py-0.2 rounded">Pronto</span>
                  </div>
                </div>
              )}
            </div>

            {/* Ingresar / Admin Button */}
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 font-semibold text-slate-700 hover:text-nae-blue transition px-2 py-1"
            >
              <User className="w-3.5 h-3.5" />
              <span>Ingresar</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 select-all">
              {phoneNumber}
            </span>
            <button
              onClick={onOpenAdmin}
              className="p-1.5 rounded-md text-slate-600 hover:bg-slate-100"
              title="Ingresar Admin"
            >
              <User className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-md text-slate-700 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2.5 shadow-lg text-sm">
          <a
            href="#como-funciona"
            onClick={() => setMobileMenuOpen(false)}
            className="block font-semibold text-slate-800 hover:text-nae-blue py-1"
          >
            Cómo Funciona
          </a>
          <a
            href="#beneficios"
            onClick={() => setMobileMenuOpen(false)}
            className="block font-semibold text-slate-800 hover:text-nae-blue py-1"
          >
            Ventajas & Legalidad
          </a>
          <a
            href="#calculadora"
            onClick={() => setMobileMenuOpen(false)}
            className="block font-semibold text-slate-800 hover:text-nae-blue py-1"
          >
            Calculadora CBM
          </a>
          <a
            href="#zarpes"
            onClick={() => setMobileMenuOpen(false)}
            className="block font-semibold text-slate-800 hover:text-nae-blue py-1"
          >
            Próximos Zarpes
          </a>
          <a
            href="#contacto"
            onClick={() => setMobileMenuOpen(false)}
            className="block font-semibold text-slate-800 hover:text-nae-blue py-1"
          >
            Formulario de Contacto
          </a>
          <div className="pt-2 border-t border-slate-100">
            <span className="block text-xs text-slate-500 font-medium">Celular de contacto directo:</span>
            <span className="block text-sm font-bold text-slate-900 select-all py-1">{phoneNumber}</span>
          </div>
        </div>
      )}
    </header>
  );
};
