import { isValidUrl, isIso3166Alpha2CountryCode } from './string.util'

describe('isValidUrl', () => {
  it('should return true for valid URLs', () => {
    expect(isValidUrl('https://example.com')).toBe(true)
    expect(isValidUrl('http://localhost:3000')).toBe(true)
    expect(isValidUrl('ftp://ftp.example.com')).toBe(true)
  })

  it('should return false for invalid URLs', () => {
    expect(isValidUrl('not a url')).toBe(false)
    expect(isValidUrl('www.example.com')).toBe(false)
    expect(isValidUrl('')).toBe(false)
  })
})

describe('isIso3166Alpha2CountryCode', () => {
  it('should return true for valid ISO 3166-1 alpha-2 codes', () => {
    expect(isIso3166Alpha2CountryCode('US')).toBe(true)
    expect(isIso3166Alpha2CountryCode('GB')).toBe(true)
    expect(isIso3166Alpha2CountryCode('DE')).toBe(true)
  })

  it('should return false for invalid codes', () => {
    expect(isIso3166Alpha2CountryCode('USA')).toBe(false)
    expect(isIso3166Alpha2CountryCode('ZZ')).toBe(false)
    expect(isIso3166Alpha2CountryCode('')).toBe(false)
  })
})
