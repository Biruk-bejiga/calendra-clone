import { cookies } from 'next/headers'
import { SUPPORTED_LOCALES, DEFAULT_LOCALE, Locale } from './i18n'

export async function detectLocaleServer(): Promise<Locale> {
  try {
    const c = await cookies()
    const stored = c.get('locale')?.value as Locale | undefined
    if (stored && SUPPORTED_LOCALES.includes(stored)) return stored
  } catch {}
  return DEFAULT_LOCALE
}
