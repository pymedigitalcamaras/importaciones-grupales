import React, { useState } from 'react';
import { Calculator, ArrowRight, Info, CheckCircle2, AlertCircle } from 'lucide-react';

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

  // 1 CBM = 500 kg rule (Industry standard: WS Cargo & Komex)
  const volumetricWeightEquivalentCbm = Number((totalWeightKg / 500).toFixed(2));
  const billableCbm = Math.max(totalVolumeCbm, volumetricWeightEquivalentCbm, 0.5);
  const isWeightHeavy = volumetricWeightEquivalentCbm > totalVolumeCbm;

  // Estimated indicative rates in USD (for illustration)
  // 1-2 CBM: ~$320/CBM, 3-5 CBM: ~$290/CBM, >5 CBM: ~$260/CBM
  let estimatedRatePerCbm = 320;
  if (billableCbm >= 5) estimatedRatePerCbm = 260;
  else if (billableCbm >= 3) estimatedRatePerCbm = 290;

  const estimatedFreightUsd = Math.round(billableCbm * estimatedRatePerCbm);
  // Air comparison (~$9 USD/kg courier)
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

  return (
    <section id="calculadora" className="py-16 bg-slate-900/50 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Herramienta Interactiva
          </span>
          <h2 className="mt-3 text-3xl font-black text-white tracking-tight">
            Calculadora de Volumen (CBM) y Ahorro Logístico
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            En transporte marítimo LCL se cobra por metro cúbico ($CBM$). Ingresa las medidas de tus cajas y compara cuánto ahorras compartiendo contenedor.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Inputs Column */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-blue-400" />
              Dimensiones de tus Bultos / Cajas
            </h3>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Largo (cm)
                </label>
                <input
                  type="number"
                  min="1"
                  value={length}
                  onChange={(e) => setLength(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Ancho (cm)
                </label>
                <input
                  type="number"
                  min="1"
                  value={width}
                  onChange={(e) => setWidth(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Alto (cm)
                </label>
                <input
                  type="number"
                  min="1"
                  value={height}
                  onChange={(e) => setHeight(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Cantidad de Cajas
                </label>
                <input
                  type="number"
                  min="1"
                  value={boxes}
                  onChange={(e) => setBoxes(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Peso por Caja (kg)
                </label>
                <input
                  type="number"
                  min="0.1"
                  step="0.5"
                  value={weightPerBox}
                  onChange={(e) => setWeightPerBox(Math.max(0.1, Number(e.target.value)))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Note on weight ratio */}
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5 font-medium text-slate-300">
                <Info className="w-4 h-4 text-blue-400" />
                <span>Regla Estándar de la Industria Marítima: 1 m³ = 500 kg</span>
              </div>
              <p>
                Si el peso de la mercancía supera los 500 kg por cada m³, se factura el equivalente en peso volumétrico según las prácticas de navieras y forwarders.
              </p>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 border border-blue-500/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl shadow-blue-950/20">
            <h3 className="text-lg font-bold text-white">
              Resumen del Embarque
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-slate-800 text-sm">
                <span className="text-slate-400">Volumen Real:</span>
                <span className="font-bold text-white">{totalVolumeCbm} CBM (m³)</span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-slate-800 text-sm">
                <span className="text-slate-400">Peso Total Bruto:</span>
                <span className="font-bold text-white">{totalWeightKg} kg</span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-slate-800 text-sm">
                <span className="text-slate-400">Cubicaje Facturable:</span>
                <span className="font-extrabold text-blue-400 text-base">{billableCbm} CBM</span>
              </div>
            </div>

            {isWeightHeavy && (
              <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>Tu carga es densa (supera 500kg/m³). Se calcula por peso equivalente.</span>
              </div>
            )}

            {/* Estimated freight */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Flete Grupal Estimado:</span>
                <span className="text-2xl font-black text-emerald-400">~${estimatedFreightUsd} USD</span>
              </div>
              <div className="text-[11px] text-slate-400 flex justify-between">
                <span>Vs. Courier Aéreo (~${estimatedAirCostUsd} USD):</span>
                <span className="text-emerald-400 font-bold">¡Ahorras ~${savingsUsd} USD!</span>
              </div>
            </div>

            <button
              onClick={handleApply}
              className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition transform active:scale-95"
            >
              Usar este Cubicaje en Cotización
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
