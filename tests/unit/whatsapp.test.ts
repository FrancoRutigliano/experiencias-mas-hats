import { describe, expect, test } from "vitest";
import {
  WHATSAPP_PLACEHOLDER,
  buildWhatsAppUrl,
  esNumeroPlaceholder,
  validarNumero,
} from "../../src/lib/whatsapp";

const MENSAJE =
  "Hola Mariana, quiero una propuesta de MÁS HATS para ____. " +
  "Seríamos ____ personas, la fecha tentativa es ____ y sería en ____.";

const config = { numero: "5491112345678", mensaje: MENSAJE, incluirRef: false };

describe("buildWhatsAppUrl", () => {
  test("arma un link wa.me con el número y el mensaje codificado", () => {
    // Act
    const url = buildWhatsAppUrl("hero", config);

    // Assert
    expect(url).toBe(`https://wa.me/5491112345678?text=${encodeURIComponent(MENSAJE)}`);
  });

  test("el mensaje decodificado es idéntico al del brief (tildes y guiones incluidos)", () => {
    const url = new URL(buildWhatsAppUrl("cierre", config));

    expect(url.searchParams.get("text")).toBe(MENSAJE);
  });

  test("sin incluirRef, el origen no aparece en el mensaje", () => {
    const url = new URL(buildWhatsAppUrl("flotante", config));

    expect(url.searchParams.get("text")).not.toContain("flotante");
  });

  test("con incluirRef, agrega la marca de origen al final", () => {
    const url = new URL(buildWhatsAppUrl("casos", { ...config, incluirRef: true }));

    expect(url.searchParams.get("text")).toBe(`${MENSAJE} · ref: casos`);
  });

  test("no muta la configuración recibida", () => {
    const frozen = Object.freeze({ ...config, incluirRef: true });

    expect(() => buildWhatsAppUrl("nav", frozen)).not.toThrow();
  });
});

describe("validarNumero", () => {
  test("acepta un número internacional sólo con dígitos", () => {
    expect(() => validarNumero("5491112345678", { produccion: true })).not.toThrow();
  });

  test("rechaza números con símbolos o espacios", () => {
    expect(() => validarNumero("+54 9 11 1234-5678", { produccion: false })).toThrow(/sólo dígitos/);
  });

  test("tolera el placeholder fuera de producción", () => {
    expect(() => validarNumero(WHATSAPP_PLACEHOLDER, { produccion: false })).not.toThrow();
  });

  test("falla en producción si el número sigue siendo el placeholder", () => {
    expect(() => validarNumero(WHATSAPP_PLACEHOLDER, { produccion: true })).toThrow(/placeholder/);
  });
});

describe("número real", () => {
  test("el número cargado pasa la validación de producción", async () => {
    const { experiencia } = await import("../../src/data/experiencia");

    expect(() => validarNumero(experiencia.whatsapp.numero, { produccion: true })).not.toThrow();
  });
});

describe("esNumeroPlaceholder", () => {
  test("detecta el placeholder y no confunde un número real", () => {
    expect(esNumeroPlaceholder(WHATSAPP_PLACEHOLDER)).toBe(true);
    expect(esNumeroPlaceholder("5491112345678")).toBe(false);
  });
});
