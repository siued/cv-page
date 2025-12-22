import { PartialType, ApiProperty, getSchemaPath } from '@nestjs/swagger'
import {
  CreateEmailContactDto,
  CreatePhoneContactDto,
  CreateSocialMediaContactDto,
  CreateWebsiteContactDto,
} from './create-contact.dto'
import { ContactType } from '../contact.types'
import { IsEnum } from 'class-validator'

export class UpdateEmailContactDto extends PartialType(CreateEmailContactDto) {
  @ApiProperty({ enum: [ContactType.EMAIL], default: ContactType.EMAIL })
  @IsEnum(ContactType)
  type: ContactType.EMAIL
}

export class UpdatePhoneContactDto extends PartialType(CreatePhoneContactDto) {}

export class UpdateSocialMediaContactDto extends PartialType(
  CreateSocialMediaContactDto,
) {}

export class UpdateWebsiteContactDto extends PartialType(
  CreateWebsiteContactDto,
) {}

export type UpdateContactDto =
  | UpdateEmailContactDto
  | UpdatePhoneContactDto
  | UpdateSocialMediaContactDto
  | UpdateWebsiteContactDto

export const UpdateContactDtoOneOf = [
  { $ref: getSchemaPath(UpdateEmailContactDto) },
  { $ref: getSchemaPath(UpdatePhoneContactDto) },
  { $ref: getSchemaPath(UpdateSocialMediaContactDto) },
  { $ref: getSchemaPath(UpdateWebsiteContactDto) },
]
