import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

// Helper function to format Date as YYYY-MM-DD
const formatDate = (date: Date) => date.toISOString().split("T")[0];

const Article = z
  .object({
    title: z.string(),
    description: z.string().nullable(),
    authors: z.array(z.string()).nullable(),
    proofreaders: z.array(z.string()).nonempty().nullable(),
    // Date is required for all except `unknown-year/unknown-month`.
    // Those still have to specify null explicitly
    date: z.coerce.date(),
    "date-precision": z.union([
      z.literal("year"),
      z.literal("month"),
      z.literal("day"),
      z.literal("none"),
    ]),
    original: z
      .object({
        // NOTE: original-title may not exist, e.g. meli en mije li tawa
        title: z.string().nullable(),
        authors: z.array(z.string()).nonempty().nullable(),
      })
      .nullable(),
    tags: z.array(z.string()).nonempty().nullable(),
    // missing license -> "assume All rights reserved, but
    // its also possible we aren't yet aware of the correct license"
    license: z.string().nullable(), // TODO: SPDX compliance
    sources: z.array(z.string()).nonempty().nullable(),
    archives: z.array(z.string()).nonempty().nullable(),
    preprocessing: z.string().nullable(),
    "accessibility-notes": z.string().nullable(),
    notes: z.string().nullable(),
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

const poki = defineCollection({
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

export const collections = { poki, meta };
