import { NextRequest, NextResponse } from 'next/server'
import { SUPPORTED_LANGS, DEFAULT_LANG, isValidLang, type Lang } from '@/lib/i18n'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const hasLang = SUPPORTED_LANGS.some(
    (l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`
  )
  if (hasLang) return NextResponse.next()

  const cookieLang = req.cookies.get('preferred-lang')?.value
  const acceptLang = req.headers.get('accept-language') ?? ''

  let lang: Lang = DEFAULT_LANG
  if (cookieLang && isValidLang(cookieLang)) {
    lang = cookieLang
  } else if (acceptLang.toLowerCase().startsWith('en')) {
    lang = 'en'
  }

  const url = req.nextUrl.clone()
  url.pathname = `/${lang}${pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon\\.ico|opengraph-image|robots\\.txt|sitemap\\.xml).*)'],
}
