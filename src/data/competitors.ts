import { CompetitorAnalysis } from '../types';

export const competitorsData: CompetitorAnalysis[] = [
  {
    name: "WS Cargo",
    url: "https://wscargo.cl/importaciones-grupales-china-chile",
    country: "Chile / China",
    strengths: [
      "Tarificación transparente escalonada basada en Metro Cúbico (CBM).",
      "Bodegas propias de consolidación en Ningbo, Guangzhou e Yiwu.",
      "Regla de peso volumétrico estandarizada (1 m³ = hasta 500 kg de peso máximo).",
      "Reducción de barrera de entrada para microempresas y pymes sin importar contenedor completo.",
      "Canal de soporte y asesoría constante para cálculo de cubicaje previo a la compra."
    ],
    pricingModel: "Tarifa en USD por metro cúbico ($USD/CBM$) escalonada por volumen (1 a 3 m³, 3 a 5 m³, >5 m³), con cobro mínimo de 1 CBM.",
    extractedBestPractice: "Tomamos la estructura del calculador de cubicaje volumétrico CBM y la regla de 500 kg/m³, además del flujo explicativo de consolidación multi-proveedor desde Alibaba/Yiwu.",
    appliedSection: "Hero Slider, Sección 'Calculadora de CBM y Costos' y Sección 'Cómo Funciona (Paso 1 y 2)'."
  },
  {
    name: "Komex (Servicio Konsolidado)",
    url: "https://komexchile.cl/konsolidado",
    country: "Chile / Internacional",
    strengths: [
      "Enfoque en formalidad tributaria y legal: la importación se tramita a nombre del cliente con B/L y Declaración de Ingreso (DIN).",
      "Uso de crédito fiscal: permite a la empresa deducir el IVA (19%) y arancel aduanero 0% con el Certificado de Origen TLC China.",
      "Desglose explícito de costos: flete internacional + desconsolidación portuaria + honorarios de agente de aduana.",
      "Protección contra sobrecostos portuarios imprevistos (THC y almacenajes prorrateados equitativamente)."
    ],
    pricingModel: "Costo fijo por CBM + IVA, sumando gastos de despacho aduanero y nacionalización formal en destino.",
    extractedBestPractice: "Tomamos la promesa de valor de Formalidad Legal & Beneficio Tributario (DIN y B/L a nombre de la empresa para recuperación de IVA), eliminando el miedo a comprar en 'informalidad'.",
    appliedSection: "Sección 'Beneficios & Propuesta de Valor' y Módulo de 'Garantía Tributaria'."
  },
  {
    name: "Contenedor Compartido & Kangtai Logística",
    url: "https://contenedorcompartido.com / https://kangtai.cl",
    country: "Latinoamérica / China",
    strengths: [
      "Calendario público de zarpes marítimos mensuales y quincenales, brindando certidumbre de plazos a los importadores.",
      "Servicio de validación previa de proveedores y auditoría de calidad básica en bodega de origen para evitar estafas en Alibaba/Made-in-China.",
      "Seguimiento visual del estado del contenedor desde el cierre en puerto chino hasta el atraque en puerto de destino.",
      "Comunidad activa de compradores que permite llenar contenedores más rápido y cumplir los itinerarios puntualmente."
    ],
    pricingModel: "Reserva de espacio por CBM con fecha de corte de recepción (Closing Date) y fecha estimada de arribo (ETA 60-75 días).",
    extractedBestPractice: "Tomamos el 'Calendario de Próximos Zarpes' con fechas de corte y cupo restante, además de la verificación de proveedores en China antes de embarcar.",
    appliedSection: "Sección 'Próximos Zarpes Programados' y 'Garantía de Auditoría de Proveedores'."
  }
];

export const bibliographySources = [
  {
    title: "WS Cargo - Servicio de Importaciones Grupales y Contenedor Compartido",
    url: "https://wscargo.cl",
    description: "Referencia para el modelo operativo de bodegas en Ningbo/Guangzhou, tarificación por metro cúbico (CBM) y relación peso/volumen (500 kg = 1 m³)."
  },
  {
    title: "Komex Chile - Konsolidado LCL y Agenciamiento de Aduana",
    url: "https://komexchile.cl",
    description: "Referencia para la formalización aduanera, emisión de Declaración de Ingreso (DIN), aprovechamiento de ventajas arancelarias del Tratado de Libre Comercio y recuperación del IVA crédito fiscal."
  },
  {
    title: "Contenedor Compartido & Kangtai Logistics - Grupajes y Calendarios de Zarpe",
    url: "https://contenedorcompartido.com",
    description: "Referencia para el sistema de calendarización de zarpes periódicos, fechas límites de recepción en origen (closing dates) e inspección previa en fábrica."
  },
  {
    title: "Servicio Nacional de Aduanas - Guía Oficial de Importaciones y Despacho LCL",
    url: "https://www.aduana.cl",
    description: "Referencia regulatoria de documentos requeridos (B/L marítimo, factura comercial, packing list, certificado de origen) para importaciones legales."
  }
];
