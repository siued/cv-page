import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

export const APP_TAG_DESCRIPTION =
  'Application-level endpoints, including health checks and general information about the API.'

@Controller()
@ApiTags('App')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health')
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({
    status: 200,
    description: 'Service is healthy',
    type: String,
    example: 'OK',
  })
  @ApiResponse({ status: 503, description: 'Service is unavailable' })
  async getHealth(): Promise<string> {
    return this.appService.getHealth()
  }
}
