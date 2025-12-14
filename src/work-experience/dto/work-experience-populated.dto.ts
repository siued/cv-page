import { ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { WorkExperienceBaseDto } from './work-experience.dto'
import { CompanyDto } from '../../company/dto/company.dto'

export class WorkExperiencePopulatedDto extends WorkExperienceBaseDto {
  @Type(() => CompanyDto)
  @ValidateNested()
  declare company: CompanyDto
}
