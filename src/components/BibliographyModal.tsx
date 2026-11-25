import React from 'react';
import { X, ExternalLink, BookOpen, CheckCircle, Info } from 'lucide-react';
import { bibliographySources, competitorsData } from '../data/competitors';

interface BibliographyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BibliographyModal: React.FC<BibliographyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-6 sm:p-8 my-8 text-left max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white">
                Bibliografía & Fuentes de Investigación de Mercado
              </h2>
              <p className="text-xs text-slate-400">
                Páginas web y referentes analizados para estructurar este sitio web
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto py-6 space-y-8 pr-2">
          {/* Section 1: Detailed Sources */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-blue-400 mb-3 flex items-center gap-2">
              <Info className="w-4 h-4" />
              1. Fuentes Principales y Enlaces Directos
            </h3>
            
            <div className="space-y-4">
              {bibliographySources.map((source, index) => (
                <div
                  key={index}
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-bold text-white">{source.title}</h4>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20"
                    >
                      Abrir enlace
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 block mb-2">{source.url}</span>
                  <p className="text-xs text-slate-300 leading-relaxed">{source.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Detailed Mapping of What Was Taken */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              2. Matriz de Atributos Extraídos y Aplicados en el Sitio
            </h3>

            <div className="overflow-x-auto border border-slate-800 rounded-2xl">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-3">Actor Analizado</th>
                    <th className="p-3">Mejor Característica Extraída</th>
                    <th className="p-3">Dónde se Aplicó en Nuestro Sitio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-900/60">
                  {competitorsData.map((c, i) => (
                    <tr key={i} className="hover:bg-slate-850">
                      <td className="p-3 font-bold text-white whitespace-nowrap">
                        {c.name}
                        <span className="block text-[10px] font-normal text-slate-500 font-mono">
                          {c.url.split(' ')[0]}
                        </span>
                      </td>
                      <td className="p-3">{c.extractedBestPractice}</td>
                      <td className="p-3 text-blue-300 font-medium">{c.appliedSection}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* User Review Guide */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/40 to-indigo-950/40 border border-blue-800/40 text-xs text-slate-300 space-y-2">
            <h4 className="font-bold text-white flex items-center gap-1.5">
              💡 Guía para tu posterior análisis:
            </h4>
            <p>
              Puedes ingresar a cada una de las URLs proporcionadas arriba para revisar sus cotizadores, términos y condiciones y promociones. Si identificas algún servicio adicional (como seguros de carga extendidos o inspecciones en video en vivo) que desees incorporar, podemos integrarlo directamente en los próximos ajustes.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white transition"
          >
            Cerrar Bibliografía
          </button>
        </div>
      </div>
    </div>
  );
};
