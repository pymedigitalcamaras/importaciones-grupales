import React from 'react';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const whatsappUrl = "https://wa.me/56990117784?text=Hola,%20deseo%20cotizar%20una%20importaci%C3%B3n%20grupal%20desde%20China";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 bg-[#ea580c] hover:bg-[#c2410c] text-white rounded-full shadow-2xl hover:shadow-orange-500/30 transition-all duration-300 hover:scale-105 active:scale-95 group border-2 border-white"
      aria-label="Contactar por WhatsApp directo al +56 9 9011 7784"
    >
      <MessageCircle className="w-7 h-7 fill-white" />
      <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white animate-pulse" />
    </a>
  );
};
