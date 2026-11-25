import React from 'react';
import { Ship, MessageCircle, Phone, Settings, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const phoneNumber = "+56 9 9011 7784";
  const whatsappUrl = "https://wa.me/56990117784?text=Hola,%20deseo%20informaci%C3%B3n%20sobre%20importaciones%20grupales";

  return (
    <footer className="bg-nae-dark text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-md bg-nae-blue flex items-center justify-center text-white">
                <Ship className="w-4 h-4" />
              </div>
              <span className="text-base font-black tracking-tight text-white">
                GRUPO<span className="text-sky-400">IMPORTA</span>
              </span>
            </div>
            
            <p className="text-slate-400 text-xs leading-relaxed">
              Consolidación marítima (LCL) y compras grupales desde China. Optimizamos fletes internacionales y gestionamos desaduanamiento 100% formal a tu nombre.
            </p>
          </div>

          {/* Contact Direct */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Atención Directa</h4>
            <div className="space-y-1.5 text-slate-300">
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-emerald-400 transition"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp: <strong>{phoneNumber}</strong></span>
              </a>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-sky-400" />
                <span>Celular: <strong className="select-all text-white">{phoneNumber}</strong></span>
              </div>
            </div>
          </div>

          {/* Logistics Network */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Bodegas en Origen</h4>
            <ul className="space-y-1 text-slate-400">
              <li>📍 Ningbo (Beilun Logistics Hub)</li>
              <li>📍 Guangzhou (Baiyun District)</li>
              <li>📍 Yiwu (International Trade City)</li>
              <li>📍 San Antonio / Valparaíso (Destino)</li>
            </ul>
          </div>

          {/* Admin & Shortcuts */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Administración</h4>
            <button
              onClick={onOpenAdmin}
              className="py-1.5 px-3 rounded-md bg-white/10 hover:bg-white/20 text-slate-200 border border-white/20 flex items-center gap-1.5 transition text-xs"
            >
              <Settings className="w-3.5 h-3.5" />
              Panel Admin (Leads & Slider)
            </button>
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
