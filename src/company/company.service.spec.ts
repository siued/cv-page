import { Test, TestingModule } from '@nestjs/testing'
import { CompanyService } from './company.service'
import { getModelToken } from '@nestjs/mongoose'

describe('CompanyService', () => {
  let service: CompanyService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyService,
        {
          provide: getModelToken('Company'),
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<CompanyService>(CompanyService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
