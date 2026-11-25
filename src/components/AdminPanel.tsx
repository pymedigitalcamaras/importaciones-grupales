import React, { useState, useEffect } from 'react';
import { X, Lock, RefreshCw, Trash2, Edit3, Plus, Mail, Clock, Eye, EyeOff, Save, MessageCircle } from 'lucide-react';
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
    await saveSlide({ ...slide, is_active: !slide.is_active });
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white border border-nae-border rounded-xl shadow-xl p-5 sm:p-7 my-8 text-left max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-nae-border">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-md bg-nae-blue text-white flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-nae-dark flex items-center gap-2">
                Panel de Administración
                <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                  Supabase DB Conectada
                </span>
              </h2>
              <p className="text-[11px] text-slate-500">
                Gestión de prospectos (leads) y control del Hero Slider
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PIN Authentication Gate */}
        {!isAuthenticated ? (
          <div className="py-10 flex flex-col items-center justify-center max-w-sm mx-auto text-center space-y-3">
            <div className="w-11 h-11 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600">
              <Lock className="w-5 h-5 text-nae-blue" />
            </div>
            <h3 className="text-sm font-bold text-nae-dark">Ingresa el PIN de Acceso</h3>
            <p className="text-xs text-slate-500">
              PIN por defecto: <code className="bg-slate-100 px-2 py-0.5 rounded text-nae-blue font-mono font-bold">1234</code>
            </p>

            <form onSubmit={handlePinSubmit} className="w-full space-y-2.5">
              <input
                type="password"
                maxLength={8}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Ingresa PIN"
                className="w-full text-center tracking-widest text-lg font-bold bg-white border border-slate-300 rounded-md px-3 py-2 text-slate-900 focus:border-nae-blue focus:outline-none"
              />
              {pinError && (
                <p className="text-xs text-red-600">PIN incorrecto. Intenta con 1234.</p>
              )}
              <button
                type="submit"
                className="w-full py-2 rounded-md font-bold text-xs bg-nae-blue hover:bg-nae-dark text-white shadow-xs transition"
              >
                Acceder al Panel
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-hidden pt-3">
            {/* Tabs Navigation */}
            <div className="flex items-center justify-between border-b border-nae-border pb-2.5">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setActiveTab('leads')}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition flex items-center gap-1.5 ${
                    activeTab === 'leads'
                      ? 'bg-nae-blue text-white'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Formularios de Contacto / Leads
                  <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-sky-900 text-white">
                    {leads.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('slider')}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition flex items-center gap-1.5 ${
                    activeTab === 'slider'
                      ? 'bg-nae-blue text-white'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Administrador del Slider
                  <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-slate-200 text-slate-700">
                    {slides.length}
                  </span>
                </button>
              </div>

              {activeTab === 'leads' && (
                <button
                  onClick={loadLeads}
                  disabled={loadingLeads}
                  className="px-2.5 py-1 rounded-md text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 flex items-center gap-1 transition"
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
                      tag: 'IMPORTACIONES · CHINA',
                      image_url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=2000&q=80',
                      cta_text: 'Cotizar por WhatsApp',
                      cta_link: 'https://wa.me/56990117784',
                      order_index: slides.length + 1,
                      is_active: true
                    });
                  }}
                  className="px-3 py-1 rounded-md text-xs font-bold bg-nae-blue hover:bg-nae-dark text-white flex items-center gap-1 transition shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Agregar Nuevo Slide
                </button>
              )}
            </div>

            {/* TAB 1: LEADS MANAGEMENT */}
            {activeTab === 'leads' && (
              <div className="flex-1 overflow-y-auto py-3 space-y-2.5">
                {/* Status Filter */}
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-500 font-semibold">Filtrar:</span>
                  {['all', 'Pendiente', 'Contactado', 'En Cotización', 'Cerrado'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setFilterStatus(st)}
                      className={`px-2 py-0.5 rounded text-xs font-medium transition ${
                        filterStatus === st
                          ? 'bg-blue-50 text-nae-blue border border-blue-200 font-bold'
                          : 'bg-white text-slate-600 border border-nae-border hover:bg-slate-50'
                      }`}
                    >
                      {st === 'all' ? 'Todos' : st}
                    </button>
                  ))}
                </div>

                {leads.length === 0 ? (
                  <div className="text-center py-8 text-slate-400 text-xs">
                    No hay solicitudes registradas aún.
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {leads
                      .filter((l) => (filterStatus === 'all' ? true : l.estado === filterStatus))
                      .map((lead) => (
                        <div
                          key={lead.id}
                          className="p-3.5 rounded-lg bg-slate-50 border border-nae-border transition space-y-2"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-xs font-bold text-nae-dark">{lead.nombre}</h4>
                                {lead.empresa && (
                                  <span className="text-[10px] text-slate-600 bg-white px-1.5 py-0.5 rounded border border-nae-border">
                                    {lead.empresa}
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] text-slate-500 flex items-center gap-1 font-mono">
                                <Clock className="w-3 h-3" />
                                {new Date(lead.created_at).toLocaleString()}
                              </span>
                            </div>

                            {/* Status changer */}
                            <div className="flex items-center gap-1.5">
                              <span className="text-[11px] text-slate-600">Estado:</span>
                              <select
                                value={lead.estado}
                                onChange={(e) => handleStatusChange(lead.id, e.target.value as any)}
                                className="bg-white border border-slate-300 text-xs rounded px-2 py-0.5 font-bold text-slate-800 focus:outline-none focus:border-nae-blue"
                              >
                                <option value="Pendiente">🟡 Pendiente</option>
                                <option value="Contactado">🔵 Contactado</option>
                                <option value="En Cotización">🟣 En Cotización</option>
                                <option value="Cerrado">🟢 Cerrado</option>
                              </select>
                            </div>
                          </div>

                          {/* Contact Info */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                            <div>
                              <span className="text-slate-400 block text-[10px] uppercase font-bold">Contacto:</span>
                              <div className="space-y-0.5 mt-0.5">
                                <a
                                  href={`mailto:${lead.email}`}
                                  className="text-nae-blue hover:underline flex items-center gap-1 font-medium"
                                >
                                  <Mail className="w-3 h-3" /> {lead.email}
                                </a>
                                <a
                                  href={`https://wa.me/${lead.telefono.replace(/\D/g, '')}?text=Hola%20${encodeURIComponent(lead.nombre)},%20te%20contacto%20de%20Grupo%20Importa%20por%20tu%20mensaje`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-emerald-700 hover:underline flex items-center gap-1 font-bold"
                                >
                                  <MessageCircle className="w-3 h-3 text-emerald-600" /> {lead.telefono}
                                </a>
                              </div>
                            </div>

                            <div>
                              <span className="text-slate-400 block text-[10px] uppercase font-bold">Carga:</span>
                              <p className="text-slate-700 mt-0.5">
                                <strong>Volumen:</strong> {lead.volumen_cbm || 'No indicado'} | <strong>Puerto:</strong> {lead.puerto_origen || 'Ningbo'}
                              </p>
                              <p className="text-slate-700">
                                <strong>Producto:</strong> {lead.tipo_producto || 'Sin especificar'}
                              </p>
                            </div>

                            <div>
                              <span className="text-slate-400 block text-[10px] uppercase font-bold">Mensaje:</span>
                              <p className="text-slate-700 mt-0.5 line-clamp-2 bg-white p-1.5 rounded border border-nae-border text-[11px]">
                                {lead.mensaje || 'Sin notas.'}
                              </p>
                            </div>
                          </div>

                          {/* Notes */}
                          <div className="pt-1.5 border-t border-slate-200 flex items-center gap-2">
                            <span className="text-[10px] uppercase font-bold text-slate-400">Notas:</span>
                            <input
                              type="text"
                              defaultValue={lead.notas_admin || ''}
                              onBlur={(e) => handleNotesChange(lead.id, e.target.value)}
                              placeholder="Escribe notas y sal del campo..."
                              className="flex-1 bg-white border border-nae-border rounded px-2 py-0.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-nae-blue"
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
              <div className="flex-1 overflow-y-auto py-3 space-y-2.5">
                {editingSlide ? (
                  <form onSubmit={handleSaveSlideForm} className="bg-slate-50 p-4 rounded-lg border border-nae-border space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <h4 className="text-xs font-bold text-nae-dark">
                        {isAddingNew ? 'Crear Nuevo Slide' : `Editar Slide #${editingSlide.id}`}
                      </h4>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingSlide(null);
                          setIsAddingNew(false);
                        }}
                        className="text-xs text-slate-500 hover:text-slate-800"
                      >
                        Cancelar
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Título Principal *
                        </label>
                        <input
                          type="text"
                          required
                          value={editingSlide.title || ''}
                          onChange={(e) => setEditingSlide({ ...editingSlide, title: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded px-2.5 py-1 text-xs text-slate-900 focus:border-nae-blue focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Eyebrow / Mensaje Superior
                        </label>
                        <input
                          type="text"
                          value={editingSlide.tag || ''}
                          onChange={(e) => setEditingSlide({ ...editingSlide, tag: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded px-2.5 py-1 text-xs text-slate-900 focus:border-nae-blue focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Subtítulo / Mensaje descriptivo *
                      </label>
                      <textarea
                        rows={2}
                        required
                        value={editingSlide.subtitle || ''}
                        onChange={(e) => setEditingSlide({ ...editingSlide, subtitle: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded px-2.5 py-1 text-xs text-slate-900 focus:border-nae-blue focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        URL de la Imagen (Luz natural / Sin destellos) *
                      </label>
                      <input
                        type="text"
                        required
                        value={editingSlide.image_url || ''}
                        onChange={(e) => setEditingSlide({ ...editingSlide, image_url: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded px-2.5 py-1 text-xs text-slate-900 focus:border-nae-blue focus:outline-none font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Texto del Botón
                        </label>
                        <input
                          type="text"
                          value={editingSlide.cta_text || 'Cotizar por WhatsApp'}
                          onChange={(e) => setEditingSlide({ ...editingSlide, cta_text: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded px-2.5 py-1 text-xs text-slate-900 focus:border-nae-blue focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Enlace del Botón
                        </label>
                        <input
                          type="text"
                          value={editingSlide.cta_link || 'https://wa.me/56990117784'}
                          onChange={(e) => setEditingSlide({ ...editingSlide, cta_link: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded px-2.5 py-1 text-xs text-slate-900 focus:border-nae-blue focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingSlide(null);
                          setIsAddingNew(false);
                        }}
                        className="px-3 py-1 rounded text-xs font-semibold text-slate-600 hover:bg-slate-200"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        disabled={savingSlide}
                        className="px-3.5 py-1 rounded text-xs font-bold bg-nae-blue hover:bg-nae-dark text-white flex items-center gap-1 shadow-xs"
                      >
                        <Save className="w-3.5 h-3.5" />
                        {savingSlide ? 'Guardando...' : 'Guardar Slide'}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 gap-2.5">
                    {slides.map((s) => (
                      <div
                        key={s.id}
                        className={`p-3 rounded-lg bg-slate-50 border flex flex-col sm:flex-row items-center gap-3 justify-between transition ${
                          s.is_active ? 'border-nae-border' : 'border-slate-200/50 opacity-60'
                        }`}
                      >
                        <div className="w-full sm:w-24 h-14 rounded overflow-hidden bg-slate-200 border border-slate-300 flex-shrink-0">
                          <img
                            src={s.image_url}
                            alt={s.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-nae-blue">
                            {s.tag || 'SLIDE'}
                          </span>
                          <h4 className="text-xs font-bold text-nae-dark truncate">{s.title}</h4>
                          <p className="text-[11px] text-slate-500 line-clamp-1">{s.subtitle}</p>
                        </div>

                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <button
                            onClick={() => handleToggleSlideActive(s)}
                            className={`p-1.5 rounded border text-xs transition ${
                              s.is_active
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                                : 'bg-slate-200 text-slate-500 border-slate-300'
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
                            className="p-1.5 rounded bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 transition"
                            title="Editar Slide"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleDeleteSlide(s.id)}
                            className="p-1.5 rounded bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition"
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
        <div className="pt-2.5 border-t border-nae-border flex justify-between items-center text-xs text-slate-500">
          <span>Persistencia en Supabase DB</span>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-md text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
          >
            Cerrar Panel
          </button>
        </div>
      </div>
    </div>
  );
};
