import React, { useState } from 'react';
import { Send, CheckCircle2, ShieldCheck, HelpCircle, Loader2, MessageSquare } from 'lucide-react';
import { submitContactLead } from '../lib/supabase';

interface QuoteContactFormProps {
  initialCbm?: string;
  initialDetails?: string;
}

export const QuoteContactForm: React.FC<QuoteContactFormProps> = ({ initialCbm, initialDetails }) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [tipoProducto, setTipoProducto] = useState('');
  const [volumenCbm, setVolumenCbm] = useState(initialCbm || '');
  const [puertoOrigen, setPuertoOrigen] = useState('Ningbo');
  const [mensaje, setMensaje] = useState(initialDetails ? `Detalles calculados: ${initialDetails}` : '');
  
  const [submitting, setSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // If initialCbm updates from calculator
  React.useEffect(() => {
    if (initialCbm) setVolumenCbm(initialCbm);
    if (initialDetails) {
      setMensaje((prev) => prev ? `${prev}\n${initialDetails}` : initialDetails);
    }
  }, [initialCbm, initialDetails]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await submitContactLead({
        nombre,
        email,
        telefono,
        empresa,
        tipo_producto: tipoProducto,
        volumen_cbm: volumenCbm,
        puerto_origen: puertoOrigen,
        mensaje
      });

      if (res.success) {
        setSubmittedId(res.leadId || 'REG-' + Date.now().toString().slice(-4));
      } else {
        setErrorMessage(res.error || 'Ocurrió un error al enviar el formulario.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Error de conexión.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="cotizador" className="py-16 lg:py-24 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Context & Guarantees */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-500 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
              Atención Personalizada
            </span>
            
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Cotiza tu Importación Grupal sin Compromiso
            </h2>
            
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Completa los datos de tu carga y un ejecutivo especialista en comercio exterior te contactará en menos de 2 horas con la tarifa detallada por metro cúbico ($CBM$) y las fechas del próximo zarpe.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Registro directo en nuestro Panel Administrativo</h4>
                  <p className="text-xs text-slate-400">Tu solicitud se almacena de forma segura en nuestra base de datos para seguimiento y trazabilidad continua.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Facturación 100% formal para tu empresa</h4>
                  <p className="text-xs text-slate-400">Te asesoramos para emitir la DIN y B/L a tu nombre y aprovechar todas las ventajas del TLC Chile-China.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Soporte directo por WhatsApp y Correo</h4>
                  <p className="text-xs text-slate-400">Resolvemos tus dudas sobre proveedores de Alibaba, cubicaje y requisitos aduaneros.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-blue-950/20">
            {submittedId ? (
              <div className="text-center py-10 space-y-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-white">
                  ¡Solicitud Registrada con Éxito!
                </h3>
                <p className="text-slate-300 text-sm max-w-md mx-auto">
                  Hemos guardado tu requerimiento en la base de datos con el ticket de seguimiento <strong className="text-blue-400 font-mono">#{submittedId}</strong>. Nuestro equipo de operaciones te contactará a la brevedad.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmittedId(null);
                      setNombre('');
                      setEmail('');
                      setTelefono('');
                      setMensaje('');
                    }}
                    className="px-6 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
                  >
                    Enviar otra cotización
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Nombre y Apellido *
                    </label>
                    <input
                      type="text"
                      required
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      placeholder="Ej. Rodrigo Morales"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nombre@empresa.cl"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                      placeholder="+56 9 1234 5678"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Empresa o RUT (Opcional)
                    </label>
                    <input
                      type="text"
                      value={empresa}
                      onChange={(e) => setEmpresa(e.target.value)}
                      placeholder="Importaciones SpA"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-1">
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Volumen CBM
                    </label>
                    <input
                      type="text"
                      value={volumenCbm}
                      onChange={(e) => setVolumenCbm(e.target.value)}
                      placeholder="Ej. 1.8 CBM"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-1">
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Puerto en China
                    </label>
                    <select
                      value={puertoOrigen}
                      onChange={(e) => setPuertoOrigen(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none"
                    >
                      <option value="Ningbo">Ningbo (Bodega Propia)</option>
                      <option value="Guangzhou">Guangzhou (Bodega Propia)</option>
                      <option value="Yiwu">Yiwu (Bazar / Accesorios)</option>
                      <option value="Shanghai">Shanghai</option>
                      <option value="Otro">Otro / No sé aún</option>
                    </select>
                  </div>

                  <div className="sm:col-span-1">
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Tipo de Producto
                    </label>
                    <input
                      type="text"
                      value={tipoProducto}
                      onChange={(e) => setTipoProducto(e.target.value)}
                      placeholder="Ej. Herramientas, Ropa"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Detalles, Preguntas o Enlaces de Alibaba
                  </label>
                  <textarea
                    rows={3}
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    placeholder="Pega aquí los links de tus proveedores en China, dimensiones estimadas o cualquier consulta específica..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                {errorMessage && (
                  <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 p-2.5 rounded-xl">
                    {errorMessage}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Registrando en Base de Datos...
                    </>
                  ) : (
                    <>
                      Enviar Solicitud de Cotización
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
