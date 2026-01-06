import { getSchemaPath, OpenAPIObject } from '@nestjs/swagger'
import { PongResponseDto } from '../ping/dto/ping-response.dto'

export default function addWebhooks(document: OpenAPIObject): OpenAPIObject {
  const webhooks = {
    pong: {
      post: {
        summary: 'Pong webhook',
        description: 'The pong response sent to a callback URL',
        requestBody: {
          content: {
            'application/json': {
              schema: { $ref: getSchemaPath(PongResponseDto) },
            },
          },
        },
        responses: {
          201: { description: 'Callback received' },
        },
      },
    },
  }
  // NestJS Swagger is still on OAS 3.0.0 which doesn't support webhooks,
  // they were added in OAS 3.1.0. So we need to use the cast here to add them.
  ;(document as any).webhooks = webhooks
  return document
}
