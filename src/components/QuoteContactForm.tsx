import React, { useState } from 'react';
import { Send, CheckCircle2, ShieldCheck, MessageSquare, Loader2, MessageCircle, Phone } from 'lucide-react';
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
    <section id="cotizador" className="py-14 lg:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Context & Direct Contact */}
          <div className="lg:col-span-5 space-y-5">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-700 bg-blue-100/70 px-3 py-1 rounded-full border border-blue-200">
              Atención Inmediata
            </span>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Cotiza tu Importación Grupal sin Compromiso
            </h2>
            
            <p className="text-slate-600 text-sm leading-relaxed">
              Completa los datos de tu carga o escríbenos directamente a WhatsApp. Te asesoramos con la tarifa por metro cúbico ($CBM$) y las fechas del próximo embarque.
            </p>

            {/* Direct Contact Box */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <span className="text-xs uppercase font-bold text-slate-400 block tracking-wider">
                Contacto Directo por Celular & WhatsApp:
              </span>
              <div className="flex flex-col sm:flex-row gap-2">
                <a
                  href="https://wa.me/56990117784?text=Hola,%20deseo%20cotizar%20una%20importaci%C3%B3n%20grupal%20desde%20China"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-lg font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-1.5 transition shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp: +56 9 9011 7784
                </a>
                <a
                  href="tel:+56990117784"
                  className="py-2.5 px-3 rounded-lg font-semibold text-xs text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 flex items-center justify-center gap-1.5 transition"
                >
                  <Phone className="w-4 h-4 text-slate-600" />
                  Llamar
                </a>
              </div>
            </div>

            <div className="space-y-3 pt-1">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Registro seguro en Panel Administrativo</h4>
                  <p className="text-[11px] text-slate-600">Tu solicitud se almacena de forma ordenada en la base de datos para atención oportuna.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Facturación formal a tu RUT o Empresa</h4>
                  <p className="text-[11px] text-slate-600">Emisión de DIN y B/L para deducir impuestos legalmente.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            {submittedId ? (
              <div className="text-center py-8 space-y-3 animate-fade-in">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  ¡Solicitud Registrada con Éxito!
                </h3>
                <p className="text-slate-600 text-xs max-w-md mx-auto">
                  Hemos guardado tu requerimiento en la base de datos con el ticket <strong className="text-blue-700 font-mono">#{submittedId}</strong>. Te contactaremos a la brevedad al teléfono indicado.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSubmittedId(null);
                      setNombre('');
                      setEmail('');
                      setTelefono('');
                      setMensaje('');
                    }}
                    className="px-5 py-2 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 transition"
                  >
                    Enviar otra cotización
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nombre y Apellido *
                    </label>
                    <input
                      type="text"
                      required
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      placeholder="Ej. Rodrigo Morales"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nombre@empresa.cl"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                      placeholder="+56 9 1234 5678"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Empresa o RUT (Opcional)
                    </label>
                    <input
                      type="text"
                      value={empresa}
                      onChange={(e) => setEmpresa(e.target.value)}
                      placeholder="Mi Empresa SpA"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Volumen CBM
                    </label>
                    <input
                      type="text"
                      value={volumenCbm}
                      onChange={(e) => setVolumenCbm(e.target.value)}
                      placeholder="Ej. 1.8 CBM"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Puerto en China
                    </label>
                    <select
                      value={puertoOrigen}
                      onChange={(e) => setPuertoOrigen(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-2 text-xs text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none"
                    >
                      <option value="Ningbo">Ningbo (Bodega Propia)</option>
                      <option value="Guangzhou">Guangzhou (Bodega Propia)</option>
                      <option value="Yiwu">Yiwu (Bazar / Accesorios)</option>
                      <option value="Shanghai">Shanghai</option>
                      <option value="Otro">Otro / No sé aún</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Tipo de Producto
                    </label>
                    <input
                      type="text"
                      value={tipoProducto}
                      onChange={(e) => setTipoProducto(e.target.value)}
                      placeholder="Ej. Ferretería, Hogar"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Detalles, Preguntas o Enlaces de Alibaba
                  </label>
                  <textarea
                    rows={3}
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    placeholder="Pega los links de Alibaba, dimensiones estimadas de cajas o cualquier duda..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                {errorMessage && (
                  <p className="text-xs text-red-600 bg-red-50 border border-red-200 p-2 rounded-lg">
                    {errorMessage}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-lg font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-xs flex items-center justify-center gap-2 transition disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Registrando en Base de Datos...
                    </>
                  ) : (
                    <>
                      Enviar Solicitud de Cotización
                      <Send className="w-3.5 h-3.5" />
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
