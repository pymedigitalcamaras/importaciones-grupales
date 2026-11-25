import React, { useState } from 'react';
import { Ship, Calculator, Calendar, FileText, Phone, Settings, Menu, X, ArrowRight, MessageCircle } from 'lucide-react';

interface NavbarProps {
  onOpenAdmin: () => void;
  onOpenBibliography: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin, onOpenBibliography }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const phoneNumber = "+56 9 9011 7784";
  const whatsappUrl = "https://wa.me/56990117784?text=Hola,%20deseo%20cotizar%20una%20importaci%C3%B3n%20grupal%20desde%20China";

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 shadow-xs">
      {/* Top micro banner */}
      <div className="bg-slate-100 border-b border-slate-200 px-4 py-1.5 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
              ● ZARPE ACTIVO
            </span>
            <span className="text-slate-700 font-medium text-xs">
              Cierre de recepción en Ningbo: <strong>15 de Diciembre</strong>. Cupos LCL disponibles.
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={onOpenBibliography}
              className="text-xs text-blue-600 hover:text-blue-800 underline underline-offset-2 flex items-center gap-1 font-medium transition"
            >
              <FileText className="w-3.5 h-3.5" />
              Bibliografía & Comparativa
            </button>
            <span className="hidden sm:inline text-slate-300">|</span>
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-slate-700 hover:text-emerald-600 font-semibold transition"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp Directo: {phoneNumber}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <a href="#" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-sm text-white group-hover:bg-blue-700 transition">
              <Ship className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-slate-900 flex items-center gap-1">
                GRUPO<span className="text-blue-600">IMPORTA</span>
              </span>
              <span className="block text-[10px] font-semibold tracking-wider uppercase text-slate-500">
                Carga Consolidada LCL China
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-700">
            <a href="#como-funciona" className="hover:text-blue-600 transition">Cómo Funciona</a>
            <a href="#beneficios" className="hover:text-blue-600 transition">Ventajas</a>
            <a href="#calculadora" className="hover:text-blue-600 transition flex items-center gap-1">
              <Calculator className="w-3.5 h-3.5 text-blue-600" />
              Calculadora CBM
            </a>
            <a href="#zarpes" className="hover:text-blue-600 transition flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              Próximos Zarpes
            </a>
            <a href="#investigacion" className="hover:text-blue-600 transition">Comparativa</a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center space-x-3">
            <a
              href={`tel:+56990117784`}
              className="p-2 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-slate-100 border border-slate-200 transition"
              title="Llamar directo"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={onOpenAdmin}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-slate-200 transition"
              title="Panel de Administración (Leads & Slider)"
            >
              <Settings className="w-4 h-4" />
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs flex items-center gap-1.5 transition active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              Hablar por WhatsApp
            </a>
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
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition"
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
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <a
            href="#como-funciona"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-slate-800 hover:text-blue-600 py-1"
          >
            Cómo Funciona
          </a>
          <a
            href="#beneficios"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-slate-800 hover:text-blue-600 py-1"
          >
            Ventajas & Legalidad
          </a>
          <a
            href="#calculadora"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-slate-800 hover:text-blue-600 py-1"
          >
            Calculadora CBM
          </a>
          <a
            href="#zarpes"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-slate-800 hover:text-blue-600 py-1"
          >
            Próximos Zarpes
          </a>
          <a
            href="#investigacion"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-slate-800 hover:text-blue-600 py-1"
          >
            Comparativa & Bibliografía
          </a>
          <div className="pt-2 space-y-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp: {phoneNumber}
            </a>
            <a
              href="#cotizador"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center block px-4 py-2.5 rounded-lg text-sm font-semibold bg-slate-900 hover:bg-slate-800 text-white"
            >
              Formulario de Cotización
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
