import { ui, defaultLang, type languages } from './ui';

export type Lang = keyof typeof languages;

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

export function getAlternateLang(lang: Lang): Lang {
  return lang === 'pt' ? 'en' : 'pt';
}

export function homePath(lang: Lang): string {
  return lang === defaultLang ? '/' : `/${lang}/`;
}

export function projectPath(lang: Lang, slug: string): string {
  return lang === defaultLang ? `/projetos/${slug}` : `/${lang}/projects/${slug}`;
}
