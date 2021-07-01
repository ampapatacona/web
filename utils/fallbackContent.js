export const fallbackContent = (
  content,
  field,
  currentLocale = 'es' // this.$i18n.locale
) => {
  if (!content || !content.translations || content.translations.length === 0) {
    return ''
  }

  const availableContent = content.translations.find(
    (tr) => tr.language === currentLocale
  )[field]

  if (availableContent && availableContent.length > 0) {
    // console.log('availableContent', availableContent)
    return availableContent
  }

  const availableLocales = ['es', 'ca'] // this.$i18n.availableLocales

  for (const locale of availableLocales) {
    const contentFallback = content.translations.find(
      (tr) => tr.language === locale
    )[field]
    if (contentFallback && contentFallback.length > 0) {
      //   console.log('contentFallback', contentFallback)
      return contentFallback
    }
  }
}
