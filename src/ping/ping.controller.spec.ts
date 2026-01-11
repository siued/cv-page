import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { PingModule } from './ping.module'

describe('PingController (validation & routing)', () => {
  let app: INestApplication
  const baseRoute = '/ping'

  beforeEach(async () => {
    jest.useFakeTimers()
    global.fetch = jest.fn()
    const moduleRef = await Test.createTestingModule({
      imports: [PingModule],
    }).compile()

    app = moduleRef.createNestApplication()
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    await app.init()
  })

  afterEach(async () => {
    await app.close()
  })

  it('returns pong with timestamp for valid POST', async () => {
    const response = await request(app.getHttpServer())
      .post(baseRoute)
      .send({})
      .expect(201)
    expect(response.body).toHaveProperty('message', 'pong')
    expect(typeof response.body.timestamp).toBe('string')
    expect(() => new Date(response.body.timestamp)).not.toThrow()
  })

  it('returns pong and calls fetch if callbackUrl is valid', async () => {
    await request(app.getHttpServer())
      .post(baseRoute)
      .send({ callbackUrl: 'https://example.com/callback' })
      .expect(201)
    jest.runAllTimers()
    await Promise.resolve()
    expect(global.fetch).toHaveBeenCalledWith(
      'https://example.com/callback',
      expect.objectContaining({ method: 'POST' }),
    )
  })

  it('rejects invalid callbackUrl', async () => {
    await request(app.getHttpServer())
      .post(baseRoute)
      .send({ callbackUrl: 'not-a-url' })
      .expect(400)
    jest.runAllTimers()
    await Promise.resolve()
    expect(global.fetch).not.toHaveBeenCalled()
  })

  it('rejects extra fields', async () => {
    await request(app.getHttpServer())
      .post(baseRoute)
      .send({ foo: 'bar' })
      .expect(400)
  })
})
