import { ApiProperty } from '@nestjs/swagger'
import { PaginatedResponseDto } from '../../common/dto/paginated-response.dto'
import { WorkExperienceDto } from './work-experience.dto'
import { IsArray, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

export class WorkExperiencePaginatedResponseDto extends PaginatedResponseDto<WorkExperienceDto> {
  @ApiProperty({ type: WorkExperienceDto, isArray: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WorkExperienceDto)
  items!: WorkExperienceDto[]
}
