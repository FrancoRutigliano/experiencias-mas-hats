import { describe, expect, test } from "vitest";
import { experiencia } from "../../src/data/experiencia";
import { fotos } from "../../src/data/fotos";

describe("fotos", () => {
  test("toda foto referenciada en experiencia existe en el mapa de fotos", () => {
    const ids = [
      experiencia.hero.foto.id,
      ...experiencia.como.pasos.map((p) => p.foto.id),
      experiencia.mariana.foto.id,
      experiencia.cierre.foto.id,
    ];

    expect(ids.filter((id) => !(id in fotos))).toEqual([]);
  });

  test("toda foto tiene alt descriptivo", () => {
    const alts = [experiencia.hero.foto, ...experiencia.como.pasos.map((p) => p.foto)].map((f) => f.alt);

    expect(alts.every((alt) => alt.length > 20)).toBe(true);
  });
});

describe("galería", () => {
  test("tiene entre 5 y 8 fotos, todas existentes y con alt descriptivo", () => {
    const { fotos: lista } = experiencia.galeria;

    expect(lista.length).toBeGreaterThanOrEqual(5);
    expect(lista.length).toBeLessThanOrEqual(8);
    expect(lista.filter((f) => !(f.id in fotos))).toEqual([]);
    expect(lista.every((f) => f.alt.length > 20)).toBe(true);
  });

  test("no repite fotos que ya se usan en otros bloques", () => {
    const usadas = new Set([
      experiencia.hero.foto.id,
      experiencia.idea.foto.id,
      ...experiencia.como.pasos.map((p) => p.foto.id),
      experiencia.mariana.foto.id,
      experiencia.cierre.foto.id,
    ]);

    expect(experiencia.galeria.fotos.filter((f) => usadas.has(f.id))).toEqual([]);
  });
});
