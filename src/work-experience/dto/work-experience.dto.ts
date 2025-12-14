import {
  IsArray,
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator'
import { PositionLevel } from '../work-experience.types'
import { SkillDto } from './skill.dto'
import { Type } from 'class-transformer'

export abstract class WorkExperienceBaseDto {
  @IsString()
  position!: string

  @IsEnum(PositionLevel)
  level!: PositionLevel

  @IsArray()
  @Type(() => SkillDto)
  @ValidateNested({ each: true })
  skills!: SkillDto[]

  @IsDate()
  startDate!: Date

  @IsDate()
  @IsOptional()
  endDate?: Date

  @IsNumber()
  @IsOptional()
  durationYears?: number

  @IsString()
  _id!: string

  @IsDate()
  createdAt!: Date

  @IsDate()
  updatedAt!: Date
}

export class WorkExperienceDto extends WorkExperienceBaseDto {
  @IsString()
  company!: string
}
