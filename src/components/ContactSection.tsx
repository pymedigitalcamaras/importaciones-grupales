import React, { useState } from 'react';
import { Send, CheckCircle2, ShieldCheck, MessageCircle, Phone, Mail, Loader2, MapPin } from 'lucide-react';
import { submitContactLead } from '../lib/supabase';

interface ContactSectionProps {
  initialCbm?: string;
  initialDetails?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialCbm, initialDetails }) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [tipoProducto, setTipoProducto] = useState('');
  const [volumenCbm, setVolumenCbm] = useState(initialCbm || '');
  const [puertoOrigen, setPuertoOrigen] = useState('Ningbo');
  const [mensaje, setMensaje] = useState(initialDetails ? `Detalles: ${initialDetails}` : '');
  
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

  const phoneNumber = "+56 9 9011 7784";
  const whatsappUrl = "https://wa.me/56990117784?text=Hola,%20deseo%20contactarme%20para%20cotizar%20una%20importaci%C3%B3n%20grupal%20desde%20China";

  return (
    <section id="contacto" className="py-12 lg:py-16 bg-white border-b border-nae-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[11px] font-bold uppercase tracking-widest text-nae-blue bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Atención Directa
            </span>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold text-nae-dark tracking-tight leading-tight">
              Formulario de Contacto & Cotizaciones
            </h2>
            
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Escríbenos directamente o completa el formulario. Te responderemos con la cotización de flete marítimo, fechas del próximo zarpe y requisitos aduaneros.
            </p>

            {/* Direct Channel Cards (NAE Style) */}
            <div className="space-y-2.5 pt-1">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-between hover:bg-emerald-100 transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-md bg-emerald-600 text-white flex items-center justify-center shadow-2xs">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase text-emerald-800 block">WhatsApp Directo</span>
                    <span className="text-xs font-extrabold text-slate-900">{phoneNumber}</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700 group-hover:translate-x-0.5 transition-transform">
                  Chatear →
                </span>
              </a>

              <div className="p-3.5 rounded-lg bg-slate-50 border border-nae-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-md bg-nae-blue text-white flex items-center justify-center shadow-2xs">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase text-slate-500 block">Celular de Contacto</span>
                    <span className="text-xs font-extrabold text-slate-900 select-all">{phoneNumber}</span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-slate-500 bg-white px-2.5 py-1 rounded border border-slate-200 select-all">
                  Solo mensaje o WhatsApp
                </span>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-500 space-y-1">
              <p className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Despacho formal con Declaración de Ingreso (DIN) y B/L oficial.
              </p>
              <p className="flex items-center gap-1.5 font-medium">
                <MapPin className="w-4 h-4 text-nae-blue" />
                Bodegas operativas en Ningbo, Guangzhou e Yiwu (China).
              </p>
            </div>
          </div>

          {/* Right Column: Clean White Form */}
          <div className="lg:col-span-7 bg-nae-bg border border-nae-border rounded-lg p-5 sm:p-7 shadow-xs">
            {submittedId ? (
              <div className="text-center py-8 space-y-3 animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-nae-dark">
                  ¡Mensaje Enviado con Éxito!
                </h3>
                <p className="text-slate-600 text-xs max-w-md mx-auto">
                  Hemos registrado tu solicitud con el ticket <strong className="text-nae-blue font-mono">#{submittedId}</strong>. Nos comunicaremos contigo al teléfono indicado a la brevedad.
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
                    className="px-4 py-1.5 rounded-md text-xs font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 transition"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nombre y Apellido *
                    </label>
                    <input
                      type="text"
                      required
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      placeholder="Ej. Rodrigo Morales"
                      className="w-full bg-white border border-slate-300 rounded-md px-3 py-1.5 text-xs text-slate-900 focus:border-nae-blue focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nombre@empresa.cl"
                      className="w-full bg-white border border-slate-300 rounded-md px-3 py-1.5 text-xs text-slate-900 focus:border-nae-blue focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                      placeholder="+56 9 1234 5678"
                      className="w-full bg-white border border-slate-300 rounded-md px-3 py-1.5 text-xs text-slate-900 focus:border-nae-blue focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Empresa o RUT (Opcional)
                    </label>
                    <input
                      type="text"
                      value={empresa}
                      onChange={(e) => setEmpresa(e.target.value)}
                      placeholder="Empresa SpA"
                      className="w-full bg-white border border-slate-300 rounded-md px-3 py-1.5 text-xs text-slate-900 focus:border-nae-blue focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Volumen CBM
                    </label>
                    <input
                      type="text"
                      value={volumenCbm}
                      onChange={(e) => setVolumenCbm(e.target.value)}
                      placeholder="Ej. 2 CBM"
                      className="w-full bg-white border border-slate-300 rounded-md px-3 py-1.5 text-xs text-slate-900 focus:border-nae-blue focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Puerto en China
                    </label>
                    <select
                      value={puertoOrigen}
                      onChange={(e) => setPuertoOrigen(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-md px-2.5 py-1.5 text-xs text-slate-900 focus:border-nae-blue focus:outline-none"
                    >
                      <option value="Ningbo">Ningbo (Bodega propia)</option>
                      <option value="Guangzhou">Guangzhou (Bodega propia)</option>
                      <option value="Yiwu">Yiwu (Bazar / Accesorios)</option>
                      <option value="Shanghai">Shanghai</option>
                      <option value="Otro">Otro / No sé aún</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Tipo de Producto
                    </label>
                    <input
                      type="text"
                      value={tipoProducto}
                      onChange={(e) => setTipoProducto(e.target.value)}
                      placeholder="Ej. Ropa, Bazar, Repuestos"
                      className="w-full bg-white border border-slate-300 rounded-md px-3 py-1.5 text-xs text-slate-900 focus:border-nae-blue focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mensaje o Consulta *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    placeholder="Escribe tu consulta, enlaces de Alibaba o detalles de tu importación..."
                    className="w-full bg-white border border-slate-300 rounded-md px-3 py-1.5 text-xs text-slate-900 focus:border-nae-blue focus:outline-none"
                  />
                </div>

                {errorMessage && (
                  <p className="text-xs text-red-600 bg-red-50 border border-red-200 p-2 rounded">
                    {errorMessage}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-2.5 rounded-md font-bold text-xs bg-nae-blue hover:bg-nae-dark text-white shadow-xs flex items-center justify-center gap-1.5 transition disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Enviando Mensaje...
                    </>
                  ) : (
                    <>
                      Enviar Formulario de Contacto
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
