# Plan: sitio de experiencias MÁS HATS (desde intent.md y spec.md, 2026-09-24)

Este plan es lo que siguen los agentes. Cada tarea dice qué archivos toca, quién
la hace y cómo se prueba que está terminada. Si algo choca con el brief, gana el
brief. Si choca con la spec, se frena y se pregunta.

## Archivos que cambian

```
.gitignore                                   nuevo  (images/, analisis/, dist/, node_modules/)
package.json, astro.config.mjs, tsconfig.json nuevo
docs/brief.md                                movido desde brief/brief.md (claude.md lo busca ahí)
src/styles/tokens.css                        nuevo  (tal cual el sistema de diseño aprobado)
src/styles/global.css                        nuevo  (reset, grilla, foco, reduced-motion)
src/data/experiencia.ts                      nuevo  (todo el copy y los datos, readonly)
src/lib/whatsapp.ts                          nuevo  (buildWhatsAppUrl)
src/layouts/Base.astro                       nuevo  (head, fuentes, OG)
src/components/Nav.astro                     nuevo
src/components/Hero.astro                    nuevo
src/components/FichaTecnica.astro            nuevo
src/components/Como.astro                    nuevo
src/components/Casos.astro                   nuevo
src/components/Mariana.astro                 nuevo
src/components/Cierre.astro                  nuevo
src/components/WhatsAppFab.astro             nuevo
src/components/CtaButton.astro               nuevo  (un solo botón para todos los CTA)
src/pages/index.astro                        nuevo
src/pages/og.png.ts                          nuevo  (genera la OG 1200×630 en el build)
src/assets/fotos/*.jpg                       ~12 fotos elegidas, con nombre semántico
tests/unit/whatsapp.test.ts                  nuevo  (vitest)
tests/unit/experiencia.test.ts               nuevo  (los datos coinciden con el brief)
tests/e2e/landing.spec.ts                    nuevo  (playwright)
```

## Orden de trabajo

Regla de `claude.md`: se muestra cada bloque terminado antes de seguir. Por eso
**se construye en paralelo, pero se aprueba en secuencia**. Hay dos puntos de
control humanos (◆).

### Fase 0 — Base (secuencial, Claude principal) — ✅ hecha 2026-09-24
Notas: Astro 7.3, TypeScript fijado en 6 (`astro check` no soporta TS 7).
`npm run build` **falla a propósito** mientras el número de WhatsApp sea el
placeholder. Para desarrollar y en los controles se usa `npm run build:preview`.
22 tests unitarios en verde, con 100% de cobertura en `src/lib` y `src/data`.
0.1 `git init`, scaffold de Astro (minimal, TS strict), vitest y playwright. `.gitignore`.
0.2 Mover el brief a `docs/`, crear `tokens.css` tal cual, `global.css` y `Base.astro` con las fuentes.
0.3 Paleta: `extraer-paleta.py` no existe. Se hace un chequeo liviano con Pillow
    (k-means sobre las 12 fotos elegidas, en el scratchpad, sin commitear) para
    comparar los neutros con `--mh-cal`/`--mh-tinta`. **Sólo informa, no toca tokens.**
0.4 Copiar las fotos elegidas en la spec a `src/assets/fotos/`.
0.5 `experiencia.ts` y `whatsapp.ts` **con TDD**: primero los tests en rojo, después la implementación.
    Tests: codificación exacta del mensaje, `origen` según la decisión de la spec §5,
    falla en producción si el número es placeholder y la ficha es idéntica a la del brief.

### Fase 1 — Arriba del pliegue (2 agentes en paralelo, worktrees separados)
| Agente | Tarea | Archivos que puede escribir |
|---|---|---|
| `general-purpose` A | Nav, Hero y CtaButton | `Nav.astro`, `Hero.astro`, `CtaButton.astro` |
| `general-purpose` B | Ficha técnica | `FichaTecnica.astro` |

Los dos leen `spec.md`, `docs/brief.md`, `tokens.css` y `experiencia.ts`, y
**no los modifican**. Si falta un token o un dato, lo reportan y no lo inventan.

