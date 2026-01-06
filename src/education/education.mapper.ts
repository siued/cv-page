import { Education } from './education.schema'
import { EducationDto } from './dto/education.dto'

export class EducationMapper {
  static toDto(doc: Education): EducationDto {
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

  static toDtos(docs: Education[]): EducationDto[] {
    return docs.map(this.toDto)
  }
}
