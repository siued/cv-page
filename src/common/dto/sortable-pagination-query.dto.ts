import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsEnum } from 'class-validator'
import { SortOrder } from '../enums/sort-order.enum'
import { PaginationQueryDto } from './pagination-query.dto'

export class SortablePaginationQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({
    enum: SortOrder,
    default: SortOrder.Desc,
    description: 'Sort direction',
  })
  @IsEnum(SortOrder)
  sortOrder: SortOrder = SortOrder.Desc
}
