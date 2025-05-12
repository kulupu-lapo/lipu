import { getCollection } from "astro:content";

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

export const getPostsByTag = (tag: string) =>
  posts.filter((post) => post.data.tags && post.data.tags.includes(tag));

export const tags = [
  ...new Set(posts.map((post) => post.data.tags).flat()),
].filter((x) => x !== null);
