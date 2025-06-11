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
      <p>
        {foundpost.pre}[list of authors]
        {foundpost.mid}[post.date]
        {foundpost.post}
      </p>
    */
    'foundpost.pre': "by ",
    'foundpost.mid': ", ",
    'foundpost.post': "",

    // metadata section on individual post pages
    'metadata.container_title': "Details",

    'metadata.github.pre': "Edit on ",
    'metadata.github.github': "Github",
    'metadata.github.post': "",

    'metadata.description.pre': "Description: ",
    'metadata.description.post': "",

    'metadata.license.pre': "License: ",
    'metadata.license.post': "",

    'metadata.proofreaders.pre': "Proofreaders: ",
    'metadata.proofreaders.between': ", ",
    'metadata.proofreaders.post': "",

    'metadata.tags.pre': "Tags: ",
    'metadata.tags.post': "",

    'metadata.sources.pre': "Sources: ",
    'metadata.sources.post': "",

    'metadata.archives.pre': "Archives: ",
    'metadata.archives.post': "",

    'metadata.original.pre': "Original: ",
    'metadata.original.post': "",
    'metadata.originalauthors.pre': "by ",
    'metadata.originalauthors.between': ", ",
    'metadata.originalauthors.post': "",

    'metadata.notes.pre': "Notes:",
    'metadata.notes.post': "",

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
    'foundpost.pre': "",
    'foundpost.mid': " li sitelen e ni lon ",
    'foundpost.post': "",

    // metadata section on individual post pages
    'metadata.container_title': "sona pi lipu toki ni",

    'metadata.github.pre': "sina ken pona e ona kepeken",
    'metadata.github.github': "ilo poki Kita",
    'metadata.github.post': "",

    'metadata.description.pre': "ona li toki e ni: ",
    'metadata.description.post': "",

    'metadata.license.pre': "sina wile kepeken ona la, o kute e nasin",
    'metadata.license.post': "",

    'metadata.proofreaders.pre': "",
    'metadata.proofreaders.between': " en ",
    'metadata.proofreaders.post': " li pona e ona",

    'metadata.tags.pre': "kulupu toki la ona li ",
    'metadata.tags.post': "",

    'metadata.sources.pre': "sina ken lukin e ona lon lipu ",
    'metadata.sources.post': "",

    'metadata.archives.pre': "sina ken lukin e ona lon lipu ",
    'metadata.archives.post': " pi moli ala",

    'metadata.original.pre': "ona li tan toki ante. toki ante ni li ",
    'metadata.original.post': "",
    'metadata.originalauthors.pre': " li tan ",
    'metadata.originalauthors.between': " li tan ",
    'metadata.originalauthors.post': "",

    'metadata.notes.pre': "o sona e ni:",
    'metadata.notes.post': "",

  },
} as const;
