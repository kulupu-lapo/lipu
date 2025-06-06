export const languages = {
  en: 'English',
  tok: 'toki pona',
};
export const locales = Object.keys(languages);
export const defaultLang = 'en';

const i18n_prefixes = locales.map( locale => ({ locale: locale, prefix: locale }) ).concat({ locale: defaultLang, prefix: '' });

export async function getStaticLanguagePaths() {
  return i18n_prefixes.map(({locale, prefix}) => {
    return { params: { lang: prefix }, props: { lang: locale }, };
  });
}

export function internationaliseStaticPaths<T,E>(paths : {params: T, props: E}[]) : {params : T & {lang: string}, props: E & {lang: string}}[] {
    return paths.flatMap(({ params, props }) => 
        i18n_prefixes.map(({locale, prefix})=>({
            params: {
                lang: prefix,
                ...params
            },
            props: {
                lang: locale,
                ...props
            }
        }))
    )
} 