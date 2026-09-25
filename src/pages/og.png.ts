/**
 * Imagen Open Graph 1200×630 (spec §6), generada en el build como /og.png.
 * Base.astro ya apunta og:image acá.
 *
 * - Fondo: recorte horizontal de la foto del hero (vertical 4000×6000), con el
 *   mismo encuadre que el hero en desktop.
 * - Velo: lateral + inferior, derivado de --mh-tinta (el mismo rgba que
 *   --mh-velo y que el velo desktop del hero).
 * - Texto: wordmark en --mh-eyebrow y titular en --mh-sobre-foto, en
 *   Marcellus. El texto se convierte a trazos con opentype.js a partir del TTF
 *   de src/assets/fonts (OFL), así librsvg no depende de fuentes del sistema.
 *
 * Colores, texto y foto salen de tokens.css y experiencia.ts: acá no hay copy.
 */
import type { APIRoute } from "astro";
import { readFile } from "node:fs/promises";
import path from "node:path";
import opentype from "opentype.js";
import sharp from "sharp";
import { experiencia } from "../data/experiencia";
import { ARCHIVO_HERO } from "../data/fotos";

const ANCHO = 1200;
const ALTO = 630;
/** Margen interior, en px de la imagen. */
const MARGEN = 72;
/** Encuadre vertical del recorte: cabezas arriba, titular sobre la ropa. */
const POSICION_Y = 0.52;

const TITULAR = { tamano: 84, interlineado: 1.1, anchoMax: 700 } as const;
const MARCA = { tamano: 30, espaciado: 0.08 } as const;

// Rutas desde la raíz del proyecto: Astro corre el build desde ahí.
const RAIZ = process.cwd();
const RUTA_TOKENS = path.join(RAIZ, "src/styles/tokens.css");
const RUTA_FUENTE = path.join(RAIZ, "src/assets/fonts/Marcellus-Regular.ttf");
const RUTA_HERO = path.join(RAIZ, "src/assets/fotos", ARCHIVO_HERO);

interface Colores {
  readonly tinta: string;
  readonly sobreFoto: string;
  readonly eyebrow: string;
}

function leerToken(css: string, nombre: string): string {
  const coincidencia = css.match(new RegExp(`${nombre}:\\s*(#[0-9A-Fa-f]{6})\\b`));
  if (!coincidencia) throw new Error(`og.png: falta el token ${nombre} en tokens.css`);
  return coincidencia[1];
}

async function leerColores(): Promise<Colores> {
  const css = await readFile(RUTA_TOKENS, "utf8");
  return {
    tinta: leerToken(css, "--mh-tinta"),
    sobreFoto: leerToken(css, "--mh-sobre-foto"),
    eyebrow: leerToken(css, "--mh-eyebrow"),
  };
}

async function cargarFuente(): Promise<opentype.Font> {
  const buffer = await readFile(RUTA_FUENTE);
  return opentype.parse(buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength));
}

/** Parte el texto en líneas que no pasen `anchoMax`. */
function partirEnLineas(fuente: opentype.Font, texto: string, tamano: number, anchoMax: number): string[] {
  return texto.split(" ").reduce<string[]>((lineas, palabra) => {
    const ultima = lineas.at(-1);
    const candidata = ultima ? `${ultima} ${palabra}` : palabra;
    if (ultima && fuente.getAdvanceWidth(candidata, tamano) > anchoMax) return [...lineas, palabra];
    return [...lineas.slice(0, -1), candidata];
  }, []);
}

/** Trazo del titular, anclado por la base de la última línea en `baseFinal`. */
function trazoTitular(fuente: opentype.Font, texto: string, baseFinal: number): string {
  const { tamano, interlineado, anchoMax } = TITULAR;
  const lineas = partirEnLineas(fuente, texto, tamano, anchoMax);
  const paso = tamano * interlineado;
  const primeraBase = baseFinal - paso * (lineas.length - 1);
  return lineas
    .map((linea, i) => fuente.getPath(linea, MARGEN, primeraBase + paso * i, tamano).toPathData(2))
    .join(" ");
}

/** Trazo del wordmark con el mismo letter-spacing que la nav (.08em). */
function trazoMarca(fuente: opentype.Font, texto: string, base: number): string {
  const { tamano, espaciado } = MARCA;
  const escala = tamano / fuente.unitsPerEm;
  const glifos = fuente.stringToGlyphs(texto);
  const avances = glifos.map((glifo) => (glifo.advanceWidth ?? 0) * escala + tamano * espaciado);
  const inicio = (i: number) => MARGEN + avances.slice(0, i).reduce((suma, avance) => suma + avance, 0);
  return glifos.map((glifo, i) => glifo.getPath(inicio(i), base, tamano).toPathData(2)).join(" ");
}

function rgba(hex: string, alfa: number): string {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return `rgba(${r},${g},${b},${alfa})`;
}

/** Velo + texto, en un SVG del tamaño de la imagen. */
function superposicion(fuente: opentype.Font, colores: Colores): string {
  const { tinta, sobreFoto, eyebrow } = colores;
  const marca = trazoMarca(fuente, experiencia.marca, MARGEN + MARCA.tamano * 0.75);
  const titular = trazoTitular(fuente, experiencia.hero.titular, ALTO - MARGEN);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${ANCHO}" height="${ALTO}">
  <defs>
    <linearGradient id="lateral" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${rgba(tinta, 0.85)}"/>
      <stop offset="0.46" stop-color="${rgba(tinta, 0.75)}"/>
      <stop offset="0.72" stop-color="${rgba(tinta, 0)}"/>
    </linearGradient>
    <linearGradient id="inferior" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0.34" stop-color="${rgba(tinta, 0)}"/>
      <stop offset="1" stop-color="${rgba(tinta, 0.8)}"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#lateral)"/>
  <rect width="100%" height="100%" fill="url(#inferior)"/>
  <path d="${marca}" fill="${eyebrow}"/>
  <path d="${titular}" fill="${sobreFoto}"/>
</svg>`;
}

/** Recorte 1200:630 de la foto, con el encuadre vertical del hero. */
async function recorteFoto(ruta: string): Promise<Buffer> {
  const foto = sharp(ruta);
  const { width = 0, height = 0 } = await foto.metadata();
  const altoRecorte = Math.round((width * ALTO) / ANCHO);
  const top = Math.round((height - altoRecorte) * POSICION_Y);
  return foto
    .extract({ left: 0, top, width, height: altoRecorte })
    .resize(ANCHO, ALTO)
    .toBuffer();
}

export const GET: APIRoute = async () => {
  const [colores, fuente, fondo] = await Promise.all([
    leerColores(),
    cargarFuente(),
    recorteFoto(RUTA_HERO),
  ]);
  const png = await sharp(fondo)
    .composite([{ input: Buffer.from(superposicion(fuente, colores)) }])
    .png({ compressionLevel: 9, palette: true, quality: 90, effort: 10, dither: 0.6 })
    .toBuffer();
  return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } });
};
