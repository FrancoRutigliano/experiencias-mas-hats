/**
 * Fotos elegidas de /images (primer encuentro). Los originales quedan fuera
 * del repo; acá sólo entran las que se usan, con nombre semántico.
 *
 *   hero    ← IMG_2501   paso1 ← DSC03995   paso2 ← DSC03992
 *   paso3   ← DSC04102   paso4 ← DSC04140   mariana ← DSC04001
 *   cierre  ← DSC04459   idea  ← DSC04110
 *
 * Regla (2026-09-25): nada de caras en primer plano, para cuidar a las
 * participantes. La excepción es el hero (foto grupal elegida por Franco) y Marian.
 */
import type { ImageMetadata } from "astro";
import hero from "../assets/fotos/hero.jpg";
import paso1 from "../assets/fotos/paso1.jpg";
import paso2 from "../assets/fotos/paso2.jpg";
import paso3 from "../assets/fotos/paso3.jpg";
import paso4 from "../assets/fotos/paso4.jpg";
import mariana from "../assets/fotos/mariana.jpg";
import cierre from "../assets/fotos/cierre.jpg";
import idea from "../assets/fotos/idea.jpg";

export const fotos = { hero, idea, paso1, paso2, paso3, paso4, mariana, cierre } as const satisfies Record<
  string,
  ImageMetadata
>;

export type FotoId = keyof typeof fotos;
