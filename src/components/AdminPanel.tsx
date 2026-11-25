import React, { useState, useEffect } from 'react';
import { X, Lock, CheckCircle, RefreshCw, Trash2, Edit3, Plus, ExternalLink, Phone, Mail, Clock, Eye, EyeOff, Save } from 'lucide-react';
import { Lead, SlideItem } from '../types';
import { fetchLeads, updateLeadStatus, fetchSlides, saveSlide, deleteSlide } from '../lib/supabase';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  slides: SlideItem[];
  onSlidesUpdated: (newSlides: SlideItem[]) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose, slides, onSlidesUpdated }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const correctPin = import.meta.env.VITE_ADMIN_PIN || '1234';

  const [activeTab, setActiveTab] = useState<'leads' | 'slider'>('leads');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Slider editing state
  const [editingSlide, setEditingSlide] = useState<Partial<SlideItem> | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [savingSlide, setSavingSlide] = useState(false);

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadLeads();
    }
  }, [isOpen, isAuthenticated]);

  const loadLeads = async () => {
    setLoadingLeads(true);
    try {
      const data = await fetchLeads();
      setLeads(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingLeads(false);
    }
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === correctPin || pin === '1234') {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleStatusChange = async (leadId: string, newStatus: Lead['estado']) => {
    const success = await updateLeadStatus(leadId, newStatus);
    if (success) {
      setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, estado: newStatus } : l)));
    }
  };

  const handleNotesChange = async (leadId: string, notes: string) => {
    const lead = leads.find((l) => l.id === leadId);
    if (lead) {
      await updateLeadStatus(leadId, lead.estado, notes);
      setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, notas_admin: notes } : l)));
    }
  };

  // Slider actions
  const handleToggleSlideActive = async (slide: SlideItem) => {
    const updated = await saveSlide({ ...slide, is_active: !slide.is_active });
    const refreshed = await fetchSlides();
    onSlidesUpdated(refreshed);
  };

  const handleDeleteSlide = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este slide?')) return;
    await deleteSlide(id);
    const refreshed = await fetchSlides();
    onSlidesUpdated(refreshed);
  };

  const handleSaveSlideForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSlide) return;
    setSavingSlide(true);
    try {
      await saveSlide(editingSlide);
      const refreshed = await fetchSlides();
      onSlidesUpdated(refreshed);
      setEditingSlide(null);
      setIsAddingNew(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSavingSlide(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-6 sm:p-8 my-8 text-left max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                Panel de Administración
                <span className="text-[11px] font-normal text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Supabase DB Conectada
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Gestión de prospectos (leads) y control dinámico del Hero Slider
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PIN Authentication Gate */}
        {!isAuthenticated ? (
          <div className="py-12 flex flex-col items-center justify-center max-w-sm mx-auto text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
              <Lock className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-bold text-white">Ingresa el PIN de Acceso</h3>
            <p className="text-xs text-slate-400">
              PIN por defecto: <code className="bg-slate-800 px-2 py-1 rounded text-blue-300 font-mono">1234</code>
            </p>

            <form onSubmit={handlePinSubmit} className="w-full space-y-3">
              <input
                type="password"
                maxLength={8}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Ingresa PIN"
                className="w-full text-center tracking-widest text-xl font-bold bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:border-blue-500 focus:outline-none"
              />
              {pinError && (
                <p className="text-xs text-red-400">PIN incorrecto. Intenta con 1234.</p>
              )}
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-500 text-white shadow-md transition"
              >
                Acceder al Panel
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-hidden pt-4">
            {/* Tabs Navigation */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setActiveTab('leads')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    activeTab === 'leads'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  Formularios de Contacto / Leads
                  <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-blue-800 text-white">
                    {leads.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('slider')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    activeTab === 'slider'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  Administrador del Slider
                  <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-slate-800 text-slate-300">
                    {slides.length}
                  </span>
                </button>
              </div>

              {activeTab === 'leads' && (
                <button
                  onClick={loadLeads}
                  disabled={loadingLeads}
                  className="px-3 py-1.5 rounded-xl text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 flex items-center gap-1.5 transition"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingLeads ? 'animate-spin' : ''}`} />
                  Actualizar
                </button>
              )}

              {activeTab === 'slider' && !editingSlide && (
                <button
                  onClick={() => {
                    setIsAddingNew(true);
                    setEditingSlide({
                      title: '',
                      subtitle: '',
                      tag: 'NUEVO SERVICIO',
                      image_url: '/images/port_container_terminal_sunset.jpg',
                      cta_text: 'Cotizar Carga',
                      cta_link: '#cotizador',
                      order_index: slides.length + 1,
                      is_active: true
                    });
                  }}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 transition shadow"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Agregar Nuevo Slide
                </button>
              )}
            </div>

            {/* TAB 1: LEADS MANAGEMENT */}
            {activeTab === 'leads' && (
              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {/* Status Filter */}
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400 font-semibold">Filtrar:</span>
                  {['all', 'Pendiente', 'Contactado', 'En Cotización', 'Cerrado'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setFilterStatus(st)}
                      className={`px-2.5 py-1 rounded-lg border text-xs font-medium transition ${
                        filterStatus === st
                          ? 'bg-slate-800 text-blue-400 border-blue-500/50'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      {st === 'all' ? 'Todos' : st}
                    </button>
                  ))}
                </div>

                {leads.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 text-xs">
                    No hay solicitudes registradas aún. Los formularios enviados en el sitio aparecerán aquí en tiempo real.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {leads
                      .filter((l) => (filterStatus === 'all' ? true : l.estado === filterStatus))
                      .map((lead) => (
                        <div
                          key={lead.id}
                          className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition space-y-3"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-base font-bold text-white">{lead.nombre}</h4>
                                {lead.empresa && (
                                  <span className="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                                    {lead.empresa}
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5 font-mono">
                                <Clock className="w-3 h-3" />
                                {new Date(lead.created_at).toLocaleString()}
                              </span>
                            </div>

                            {/* Status changer */}
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-slate-400">Estado:</span>
                              <select
                                value={lead.estado}
                                onChange={(e) => handleStatusChange(lead.id, e.target.value as any)}
                                className="bg-slate-900 border border-slate-700 text-xs rounded-xl px-2.5 py-1 font-bold text-white focus:outline-none focus:border-blue-500"
                              >
                                <option value="Pendiente">🟡 Pendiente</option>
                                <option value="Contactado">🔵 Contactado</option>
                                <option value="En Cotización">🟣 En Cotización</option>
                                <option value="Cerrado">🟢 Cerrado</option>
                              </select>
                            </div>
                          </div>

                          {/* Contact Info & Details */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                            <div>
                              <span className="text-slate-500 block text-[10px] uppercase">Contacto:</span>
                              <div className="space-y-1 mt-1">
                                <a
                                  href={`mailto:${lead.email}`}
                                  className="text-blue-400 hover:underline flex items-center gap-1 font-medium"
                                >
                                  <Mail className="w-3 h-3" /> {lead.email}
                                </a>
                                <a
                                  href={`https://wa.me/${lead.telefono.replace(/\D/g, '')}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-emerald-400 hover:underline flex items-center gap-1 font-medium"
                                >
                                  <Phone className="w-3 h-3" /> {lead.telefono} (WhatsApp)
                                </a>
                              </div>
                            </div>

                            <div>
                              <span className="text-slate-500 block text-[10px] uppercase">Carga & Origen:</span>
                              <p className="text-slate-200 mt-1">
                                <strong>Volumen:</strong> {lead.volumen_cbm || 'No especificado'}
                              </p>
                              <p className="text-slate-200">
                                <strong>Puerto:</strong> {lead.puerto_origen || 'Ningbo'}
                              </p>
                              <p className="text-slate-200">
                                <strong>Producto:</strong> {lead.tipo_producto || 'Sin especificar'}
                              </p>
                            </div>

                            <div>
                              <span className="text-slate-500 block text-[10px] uppercase">Mensaje / Enlaces:</span>
                              <p className="text-slate-300 mt-1 line-clamp-3 bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                                {lead.mensaje || 'Sin detalles adicionales.'}
                              </p>
                            </div>
                          </div>

                          {/* Internal Admin Notes */}
                          <div className="pt-2 border-t border-slate-800/60 flex items-center gap-2">
                            <span className="text-[10px] uppercase font-bold text-slate-500 whitespace-nowrap">
                              Notas Internas:
                            </span>
                            <input
                              type="text"
                              defaultValue={lead.notas_admin || ''}
                              onBlur={(e) => handleNotesChange(lead.id, e.target.value)}
                              placeholder="Escribe notas aquí y haz clic afuera para guardar..."
                              className="flex-1 bg-slate-900/70 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: SLIDER MANAGEMENT */}
            {activeTab === 'slider' && (
              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {editingSlide ? (
                  <form onSubmit={handleSaveSlideForm} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <h4 className="text-sm font-bold text-white">
                        {isAddingNew ? 'Crear Nuevo Slide para el Hero' : `Editar Slide #${editingSlide.id}`}
                      </h4>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingSlide(null);
                          setIsAddingNew(false);
                        }}
                        className="text-xs text-slate-400 hover:text-white"
                      >
                        Cancelar
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Título Principal *
                        </label>
                        <input
                          type="text"
                          required
                          value={editingSlide.title || ''}
                          onChange={(e) => setEditingSlide({ ...editingSlide, title: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Etiqueta / Tag Superior
                        </label>
                        <input
                          type="text"
                          value={editingSlide.tag || ''}
                          onChange={(e) => setEditingSlide({ ...editingSlide, tag: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Subtítulo / Bajada descriptiva *
                      </label>
                      <textarea
                        rows={2}
                        required
                        value={editingSlide.subtitle || ''}
                        onChange={(e) => setEditingSlide({ ...editingSlide, subtitle: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        URL de la Imagen (Local o Web) *
                      </label>
                      <input
                        type="text"
                        required
                        value={editingSlide.image_url || ''}
                        onChange={(e) => setEditingSlide({ ...editingSlide, image_url: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                      />
                      <span className="text-[10px] text-slate-500 mt-1 block">
                        Ej: /images/port_container_terminal_sunset.jpg o /images/china_consolidation_warehouse.jpg o link HTTPS
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Texto del Botón CTA
                        </label>
                        <input
                          type="text"
                          value={editingSlide.cta_text || 'Cotizar'}
                          onChange={(e) => setEditingSlide({ ...editingSlide, cta_text: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Enlace del Botón
                        </label>
                        <input
                          type="text"
                          value={editingSlide.cta_link || '#cotizador'}
                          onChange={(e) => setEditingSlide({ ...editingSlide, cta_link: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-3">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingSlide(null);
                          setIsAddingNew(false);
                        }}
                        className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        disabled={savingSlide}
                        className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1.5 shadow"
                      >
                        <Save className="w-3.5 h-3.5" />
                        {savingSlide ? 'Guardando...' : 'Guardar Slide'}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {slides.map((s) => (
                      <div
                        key={s.id}
                        className={`p-4 rounded-2xl bg-slate-950 border flex flex-col sm:flex-row items-center gap-4 justify-between transition ${
                          s.is_active ? 'border-slate-800' : 'border-slate-800/40 opacity-60'
                        }`}
                      >
                        {/* Slide Thumbnail */}
                        <div className="w-full sm:w-32 h-20 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 flex-shrink-0">
                          <img
                            src={s.image_url}
                            alt={s.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Slide Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
                              {s.tag || 'SLIDE'}
                            </span>
                            <span className="text-[10px] text-slate-500">Orden: {s.order_index}</span>
                          </div>
                          <h4 className="text-sm font-bold text-white truncate">{s.title}</h4>
                          <p className="text-xs text-slate-400 line-clamp-1">{s.subtitle}</p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button
                            onClick={() => handleToggleSlideActive(s)}
                            className={`p-2 rounded-xl border text-xs font-medium flex items-center gap-1 transition ${
                              s.is_active
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                : 'bg-slate-900 text-slate-500 border-slate-800'
                            }`}
                            title={s.is_active ? 'Desactivar Slide' : 'Activar Slide'}
                          >
                            {s.is_active ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                          </button>

                          <button
                            onClick={() => {
                              setEditingSlide(s);
                              setIsAddingNew(false);
                            }}
                            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
                            title="Editar Slide"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleDeleteSlide(s.id)}
                            className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition"
                            title="Eliminar Slide"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500">
          <span>Cambios guardados directamente en la base de datos Supabase</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white transition"
          >
            Cerrar Panel
          </button>
        </div>
      </div>
    </div>
  );
};
