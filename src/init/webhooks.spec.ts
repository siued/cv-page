import addWebhooks from './webhooks'
import { OpenAPIObject } from '@nestjs/swagger'

describe('addWebhooks', () => {
  it('adds a webhooks property with OAS 3.1.0 structure', () => {
    const doc: OpenAPIObject = {
      openapi: '3.1.0',
      info: { title: '', version: '' },
      paths: {},
    }
    const result = addWebhooks(doc)
    const webhooks = (result as any).webhooks
    expect(webhooks).toBeDefined()
    expect(typeof webhooks).toBe('object')
  })
})
