import { Prop, Schema, SchemaFactory, Virtual } from '@nestjs/mongoose'
import mongoose, { HydratedDocument, ObjectId } from 'mongoose'
import { EducationLevel } from './entities/education.entity'
import { dateDifferenceInMillis } from '../util/date.util'
import { Company } from '../company/company.schema'

@Schema({ timestamps: true })
export class Education {
  @Prop({
    required: true,
    ref: 'Company',
    type: mongoose.Schema.Types.ObjectId,
  })
  /** using a ref to Company, because all education institutions are companies anyway */
  school: mongoose.Types.ObjectId

  @Prop({
    required: true,
    enum: EducationLevel,
  })
  level: EducationLevel

  @Prop({ required: false, type: String })
  fieldOfStudy?: string

  @Prop({
    required: false,
    type: Number,
    min: 0,
    max: 8,
  })
  // https://europass.europa.eu/en/european-qualifications-framework-eqf
  eqfEquivalent: number

  @Prop({
    type: Date,
    required: true,
  })
  startDate!: Date

  @Prop({
    type: Date,
    required: false,
  })
  endDate?: Date

  @Virtual({
    get(this: Education): number | undefined {
      if (!this.endDate) return undefined
      return dateDifferenceInMillis(this.startDate, this.endDate)
    },
  })
  durationYears?: number

  @Prop({ required: false, type: Number, min: 0, max: 10 })
  gpa?: number

  @Prop({ required: false, type: String })
  thesisTitle?: string

  @Prop({ required: false, type: String })
  description?: string

  @Prop({ type: [String], required: false, default: [] })
  extracurriculars: string[]

  _id!: ObjectId
  createdAt!: Date
  updatedAt!: Date
}

export const EducationSchema = SchemaFactory.createForClass(Education)
export type EducationDocument = HydratedDocument<Education>

export type EducationPopulatedDocument = Omit<EducationDocument, 'school'> & {
  school: Company
}
