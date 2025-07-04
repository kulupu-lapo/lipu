import { posts, collections, tags, authors } from "@/utils/content";

export function GET({ params, request }) {
  return new Response(
    JSON.stringify({
      entries: posts.length,
      collections: collections.length,
      tags: tags.length,
      authors: authors.length
    }),
  );
}