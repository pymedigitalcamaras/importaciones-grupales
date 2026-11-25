import React from 'react';
import { DollarSign, Scale, CheckCheck, Clock, ShieldAlert, Award, FileSpreadsheet } from 'lucide-react';

export const ValueProposition: React.FC = () => {
  const benefits = [
    {
      icon: <DollarSign className="w-6 h-6 text-emerald-400" />,
      title: "Tarifas Transparentes por CBM",
      sourceBadge: "Inspirado en modelo WS Cargo",
      description: "Pagas únicamente por el volumen real que ocupas ($USD/m³). Sin cobros sorpresa de almacenamiento ni 'gastos portuarios inflados' al llegar.",
      highlight: "Hasta un 70% menos que flete aéreo"
    },
    {
      icon: <Scale className="w-6 h-6 text-blue-400" />,
      title: "Formalidad Tributaria Total (DIN)",
      sourceBadge: "Inspirado en modelo Komex",
      description: "La Declaración de Ingreso y el Bill of Lading se emiten a nombre de tu empresa o RUT. Recuperas el 19% del IVA crédito fiscal y deduces gastos contables legítimos.",
      highlight: "100% Legal para tu contabilidad"
    },
    {
      icon: <CheckCheck className="w-6 h-6 text-indigo-400" />,
      title: "Auditoría Previa de Proveedores",
      sourceBadge: "Inspirado en Contenedor Compartido",
      description: "Verificamos la existencia legal de fábricas en China, revisamos bultos al llegar a Ningbo y prevenimos envíos defectuosos o estafas habituales.",
      highlight: "Inspección en origen garantizada"
    },
    {
      icon: <Clock className="w-6 h-6 text-amber-400" />,
      title: "Zarpes Quincenales Programados",
      sourceBadge: "Mejor práctica de la industria",
      description: "Itinerarios de zarpe marítimo fijos con tiempos de tránsito marítimo de 28 a 35 días (puerto a puerto). Sabes exactamente cuándo llega tu carga a puerto.",
      highlight: "Certeza en tu reposición de stock"
    },
    {
      icon: <FileSpreadsheet className="w-6 h-6 text-cyan-400" />,
      title: "Cero Complicaciones Aduaneras",
      sourceBadge: "Agencia de Aduanas Integrada",
      description: "Nos encargamos del Visto Bueno, desconsolidación en terminal portuario, gestión de aranceles preferenciales TLC (Form F) y liberación rápida.",
      highlight: "Trámite aduanero 'Llave en Mano'"
    },
    {
      icon: <Award className="w-6 h-6 text-purple-400" />,
      title: "Sin Pedidos Mínimos Descomunales",
      sourceBadge: "Democratización de importaciones",
      description: "No necesitas comprar \$20.000 USD ni llenar 68 metros cúbicos de un contenedor de 40 pies. Comienza a importar desde 0.5 CBM con tarifas corporativas.",
      highlight: "Desde 1 metro cúbico o menos"
    }
  ];

  return (
    <section id="beneficios" className="py-16 lg:py-24 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-500 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            ¿Por Qué Elegirnos?
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-black text-white tracking-tight">
            Lo Mejor de los Líderes del Rubro en una Sola Solución
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Analizamos minuciosamente el mercado logístico internacional para ofrecerte la combinación perfecta entre <strong>precios justos</strong>, <strong>seguridad aduanera</strong> y <strong>acompañamiento personalizado</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 hover:bg-slate-900 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center">
                    {b.icon}
                  </div>
                  <span className="text-[11px] font-medium text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    {b.sourceBadge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">
                  {b.title}
                </h3>

                <p className="text-sm text-slate-400 leading-relaxed mb-4">
                  {b.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-emerald-400">
                <span>{b.highlight}</span>
                <span className="text-slate-600">✓</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