1.3 Merge en `index.astro`. Screenshots a 390 y 1440.
**◆ Control 1:** Franco aprueba el lenguaje visual (foto del hero, `object-position`,
ritmo de la ficha). Todo lo que sigue copia este lenguaje.

### Fase 2 — Resto de la página (3 agentes en paralelo, worktrees separados)
| Agente | Tarea | Archivos que puede escribir |
|---|---|---|
| `general-purpose` C | Cómo funciona | `Como.astro` |
| `general-purpose` D | Casos y Mariana (los dos bloqueados por contenido, con `TODO` y flag) | `Casos.astro`, `Mariana.astro` |
| `general-purpose` E | Cierre, WhatsApp flotante y OG image | `Cierre.astro`, `WhatsAppFab.astro`, `og.png.ts` |

2.4 Merge en `index.astro`, en el orden del brief.
**◆ Control 2:** screenshots de la página completa a 390 y 1440.

### Fase 3 — Verificación (3 agentes en paralelo, sólo lectura salvo e2e)
| Agente | Qué verifica |
|---|---|
| `e2e-runner` | Escribe y corre `landing.spec.ts`: sin scroll horizontal de 320 a 1920px, todos los CTA van a `wa.me` con el texto exacto, contenido visible con JS deshabilitado, foco visible con Tab, reduced-motion y cero `<img>` sin dimensiones. |
| `a11y-architect` | Contraste AA, jerarquía de headings, alt de las fotos y menú mobile accesible por teclado. |
| `code-reviewer` | Cumplimiento de `claude.md` y la spec: nada de copy hardcodeado, sin islas, sin Tailwind, sin datos inventados y archivos chicos. |

3.4 Lighthouse (mobile y desktop) sobre `astro preview`.
3.5 Claude principal corrige lo CRITICAL y lo HIGH y vuelve a correr la fase 3 una vez.

### Fase 4 — Publicación (humano)
Sólo cuando estén el número de WhatsApp, el dominio y la decisión sobre los casos.
Se pega el link en WhatsApp para verificar la previsualización.

## Riesgos

- **Cero fotos horizontales.** El hero y la OG dependen de un buen recorte. Se
  mitiga eligiendo el `object-position` a mano en el control 1 y con distintos
  puntos de foco para mobile y desktop (`<Picture>` con art direction si hace falta).
- **Bloque 04 sin permiso ni fotos confirmadas.** Puede demorar la publicación.
  Se mitiga con el flag `casos.publicar`: la página se publica sin el bloque
  antes que con datos inventados.
- **410MB de originales.** Si entran al repo o al build, se rompe el rendimiento.
  Se mitiga con `/images` en `.gitignore` y sólo las fotos elegidas en `src/assets`.
- **Agentes en paralelo que tocan lo compartido.** Se mitiga porque cada agente
  tiene su lista cerrada de archivos, y los compartidos quedan congelados después
  de la fase 0.
- **Deriva a flyer.** Un agente puede sumar color, radius o animación «para que
  sea moderno». Se mitiga con la spec §1 como regla y con el `code-reviewer`
  buscando valores fuera de los tokens (`#hex`, `border-radius`, `box-shadow`).
- **`origen` sin decidir.** Se mitiga porque el test de la fase 0 fija una de
  las dos opciones antes de que los componentes la usen.

## Prueba de que está terminado

- `vitest`: `whatsapp.test.ts` y `experiencia.test.ts` en verde, con ≥80% de cobertura en `src/lib` y `src/data`.
- `playwright`: `landing.spec.ts` en verde en chromium y webkit (mobile).
- Lighthouse ≥ 95 ×4, en mobile y desktop, con el reporte guardado.
- Screenshots a 390 y 1440 aprobados en los controles 1 y 2.
- Previsualización real en WhatsApp con la imagen, el título y la descripción correctos.
- Checklist de «Definition of done» de `claude.md` completo, salvo los `TODO`
  de contenido listados en el intent.
