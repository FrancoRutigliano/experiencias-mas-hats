import { describe, expect, test } from "vitest";
import { experiencia } from "../../src/data/experiencia";

// Valores copiados de docs/brief.md §3 y §5. Si el brief cambia, este test
// tiene que cambiar primero: es la garantía de que no se inventan datos.

describe("experiencia · datos del brief", () => {
  test("la ficha técnica tiene exactamente los seis datos del brief, en orden", () => {
    expect(experiencia.ficha.map((d) => [d.label, d.valor])).toEqual([
      ["Grupo", "Desde 8"],
      ["Duración", "2 a 2:30 h"],
      ["Dónde", "Todo el país"],
      ["Anticipación", "15 a 30 días"],
      ["Reserva", "Seña 30%"],
      ["Material", "Todo incluido"],
    ]);
  });

  test("el copy del hero es el del brief", () => {
    expect(experiencia.hero.eyebrow).toBe("Experiencias a medida para empresas");
    expect(experiencia.hero.titular).toBe("Una actividad que se llevan puesta.");
    expect(experiencia.hero.bajada).toBe(
      "Dos horas, un sombrero diseñado y armado por cada participante, y todo el " +
        "material puesto por nosotras. Llevamos la experiencia completa a tu espacio, " +
        "en cualquier punto del país.",
    );
  });

  test("el botón principal dice lo mismo en todos lados", () => {
    expect(experiencia.cta).toBe("Pedir propuesta");
  });

  test("los cuatro pasos son los del brief, en orden", () => {
    expect(experiencia.como.pasos.map((p) => p.texto)).toEqual([
      "Elegimos la fecha y la cantidad de personas.",
      "Llegamos con sombreros, avíos y herramientas para todos.",
      "Cada participante diseña e interviene el suyo, con guía.",
      "Cada participante se va con su sombrero.",
    ]);
  });

  test("los textos de la ficha técnica salen del brief (§4 y §5)", () => {
    expect(experiencia.fichaTitulo).toBe("Ficha técnica");
    expect(experiencia.incluye.labelSi).toBe("Incluye:");
    expect(experiencia.incluye.labelNo).toBe("No incluye:");
  });

  test("las etiquetas de interfaz del menú están en datos", () => {
    expect(experiencia.ui).toEqual({ menu: "Menú", cerrar: "Cerrar" });
  });

  test("incluye / no incluye es el del brief", () => {
    expect(experiencia.incluye.si).toBe(
      "Sombrero base por persona, todos los avíos, herramientas y la coordinación de la experiencia.",
    );
    expect(experiencia.incluye.no).toBe(
      "Espacio, catering y fotografía. Fuera de Buenos Aires, traslado y estadía.",
    );
  });

  test("el cierre es el del brief", () => {
    expect(experiencia.cierre.texto).toBe(
      "Desde 8 personas, en todo el país, con 15 días de anticipación. Contanos " +
        "cuántos son y cuándo, y te mandamos la propuesta.",
    );
  });

  test("el mensaje de WhatsApp es el del brief", () => {
    expect(experiencia.whatsapp.mensaje).toBe(
      "Hola Mariana, quiero una propuesta de MÁS HATS para ____. " +
        "Seríamos ____ personas, la fecha tentativa es ____ y sería en ____.",
    );
  });

  test("los casos son sólo los dos del brief y salen apagados hasta tener permiso", () => {
    expect(experiencia.casos.items.map((c) => c.nombre)).toEqual(["Chateau Nordelta", "Conexión 2"]);
    expect(experiencia.casos.publicar).toBe(false);
  });

  test("las frases de Mariana no se inventan: vacías hasta que las escriba ella", () => {
    expect(experiencia.mariana.frases).toEqual([]);
  });
});

describe("experiencia · inmutabilidad", () => {
  test("el objeto está congelado en profundidad", () => {
    expect(Object.isFrozen(experiencia)).toBe(true);
    expect(Object.isFrozen(experiencia.ficha)).toBe(true);
    expect(Object.isFrozen(experiencia.ficha[0])).toBe(true);
  });
});
