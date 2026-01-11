import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AppController } from './app.controller'
import { AppService } from './app.service'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile()

    app = moduleRef.createNestApplication()
    await app.init()
  })

  afterEach(async () => {
    await app.close()
  })

  it('GET /health returns OK', async () => {
    await request(app.getHttpServer()).get('/health').expect(200).expect('OK')
  })
})
