import { SkillDto } from './dto/skill.dto'
import { Skill } from './schema/skill.schema'

export class SkillMapper {
  static toDto(skill: Skill): SkillDto {
    return {
      shortName: skill.shortName,
      description: skill.description,
    }
  }

  static toDtos(skills: Skill[]): SkillDto[] {
    return skills.map((skill) => this.toDto(skill))
  }
}
