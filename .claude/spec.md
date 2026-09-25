# Spec: sitio de experiencias MÁS HATS (desde intent.md, 2026-09-24)
Estado: borrador para revisar. Fuentes: `brief/brief.md` (manda sobre todo),
`.claude/claude.md` y los tokens de «Campo abierto».

El intent dice **por qué**. Esto dice **qué** se ve y cómo se comporta. El
**cómo** se construye va en `plan.md`.

---

## 1. Qué significa «moderna» acá

«Moderna» no significa efectos. Significa que el sitio se ve **editorial**,
como una revista o la propuesta de un estudio, y no como un template. Se
consigue con la estructura, sin sumar colores ni animaciones:

| Decisión | En concreto |
|---|---|
| Escala tipográfica grande | H1 Marcellus hasta 62px, mucho aire alrededor. El titular es el protagonista del hero. |
| Grilla asimétrica | 12 columnas en desktop. Texto en 5 columnas y foto en 7, no todo centrado. |
| Las fotos verticales se aprovechan | Toda la biblioteca es vertical (ver §3). Los bloques se diseñan en formato retrato (4:5 y 2:3), no se estiran a 16:9. |
| Reglas de 1px y números tabulares | La ficha técnica se ve como una tabla de especificaciones. |
| Labels en versalitas espaciadas | `--mh-label` con `letter-spacing .16em` y mayúsculas para eyebrows y numeración (`01 — 06`). |
| Movimiento mínimo | Sólo transiciones de hover y foco (≤150ms). Nada aparece con el scroll. |
| Sin cromo | Sin sombras, sin radius en cajas, sin iconos decorativos, sin emojis. |

## 2. Estructura de la página

Una sola página, `lang="es-AR"`, seis bloques en el orden del brief. Anchos de
referencia: **1440** (objetivo) y **390** (mínimo obligatorio). Sin scroll
horizontal en ningún ancho intermedio.

### Nav
- Desktop: barra fina sobre el hero, fondo transparente, con el wordmark «MÁS HATS»
  en texto (Marcellus) hasta que exista el logo vectorial. A la derecha, anclas
  (Cómo funciona · Casos · Mariana) y el botón «Pedir propuesta».
- Mobile: wordmark y botón de menú. El menú abre un panel a pantalla completa en
  `--mh-cal`. Es el único JS junto con el botón flotante.
- Cuando el scroll pasa el hero, queda fija con fondo `--mh-cal` y un borde
  inferior `--mh-borde`. Esto se resuelve con CSS o con un observer que sólo
  cambia el estilo. Nunca esconde contenido.

### 01 · Hero
- Foto a sangre en todo el viewport. Desktop: `min-height: 92svh`. Mobile: `88svh`.
- Recorte horizontal de una vertical con `object-fit: cover` y un `object-position`
  elegido a mano. La resolución alcanza: una vertical de 4000px de ancho recortada
  a 16:9 queda en 4000×2250.
- Velo `--mh-velo` abajo. El texto va abajo a la izquierda, en 6 columnas:
  eyebrow en `--mh-eyebrow`, H1 en `--mh-sobre-foto` y bajada en `--mh-sobre-foto-2`.
- CTA primario «Pedir propuesta», con `origen=hero`.
- Foto: **DSC04283** (mesa larga al aire libre, todas con sombrero).
  **Decidido 2026-09-24.** Queda por ajustar el `object-position` en el control 1.

### 02 · Ficha técnica
- Inmediatamente después del hero, fondo `--mh-cal-2`.
- Grilla de 6 celdas: 6×1 en desktop, 3×2 entre 720 y 1080px y 2×3 en mobile.
  Separadores de 1px en `--mh-arena`, sin cajas.
- Cada celda tiene el label arriba (`--mh-label`, `--mh-trigo-ink`) y el valor
  abajo en `--mh-h3` con `tabular-nums`.
- Contenido exacto del brief §5:
  Grupo **Desde 8** · Duración **2 a 2:30 h** · Dónde **Todo el país** ·
  Anticipación **15 a 30 días** · Reserva **Seña 30%** · Material **Todo incluido**
  *(ver pregunta abierta 5 del intent)*.
