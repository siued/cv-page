import { ApiProperty } from '@nestjs/swagger'
import { ContactType } from '../contact.types'
import { Equals, IsString } from 'class-validator'

export class WebsiteContactDto {
  @ApiProperty({
    example: '64b64c7f8f1a2b3c4d5e6f70',
  })
  @IsString()
  _id!: string

  @ApiProperty({ enum: [ContactType.WEBSITE] })
  @Equals(ContactType.WEBSITE)
  type!: ContactType.WEBSITE

  @ApiProperty({ example: 'https://nasa.gov' })
  @IsString()
  url!: string
}

export const WebsiteContactExample: WebsiteContactDto = {
  _id: '64b64c7f8f1a2b3c4d5e6f70',
  type: ContactType.WEBSITE,
  url: 'https://nasa.gov',
}
