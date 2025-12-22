import { ApiProperty, getSchemaPath } from '@nestjs/swagger'
import { IsEnum, IsString } from 'class-validator'
import { ContactType } from '../contact.types'

export class CreateEmailContactDto {
  @ApiProperty({ enum: [ContactType.EMAIL], default: ContactType.EMAIL })
  @IsEnum(ContactType)
  type: ContactType.EMAIL

  @ApiProperty()
  @IsString()
  email: string
}

export class CreatePhoneContactDto {
  @ApiProperty({ enum: [ContactType.PHONE], default: ContactType.PHONE })
  @IsEnum(ContactType)
  type: ContactType.PHONE

  @ApiProperty()
  @IsString()
  phone: string
}

export class CreateSocialMediaContactDto {
  @ApiProperty({
    enum: [ContactType.SOCIAL_MEDIA],
    default: ContactType.SOCIAL_MEDIA,
  })
  @IsEnum(ContactType)
  type: ContactType.SOCIAL_MEDIA

  @ApiProperty()
  @IsString()
  url: string
}

export class CreateWebsiteContactDto {
  @ApiProperty({ enum: [ContactType.WEBSITE], default: ContactType.WEBSITE })
  @IsEnum(ContactType)
  type: ContactType.WEBSITE

  @ApiProperty()
  @IsString()
  address: string
}

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
    value: {
      type: ContactType.EMAIL,
      email: 'example@nasa.gov',
    },
  },
  phone: {
    summary: 'Phone',
    value: {
      type: ContactType.PHONE,
      phone: '+1234567890',
    },
  },
  socialMedia: {
    summary: 'Social Media',
    value: {
      type: ContactType.SOCIAL_MEDIA,
      url: 'https://linkedin.com/in/example',
    },
  },
  website: {
    summary: 'Website',
    value: {
      type: ContactType.WEBSITE,
      url: 'https://nasa.gov',
    },
  },
}