- Debajo, a `--mh-medida`, un párrafo con «Incluye / No incluye» tal cual el brief.
- Sin CTA.

### 03 · La idea *(nuevo 2026-09-25, brief §1 y §5)*
- Es el bloque que vende el porqué. Tiene que tener el peso visual de una
  página de revista, no de un párrafo suelto.
- Desktop: grilla 7/5. A la izquierda, el label «La idea», el H2 grande
  (`--mh-h1` o un paso por debajo, es la segunda frase fuerte del sitio) y el
  párrafo en `--mh-lead`. A la derecha, la foto vertical **DSC04180** (4:5), a
  sangre hasta el borde derecho del viewport.
- Debajo, a todo el ancho, «Para tu empresa» con los tres beneficios en 3
  columnas, separadas por reglas de 1px como la ficha. Cada una tiene el título
  en `--mh-h3` y el texto en `--mh-p` `--mh-tinta-2`. En mobile van apiladas.
- Fondo `--mh-cal` (alterna con la ficha, que va en `--mh-cal-2`). Sin CTA.
- El copy es una propuesta pendiente de validar con Mariana. Vive en
  `experiencia.idea`.

### 04 · Cómo funciona
- H2 y cuatro pasos. En desktop son 4 columnas con foto vertical 4:5 arriba y,
  debajo, número `01` a `04` (`--mh-label`) y el texto del paso. En mobile, una
  columna con la foto a sangre.
- Las fotos son el proceso real:
  1. «Elegimos la fecha y la cantidad de personas.» → **DSC04057** (grupo en la mesa, arranque)
  2. «Llegamos con sombreros, avíos y herramientas…» → **DSC03992** (mesa armada con sombreros base)
  3. «Cada participante diseña e interviene el suyo…» → **DSC04102** (manos, plumas, avíos)
  4. «Cada participante se va con su sombrero.» → **DSC04239** (sombrero terminado, puesto)
- Sin CTA.

### 05 · Quiénes ya lo hicieron
- Dos casos, uno al lado del otro (una columna en mobile). Cada uno lleva foto 4:5,
  el nombre, el tipo («Hotel», «Retiro de mujeres · Mendoza») y una línea de por
  qué importa, tomada del brief §2.
- **Bloqueado por contenido:** hace falta saber de qué evento son las fotos y tener
  el permiso (intent, preguntas 1 a 3). Hasta entonces se maqueta con el texto real,
  la foto con `TODO` y un feature flag en `experiencia.ts` (`casos.publicar`) que
  apaga el bloque si no hay permiso al publicar.
- Sin CTA. El brief dice «con dos casos alcanza», así que no se infla.

### 06 · Mariana
- Grilla 5/7: foto vertical a la izquierda y, a la derecha, el H2 «Mariana»,
  debajo «Psicóloga» (`.label`), las tres frases en primera persona y un link a
  Instagram (`--mh-trigo-ink`, subrayado).
- Espejo de «La idea»: allá la foto va a la derecha y acá a la izquierda.
- Foto: **DSC04001** (confirmado que es Mariana). Alternativa: DSC04431.
- Las frases no se escriben: van `TODO` visibles en el código, y en el render se
  muestra el bloque sin frases hasta que existan.

### 07 · Cierre
- Fondo `--mh-cal-2`. Foto de detalle a un costado: **DSC04459** (sombrero con
  moño y regalo).
- La ficha repetida en una línea (texto de cierre del brief §5) y el CTA
  primario con `origen=cierre`.
- Footer mínimo debajo: wordmark, Instagram y año.

### WhatsApp flotante
- Sólo mobile (<720px). Aparece después del hero y queda fijo abajo a la derecha,
  respetando `env(safe-area-inset-bottom)`. `origen=flotante`.
- Es un botón pastilla con el texto «Pedir propuesta», no un ícono solo:
  el brief prohíbe emojis y el texto dice qué pasa al tocarlo.

## 3. Inventario de fotos (hecho el 2026-09-24)

- 47 JPG, **todas verticales** (2:3 aprox.), de 1939 a 4000px de ancho, 410MB en total.
- **Cero horizontales.** El hero y la imagen OG salen de recortar una vertical.
- Todas parecen ser de un mismo encuentro al aire libre, con mesa larga, flores
  blancas, sombreros de paja y un cierre con cata en una vinoteca.
