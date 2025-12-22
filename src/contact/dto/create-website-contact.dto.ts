import { ApiProperty } from '@nestjs/swagger'
import { Equals, IsString } from 'class-validator'
import { ContactType } from '../contact.types'

export class CreateWebsiteContactDto {
  @ApiProperty({ enum: [ContactType.WEBSITE], default: ContactType.WEBSITE })
  @Equals(ContactType.WEBSITE)
  type: ContactType.WEBSITE

  @ApiProperty()
  @IsString()
  address: string
}

export const CreateWebsiteContactExample = {
  type: ContactType.WEBSITE,
  url: 'https://nasa.gov',
}
