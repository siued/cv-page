import {
  isValidUrl,
  isIso3166Alpha2CountryCode,
  isValidEmail,
} from './string.util'

describe('string.util', () => {
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

  describe('isValidEmail', () => {
    it('should return true for valid email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true)
      expect(isValidEmail('user.name+tag+sorting@example.com')).toBe(true)
      expect(isValidEmail('user_name@example.co.uk')).toBe(true)
    })

    it('should return false for invalid email addresses', () => {
      expect(isValidEmail('plainaddress')).toBe(false)
      expect(isValidEmail('@missingusername.com')).toBe(false)
      expect(isValidEmail('username@.com')).toBe(false)
    })
  })
})
