import { ApiProperty } from '@nestjs/swagger'
import { ContactType } from '../contact.types'
import { Equals, IsString } from 'class-validator'

export class SocialMediaContactDto {
  @ApiProperty({
    example: '64b64c7f8f1a2b3c4d5e6f70',
  })
  @IsString()
  _id!: string

  @ApiProperty({
    enum: [ContactType.SOCIAL_MEDIA],
  })
  @Equals(ContactType.SOCIAL_MEDIA)
  type!: ContactType.SOCIAL_MEDIA

  @ApiProperty({ example: 'https://linkedin.com/example' })
  @IsString()
  url!: string
}

export const SocialMediaContactExample: SocialMediaContactDto = {
  _id: '64b64c7f8f1a2b3c4d5e6f70',
  type: ContactType.SOCIAL_MEDIA,
  url: 'https://linkedin.com/example',
}
