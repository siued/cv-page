import { WorkExperienceDto } from './dto/work-experience.dto'
import { WorkExperienceDocument } from './schema/work-experience.schema'
import { SkillMapper } from './skill.mapper'

export class WorkExperienceMapper {
  static toDto(entity: WorkExperienceDocument): WorkExperienceDto {
    return {
      company: entity.company.toString(),
      position: entity.position,
      level: entity.level,
      skills: SkillMapper.toDtos(entity.skills),
      startDate: entity.startDate,
      endDate: entity.endDate,
      durationYears: entity.durationYears,
      _id: entity._id.toString(),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    }
  }

  static toDtos(entities: WorkExperienceDocument[]): WorkExperienceDto[] {
    return entities.map((entity) => this.toDto(entity))
  }
}
