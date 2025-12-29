import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from 'mongoose'
import { CreateEducationDto } from './dto/create-education.dto'
import { UpdateEducationDto } from './dto/update-education.dto'
import { Education, EducationDocument } from './education.schema'
import { PaginatedQuery } from '../common/types/pagination.type'
import { EducationSortField } from './dto/education-query.dto'
import { SortOrder } from '../common/enums/sort-order.enum'

@Injectable()
export class EducationService {
  constructor(
    @InjectModel(Education.name)
    private readonly educationModel: Model<EducationDocument>,
  ) {}

  create(createEducationDto: CreateEducationDto): Promise<EducationDocument> {
    return this.educationModel.create(createEducationDto)
  }

  async findAll(
    options?: PaginatedQuery<EducationSortField>,
  ): Promise<{ items: EducationDocument[]; total: number }> {
    const {
      offset = 0,
      limit = 10,
      sortBy = EducationSortField.StartDate,
      sortOrder = SortOrder.Desc,
    } = options ?? {}

    const sort: Record<string, 1 | -1> = {
      [sortBy]: sortOrder === SortOrder.Asc ? 1 : -1,
    }

    const [items, total] = await Promise.all([
      this.educationModel.find().sort(sort).skip(offset).limit(limit),
      this.educationModel.countDocuments(),
    ])

    return { items, total }
  }

  async findOne(id: string | ObjectId): Promise<EducationDocument> {
    const education = await this.educationModel.findById(id)
    if (!education) throw new NotFoundException('Education not found')
    return education
  }

  async update(
    id: string | ObjectId,
    updateEducationDto: UpdateEducationDto,
  ): Promise<EducationDocument> {
    const education = await this.educationModel.findByIdAndUpdate(
      id,
      updateEducationDto,
      { new: true },
    )
    if (!education) throw new NotFoundException('Education not found')
    return education
  }

  async remove(id: string | ObjectId): Promise<EducationDocument> {
    const education = await this.educationModel.findByIdAndDelete(id)
    if (!education) throw new NotFoundException('Education not found')
    return education
  }
}
