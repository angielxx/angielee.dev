export type Lang = 'ko' | 'en'
export const SUPPORTED_LANGS: Lang[] = ['ko', 'en']
export const DEFAULT_LANG: Lang = 'ko'

export function isValidLang(lang: string): lang is Lang {
  return SUPPORTED_LANGS.includes(lang as Lang)
}

export function getLangFromPathname(pathname: string): Lang {
  const seg = pathname.split('/')[1]
  return isValidLang(seg) ? seg : DEFAULT_LANG
}
