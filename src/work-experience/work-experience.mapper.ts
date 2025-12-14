import { WorkExperienceDto } from './dto/work-experience.dto'
import { WorkExperiencePopulatedDto } from './dto/work-experience-populated.dto'
import {
  WorkExperienceDocument,
  WorkExperiencePopulatedDocument,
} from './schema/work-experience.schema'
import { SkillMapper } from './skill.mapper'
import { CompanyMapper } from '../company/company.mapper'

export class WorkExperienceMapper {
  static toDto(entity: WorkExperienceDocument): WorkExperienceDto {
    return {
      ...this.baseDto(entity),
      company: entity.company.toString(),
    }
  }

  static toDtos(entities: WorkExperienceDocument[]): WorkExperienceDto[] {
    return entities.map((entity) => this.toDto(entity))
  }

  static toPopulatedDto(
    entity: WorkExperiencePopulatedDocument,
  ): WorkExperiencePopulatedDto {
    return {
      ...this.baseDto(entity),
      company: CompanyMapper.toDto(entity.company),
    }
  }

  static toPopulatedDtos(
    entities: WorkExperiencePopulatedDocument[],
  ): WorkExperiencePopulatedDto[] {
    return entities.map((entity) => this.toPopulatedDto(entity))
  }

  private static baseDto(
    entity: WorkExperienceDocument | WorkExperiencePopulatedDocument,
  ) {
    return {
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
}
