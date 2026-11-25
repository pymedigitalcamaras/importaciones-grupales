import React from 'react';
import { Ship, Mail, Phone, MapPin, ShieldCheck, FileText, Settings, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
  onOpenBibliography: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onOpenBibliography }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md">
                <Ship className="w-5 h-5" />
              </div>
              <span className="text-lg font-black tracking-tight text-white">
                GRUPO<span className="text-blue-500">IMPORTA</span>
              </span>
            </div>
            
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Especialistas en importaciones grupales y consolidación marítima (LCL) desde China. Optimizamos tus costos de transporte y garantizamos un despacho aduanero 100% formal a tu nombre.
            </p>

            <div className="pt-2 flex items-center gap-2 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Desaduanaje con Declaración de Ingreso (DIN) Legal</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Servicios</h4>
            <ul className="space-y-2">
              <li><a href="#como-funciona" className="hover:text-blue-400 transition">Cómo Funciona LCL</a></li>
              <li><a href="#beneficios" className="hover:text-blue-400 transition">Ventajas & Ahorro</a></li>
              <li><a href="#calculadora" className="hover:text-blue-400 transition">Calculadora CBM</a></li>
              <li><a href="#zarpes" className="hover:text-blue-400 transition">Próximos Zarpes</a></li>
              <li><a href="#cotizador" className="hover:text-blue-400 transition">Cotizar Carga</a></li>
            </ul>
          </div>

          {/* Logistics Network */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Bodegas en Origen</h4>
            <ul className="space-y-2 text-slate-400">
              <li>📍 Ningbo (Beilun Logistics Hub)</li>
              <li>📍 Guangzhou (Baiyun District)</li>
              <li>📍 Yiwu (International Trade City)</li>
              <li>📍 Puerto Destino: San Antonio / Valparaíso</li>
            </ul>
          </div>

          {/* Direct Access & Admin */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Administración & Fuentes</h4>
            <div className="space-y-2">
              <button
                onClick={onOpenBibliography}
                className="w-full text-left py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-blue-300 border border-slate-800 flex items-center gap-2 transition"
              >
                <FileText className="w-3.5 h-3.5" />
                Bibliografía & Fuentes Web
              </button>
              <button
                onClick={onOpenAdmin}
                className="w-full text-left py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 flex items-center gap-2 transition"
              >
                <Settings className="w-3.5 h-3.5" />
                Panel Admin (Leads & Slider)
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} GrupoImporta. Todos los derechos reservados. Basado en las mejores prácticas de la industria logística internacional.</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition"
          >
            Volver arriba
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
