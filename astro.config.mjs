// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

const deploy = import.meta.env.PROD
  ? { site: "https://acipensersturio.github.io/", base: "./mun/" }
  : { site: "http://localhost/", base: "./" };

// https://astro.build/config
export default defineConfig({
  ...deploy,
  ...{
    integrations: [
      // mdx(),
      sitemap(),
    ],
  },
});
