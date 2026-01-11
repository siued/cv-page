import { ApiProperty } from '@nestjs/swagger'
import { EducationLevel } from '../education.types'
import {
  IsArray,
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class EducationDto {
  @ApiProperty({
    description: 'MongoDB ObjectId',
    example: '64b64c7f8f1a2b3c4d5e6f70',
  })
  @IsString()
  _id!: string

  @ApiProperty({
    description: 'MongoDB ObjectId',
    example: '64b64c7f8f1a2b3c4d5e6f70',
  })
  @IsString()
  school!: string

  @ApiProperty({ example: EducationLevel.Bachelor })
  @IsEnum(EducationLevel)
  level!: EducationLevel

  @ApiProperty({ example: 'Computer Science' })
  @IsString()
  @IsOptional()
  fieldOfStudy?: string

  @ApiProperty({ example: 6 })
  @IsNumber()
  @IsOptional()
  eqfEquivalent?: number

  @ApiProperty({ example: '2020-09-01T00:00:00.000Z' })
  @IsDate()
  startDate!: Date

  @ApiProperty({ example: '2023-06-30T00:00:00.000Z' })
  @IsDate()
  @IsOptional()
  endDate?: Date

  @ApiProperty({ example: 3 })
  @IsNumber()
  @IsOptional()
  durationYears?: number

  @ApiProperty({ example: 10.0 })
  @IsNumber()
  @IsOptional()
  gpa?: number

  @ApiProperty({
    example: 'Why is the sky blue: A thorough investigation',
  })
  @IsString()
  @IsOptional()
  thesisTitle?: string

  @ApiProperty({ example: 'Graduated with honors' })
  @IsString()
  @IsOptional()
  description?: string

  @ApiProperty({
    example: ['Lorem', 'Ipsum'],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  extracurriculars?: string[]

  @ApiProperty({ example: '2020-09-01T00:00:00.000Z' })
  @IsDate()
  createdAt!: Date

  @ApiProperty({ example: '2023-07-01T00:00:00.000Z' })
  @IsDate()
  updatedAt!: Date
}
