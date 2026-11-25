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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white border border-slate-300 rounded-2xl shadow-xl p-6 sm:p-8 my-8 text-left max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Bibliografía & Fuentes de Investigación de Mercado
              </h2>
              <p className="text-xs text-slate-500">
                Sitios web y referentes analizados para estructurar este servicio
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto py-5 space-y-6 pr-1">
          {/* Section 1: Detailed Sources */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-3 flex items-center gap-1.5">
              <Info className="w-4 h-4" />
              1. Fuentes Principales y Enlaces Directos
            </h3>
            
            <div className="space-y-3">
              {bibliographySources.map((source, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-bold text-slate-900">{source.title}</h4>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 font-semibold bg-white px-2 py-0.5 rounded border border-slate-200"
                    >
                      Abrir enlace
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 block mb-1.5">{source.url}</span>
                  <p className="text-xs text-slate-600 leading-relaxed">{source.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Detailed Mapping of What Was Taken */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-3 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              2. Matriz de Atributos Extraídos y Aplicados en el Sitio
            </h3>

            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-100 text-slate-700 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="p-3">Actor Analizado</th>
                    <th className="p-3">Mejor Característica Extraída</th>
                    <th className="p-3">Dónde se Aplicó en Nuestro Sitio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {competitorsData.map((c, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-slate-900 whitespace-nowrap">
                        {c.name}
                        <span className="block text-[10px] font-normal text-slate-500 font-mono">
                          {c.url.split(' ')[0]}
                        </span>
                      </td>
                      <td className="p-3">{c.extractedBestPractice}</td>
                      <td className="p-3 text-blue-700 font-semibold">{c.appliedSection}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* User Review Guide */}
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-slate-700 space-y-1.5">
            <h4 className="font-bold text-slate-900">
              💡 Guía para tu análisis posterior:
            </h4>
            <p>
              Puedes navegar en los enlaces de arriba para corroborar sus tarifas, cotizadores y modalidades. Si deseas incorporar algún servicio adicional de alguno de ellos, podemos ajustarlo de inmediato.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
          >
            Cerrar Bibliografía
          </button>
        </div>
      </div>
    </div>
  );
};
