import { WorkExperienceService } from './work-experience.service'
import { WorkExperienceDocument } from './schema/work-experience.schema'

type MockWorkExperienceModel = {
  create: jest.Mock<Promise<WorkExperienceDocument>, [unknown?]>
  find: jest.Mock<any, any>
  countDocuments: jest.Mock<Promise<number>, any>
  findById: jest.Mock<any, any>
  findByIdAndUpdate: jest.Mock<any, any>
  findByIdAndDelete: jest.Mock<any, any>
}

describe('WorkExperienceService', () => {
  let service: WorkExperienceService
  let model: MockWorkExperienceModel
  const mockId = '507f1f77bcf86cd799439011'
  const mockDoc = {
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
  const mockSkill = { shortName: 'ts', description: 'TypeScript' }

  beforeEach(() => {
    model = {
      create: jest.fn().mockResolvedValue(mockDoc),
      find: jest.fn().mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue([mockDoc]),
      }),
      countDocuments: jest.fn().mockResolvedValue(1),
      findById: jest.fn().mockResolvedValue(mockDoc),
      findByIdAndUpdate: jest.fn().mockResolvedValue(mockDoc),
      findByIdAndDelete: jest.fn().mockResolvedValue(mockDoc),
    }
    service = new WorkExperienceService(model as any)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('create', async () => {
    const result = await service.create({} as any)
    expect(model.create).toHaveBeenCalled()
    expect(result).toEqual(mockDoc)
  })

  it('findAll', async () => {
    model.find = jest.fn().mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue([mockDoc]),
    })
    const result = await service.findAll({} as any)
    expect(model.find).toHaveBeenCalled()
    expect(result.items.length).toBe(1)
    expect(result.total).toBe(1)
  })

  it('findOne', async () => {
    model.findById = jest.fn().mockResolvedValue(mockDoc)
    const result = await service.findOne(mockId)
    expect(model.findById).toHaveBeenCalledWith(mockId)
    expect(result).toEqual(mockDoc)
  })

  it('findOnePopulated', async () => {
    const populated = {
      ...mockDoc,
      company: {
        _id: mockId,
        name: 'Test',
        website: '',
        city: '',
        country: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      populate: jest.fn().mockReturnThis(),
    }
    model.findById = jest
      .fn()
      .mockReturnValue({ populate: jest.fn().mockResolvedValue(populated) })
    const result = await service.findOnePopulated(mockId)
    expect(model.findById).toHaveBeenCalledWith(mockId)
    expect(result).toMatchObject(populated)
  })

  it('update', async () => {
    model.findByIdAndUpdate = jest.fn().mockResolvedValue(mockDoc)
    const result = await service.update(mockId, {} as any)
    expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
      mockId,
      {},
      { new: true },
    )
    expect(result).toEqual(mockDoc)
  })

  it('remove', async () => {
    model.findByIdAndDelete = jest.fn().mockResolvedValue(mockDoc)
    const result = await service.remove(mockId)
    expect(model.findByIdAndDelete).toHaveBeenCalledWith(mockId)
    expect(result).toEqual(mockDoc)
  })

  it('getSkillsByWorkExperienceId', async () => {
    model.findById = jest
      .fn()
      .mockResolvedValue({ ...mockDoc, skills: [mockSkill] })
    const result = await service.getSkillsByWorkExperienceId(mockId)
    expect(model.findById).toHaveBeenCalledWith(mockId)
    expect(Array.isArray(result)).toBe(true)
  })

  it('addSkillToWorkExperience', async () => {
    model.findByIdAndUpdate = jest.fn().mockResolvedValue(mockDoc)
    const result = await service.addSkillToWorkExperience(
      mockId,
      mockSkill as any,
    )
    expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
      mockId,
      { $push: { skills: mockSkill } },
      { new: true },
    )
    expect(result).toEqual(mockDoc)
  })

  it('removeSkillFromWorkExperience', async () => {
    model.findByIdAndUpdate = jest.fn().mockResolvedValue(mockDoc)
    const result = await service.removeSkillFromWorkExperience(mockId, 'ts')
    expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
      mockId,
      { $pull: { skills: { shortName: 'ts' } } },
      { new: true },
    )
    expect(result).toEqual(mockDoc)
  })
})
