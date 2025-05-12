import { getCollection } from "astro:content";

export const escape = (string: string) => string.replaceAll(/[/ ]/g, "_");
export const unescape = (string: string) => string.replaceAll("_", " ");

// posts, sorted from newest to oldest.
export const posts = (await getCollection("blog")).sort(
  (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
);

// authors
export const authors = [
  ...new Set(posts.map((post) => post.data.authors).flat()),
].filter((x) => x !== null);

export const getPostsByAuthor = (author: string) =>
  posts.filter(
    (post) => post.data.authors && post.data.authors.includes(author),
  );

export const by =
  (field: Function, ascending: boolean = true) =>
  (a: any, b: any) =>
    (ascending ? 1 : -1) * (field(a) - field(b));
