import React from 'react';
import { Warehouse, CheckSquare, Layers, FileCheck, Truck, ChevronDown } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: "01",
      icon: <Warehouse className="w-5 h-5 text-blue-600" />,
      title: "Recepción en Bodega China",
      description: "Tus proveedores de Alibaba, 1688 o fábricas envían tus bultos a nuestras bodegas en Ningbo, Guangzhou o Yiwu. Puedes juntar múltiples compras.",
      tag: "Origen"
    },
    {
      step: "02",
      icon: <CheckSquare className="w-5 h-5 text-emerald-600" />,
      title: "Inspección & Cubicaje",
      description: "Verificamos estado exterior de cajas, etiquetado internacional y medimos el volumen exacto (CBM) y peso para facturarte de forma 100% justa.",
      tag: "Control Calidad"
    },
    {
      step: "03",
      icon: <Layers className="w-5 h-5 text-blue-600" />,
      title: "Consolidación en Contenedor",
      description: "Agrupamos tu mercancía con otros importadores certificados. Pagas únicamente por el espacio (m³) que ocupan tus productos en el contenedor.",
      tag: "Flete LCL"
    },
    {
      step: "04",
      icon: <FileCheck className="w-5 h-5 text-amber-600" />,
      title: "Desaduanaje con DIN Propia",
      description: "Nuestro agente de aduanas nacionaliza la carga. La Declaración de Ingreso (DIN) queda a tu nombre para deducir IVA y aplicar arancel 0% TLC.",
      tag: "100% Legal"
    },
    {
      step: "05",
      icon: <Truck className="w-5 h-5 text-indigo-600" />,
      title: "Despacho a tu Puerta",
      description: "Retiras en nuestra bodega central o coordinamos flete terrestre seguro hasta tus instalaciones comerciales en todo el país.",
      tag: "Entrega Final"
    }
  ];

  return (
    <section id="como-funciona" className="py-12 lg:py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 mb-2.5">
            <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
            Flujo Logístico Paso a Paso
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            ¿Cómo Funciona el Contenedor Compartido?
          </h2>
          
          <p className="mt-2 max-w-2xl text-slate-600 text-sm leading-relaxed">
            Eliminamos la complejidad del comercio exterior. Tú eliges qué producto comprar en China y nosotros gestionamos todo el trayecto marítimo y aduanero.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-50/80 border border-slate-200 rounded-xl p-5 hover:border-blue-400 hover:bg-white hover:shadow-sm transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 shadow-2xs flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-xl font-black text-slate-400">
                    {item.step}
                  </span>
                </div>

                <div className="mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 mb-1.5">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick summary box */}
        <div className="mt-8 p-4 rounded-xl bg-blue-50/60 border border-blue-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-slate-700">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>¿Comprando a varios proveedores? <strong>Los agrupamos gratis en nuestra bodega en China</strong> antes de consolidar.</span>
          </div>
          <a
            href="https://wa.me/56990117784?text=Hola,%20tengo%20compras%20en%20China%20y%20quiero%20consolidarlas%20en%20un%20contenedor"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 font-bold underline underline-offset-4 whitespace-nowrap"
          >
            Consultar por WhatsApp (+56 9 9011 7784) →
          </a>
        </div>
      </div>
    </section>
  );
};
