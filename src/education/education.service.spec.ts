import { Test, TestingModule } from '@nestjs/testing'
import { EducationService } from './education.service'
import { getModelToken } from '@nestjs/mongoose'
import mongoose from 'mongoose'
import { EducationLevel } from './entities/education.entity'

describe('EducationService', () => {
  let service: EducationService
  let model: any

  const mockEducation = {
    _id: new mongoose.Types.ObjectId('507f1f77bcf86cd799439011'),
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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EducationService,
        {
          provide: getModelToken('Education'),
          useValue: {
            create: jest.fn().mockResolvedValue(mockEducation),
            find: jest.fn().mockReturnValue({
              sort: jest.fn().mockReturnThis(),
              skip: jest.fn().mockReturnThis(),
              limit: jest.fn().mockResolvedValue([mockEducation]),
            }),
            findById: jest.fn().mockResolvedValue(mockEducation),
            findByIdAndUpdate: jest.fn().mockResolvedValue(mockEducation),
            findByIdAndDelete: jest.fn().mockResolvedValue(mockEducation),
            countDocuments: jest.fn().mockResolvedValue(1),
          },
        },
      ],
    }).compile()

    service = module.get<EducationService>(EducationService)
    model = module.get(getModelToken('Education'))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create an education', async () => {
    const dto = {
      ...mockEducation,
      company: mockEducation.company,
      level: EducationLevel.Bachelor,
    }
    // Cast to any to bypass strict DTO typing for test
    const result = await service.create(dto as any)
    expect(model.create).toHaveBeenCalledWith(dto)
    expect(result).toEqual(mockEducation)
  })

  it('should find all educations with pagination', async () => {
    const result = await service.findAll({ offset: 0, limit: 1 })
    expect(model.find).toHaveBeenCalled()
    expect(model.countDocuments).toHaveBeenCalled()
    expect(result.items).toEqual([mockEducation])
    expect(result.total).toBe(1)
  })

  it('should find one education by id', async () => {
    const result = await service.findOne('507f1f77bcf86cd799439011')
    expect(model.findById).toHaveBeenCalledWith('507f1f77bcf86cd799439011')
    expect(result).toEqual(mockEducation)
  })

  it('should throw NotFoundException if education not found (findOne)', async () => {
    model.findById.mockResolvedValueOnce(null)
    await expect(service.findOne('badid')).rejects.toThrow(
      'Education not found',
    )
  })

  it('should update an education', async () => {
    const dto = { fieldOfStudy: 'Math' }
    const result = await service.update('507f1f77bcf86cd799439011', dto)
    expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
      '507f1f77bcf86cd799439011',
      dto,
      { new: true },
    )
    expect(result).toEqual(mockEducation)
  })

  it('should throw NotFoundException if education not found (update)', async () => {
    model.findByIdAndUpdate.mockResolvedValueOnce(null)
    await expect(
      service.update('badid', { fieldOfStudy: 'Math' }),
    ).rejects.toThrow('Education not found')
  })

  it('should remove an education', async () => {
    const result = await service.remove('507f1f77bcf86cd799439011')
    expect(model.findByIdAndDelete).toHaveBeenCalledWith(
      '507f1f77bcf86cd799439011',
    )
    expect(result).toEqual(mockEducation)
  })

  it('should throw NotFoundException if education not found (remove)', async () => {
    model.findByIdAndDelete.mockResolvedValueOnce(null)
    await expect(service.remove('badid')).rejects.toThrow('Education not found')
  })
})
