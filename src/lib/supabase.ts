import { createClient } from '@supabase/supabase-js';
import { Lead, SlideItem } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://qkjcncwdrsrsddqtottx.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_ddHAG4qrHbySeEYvE8VlKQ_ZShpsZgM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Fallback initial slides if network or table is empty
export const defaultSlides: SlideItem[] = [
  {
    id: 1,
    title: "Importaciones Grupales desde China",
    subtitle: "Comparte contenedor marítimo (LCL), reduce costos logísticos hasta un 70% y accede a tarifas mayoristas sin importar tu volumen.",
    tag: "LOGÍSTICA COLABORATIVA",
    image_url: "/images/port_container_terminal_sunset.jpg",
    cta_text: "Cotizar mi Carga",
    cta_link: "#cotizador",
    order_index: 1,
    is_active: true
  },
  {
    id: 2,
    title: "Bodegas de Consolidación en Ningbo y Guangzhou",
    subtitle: "Recibimos compras de múltiples proveedores de Alibaba, inspeccionamos calidad y unificamos todo en un solo embarque.",
    tag: "CONSOLIDACIÓN INTELIGENTE",
    image_url: "/images/china_consolidation_warehouse.jpg",
    cta_text: "Ver Cómo Funciona",
    cta_link: "#como-funciona",
    order_index: 2,
    is_active: true
  },
  {
    id: 3,
    title: "Despacho Aduanero y Formalidad Tributaria",
    subtitle: "Importa 100% legal a nombre de tu empresa: Declaración de Ingreso (DIN), Bill of Lading (B/L) y uso de crédito fiscal.",
    tag: "SEGURIDAD & FORMALIDAD",
    image_url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2000&q=80",
    cta_text: "Próximos Zarpes",
    cta_link: "#zarpes",
    order_index: 3,
    is_active: true
  }
];

// Helper to fetch slides
export async function fetchSlides(): Promise<SlideItem[]> {
  try {
    const { data, error } = await supabase
      .from('slider_items')
      .select('*')
      .order('order_index', { ascending: true });

    if (error || !data || data.length === 0) {
      const stored = localStorage.getItem('local_slider_items');
      return stored ? JSON.parse(stored) : defaultSlides;
    }
    return data;
  } catch (err) {
    console.warn("Supabase fetchSlides error, using fallback:", err);
    const stored = localStorage.getItem('local_slider_items');
    return stored ? JSON.parse(stored) : defaultSlides;
  }
}

// Helper to save/update slide
export async function saveSlide(slide: Partial<SlideItem>): Promise<SlideItem> {
  try {
    if (slide.id) {
      const { data, error } = await supabase
        .from('slider_items')
        .update(slide)
        .eq('id', slide.id)
        .select()
        .single();
      if (!error && data) return data;
    } else {
      const { data, error } = await supabase
        .from('slider_items')
        .insert([slide])
        .select()
        .single();
      if (!error && data) return data;
    }
  } catch (err) {
    console.warn("Supabase saveSlide error, saving to localStorage:", err);
  }

  // Local fallback
  const current = await fetchSlides();
  let updated: SlideItem[];
  if (slide.id) {
    updated = current.map(s => s.id === slide.id ? { ...s, ...slide } as SlideItem : s);
  } else {
    const newSlide: SlideItem = {
      id: Date.now(),
      title: slide.title || 'Nuevo Slide',
      subtitle: slide.subtitle || '',
      tag: slide.tag || 'DESTACADO',
      image_url: slide.image_url || '/images/port_container_terminal_sunset.jpg',
      cta_text: slide.cta_text || 'Cotizar',
      cta_link: slide.cta_link || '#cotizador',
      order_index: current.length + 1,
      is_active: true
    };
    updated = [...current, newSlide];
  }
  localStorage.setItem('local_slider_items', JSON.stringify(updated));
  return updated.find(s => s.id === slide.id) || updated[updated.length - 1];
}

// Helper to delete slide
export async function deleteSlide(id: number): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('slider_items')
      .delete()
      .eq('id', id);
    if (!error) return true;
  } catch (err) {
    console.warn("Supabase deleteSlide error:", err);
  }
  const current = await fetchSlides();
  const updated = current.filter(s => s.id !== id);
  localStorage.setItem('local_slider_items', JSON.stringify(updated));
  return true;
}

// Helper to submit lead
export async function submitContactLead(leadData: Omit<Lead, 'id' | 'created_at' | 'estado'>): Promise<{ success: boolean; leadId?: string; error?: string }> {
  const payload = {
    ...leadData,
    estado: 'Pendiente'
  };

  try {
    const { data, error } = await supabase
      .from('contact_leads')
      .insert([payload])
      .select('id')
      .single();

    if (error) {
      console.warn("Supabase insert lead error:", error);
      throw error;
    }
    return { success: true, leadId: data?.id };
  } catch (err: any) {
    console.warn("Storing lead in local storage fallback:", err);
    const localLeads = JSON.parse(localStorage.getItem('local_leads') || '[]');
    const newLead: Lead = {
      id: 'local-' + Date.now(),
      created_at: new Date().toISOString(),
      ...payload,
      estado: 'Pendiente'
    };
    localLeads.unshift(newLead);
    localStorage.setItem('local_leads', JSON.stringify(localLeads));
    return { success: true, leadId: newLead.id };
  }
}

// Helper to fetch leads for admin
export async function fetchLeads(): Promise<Lead[]> {
  try {
    const { data, error } = await supabase
      .from('contact_leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      return data;
    }
  } catch (err) {
    console.warn("Error fetching Supabase leads:", err);
  }
  const stored = localStorage.getItem('local_leads');
  return stored ? JSON.parse(stored) : [];
}

// Helper to update lead status
export async function updateLeadStatus(id: string, estado: Lead['estado'], notas_admin?: string): Promise<boolean> {
  try {
    const updatePayload: any = { estado };
    if (notas_admin !== undefined) updatePayload.notas_admin = notas_admin;

    const { error } = await supabase
      .from('contact_leads')
      .update(updatePayload)
      .eq('id', id);

    if (!error) return true;
  } catch (err) {
    console.warn("Error updating Supabase lead:", err);
  }

  // Local fallback
  const stored = JSON.parse(localStorage.getItem('local_leads') || '[]');
  const updated = stored.map((l: Lead) => l.id === id ? { ...l, estado, notas_admin: notas_admin ?? l.notas_admin } : l);
  localStorage.setItem('local_leads', JSON.stringify(updated));
  return true;
}
