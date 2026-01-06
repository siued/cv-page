import { EducationLevel } from '../entities/education.entity'
import {
  IsArray,
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class EducationDto {
  @IsString()
  _id!: string

  @IsString()
  school!: string

  @IsEnum(EducationLevel)
  level!: EducationLevel

  @IsString()
  @IsOptional()
  fieldOfStudy?: string

  @IsNumber()
  @IsOptional()
  eqfEquivalent?: number

  @IsDate()
  startDate!: Date

  @IsDate()
  @IsOptional()
  endDate?: Date

  @IsNumber()
  @IsOptional()
  durationYears?: number

  @IsNumber()
  @IsOptional()
  gpa?: number

  @IsString()
  @IsOptional()
  thesisTitle?: string

  @IsString()
  @IsOptional()
  description?: string

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  extracurriculars?: string[]

  @IsDate()
  createdAt!: Date

  @IsDate()
  updatedAt!: Date
}
