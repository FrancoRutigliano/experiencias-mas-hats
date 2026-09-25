/**
 * Fotos elegidas de /images (primer encuentro). Los originales quedan fuera
 * del repo; acá sólo entran las que se usan, con nombre semántico.
 *
 *   hero    ← DSC04330   paso1 ← DSC03995   paso2 ← DSC03992
 *   paso3   ← DSC04102   paso4 ← DSC04140   mariana ← DSC04001
 *   cierre  ← DSC04459   idea  ← DSC04110 (recorte inferior en 4:5, sin caras)
 *   casoChateau ← DSC04451   casoConexion ← IMG_2501
 *
 * Regla (2026-09-25): nada de caras en primer plano, para cuidar a las
 * participantes. La excepción es el hero (foto grupal elegida por Franco) y Marian.
 */
import type { ImageMetadata } from "astro";
import hero from "../assets/fotos/hero-arcada.jpg";
import paso1 from "../assets/fotos/paso1.jpg";
import paso2 from "../assets/fotos/paso2.jpg";
import paso3 from "../assets/fotos/paso3.jpg";
import paso4 from "../assets/fotos/paso4.jpg";
import mariana from "../assets/fotos/mariana.jpg";
import cierre from "../assets/fotos/cierre.jpg";
import idea from "../assets/fotos/idea.jpg";
import casoChateau from "../assets/fotos/caso-chateau.jpg";
import casoConexion from "../assets/fotos/caso-conexion.jpg";
// Galería: recortes 4:5 ya hechos sobre el original para que no haya caras.
import galeria1 from "../assets/galeria/galeria-1.jpg";
import galeria2 from "../assets/galeria/galeria-2.jpg";
import galeria3 from "../assets/galeria/galeria-3.jpg";
import galeria4 from "../assets/galeria/galeria-4.jpg";
import galeria5 from "../assets/galeria/galeria-5.jpg";

export const fotos = {
  hero,
  idea,
  paso1,
  paso2,
  paso3,
  paso4,
  mariana,
  cierre,
  casoChateau,
  // Conexión 2: por ahora la única foto es IMG_2501; llegan más.
  casoConexion,
  galeria1, // DSC04106
  galeria2, // DSC04134
  galeria3, // DSC04141
  galeria4, // DSC04201
  galeria5, // DSC04392
} as const satisfies Record<
  string,
  ImageMetadata
>;

export type FotoId = keyof typeof fotos;

/**
 * Archivo de la foto del hero, para la imagen OG (que lee el JPG en Node).
 * Si se cambia la foto del hero, conviene cambiar también el nombre del
 * archivo: el navegador y el dev server cachean la imagen por nombre.
 */
export const ARCHIVO_HERO = "hero-arcada.jpg";
