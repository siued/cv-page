import { ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsInt, Min } from 'class-validator'

export class PaginationQueryDto {
  @ApiPropertyOptional({
    description: 'Number of records to skip',
    default: 0,
    minimum: 0,
    type: Number,
  })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset = 0

  @ApiPropertyOptional({
    description: 'Maximum number of records to return',
    default: 10,
    minimum: 1,
    type: Number,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit = 10
}
