import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsEnum } from 'class-validator'
import { SortablePaginationQueryDto } from '../../common/dto/sortable-pagination-query.dto'
import { WorkExperienceSortField } from '../work-experience.types'

export class WorkExperienceQueryDto extends SortablePaginationQueryDto {
  @ApiPropertyOptional({
    enum: WorkExperienceSortField,
    default: WorkExperienceSortField.StartDate,
    description: 'Field to sort results by',
  })
  @IsEnum(WorkExperienceSortField)
  sortBy: WorkExperienceSortField = WorkExperienceSortField.StartDate
}
