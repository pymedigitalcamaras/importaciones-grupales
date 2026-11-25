import { createClient } from '@supabase/supabase-js';
import { Lead, SlideItem } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://qkjcncwdrsrsddqtottx.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_ddHAG4qrHbySeEYvE8VlKQ_ZShpsZgM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 4 NAE-style daylight slides
export const defaultSlides: SlideItem[] = [
  {
    id: 1,
    title: "GRUPO IMPORTA — La primera plataforma de importaciones grupales y contenedor compartido desde China.",
    subtitle: "Consolida tus compras de múltiples fábricas en origen, comparte flete marítimo LCL y accede a tarifas mayoristas sin importar tu volumen.",
    tag: "SOMOS ESPECIALISTAS · CHINA",
    image_url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2000&q=80",
    cta_text: "Conoce la plataforma",
    cta_link: "#como-funciona",
    order_index: 1,
    is_active: true
  },
  {
    id: 2,
    title: "Bodegas propias en Ningbo y Guangzhou para consolidar y cuidar tu carga.",
    subtitle: "No pagues fletes individuales caros. Agrupamos tus compras de Alibaba, 1688 o fábricas chinas en un solo embarque seguro y ordenado.",
    tag: "CONSOLIDACIÓN INTELIGENTE · ORIGEN",
    image_url: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=2000&q=80",
    cta_text: "Calculadora de Cubicaje",
    cta_link: "#calculadora",
    order_index: 2,
    is_active: true
  },
  {
    id: 3,
    title: "Importa 100% legal: Declaración de Ingreso (DIN) y B/L a nombre de tu empresa.",
    subtitle: "Aprovecha el arancel 0% del Tratado de Libre Comercio con Certificado de Origen Form F y recupera el 19% del IVA crédito fiscal.",
    tag: "SEGURIDAD TRIBUTARIA · DIN & B/L",
    image_url: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=2000&q=80",
    cta_text: "Ver Próximos Zarpes",
    cta_link: "#zarpes",
    order_index: 3,
    is_active: true
  },
  {
    id: 4,
    title: "Desde las fábricas de China hasta la puerta de tu negocio en todo Chile.",
    subtitle: "Inspección de bultos en origen, tránsito marítimo programado, desaduanaje profesional y despacho directo sin intermediarios informales.",
    tag: "LOGÍSTICA INTEGRAL · PUERTA A PUERTA",
    image_url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=80",
    cta_text: "Cotizar mi Carga",
    cta_link: "#contacto",
    order_index: 4,
    is_active: true
  }
];

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
      image_url: slide.image_url || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2000&q=80',
      cta_text: slide.cta_text || 'Conoce la plataforma',
      cta_link: slide.cta_link || '#como-funciona',
      order_index: current.length + 1,
      is_active: true
    };
    updated = [...current, newSlide];
  }
  localStorage.setItem('local_slider_items', JSON.stringify(updated));
  return updated.find(s => s.id === slide.id) || updated[updated.length - 1];
}

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

  const stored = JSON.parse(localStorage.getItem('local_leads') || '[]');
  const updated = stored.map((l: Lead) => l.id === id ? { ...l, estado, notas_admin: notas_admin ?? l.notas_admin } : l);
  localStorage.setItem('local_leads', JSON.stringify(updated));
  return true;
}
