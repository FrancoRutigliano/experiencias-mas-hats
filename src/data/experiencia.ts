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
import type { WhatsAppConfig } from "../lib/whatsapp";
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

export interface Beneficio {
  readonly titulo: string;
  readonly texto: string;
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
  readonly email: string;
  readonly nav: readonly { readonly texto: string; readonly ancla: string }[];
  /** Etiquetas de interfaz (no son copy de marketing). */
  readonly ui: { readonly menu: string; readonly cerrar: string };
  readonly hero: {
    readonly eyebrow: string;
    readonly titular: string;
    readonly bajada: string;
    readonly foto: Foto;
  };
  readonly fichaTitulo: string;
  readonly ficha: readonly DatoFicha[];
  readonly incluye: {
    readonly labelSi: string;
    readonly si: string;
    readonly labelNo: string;
    readonly no: string;
  };
  /** Aprobado 2026-09-25 (brief §5). */
  readonly idea: {
    readonly label: string;
    readonly titulo: string;
    readonly parrafo: string;
    readonly beneficiosTitulo: string;
    readonly beneficios: readonly Beneficio[];
    readonly foto: Foto;
  };
  readonly como: { readonly titulo: string; readonly pasos: readonly Paso[] };
  readonly casos: {
    readonly titulo: string;
    /** Apagado hasta tener permiso de los dos clientes (brief §8). */
    readonly publicar: boolean;
    readonly items: readonly Caso[];
  };
  readonly mariana: {
    readonly titulo: string;
    readonly profesion: string;
    readonly trayectoria: string;
    /** TODO: tres frases en primera persona, con palabras de Mariana (brief §8). */
    readonly frases: readonly string[];
    readonly foto: Foto;
  };
  /** El texto de cierre del brief §5, partido: la primera frase es el H2. */
  readonly cierre: { readonly titulo: string; readonly bajada: string; readonly foto: Foto };
}

export const experiencia: Experiencia = deepFreeze({
  meta: {
    titulo: "MÁS HATS — Experiencias a medida para empresas",
    descripcion:
      "Dos horas, un sombrero diseñado y armado por cada participante, y todo el " +
      "material puesto por nosotras. Llevamos la experiencia completa a tu espacio, " +
      "en cualquier punto del país.",
  },

  marca: "MÁS HATS",

  cta: "Pedir propuesta",

  whatsapp: {
    // WhatsApp Business de MÁS HATS: 11 6575-5523 en formato wa.me.
    numero: "5491165755523",
    mensaje:
      "Hola Mariana, quiero una propuesta de MÁS HATS para ____. " +
      "Seríamos ____ personas, la fecha tentativa es ____ y sería en ____.",
    // TODO: lo decide Mariana — agrega « · ref: hero» etc. al mensaje (spec §5).
    incluirRef: false,
  },

  // Es el de la marca; Mariana no tiene uno aparte (2026-09-25).
  instagram: "https://www.instagram.com/mas.hats",

  email: "info@mashats.com",

  nav: [
    { texto: "Cómo funciona", ancla: "#como" },
    { texto: "Casos", ancla: "#casos" },
    { texto: "Mariana", ancla: "#mariana" },
  ],

  ui: { menu: "Menú", cerrar: "Cerrar" },

  hero: {
    eyebrow: "Experiencias a medida para empresas",
    titular: "Un sombrero que dice quién sos.",
    bajada:
      "Dos horas, un sombrero diseñado y armado por cada participante, y todo el " +
      "material puesto por nosotras. Llevamos la experiencia completa a tu espacio, " +
      "en cualquier punto del país.",
    foto: {
      id: "hero",
      alt: "Mesa larga al aire libre con un grupo de mujeres, todas con el sombrero que acaban de armar.",
    },
  },

  fichaTitulo: "Ficha técnica",

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
    labelSi: "Incluye:",
    si: "Sombrero base por persona, todos los avíos, herramientas y la coordinación de la experiencia.",
    labelNo: "No incluye:",
    no: "Espacio, catering y fotografía. Fuera de Buenos Aires, traslado y estadía.",
  },

  idea: {
    label: "La idea",
    titulo: "Un sombrero no cambia quién sos. Lo muestra.",
    parrafo:
      "Es el accesorio que más dice de quien lo usa, y por eso a tantas mujeres " +
      "les cuesta ponérselo. En MÁS HATS cada participante diseña el suyo hasta " +
      "que la represente, y se anima a usarlo.",
    beneficiosTitulo: "Para tu empresa",
    beneficios: [
      {
        titulo: "Un encuentro que se recuerda.",
        texto: "De una cata no queda nada. De acá, un sombrero propio y una foto que se comparte.",
      },
      {
        titulo: "Un grupo que se conecta.",
        texto: "Diseñar en la misma mesa abre conversaciones que un evento formal no abre.",
      },
      {
        titulo: "Respaldo profesional.",
        texto: "Coordina Mariana, psicóloga: sabe qué pasa en un grupo cuando alguien se anima a mostrarse.",
      },
    ],
    foto: {
      id: "idea",
      alt: "Manos que sostienen un sombrero de paja terminado, con cinta bordada y una medalla, sobre la mesa de trabajo.",
    },
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
        texto: "Cada participante se va con su sombrero.",
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
    profesion: "Psicóloga",
    trayectoria: "Más de 7 años al frente de MÁS HATS, como emprendedora y empresaria.",
    frases: [],
    foto: { id: "mariana", alt: "Mariana, con camisa blanca y sombrero marrón, junto a la mesa de trabajo." },
  },

  cierre: {
    titulo: "Desde 8 personas, en todo el país, con 15 días de anticipación.",
    bajada: "Contanos cuántos son y cuándo, y te mandamos la propuesta.",
    foto: { id: "cierre", alt: "Sombrero de paja terminado junto a un estuche de anteojos de sol." },
  },
});
