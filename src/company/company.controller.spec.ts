import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { CompanyController } from './company.controller'
import { CompanyService } from './company.service'
import { ApiKeyAuthGuard } from '../common/guards/api-key-auth.guard'
import { CompanyDocument } from './company.schema'
import { CompanySortField } from './company.types'
import { SortOrder } from '../common/enums/sort-order.enum'

describe('CompanyController (validation & routing)', () => {
  let app: INestApplication
  let service: jest.Mocked<CompanyService>

  const companyId = '507f1f77bcf86cd799439011'
  const baseRoute = '/companies'
  const apiKey = 'test-api-key'
  const validCreatePayload = {
    name: 'NASA',
    website: 'https://nasa.gov',
    city: 'Groningen',
    country: 'NL',
  }

  const createCompanyDocument = (
    overrides: Partial<CompanyDocument> = {},
  ): CompanyDocument =>
    ({
      _id: { toString: () => companyId },
      name: 'NASA',
      website: 'https://nasa.gov',
      city: 'Groningen',
      country: 'NL',
      createdAt: new Date('2024-01-01T00:00:00.000Z'),
      updatedAt: new Date('2024-01-02T00:00:00.000Z'),
      ...overrides,
    }) as unknown as CompanyDocument

  const serializeCompany = (doc: CompanyDocument) => ({
    _id: doc._id.toString(),
    name: doc.name,
    website: doc.website,
    city: doc.city,
    country: doc.country,
    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
  })

  const withAuthHeader = (req: request.Test) =>
    req.set('Authorization', `Bearer ${apiKey}`)

  beforeEach(async () => {
    process.env.API_KEY = apiKey
    const moduleRef = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [
        {
          provide: CompanyService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
        ApiKeyAuthGuard,
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

    service = moduleRef.get(CompanyService) as jest.Mocked<CompanyService>
  })

  afterEach(async () => {
    await app.close()
  })

  describe('POST /company', () => {
    it('rejects invalid bodies before reaching the service', async () => {
      await withAuthHeader(request(app.getHttpServer()).post(baseRoute))
        .send({ city: 'Missing required fields' })
        .expect(400)

      expect(service.create).not.toHaveBeenCalled()
    })

    it('accepts valid payloads and forwards them to the service', async () => {
      const company = createCompanyDocument()
      service.create.mockResolvedValue(company)

      const response = await withAuthHeader(
        request(app.getHttpServer()).post(baseRoute),
      )
        .send(validCreatePayload)
        .expect(201)

      expect(response.body).toEqual(serializeCompany(company))
      expect(service.create).toHaveBeenCalledWith(validCreatePayload)
    })
  })

  describe('GET /company', () => {
    it('enforces query validation rules', async () => {
      await request(app.getHttpServer())
        .get(baseRoute)
        .query({ limit: '0' })
        .expect(400)

      expect(service.findAll).not.toHaveBeenCalled()
    })

    it('transforms query params before calling the service', async () => {
      const company = createCompanyDocument()
      service.findAll.mockResolvedValue([company])

      const response = await request(app.getHttpServer())
        .get(baseRoute)
        .query({
          offset: '5',
          limit: '2',
          sortBy: CompanySortField.City,
          sortOrder: SortOrder.Asc,
        })
        .expect(200)

      expect(response.body).toEqual([serializeCompany(company)])
      expect(service.findAll).toHaveBeenCalledWith(
        expect.objectContaining({
          offset: 5,
          limit: 2,
          sortBy: CompanySortField.City,
          sortOrder: SortOrder.Asc,
        }),
      )
    })
  })

  describe('GET /company/:id', () => {
    it('rejects non ObjectId params early', async () => {
      await request(app.getHttpServer())
        .get(`${baseRoute}/not-an-id`)
        .expect(400)

      expect(service.findOne).not.toHaveBeenCalled()
    })

    it('returns mapped data for valid ids', async () => {
      const company = createCompanyDocument()
      service.findOne.mockResolvedValue(company)

      const response = await request(app.getHttpServer())
        .get(`${baseRoute}/${companyId}`)
        .expect(200)

      expect(response.body).toEqual(serializeCompany(company))
      expect(service.findOne).toHaveBeenCalledWith(companyId)
    })
  })

  describe('PATCH /company/:id', () => {
    it('validates incoming bodies', async () => {
      await withAuthHeader(
        request(app.getHttpServer()).patch(`${baseRoute}/${companyId}`),
      )
        .send({ country: 'NLD' })
        .expect(400)

      expect(service.update).not.toHaveBeenCalled()
    })

    it('forwards validated bodies to the service', async () => {
      const updatePayload = { city: 'Houston' }
      const updatedCompany = createCompanyDocument({ city: updatePayload.city })
      service.update.mockResolvedValue(updatedCompany)

      const response = await withAuthHeader(
        request(app.getHttpServer()).patch(`${baseRoute}/${companyId}`),
      )
        .send(updatePayload)
        .expect(200)

      expect(response.body).toEqual(serializeCompany(updatedCompany))
      expect(service.update).toHaveBeenCalledWith(companyId, updatePayload)
    })
  })

  describe('DELETE /company/:id', () => {
    it('calls remove on the service when the id is valid', async () => {
      const company = createCompanyDocument()
      service.remove.mockResolvedValue(company)

      const response = await withAuthHeader(
        request(app.getHttpServer()).delete(`${baseRoute}/${companyId}`),
      ).expect(200)

      expect(response.body).toEqual(serializeCompany(company))
      expect(service.remove).toHaveBeenCalledWith(companyId)
    })
  })
})
