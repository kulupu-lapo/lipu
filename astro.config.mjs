// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import react from "@astrojs/react";

const deploy = import.meta.env.PROD
  ? { site: "https://lipu.pona.la/", base: "./" }
  : { site: "http://localhost/", base: "./" };

// https://astro.build/config
export default defineConfig({
  ...deploy,
  ...{
    integrations: [
      // mdx(),
      sitemap(),
      react(),
    ],
  },
});
