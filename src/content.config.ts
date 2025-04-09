import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/` directory.
  loader: glob({ base: "./src/content/blog/", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    date: z.coerce.date(),
  }),
});

const meta = defineCollection({
  loader: glob({ base: "./src/content/meta/", pattern: "**/*.{md,mdx}" }),
  schema: z.object({}),
});

export const collections = { blog, meta };
