import { ApiProperty } from '@nestjs/swagger'
import { ContactType } from '../contact.types'
import { Equals, IsString, ValidateBy } from 'class-validator'
import { isValidEmail } from '../../util/string.util'

export class EmailContactDto {
  @ApiProperty({ type: String, description: 'MongoDB ObjectId' })
  _id: string

  @ApiProperty({ enum: [ContactType.EMAIL] })
  @Equals(ContactType.EMAIL)
  type: ContactType.EMAIL

  @IsString()
  @ValidateBy({
    name: 'isValidEmail',
    validator: {
      validate: (value: string) => isValidEmail(value),
      defaultMessage: () => 'email must be a valid email address',
    },
  })
  email: string
}

export const EmailContactExample: EmailContactDto = {
  _id: '64b64c7f8f1a2b3c4d5e6f70',
  type: ContactType.EMAIL,
  email: 'example@nasa.com',
}
