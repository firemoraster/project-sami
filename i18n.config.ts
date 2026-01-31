export default defineI18nConfig(async () => {
  const en = await import('@/locales/en.json')
  const ua = await import('@/locales/ua.json')

  return {
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages: { en, ua }
  }
})
