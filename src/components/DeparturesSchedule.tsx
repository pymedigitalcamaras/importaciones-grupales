import React from 'react';
import { Calendar, Anchor, Clock, ArrowRight, MessageCircle } from 'lucide-react';

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
      statusBadge: "bg-emerald-100 text-emerald-800 border-emerald-300",
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
      statusBadge: "bg-blue-100 text-blue-800 border-blue-300",
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
      statusBadge: "bg-slate-100 text-slate-800 border-slate-300",
      availableCbm: "Contenedor Abierto",
      featured: false
    }
  ];

  return (
    <section id="zarpes" className="py-14 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-700 bg-blue-100/70 px-3 py-1 rounded-full border border-blue-200">
              Itinerario Marítimo Fijo
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Próximos Zarpes de Contenedores Compartidos
            </h2>
            <p className="mt-1.5 text-sm text-slate-600 max-w-xl">
              Garantizamos fechas de corte de recepción para que planifiques tus compras en China sin demoras innecesarias.
            </p>
          </div>

          <a
            href="https://wa.me/56990117784?text=Hola,%20deseo%20reservar%20espacio%20en%20el%20pr%C3%B3ximo%20zarpe"
            target="_blank"
            rel="noopener noreferrer"
            className="self-start md:self-auto px-4 py-2 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 transition shadow-xs"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Reservar Espacio por WhatsApp
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {departures.map((d) => (
            <div
              key={d.id}
              className={`rounded-xl p-5 border transition-all duration-200 flex flex-col justify-between bg-white ${
                d.featured
                  ? 'border-blue-400 shadow-sm ring-1 ring-blue-400/30'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold font-mono text-slate-500">
                    {d.id}
                  </span>
                  <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full border ${d.statusBadge}`}>
                    ● {d.status}
                  </span>
                </div>

                <div className="space-y-2.5 mb-5">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Ruta Marítima:</span>
                    <p className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <Anchor className="w-4 h-4 text-blue-600" />
                      {d.origin} → {d.destination}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase">Cierre Bodega:</span>
                      <span className="font-bold text-slate-800">{d.closingDate}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase">Arribo Estimado:</span>
                      <span className="font-bold text-emerald-700">{d.eta}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-600">
                  {d.availableCbm}
                </span>
                <a
                  href={`https://wa.me/56990117784?text=Hola,%20deseo%20sumar%20mi%20carga%20al%20zarpe%20${d.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  Sumar carga →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
