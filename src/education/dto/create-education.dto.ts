import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateBy,
  ValidationArguments,
} from 'class-validator'
import { Transform } from 'class-transformer'
import mongoose, { isValidObjectId } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { EducationLevel } from '../entities/education.entity'

export class CreateEducationDto {
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
  school!: mongoose.Types.ObjectId

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
  gpa?: number

  @IsString()
  @IsOptional()
  thesisTitle?: string

  @IsString()
  @IsOptional()
  description?: string

  @IsOptional()
  @IsString({ each: true })
  extracurriculars?: string[]
}
