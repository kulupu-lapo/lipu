# lipu.pona.la

The frontend for **poki Lapo**, a library of Toki Pona texts.

## Local development

```sh
npm i # install dependencies. use only on the first startup.
npm run dev # run the dev server
```

## Translating
Translation files are located in `src/i18n/` and `src/content/meta/`.   
Individual posts are not translated, only the site's UI.  
Any missing translations are automatically substituted with their version in the `defaultLang` (currently `en`)

### Translating the home page or footer
Large chunks of text such as on the home page and in the footer are stored as markdown files in `src/content/meta/[language]-[filename].md`.

These are rendered in as usual, with no fancy replacements.

### Translating parts of the UI
Most translations are located in files under `src/i18n/`. These are typescript files in the following format 
```ts
export const data = {
  langcode1: {
    'key1': "value1",
    'key2': "value2",
    // ...
  },
  // ...
} as const
```
The keys are unique strings that correspond to a specific part of the website.  
Their format isn't enforced by code, but for clarity they're always in the form `'section.part'`, `'section.part(variable)'`, `'section.part(variable1, variable2)'`, etc. Sometimes square brackets (`[]`) will be used instead of the regular ones (`()`), but the distinction isn't important for translation.  
It's important that the keys are written exactly the same as they are in the website's code, so don't edit them, only copy & paste a preexisting language if you're adding a new one. 

The value is what will get displayed on the website. This can be a simple string like `"Add an article"`, or it can include variables wrapped in curly brackets `"like {this}"`. The parts between the brackets in the key tells you what variables you can use.   
So for example, the value for `'nav.tags'` can't have any variables, but the value for `'author.header(name, count)'` can use `{name}` and `{count}` (eg `"{name} has written {count} posts"`, or just `"{name}"`)  
Some variables represent a list of values, for these we can specify what seperates the values by writing `{<variablename> between='<whatever seperates the values>'}`, for example we write 
`'foundpost.details[authors, date]': "by {authors between=', '}, {date}"` to say that we should seperate each author's name with a comma and a space.

To see what a specific key is referring to, and which variables can be lists, check the other translations. Generally, `i18n/add.ts` translates content on the [`/add`](https://lipu.pona.la/add/) page, `i18n/ui.ts` translates content about each individual entry, and `i18n/site.ts` translates content that appears on any other page.



### Adding a new language
To add a new language, edit the `languages` object in `/src/utils/i18n.ts` to add a new attribute with a BCP-47 language tag as the key and a human readable endonym as the value (will be displayed in the language selector) 
```ts
export const languages = {
  'en': "English",
  'tok': "toki pona",
  // add your language here
};
```

Now go into each file in `src/i18n/`, copy and paste the part `en: { ... }, ` part and rename the second `en` to match the tag you put above, so you have eg
```ts
// ...
  en: {
    'nav.all': "All",
    // ...
  }, 'zh-TW': {
    'nav.all': "All",
    // ...
  }
// ...
```
You can go through and translate all the values.

Finally, make a copy of all the files starting with `en-` in `src/content/meta/` and replace the `en` part with your language's tag, then translate the contents.

### Adding new translatable text
If you're adding any text the website that the user will see (that isn't directly from an entry in poki Lapo), you need to make it translatable:

First, ensure that a function `t` is defined in whatever `.astro` file you're editing/making. If it isn't, then you can add the following snippet in the frontmatter:
```ts
import { translator, getLangFromUrl } from "@/utils/i18n"
import { data } from "@/i18n/site";
const t = translator(data, getLangFromUrl(Astro.url))
```


## License

Code is licensed under the GNU General Public License Version 3.
