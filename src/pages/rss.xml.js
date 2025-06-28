import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "@consts";

export async function GET(context) {
  const posts = (await getCollection("poki")).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      // description: post.data.description,
      // ...post.data,
      link: `${import.meta.env.BASE_URL}/${post.id}/`,
      content: post.rendered.html,
      pubDate: post.data.date,
    })),
  });
}
