import { Test, TestingModule } from '@nestjs/testing'
import { CompanyService } from './company.service'
import { getModelToken } from '@nestjs/mongoose'

describe('CompanyService', () => {
  let service: CompanyService
  let companyModel: {
    create: jest.Mock
    find: jest.Mock
    findById: jest.Mock
    findByIdAndUpdate: jest.Mock
    findByIdAndDelete: jest.Mock
    countDocuments: jest.Mock
  }

  beforeEach(async () => {
    const modelMock = {
      create: jest.fn(),
      find: jest.fn(),
      findById: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      findByIdAndDelete: jest.fn(),
      countDocuments: jest.fn(),
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyService,
        {
          provide: getModelToken('Company'),
          useValue: modelMock,
        },
      ],
    }).compile()
    service = module.get<CompanyService>(CompanyService)
    companyModel = module.get(getModelToken('Company'))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    it('should call model.create with dto', async () => {
      const dto = { name: 'Test' }
      const doc = { _id: 'id', ...dto }
      companyModel.create.mockResolvedValue(doc)
      const result = await service.create(dto as never)
      expect(companyModel.create).toHaveBeenCalledWith(dto)
      expect(result).toBe(doc)
    })
  })

  describe('findAll', () => {
    it('should return items and total', async () => {
      const docs = [{ _id: 'id1' }, { _id: 'id2' }]
      const limitMock = jest.fn().mockResolvedValue(docs)
      const skipMock = jest.fn().mockReturnValue({ limit: limitMock })
      const sortMock = jest.fn().mockReturnValue({ skip: skipMock })
      companyModel.find.mockReturnValue({ sort: sortMock } as any)
      companyModel.countDocuments.mockResolvedValue(2)
      const result = await service.findAll({
        offset: 0,
        limit: 2,
        sortBy: 'name',
        sortOrder: 'asc',
      } as never)
      expect(result).toEqual({ items: docs, total: 2 })
    })
  })

  describe('findOne', () => {
    it('should return company if found', async () => {
      const doc = { _id: 'id' }
      companyModel.findById.mockResolvedValue(doc)
      const result = await service.findOne('id')
      expect(companyModel.findById).toHaveBeenCalledWith('id')
      expect(result).toBe(doc)
    })
    it('should throw if not found', async () => {
      companyModel.findById.mockResolvedValue(null)
      await expect(service.findOne('id')).rejects.toThrow(
        'Company with ID id not found',
      )
    })
  })

  describe('update', () => {
    it('should return updated company if found', async () => {
      const doc = { _id: 'id', name: 'Updated' }
      companyModel.findByIdAndUpdate.mockResolvedValue(doc)
      const result = await service.update('id', { name: 'Updated' } as never)
      expect(companyModel.findByIdAndUpdate).toHaveBeenCalledWith(
        'id',
        { name: 'Updated' },
        { new: true },
      )
      expect(result).toBe(doc)
    })
    it('should throw if not found', async () => {
      companyModel.findByIdAndUpdate.mockResolvedValue(null)
      await expect(
        service.update('id', { name: 'Updated' } as never),
      ).rejects.toThrow('Company with ID id not found')
    })
  })

  describe('remove', () => {
    it('should return deleted company if found', async () => {
      const doc = { _id: 'id' }
      companyModel.findByIdAndDelete.mockResolvedValue(doc)
      const result = await service.remove('id')
      expect(companyModel.findByIdAndDelete).toHaveBeenCalledWith('id')
      expect(result).toBe(doc)
    })
    it('should throw if not found', async () => {
      companyModel.findByIdAndDelete.mockResolvedValue(null)
      await expect(service.remove('id')).rejects.toThrow(
        'Company with ID id not found',
      )
    })
  })
})
