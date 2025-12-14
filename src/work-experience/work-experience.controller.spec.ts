import { Test, TestingModule } from '@nestjs/testing'
import { WorkExperienceController } from './work-experience.controller'
import { WorkExperienceService } from './work-experience.service'
import { getModelToken } from '@nestjs/mongoose'

describe('WorkExperienceController', () => {
  let controller: WorkExperienceController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkExperienceController],
      providers: [
        WorkExperienceService,
        {
          provide: getModelToken('WorkExperience'),
          useValue: {
            // mock model methods as needed
            find: jest.fn(),
            create: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
          },
        },
      ],
    }).compile()

    controller = module.get<WorkExperienceController>(WorkExperienceController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
