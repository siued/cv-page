import { Test, TestingModule } from '@nestjs/testing'
import { ContactService } from './contact.service'
import { getModelToken } from '@nestjs/mongoose'
import { ContactType } from './contact.types'

describe('ContactService', () => {
  let service: ContactService
  let contactModel: {
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
        ContactService,
        {
          provide: getModelToken('Contact'),
          useValue: modelMock,
        },
      ],
    }).compile()
    service = module.get<ContactService>(ContactService)
    contactModel = module.get(getModelToken('Contact'))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    it('should call model.create with dto', async () => {
      const dto = { type: ContactType.EMAIL, email: 'test@example.com' }
      const doc = { _id: 'id', ...dto }
      contactModel.create.mockResolvedValue(doc)
      const result = await service.create(dto as never)
      expect(contactModel.create).toHaveBeenCalledWith(dto)
      expect(result).toBe(doc)
    })
  })

  describe('findAll', () => {
    it('should return items and total', async () => {
      const docs = [{ _id: 'id1' }, { _id: 'id2' }]
      const limitMock = jest.fn().mockResolvedValue(docs)
      const skipMock = jest.fn().mockReturnValue({ limit: limitMock })
      contactModel.find.mockReturnValue({ skip: skipMock } as any)
      contactModel.countDocuments.mockResolvedValue(2)
      const result = await service.findAll({
        offset: 0,
        limit: 2,
        type: ContactType.EMAIL,
      } as never)
      expect(result).toEqual({ items: docs, total: 2 })
    })
  })

  describe('findOne', () => {
    it('should return contact if found', async () => {
      const doc = { _id: 'id' }
      contactModel.findById.mockResolvedValue(doc)
      const result = await service.findOne('id')
      expect(contactModel.findById).toHaveBeenCalledWith('id')
      expect(result).toBe(doc)
    })
    it('should throw if not found', async () => {
      contactModel.findById.mockResolvedValue(null)
      await expect(service.findOne('id')).rejects.toThrow(
        'Contact with ID id not found',
      )
    })
  })

  describe('update', () => {
    it('should return updated contact if found', async () => {
      const doc = { _id: 'id', type: ContactType.EMAIL }
      contactModel.findByIdAndUpdate.mockResolvedValue(doc)
      const result = await service.update('id', {
        type: ContactType.EMAIL,
      } as never)
      expect(contactModel.findByIdAndUpdate).toHaveBeenCalledWith(
        'id',
        { type: ContactType.EMAIL },
        { new: true },
      )
      expect(result).toBe(doc)
    })
    it('should throw if not found', async () => {
      contactModel.findByIdAndUpdate.mockResolvedValue(null)
      await expect(
        service.update('id', { type: ContactType.EMAIL } as never),
      ).rejects.toThrow('Contact with ID id not found')
    })
  })

  describe('remove', () => {
    it('should return deleted contact if found', async () => {
      const doc = { _id: 'id' }
      contactModel.findByIdAndDelete.mockResolvedValue(doc)
      const result = await service.remove('id')
      expect(contactModel.findByIdAndDelete).toHaveBeenCalledWith('id')
      expect(result).toBe(doc)
    })
    it('should throw if not found', async () => {
      contactModel.findByIdAndDelete.mockResolvedValue(null)
      await expect(service.remove('id')).rejects.toThrow(
        'Contact with ID id not found',
      )
    })
  })
})
