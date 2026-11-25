import React from 'react';
import { ExternalLink, CheckCircle2, BookOpen, Layers, Award } from 'lucide-react';
import { competitorsData, bibliographySources } from '../data/competitors';

interface MarketResearchSectionProps {
  onOpenBibliographyModal: () => void;
}

export const MarketResearchSection: React.FC<MarketResearchSectionProps> = ({ onOpenBibliographyModal }) => {
  return (
    <section id="investigacion" className="py-16 lg:py-24 bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
              Benchmarking & Transparencia
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-black text-white tracking-tight">
              Investigación de Mercado & Fuentes de Inspiración
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
              Para construir nuestra propuesta de valor analizamos a fondo los tres principales actores de importaciones grupales y consolidados de China hacia Latinoamérica, sintetizando sus mayores fortalezas y perfeccionando sus puntos débiles.
            </p>
          </div>

          <button
            onClick={onOpenBibliographyModal}
            className="self-start md:self-auto px-4 py-2.5 rounded-xl text-xs font-bold bg-blue-600/20 text-blue-300 border border-blue-500/30 hover:bg-blue-600/30 flex items-center gap-2 transition"
          >
            <BookOpen className="w-4 h-4" />
            Ver Bibliografía Completa y URLs
          </button>
        </div>

        {/* 3 Benchmark Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {competitorsData.map((actor, idx) => (
            <div
              key={idx}
              className="bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Actor #{idx + 1}
                  </span>
                  <a
                    href={actor.url.split(' ')[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium"
                  >
                    Visitar sitio
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <h3 className="text-xl font-black text-white mb-1">
                  {actor.name}
                </h3>
                <span className="text-xs text-slate-400 block mb-4 font-mono">
                  {actor.country}
                </span>

                <div className="space-y-4 text-xs text-slate-300 mb-6">
                  <div>
                    <strong className="text-slate-200 block mb-1">Fortalezas Identificadas:</strong>
                    <ul className="space-y-1 list-disc list-inside text-slate-400">
                      {actor.strengths.slice(0, 3).map((st, i) => (
                        <li key={i}>{st}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <strong className="text-slate-200 block mb-0.5">Modelo de Cobro:</strong>
                    <p className="text-slate-400">{actor.pricingModel}</p>
                  </div>
                </div>
              </div>

              {/* What was extracted */}
              <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-900/50 space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-blue-400 block tracking-wider">
                  Lo mejor adoptado en nuestro sitio:
                </span>
                <p className="text-xs text-blue-100 font-medium">
                  {actor.extractedBestPractice}
                </p>
                <span className="text-[10px] text-slate-400 block pt-1">
                  Aplicado en: {actor.appliedSection}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Summary Banner */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              Al combinar <strong>Cubicaje Justo (WS Cargo)</strong> + <strong>Facturación & DIN Legal (Komex)</strong> + <strong>Zarpes & Auditoría (Contenedor Compartido)</strong>, ofrecemos el servicio más seguro y rentable del mercado.
            </p>
          </div>
          <button
            onClick={onOpenBibliographyModal}
            className="text-xs text-slate-300 hover:text-white underline underline-offset-4 whitespace-nowrap"
          >
            Consultar citas bibliográficas (4 fuentes) →
          </button>
        </div>
      </div>
    </section>
  );
};
