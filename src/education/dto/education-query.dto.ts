import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsEnum } from 'class-validator'
import { SortablePaginationQueryDto } from '../../common/dto/sortable-pagination-query.dto'

export enum EducationSortField {
  StartDate = 'startDate',
  EndDate = 'endDate',
  Level = 'level',
  EqfEquivalent = 'eqfEquivalent',
}

export class EducationQueryDto extends SortablePaginationQueryDto {
  @ApiPropertyOptional({
    enum: EducationSortField,
    default: EducationSortField.StartDate,
    description: 'Field to sort results by',
  })
  @IsEnum(EducationSortField)
  sortBy: EducationSortField = EducationSortField.StartDate
}
