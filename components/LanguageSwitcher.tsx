"use client"
import { useEffect, useState } from 'react'
import { SUPPORTED_LOCALES, Locale } from '@/lib/i18n'
import { useRouter } from 'next/navigation'

export default function LanguageSwitcher() {
  const router = useRouter()
  const [locale, setLocale] = useState<Locale>('en')
  useEffect(() => {
    const cookieLocale = document.cookie.split(';').map(c => c.trim()).find(c => c.startsWith('locale='))?.split('=')[1]
    if (cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale as Locale)) {
      setLocale(cookieLocale as Locale)
    }
  }, [])

  async function changeLocale(newLocale: Locale) {
    setLocale(newLocale)
    await fetch('/api/locale', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({ locale: newLocale })
    })
    // Refresh to allow server components to pick up cookie
    router.refresh()
  }

  return (
    <select
      aria-label="Language"
      className="border rounded px-2 py-1 text-sm bg-white"
      value={locale}
      onChange={e => changeLocale(e.target.value as Locale)}
    >
      <option value="en">EN</option>
      <option value="am">AM</option>
      <option value="om">OM</option>
    </select>
  )
}
