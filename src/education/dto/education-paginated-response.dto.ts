import { ApiProperty } from '@nestjs/swagger'
import { EducationDto } from './education.dto'

export class EducationPaginatedResponseDto {
  @ApiProperty({ type: [EducationDto] })
  items!: EducationDto[]

  @ApiProperty()
  total!: number
}
