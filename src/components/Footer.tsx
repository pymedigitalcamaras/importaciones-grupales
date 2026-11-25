import React from 'react';
import { Ship, MessageCircle, Phone, MapPin, ShieldCheck, FileText, Settings, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
  onOpenBibliography: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onOpenBibliography }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const phoneNumber = "+56 9 9011 7784";
  const whatsappUrl = "https://wa.me/56990117784?text=Hola,%20deseo%20informaci%C3%B3n%20sobre%20importaciones%20grupales";

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Ship className="w-4 h-4" />
              </div>
              <span className="text-base font-black tracking-tight text-white">
                GRUPO<span className="text-blue-400">IMPORTA</span>
              </span>
            </div>
            
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Especialistas en importaciones grupales y consolidación marítima (LCL) desde China. Optimizamos costos de transporte y garantizamos despacho aduanero 100% formal a tu nombre.
            </p>

            <div className="pt-1 flex flex-col gap-1 text-slate-300">
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-emerald-400 transition"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp: <strong>{phoneNumber}</strong></span>
              </a>
              <a 
                href="tel:+56990117784"
                className="flex items-center gap-2 hover:text-blue-400 transition"
              >
                <Phone className="w-4 h-4 text-blue-400" />
                <span>Teléfono directo: <strong>{phoneNumber}</strong></span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Navegación</h4>
            <ul className="space-y-1.5">
              <li><a href="#como-funciona" className="hover:text-white transition">Cómo Funciona LCL</a></li>
              <li><a href="#beneficios" className="hover:text-white transition">Ventajas & Ahorro</a></li>
              <li><a href="#calculadora" className="hover:text-white transition">Calculadora CBM</a></li>
              <li><a href="#zarpes" className="hover:text-white transition">Próximos Zarpes</a></li>
              <li><a href="#cotizador" className="hover:text-white transition">Cotizar Carga</a></li>
            </ul>
          </div>

          {/* Logistics Network */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Red en Origen</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>📍 Ningbo (Beilun Logistics Hub)</li>
              <li>📍 Guangzhou (Baiyun District)</li>
              <li>📍 Yiwu (International Trade City)</li>
              <li>📍 San Antonio / Valparaíso (Destino)</li>
            </ul>
          </div>

          {/* Direct Access & Admin */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Acceso & Fuentes</h4>
            <div className="space-y-2">
              <button
                onClick={onOpenBibliography}
                className="w-full text-left py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-300 border border-slate-700 flex items-center gap-1.5 transition"
              >
                <FileText className="w-3.5 h-3.5" />
                Bibliografía & Fuentes Web
              </button>
              <button
                onClick={onOpenAdmin}
                className="w-full text-left py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1.5 transition"
              >
                <Settings className="w-3.5 h-3.5" />
                Panel Admin (Leads & Slider)
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} GrupoImporta. Todos los derechos reservados.</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-slate-400 hover:text-white transition"
          >
            Volver arriba
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
