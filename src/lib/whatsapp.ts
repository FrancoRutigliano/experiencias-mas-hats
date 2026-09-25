export type Origen = "hero" | "nav" | "casos" | "cierre" | "flotante";

export interface WhatsAppConfig {
  readonly numero: string;
  readonly mensaje: string;
  /** Agrega « · ref: <origen>» al mensaje. Lo decide Mariana (spec §5). */
  readonly incluirRef: boolean;
}

export const WHATSAPP_PLACEHOLDER = "54911XXXXXXXX";

const WA_BASE = "https://wa.me/";
const SOLO_DIGITOS = /^\d{8,15}$/;

export function esNumeroPlaceholder(numero: string): boolean {
  return numero === WHATSAPP_PLACEHOLDER;
}

export function validarNumero(numero: string, { produccion }: { produccion: boolean }): void {
  if (esNumeroPlaceholder(numero)) {
    if (produccion) {
      throw new Error(
        "El número de WhatsApp sigue siendo el placeholder. Cargarlo en src/data/experiencia.ts antes de publicar.",
      );
    }
    return;
  }
  if (!SOLO_DIGITOS.test(numero)) {
    throw new Error(
      `Número de WhatsApp inválido: «${numero}». Formato wa.me: sólo dígitos, con código de país (ej. 5491112345678).`,
    );
  }
}

export function buildWhatsAppUrl(origen: Origen, config: WhatsAppConfig): string {
  const texto = config.incluirRef ? `${config.mensaje} · ref: ${origen}` : config.mensaje;
  return `${WA_BASE}${config.numero}?text=${encodeURIComponent(texto)}`;
}
