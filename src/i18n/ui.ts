export const data = {
  en: {
    // titles of prev/next bar options
    'index.default': "Index",
    'index.author(name)': "by {name}",
    'index.collection(name)': "from {name}",
    'index.tag(name)': "{name}",
    'index.original(name)': "adapting {name}",

    // post preview on pages listing multiple posts
    /* format: 
      <a>[post title]</a>
      <p>{foundpost.details}</p>
    */
    'foundpost.details[authors, date]': "by {authors between=', '}, {date}",

    // metadata section on individual post pages
    'metadata.container_title': "Details",

    'metadata.github[link]': "Edit on {link}",
    'metadata.github.link': "Github",
    'metadata.description(text)': "Description: {text}",
    'metadata.license(text)': "License: {text}",
    'metadata.proofreaders(proofreaders)': "Proofreaders: {proofreaders between=', '}",
    'metadata.tags[links]': "Tags: {links between=' '}",
    'metadata.sources[links]': "Sources: {links between=' '}",
    'metadata.archives[links]': "Archives: {links between=' '}",
    'metadata.original[title, credits]': "Original: {title}{credits}",
    'metadata.original.credits(authors)': " by {authors between=', '}",
    'metadata.notes[notes]': "Notes: {notes}",

    'post.credits[authors]': "{authors between=', '}",
  },
  tok: {
    // titles of prev/next bar options
    'index.default': "toki ale",
    'index.author(name)': "{name} li sitelen",
    'index.collection(name)': "{name} la",
    'index.tag(name)': "{name}",
    'index.original(name)': "tan {name}",

    // post preview on pages listing multiple posts
    /* format: 
      <a>[post title]</a>
      <p>
        {foundpost.pre}[list of authors]
        {foundpost.mid}[post.date]
        {foundpost.post}
      </p>
    */
    'foundpost.details[authors, date]': "{authors between=' en '} li sitelen e ni lon {date}",

    // metadata section on individual post pages
    'metadata.container_title': "sona pi lipu toki ni",

    'metadata.github[link]': "sina ken pona e ona kepeken {link}",
    'metadata.github.link': "ilo poki Kita",
    'metadata.description(text)': "ona li toki e ni: {text}",
    'metadata.license(text)': "sina wile kepeken ona la, o kute e nasin {text}",
    'metadata.proofreaders(proofreaders)': "{proofreaders between=' en '} li pona e ona",
    'metadata.tags[links]': "kulupu toki la ona li {links between=' li '}",
    'metadata.sources[links]': "sina ken lukin e ona lon lipu {links between=' lon lipu '}",
    'metadata.archives[links]': "sina ken lukin e ona lon lipu {links between=' anu lipu '} pi moli ala",
    'metadata.original[title, credits]': "ona li tan toki ante. toki ante ni li {title}{credits}",
    'metadata.original.credits(authors)': " li tan {authors between=' li tan '}",
    'metadata.notes[notes]': "o sona e ni: {notes}",

    'post.credits[authors]': "tan {authors between=' tan '}",
  },
} as const;
