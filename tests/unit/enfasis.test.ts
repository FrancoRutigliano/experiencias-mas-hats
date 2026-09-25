import { describe, expect, test } from "vitest";
import { partirEnfasis } from "../../src/lib/enfasis";

describe("partirEnfasis", () => {
  test("separa el fragmento destacado del resto, en orden", () => {
    expect(partirEnfasis("Un sombrero no cambia quién sos. Lo muestra.", "Lo muestra.")).toEqual([
      { texto: "Un sombrero no cambia quién sos. ", enfasis: false },
      { texto: "Lo muestra.", enfasis: true },
    ]);
  });

  test("sin énfasis, o si el fragmento no está, devuelve el texto entero sin destacar", () => {
    expect(partirEnfasis("Hola.", undefined)).toEqual([{ texto: "Hola.", enfasis: false }]);
    expect(partirEnfasis("Hola.", "Chau")).toEqual([{ texto: "Hola.", enfasis: false }]);
  });

  test("el énfasis puede estar al principio o en el medio", () => {
    expect(partirEnfasis("Tu actitud en la vida es todo. MÁS HATS suma.", "MÁS HATS suma.")).toEqual([
      { texto: "Tu actitud en la vida es todo. ", enfasis: false },
      { texto: "MÁS HATS suma.", enfasis: true },
    ]);
    expect(partirEnfasis("A B C", "B")).toEqual([
      { texto: "A ", enfasis: false },
      { texto: "B", enfasis: true },
      { texto: " C", enfasis: false },
    ]);
  });
});
