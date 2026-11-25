import React, { useState } from 'react';
import { Ship, ShieldCheck, Calculator, Calendar, FileText, Phone, Settings, Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onOpenAdmin: () => void;
  onOpenBibliography: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin, onOpenBibliography }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      {/* Top micro banner */}
      <div className="bg-gradient-to-r from-blue-900/60 via-indigo-900/40 to-slate-900 border-b border-blue-800/30 px-4 py-1.5 text-xs text-blue-200">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 animate-pulse">
              ● ZARPE ACTIVO
            </span>
            <span>Próximo cierre de recepción en Ningbo: <strong>15 de Diciembre</strong>. Cupos LCL disponibles.</span>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={onOpenBibliography}
              className="text-xs text-blue-300 hover:text-white underline underline-offset-2 flex items-center gap-1 transition"
            >
              <FileText className="w-3 h-3" />
              Bibliografía & Análisis de Mercado
            </button>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:inline text-slate-300">Soporte Importaciones: +56 9 8452 1190</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <a href="#" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 border border-blue-400/30 group-hover:scale-105 transition-transform">
              <Ship className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-white flex items-center gap-1">
                GRUPO<span className="text-blue-500">IMPORTA</span>
              </span>
              <span className="block text-[10px] font-medium tracking-wider uppercase text-slate-400">
                Carga Consolidada LCL China
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-300">
            <a href="#como-funciona" className="hover:text-blue-400 transition">Cómo Funciona</a>
            <a href="#beneficios" className="hover:text-blue-400 transition">Ventajas</a>
            <a href="#calculadora" className="hover:text-blue-400 transition flex items-center gap-1">
              <Calculator className="w-3.5 h-3.5 text-blue-400" />
              Calculadora CBM
            </a>
            <a href="#zarpes" className="hover:text-blue-400 transition flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              Zarpes
            </a>
            <a href="#investigacion" className="hover:text-blue-400 transition">Comparativa</a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={onOpenAdmin}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition"
              title="Panel de Administración (Leads & Slider)"
            >
              <Settings className="w-4 h-4" />
            </button>
            <a
              href="#cotizador"
              className="px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition active:scale-95"
            >
              Cotizar Carga
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={onOpenAdmin}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition"
              title="Panel Admin"
            >
              <Settings className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-900 px-4 pt-2 pb-6 space-y-3">
          <a
            href="#como-funciona"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-slate-300 hover:text-blue-400"
          >
            Cómo Funciona
          </a>
          <a
            href="#beneficios"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-slate-300 hover:text-blue-400"
          >
            Ventajas & Legalidad
          </a>
          <a
            href="#calculadora"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-slate-300 hover:text-blue-400"
          >
            Calculadora CBM
          </a>
          <a
            href="#zarpes"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-slate-300 hover:text-blue-400"
          >
            Próximos Zarpes
          </a>
          <a
            href="#investigacion"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-slate-300 hover:text-blue-400"
          >
            Comparativa & Bibliografía
          </a>
          <div className="pt-2">
            <a
              href="#cotizador"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center block px-4 py-2.5 rounded-xl text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white"
            >
              Cotizar Carga Ahora
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
