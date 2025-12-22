import { getSchemaPath } from '@nestjs/swagger'
import { ContactType } from '../contact.types'
import { EmailContactDto, EmailContactExample } from './email-contact.dto'
import { PhoneContactDto, PhoneContactExample } from './phone-contact.dto'
import {
  SocialMediaContactDto,
  SocialMediaContactExample,
} from './social-media-contact.dto'
import { WebsiteContactDto, WebsiteContactExample } from './website-contact.dto'

export type ContactDto =
  | EmailContactDto
  | PhoneContactDto
  | SocialMediaContactDto
  | WebsiteContactDto

/**
 * Array of all contact DTO schemas for Swagger oneOf usage
 */
export const ContactDtoOneOf = [
  { $ref: getSchemaPath(EmailContactDto) },
  { $ref: getSchemaPath(PhoneContactDto) },
  { $ref: getSchemaPath(SocialMediaContactDto) },
  { $ref: getSchemaPath(WebsiteContactDto) },
]

/**
 * Discriminator mapping for ContactDto based on the 'type' property for Swagger
 */
export const ContactDtoDiscriminator = {
  propertyName: 'type',
  mapping: {
    [ContactType.EMAIL]: getSchemaPath(EmailContactDto),
    [ContactType.PHONE]: getSchemaPath(PhoneContactDto),
    [ContactType.SOCIAL_MEDIA]: getSchemaPath(SocialMediaContactDto),
    [ContactType.WEBSITE]: getSchemaPath(WebsiteContactDto),
  },
}

/**
 * Examples for each contact type for Swagger documentation. To be used
 * in @ApiBody
 */
export const ContactExamples = {
  email: {
    summary: 'Email',
    value: EmailContactExample,
  },
  phone: {
    summary: 'Phone',
    value: PhoneContactExample,
  },
  social_media: {
    summary: 'Social Media',
    value: SocialMediaContactExample,
  },
  website: {
    summary: 'Website',
    value: WebsiteContactExample,
  },
}
