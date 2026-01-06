import { EducationDto } from './education.dto'
import { IsArray, IsNumber, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

export class EducationPaginatedResponseDto {
  @Type(() => EducationDto)
  @ValidateNested({ each: true })
  @IsArray()
  items!: EducationDto[]

  @IsNumber()
  total!: number
}
