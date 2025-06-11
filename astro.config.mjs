// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import { locales, defaultLang } from "./src/utils/i18n.ts"

const deploy = import.meta.env.PROD
  ? { site: "https://lipu.pona.la/", base: "./" }
  : { site: "http://localhost/", base: "./" };

// https://astro.build/config
export default defineConfig({
  ...deploy,
  ...{
    integrations: [
      // mdx(),
      sitemap({
        i18n: {
          locales : Object.fromEntries(locales.map(x=>[x,x])),
          defaultLocale: defaultLang,
        }
      }),
      // react(),
    ],
  },
  i18n: {
    locales,
    defaultLocale: defaultLang,
    routing: {
        prefixDefaultLocale: false,
        redirectToDefaultLocale: true,
    }
  },
});