import { INestApplication, ValidationPipe } from '@nestjs/common'
import request from 'supertest'
import { Test, TestingModule } from '@nestjs/testing'
import { ContactController } from './contact.controller'
import { ContactService } from './contact.service'
import { ContactType } from './contact.types'
import { ContactDocument } from './schema/contact.schema'

describe('ContactController (validation & routing)', () => {
  let app: INestApplication
  let service: jest.Mocked<ContactService>
  const contactId = '507f1f77bcf86cd799439011'
  const baseRoute = '/contacts'
  const apiKey = 'test-api-key'
  const validCreatePayload = {
    type: ContactType.EMAIL,
    email: 'test@example.com',
  }

  const createContactDocument = (overrides: Record<string, unknown> = {}) =>
    ({
      _id: { toString: () => contactId },
      type: ContactType.EMAIL,
      email: 'test@example.com',
      ...overrides,
    }) as unknown as ContactDocument

  const serializeContact = (doc: any) => ({
    _id: doc._id.toString(),
    type: doc.type,
    email: doc.email,
  })

  const withAuthHeader = (req: request.Test) =>
    req.set('Authorization', `Bearer ${apiKey}`)

  beforeEach(async () => {
    process.env.API_KEY = apiKey
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [ContactController],
      providers: [
        {
          provide: ContactService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
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
    service = moduleRef.get(ContactService)
  })

  afterEach(async () => {
    await app.close()
  })

  describe('POST /contacts', () => {
    it('accepts valid payloads and forwards them to the service', async () => {
      const contact = createContactDocument()
      service.create.mockResolvedValue(contact)
      const response = await withAuthHeader(
        request(app.getHttpServer()).post(baseRoute),
      )
        .send(validCreatePayload)
        .expect(201)
      expect(response.body).toEqual(serializeContact(contact))
      expect(service.create).toHaveBeenCalledWith(validCreatePayload)
    })
  })

  describe('GET /contacts', () => {
    it('enforces query validation rules', async () => {
      await request(app.getHttpServer())
        .get(baseRoute)
        .query({ limit: '0' })
        .expect(400)
      expect(service.findAll).not.toHaveBeenCalled()
    })
    it('transforms query params before calling the service', async () => {
      const contact = createContactDocument()
      service.findAll.mockResolvedValue({ items: [contact], total: 1 })
      const response = await request(app.getHttpServer())
        .get(baseRoute)
        .query({ offset: '5', limit: '2', type: ContactType.EMAIL })
        .expect(200)
      expect(response.body).toEqual({
        items: [serializeContact(contact)],
        total: 1,
      })
      expect(service.findAll).toHaveBeenCalledWith(
        expect.objectContaining({
          offset: 5,
          limit: 2,
          type: ContactType.EMAIL,
        }),
      )
    })
  })

  describe('GET /contacts/:id', () => {
    it('rejects non ObjectId params early', async () => {
      await request(app.getHttpServer())
        .get(`${baseRoute}/not-an-id`)
        .expect(400)
      expect(service.findOne).not.toHaveBeenCalled()
    })
    it('returns mapped data for valid ids', async () => {
      const contact = createContactDocument()
      service.findOne.mockResolvedValue(contact)
      const response = await request(app.getHttpServer())
        .get(`${baseRoute}/${contactId}`)
        .expect(200)
      expect(response.body).toEqual(serializeContact(contact))
      expect(service.findOne).toHaveBeenCalledWith(contactId)
    })
  })

  describe('PATCH /contacts/:id', () => {
    it('validates incoming bodies', async () => {
      await withAuthHeader(
        request(app.getHttpServer()).patch(`${baseRoute}/${contactId}`),
      )
        .send({ foo: 'bar' })
        .expect(400)
      expect(service.update).not.toHaveBeenCalled()
    })
    it('forwards validated bodies to the service', async () => {
      const updatePayload = {
        type: ContactType.EMAIL,
        email: 'updated@example.com',
      }
      const updatedContact = createContactDocument({
        email: updatePayload.email,
      })
      service.update.mockResolvedValue(updatedContact)
      const response = await withAuthHeader(
        request(app.getHttpServer()).patch(`${baseRoute}/${contactId}`),
      )
        .send(updatePayload)
        .expect(200)
      expect(response.body).toEqual(serializeContact(updatedContact))
      expect(service.update).toHaveBeenCalledWith(contactId, updatePayload)
    })
  })

  describe('DELETE /contacts/:id', () => {
    it('calls remove on the service when the id is valid', async () => {
      const contact = createContactDocument()
      service.remove.mockResolvedValue(contact)
      const response = await withAuthHeader(
        request(app.getHttpServer()).delete(`${baseRoute}/${contactId}`),
      ).expect(200)
      expect(response.body).toEqual(serializeContact(contact))
      expect(service.remove).toHaveBeenCalledWith(contactId)
    })
  })
})
