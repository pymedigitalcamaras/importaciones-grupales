import React from 'react';
import { Calendar, Anchor, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';

export const DeparturesSchedule: React.FC = () => {
  const departures = [
    {
      id: "ZARPE-DIC-01",
      origin: "Ningbo / Yiwu (China)",
      destination: "San Antonio / Valparaíso",
      closingDate: "15 de Diciembre",
      etd: "22 de Diciembre",
      eta: "25 de Enero",
      status: "Abierto para Cargas",
      statusColor: "emerald",
      availableCbm: "18 CBM restantes",
      featured: true
    },
    {
      id: "ZARPE-ENE-01",
      origin: "Guangzhou / Shenzhen (China)",
      destination: "San Antonio / Valparaíso",
      closingDate: "05 de Enero",
      etd: "12 de Enero",
      eta: "15 de Febrero",
      status: "Recibiendo en Bodega",
      statusColor: "blue",
      availableCbm: "35 CBM restantes",
      featured: false
    },
    {
      id: "ZARPE-ENE-02",
      origin: "Ningbo / Shanghai (China)",
      destination: "Callao / San Antonio",
      closingDate: "20 de Enero",
      etd: "28 de Enero",
      eta: "02 de Marzo",
      status: "Programado",
      statusColor: "indigo",
      availableCbm: "Contenedor Abierto",
      featured: false
    }
  ];

  return (
    <section id="zarpes" className="py-16 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
              Itinerario Marítimo Fijo
            </span>
            <h2 className="mt-3 text-3xl font-black text-white tracking-tight">
              Próximos Zarpes de Contenedores Compartidos
            </h2>
            <p className="mt-2 text-sm text-slate-400 max-w-xl">
              Garantizamos fechas de corte de recepción para que planifiques tus compras en China sin demoras innecesarias.
            </p>
          </div>

          <a
            href="#cotizador"
            className="self-start md:self-auto px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition"
          >
            Reservar Espacio en Contenedor
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {departures.map((d) => (
            <div
              key={d.id}
              className={`rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between ${
                d.featured
                  ? 'bg-gradient-to-b from-blue-950/40 via-slate-900 to-slate-950 border-blue-500/50 shadow-xl shadow-blue-950/30 ring-1 ring-blue-500/30'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold font-mono text-slate-400">
                    {d.id}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                      d.statusColor === 'emerald'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                    }`}
                  >
                    ● {d.status}
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Ruta Marítima:</span>
                    <p className="text-sm font-bold text-white flex items-center gap-1.5">
                      <Anchor className="w-4 h-4 text-blue-400" />
                      {d.origin} → {d.destination}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-xs">
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase">Cierre Bodega:</span>
                      <span className="font-bold text-amber-400">{d.closingDate}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase">Arribo Estimado:</span>
                      <span className="font-bold text-emerald-400">{d.eta}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">
                  {d.availableCbm}
                </span>
                <a
                  href="#cotizador"
                  className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1"
                >
                  Sumar mi carga →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
