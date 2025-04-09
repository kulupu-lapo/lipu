import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const Article = z
  .object({
    title: z.string(),
    // NOTE: original-title may not exist, e.g. meli en mije li tawa
    "original-title": z.string().optional(),
    description: z.string().optional(),
    authors: z.array(z.string()).nonempty().optional(),
    translators: z.array(z.string()).nonempty().optional(),
    proofreaders: z.array(z.string()).nonempty().optional(),
    // Date is required for all except `unknown-year/unknown-month`.
    // Those still have to specify null explicitly
    date: z
      .union([
        z.date(),
        z.string().date(),
        z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, "Invalid yyyy-mm format"),
        z.null(),
      ])
      .transform((val) => `${val}`),
    tags: z.array(z.string()).nonempty().optional(),
    // missing license -> "assume All rights reserved, but
    // its also possible we aren't yet aware of the correct license"
    license: z.string().nullable(), // TODO: SPDX compliance
    sources: z.array(z.string()).nonempty().optional(),
    archives: z.array(z.string()).nonempty().optional(),
    preprocessing: z.string().optional(),
    "accessibility-notes": z.string().optional(),
    notes: z.string().optional(),
  })
  .strict() // reject additional fields
  // TODO: it just says "Invalid input" when this refine fails to be met
  .refine((data) => data.authors || data.translators);

const Collection = z
  .object({
    name: z.string(),
    sources: z.array(z.string()).nonempty().optional(),
    // not optional; can be empty for upcoming collections
    items: z
      .array(
        z.string().refine(
          (val) => existsSync(`../${val}`),
          (val) => ({ message: noPath(val) }),
        ),
      )
      .nullable(),
  })
  .strict();

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/` directory.
  loader: glob({
    base: "./poki/plaintext/",
    pattern: "**/*.{md,mdx}",
  }),
  // Type-check frontmatter using a schema
  schema: Article,
});

const meta = defineCollection({
  loader: glob({
    base: "./src/content/meta/",
    pattern: "**/*.{md,mdx}",
  }),
  schema: z.object({}),
});

export const collections = { blog, meta };
