import {
  IsArray,
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
  ValidateBy,
  ValidateNested,
  ValidationArguments,
} from 'class-validator'
import { PositionLevel } from '../work-experience.types'
import { SkillDto } from './skill.dto'
import { Transform, Type } from 'class-transformer'
import mongoose, { isValidObjectId, ObjectId } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

export class CreateWorkExperienceDto {
  @ApiProperty({ type: String, example: '65f1c2e4b7e6a2d1f8c9a123' })
  @ValidateBy({
    name: 'isValidObjectId',
    validator: {
      validate: (value: any, _args: ValidationArguments) =>
        isValidObjectId(value),
      defaultMessage: () => 'company must be a valid objectId',
    },
  })
  @Transform(
    (params: { value: string }) => new mongoose.Types.ObjectId(params.value),
  )
  company!: ObjectId

  @IsString()
  position!: string

  @IsEnum(PositionLevel)
  level!: PositionLevel

  @IsArray()
  @Type(() => SkillDto)
  @ValidateNested({ each: true })
  skills!: SkillDto[]

  @Transform(({ value }) => (value ? new Date(value) : value))
  @IsDate()
  startDate!: Date

  @Transform(({ value }) => (value ? new Date(value) : value))
  @IsDate()
  @IsOptional()
  endDate?: Date
}
