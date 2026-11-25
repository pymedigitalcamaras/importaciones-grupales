import React from 'react';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const whatsappUrl = "https://wa.me/56990117784?text=Hola,%20deseo%20cotizar%20una%20importaci%C3%B3n%20grupal%20desde%20China";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 group border-2 border-white"
      aria-label="Contactar por WhatsApp directo al +56 9 9011 7784"
    >
      <div className="relative">
        <MessageCircle className="w-6 h-6 fill-white" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-300 rounded-full animate-ping" />
      </div>
      <div className="hidden sm:flex flex-col text-left">
        <span className="text-[10px] uppercase font-bold text-emerald-100 leading-none">¿Dudas? Escríbenos</span>
        <span className="text-xs font-bold leading-tight">+56 9 9011 7784</span>
      </div>
    </a>
  );
};
