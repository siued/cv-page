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

  describe('CRUD and skill endpoints', () => {
    let service: jest.Mocked<WorkExperienceService>
    const mockId = '507f1f77bcf86cd799439011'
    const mockDto = {
      _id: mockId,
      company: mockId,
      position: 'dev',
      level: 'senior',
      skills: [],
      startDate: new Date('2020-01-01'),
      endDate: new Date('2021-01-01'),
      durationYears: 1,
      createdAt: new Date('2020-01-01'),
      updatedAt: new Date('2021-01-01'),
    }
    const mockPopulatedDto = {
      ...mockDto,
      company: {
        _id: mockId,
        name: 'Test',
        website: '',
        city: '',
        country: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }
    const mockSkill = { shortName: 'ts', description: 'TypeScript' }

    beforeEach(() => {
      service = {
        create: jest.fn().mockResolvedValue(mockDto),
        findAll: jest.fn().mockResolvedValue({ items: [mockDto], total: 1 }),
        findOne: jest.fn().mockResolvedValue(mockDto),
        findOnePopulated: jest.fn().mockResolvedValue(mockPopulatedDto),
        update: jest.fn().mockResolvedValue(mockDto),
        remove: jest.fn().mockResolvedValue(mockDto),
        getSkillsByWorkExperienceId: jest.fn().mockResolvedValue([mockSkill]),
        addSkillToWorkExperience: jest.fn().mockResolvedValue(mockDto),
        removeSkillFromWorkExperience: jest.fn().mockResolvedValue(mockDto),
      } as any
      controller = new WorkExperienceController(service)
    })

    it('create', async () => {
      const result = await controller.create({} as any)
      expect(service.create).toHaveBeenCalled()
      expect(result).toHaveProperty('company')
    })

    it('findAll', async () => {
      const result = await controller.findAll({} as any)
      expect(service.findAll).toHaveBeenCalled()
      expect(result.items.length).toBe(1)
      expect(result.total).toBe(1)
    })

    it('findOne', async () => {
      const result = await controller.findOne(mockId)
      expect(service.findOne).toHaveBeenCalledWith(mockId)
      expect(result).toHaveProperty('company')
    })

    it('findOnePopulated', async () => {
      const result = await controller.findOnePopulated(mockId)
      expect(service.findOnePopulated).toHaveBeenCalledWith(mockId)
      expect(result).toHaveProperty('company')
    })

    it('update', async () => {
      const result = await controller.update(mockId, {} as any)
      expect(service.update).toHaveBeenCalledWith(mockId, {})
      expect(result).toHaveProperty('company')
    })

    it('remove', async () => {
      const result = await controller.remove(mockId)
      expect(service.remove).toHaveBeenCalledWith(mockId)
      expect(result).toHaveProperty('company')
    })

    it('getSkills', async () => {
      const result = await controller.getSkills(mockId)
      expect(service.getSkillsByWorkExperienceId).toHaveBeenCalledWith(mockId)
      expect(Array.isArray(result)).toBe(true)
    })

    it('addSkill', async () => {
      const result = await controller.addSkill(mockId, mockSkill as any)
      expect(service.addSkillToWorkExperience).toHaveBeenCalledWith(
        mockId,
        mockSkill,
      )
      expect(result).toHaveProperty('company')
    })

    it('removeSkill', async () => {
      const result = await controller.removeSkill(mockId, 'ts')
      expect(service.removeSkillFromWorkExperience).toHaveBeenCalledWith(
        mockId,
        'ts',
      )
      expect(result).toHaveProperty('company')
    })
  })
})
