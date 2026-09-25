/** Congela un objeto en profundidad. Los datos del sitio no se mutan. */
export function deepFreeze<T>(valor: T): Readonly<T> {
  if (valor === null || typeof valor !== "object" || Object.isFrozen(valor)) {
    return valor;
  }
  for (const hijo of Object.values(valor)) {
    deepFreeze(hijo);
  }
  return Object.freeze(valor);
}
