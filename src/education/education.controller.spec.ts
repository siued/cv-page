import { Test, TestingModule } from '@nestjs/testing'
import { EducationController } from './education.controller'
import { EducationService } from './education.service'
import mongoose from 'mongoose'
import { EducationDto } from './dto/education.dto'
import { EducationLevel } from './entities/education.entity'
import { UpdateEducationDto } from './dto/update-education.dto'
import {
  EducationQueryDto,
  EducationSortField,
} from './dto/education-query.dto'
import { SortOrder } from '../common/enums/sort-order.enum'

describe('EducationController', () => {
  let controller: EducationController
  let service: jest.Mocked<EducationService>

  const mockEducation = {
    _id: new mongoose.Types.ObjectId('507f1f77bcf86cd799439012'),
    company: new mongoose.Types.ObjectId('507f1f77bcf86cd799439012'),
    level: EducationLevel.Bachelor,
    fieldOfStudy: 'Computer Science',
    eqfEquivalent: 6,
    startDate: new Date('2020-01-01'),
    endDate: new Date('2023-01-01'),
    durationYears: 3,
    gpa: 4.0,
    thesisTitle: 'AI Thesis',
    description: 'desc',
    extracurriculars: ['club'],
    createdAt: new Date('2020-01-01'),
    updatedAt: new Date('2023-01-01'),
  }

  const mockEducationDto: EducationDto = {
    ...mockEducation,
    _id: mockEducation._id.toString(),
    company: mockEducation.company.toString(),
  }

  const mockCreateEducationDto = {
    ...mockEducation,
    company: mockEducation.company,
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EducationController],
      providers: [
        {
          provide: EducationService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockEducation),
            findAll: jest
              .fn()
              .mockResolvedValue({ items: [mockEducation], total: 1 }),
            findOne: jest.fn().mockResolvedValue(mockEducation),
            update: jest.fn().mockResolvedValue(mockEducation),
            remove: jest.fn().mockResolvedValue(mockEducation),
          },
        },
      ],
    }).compile()

    controller = module.get<EducationController>(EducationController)
    service = module.get(EducationService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should create an education', async () => {
    // Cast to any to bypass strict DTO typing for test
    const result = await controller.create(mockCreateEducationDto as any)
    expect(service.create).toHaveBeenCalledWith(mockCreateEducationDto as any)
    expect(result).toMatchObject({
      startDate: mockCreateEducationDto.startDate,
    })
  })

  it('should list all educations', async () => {
    const query: EducationQueryDto = {
      sortBy: EducationSortField.StartDate,
      sortOrder: SortOrder.Desc,
      offset: 0,
      limit: 10,
    }
    const result = await controller.findAll(query)
    expect(service.findAll).toHaveBeenCalled()
    expect(result.items[0]).toMatchObject({ _id: mockEducation._id.toString() })
    expect(result.total).toBe(1)
  })

  it('should get one education', async () => {
    const result = await controller.findOne(mockEducation._id.toString())
    expect(service.findOne).toHaveBeenCalledWith(mockEducation._id.toString())
    expect(result).toMatchObject({ _id: mockEducation._id.toString() })
  })

  it('should update an education', async () => {
    const dto: UpdateEducationDto = { fieldOfStudy: 'Math' }
    const result = await controller.update(mockEducation._id.toString(), dto)
    expect(service.update).toHaveBeenCalledWith(
      mockEducation._id.toString(),
      dto,
    )
    expect(result).toMatchObject({ _id: mockEducation._id.toString() })
  })

  it('should remove an education', async () => {
    const result = await controller.remove(mockEducation._id.toString())
    expect(service.remove).toHaveBeenCalledWith(mockEducation._id.toString())
    expect(result).toMatchObject({ _id: mockEducation._id.toString() })
  })

  it('should propagate errors from service', async () => {
    service.findOne.mockRejectedValueOnce(new Error('fail'))
    await expect(controller.findOne('badid')).rejects.toThrow('fail')
  })
})
