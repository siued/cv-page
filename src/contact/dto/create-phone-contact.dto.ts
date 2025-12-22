import { ApiProperty } from '@nestjs/swagger'
import { Equals, IsString } from 'class-validator'
import { ContactType } from '../contact.types'

export class CreatePhoneContactDto {
  @ApiProperty({ enum: [ContactType.PHONE], default: ContactType.PHONE })
  @Equals(ContactType.PHONE)
  type: ContactType.PHONE

  @ApiProperty()
  @IsString()
  phone: string
}

export const CreatePhoneContactExample = {
  type: ContactType.PHONE,
  phone: '+1234567890',
}
