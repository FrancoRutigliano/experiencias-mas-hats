/**
 * ÚNICA fuente de copy y datos del sitio.
 *
 * Todo lo que se lee en la página sale de acá. Si Marian quiere cambiar una
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

export interface Enlace {
  readonly texto: string;
  readonly ancla: string;
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
  readonly foto: Foto | null;
}

export interface Experiencia {
  readonly meta: { readonly titulo: string; readonly descripcion: string };
  readonly marca: string;
  readonly cta: string;
  readonly whatsapp: WhatsAppConfig;
  readonly instagram: string | null;
  readonly email: string;
  readonly nav: readonly Enlace[];
  /** Paradas de la tijera lateral (desktop): todas las secciones, en orden. */
  readonly recorrido: readonly Enlace[];
  /** Etiquetas de interfaz (no son copy de marketing). */
  readonly ui: { readonly menu: string; readonly cerrar: string; readonly pausarGaleria: string };
  readonly hero: {
    readonly eyebrow: string;
    readonly titular: string;
    readonly bajada: string;
    readonly foto: Foto;
  };
  /** Palabras de la franja en movimiento (decorativa, entre ficha e idea). */
  readonly franja: readonly string[];
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
  /** Propuesta 2026-09-25: galería deslizable, sin caras en primer plano. */
  readonly galeria: { readonly label: string; readonly titulo: string; readonly fotos: readonly Foto[] };
  readonly casos: {
    readonly titulo: string;
    /** Interruptor del bloque: si se apaga, también sale del menú. */
    readonly publicar: boolean;
    readonly items: readonly Caso[];
  };
  readonly mariana: {
    readonly titulo: string;
    readonly profesion: string;
    readonly trayectoria: string;
    /** Tres frases en primera persona, con palabras de Marian. */
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
      "Hola Marian, quiero una propuesta de MÁS HATS para ____. " +
      "Seríamos ____ personas, la fecha tentativa es ____ y sería en ____.",
    // TODO: lo decide Marian — agrega « · ref: hero» etc. al mensaje (spec §5).
    incluirRef: false,
  },

  // Es el de la marca; Marian no tiene uno aparte (2026-09-25).
  instagram: "https://www.instagram.com/mas.hats",

  email: "info@mashats.com",

  nav: [
    { texto: "La idea", ancla: "#idea" },
    { texto: "Cómo funciona", ancla: "#como" },
    { texto: "Casos", ancla: "#casos" },
    { texto: "Marian", ancla: "#mariana" },
  ],

  recorrido: [
    { texto: "Ficha técnica", ancla: "#ficha" },
    { texto: "La idea", ancla: "#idea" },
    { texto: "Cómo funciona", ancla: "#como" },
    { texto: "Galería", ancla: "#galeria" },
    { texto: "Casos", ancla: "#casos" },
    { texto: "Marian", ancla: "#mariana" },
    { texto: "Reservar", ancla: "#cierre" },
  ],

  ui: { menu: "Menú", cerrar: "Cerrar", pausarGaleria: "Pausar galería" },

  hero: {
    eyebrow: "Experiencias a medida para empresas",
    titular: "Un sombrero que dice quién sos.",
    bajada:
      "Dos horas, un sombrero diseñado y armado por cada participante, y todo el " +
      "material puesto por nosotras. Llevamos la experiencia completa a tu espacio, " +
      "en cualquier punto del país.",
    foto: {
      id: "hero",
      alt: "Grupo de mujeres bajo una arcada, cada una con el sombrero que diseñó.",
    },
  },

  franja: ["Encuentro", "Diseño", "Actitud", "Más"],

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
      "Más que un taller creativo, es un espacio de encuentro, conversación y " +
      "disfrute. Las participantes comparten experiencias, se inspiran " +
      "mutuamente y se llevan mucho más que un sombrero: una vivencia " +
      "significativa, recuerdos compartidos y una nueva mirada sobre sí mismas.",
    beneficiosTitulo: "Para tu empresa",
    beneficios: [
      {
        titulo: "Tu marca, en un buen recuerdo.",
        texto: "La experiencia sucede en tu espacio: cada participante se va con un sombrero propio y fotos que comparte.",
      },
      {
        titulo: "Llave en mano.",
        texto: "Llegamos con sombreros, avíos y herramientas para todos, y coordinamos de principio a fin. Vos ponés el espacio.",
      },
      {
        titulo: "Respaldo profesional.",
        texto: "Coordina Marian, psicóloga, con más de 7 años al frente de MÁS HATS: sabe cómo hacer que un grupo se sienta cómodo y disfrute.",
      },
    ],
    foto: {
      id: "idea",
      alt: "Mesa de trabajo con sombreros de paja a medio intervenir, flores blancas y avíos.",
    },
  },

  como: {
    titulo: "Cómo funciona",
    pasos: [
      {
        texto: "Elegimos la fecha y la cantidad de personas.",
        foto: { id: "paso1", alt: "Mesa preparada con un sombrero amarillo, un sombrero de paja y el cartel de MÁS HATS." },
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
        foto: { id: "paso4", alt: "Manos que sostienen un sombrero de paja terminado, con cinta bordada y una medalla." },
      },
    ],
  },

  galeria: {
    label: "Galería",
    titulo: "Así se vive un encuentro.",
    fotos: [
      { id: "galeria1", alt: "Manos que aplican pegamento sobre un sombrero de paja, entre flores blancas." },
      { id: "galeria2", alt: "Sombrero de paja con cinta verde, moño amarillo y flores secas, sobre la mesa." },
      { id: "galeria3", alt: "Manos que colocan plumas en el ala de un sombrero con cinta bordada." },
      { id: "galeria4", alt: "Sombrero de paja terminado con cinta roja, plumas y una medalla." },
      { id: "galeria5", alt: "Copas de vino rosado en alto, en el brindis de cierre del encuentro." },
    ],
  },

  casos: {
    titulo: "Quiénes ya lo hicieron",
    publicar: true,
    items: [
      {
        nombre: "Chateau Nordelta",
        tipo: "Hotel",
        porQue: "La experiencia como propuesta propia para su público.",
        foto: {
          id: "casoChateau",
          alt: "Sombrero de paja terminado sobre una mesa, junto a una copa de vino y una botella.",
        },
      },
      {
        nombre: "Conexión 2",
        tipo: "Retiro de mujeres · Mendoza",
        porQue: "Fuera de Buenos Aires y dentro de una agenda ajena.",
        foto: {
          id: "casoConexion",
          alt: "Grupo del retiro Conexión 2, en Mendoza, cada una con su sombrero.",
        },
      },
    ],
  },

  mariana: {
    titulo: "Marian",
    profesion: "Psicóloga",
    trayectoria: "Más de 7 años al frente de MÁS HATS, como emprendedora y empresaria.",
    // De su texto de presentación, en primera persona (2026-09-25).
    frases: [
      "MÁS HATS nace de la pasión y de un proceso de búsqueda, como el de muchas " +
        "mujeres, y del empuje que tenemos para crear.",
      "Cuando renombré la marca, la pensé como un plus: un accesorio positivo que " +
        "potencia nuestra actitud. Siempre pensando en más, en ir para adelante, en " +
        "crecer y en no dejar de hacer nada que nos guste.",
      "Tu actitud en la vida es todo. MÁS HATS suma.",
    ],
    foto: { id: "mariana", alt: "Marian, con camisa blanca y sombrero marrón, junto a la mesa de trabajo." },
  },

  cierre: {
    titulo: "Desde 8 personas, en todo el país, con 15 días de anticipación.",
    bajada: "Contanos cuántos son y cuándo, y te mandamos la propuesta.",
    foto: { id: "cierre", alt: "Sombrero de paja terminado junto a un estuche de anteojos de sol." },
  },
});
