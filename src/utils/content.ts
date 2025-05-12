import { getCollection } from "astro:content";
import { glob } from "glob";
import { readFileSync } from "node:fs";
import { parse as parseYaml } from "yaml";
import { z } from "zod";

// utilities

export const escape = (string: string) => string.replaceAll(/[/ ]/g, "_");
export const unescape = (string: string) => string.replaceAll("_", " ");

export const by =
  <T>(key: (x: T) => number, ascending: boolean = true) =>
  (a: T, b: T) =>
    (ascending ? 1 : -1) * (key(a) - key(b));

// posts, sorted from newest to oldest.

export const posts = (await getCollection("blog")).sort(
  by((x) => x.data.date.valueOf(), false),
);

// authors

export const authors = [
  ...new Set(posts.map((post) => post.data.authors).flat()),
].filter((x) => x !== null);

export const getPostsByAuthor = (author: string) =>
  posts.filter(
    (post) => post.data.authors && post.data.authors.includes(author),
  );

// tags

export const tags = [
  ...new Set(posts.map((post) => post.data.tags).flat()),
].filter((x) => x !== null);

export const getPostsByTag = (tag: string) =>
  posts.filter((post) => post.data.tags && post.data.tags.includes(tag));

// collections

const Collection = z
  .object({
    name: z.string(),
    sources: z.array(z.string()).nonempty().optional(),
    // not optional; can be empty for upcoming collections
    items: z.array(z.string()).nullable(),
  })
  .strict();

type CollectionT = z.infer<typeof Collection>;

export const collections: CollectionT[] = (
  await glob("poki/collections/**/*.yaml")
).map((filepath: string) =>
  Collection.parse(parseYaml(readFileSync(filepath, "utf8"))),
);

export const getPostsByCollection = (collection: CollectionT) =>
  !collection.items
    ? []
    : collection
        .items!.map((filepath) =>
          posts.find((post) => `poki/${filepath}` === post.filePath),
        )
        .filter((x) => x !== undefined);
