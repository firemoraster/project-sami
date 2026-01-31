export default defineI18nConfig(async () => {
  const en = await import('@/locales/en.json')
  const ua = await import('@/locales/ua.json')

  return {
    legacy: false,
    locale: 'ua',
    fallbackLocale: 'ua',
    messages: { en, ua }
  }
})
