import { IsOptional, IsString } from 'class-validator'

export class SkillDto {
  @IsString()
  shortName!: string

  @IsString()
  @IsOptional()
  description?: string
}
