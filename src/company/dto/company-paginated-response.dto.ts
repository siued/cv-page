import { ApiProperty } from '@nestjs/swagger'
import { PaginatedResponseDto } from '../../common/dto/paginated-response.dto'
import { CompanyDto } from './company.dto'
import { IsArray, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

export class CompanyPaginatedResponseDto extends PaginatedResponseDto<CompanyDto> {
  @ApiProperty({ type: CompanyDto, isArray: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CompanyDto)
  items!: CompanyDto[]
}
