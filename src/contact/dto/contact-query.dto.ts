import { IsEnum, IsOptional } from 'class-validator'
import { ContactType } from '../contact.types'
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'

export class ContactQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsEnum(ContactType)
  type?: ContactType
}
