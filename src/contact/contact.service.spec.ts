import { Test, TestingModule } from '@nestjs/testing'
import { ContactService } from './contact.service'
import { getModelToken } from '@nestjs/mongoose'

describe('ContactService', () => {
  let service: ContactService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactService,
        {
          provide: getModelToken('Contact'),
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
            countDocuments: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<ContactService>(ContactService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
