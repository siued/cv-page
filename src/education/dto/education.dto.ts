import { ApiProperty } from '@nestjs/swagger'
import { EducationLevel } from '../entities/education.entity'

export class EducationDto {
  @ApiProperty({ type: String })
  _id!: string

  @ApiProperty({ type: String })
  company!: string

  @ApiProperty({ enum: EducationLevel })
  level!: EducationLevel

  @ApiProperty({ required: false })
  fieldOfStudy?: string

  @ApiProperty({ required: false })
  eqfEquivalent?: number

  @ApiProperty()
  startDate!: Date

  @ApiProperty({ required: false })
  endDate?: Date

  @ApiProperty({ required: false })
  durationYears?: number

  @ApiProperty({ required: false })
  gpa?: number

  @ApiProperty({ required: false })
  thesisTitle?: string

  @ApiProperty({ required: false })
  description?: string

  @ApiProperty({ type: [String], required: false })
  extracurriculars?: string[]

  @ApiProperty()
  createdAt!: Date

  @ApiProperty()
  updatedAt!: Date
}
