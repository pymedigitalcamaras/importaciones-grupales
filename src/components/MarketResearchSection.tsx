import React from 'react';
import { ExternalLink, BookOpen, Award } from 'lucide-react';
import { competitorsData } from '../data/competitors';

interface MarketResearchSectionProps {
  onOpenBibliographyModal: () => void;
}

export const MarketResearchSection: React.FC<MarketResearchSectionProps> = ({ onOpenBibliographyModal }) => {
  return (
    <section id="investigacion" className="py-14 lg:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-700 bg-blue-100/70 px-3 py-1 rounded-full border border-blue-200">
              Benchmarking & Transparencia
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Investigación de Mercado & Fuentes de Inspiración
            </h2>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Analizamos a los tres principales actores de importaciones grupales de China hacia Chile y Latinoamérica para ofrecerte las mejores prácticas consolidadas en una sola plataforma.
            </p>
          </div>

          <button
            onClick={onOpenBibliographyModal}
            className="self-start md:self-auto px-4 py-2 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300 flex items-center gap-1.5 transition"
          >
            <BookOpen className="w-4 h-4 text-blue-600" />
            Ver Bibliografía y Enlaces
          </button>
        </div>

        {/* 3 Benchmark Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {competitorsData.map((actor, idx) => (
            <div
              key={idx}
              className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col justify-between hover:border-slate-300 transition"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Actor #{idx + 1}
                  </span>
                  <a
                    href={actor.url.split(' ')[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 font-semibold"
                  >
                    Visitar sitio
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-0.5">
                  {actor.name}
                </h3>
                <span className="text-xs text-slate-500 block mb-3 font-mono">
                  {actor.country}
                </span>

                <div className="space-y-3 text-xs text-slate-600 mb-5">
                  <div>
                    <strong className="text-slate-800 block mb-1">Fortalezas Identificadas:</strong>
                    <ul className="space-y-1 list-disc list-inside text-slate-600">
                      {actor.strengths.slice(0, 3).map((st, i) => (
                        <li key={i}>{st}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <strong className="text-slate-800 block mb-0.5">Modelo de Cobro:</strong>
                    <p className="text-slate-600">{actor.pricingModel}</p>
                  </div>
                </div>
              </div>

              {/* What was extracted */}
              <div className="p-3.5 rounded-lg bg-white border border-blue-200 space-y-1">
                <span className="text-[10px] uppercase font-bold text-blue-700 block tracking-wider">
                  Mejor práctica adoptada:
                </span>
                <p className="text-xs text-slate-800 font-medium">
                  {actor.extractedBestPractice}
                </p>
                <span className="text-[10px] text-slate-500 block pt-0.5">
                  Aplicado en: {actor.appliedSection}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Summary Banner */}
        <div className="mt-7 p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center justify-center flex-shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <p className="text-xs sm:text-sm text-slate-700">
              Al combinar <strong>Cubicaje Justo (WS Cargo)</strong> + <strong>DIN y Facturación Legal (Komex)</strong> + <strong>Zarpes y Auditoría (Contenedor Compartido)</strong>, brindamos un servicio seguro, formal y transparente.
            </p>
          </div>
          <button
            onClick={onOpenBibliographyModal}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 underline underline-offset-4 whitespace-nowrap"
          >
            Consultar citas bibliográficas (4 fuentes) →
          </button>
        </div>
      </div>
    </section>
  );
};
