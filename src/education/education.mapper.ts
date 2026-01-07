import { EducationPopulatedDocument } from './education.schema'
import { EducationDto } from './dto/education.dto'
import { EducationDocument } from './education.schema'
import { EducationPopulatedDto } from './dto/education-populated.dto'
import { CompanyMapper } from '../company/company.mapper'

export class EducationMapper {
  static toDto(doc: EducationDocument): EducationDto {
    return {
      ...this.baseDto(doc),
      school: doc.school.toString(),
    }
  }

  static toDtos(docs: EducationDocument[]): EducationDto[] {
    return docs.map((doc) => this.toDto(doc))
  }

  static toPopulatedDto(
    doc: EducationPopulatedDocument,
  ): EducationPopulatedDto {
    return {
      ...this.baseDto(doc),
      school: CompanyMapper.toDto(doc.school),
    }
  }

  static baseDto(doc: EducationDocument | EducationPopulatedDocument) {
    return {
      _id: doc._id.toString(),
      school: doc.school.toString(),
      level: doc.level,
      fieldOfStudy: doc.fieldOfStudy,
      eqfEquivalent: doc.eqfEquivalent,
      startDate: doc.startDate,
      endDate: doc.endDate,
      durationYears: doc.durationYears,
      gpa: doc.gpa,
      thesisTitle: doc.thesisTitle,
      description: doc.description,
      extracurriculars: doc.extracurriculars,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    }
  }
}
