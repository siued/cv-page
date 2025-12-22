import { ApiProperty } from '@nestjs/swagger'
import { PaginatedResponseDto } from '../../common/dto/paginated-response.dto'
import {
  ContactDto,
  ContactDtoOneOf,
  ContactDtoDiscriminator,
  ContactExamples,
} from './contact.dto'

export class ContactPaginatedResponseDto extends PaginatedResponseDto<ContactDto> {
  @ApiProperty({
    type: 'array',
    items: {
      oneOf: ContactDtoOneOf,
      discriminator: ContactDtoDiscriminator,
    },
    examples: ContactExamples,
  })
  items: ContactDto[]
}
