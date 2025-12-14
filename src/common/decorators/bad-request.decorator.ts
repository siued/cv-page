import { applyDecorators } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'

export function ApiBadRequestResponse(description = 'Bad request') {
  return applyDecorators(
    ApiResponse({
      status: 400,
      description,
    }),
  )
}
