export interface Lead {
  id: string;
  created_at: string;
  nombre: string;
  email: string;
  telefono: string;
  empresa?: string;
  tipo_producto?: string;
  volumen_cbm?: string;
  puerto_origen?: string;
  mensaje: string;
  estado: 'Pendiente' | 'Contactado' | 'En Cotización' | 'Cerrado';
  notas_admin?: string;
}

export interface SlideItem {
  id: number;
  created_at?: string;
  title: string;
  subtitle: string;
  tag?: string;
  image_url: string;
  cta_text: string;
  cta_link: string;
  order_index: number;
  is_active: boolean;
}

export interface CompetitorAnalysis {
  name: string;
  url: string;
  country: string;
  strengths: string[];
  pricingModel: string;
  extractedBestPractice: string;
  appliedSection: string;
}
