import { applyDecorators, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiHeader, ApiResponse } from '@nestjs/swagger'
import { ApiKeyAuthGuard } from '../guards/api-key-auth.guard'

export function BearerAuth() {
  return applyDecorators(
    UseGuards(ApiKeyAuthGuard),
    ApiBearerAuth(),
    ApiHeader({
      name: 'Authorization',
      description: 'Bearer {API_KEY}',
    }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
  )
}
