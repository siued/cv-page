import { ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { EducationDto } from './education.dto'
import { CompanyDto } from '../../company/dto/company.dto'
import { OmitType } from '@nestjs/swagger'

export class EducationPopulatedDto extends OmitType(EducationDto, [
  'school',
] as const) {
  @Type(() => CompanyDto)
  @ValidateNested()
  declare school: CompanyDto
}
