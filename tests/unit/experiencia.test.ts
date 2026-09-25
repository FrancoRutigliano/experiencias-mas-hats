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
    expect(experiencia.hero.titular).toBe("Un sombrero que dice quién sos.");
    expect(experiencia.hero.bajada).toBe(
      "Dos horas, un sombrero diseñado y armado por cada participante, y todo el " +
        "material puesto por nosotras. Llevamos la experiencia completa a tu espacio, " +
        "en cualquier punto del país.",
    );
  });

  test("la franja en movimiento tiene cuatro palabras de marca (2026-09-25)", () => {
    expect(experiencia.franja).toEqual(["Encuentro", "Diseño", "Actitud", "Más"]);
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

  test("el menú lleva a las secciones en el orden de la página (2026-09-25)", () => {
    expect(experiencia.nav.map((n) => n.ancla)).toEqual(["#idea", "#como", "#casos", "#mariana"]);
  });

  test("el recorrido lateral cubre todas las secciones, en orden", () => {
    expect(experiencia.recorrido.map((r) => r.ancla)).toEqual([
      "#ficha",
      "#idea",
      "#como",
      "#galeria",
      "#casos",
      "#mariana",
      "#cierre",
    ]);
  });

  test("las etiquetas de interfaz del menú están en datos", () => {
    expect(experiencia.ui).toEqual({ menu: "Menú", cerrar: "Cerrar", pausarGaleria: "Pausar galería" });
  });

  test("incluye / no incluye es el del brief", () => {
    expect(experiencia.incluye.si).toBe(
      "Sombrero base por persona, todos los avíos, herramientas y la coordinación de la experiencia.",
    );
    expect(experiencia.incluye.no).toBe(
      "Espacio, catering y fotografía. Fuera de Buenos Aires, traslado y estadía.",
    );
  });

  test("el cierre es el del brief, partido en titular y bajada", () => {
    expect(`${experiencia.cierre.titulo} ${experiencia.cierre.bajada}`).toBe(
      "Desde 8 personas, en todo el país, con 15 días de anticipación. Contanos " +
        "cuántos son y cuándo, y te mandamos la propuesta.",
    );
  });

  test("el mensaje de WhatsApp es el del brief", () => {
    expect(experiencia.whatsapp.mensaje).toBe(
      "Hola Marian, quiero una propuesta de MÁS HATS para ____. " +
        "Seríamos ____ personas, la fecha tentativa es ____ y sería en ____.",
    );
  });

  test("los casos son sólo los dos del brief, publicados y con foto (2026-09-25)", () => {
    expect(experiencia.casos.items.map((c) => c.nombre)).toEqual(["Chateau Nordelta", "Conexión 2"]);
    expect(experiencia.casos.publicar).toBe(true);
    expect(experiencia.casos.items.map((c) => c.foto?.id)).toEqual(["casoChateau", "casoConexion"]);
  });

  test("La idea es la del brief §5 (propuesta 2026-09-25)", () => {
    expect(experiencia.idea.label).toBe("La idea");
    expect(experiencia.idea.titulo).toBe("Un sombrero no cambia quién sos. Lo muestra.");
    expect(experiencia.idea.parrafo).toBe(
      "Más que un taller creativo, es un espacio de encuentro, conversación y " +
        "disfrute. Las participantes comparten experiencias, se inspiran " +
        "mutuamente y se llevan mucho más que un sombrero: una vivencia " +
        "significativa, recuerdos compartidos y una nueva mirada sobre sí mismas.",
    );
    expect(experiencia.idea.beneficiosTitulo).toBe("Para tu empresa");
    expect(experiencia.idea.beneficios).toEqual([
      {
        titulo: "Tu marca, en un buen recuerdo.",
        texto: "La experiencia sucede en tu espacio: cada participante se va con un sombrero propio y fotos que comparte.",
      },
      {
        titulo: "Llave en mano.",
        texto: "Llegamos con sombreros, avíos y herramientas para todos, y coordinamos de principio a fin. Vos ponés el espacio.",
      },
      {
        titulo: "Respaldo profesional.",
        texto: "Coordina Marian, psicóloga, con más de 7 años al frente de MÁS HATS: sabe cómo hacer que un grupo se sienta cómodo y disfrute.",
      },
    ]);
  });

  test("el nombre es siempre Marian, en todo el sitio (2026-09-25)", () => {
    expect(experiencia.mariana.titulo).toBe("Marian");
    expect(JSON.stringify(experiencia)).not.toContain("Mariana");
  });

  test("Marian se presenta como psicóloga", () => {
    expect(experiencia.mariana.profesion).toBe("Psicóloga");
  });

  test("Marian muestra su trayectoria con la marca (dato 2026-09-25)", () => {
    expect(experiencia.mariana.trayectoria).toBe(
      "Más de 7 años al frente de MÁS HATS, como emprendedora y empresaria.",
    );
  });

  test("los datos de contacto son los reales (2026-09-25)", () => {
    expect(experiencia.whatsapp.numero).toBe("5491165755523");
    expect(experiencia.email).toBe("info@mashats.com");
    expect(experiencia.instagram).toBe("https://www.instagram.com/mas.hats");
  });

  test("no hay lenguaje clínico ni promesas terapéuticas (brief §7)", () => {
    const texto = JSON.stringify(experiencia).toLowerCase();
    for (const palabra of ["terapia", "terapéutic", "sanar", "tratamiento", "paciente"]) {
      expect(texto).not.toContain(palabra);
    }
  });

  test("las frases de Marian salen de su propio texto (2026-09-25)", () => {
    expect(experiencia.mariana.frases).toEqual([
      "MÁS HATS nace de la pasión y de un proceso de búsqueda, como el de muchas " +
        "mujeres, y del empuje que tenemos para crear.",
      "Cuando renombré la marca, la pensé como un plus: un accesorio positivo que " +
        "potencia nuestra actitud. Siempre pensando en más, en ir para adelante, en " +
        "crecer y en no dejar de hacer nada que nos guste.",
      "Tu actitud en la vida es todo. MÁS HATS suma.",
    ]);
  });
});

describe("experiencia · inmutabilidad", () => {
  test("el objeto está congelado en profundidad", () => {
    expect(Object.isFrozen(experiencia)).toBe(true);
    expect(Object.isFrozen(experiencia.ficha)).toBe(true);
    expect(Object.isFrozen(experiencia.ficha[0])).toBe(true);
  });
});