- Hay fotos de grupo (04327–04356) que sirven de «prueba social» si se aprueba el caso.
- En el repo sólo entran las ~12 fotos elegidas, en `src/assets/fotos/` con nombre
  semántico (`hero.jpg`, `paso-3.jpg`…). `/images` queda fuera del repo.
- `extraer-paleta.py`, que menciona `claude.md`, **no existe en el repo**. Se
  reemplazó por un chequeo liviano (plan, tarea 0.3). Resultado: los claros de las
  fotos son gris cálido (#E4E3DF), en línea con `--mh-cal` y `--mh-arena`. Los
  oscuros son marrón casi negro (#160C0A), no verde-negro, pero `--mh-tinta` sirve
  justamente para separar el texto de la foto. La paja (#BBA28E–#DFC4AA) es más
  rosada que `--mh-trigo`, y eso ayuda a que el CTA se destaque. **Sin cambios en los tokens.**

## 4. Datos y contenido

- `src/data/experiencia.ts` es la única fuente de copy y números. Los componentes no
  tienen strings de contenido hardcodeados.
- Tipado (`Experiencia`) con `readonly`, para que ningún componente lo mute.
- Todo lo que falta es `TODO` explícito: el número de WhatsApp, las frases de
  Mariana, las fotos de los casos, Instagram y el dominio.

## 5. WhatsApp

- `buildWhatsAppUrl(origen)` devuelve `https://wa.me/<numero>?text=<mensaje codificado>`.
- Mensaje exacto del brief §3.
- `origen ∈ { hero, nav, casos, cierre, flotante }`.
- **Problema detectado:** el snippet de `claude.md` recibe `origen` pero no lo usa,
  y `wa.me` no pasa parámetros extra, así que hoy no se puede saber de dónde vino
  la consulta. Propuesta: agregar al final del mensaje una marca corta y discreta,
  como ` · ref: hero`. *Lo decide Mariana, porque es texto que ve el cliente.*
  Si no la quiere, se saca `origen`, según YAGNI.
- Sin número, el botón igual se renderiza con el placeholder y el build muestra
  un warning. En producción el build falla si el número sigue siendo placeholder.

## 6. Metadatos y previsualización

- `<title>`: «MÁS HATS — Experiencias a medida para empresas».
- `description`: la bajada del hero.
- OG completo y `twitter:card = summary_large_image`. `og:image` de 1200×630,
  generada en el build a partir del recorte de la foto del hero, con el titular
  en Marcellus encima.
- `og:url` y `canonical` dependen del dominio (`TODO`).

## 7. Accesibilidad y rendimiento

- AA en todo el texto: sólo pares de tokens ya verificados.
- `--mh-trigo` nunca va como color de texto.
- Foco visible: outline de 2px en `--mh-trigo-ink` con offset de 3px, en nav, CTAs y links.
- `prefers-reduced-motion`: sin transiciones.
- Todas las fotos van por `<Image />` o `<Picture />` con `width`/`height`,
  en AVIF o WebP con fallback JPG. El hero va con `loading="eager"` y
  `fetchpriority="high"`, y el resto con `lazy`.
- Fuentes: Marcellus 400 y Karla 400/600, con `display=swap` y `preconnect`.
- Un solo H1 y jerarquía H2 por bloque. Alt descriptivo en español en cada foto.

## 8. Criterios de aceptación

1. Lighthouse ≥ 95 en las cuatro categorías, en mobile y en desktop.
2. Screenshots a 390 y 1440 de cada bloque, aprobados por un humano.
3. `scrollWidth ≤ innerWidth` entre 320 y 1920px (test e2e).
4. Todos los CTA apuntan a `wa.me` con el mensaje exacto del brief (test).
5. Con JS deshabilitado se ve todo el contenido.
6. Cero `<img>` sin `width`/`height` en el HTML generado.
7. El link pegado en WhatsApp muestra la imagen, el título y la descripción.
8. `grep` sin lorem ipsum ni números fuera de la ficha del brief.
