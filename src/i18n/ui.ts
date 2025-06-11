export const data = {
  en: {
    'nav.all': "All",
    'nav.collections': "Collections",
    'nav.tags': "Tags",
    'nav.authors': "Authors",
    'nav.adaptations': "Adaptations",
    'nav.random': "Random",
    'nav.add': "Add",

    'nav.wasona': "Course",
    'nav.library': "Library",
    'nav.sinkulupu': "News",
    'nav.mapona': "Discord",
    'nav.ponala': "More",


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
    'nav.all': "lipu",
    'nav.collections': "poki",
    'nav.tags': "kulupu",
    'nav.authors': "jan",
    'nav.adaptations': "tan",
    'nav.random': "ante",
    'nav.add': "sin",
  },
} as const;
