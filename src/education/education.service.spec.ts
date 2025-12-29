import { Test, TestingModule } from '@nestjs/testing'
import { EducationService } from './education.service'
import { getModelToken } from '@nestjs/mongoose'

describe('EducationService', () => {
  let service: EducationService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EducationService,
        {
          provide: getModelToken('Education'),
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

    service = module.get<EducationService>(EducationService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
