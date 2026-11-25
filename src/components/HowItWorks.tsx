import React from 'react';
import { Warehouse, CheckSquare, Layers, FileCheck, Truck, ChevronDown } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: "01",
      icon: <Warehouse className="w-6 h-6 text-blue-400" />,
      title: "Recepción en Bodega China",
      description: "Tus proveedores de Alibaba, 1688 o fábricas envían tus bultos a nuestras bodegas en Ningbo, Guangzhou o Yiwu. Puedes juntar múltiples compras.",
      tag: "Origen"
    },
    {
      step: "02",
      icon: <CheckSquare className="w-6 h-6 text-emerald-400" />,
      title: "Inspección & Cubicaje",
      description: "Verificamos estado exterior de cajas, etiquetado internacional y medimos el volumen exacto (CBM) y peso para facturarte de forma 100% justa.",
      tag: "Control Calidad"
    },
    {
      step: "03",
      icon: <Layers className="w-6 h-6 text-indigo-400" />,
      title: "Consolidación en Contenedor",
      description: "Agrupamos tu mercancía con otros importadores certificados. Pagas únicamente por el espacio (m³) que ocupan tus productos en el contenedor.",
      tag: "Flete LCL"
    },
    {
      step: "04",
      icon: <FileCheck className="w-6 h-6 text-amber-400" />,
      title: "Desaduanaje con DIN Propia",
      description: "Nuestro agente de aduanas nacionaliza la carga. La Declaración de Ingreso (DIN) queda a tu nombre para deducir IVA y aplicar arancel 0% TLC.",
      tag: "100% Legal"
    },
    {
      step: "05",
      icon: <Truck className="w-6 h-6 text-cyan-400" />,
      title: "Despacho a tu Puerta",
      description: "Retiras en nuestra bodega central o coordinamos flete terrestre seguro hasta tus instalaciones comerciales en todo el país.",
      tag: "Entrega Final"
    }
  ];

  return (
    <section id="como-funciona" className="relative py-12 lg:py-20 bg-slate-900 border-b border-slate-800">
      {/* Visual Header Peek Connector (Visible above the fold on desktop) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-12">
          {/* Scroll down peek badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-3">
            <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
            Flujo Logístico Paso a Paso
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            ¿Cómo Funciona el Contenedor Compartido?
          </h2>
          
          <p className="mt-3 max-w-2xl text-slate-400 text-sm sm:text-base leading-relaxed">
            Eliminamos la complejidad del comercio exterior. Tú eliges qué producto comprar en China y nosotros nos encargamos de todo el trayecto marítimo y aduanero.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="relative bg-slate-950/70 border border-slate-800/80 rounded-2xl p-5 hover:border-blue-500/50 hover:bg-slate-900/90 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700/60 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-2xl font-black text-slate-700 group-hover:text-blue-500 transition-colors">
                    {item.step}
                  </span>
                </div>

                <div className="mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2 group-hover:text-blue-200 transition">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Connecting line on desktop */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-0.5 bg-slate-800" />
              )}
            </div>
          ))}
        </div>

        {/* Quick summary box */}
        <div className="mt-10 p-4 rounded-xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-indigo-950/40 border border-blue-900/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-slate-300">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span>¿Comprando a varios proveedores? <strong>Los agrupamos gratis en nuestra bodega en China</strong> antes de consolidar.</span>
          </div>
          <a
            href="#calculadora"
            className="text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-4 whitespace-nowrap"
          >
            Calcular mi cubicaje (CBM) →
          </a>
        </div>
      </div>
    </section>
  );
};
