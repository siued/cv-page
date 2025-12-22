import { applyDecorators } from '@nestjs/common'
import { ApiBody } from '@nestjs/swagger'
import {
  CreateContactDtoOneOf,
  CreateContactDtoDiscriminator,
  CreateContactExamples,
} from '../dto/create-contact.dto'

export function ApiContactBody(description = 'Contact body') {
  return applyDecorators(
    ApiBody({
      schema: {
        oneOf: CreateContactDtoOneOf,
        discriminator: CreateContactDtoDiscriminator,
      },
      examples: CreateContactExamples,
      description,
    }),
  )
}
