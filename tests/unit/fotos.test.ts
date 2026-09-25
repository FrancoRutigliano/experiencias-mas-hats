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
