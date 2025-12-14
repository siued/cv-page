import { Test, TestingModule } from '@nestjs/testing'
import { WorkExperienceService } from './work-experience.service'
import { getModelToken } from '@nestjs/mongoose'

describe('WorkExperienceService', () => {
  let service: WorkExperienceService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkExperienceService,
        {
          provide: getModelToken('WorkExperience'),
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

    service = module.get<WorkExperienceService>(WorkExperienceService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
