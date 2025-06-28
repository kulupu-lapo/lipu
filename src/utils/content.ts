import { type CollectionEntry, getCollection } from "astro:content";
import { glob } from "glob";
import { readFileSync } from "node:fs";
import { parse as parseYaml } from "yaml";
import { z } from "zod";

// utilities

export const escape = (string: string) =>
  string.replaceAll(/[/ ]/g, "_").replaceAll(/[\?\.]/g, "");
export const unescape = (string: string) => string.replaceAll("_", " ");

export const by =
  <T>(key: (x: T) => number, ascending: boolean = true) =>
  (a: T, b: T) =>
    (ascending ? 1 : -1) * (key(a) - key(b));

// posts, sorted from newest to oldest.

export const posts = (await getCollection("poki")).sort(
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

export const postsByAuthor = authors
  .map((author) => ({
    author,
    posts: getPostsByAuthor(author),
  }))
  .sort(by((x) => x.posts.length, false));

// originals (indexed by .original.title)
export const originals = [
  ...new Set(posts.filter((post) => post.data.original !== null && post.data.original.title !== null)
                  .map((post) => post.data.original!.title!)),
].sort()

export const getAuthorsOfOriginal = (original: string) => [...new Set(
  posts.filter(
    (post) => post.data.original && post.data.original.title === original && post.data.original.authors !== null
  ).flatMap((post) => post.data.original!.authors)
  .filter(author => author !== "unknown" && author !== "(unknown)") as string[]
)];

export const getPostsByOriginal = (original: string) =>
  posts.filter(
    (post) => post.data.original && post.data.original.title === original,
  );

export const postsByOriginal = originals
  .map((original) => ({
    original,
    posts: getPostsByOriginal(original),
    authors: getAuthorsOfOriginal(original),
  }))
  .sort(by((x) => x.posts.length, false));

// tags

export const tags = [
  ...new Set(posts.map((post) => post.data.tags).flat()),
].filter((x) => x !== null);

export const getPostsByTag = (tag: string) =>
  posts.filter((post) => post.data.tags && post.data.tags.includes(tag));

export const postsByTag = tags
  .map((tag) => ({
    tag,
    posts: getPostsByTag(tag),
  }))
  .sort(by((x) => x.posts.length, false));

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

export const postsByCollection = collections.map((collection) => ({
  collection: collection.name,
  posts: getPostsByCollection(collection),
}));

export const prevnexts = (() => {
  const prevnexts: {
    [k: string]: {
      [v: string]: {
        prev?: CollectionEntry<"poki">;
        next?: CollectionEntry<"poki">;
      };
    };
  } = Object.fromEntries(posts.map((post) => [post.id, {}]));

  posts.map((post, j) => {
    prevnexts[post.id][`/`] = {
      prev: posts[j - 1],
      next: posts[j + 1],
    };
  });

  postsByCollection.map(({ collection, posts: arrayPosts }, i) => {
    arrayPosts.map((post, j) => {
      prevnexts[post.id][`c/${escape(collection)}`] = {
        prev: arrayPosts[j - 1],
        next: arrayPosts[j + 1],
      };
    });
  });

  postsByTag.map(({ tag, posts: arrayPosts }, i) => {
    arrayPosts.map((post, j) => {
      prevnexts[post.id][`t/${escape(tag)}`] = {
        prev: arrayPosts[j - 1],
        next: arrayPosts[j + 1],
      };
    });
  });

  postsByAuthor.map(({ author, posts: arrayPosts }, i) => {
    arrayPosts.map((post, j) => {
      prevnexts[post.id][`a/${escape(author)}`] = {
        prev: arrayPosts[j - 1],
        next: arrayPosts[j + 1],
      };
    });
  });

  postsByOriginal.map(({ original, posts: arrayPosts }, i) => {
    arrayPosts.map((post, j) => {
      prevnexts[post.id][`o/${escape(original)}`] = {
        prev: arrayPosts[j - 1],
        next: arrayPosts[j + 1],
      };
    });
  });

  return prevnexts;
})();
