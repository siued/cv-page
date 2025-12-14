import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'
import { SortablePaginationQueryDto } from './sortable-pagination-query.dto'

export class SearchableSortablePaginationQueryDto extends SortablePaginationQueryDto {
  @ApiPropertyOptional({ description: 'Search term applied to the dataset' })
  @IsOptional()
  @IsString()
  search?: string
}
