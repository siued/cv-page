import { ApiProperty } from '@nestjs/swagger'
import { IsInt, Min } from 'class-validator'

export abstract class PaginatedResponseDto<TItem = unknown> {
  abstract items: TItem[]

  @ApiProperty({ description: 'Total number of matching records', minimum: 0 })
  @IsInt()
  @Min(0)
  total!: number
}
