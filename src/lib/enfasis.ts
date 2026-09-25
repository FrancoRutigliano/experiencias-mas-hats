export interface Tramo {
  readonly texto: string;
  readonly enfasis: boolean;
}

/**
 * Parte un texto en tramos para destacar un fragmento (el énfasis
 * estratégico). Si no hay énfasis o no aparece en el texto, devuelve el texto
 * entero sin destacar: el dato manda, nunca se rompe el render.
 */
export function partirEnfasis(texto: string, enfasis: string | undefined): readonly Tramo[] {
  const inicio = enfasis ? texto.indexOf(enfasis) : -1;
  if (!enfasis || inicio === -1) return [{ texto, enfasis: false }];

  const fin = inicio + enfasis.length;
  const tramos: Tramo[] = [
    { texto: texto.slice(0, inicio), enfasis: false },
    { texto: enfasis, enfasis: true },
    { texto: texto.slice(fin), enfasis: false },
  ];
  return tramos.filter((tramo) => tramo.texto.length > 0);
}
