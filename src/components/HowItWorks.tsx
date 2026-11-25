import React from 'react';
import { Warehouse, CheckSquare, Layers, FileCheck, Truck, ChevronDown } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: "01",
      icon: <Warehouse className="w-5 h-5 text-nae-blue" />,
      title: "Recepción en Bodega China",
      description: "Tus proveedores de Alibaba, 1688 o fábricas envían tus bultos a nuestras bodegas en Ningbo, Guangzhou o Yiwu. Puedes juntar múltiples compras.",
      tag: "ORIGEN"
    },
    {
      step: "02",
      icon: <CheckSquare className="w-5 h-5 text-nae-blue" />,
      title: "Inspección & Cubicaje",
      description: "Verificamos estado exterior de cajas, etiquetado internacional y medimos el volumen exacto (CBM) y peso para facturarte de forma 100% justa.",
      tag: "CONTROL"
    },
    {
      step: "03",
      icon: <Layers className="w-5 h-5 text-nae-blue" />,
      title: "Consolidación en Contenedor",
      description: "Agrupamos tu mercancía con otros importadores certificados. Pagas únicamente por el espacio (m³) que ocupan tus productos en el contenedor.",
      tag: "FLETE LCL"
    },
    {
      step: "04",
      icon: <FileCheck className="w-5 h-5 text-nae-red" />,
      title: "Desaduanaje con DIN Propia",
      description: "Nuestro agente de aduanas nacionaliza la carga. La Declaración de Ingreso (DIN) queda a tu nombre para deducir IVA y aplicar arancel 0% TLC.",
      tag: "100% LEGAL"
    },
    {
      step: "05",
      icon: <Truck className="w-5 h-5 text-nae-blue" />,
      title: "Despacho a tu Puerta",
      description: "Retiras en nuestra bodega central o coordinamos flete terrestre seguro hasta tus instalaciones comerciales en todo el país.",
      tag: "ENTREGA"
    }
  ];

  return (
    <section id="como-funciona" className="pt-20 sm:pt-28 pb-16 lg:pb-24 bg-white border-b border-nae-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-nae-blue border border-nae-border mb-2">
            <ChevronDown className="w-3.5 h-3.5" />
            Flujo Logístico Paso a Paso
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-extrabold text-nae-dark tracking-tight">
            ¿Cómo Funciona el Contenedor Compartido?
          </h2>
          
          <p className="mt-1.5 max-w-2xl text-slate-600 text-sm leading-relaxed">
            Eliminamos la complejidad del comercio exterior. Tú eliges qué comprar en China y nosotros gestionamos el flete marítimo, bodegaje y desaduanamiento.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="bg-nae-bg border border-nae-border rounded-lg p-5 hover:border-nae-blue transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-md bg-white border border-nae-border flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-lg font-black text-slate-300">
                    {item.step}
                  </span>
                </div>

                <div className="mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-nae-blue bg-blue-50 px-2 py-0.5 rounded">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-nae-dark mb-1">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick info bar */}
        <div className="mt-8 p-4 rounded-lg bg-slate-50 border border-nae-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-slate-700">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>¿Comprando a varios proveedores? <strong>Los agrupamos gratis en nuestra bodega en China</strong> antes de consolidar.</span>
          </div>
          <a
            href="https://wa.me/56990117784?text=Hola,%20tengo%20compras%20en%20China%20y%20quiero%20consolidarlas%20en%20un%20contenedor"
            target="_blank"
            rel="noopener noreferrer"
            className="text-nae-blue hover:text-nae-dark font-bold underline underline-offset-4 whitespace-nowrap"
          >
            Consultar por WhatsApp (+56 9 9011 7784) →
          </a>
        </div>
      </div>
    </section>
  );
};
