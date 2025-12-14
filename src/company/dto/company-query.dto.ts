import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsEnum } from 'class-validator'
import { SortablePaginationQueryDto } from '../../common/dto/sortable-pagination-query.dto'
import { CompanySortField } from '../company.types'

export class CompanyQueryDto extends SortablePaginationQueryDto {
  @ApiPropertyOptional({
    enum: CompanySortField,
    default: CompanySortField.Name,
    description: 'Field to sort companies by',
  })
  @IsEnum(CompanySortField)
  sortBy: CompanySortField = CompanySortField.Name
}
