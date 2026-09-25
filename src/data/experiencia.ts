/**
 * ÚNICA fuente de copy y datos del sitio.
 *
 * Todo lo que se lee en la página sale de acá. Si Mariana quiere cambiar una
 * frase o un dato, se cambia en este archivo y en ningún otro.
 *
 * Regla: los datos del negocio salen de docs/brief.md. Si no están en el brief,
 * no existen — quedan como TODO. tests/unit/experiencia.test.ts lo verifica.
 */
import { deepFreeze } from "../lib/freeze";
import { WHATSAPP_PLACEHOLDER, type WhatsAppConfig } from "../lib/whatsapp";
import type { FotoId } from "./fotos";

export interface Foto {
  readonly id: FotoId;
  readonly alt: string;
}

export interface DatoFicha {
  readonly label: string;
  readonly valor: string;
}

export interface Paso {
  readonly texto: string;
  readonly foto: Foto;
}

export interface Caso {
  readonly nombre: string;
  readonly tipo: string;
  readonly porQue: string;
  /** TODO: falta confirmar de qué evento son las fotos (intent, preguntas 1 y 2). */
  readonly foto: Foto | null;
}

export interface Experiencia {
  readonly meta: { readonly titulo: string; readonly descripcion: string };
  readonly marca: string;
  readonly cta: string;
  readonly whatsapp: WhatsAppConfig;
  readonly instagram: string | null;
  readonly nav: readonly { readonly texto: string; readonly ancla: string }[];
  readonly hero: {
    readonly eyebrow: string;
    readonly titular: string;
    readonly bajada: string;
    readonly foto: Foto;
  };
  readonly ficha: readonly DatoFicha[];
  readonly incluye: { readonly si: string; readonly no: string };
  readonly como: { readonly titulo: string; readonly pasos: readonly Paso[] };
  readonly casos: {
    readonly titulo: string;
    /** Apagado hasta tener permiso de los dos clientes (brief §8). */
    readonly publicar: boolean;
    readonly items: readonly Caso[];
  };
  readonly mariana: {
    readonly titulo: string;
    /** TODO: tres frases en primera persona, con palabras de Mariana (brief §8). */
    readonly frases: readonly string[];
    readonly foto: Foto;
  };
  readonly cierre: { readonly texto: string; readonly foto: Foto };
}

export const experiencia: Experiencia = deepFreeze({
  meta: {
    titulo: "MÁS HATS — Experiencias a medida para hoteles, retiros y marcas",
    descripcion:
      "Dos horas, un sombrero diseñado y armado por cada participante, y todo el " +
      "material puesto por nosotras. Llevamos la experiencia completa a tu espacio, " +
      "en cualquier punto del país.",
  },

  marca: "MÁS HATS",

  cta: "Pedir propuesta",

  whatsapp: {
    // TODO: número de WhatsApp Business definitivo (brief §8). El build de
    // producción falla mientras siga siendo el placeholder.
    numero: WHATSAPP_PLACEHOLDER,
    mensaje:
      "Hola Mariana, quiero una propuesta de MÁS HATS para ____. " +
      "Seríamos ____ personas, la fecha tentativa es ____ y sería en ____.",
    // TODO: lo decide Mariana — agrega « · ref: hero» etc. al mensaje (spec §5).
    incluirRef: false,
  },

  // TODO: URL del Instagram de MÁS HATS.
  instagram: null,

  nav: [
    { texto: "Cómo funciona", ancla: "#como" },
    { texto: "Casos", ancla: "#casos" },
    { texto: "Mariana", ancla: "#mariana" },
  ],

  hero: {
    eyebrow: "Experiencias a medida para hoteles, retiros y marcas",
    titular: "Una actividad que se llevan puesta.",
    bajada:
      "Dos horas, un sombrero diseñado y armado por cada participante, y todo el " +
      "material puesto por nosotras. Llevamos la experiencia completa a tu espacio, " +
      "en cualquier punto del país.",
    foto: {
      id: "hero",
      alt: "Mesa larga al aire libre con un grupo de mujeres, todas con el sombrero que acaban de armar.",
    },
  },

  ficha: [
    { label: "Grupo", valor: "Desde 8" },
    { label: "Duración", valor: "2 a 2:30 h" },
    { label: "Dónde", valor: "Todo el país" },
    { label: "Anticipación", valor: "15 a 30 días" },
    { label: "Reserva", valor: "Seña 30%" },
    // Ver intent, pregunta 5: «Todo incluido» convive con el «No incluye».
    { label: "Material", valor: "Todo incluido" },
  ],

  incluye: {
    si: "Sombrero base por persona, todos los avíos, herramientas y la coordinación de la experiencia.",
    no: "Espacio, catering y fotografía. Fuera de Buenos Aires, traslado y estadía.",
  },

  como: {
    titulo: "Cómo funciona",
    pasos: [
      {
        texto: "Elegimos la fecha y la cantidad de personas.",
        foto: { id: "paso1", alt: "El grupo sentado a la mesa, al comenzar el encuentro." },
      },
      {
        texto: "Llegamos con sombreros, avíos y herramientas para todos.",
        foto: { id: "paso2", alt: "Mesa armada con sombreros de paja, flores blancas y cajas con avíos." },
      },
      {
        texto: "Cada participante diseña e interviene el suyo, con guía.",
        foto: { id: "paso3", alt: "Manos colocando plumas sobre un sombrero de paja." },
      },
      {
        texto: "Se lo lleva puesto.",
        foto: { id: "paso4", alt: "Una participante sonríe mientras se acomoda el sombrero terminado." },
      },
    ],
  },

  casos: {
    titulo: "Quiénes ya lo hicieron",
    publicar: false,
    items: [
      {
        nombre: "Chateau Nordelta",
        tipo: "Hotel",
        porQue: "La experiencia como propuesta propia para su público.",
        foto: null,
      },
      {
        nombre: "Conexión 2",
        tipo: "Retiro de mujeres · Mendoza",
        porQue: "Fuera de Buenos Aires y dentro de una agenda ajena.",
        foto: null,
      },
    ],
  },

  mariana: {
    titulo: "Mariana",
    frases: [],
    foto: { id: "mariana", alt: "Mariana, con camisa blanca y sombrero marrón, junto a la mesa de trabajo." },
  },

  cierre: {
    texto:
      "Desde 8 personas, en todo el país, con 15 días de anticipación. Contanos " +
      "cuántos son y cuándo, y te mandamos la propuesta.",
    foto: { id: "cierre", alt: "Sombrero de paja terminado junto a una caja de regalo." },
  },
});
