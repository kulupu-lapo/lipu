import { z } from "zod";

const Article = z
  .object({
    title: z.string(),
    description: z.string().nullable(),
    authors: z.array(z.string()).nullable(),
    proofreaders: z.array(z.string()).nonempty().nullable(),
    // Date is required for all except `unknown-year/unknown-month`.
    // Those still have to specify null explicitly
    date: z.string().date(),
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
  .strict(); // reject additional fields
