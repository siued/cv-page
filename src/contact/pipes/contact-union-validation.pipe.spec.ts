import { BadRequestException, ArgumentMetadata } from '@nestjs/common'
import { ContactUnionValidationPipe } from './contact-union-validation.pipe'
import { CreateEmailContactDto } from '../dto/create-email-contact.dto'
import { CreatePhoneContactDto } from '../dto/create-phone-contact.dto'
import { CreateSocialMediaContactDto } from '../dto/create-social-media-contact.dto'
import { CreateWebsiteContactDto } from '../dto/create-website-contact.dto'
import { ContactType } from '../contact.types'

describe('ContactUnionValidationPipe', () => {
  let pipe: ContactUnionValidationPipe

  beforeEach(() => {
    pipe = new ContactUnionValidationPipe()
  })

  const metadata: ArgumentMetadata = { type: 'body' }

  it('should return instance for valid email contact', () => {
    const value = { type: ContactType.EMAIL, email: 'test@example.com' }
    const result = pipe.transform(value, metadata)
    expect(result).toBeInstanceOf(CreateEmailContactDto)
    if (result instanceof CreateEmailContactDto) {
      expect(result.email).toBe('test@example.com')
    } else {
      throw new Error('Result is not CreateEmailContactDto')
    }
  })

  it('should return instance for valid phone contact', () => {
    const value = { type: ContactType.PHONE, phone: '+1234567890' }
    const result = pipe.transform(value, metadata)
    expect(result).toBeInstanceOf(CreatePhoneContactDto)
    if (result instanceof CreatePhoneContactDto) {
      expect(result.phone).toBe('+1234567890')
    } else {
      throw new Error('Result is not CreatePhoneContactDto')
    }
  })

  it('should return instance for valid social media contact', () => {
    const value = {
      type: ContactType.SOCIAL_MEDIA,
      url: 'https://linkedin.com/in/test',
    }
    const result = pipe.transform(value, metadata)
    expect(result).toBeInstanceOf(CreateSocialMediaContactDto)
    if (result instanceof CreateSocialMediaContactDto) {
      expect(result.url).toBe('https://linkedin.com/in/test')
    } else {
      throw new Error('Result is not CreateSocialMediaContactDto')
    }
  })

  it('should return instance for valid website contact', () => {
    const value = { type: ContactType.WEBSITE, address: 'https://example.com' }
    const result = pipe.transform(value, metadata)
    expect(result).toBeInstanceOf(CreateWebsiteContactDto)
    if (result instanceof CreateWebsiteContactDto) {
      expect(result.address).toBe('https://example.com')
    } else {
      throw new Error('Result is not CreateWebsiteContactDto')
    }
  })

  it('should throw BadRequestException for invalid contact', () => {
    const value = { type: 'invalid', foo: 'bar' }
    expect(() => pipe.transform(value, metadata)).toThrow(BadRequestException)
  })

  it('should throw BadRequestException for non-object value', () => {
    const value = 'this is a string'
    expect(() => pipe.transform(value, metadata)).toThrow(BadRequestException)
  })

  it('should throw BadRequestException for invalid type-specific fields', () => {
    const value = { type: ContactType.EMAIL, phone: '+1234567890' } // Invalid field for email type
    expect(() => pipe.transform(value, metadata)).toThrow(BadRequestException)
  })
})
