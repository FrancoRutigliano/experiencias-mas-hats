# MÁS HATS — sitio de experiencias

Landing única y estática en **Astro**. Es una propuesta comercial que se envía
por link a hoteles, retiros y marcas que quieren contratar la experiencia.

## Regla cero

**Leer `docs/brief.md` entero antes de escribir una línea de código.** Ahí está
el público, la arquitectura, el copy definitivo y los datos reales. Si algo de
este archivo o de tu criterio contradice el brief, gana el brief.

Los datos del negocio (capacidad, duración, precios, clientes) **no se
inventan**. Si un dato no está en el brief, no existe: dejalo marcado con un
comentario `TODO` y avisá.

---

## Primer paso, antes de tocar una línea de CSS

```bash
pip install pillow numpy scikit-learn pillow-heif
python extraer-paleta.py images --contacto --salida analisis
```

Genera `analisis/paleta.json`, `analisis/tokens-sugeridos.css` y
`analisis/hoja-de-contacto.html`.

Qué hacer con eso:

1. **Mirar el inventario.** Dice cuántas fotos hay, su orientación y cuáles
   sirven de portada (horizontales, ≥1600px de ancho). Si el resultado es
   **cero aptas**, el hero se resuelve recortando una vertical con
   `object-position` — no estirando una chica. Decirlo antes de maquetar.
2. **Comparar la paleta con `src/styles/tokens.css`.** Los tokens actuales
   salieron de tres fotos nada más. Si el análisis sobre la biblioteca completa
   da neutros bastante distintos, **avisar antes de cambiar nada** y proponer
   el ajuste. Lo que no se toca: el trigo sigue siendo el único acento.
3. **Abrir la hoja de contacto** para elegir las fotos de cada bloque, en vez
   de adivinar por nombre de archivo.

No commitear `analisis/` — va al `.gitignore`.

---

## Stack

- **Astro**, sin framework de UI. Cero islas salvo que algo lo exija de verdad.
- **CSS plano con custom properties.** Nada de Tailwind ni CSS-in-JS: el
  sistema está en `src/styles/tokens.css` y la tipografía es lo que carga la
  página. Un utility framework acá agrega peso y esconde el sistema.
- **`astro:assets`** (`<Image />`) para *todas* las fotos. Son pesadas y el
  sitio se abre desde un mail.
- **Fuentes**: Marcellus y Karla desde Google Fonts, con `display=swap`,
  `preconnect`, y sólo los pesos que se usan (Marcellus 400; Karla 400/600).
- **JS**: sólo el menú mobile y el botón flotante. Sin analytics en la v1.

### Estructura

```
src/
  pages/index.astro
  components/
    Nav.astro  Hero.astro  FichaTecnica.astro  Como.astro
    Casos.astro  Mariana.astro  Cierre.astro  WhatsAppFab.astro
  styles/tokens.css  global.css
  data/experiencia.ts        ← TODO el copy y los datos, en un solo archivo
  layouts/Base.astro
images/
docs/brief.md
extraer-paleta.py
```

**`src/data/experiencia.ts` es importante:** todo el texto y los números viven
ahí, no hardcodeados en los componentes. Mariana va a querer cambiar la
duración o una frase, y tiene que ser un solo archivo de una sola verdad.

---

## WhatsApp

El CTA es un link `wa.me` con mensaje pre-cargado:

```ts
const base = "https://wa.me/54911XXXXXXXX?text=";
const msg = (origen: string) =>
  base + encodeURIComponent(
    `Hola Mariana, quiero una propuesta de MÁS HATS para ____. ` +
    `Seríamos ____ personas, la fecha tentativa es ____ y sería en ____.`
  );
```

Un `origen` distinto por sección (hero / casos / cierre / flotante) para saber
de dónde vino cada consulta. El número todavía no está: dejarlo en una
constante marcada con `TODO`.

---

## El link se envía: esto no es opcional

El sitio llega por mail y por WhatsApp. La previsualización **es** la primera
impresión.

- `<title>` y `<meta name="description">` reales.
- Open Graph completo: `og:title`, `og:description`, `og:image` (1200×630,
  generada a partir de una foto real con el titular encima), `og:type`,
  `og:url`. Más `twitter:card = summary_large_image`.
- `lang="es-AR"`.
- **Desktop primero.** Quien evalúa una propuesta la abre en la computadora.
  Que ande en mobile es obligatorio; que se luzca en desktop es el objetivo.

---

## Definition of done

- [ ] Lighthouse ≥ 95 en Performance, Accessibility, Best Practices y SEO
- [ ] Ninguna `<img>` cruda: todas por `<Image />`, con `width`/`height`
- [ ] Open Graph completo y verificado pegando el link en WhatsApp
- [ ] Contraste AA en todo el texto (los tokens ya vienen verificados; si
      agregás un color, verificalo)
- [ ] Se ve bien a 390px y a 1440px, sin scroll horizontal en ningún ancho
- [ ] Todo el contenido visible apenas carga — nada esperando un observer
- [ ] `prefers-reduced-motion` respetado
- [ ] Foco de teclado visible en nav, CTAs y links
- [ ] Sin dark mode
- [ ] Sin lorem ipsum ni datos inventados

---

## Cómo trabajar

- Un bloque por vez, en el orden del brief (hero → ficha técnica → cómo → casos
  → Mariana → cierre). Mostrar cada bloque terminado antes de seguir.
- Los tokens de `tokens.css` no se modifican sin avisar. Si algo no se puede
  resolver con los que hay, decirlo y proponer el token nuevo con su contraste
  calculado.
- Si una decisión de diseño depende de contenido que no existe (una foto, una
  frase de Mariana, el número de WhatsApp), no rellenar: marcar `TODO` y
  seguir con lo que sí se puede.