import { NextResponse } from 'next/server'
import { SUPPORTED_LOCALES, Locale } from '@/lib/i18n'

export async function POST(req: Request) {
  try {
    const { locale } = await req.json() as { locale?: string }
    if (!locale || !SUPPORTED_LOCALES.includes(locale as Locale)) {
      return NextResponse.json({ error:'Unsupported locale' }, { status: 400 })
    }
    const res = NextResponse.json({ ok:true })
    res.cookies.set('locale', locale, { path:'/', maxAge: 60*60*24*365 })
    return res
  } catch (e:any) {
    return NextResponse.json({ error: e.message || 'Bad Request' }, { status: 400 })
  }
}
