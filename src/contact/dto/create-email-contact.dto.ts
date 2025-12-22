import { ApiProperty } from '@nestjs/swagger'
import { Equals, IsString } from 'class-validator'
import { ContactType } from '../contact.types'

export class CreateEmailContactDto {
  @ApiProperty({ enum: [ContactType.EMAIL], default: ContactType.EMAIL })
  @Equals(ContactType.EMAIL)
  type: ContactType.EMAIL

  @ApiProperty()
  @IsString()
  email: string
}

export const CreateEmailContactExample = {
  type: ContactType.EMAIL,
  email: 'example@nasa.gov',
}
