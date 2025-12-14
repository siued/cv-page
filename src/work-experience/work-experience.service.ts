import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateWorkExperienceDto } from './dto/create-work-experience.dto'
import { UpdateWorkExperienceDto } from './dto/update-work-experience.dto'
import { Model, ObjectId } from 'mongoose'
import {
  WorkExperience,
  WorkExperienceDocument,
} from './schema/work-experience.schema'
import { PaginatedQuery } from '../common/types/pagination.type'
import { InjectModel } from '@nestjs/mongoose'
import { Skill } from './schema/skill.schema'
import { WorkExperienceSortField } from './work-experience.types'
import { SortOrder } from '../common/enums/sort-order.enum'

@Injectable()
export class WorkExperienceService {
  constructor(
    @InjectModel(WorkExperience.name)
    // has to use WorkExperienceDocument to have the `skills` subdocument type match correctly!
    private readonly workExperienceModel: Model<WorkExperienceDocument>,
  ) {}

  create(
    createWorkExperienceDto: CreateWorkExperienceDto,
  ): Promise<WorkExperienceDocument> {
    return this.workExperienceModel.create(createWorkExperienceDto)
  }

  async findAll(
    options?: PaginatedQuery<WorkExperienceSortField>,
  ): Promise<WorkExperienceDocument[]> {
    const {
      offset = 0,
      limit = 10,
      sortBy = WorkExperienceSortField.StartDate,
      sortOrder = SortOrder.Desc,
    } = options ?? {}

    return this.workExperienceModel
      .find()
      .sort({ [sortBy]: sortOrder === SortOrder.Asc ? 1 : -1 })
      .skip(offset)
      .limit(limit)
  }

  async findOne(id: string | ObjectId): Promise<WorkExperienceDocument> {
    const workExperience = await this.workExperienceModel.findById(id)
    if (!workExperience)
      throw new NotFoundException('Work experience not found')
    return workExperience
  }

  async update(
    id: string | ObjectId,
    updateWorkExperienceDto: UpdateWorkExperienceDto,
  ): Promise<WorkExperienceDocument> {
    const workExperience = await this.workExperienceModel.findByIdAndUpdate(
      id,
      updateWorkExperienceDto,
      { new: true },
    )
    if (!workExperience)
      throw new NotFoundException('Work experience not found')
    return workExperience
  }

  async remove(id: string | ObjectId): Promise<WorkExperienceDocument> {
    const workExperience = await this.workExperienceModel.findByIdAndDelete(id)
    if (!workExperience)
      throw new NotFoundException('Work experience not found')
    return workExperience
  }

  async getSkillsByWorkExperienceId(id: string | ObjectId): Promise<Skill[]> {
    const workExperience = await this.findOne(id)
    return workExperience.skills
  }

  async addSkillToWorkExperience(
    workExperienceId: string | ObjectId,
    skill: Skill,
  ): Promise<WorkExperienceDocument> {
    const workExperience = await this.workExperienceModel.findByIdAndUpdate(
      workExperienceId,
      { $push: { skills: skill } },
      { new: true },
    )
    if (!workExperience)
      throw new NotFoundException('Work experience not found')
    return workExperience
  }

  async removeSkillFromWorkExperience(
    workExperienceId: string | ObjectId,
    skillShortName: string,
  ): Promise<WorkExperienceDocument> {
    const workExperience = await this.workExperienceModel.findByIdAndUpdate(
      workExperienceId,
      { $pull: { skills: { shortName: skillShortName } } },
      { new: true },
    )
    if (!workExperience)
      throw new NotFoundException('Work experience not found')
    return workExperience
  }
}
