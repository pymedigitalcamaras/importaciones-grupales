import React, { useState } from 'react';
import { Calculator, ArrowRight, Info, AlertCircle, MessageCircle } from 'lucide-react';

interface CbmCalculatorProps {
  onApplyCbm: (cbm: string, details: string) => void;
}

export const CbmCalculator: React.FC<CbmCalculatorProps> = ({ onApplyCbm }) => {
  const [length, setLength] = useState<number>(50); // cm
  const [width, setWidth] = useState<number>(40);   // cm
  const [height, setHeight] = useState<number>(40);  // cm
  const [boxes, setBoxes] = useState<number>(10);
  const [weightPerBox, setWeightPerBox] = useState<number>(15); // kg

  // Calculations
  const boxVolumeM3 = (length / 100) * (width / 100) * (height / 100);
  const totalVolumeCbm = Number((boxVolumeM3 * boxes).toFixed(2));
  const totalWeightKg = boxes * weightPerBox;

  // 1 CBM = 500 kg rule (Industry standard)
  const volumetricWeightEquivalentCbm = Number((totalWeightKg / 500).toFixed(2));
  const billableCbm = Math.max(totalVolumeCbm, volumetricWeightEquivalentCbm, 0.5);
  const isWeightHeavy = volumetricWeightEquivalentCbm > totalVolumeCbm;

  let estimatedRatePerCbm = 320;
  if (billableCbm >= 5) estimatedRatePerCbm = 260;
  else if (billableCbm >= 3) estimatedRatePerCbm = 290;

  const estimatedFreightUsd = Math.round(billableCbm * estimatedRatePerCbm);
  const estimatedAirCostUsd = Math.round(totalWeightKg * 9);
  const savingsUsd = Math.max(0, estimatedAirCostUsd - estimatedFreightUsd);

  const handleApply = () => {
    const details = `${boxes} cajas (${length}x${width}x${height}cm), Peso total: ${totalWeightKg}kg`;
    onApplyCbm(billableCbm.toString(), details);
    const element = document.getElementById('cotizador');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whatsappQuoteUrl = `https://wa.me/56990117784?text=${encodeURIComponent(
    `Hola, coticé en la web: ${billableCbm} CBM (${boxes} cajas de ${length}x${width}x${height}cm, ${totalWeightKg}kg). ¿Cuál es la tarifa para el próximo zarpe?`
  )}`;

  return (
    <section id="calculadora" className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
            Herramienta Práctica
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Calculadora de Volumen (CBM) y Ahorro Logístico
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            En transporte marítimo LCL se cobra por metro cúbico ($CBM$). Ingresa las medidas de tus cajas y compara cuánto ahorras compartiendo contenedor.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Inputs Column */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-7 space-y-5">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-blue-600" />
              Dimensiones de tus Bultos / Cajas
            </h3>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Largo (cm)
                </label>
                <input
                  type="number"
                  min="1"
                  value={length}
                  onChange={(e) => setLength(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-semibold focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Ancho (cm)
                </label>
                <input
                  type="number"
                  min="1"
                  value={width}
                  onChange={(e) => setWidth(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-semibold focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Alto (cm)
                </label>
                <input
                  type="number"
                  min="1"
                  value={height}
                  onChange={(e) => setHeight(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-semibold focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Cantidad de Cajas
                </label>
                <input
                  type="number"
                  min="1"
                  value={boxes}
                  onChange={(e) => setBoxes(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-semibold focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Peso por Caja (kg)
                </label>
                <input
                  type="number"
                  min="0.1"
                  step="0.5"
                  value={weightPerBox}
                  onChange={(e) => setWeightPerBox(Math.max(0.1, Number(e.target.value)))}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-semibold focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Note on weight ratio */}
            <div className="p-3 rounded-lg bg-white border border-slate-200 text-xs text-slate-600 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                <Info className="w-4 h-4 text-blue-600" />
                <span>Regla Marítima Estándar: 1 m³ = 500 kg</span>
              </div>
              <p>
                Si el peso de la carga supera los 500 kg por cada metro cúbico, se factura el peso volumétrico equivalente.
              </p>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="lg:col-span-5 bg-white border border-slate-300 rounded-xl p-6 sm:p-7 space-y-5 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
              Resumen del Cubicaje
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                <span className="text-slate-600">Volumen Real:</span>
                <span className="font-bold text-slate-900">{totalVolumeCbm} CBM (m³)</span>
              </div>

              <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                <span className="text-slate-600">Peso Total Bruto:</span>
                <span className="font-bold text-slate-900">{totalWeightKg} kg</span>
              </div>

              <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                <span className="text-slate-600">Cubicaje Facturable:</span>
                <span className="font-extrabold text-blue-700 text-sm">{billableCbm} CBM</span>
              </div>
            </div>

            {isWeightHeavy && (
              <div className="p-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>Carga densa (+500kg/m³). Se calcula por peso equivalente.</span>
              </div>
            )}

            {/* Estimated freight */}
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex justify-between items-baseline">
                <span className="text-xs uppercase tracking-wider text-slate-600 font-semibold">Flete Grupal Estimado:</span>
                <span className="text-xl font-black text-slate-900">~${estimatedFreightUsd} USD</span>
              </div>
              <div className="text-[11px] text-slate-600 flex justify-between">
                <span>Vs. Courier Aéreo (~${estimatedAirCostUsd} USD):</span>
                <span className="text-emerald-700 font-bold">¡Ahorras ~${savingsUsd} USD!</span>
              </div>
            </div>

            <div className="space-y-2">
              <a
                href={whatsappQuoteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-lg font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs flex items-center justify-center gap-2 transition"
              >
                <MessageCircle className="w-4 h-4" />
                Enviar este cálculo a WhatsApp (+56 9 9011 7784)
              </a>

              <button
                onClick={handleApply}
                className="w-full py-2.5 rounded-lg font-semibold text-xs text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-300 flex items-center justify-center gap-1.5 transition"
              >
                Traspasar a Formulario Web
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
