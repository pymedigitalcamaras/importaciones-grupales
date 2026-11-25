import React from 'react';
import { DollarSign, Scale, CheckCheck, Clock, Award, FileSpreadsheet } from 'lucide-react';

export const ValueProposition: React.FC = () => {
  const benefits = [
    {
      icon: <DollarSign className="w-5 h-5 text-emerald-600" />,
      title: "Tarifas Transparentes por CBM",
      sourceBadge: "Modelo WS Cargo",
      description: "Pagas únicamente por el volumen real que ocupas ($USD/m³). Sin cobros sorpresa de almacenamiento ni gastos inflados al llegar al puerto.",
      highlight: "Hasta un 70% menos que flete aéreo"
    },
    {
      icon: <Scale className="w-5 h-5 text-blue-600" />,
      title: "Formalidad Tributaria Total (DIN)",
      sourceBadge: "Modelo Komex",
      description: "La Declaración de Ingreso y el Bill of Lading se emiten a nombre de tu empresa o RUT. Recuperas el 19% del IVA crédito fiscal y deduces gastos contables legítimos.",
      highlight: "100% Legal para tu contabilidad"
    },
    {
      icon: <CheckCheck className="w-5 h-5 text-indigo-600" />,
      title: "Auditoría Previa de Proveedores",
      sourceBadge: "Modelo Contenedor Compartido",
      description: "Verificamos la existencia legal de fábricas en China, revisamos bultos al llegar a Ningbo y prevenimos envíos defectuosos o estafas.",
      highlight: "Inspección en origen garantizada"
    },
    {
      icon: <Clock className="w-5 h-5 text-amber-600" />,
      title: "Zarpes Quincenales Programados",
      sourceBadge: "Itinerarios Fijos",
      description: "Itinerarios de zarpe marítimo fijos con tiempos de tránsito marítimo de 28 a 35 días (puerto a puerto). Sabes con exactitud cuándo arriba tu carga.",
      highlight: "Certeza en tu reposición de stock"
    },
    {
      icon: <FileSpreadsheet className="w-5 h-5 text-cyan-600" />,
      title: "Cero Complicaciones Aduaneras",
      sourceBadge: "Agencia de Aduanas",
      description: "Nos encargamos del Visto Bueno, desconsolidación en terminal portuario, gestión de aranceles preferenciales TLC (Form F) y liberación expedita.",
      highlight: "Trámite aduanero 'Llave en Mano'"
    },
    {
      icon: <Award className="w-5 h-5 text-purple-600" />,
      title: "Sin Mínimos Excesivos",
      sourceBadge: "Para PyMEs y Emprendedores",
      description: "No necesitas comprar \$20.000 USD ni llenar los 68 metros cúbicos de un contenedor de 40 pies. Comienza a importar desde 0.5 CBM con tarifas de escala.",
      highlight: "Desde 0.5 metros cúbicos"
    }
  ];

  return (
    <section id="beneficios" className="py-14 lg:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-700 bg-blue-100/70 px-3 py-1 rounded-full border border-blue-200">
            ¿Por Qué Importar con Nosotros?
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Lo Mejor de los Líderes del Rubro en una Sola Solución
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Combinamos <strong>precios justos por volumen</strong>, <strong>seguridad tributaria formal</strong> y <strong>acompañamiento directo</strong> vía WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-400 hover:shadow-sm transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                    {b.icon}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                    {b.sourceBadge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-1.5">
                  {b.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {b.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                <span>{b.highlight}</span>
                <span className="text-emerald-600">✓</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
