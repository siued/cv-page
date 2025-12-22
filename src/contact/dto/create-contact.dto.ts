import { getSchemaPath } from '@nestjs/swagger'
import { ContactType } from '../contact.types'
import {
  CreateEmailContactDto,
  CreateEmailContactExample,
} from './create-email-contact.dto'
import {
  CreatePhoneContactDto,
  CreatePhoneContactExample,
} from './create-phone-contact.dto'
import {
  CreateSocialMediaContactDto,
  CreateSocialMediaContactExample,
} from './create-social-media-contact.dto'
import {
  CreateWebsiteContactDto,
  CreateWebsiteContactExample,
} from './create-website-contact.dto'

export type CreateContactDto =
  | CreateEmailContactDto
  | CreatePhoneContactDto
  | CreateSocialMediaContactDto
  | CreateWebsiteContactDto

export const CreateContactDtoOneOf = [
  { $ref: getSchemaPath(CreateEmailContactDto) },
  { $ref: getSchemaPath(CreatePhoneContactDto) },
  { $ref: getSchemaPath(CreateSocialMediaContactDto) },
  { $ref: getSchemaPath(CreateWebsiteContactDto) },
]

export const CreateContactDtoDiscriminator = {
  propertyName: 'type',
  mapping: {
    [ContactType.EMAIL]: getSchemaPath(CreateEmailContactDto),
    [ContactType.PHONE]: getSchemaPath(CreatePhoneContactDto),
    [ContactType.SOCIAL_MEDIA]: getSchemaPath(CreateSocialMediaContactDto),
    [ContactType.WEBSITE]: getSchemaPath(CreateWebsiteContactDto),
  },
}

export const CreateContactExamples = {
  email: {
    summary: 'Email',
    value: CreateEmailContactExample,
  },
  phone: {
    summary: 'Phone',
    value: CreatePhoneContactExample,
  },
  socialMedia: {
    summary: 'Social Media',
    value: CreateSocialMediaContactExample,
  },
  website: {
    summary: 'Website',
    value: CreateWebsiteContactExample,
  },
}
