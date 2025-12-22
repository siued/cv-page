import { ApiProperty } from '@nestjs/swagger'
import { ContactType } from '../contact.types'
import { Equals, IsString } from 'class-validator'

export class PhoneContactDto {
  @ApiProperty({ type: String, description: 'MongoDB ObjectId' })
  _id: string

  @ApiProperty({ enum: [ContactType.PHONE] })
  @Equals(ContactType.PHONE)
  type: ContactType.PHONE

  @IsString()
  phone: string
}

export const PhoneContactExample: PhoneContactDto = {
  _id: '64b64c7f8f1a2b3c4d5e6f70',
  type: ContactType.PHONE,
  phone: '+1234567890',
}
