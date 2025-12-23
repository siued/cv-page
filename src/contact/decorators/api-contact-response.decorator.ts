import { applyDecorators } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import {
  ContactDtoOneOf,
  ContactDtoDiscriminator,
  ContactExamples,
} from '../dto/contact.dto'

export function ApiContactResponse(status: number = 200) {
  return applyDecorators(
    ApiResponse({
      status,
      schema: {
        oneOf: ContactDtoOneOf,
        discriminator: ContactDtoDiscriminator,
      },
      examples: ContactExamples,
    }),
  )
}
