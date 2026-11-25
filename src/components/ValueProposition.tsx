import React from 'react';
import { DollarSign, Scale, CheckCheck, Clock, Award, FileSpreadsheet } from 'lucide-react';

export const ValueProposition: React.FC = () => {
  const benefits = [
    {
      icon: <DollarSign className="w-5 h-5 text-nae-blue" />,
      title: "Tarifas Transparentes por CBM",
      sourceBadge: "CUBICAJE REAL",
      description: "Pagas únicamente por el volumen que ocupas ($USD/m³). Sin cobros sorpresa de almacenamiento ni gastos inflados en puerto.",
      highlight: "Hasta un 70% menos que flete aéreo"
    },
    {
      icon: <Scale className="w-5 h-5 text-nae-red" />,
      title: "Formalidad Tributaria Total (DIN)",
      sourceBadge: "100% LEGAL",
      description: "La Declaración de Ingreso y el Bill of Lading se emiten a nombre de tu empresa o RUT. Recuperas el 19% del IVA crédito fiscal y deduces gastos contables legítimos.",
      highlight: "Aprovecha arancel 0% TLC China"
    },
    {
      icon: <CheckCheck className="w-5 h-5 text-nae-blue" />,
      title: "Auditoría Previa de Proveedores",
      sourceBadge: "INSPECCIÓN",
      description: "Verificamos la existencia legal de fábricas en China, revisamos bultos al llegar a Ningbo y prevenimos envíos defectuosos o estafas.",
      highlight: "Inspección visual en origen"
    },
    {
      icon: <Clock className="w-5 h-5 text-nae-blue" />,
      title: "Zarpes Quincenales Programados",
      sourceBadge: "ITINERARIO FIJO",
      description: "Itinerarios de zarpe marítimo fijos con tiempos de tránsito marítimo de 28 a 35 días (puerto a puerto). Sabes con exactitud cuándo arriba tu carga.",
      highlight: "Certeza en tu reposición de stock"
    },
    {
      icon: <FileSpreadsheet className="w-5 h-5 text-nae-blue" />,
      title: "Cero Complicaciones Aduaneras",
      sourceBadge: "ADUANA INTEGRADA",
      description: "Nos encargamos del Visto Bueno, desconsolidación en terminal portuario, gestión de aranceles preferenciales TLC (Form F) y liberación expedita.",
      highlight: "Trámite aduanero 'Llave en Mano'"
    },
    {
      icon: <Award className="w-5 h-5 text-nae-red" />,
      title: "Sin Mínimos Excesivos",
      sourceBadge: "DESDE 0.5 CBM",
      description: "No necesitas comprar \$20.000 USD ni llenar los 68 metros cúbicos de un contenedor de 40 pies. Comienza a importar desde 0.5 CBM con tarifas corporativas.",
      highlight: "Ideal para PyMEs y Emprendedores"
    }
  ];

  return (
    <section id="beneficios" className="py-12 lg:py-16 bg-nae-bg border-b border-nae-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-[11px] font-bold uppercase tracking-widest text-nae-blue bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Seguridad & Respaldo
          </span>
          <h2 className="mt-2.5 text-2xl sm:text-3xl font-extrabold text-nae-dark tracking-tight">
            Ventajas Clave de Importar con Grupo Importa
          </h2>
          <p className="mt-1.5 text-slate-600 text-sm">
            Combinamos <strong>precios justos por metro cúbico</strong>, <strong>seguridad tributaria formal</strong> y <strong>atención directa</strong> por WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="bg-white border border-nae-border rounded-lg p-5 hover:border-nae-blue transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-md bg-slate-50 border border-nae-border flex items-center justify-center">
                    {b.icon}
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-nae-border">
                    {b.sourceBadge}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-nae-dark mb-1">
                  {b.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {b.description}
                </p>
              </div>

              <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-nae-blue">
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
