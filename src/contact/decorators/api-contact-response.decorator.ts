import { applyDecorators } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import {
  ContactDtoOneOf,
  ContactDtoDiscriminator,
  ContactExamples,
} from '../dto/contact.dto'

export function ApiContactResponse(
  description: string = 'Contact response',
  status: number = 200,
) {
  return applyDecorators(
    ApiResponse({
      status,
      description,
      schema: {
        oneOf: ContactDtoOneOf,
        discriminator: ContactDtoDiscriminator,
      },
      examples: ContactExamples,
    }),
  )
}
