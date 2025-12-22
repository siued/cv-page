import { ApiProperty } from '@nestjs/swagger'
import { Equals, IsString } from 'class-validator'
import { ContactType } from '../contact.types'

export class CreateSocialMediaContactDto {
  @ApiProperty({
    enum: [ContactType.SOCIAL_MEDIA],
    default: ContactType.SOCIAL_MEDIA,
  })
  @Equals(ContactType.SOCIAL_MEDIA)
  type: ContactType.SOCIAL_MEDIA

  @ApiProperty()
  @IsString()
  url: string
}

export const CreateSocialMediaContactExample = {
  type: ContactType.SOCIAL_MEDIA,
  url: 'https://linkedin.com/in/example',
}
