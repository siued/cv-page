import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateCompanyDto } from './dto/create-company.dto'
import { UpdateCompanyDto } from './dto/update-company.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from 'mongoose'
import { Company, CompanyDocument } from './company.schema'
import { PaginatedQuery } from '../common/types/pagination.type'
import { CompanySortField } from './company.types'
import { SortOrder } from '../common/enums/sort-order.enum'

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name) private readonly companyModel: Model<Company>,
  ) {}

  create(createCompanyDto: CreateCompanyDto): Promise<CompanyDocument> {
    return this.companyModel.create(createCompanyDto)
  }

  async findAll(
    options?: PaginatedQuery<CompanySortField>,
  ): Promise<CompanyDocument[]> {
    const {
      offset = 0,
      limit = 10,
      sortBy = CompanySortField.Name,
      sortOrder = SortOrder.Asc,
    } = options ?? {}

    return this.companyModel
      .find()
      .sort({ [sortBy]: sortOrder === SortOrder.Asc ? 1 : -1 })
      .skip(offset)
      .limit(limit)
  }

  async findOne(id: ObjectId | string): Promise<CompanyDocument> {
    const company = await this.companyModel.findById(id)
    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`)
    }
    return company
  }

  async update(
    id: ObjectId | string,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<CompanyDocument> {
    const company = await this.companyModel.findByIdAndUpdate(
      id,
      updateCompanyDto,
      {
        new: true,
      },
    )
    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`)
    }
    return company
  }

  async remove(id: ObjectId | string): Promise<CompanyDocument> {
    const company = await this.companyModel.findByIdAndDelete(id)
    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`)
    }
    return company
  }
}
