import { Body, Controller, HttpStatus, Post } from '@nestjs/common'
import {
  ApiExtension,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger'
import { ApiTag } from '../app.types'
import { PongDto } from './dto/ping-response.dto'
import { sleep } from '../util/async.util'
import { PingRequestDto } from './dto/ping-request.dto'

@Controller('ping')
@ApiTags(ApiTag.App)
@ApiExtraModels(PongDto)
export class PingController {
  @Post()
  @ApiOperation({ summary: 'Standard ping-pong with optional callback' })
  @ApiExtension('x-callbacks', {
    pong: {
      '{$request.body#/callbackUrl}': {
        post: {
          summary: 'The pong response sent to your callback URL (if provided)',
          requestBody: {
            content: {
              'application/json': {
                schema: { $ref: getSchemaPath(PongDto) },
              },
            },
          },
          responses: {
            200: { description: 'Callback received' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'A pong response',
    type: PongDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid request payload',
  })
  async ping(@Body() body: PingRequestDto): Promise<PongDto> {
    if (body.callbackUrl) {
      // schedule a delayed calback if callbackUrl is provided
      const url = body.callbackUrl
      sleep(5000).then(() => {
        fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: 'pong',
            timestamp: new Date().toISOString(),
          }),
        })
      })
    }
    return { message: 'pong', timestamp: new Date().toISOString() }
  }
}
