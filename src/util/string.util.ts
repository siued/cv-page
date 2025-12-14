const countries = require('i18n-iso-countries')
countries.registerLocale(require('i18n-iso-countries/langs/en.json'))

export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export function isIso3166Alpha2CountryCode(code: string): boolean {
  return code in countries.getNames('en', { select: 'official' })
}
