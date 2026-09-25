// @ts-check
import { defineConfig, fontProviders } from "astro/config";

// Dominio definitivo (2026-09-25). Se usa para og:url, og:image y canonical.
export default defineConfig({
  site: "https://experiencias.mashats.com",
  // Fuentes de Google descargadas en el build y servidas desde el propio sitio:
  // sin CSS externo que bloquee el primer render (Lighthouse mobile).
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Marcellus",
      cssVariable: "--font-marcellus",
      weights: [400],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["Georgia", "Times New Roman", "serif"],
    },
    {
      provider: fontProviders.google(),
      name: "Karla",
      cssVariable: "--font-karla",
      weights: [400, 600],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
    },
  ],
});
