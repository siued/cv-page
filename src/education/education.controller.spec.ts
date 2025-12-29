import { Test, TestingModule } from '@nestjs/testing'
import { EducationController } from './education.controller'
import { EducationService } from './education.service'
import { getModelToken } from '@nestjs/mongoose'

describe('EducationController', () => {
  let controller: EducationController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EducationController],
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

    controller = module.get<EducationController>(EducationController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
